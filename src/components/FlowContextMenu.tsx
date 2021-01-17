import React from "react";

interface Props {
  addNode: (node: string) => void;
}

function FlowContextMenu({ addNode }: Props) {
  return (
    <ul className="contextMenu">
      <li>
        Flow Utilites
        <ul className="contextMenu sub">
          <li onClick={() => addNode("FM_flow_sourceIP")}>Add FM_flow_sourceIP</li>
          <li onClick={() => addNode("FM_match_ip")}>Add FM_destinationIP</li>
          <li onClick={() => addNode("FM_drop_flow")}>Add FM_sourcePort</li>
        </ul>
      </li>
      <li>
        Basic Operations
        <ul className="contextMenu sub">
          <li onClick={() => addNode("FM_match_ip")}>Add FM_match_ip</li>
          <li onClick={() => addNode("FM_match_ip")}>Add FM_match_port</li>
          <li onClick={() => addNode("FM_match_ip")}>Add FM_logic_and</li>
          <li onClick={() => addNode("FM_match_ip")}>Add FM_logic_or</li>
        </ul>
      </li>
      <li>
        Security Actions
        <ul className="contextMenu sub">
          <li onClick={() => addNode("FM_drop_flow")}>Add FM_drop_flow</li>
        </ul>
      </li>
      <li>
        Network Attack Detection
        <ul className="contextMenu sub"></ul>
      </li>
      <li>
        Network Service
        <ul className="contextMenu sub"></ul>
      </li>
      <li>
        Third Party
        <ul className="contextMenu sub"></ul>
      </li>
    </ul>
  );
}

export default React.memo(FlowContextMenu);
