import axios from 'axios';
import { env } from "../../env/server.mjs";

// src/pages/api/albums.ts
import type { NextApiRequest, NextApiResponse } from "next";

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


const albums = async (input) => {

  const url = `http://ws.audioscrobbler.com/2.0/?method=album.search&api_key=${env.LASTFM_API_KEY}&album=${query}&format=json&limit=10`;

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
  
    res.status(200).json({
      type: 'success',
      albums: albums,
      code: 200,
    });
  } catch { 
    res.send({
      type: 'error',
      code: 404,
    });
  }
};

export default albums;
