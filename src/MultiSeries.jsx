import React from "react";
import { useTouchQuery } from "./TouchQuery";
import { useTouchLocation } from "./TouchHandler";
import { G } from "react-native-svg";

/**
 * @typedef {import("./analysis/makeTouchQuery").XYTouchQueryResult} XYTouchQueryResult
 */

/**
 * @callback FnReplaceProps
 * @param {number} i                          Index of the child element being processed
 * @param {number | undefined} activeIndex    Index of active series, returned from TouchQuery
 * @param {XYTouchQueryResult} queryResult    Touch query result
 * @return {Object<string, any> | boolean | null}
 */

/**
 * Perform reordering and props overriding on child element based on TouchQuery feedback
 *
 * @typedef {Object} Props
 * @property {FnReplaceProps=} Props.replaceProps   Callback taking child index, query result
 *                                                  - Return an object mapping from prop_to_override → value
 *                                                  - Return false, null or undefined to not override
 * @property {boolean=} raiseActive                 Raise active series to the top ?
 *
 * @param {Props} param0
 */
export default function MultiSeries({
  children,
  replaceProps = () => null,
  raiseActive = true,
}) {
  const { x, y } = useTouchQuery();
  const { active } = useTouchLocation();

  const activeIndex = active ? y.index : undefined;

  const renderChildren = () => {
    // I don't know why but it will freeze touch handling
    // if (!active) return children;

    let child_arr = React.Children.map(children, (c, i) => {
      if (!active) return c;
      const r = replaceProps(i, activeIndex, { x, y });
      if (r && typeof r === "object" && Object.keys(r).length > 0) {
        return React.cloneElement(c, r);
      } else {
        return c;
      }
    });

    if (active && raiseActive) {
      return [
        ...child_arr.filter((_, i) => i != activeIndex),
        child_arr[activeIndex],
      ];
    } else {
      return child_arr;
    }
  };

  return <>{renderChildren()}</>;
}
