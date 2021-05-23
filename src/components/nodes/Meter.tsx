import React, { useCallback, useEffect, useRef, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import useAnimationFrame from "hooks/useAnimationFrame";
import useAudioWorkletNode from "hooks/nodes/useAudioWorkletNode";
import { logarithmic } from "utils/scale";
import { float32toDb } from "utils/units";

const MAX_LEVEL = 6;
const MIN_LEVEL = -48;
const BUCKETS = MAX_LEVEL - MIN_LEVEL + 1;
const DPI_RATIO = window.devicePixelRatio ?? 1;
const LEVEL_GAP = 2;
const HEIGHT = 2;
const WIDTH = 25;

function drawMeter(context: CanvasRenderingContext2D, levels: number[]) {
  // high dpi
  context.setTransform(DPI_RATIO, 0, 0, DPI_RATIO, 0, 0);

  // reset
  context.fillStyle = "#000000";
  context.font = "10px Arial";
  context.strokeStyle = "#000000";
  context.textAlign = "right";
  context.textBaseline = "middle";
  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.restore();

  // rulers
  Array(BUCKETS)
    .fill(undefined)
    .forEach((_, item) => {
      const significant = [0, 6, 12, 18, 30, 42, 54].includes(item);
      const rulerHeight = significant ? 1 : 0.5;
      const rulerWidth = significant ? 6 : 3;
      const levelText = `${MAX_LEVEL - item}`;
      const groupX = 0;
      const groupY = item * HEIGHT + 5.5;
      const lineX = WIDTH - 8 + (significant ? 0 : 3);
      const lineY = 0;
      const textX = groupX + 15;
      const textY = groupY;

      if (significant) {
        context.fillText(levelText, textX, textY);
      }

      context.lineWidth = rulerHeight;
      context.fillRect(groupX + lineX, groupY + lineY, rulerWidth, rulerHeight);
    });

  // levels
  levels.forEach((level, levelIndex) => {
    Array(BUCKETS)
      .fill(undefined)
      .forEach((_, item) => {
        const decibels = MAX_LEVEL - item;
        const hue = Math.min(Math.max(120 * logarithmic(Math.max(0, -decibels / 10)), 0), 120).toFixed(0);
        const lightness = float32toDb(level) >= decibels ? "50%" : "0%";

        context.fillStyle = `hsl(${hue}, 50%, ${lightness})`;
        context.fillRect((levelIndex + 1) * (WIDTH + LEVEL_GAP) - LEVEL_GAP, item * HEIGHT + 5, WIDTH, HEIGHT);
      });
  });
}

type ChannelMessageEvent = MessageEvent<{ payload: { channels: number; id: string }; type: "channels" }>;
type LevelMessageEvent = MessageEvent<{ payload: { channel: number; id: string; level: number }; type: "level" }>;

// TODO add peak hold
function Meter({ id, type }: NodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const levelsRef = useRef<number[]>([]);
  const [channels, setChannels] = useState(1);

  const canvasHeight = BUCKETS * HEIGHT + 10;
  const canvasWidth = (WIDTH + LEVEL_GAP) * (channels + 1);

  const node = useAudioWorkletNode(id, "meter-processor", { numberOfOutputs: 0 });

  const handleMessage = useCallback(
    ({ data: event }: ChannelMessageEvent | LevelMessageEvent) => {
      if (event.type === "channels") {
        if (event.payload.channels !== channels) {
          setChannels(event.payload.channels);
        }
      }

      if (event.type === "level") {
        levelsRef.current[event.payload.channel] = event.payload.level;
      }
    },
    [channels]
  );
  useEffect(() => {
    node.port.onmessage = handleMessage;
  }, [node, handleMessage]);

  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    drawMeter(context, levelsRef.current.slice(0, channels));
  }, [channels]);

  useAnimationFrame(tick);

  return (
    <Node id={id} inputs={["input"]} title="Meter" type={type}>
      <div className="customNode_editor nodrag">
        <div className="customNode_item">
          <canvas
            ref={canvasRef}
            width={DPI_RATIO * canvasWidth}
            height={DPI_RATIO * canvasHeight}
            style={{ height: canvasHeight, width: canvasWidth }}
          />
        </div>
      </div>
    </Node>
  );
}

export default React.memo(Meter);
