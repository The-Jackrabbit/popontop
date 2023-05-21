import { EMPTY_ALBUM } from '../../constants/empty-album';

export const generateBoard = (length = 10, width = 10) => {
  const squares = [];
  for (let i = 0; i < length * width; i++) {
    squares.push({ ...EMPTY_ALBUM });
  }

  return squares;
};
