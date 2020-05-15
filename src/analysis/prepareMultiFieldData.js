import * as d3 from "d3";

export default function prepareMultiFieldData(
  data,
  xAccessor,
  yAccessors,
  do_stack = false,
  stack_order = d3.stackOrderNone,
  stack_offset = d3.stackOffsetNone
) {
  const fname = yAccessors;
  let xa;
  if (typeof xAccessor === "string") {
    xa = (d) => d[xAccessor];
  } else {
    xa = xAccessor;
  }

  yAccessors = yAccessors.map((ya) => {
    if (typeof ya === "string") {
      return (d) => d[ya];
    } else {
      return ya;
    }
  });

  const X = data.map((d) => xa(d));
  /** @type {Array} */
  const series = yAccessors.map((ya, index) => ({
    index,
    name: typeof fname[index] === "string" ? fname[index] : undefined,
    values: data.map((d) => ya(d)),
  }));

  let stack;
  if (do_stack) {
    const keys = Array.from(Array(yAccessors.length).keys());
    stack = d3
      .stack()
      .order(stack_order)
      .offset(stack_offset)
      .keys(keys)
      .value((d, k) => {
        return yAccessors[k](d);
      })(data);

    series.forEach((v, i) => {
      v["stack"] = stack[i];
    });
  }

  const domainX = d3.extent(X);
  let domainY;

  if (do_stack) {
    domainY = [
      d3.min(stack[0], (s) => s[0]),
      d3.max(stack[stack.length - 1], (s) => s[1]),
    ];
  } else {
    domainY = [
      d3.min(series, (s) => d3.min(s.values)),
      d3.max(series, (s) => d3.max(s.values)),
    ];
  }

  return {
    x: X,
    series,
    domainX,
    domainY,
  };
}
