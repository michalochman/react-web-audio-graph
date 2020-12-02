import React, { useCallback, useRef } from "react";
import { DataGetter } from "nodes/Analyser/index";
import useAnimationFrame from "hooks/useAnimationFrame";

interface OwnProps {
  dataGetter: DataGetter;
  node: AnalyserNode;
  paused: boolean;
}

type Props = OwnProps & React.ComponentProps<"canvas">;

function drawTimeDomainData(context: CanvasRenderingContext2D, data: Uint8Array) {
  let x = 0;
  const height = context.canvas.height;
  const width = context.canvas.width;
  const bufferLength = data.length;
  const sliceWidth = width / bufferLength;

  context.fillStyle = "#001400";
  context.fillRect(0, 0, width, 256);

  context.lineWidth = 2;
  context.strokeStyle = "#00c800";
  context.beginPath();
  context.moveTo(x, height - ((data[0] / 128.0) * height) / 2);
  for (let i = 1; i < bufferLength; i++) {
    const y = ((data[i] / 128.0) * height) / 2;
    context.lineTo(x, height - y);
    x += sliceWidth;
  }
  context.stroke();
}

function drawFrequencyData(context: CanvasRenderingContext2D, data: Uint8Array) {
  let x = 0;
  const height = context.canvas.height;
  const width = context.canvas.width;
  const bufferLength = data.length;
  const barWidth = width / bufferLength;

  context.fillStyle = "#001400";
  context.fillRect(0, 0, width, 256);

  context.fillStyle = "#00c800";
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = height * (data[i] / 255.0);
    const y = height - barHeight;
    context.fillRect(x, y, barWidth, barHeight);
    x += barWidth;
  }
}

const Visualiser = ({ dataGetter, node, paused, ...canvasProps }: Props) => {
  const audioData = useRef(new Uint8Array(node.frequencyBinCount));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    if (dataGetter === "getByteTimeDomainData") {
      drawTimeDomainData(context, audioData.current);
    } else if (dataGetter === "getByteFrequencyData") {
      drawFrequencyData(context, audioData.current);
    }
  }, [dataGetter]);

  const getData = useCallback(() => {
    const bufferLength = node.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    node[dataGetter].call(node, dataArray);
    audioData.current = dataArray;
  }, [node, dataGetter]);

  const tick = useCallback(() => {
    if (!paused) {
      getData();
      draw();
    }
  }, [draw, getData, paused]);

  useAnimationFrame(tick);

  return <canvas ref={canvasRef} style={{ display: "block" }} {...canvasProps} />;
};

export default Visualiser;
