import { ChartSettings } from "@prisma/client";
import { Settings } from "../server/trpc/router/charts/create";
import { Album } from "./Albums";

export interface Chart {
  name: string;
  albums: Album[];
  settings: ChartSettings | null;
  uuid: string;
}