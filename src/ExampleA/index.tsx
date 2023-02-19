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

const defaultCoordinates = {
  x: 0,
  y: 0,
};

const activationConstraint = {
  distance: 15,
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

  const updateCoordinates = (x: number, y: number) => {
    setCoordinates({
      x,
      y,
    });
  };
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }) => {
          return {
            x: x + delta.x,
            y: y + delta.y,
          };
        });
      }}
    >
      <Draggable
        updateCoordinates={updateCoordinates}
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
