import React, { useContext } from "react";
import Svg, { Rect, Path } from "react-native-svg";
import data from "./data";
import * as d3 from "d3";
import prepareMultiFieldData from "./analysis/prepareMultiFieldData";
import TouchHandler, { HandlerContext } from "./TouchHandler";
import ChartPointer from "./ChartPointer";

/*
data = {
  "country": [
    {date (yyyy-m-d), confirmed, deaths, recovered }
    ...
  ],...
}
*/

const color = {
  deaths: "red",
  confirmed: "blue",
  recovered: "green",
};

const LineContent = () => {
  const width = 400;
  const height = 200;
  // margin of graph area, preserving space for axes
  const margin = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 20,
  };

  const mock = data["Vietnam"];

  const parse = d3.timeParse("%Y-%m-%d");
  const pd = prepareMultiFieldData(mock, (d) => parse(d.date), [
    "deaths",
    "confirmed",
    "recovered",
  ]);

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

  const line = d3
    .line()
    .x((_, i) => x(pd.x[i]))
    .y((d) => y(d));

  const handlers = useContext(HandlerContext);
  console.log("render line");
  return (
    <Svg width={width} height={height} {...handlers}>
      <Rect width="100%" height="100%" stroke="lightgrey" fill="none" />
      {pd.series.map((s, i) => (
        <Path key={i} d={line(s.values)} stroke={color[s.name]} fill="none" />
      ))}
      <ChartPointer />
    </Svg>
  );
};

export default function Line() {
  return (
    <TouchHandler>
      <LineContent />
    </TouchHandler>
  );
}
