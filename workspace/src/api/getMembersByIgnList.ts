import { requestList } from "./requestWgApi.ts";
import { settings } from "../lib/settings.ts";
import { Members } from "./getClanDetail.ts";

const userDataKeys = ["nickname", "account_id"] as const;
type UserDataKeys = (typeof userDataKeys)[number];
type UserData = {
  [key in UserDataKeys]: string;
};

const searchUserByIgn = async (ign: string): Promise<UserData | false> => {
  const list = await requestList<UserData[]>(
    "/wows/account/list/",
    {
      search: ign,
      type: "exact",
    },
    `${settings.path.accountIdDir}/${ign}.jsonc`
  );
  return list.length ? list[0] : false;
};

export const getMembersByIgnList = async (
  ignList: string[]
): Promise<Members> => {
  const members: Members = {};
  for (const ign of ignList) {
    const userData = await searchUserByIgn(ign);
    if (userData === false) {
      console.warn(`IGN:${ign} は見つかりませんでした。`);
      continue;
    }
    members[userData.account_id] = {
      role: "mercenary",
      account_id: userData.account_id,
      account_name: `${settings.mercenary.namePrefix}${userData.nickname}`,
    };
  }
  return members;
};
