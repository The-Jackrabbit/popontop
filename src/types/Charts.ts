import { Album } from "./Albums";

export interface Chart {
  name: string;
  albums: Album[];
  uuid: string;
}