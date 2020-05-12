import React from "react";
import { G, Circle, Line } from "react-native-svg";
import { useTouchLocation } from "./TouchHandler";
import { useTouchQuery } from "./TouchQuery";

export default function ChartPointer() {
  const { active } = useTouchLocation();
  const { x, y } = useTouchQuery();

  return (
    active && (
      <G>
        <Line
          x1={x.location}
          y1={0}
          x2={x.location}
          y2={1000}
          stroke="#ddd"
          strokeWidth={1}
        />
        <Circle cx={x.location} cy={y.location} r={2} fill="black" />
      </G>
    )
  );
}
