import React, { useContext } from "react";
import { G, Circle } from "react-native-svg";
import { LocationContext } from "./TouchHandler";

export default function ChartPointer({ scaleX, scaleY }) {
  const { x, y, active } = useContext(LocationContext);

  return (
    active && (
      <G>
        <Circle cx={x} cy={y - 60} r={5} fill="black" />
      </G>
    )
  );
}
