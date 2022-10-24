
import { Album } from "../../types/Albums";

export const ALBUM_RESULTS: Album[] = [
  {
    artist: 'Neutral Milk Hotel', 
    imageUrl: 'https://lastfm.freetls.fastly.net/i/u/174s/d95051e07a714889c8f7fbbccf61bf8b.png', 
    lastfmId: "66d845f4-e781-38b5-84af-c9e6fecf125d", 
    name: 'In the Aeroplane Over the Sea',
  },
  {
    artist: 'Joanna Newsom', 
    imageUrl: "https://lastfm.freetls.fastly.net/i/u/174s/3c40291be00df4dc4f0d963a03f404dd.png", 
    lastfmId: "aeca0cff-e5d0-4f23-a887-f7cd2c0e5881", 
    name: 'Ys',
  },
  {
    artist: 'The Micrphones', 
    imageUrl:"https://lastfm.freetls.fastly.net/i/u/174s/df03edc56080767ec96c97444d44f25b.png", 
    lastfmId: "42a30618-90cf-415d-95e0-35454531659d", 
    name: 'The Glow Pt 2',
  },
  {
    artist: 'Grouper', 
    imageUrl: "https://lastfm.freetls.fastly.net/i/u/174s/c03e014f960b452a808d3167335876c6.png", 
    lastfmId: '', 
    name: 'Dragging a Dead Deer Up a Hill',
  },
  {
    artist: 'Belle and Sebastian', 
    imageUrl: "https://lastfm.freetls.fastly.net/i/u/174s/dc0afbb17fcd4f96cfca1ad31fcb55a3.png", 
    lastfmId: "2b3c2f96-91f9-4d82-8efb-bd51812cab3c", 
    name: "If You're Feeling Sinister",
  },
  {
    artist: 'Of Montreal', 
    imageUrl: "https://lastfm.freetls.fastly.net/i/u/174s/999a5b8830467c94ef8a8a9cd48b5bc5.png", 
    lastfmId: "30f79168-2e4c-4102-a93a-86deabc94902", 
    name: 'Hissing Fauna, Are You The Destroyer?',
  },
  {
    artist: 'Angel Olsen', 
    imageUrl: "https://lastfm.freetls.fastly.net/i/u/174s/40f6781a29284cb7cc19481b67749400.png", 
    lastfmId: "68fbee4a-3c04-4afa-bbc6-65ee5208d1d3", 
    name: 'Burn Your Fire For No Witness',
  },
  {
    artist: 'Joanna Newsom', 
    imageUrl: "https://lastfm.freetls.fastly.net/i/u/174s/5f863cceffcb45c692e648f11fce5160.png",
    lastfmId: "69115003-a563-4e9e-99d6-fce1ed9b141d", 
    name: 'Have One On Me',
  },
  {
    artist: 'Slowdive', 
    imageUrl: "https://lastfm.freetls.fastly.net/i/u/174s/306e566d3bb7cce540dd41d7e6811556.png", 
    lastfmId: "4939859c-ce2a-484b-872b-6d7ab9ff7260", 
    name: 'Souvlaki Space Station',
  },
  {
    artist: 'Sigur Rós', 
    imageUrl:"https://lastfm.freetls.fastly.net/i/u/174s/82ea4f4b490b4e288c9247e2b4ecb58c.png",
    lastfmId: "3f38169f-6501-4383-8a0e-06d416338e8f", 
    name: 'ágætis byrjun',
  },
]

function makeStringFileSafe(str: string): string {
  let s = '';
  for (let index = 0; index < str.length; index++) {
    const letter = str[index];
    if (letter === ' ') {
      s += '_';
    } else if (letter === '"' || letter === "'") {
      s += '';
    } else {
      s += letter;
    }
  }

  return s;
}

function makeLocalPath(albumName: string): string {
  const localImageName = makeStringFileSafe(albumName);

  return `/assets/${localImageName}.png`;
}

export const LOCAL_ALBUM_RESULTS = ALBUM_RESULTS.map((album) => ({
  ...album,
  imageUrl: makeLocalPath(album.name)
}))