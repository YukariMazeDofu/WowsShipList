import { settings } from "./lib/settings.ts";
import { getShipList } from "./api/getShipList.ts";
import { searchClanByTag } from "./api/searchClansByTag.ts";
import { getClanDetail } from "./api/getClanDetail.ts";
import { getMembersOwnedShipList } from "./api/getMembersOwnedShipList.ts";
import { getMembersByIgnList } from "./api/getMembersByIgnList.ts";
import { outputMemberOwnedShipListCsv } from "./lib/outputMembersOwnedShipListCsv.ts";

const main = async () => {
  console.log("全艦艇情報の取得");
  const shipList = await getShipList();

  console.log(
    `クランタグ:${settings.general.targetClanTag} のクラン情報の取得`
  );
  const targetClan = await searchClanByTag(settings.general.targetClanTag);
  if (targetClan === false) {
    console.error(
      `クランタグ:${settings.general.targetClanTag} のクランは見つかりませんでした。`
    );
    return;
  }
  const targetClanId = targetClan.clan_id;

  console.log(`クランID:${targetClanId} のクランメンバの取得`);
  const targetClanDetail = await getClanDetail(targetClanId);
  if (targetClanDetail === false) {
    console.error(
      `クランID:${targetClanId} のクラン詳細が見つかりませんでした。`
    );
    return;
  }
  const clanMembers = targetClanDetail.members;

  console.log("傭兵メンバ情報の取得");
  const mercenaries = await getMembersByIgnList(settings.mercenary.ignList);
  const members = { ...clanMembers, ...mercenaries };

  console.log("Statsの取得");
  const membersOwnedShips = await getMembersOwnedShipList(members, shipList);

  console.log("CSV形式での出力");
  await outputMemberOwnedShipListCsv(membersOwnedShips, shipList);

  console.log("出力しました");
};

main();
