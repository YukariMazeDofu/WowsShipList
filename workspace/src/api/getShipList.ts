import { requestList } from "./requestWgApi.ts";
import { settings } from "../lib/settings.ts";

export const shipDataKeys = ["tier", "type", "nation", "name"] as const;
type ShipDataKeys = (typeof shipDataKeys)[number];
type ShipData = {
  [key in ShipDataKeys]: string;
};

export type ShipList = {
  [shipId: string]: ShipData;
};

export const getShipList = async (): Promise<ShipList> => {
  return await requestList<ShipList>(
    "/wows/encyclopedia/ships/",
    { fields: shipDataKeys.join(",") },
    settings.path.shipListFile
  );
};
