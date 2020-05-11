import * as d3 from "d3";

export default function prepareMultiFieldData(data, xAccessor, yAccessors) {
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
  const series = yAccessors.map((ya, index) => ({
    index,
    name: typeof fname[index] === "string" ? fname[index] : undefined,
    values: data.map((d) => ya(d)),
  }));

  const domainX = d3.extent(X);
  const domainY = [
    d3.min(series, (s) => d3.min(s.values)),
    d3.max(series, (s) => d3.max(s.values)),
  ];

  return {
    x: X,
    series,
    domainX,
    domainY,
  };
}
