import { requestList } from "./requestWgApi.ts";
import { settings } from "../lib/settings.ts";

const clanDataKeys = [
  "clan_id",
  "created_at",
  "members_count",
  "name",
  "tag",
] as const;
type ClanDataKeys = (typeof clanDataKeys)[number];
type ClanData = {
  [key in ClanDataKeys]: string;
};

type ClanList = ClanData[];

export const searchClansByTag = async (tag: string): Promise<ClanList> => {
  const list = await requestList<ClanList>(
    "/wows/clans/list/",
    { search: tag },
    settings.filePath.clanList
  );
  return list;
};

export const searchClanByTag = async (
  tag: string
): Promise<ClanData | false> => {
  const upperTag = tag.toUpperCase();
  const list = await searchClansByTag(tag);
  for (const value of Object.values(list)) {
    if (value.tag === upperTag) {
      return value;
    }
  }
  return false;
};
