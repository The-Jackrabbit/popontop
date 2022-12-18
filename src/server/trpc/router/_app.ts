// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { exampleRouter } from './example';
import { authRouter } from './auth';
import { albumsRouter } from './albums';
import { chartsRouter } from './charts';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  albums: albumsRouter,
  charts: chartsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
