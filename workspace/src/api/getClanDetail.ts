import { requestList } from "./requestWgApi.ts";
import { settings } from "../lib/settings.ts";

interface Member {
  role: string;
  joined_at?: number;
  account_id: string;
  account_name: string;
}

export interface Members {
  [memberId: string]: Member;
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
  members: Members;
}
interface ClanDetails {
  [clanId: string]: ClanDetail;
}

export const getClanDetail = async (
  clanId: string
): Promise<ClanDetail | false> => {
  const list = await requestList<ClanDetails>(
    "/wows/clans/info/",
    {
      clan_id: clanId,
      extra: "members",
    },
    settings.path.clanDetailFile
  );

  return Object.prototype.hasOwnProperty.call(list, clanId)
    ? list[clanId]
    : false;
};
