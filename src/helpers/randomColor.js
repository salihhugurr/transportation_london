export function randomColor() {
  var o = Math.round, r = Math.random, s = 255;
  var x = o(r()*s);
  var y = o(r()*s);
  var z = o(r()*s);
  var background = 'rgba(' + x + ',' + y + ',' + z + ',' + .1 + ')';
  var color = 'rgba(' + x + ',' + y + ',' + z + ',' + 1 + ')';
  return [background,color];
}
