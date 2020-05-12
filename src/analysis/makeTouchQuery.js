import * as d3 from "d3";
import { minIndex } from "d3-array/src";
import nearIndex from "./nearIndex";

/**
 * return index of nearest point in a sorted array
 * @param {*} data
 * @param {*} getAllX
 * @param {d3.ScaleLinear} scale
 */
export function makeQuery1D(data, getAllX, scale) {
  return (locationX) => {
    const X = getAllX(data);
    // const idx = d3.bisectLeft(X, scale.invert(locationX));
    const idx = nearIndex(X, scale.invert(locationX));
    return {
      index: idx,
      value: X[idx],
      location: scale(X[idx]),
    };
  };
}

export function composeQuery(xQuery, yQuery) {
  return (locationX, locationY) => {
    return {
      x: xQuery(locationX),
      y: yQuery(locationY),
    };
  };
}

export function makeQueryXY1D(data, getAllX, getMatchedY, scaleX, scaleY) {
  const xQuery = makeQuery1D(data, getAllX, scaleX);
  return (x, y) => {
    const x_result = xQuery(x);
    const ix = x_result.index;
    const matched_Y = getMatchedY(data, ix);
    // const iy = minIndex(matched_Y, (d) => Math.abs(d - scaleY.invert(y)));
    const iy = nearIndex(matched_Y, scaleY.invert(y), null, true);

    return {
      x: x_result,
      y: {
        index: iy,
        value: matched_Y[iy],
        location: scaleY(matched_Y[iy]),
      },
    };
  };
}
