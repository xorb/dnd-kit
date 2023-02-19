import React from "react";
import {
  DndContext,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import type { Coordinates } from "@dnd-kit/utilities";
import Draggable from "./Draggable";

const defaultCoordinates = {
  x: 0,
  y: 0,
};

const activationConstraint = {
  delay: 25,
  tolerance: 40,
};

function App() {
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

  const onDragEnd = (e: DragEndEvent) => {
    console.log(e);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <Draggable
        style={{ height: "100px", width: "100px", background: "red" }}
        top={y}
        left={x}
      >
        <div>Hello</div>
      </Draggable>
    </DndContext>
  );
}

export default App;
