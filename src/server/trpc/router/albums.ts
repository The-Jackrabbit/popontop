import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import axios from 'axios';
import { env } from "../../../env/server.mjs";

export const albumsRouter = router({
  search: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const t = await albums(input.text);
      return t;
    }),
});

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
  name: string;
  artist: string;
  lastfmId: string;
}


const albums = async (input: string): Promise<Album[]> => {
  const url = `http://ws.audioscrobbler.com/2.0/?method=album.search&api_key=${env.LASTFM_API_KEY}&album=${input}&format=json&limit=10`;

  try {
    const response = await axios.get(url)
    const results = response.data.results;
    
    const albums: Album[] = [];
    if (results.albummatches && results.albummatches.album) {
      results.albummatches.album.forEach((album: LastFmAlbum) => {
        albums.push({
          imageUrl: album.image[2]['#text'],
          name: album.name,
          artist: album.artist,
          lastfmId: album.mbid,
        });
      });
    }
  
    return albums;
  } catch { 
    return [];
  }
};

export default albums;
