import { Album as DbAlbum } from "@prisma/client";
import { prisma } from "../../../../server/db/client";
import { Album } from "../../../../types/Albums";

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
      album_art_url: album.imageUrl,
      chart_id: chart.uuid,
    })),
    skipDuplicates: true, // Skip 'Bobo'
  })

  return {
    chart,
    albumsInChart
  };
}
