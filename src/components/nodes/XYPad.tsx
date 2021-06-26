import React, { useCallback, useEffect, useRef } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import useConstantSourceNode from "hooks/nodes/useConstantSourceNode";

function drawAxes(context: CanvasRenderingContext2D) {
  const height = context.canvas.height;
  const width = context.canvas.width;

  context.clearRect(0, 0, width, height);
  context.setLineDash([4, 4]);
  context.fillStyle = "#000000";
  context.font = "20px monospace";
  context.lineWidth = 1;
  context.strokeStyle = "#000000";
  context.textAlign = "center";
  context.textBaseline = "middle";

  context.beginPath();
  context.moveTo(30, height / 2);
  context.lineTo(width - 30, height / 2);
  context.stroke();
  context.closePath();
  context.fillText("1", width / 2, 15);
  context.fillText("-1", width / 2, height - 15);

  context.beginPath();
  context.moveTo(width / 2, 30);
  context.lineTo(width / 2, height - 30);
  context.stroke();
  context.closePath();
  context.fillText("1", width - 15, height / 2);
  context.fillText("-1", 15, height / 2);
}

function getXY(event: any) {
  const canvas = event.target;
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
  const y = -(event.clientY - rect.top - rect.height / 2) / (rect.height / 2);

  return { x, y };
}

function XYPad({ id, type }: NodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    drawAxes(context);
  }, []);

  // Interface
  const gateNode = useConstantSourceNode(`${id}_gate`, {});
  const xNode = useConstantSourceNode(`${id}_x`, {});
  const yNode = useConstantSourceNode(`${id}_y`, {});

  const setXY = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      xNode.offset.setTargetAtTime(x, xNode.context.currentTime, 0.015);
      yNode.offset.setTargetAtTime(y, yNode.context.currentTime, 0.015);
    },
    [xNode, yNode]
  );
  const gateOn = useCallback(() => void (gateNode.offset.value = 1), [gateNode]);
  const gateOff = useCallback(() => void (gateNode.offset.value = 0), [gateNode]);

  // AudioNode
  useNode(
    id,
    () => ({
      gate: gateNode,
      input: undefined,
      output: undefined,
      x: xNode,
      y: yNode,
    }),
    [gateNode, xNode, yNode]
  );

  return (
    <Node id={id} outputs={["x", "y", "gate"]} title={`XY Pad`} type={type}>
      <div className="customNode_editor nodrag">
        <div className="customNode_item">
          <canvas
            ref={canvasRef}
            height={400}
            onMouseMove={event => setXY(getXY(event))}
            style={{ background: "white", cursor: "crosshair", height: 200, width: 200 }}
            width={400}
            onMouseDown={gateOn}
            onMouseUp={gateOff}
          />
        </div>
      </div>
    </Node>
  );
}

export default React.memo(XYPad);
