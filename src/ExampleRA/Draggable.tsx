import React from "react";
import { useDraggable } from "@dnd-kit/core";

export enum Axis {
  All,
  Vertical,
  Horizontal,
}

interface DraggableItemProps {
  // label: string;
  handle?: boolean;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  axis?: Axis;
  top?: number;
  left?: number;
  children: React.ReactNode;
}

function Draggable(props: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...props.style,
        ...style,
        top: props.top,
        left: props.left,
        position: "relative",
      }}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
}

export default Draggable;
