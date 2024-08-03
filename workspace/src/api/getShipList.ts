import { requestList } from "./requestWgApi.ts";
import { settings } from "../lib/settings.ts";

const shipDataKeys = ["tier", "type", "name"] as const;
type ShipDataKeys = (typeof shipDataKeys)[number];
type ShipData = {
  [key in ShipDataKeys]: string;
};

interface ShipList {
  [shipId: number]: ShipData;
}

export const getShipList = async (): Promise<ShipList> => {
  const list = await requestList<ShipList>(
    "/wows/encyclopedia/ships/",
    { fields: shipDataKeys.join(",") },
    settings.filePath.shipList
  );
  return list;
};
