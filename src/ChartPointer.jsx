import React from "react";
import { G, Circle } from "react-native-svg";
import { useTouchLocation } from "./TouchHandler";

export default function ChartPointer({ scaleX, scaleY }) {
  const { x, y, active } = useTouchLocation();

  return (
    active && (
      <G>
        <Circle cx={x - 10} cy={y - 50} r={2} fill="black" />
      </G>
    )
  );
}
