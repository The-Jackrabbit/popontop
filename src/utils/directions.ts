export function isMoreVerticalThanHorizontal(mx: number, my: number) {
  const x = mx ? Math.abs(mx) : 0;
  const y = my ? Math.abs(my) : 0;
 
  return y > 2*x;
}

export function isMoreHorizontalThanVertical(mx: number, my: number) {
  const x = mx ? Math.abs(mx) : 0;
  const y = my ? Math.abs(my) : 0;
 
  return x > 2*y;
}