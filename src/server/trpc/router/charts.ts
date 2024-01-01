import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { getChartById } from './charts/getById';
import { createChart } from './charts/create';
import { editChart } from './charts/edit';
import { getChartsForUser } from './charts/getChartsForUser';
import { deleteChart } from './charts/delete';

export const chartsRouter = router({
  getById: publicProcedure
    .input(z.object({ uuid: z.string() }))
    .query(async ({ ctx, input }) => {
      return getChartById(input.uuid, ctx?.session?.user?.id as string);
    }),

  getUserCharts: protectedProcedure.query(async ({ ctx }) => {
    return getChartsForUser(ctx.session.user.id);
  }),

  create: protectedProcedure
    .input(
      z.object({
        albums: z.array(z.any()),
        name: z.string(),
        settings: z.object({
          background_color: z.string(),
          border_color: z.string(),
          border_size: z.number(),
          chart_format: z.string(),
          number_of_albums: z.number(),
          show_albums: z.boolean(),
          show_title: z.boolean(),
          text_color: z.string(),
          title_background_color: z.string(),
        }),
      })
    )
    .mutation(async (req) => {
      const { ctx } = req;

      return createChart(
        req.input.albums,
        req.input.name,
        req.input.settings,
        ctx?.session?.user?.id
      );
    }),

  edit: protectedProcedure
    .input(
      z.object({
        albums: z.array(z.any()),
        name: z.string(),
        uuid: z.string(),
        settings: z.object({
          background_color: z.string(),
          border_color: z.string(),
          border_size: z.number(),
          chart_format: z.string(),
          number_of_albums: z.number(),
          show_albums: z.boolean(),
          show_title: z.boolean(),
          text_color: z.string(),
          title_background_color: z.string(),
        }),
      })
    )
    .mutation((req) => {
      console.log('start mutation');
      const { ctx } = req;

      return editChart(
        req.input.uuid,
        req.input.albums,
        req.input.name,
        req.input.settings,
        ctx?.session?.user?.id
      );
    }),

  delete: protectedProcedure
    .input(
      z.object({
        uuid: z.string(),
      })
    )
    .mutation(async (req) => {
      const { ctx } = req;

      return deleteChart(req.input.uuid, ctx?.session?.user?.id as string);
    }),
});
