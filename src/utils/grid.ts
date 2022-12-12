
export const getAlbumSize = (ref: any, columns: number, rows: number) => {
  const container = ref.current;
  if (!container?.clientWidth) {
    return 0;
  }

  const containerWidth = document.body.clientWidth ?? 0;
  const containerHeight = container.clientHeight ?? 0;
  const minDimension = Math.floor(
    Math.min(
      containerWidth/columns , 
      (containerHeight-40)/rows ,
    )
  );
  return minDimension === 0 ? 40 : minDimension;
}