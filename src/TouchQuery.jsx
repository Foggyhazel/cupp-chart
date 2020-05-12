import React, { createContext, useContext } from "react";
import { useTouchLocation } from "./TouchHandler";

const QueryContext = createContext({});
/**
 * Get touch query result.
 * Use inside 'TouchQuery'
 * @typedef {import("./analysis/makeTouchQuery").XYTouchQueryResult} XYTouchQueryResult
 * @type {() => XYTouchQueryResult}
 */
export const useTouchQuery = () => useContext(QueryContext);

/**
 * Provide query result context to be used down stream.
 * Use inside 'TouchHandler'.
 * @typedef {import('./analysis/makeTouchQuery').TouchQueryFunction2D} TouchQueryFunction2D
 * @typedef {Object} Props
 * @property {TouchQueryFunction2D} Props.query
 * @property {number} Props.offsetX
 * @property {number} Props.offsetY
 *
 * @param {Props} param0
 */
export default function TouchQuery({ children, query, offsetX, offsetY }) {
  const { x, y } = useTouchLocation();

  const result = query(x + offsetX, y + offsetY);

  return (
    <QueryContext.Provider value={result}>{children}</QueryContext.Provider>
  );
}

TouchQuery.defaultProps = {
  offsetX: 0,
  offsetY: 0,
};
