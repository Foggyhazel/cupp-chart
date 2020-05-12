import * as d3 from "d3";

export default function nearIndex(
  data,
  value,
  accessor = null,
  do_sort = false
) {
  let bi;
  let near;
  let _data;

  if (do_sort) {
    _data = data;
    accessor = accessor ? (i) => accessor(_data[i]) : (i) => _data[i];
    data = Array.from(Array(data.length).keys()).sort((a, b) =>
      d3.ascending(accessor(a), accessor(b))
    );
  }

  bi = d3.bisector(accessor || d3.ascending).left(data, value);
  if (bi - 1 < 0) {
    near = bi;
  } else {
    let left = data[bi - 1];
    let right = data[bi];
    if (accessor) {
      left = accessor(left);
      right = accessor(right);
    }
    near = right - value < value - left ? bi : bi - 1;
  }

  if (!do_sort) {
    return near;
  } else {
    return data[near];
  }
}
