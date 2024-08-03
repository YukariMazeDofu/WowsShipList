import { requestWgApi, WgResponse } from "./requestWgApi.ts";

const shipDataKeys = ["tier", "type", "name"] as const;
type ShipDataKeys = (typeof shipDataKeys)[number];
type ShipData = {
  [key in ShipDataKeys]: string;
};

interface ShipList {
  [shipId: number]: ShipData;
}

interface ShipListResponse extends WgResponse {
  data: ShipList;
}

export const getShipList = async () => {
  const responses = await requestWgApi<ShipListResponse>(
    "/wows/encyclopedia/ships/",
    { fields: shipDataKeys.join(",") }
  );

  const list = responses
    .map((i) => i.data)
    .reduce((acc, obj) => {
      return { ...acc, ...obj };
    });
  return list;
};
