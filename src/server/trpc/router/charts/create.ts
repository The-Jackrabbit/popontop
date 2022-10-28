import { Album as DbAlbum } from "@prisma/client";
import { prisma } from "../../../../server/db/client";
import { Album } from "../../../../types/Albums";
export const lastFmImageOrigin = "https://lastfm.freetls.fastly.net/i/u/174s/";
export const formatUrl = (url: string) => {
  if (url.length < 43) {
    return '';
  }

  if (url.substring(0, 43) !== lastFmImageOrigin) {
    return '';
  }

  return url;
}

export const createChart = async (albums: Album[]) => {
  const chart = await prisma.chart.create({
    data: {
      name: 'My chart'
    },
  });

  const albumsInChart = await prisma.album.createMany({
    data: albums.map((album: Album) => ({
      name: album.name,
      artist: album.artist,
      album_art_url: formatUrl(album.imageUrl),
      chart_id: chart.uuid,
    })),
    skipDuplicates: true, // Skip 'Bobo'
  })

  return {
    chart,
    albumsInChart
  };
}
