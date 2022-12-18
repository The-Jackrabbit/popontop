import { getRandIntInRange } from './random-in-range';

export function fakeHttpRequest<T>(resolvedValue?: T): Promise<T | undefined> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const isError = getRandIntInRange(1, 10) % 10 === 0;
      if (isError) {
        rej(new Error());
      } else {
        res(resolvedValue);
      }
    }, getRandIntInRange(1, 4) * 1000);
  });
}
