import { requestList } from "./requestWgApi.ts";
import { settings } from "../lib/settings.ts";
import { ShipList } from "./getShipList.ts";
import { Members } from "./getClanDetail.ts";

const statsKeys = ["ship_id"] as const;
type StatsKeys = (typeof statsKeys)[number];
type Stats = {
  [key in StatsKeys]: string;
};

type MemberStats = {
  [memberId: string]: Stats[];
};

type OwnedShips = {
  [shipId: string]: boolean;
};

export type MembersOwnedShips = {
  [memberName: string]: OwnedShips;
};

const getStats = async (memberId: string): Promise<Stats[] | false> => {
  const list = await requestList<MemberStats>(
    "/wows/ships/stats/",
    {
      account_id: memberId,
      fields: statsKeys.join(","),
    },
    `${settings.path.statsDir}/${memberId}.jsonc`
  );
  return Object.prototype.hasOwnProperty.call(list, memberId)
    ? list[memberId]
    : false;
};

const getMemberOwnedShipList = async (
  memberId: string,
  shipList: ShipList
): Promise<OwnedShips | false> => {
  const list = await getStats(memberId);
  if (list === false) {
    return false;
  }
  const hasedList: OwnedShips = list.reduce(
    (p, c) =>
      Object.defineProperty(p, c.ship_id, {
        value: settings.general.ownedSign,
      }),
    {}
  );
  const ownedShips: OwnedShips = {};
  for (const key of Object.keys(shipList)) {
    ownedShips[key] = Object.prototype.hasOwnProperty.call(hasedList, key);
  }
  return ownedShips;
};

export const getMembersOwnedShipList = async (
  members: Members,
  shipList: ShipList
): Promise<MembersOwnedShips> => {
  const membersOwnedShips: MembersOwnedShips = {};

  for (const memberId of Object.keys(members)) {
    const memberName = members[memberId].account_name;
    const ownedShips = await getMemberOwnedShipList(memberId, shipList);
    if (ownedShips === false) continue;
    membersOwnedShips[memberName] = ownedShips;
  }

  return membersOwnedShips;
};
