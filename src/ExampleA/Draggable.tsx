import React from "react";
import { useDraggable } from "@dnd-kit/core";

export enum Axis {
  All,
  Vertical,
  Horizontal,
}

interface DraggableItemProps {
  handle?: boolean;
  style?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  axis?: Axis;
  top?: number;
  left?: number;
  children: React.ReactNode;
  updateCoordinates: (p: number, y: number) => void;
}

function Draggable(props: DraggableItemProps) {
  const [isResizing, setIsResizing] = React.useState(false);
  const refRight = React.useRef<HTMLDivElement | null>(null);
  const refLeft = React.useRef<HTMLDivElement | null>(null);

  const { attributes, listeners, setNodeRef, transform, node } = useDraggable({
    id: "draggable",
    disabled: isResizing,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const onResizeEnd = React.useCallback(() => {
    setIsResizing(false);
    const nodeStyles = window.getComputedStyle(node.current!);
    const endX = parseInt(nodeStyles.left);
    const endY = parseInt(nodeStyles.top);
    props.updateCoordinates(endX, endY);
  }, []);

  React.useEffect(() => {
    const resizableEl = node.current!;
    const styles = window.getComputedStyle(node.current!);
    let width = parseInt(styles.width, 10);
    let x = 0;

    // Right resize
    const onMouseMoveRightResize = (event: MouseEvent) => {
      const dx = event.clientX - x;
      x = event.clientX;
      width = width + dx;
      resizableEl.style.width = `${width}px`;
    };

    const onMouseUpRightResize = () => {
      document.removeEventListener("mousemove", onMouseMoveRightResize);
      onResizeEnd();
    };

    const onMouseDownRightResize = (event: MouseEvent) => {
      setIsResizing(true);

      x = event.clientX;
      resizableEl.style.left = styles.left;
      document.addEventListener("mousemove", onMouseMoveRightResize);
      document.addEventListener("mouseup", onMouseUpRightResize);
    };

    // Left resize
    const onMouseMoveLeftResize = (event: MouseEvent) => {
      const ss = window.getComputedStyle(node.current!);
      const dx = event.clientX - x;
      x = event.clientX;
      width = width - dx;
      resizableEl.style.width = `${width}px`;
      resizableEl.style.left = `${parseInt(ss.left) + dx}px`;
    };

    const onMouseUpLeftResize = () => {
      document.removeEventListener("mousemove", onMouseMoveLeftResize);
      onResizeEnd();
    };

    const onMouseDownLeftResize = (event: MouseEvent) => {
      setIsResizing(true);
      x = event.clientX;
      document.addEventListener("mousemove", onMouseMoveLeftResize);
      document.addEventListener("mouseup", onMouseUpLeftResize);
    };

    const resizerRight = refRight.current!;
    resizerRight.addEventListener("mousedown", onMouseDownRightResize);

    const resizerLeft = refLeft.current!;
    resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);
    return () => {
      resizerRight.removeEventListener("mousedown", onMouseDownRightResize);
      resizerLeft.removeEventListener("mousedown", onMouseDownLeftResize);
    };
  }, []);

  return (
    <div
      ref={setNodeRef}
      style={{
        ...props.style,
        ...style,
        top: props.top,
        left: props.left,
        position: "relative",
        userSelect: "none",
      }}
      {...listeners}
      {...attributes}
    >
      <div
        ref={refRight}
        style={{
          width: "4px",
          height: "100%",
          position: "absolute",
          right: 0,
          top: 0,
          background: "yellow",
          cursor: "col-resize",
        }}
      ></div>

      <div
        ref={refLeft}
        style={{
          width: "4px",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          background: "yellow",
          cursor: "col-resize",
        }}
      ></div>
      {props.children}
    </div>
  );
}

export default Draggable;
