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
    .input(z.object({
      albums: z.array(z.any())
    }))
    .mutation(async (req)  => {
      return createChart(req.input.albums);
    }),
});
