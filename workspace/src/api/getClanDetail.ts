import { requestList } from "./requestWgApi.ts";
import { settings } from "../lib/settings.ts";

interface Member {
  role: string;
  joined_at: number;
  account_id: number;
  account_name: string;
}

interface ClanDetail {
  members_count: number;
  name: string;
  creator_name: string;
  created_at: number;
  tag: string;
  updated_at: number;
  leader_name: string;
  member_ids: number[];
  creator_id: number;
  clan_id: number;
  members: { [memberId: string]: Member };
}
interface ClanDetails {
  [clanId: string]: ClanDetail;
}

export const getClanDetail = async (
  clan_id: string
): Promise<ClanDetail | false> => {
  const list = await requestList<ClanDetails>(
    "/wows/clans/info/",
    {
      clan_id: clan_id,
      extra: "members",
    },
    settings.filePath.clanDetail
  );

  return Object.prototype.hasOwnProperty.call(list, clan_id)
    ? list[clan_id]
    : false;
};
