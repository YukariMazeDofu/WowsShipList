import { getShipList } from "./api/getShipList.ts";

const shipList = await getShipList();

console.log(shipList);
