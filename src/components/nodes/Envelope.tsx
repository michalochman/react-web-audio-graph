import React, { useCallback, useEffect, useRef } from "react";
import { NodeProps } from "react-flow-renderer";
import { ComplexAudioNode, useNode } from "context/NodeContext";
import Node from "components/Node";
import useAnimationFrame from "hooks/useAnimationFrame";

interface EnvelopeNode extends Required<ComplexAudioNode<GainNode, GainNode>> {
  gate: AudioWorkletNode;
}

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
  const node = (useNode(id, context => {
    const gain = context.createGain();
    const gate = new AudioWorkletNode(context, "gate-processor");

    return {
      gate,
      input: gain,
      output: gain,
    };
  }) as unknown) as EnvelopeNode;

  // AudioParam
  useEffect(() => void node.output.gain.setTargetAtTime(0, node.output.context.currentTime, 0.015), [node]);

  const triggerOn = useCallback(() => {
    const { currentTime } = node.output.context;
    keyOnEventTime.current = currentTime;
    node.output.gain.cancelScheduledValues(currentTime);
    node.output.gain.setValueAtTime(0, currentTime);
    node.output.gain.linearRampToValueAtTime(1.0, currentTime + attackTime);
    node.output.gain.linearRampToValueAtTime(sustainLevel, currentTime + attackTime + decayTime);

    if (!sustainOn) {
      node.output.gain.linearRampToValueAtTime(0, currentTime + attackTime + decayTime + releaseTime);
    }
  }, [node, attackTime, decayTime, releaseTime, sustainLevel, sustainOn]);

  const triggerOff = useCallback(() => {
    const { currentTime } = node.output.context;
    keyOffEventTime.current = currentTime;
    node.output.gain.cancelScheduledValues(currentTime);
    node.output.gain.setValueAtTime(node.output.gain.value, currentTime);

    const releaseTimeUsed = !sustainOn
      ? Math.max(0, keyOffEventTime.current - keyOnEventTime.current - (attackTime + decayTime))
      : 0;

    node.output.gain.linearRampToValueAtTime(0, currentTime + releaseTime - releaseTimeUsed);
  }, [node, attackTime, decayTime, releaseTime, sustainOn]);

  const gateTrigger = useCallback(
    ({ data: message }: MessageEvent) => {
      if (message === "gateOn") {
        triggerOn();
      } else if (message === "gateOff") {
        triggerOff();
      }
    },
    [triggerOff, triggerOn]
  );
  useEffect(() => {
    node.gate.port.onmessage = gateTrigger;
  }, [node, gateTrigger]);

  const tick = useCallback(() => {
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
        currentTime: node.output.context.currentTime,
        gain: node.output.gain.value,
        keyOffEventTime: keyOffEventTime.current,
        keyOnEventTime: keyOnEventTime.current,
      }
    );
  }, [node, attackTime, decayTime, releaseTime, sustainLevel, sustainOn]);

  useAnimationFrame(tick);

  return (
    <Node id={id} inputs={["input", "gate"]} outputs={["output"]} type={type}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <canvas ref={canvasRef} height={64} width={256} />
          </div>
          <div className="customNode_item">
            <label>
              <input
                checked={sustainOn}
                onChange={e => onChange({ sustainOn: !sustainOn })}
                title="Sustain"
                type="checkbox"
              />
              sustain on
            </label>
          </div>
          <div className="customNode_item" style={{ width: 276 }}>
            <input
              min={0}
              onChange={e => onChange({ attackTime: +e.target.value })}
              step={0.05}
              style={{ width: "25%" }}
              title="Attack time"
              type="number"
              value={attackTime}
            />
            <input
              min={0}
              onChange={e => onChange({ decayTime: +e.target.value })}
              step={0.05}
              style={{ width: "25%" }}
              title="Decay time"
              type="number"
              value={decayTime}
            />
            <input
              max={1}
              min={0}
              onChange={e => onChange({ sustainLevel: +e.target.value })}
              step={0.01}
              style={{ width: "25%" }}
              title="Sustain level"
              type="number"
              value={sustainLevel}
            />
            <input
              min={0}
              onChange={e => onChange({ releaseTime: +e.target.value })}
              step={0.05}
              style={{ width: "25%" }}
              title="Release time"
              type="number"
              value={releaseTime}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Envelope);
