// @ts-nocheck

import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style: React.CSSProperties = {
    color: isOver ? "green" : "blue",
    height: 340,
    width: 340,
    background: isOver ? "green" : "blue",
    top: 500,
    left: 600,
    position: "absolute",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
