import React from "react";
import { G, Circle, Line } from "react-native-svg";
import { useTouchLocation } from "./TouchHandler";

export default function ChartPointer({ scaleX, scaleY, query }) {
  const { x, y, active } = useTouchLocation();

  const qr = query(x - 10, y - 0);

  return (
    active && (
      <G>
        <Line
          x1={qr.x.location}
          y1={0}
          x2={qr.x.location}
          y2={1000}
          stroke="#ddd"
          strokeWidth={1}
        />
        <Circle cx={qr.x.location} cy={qr.y.location} r={2} fill="black" />
      </G>
    )
  );
}
