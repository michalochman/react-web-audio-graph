import React, { useCallback, useEffect, useRef } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import useAnimationFrame from "hooks/useAnimationFrame";

interface ADSREnvelope {
  attackTime: number;
  decayTime: number;
  sustainLevel: number;
  sustainOn: boolean;
  releaseTime: number;
}

interface ADSREnvelopeDrawMetadata {
  currentTime: number;
  gain: number;
  keyOffEventTime: number;
  keyOnEventTime: number;
}

function drawEnvelope(context: CanvasRenderingContext2D, envelope: ADSREnvelope, meta: ADSREnvelopeDrawMetadata) {
  const { attackTime, decayTime, sustainLevel, sustainOn, releaseTime } = envelope;
  const { currentTime, gain, keyOffEventTime, keyOnEventTime } = meta;

  const height = context.canvas.height;
  const width = context.canvas.width;

  // Draw Sustain as quarter of the whole width
  const sustainTime = sustainOn ? (attackTime + decayTime + releaseTime) / 9 : 0;
  const scale = width / (attackTime + decayTime + releaseTime + sustainTime);

  // Background
  context.fillStyle = "#001400";
  context.fillRect(0, 0, width, height);

  // Envelope shape
  context.lineWidth = 2;
  context.strokeStyle = "#00c800";
  context.beginPath();
  context.moveTo(0, height);
  context.lineTo(attackTime * scale, 0);
  context.lineTo((attackTime + decayTime) * scale, (1 - sustainLevel) * height);
  context.lineTo((attackTime + decayTime + sustainTime) * scale, (1 - sustainLevel) * height);
  context.lineTo((attackTime + decayTime + sustainTime + releaseTime) * scale, height);
  context.stroke();
  context.closePath();

  // Current gain
  let x =
    Math.min(currentTime - keyOnEventTime, attackTime + decayTime + sustainTime + (sustainOn ? 0 : releaseTime)) *
    scale;
  if (sustainOn && keyOffEventTime > keyOnEventTime) {
    x = (attackTime + decayTime + sustainTime + Math.min(currentTime - keyOffEventTime, releaseTime)) * scale;
  }
  context.beginPath();
  context.fillStyle = "#ffff00";
  context.moveTo(x, (1 - gain) * height);
  context.arc(x, (1 - gain) * height, 3, 0, Math.PI * 2);
  context.fill();
}

function Envelope({ data, id, selected, type }: NodeProps) {
  const { attackTime = 0.2, decayTime = 0.1, onChange, releaseTime = 0.6, sustainLevel = 0.7, sustainOn = true } = data;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keyOnEventTime = useRef(Number.MAX_SAFE_INTEGER);
  const keyOffEventTime = useRef(Number.MAX_SAFE_INTEGER);

  // AudioNode
  const node = useNode(id, context => context.createGain());

  // AudioParam
  useEffect(() => void node.gain.setTargetAtTime(0, node.context.currentTime, 0.015), [node]);

  const start = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      if ("repeat" in e && e.repeat) {
        return;
      }

      const { currentTime } = node.context;
      keyOnEventTime.current = currentTime;
      node.gain.cancelScheduledValues(currentTime);
      node.gain.setValueAtTime(0, currentTime);
      node.gain.linearRampToValueAtTime(1.0, currentTime + attackTime);
      node.gain.linearRampToValueAtTime(sustainLevel, currentTime + attackTime + decayTime);

      if (!sustainOn) {
        node.gain.linearRampToValueAtTime(0, currentTime + attackTime + decayTime + releaseTime);
      }
    },
    [node, attackTime, decayTime, releaseTime, sustainLevel, sustainOn]
  );

  const stop = useCallback(() => {
    const { currentTime } = node.context;
    keyOffEventTime.current = currentTime;
    node.gain.cancelScheduledValues(currentTime);
    node.gain.setValueAtTime(node.gain.value, currentTime);

    const releaseTimeUsed = !sustainOn
      ? Math.max(0, keyOffEventTime.current - keyOnEventTime.current - (attackTime + decayTime))
      : 0;

    node.gain.linearRampToValueAtTime(0, currentTime + releaseTime - releaseTimeUsed);
  }, [node, attackTime, decayTime, releaseTime, sustainOn]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    drawEnvelope(
      context,
      {
        attackTime,
        decayTime,
        releaseTime,
        sustainLevel,
        sustainOn,
      },
      {
        currentTime: node.context.currentTime,
        gain: node.gain.value,
        keyOffEventTime: keyOffEventTime.current,
        keyOnEventTime: keyOnEventTime.current,
      }
    );
  }, [node, attackTime, decayTime, releaseTime, sustainLevel, sustainOn]);

  useAnimationFrame(draw);

  return (
    <Node id={id} inputs={["input"]} outputs={["output"]} type={type}>
      <div className="customNode_item">
        <button onMouseDown={start} onMouseUp={stop} onKeyDown={start} onKeyUp={stop}>
          play
        </button>
      </div>
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <canvas ref={canvasRef} height={64} width={256} />
          </div>
          <div className="customNode_item">
            <label
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <input
                className="nodrag"
                type="checkbox"
                checked={sustainOn}
                onChange={e => onChange({ sustainOn: !sustainOn })}
              />
              sustain on
            </label>
          </div>
          <div className="customNode_item" style={{ width: 276 }}>
            <input
              className="nodrag"
              min={0}
              onChange={e => onChange({ attackTime: +e.target.value })}
              step={0.05}
              type="number"
              style={{ width: "25%" }}
              value={attackTime}
            />
            <input
              className="nodrag"
              min={0}
              onChange={e => onChange({ decayTime: +e.target.value })}
              type="number"
              step={0.05}
              style={{ width: "25%" }}
              value={decayTime}
            />
            <input
              className="nodrag"
              max={1}
              min={0}
              onChange={e => onChange({ sustainLevel: +e.target.value })}
              step={0.01}
              type="number"
              style={{ width: "25%" }}
              value={sustainLevel}
            />
            <input
              className="nodrag"
              min={0}
              onChange={e => onChange({ releaseTime: +e.target.value })}
              step={0.05}
              type="number"
              style={{ width: "25%" }}
              value={releaseTime}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Envelope);
