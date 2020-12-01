import React, { useCallback, useRef } from "react";
import { DataGetter } from "nodes/Analyser/index";
import useAnimationFrame from "hooks/useAnimationFrame";

interface OwnProps {
  node: AnalyserNode;
  dataGetter: DataGetter;
}

type Props = OwnProps & React.ComponentProps<"canvas">;

interface DrawData {
  context: CanvasRenderingContext2D;
  data: Uint8Array;
  height: number;
  width: number;
}

function drawTimeDomainData({ context, data, height, width }: DrawData) {
  let x = 0;
  const bufferLength = data.length;
  const sliceWidth = width / bufferLength;

  context.lineWidth = 2;
  context.strokeStyle = "#000";
  context.beginPath();
  context.moveTo(x, height - ((data[0] / 128.0) * height) / 2);
  for (let i = 1; i < bufferLength; i++) {
    const y = ((data[i] / 128.0) * height) / 2;
    context.lineTo(x, height - y);
    x += sliceWidth;
  }
  context.stroke();
}

function drawFrequencyData({ context, data, height, width }: DrawData) {
  let x = 0;
  const bufferLength = data.length;
  const barWidth = width / bufferLength;

  context.fillStyle = "#000";
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = height * (data[i] / 255.0);
    const y = height - barHeight;
    context.fillRect(x, y, barWidth, barHeight);
    x += barWidth;
  }
}

const Visualiser = ({ node, dataGetter, ...canvasProps }: Props) => {
  const audioData = useRef(new Uint8Array(node.frequencyBinCount));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    const height = canvas.height;
    const width = canvas.width;

    const drawContext = {
      context,
      data: audioData.current,
      height,
      width,
    };
    context.fillStyle = "#ddd";
    context.fillRect(0, 0, width, 256);
    if (dataGetter === "getByteTimeDomainData") {
      drawTimeDomainData(drawContext);
    } else if (dataGetter === "getByteFrequencyData") {
      drawFrequencyData(drawContext);
    }
  }, [dataGetter]);

  const getData = useCallback(() => {
    const bufferLength = node.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    node[dataGetter].call(node, dataArray);
    audioData.current = dataArray;
  }, [node, dataGetter]);

  const tick = useCallback(() => {
    getData();
    draw();
  }, [draw, getData]);

  useAnimationFrame(tick);

  return <canvas ref={canvasRef} style={{ display: "block" }} {...canvasProps} />;
};

export default Visualiser;
