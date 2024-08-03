import { requestList } from "./requestWgApi.ts";
import { settings } from "../lib/settings.ts";

export const shipDataKeys = ["tier", "type", "nation", "name"] as const;
type ShipDataKeys = (typeof shipDataKeys)[number];
type ShipData = {
  [key in ShipDataKeys]: string;
};

export interface ShipList {
  [shipId: string]: ShipData;
}

export const getShipList = async (): Promise<ShipList> => {
  const list = await requestList<ShipList>(
    "/wows/encyclopedia/ships/",
    { fields: shipDataKeys.join(",") },
    settings.path.shipListFile
  );
  return list;
};
