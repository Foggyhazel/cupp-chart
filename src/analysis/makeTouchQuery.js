import nearIndex from "./nearIndex";

/**
 * @typedef {Object} TouchQueryResult
 * @property {number} index     Index of nearest data
 * @property {number} location  Location of nearest data in element space
 * @property {any} value        Value of nearest data
 */

/**
 * @typedef {Object} XYTouchQueryResult
 * @property {TouchQueryResult} x  Query result obtained from x data
 * @property {TouchQueryResult} y  Query result obtained from y data
 */

/**
 * @typedef {(x: number, y: number) => XYTouchQueryResult} TouchQueryFunction2D
 */

/**
 * return index of nearest point in a sorted array
 * @param {Array<any>} data
 * @param {Function} getAllX
 * @param {d3.ScaleContinuousNumeric} scale
 * @returns {(x: number, y: number) => TouchQueryResult}
 */
export function makeQuery1D(data, getAllX, scale) {
  return (locationX) => {
    const X = getAllX(data);
    const idx = nearIndex(X, scale.invert(locationX));
    return {
      index: idx,
      value: X[idx],
      location: scale(X[idx]),
    };
  };
}

/**
 * @returns {TouchQueryFunction2D} function to query data with (x,y) touch
 * position with 1D search
 */
export function makeQueryXY1D(data, getAllX, getMatchedY, scaleX, scaleY) {
  const xQuery = makeQuery1D(data, getAllX, scaleX);
  return (x, y) => {
    const x_result = xQuery(x);
    const ix = x_result.index;
    const matched_Y = getMatchedY(data, ix);
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
