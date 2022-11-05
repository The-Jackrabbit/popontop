import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { getChartById } from "./charts/getById";
import { createChart } from "./charts/create";


export const chartsRouter = router({
  getById: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .query(async ({ input }) => {
      return getChartById(input.uuid);
    }),

  create: publicProcedure
    .input(
      z.object({
        albums: z.array(z.any()),
        name: z.string(),
        settings: z.object({
          backgroundColor: z.string(),
          borderColor: z.string(),
          borderSize: z.number(),
          showAlbums: z.boolean(),
          showTitle: z.boolean(),
          textColor: z.string(),
        }),
      })
    )
    .mutation(async (req)  => {
      return createChart(req.input.albums, req.input.name, req.input.settings);
    }),
});
