export interface LastFmAlbumImage {
  '#text': string;
}

export interface LastFmAlbum {
  image: [LastFmAlbumImage, LastFmAlbumImage, LastFmAlbumImage];
  name: string;
  artist: string;
  mbid: string;
}

export interface Album {
  imageUrl: string;
  images?: any[];
  name: string;
  artist: string;
  lastfmId: string;
}
