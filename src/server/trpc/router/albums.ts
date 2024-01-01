import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import axios from 'axios';
import { env } from '../../../env/server.mjs';
import { Album, LastFmAlbum, LastFmAlbumImage } from '../../../types/Albums';

export const albumsRouter = router({
  search: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const t = await albums(input.text);
      return t;
    }),
  searchArtists: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const t = await artists(input.text);
      return t;
    }),
});

const albums = async (input: string): Promise<Album[]> => {
  const url = `http://ws.audioscrobbler.com/2.0/?method=album.search&api_key=${env.LASTFM_API_KEY}&album=${input}&format=json&limit=10`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;

    const albums: Album[] = [];

    if (results.albummatches && results.albummatches.album) {
      results.albummatches.album.forEach((album: LastFmAlbum) => {
        albums.push({
          imageUrl: album.image[2]['#text'],
          // name: album.name,
          // artist: album.artist,
          lastfmId: album.mbid,
          ...album,
        });
      });
    }

    return albums;
  } catch {
    return [];
  }
};

type LastFmArtist = {
  // <name>Cher</name>
  // <mbid>bfcc6d75-a6a5-4bc6-8282-47aec8531818</mbid>
  // <url>www.last.fm/music/Cher</url>
  // <image_small>http://userserve-ak.last.fm/serve/50/342437.jpg</image_small>
  // <image>http://userserve-ak.last.fm/serve/160/342437.jpg</image>
  // <streamable>1</streamable>
  name: string;
  mbid: string;
  url: string;
  image_small: string;
  image: [LastFmAlbumImage, LastFmAlbumImage, LastFmAlbumImage];
  streamble: number;
};
const getSpotifyToken = async (): Promise<string> => {
  const response = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        new Buffer(
          env.SPOTIFY_CLIENT_ID + ':' + env.SPOTIFY_CLIENT_SECRET
        ).toString('base64'),
    },
    data: 'grant_type=client_credentials',
  });

  return response.data.access_token;
};

const getArtistData = async (query: string) => {
  const token = await getSpotifyToken();

  // console.log({ token, query });

  try {
    const response = await axios.get(
      `
https://api.spotify.com/v1/search?q=${query}&type=artist&limit=10`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );

    // console.log({ response });

    return response;
  } catch (e) {
    // console.log({ e });
  }

  return { data: {} };
};

export type SpotifyArtist = {
  external_urls: any[];
  followers: any[];
  genres: any[];
  href: string; // 'https://api.spotify.com/v1/artists/0A6gBmr2Q923OnZd3uxEWA',
  id: string; // '0A6gBmr2Q923OnZd3uxEWA';
  images: {
    height: number;
    url: string;
    width: number;
  }[]; // [Array];
  name: string; // 'Beatles In Harmony';
  popularity: number; // 7;
  type: string; // 'artist';
  uri: string; // 'spotify:artist:0A6gBmr2Q923OnZd3uxEWA';
};

const artists = async (input: string): Promise<Album[]> => {
  const url = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=${env.LASTFM_API_KEY}&artist=${input}&format=json`;

  try {
    const response = await getArtistData(input);
    const results = response.data.artists;

    const artists: Album[] = [];
    console.log({ response: results.items });

    if (results.items) {
      results.items.forEach((artist: SpotifyArtist) => {
        console.log({ images: artist.images });
        artists.push({
          // imageUrl: artist.image[2]['#text'],
          imageUrl: artist.images[0]?.url ?? '',
          name: artist.name,
          artist: '',
          lastfmId: '',
        });
      });
    }

    return artists;
  } catch {
    return [];
  }
};

export default albums;
