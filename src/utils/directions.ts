export function isIntentionalXAxisGesture(mx?: number, my?: number, threshold = 15) {
  const x = Math.abs(mx as number);
  const y = Math.abs(my as number);
  const overThreshold = x > threshold;
 
  return x > y && overThreshold;
}

export function isIntentionalYAxisGesture(mx?: number, my?: number, threshold = 15) {
  const x = Math.abs(mx as number);
  const y = Math.abs(my as number);
  const overThreshold = y > threshold;
 
  return y > x && overThreshold;
}


export function isMoreHorizontalThanVertical(mx: number, my: number) {
  const x = mx ? Math.abs(mx) : 0;
  const y = my ? Math.abs(my) : 0;
 
  return x > 5*y;
}