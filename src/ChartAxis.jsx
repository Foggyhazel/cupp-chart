import React from "react";
import { Line, G, Text, Path } from "react-native-svg";

/**
 * @typedef {Object} Props
 * @property {"left" | "right" | "top" | "bottom"} Props.side
 * @property {d3.ScaleContinuousNumeric} Props.scale  d3.scale...
 * @property {number=} offsetX    i.e. move axis inside margin
 * @property {number=} offsetY    i.e. move axis inside margin
 * @property {number} tickSize    Size of tick
 * @property {number} tickSizeOuter   Size of ticks at both end of the axis
 * @property {Function} tickFormat    map tick → string
 * @property {Array} tickValues       Custom tick values
 * @property {Array} tickArguments    Get passed to scale.ticks() method
 * @property {number} tickPadding     Space between tick and text
 * @property {number} fontSize        Font size
 * @property {boolean} noLine         Draw axis line ?
 * @param {Props} param0
 */
export default function ChartAxis({
  side = "left",
  scale,
  offsetX = 0,
  offsetY = 0,
  tickSize = 4,
  tickSizeOuter = 4,
  tickFormat = null,
  tickValues = null,
  tickArguments = null,
  tickPadding = 4,
  fontSize = 8,
  noLine = false,
}) {
  const r = scale.range();
  const r0 = r[0];
  const r1 = r[r.length - 1];

  const ticks =
    tickValues !== null
      ? tickValues
      : scale.ticks
      ? scale.ticks.apply(scale, tickArguments)
      : scale.domain();

  const format =
    tickFormat !== null
      ? tickFormat
      : scale.tickFormat
      ? scale.tickFormat.apply(scale, tickArguments)
      : (t) => `${t}`;

  const dir = side === "left" || side === "top" ? -1 : 1;
  const mainPath =
    side === "left" || side === "right"
      ? `M ${dir * tickSizeOuter}, ${r0} H 0 V ${r1} H ${dir * tickSizeOuter}`
      : `M ${r0},${dir * tickSizeOuter} V 0 H ${r1} V ${dir * tickSizeOuter}`;

  const tickEnd = {
    left: { x1: -tickSize },
    right: { x1: tickSize },
    top: { y1: -tickSize },
    bottom: { y1: tickSize },
  }[side];

  const anchor = {
    left: "end",
    right: "start",
    top: "middle",
    bottom: "middle",
  }[side];

  // 0.35 = magic number to get half text height from fontSize
  const textNudge = {
    left: { dy: fontSize * 0.35, dx: -tickSize - tickPadding },
    right: { dy: fontSize * 0.35, dx: tickSize + tickPadding },
    top: { dy: -tickSize - tickPadding - 0.35 * fontSize },
    bottom: { dy: tickSize + tickPadding + 0.75 * fontSize },
  }[side];

  const renderTick = (tickValue, key) => {
    const xform =
      side === "left" || side === "right"
        ? `translate(0, ${scale(tickValue)})`
        : `translate(${scale(tickValue)}, 0)`;
    return (
      <G transform={xform} key={key}>
        <Line {...tickEnd} strokeWidth={1} stroke="black" />
        <Text textAnchor={anchor} fontSize={fontSize} {...textNudge}>
          {format(tickValue)}
        </Text>
      </G>
    );
  };

  return (
    <G transform={`translate(${offsetX}, ${offsetY})`}>
      {!noLine && (
        <Path d={mainPath} strokeWidth={1} fill="none" stroke="black" />
      )}
      {ticks.map((t, i) => renderTick(t, i))}
    </G>
  );
}
