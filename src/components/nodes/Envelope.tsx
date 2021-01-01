import React, { useCallback, useEffect, useRef, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { ComplexAudioNode, useNode } from "context/NodeContext";
import Node from "components/Node";
import useAnimationFrame from "hooks/useAnimationFrame";

enum TriggerType {
  Automatic = "automatic" as any,
  Manual = "manual" as any,
}

interface EnvelopeNode extends ComplexAudioNode<AnalyserNode, GainNode> {}

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
  const {
    attackTime = 0.2,
    decayTime = 0.1,
    onChange,
    releaseTime = 0.6,
    sustainLevel = 0.7,
    sustainOn = true,
    triggerType = TriggerType.Manual,
  } = data;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keyOnEventTime = useRef(Number.MAX_SAFE_INTEGER);
  const keyOffEventTime = useRef(Number.MAX_SAFE_INTEGER);
  const [trigger, setTrigger] = useState(false);

  // AudioNode
  const node = (useNode(id, context => {
    const input = context.createAnalyser();
    const output = context.createGain();

    input.fftSize = 32;
    input.connect(output);

    return {
      input,
      output,
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

  // TODO
  const triggerOff = useCallback(() => {}, []);

  useEffect(() => {
    if (trigger) {
      triggerOn();
    } else {
      triggerOff();
    }

    return () => triggerOff();
  }, [trigger, triggerOn, triggerOff]);

  const start = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      if ("repeat" in e && e.repeat) {
        return;
      }

      triggerOn();
    },
    [triggerOn]
  );

  const stop = useCallback(() => {
    const { currentTime } = node.output.context;
    keyOffEventTime.current = currentTime;
    node.output.gain.cancelScheduledValues(currentTime);
    node.output.gain.setValueAtTime(node.output.gain.value, currentTime);

    const releaseTimeUsed = !sustainOn
      ? Math.max(0, keyOffEventTime.current - keyOnEventTime.current - (attackTime + decayTime))
      : 0;

    node.output.gain.linearRampToValueAtTime(0, currentTime + releaseTime - releaseTimeUsed);
  }, [node, attackTime, decayTime, releaseTime, sustainOn]);

  const automaticTrigger = useCallback(() => {
    const bufferLength = node.input.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);
    node.input.getFloatTimeDomainData(dataArray);

    // Naive lo-fi signal detection that triggers if any of the sample frames has any value other than zero
    if (dataArray.filter(Boolean).length > 0) {
      setTrigger(true);
    } else {
      setTrigger(false);
    }
  }, [node]);

  const tick = useCallback(() => {
    if (triggerType === TriggerType.Automatic) {
      automaticTrigger();
    }

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
  }, [node, attackTime, automaticTrigger, decayTime, releaseTime, sustainLevel, sustainOn, triggerType]);

  useAnimationFrame(tick);

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
            <select onChange={e => onChange({ triggerType: e.target.value })} value={triggerType}>
              <option value={TriggerType.Manual}>{TriggerType[TriggerType.Manual]}</option>
              <option value={TriggerType.Automatic}>{TriggerType[TriggerType.Automatic]}</option>
            </select>
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
