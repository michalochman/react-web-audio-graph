import React, { useEffect, useRef } from "react";

interface OwnProps {
  data: Uint8Array;
}

type Props = OwnProps & React.ComponentProps<"canvas">;

const Visualiser = ({ data, ...canvasProps }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");

  function draw() {
    if (!canvas || !context) {
      return;
    }

    const bufferLength = data.length;
    const height = canvas.height;
    const width = canvas.width;

    let x = 0;
    const sliceWidth = width / bufferLength;

    context.lineWidth = 2;
    context.strokeStyle = "#000000";
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(x, ((data[0] / 128.0) * height) / 2);
    for (var i = 1; i < bufferLength; i++) {
      const y = ((data[i] / 128.0) * height) / 2;
      context.lineTo(x, y);
      x += sliceWidth;
    }
    context.stroke();
  }

  useEffect(() => {
    draw();
  }, [data]);

  return <canvas ref={canvasRef} {...canvasProps} />;
};

export default Visualiser;
