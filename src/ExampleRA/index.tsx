import React from "react";
import {
  DndContext,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import type { Coordinates } from "@dnd-kit/utilities";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import { Enable, Resizable, ResizeDirection } from "re-resizable";

const defaultCoordinates = {
  x: 0,
  y: 0,
};

const activationConstraint = {
  delay: 25,
  tolerance: 40,
};
const style = {
  background: "gray",
};
function App() {
  const [state, setState] = React.useState({
    resizing: true,
    position: {
      x: 0,
      y: 0,
    },
  });
  const [{ x, y }, setCoordinates] =
    React.useState<Coordinates>(defaultCoordinates);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint,
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint,
  });
  const keyboardSensor = useSensor(KeyboardSensor, {});
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const onResizeStart = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
    dir: ResizeDirection,
    elementRef: HTMLElement
  ) => {
    e.stopPropagation();
    setState({ ...state, resizing: true });
  };
  return (
    <div>
      <Resizable
        style={style}
        defaultSize={{
          width: 320,
          height: 200,
        }}
      ></Resizable>
    </div>
  );
}

export default App;
