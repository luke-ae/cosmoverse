// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { slideshowRouter } from "./slideshow";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge(slideshowRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
