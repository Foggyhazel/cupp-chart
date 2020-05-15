import React from "react";
import Svg, { Rect, Path } from "react-native-svg";
import data from "./data";
import * as d3 from "d3";
import prepareMultiFieldData from "./analysis/prepareMultiFieldData";
import TouchHandler, { useTouchHandlers } from "./TouchHandler";
import ChartPointer from "./ChartPointer";
import { makeQueryXY1D } from "./analysis/makeTouchQuery";
import TouchQuery from "./TouchQuery";
import MultiSeries from "./MultiSeries";
import ChartAxis from "./ChartAxis";

const color = {
  deaths: "red",
  confirmed: "green",
  recovered: "blue",
};

const AreaContent = () => {
  const width = 400;
  const height = 250;
  // margin of graph area, preserving space for axes
  const margin = {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40,
  };
  const stack = true;

  const mock = data["Thailand"];

  const parse = d3.timeParse("%Y-%m-%d");
  const pd = prepareMultiFieldData(
    mock,
    (d) => parse(d.date),
    ["deaths", "confirmed", "recovered"],
    true
  );

  const x = d3
    .scaleTime()
    .domain(pd.domainX)
    .range([margin.left, width - margin.right])
    .nice();
  const y = d3
    .scaleLinear()
    .domain(pd.domainY)
    .range([height - margin.bottom, margin.top])
    .nice();

  let area;
  if (stack) {
    area = d3
      .area()
      .x((_, i) => x(pd.x[i]))
      .y0((d) => y(d[0]))
      .y1((d) => y(d[1]));
  } else {
    area = d3
      .area()
      .x((_, i) => x(pd.x[i]))
      .y0(y(0))
      .y1((d) => y(d));
  }

  const handlers = useTouchHandlers();

  const queryXY = makeQueryXY1D(
    pd,
    (d) => d.x,
    stack
      ? (d, ix) => d.series.map((s) => s.stack[ix][1])
      : (d, ix) => d.series.map((s) => s.values[ix]),
    x,
    y
  );

  const format = d3.timeFormat("%b");

  return (
    <Svg width={width} height={height} {...handlers}>
      <Rect width="100%" height="100%" stroke="lightgrey" fill="none" />
      <TouchQuery query={queryXY} offsetY={-20} offsetX={-20}>
        <MultiSeries
          replaceProps={(i, a) => (i == a ? null : { fill: "#ddd" })}
        >
          {pd.series.map((s, i) => (
            <Path
              key={i}
              d={area(stack ? s.stack : s.values)}
              stroke="none"
              fill={color[s.name]}
              fillOpacity={0.4}
            />
          ))}
        </MultiSeries>
        <ChartPointer />
      </TouchQuery>
      <ChartAxis side="left" scale={y} offsetX={margin.left} />
      <ChartAxis
        side="bottom"
        scale={x}
        offsetY={height - margin.bottom}
        tickFormat={format}
        tickArguments={[d3.timeMonth]}
      />
    </Svg>
  );
};

export default function Area() {
  return (
    <TouchHandler>
      <AreaContent />
    </TouchHandler>
  );
}
