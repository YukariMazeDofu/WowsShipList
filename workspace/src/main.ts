import { settings } from "./lib/settings.ts";
import { getShipList } from "./api/getShipList.ts";
import { searchClanByTag } from "./api/searchClansByTag.ts";
import { getClanDetail } from "./api/getClanDetail.ts";
import { getMembersOwnedShipList } from "./api/getMembersOwnedShipList.ts";
import { outputMemberOwnedShipListCsv } from "./api/outputMembersOwnedShipListCsv.ts";

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

  console.log(`クランID:${targetClanId} のクラン詳細の取得`);
  const targetClanDetail = await getClanDetail(targetClanId);
  if (targetClanDetail === false) {
    console.error(
      `クランID:${targetClanId} のクラン詳細が見つかりませんでした。`
    );
    return;
  }
  const members = targetClanDetail.members;
  const membersOwnedShips = await getMembersOwnedShipList(members, shipList);

  await outputMemberOwnedShipListCsv(membersOwnedShips, shipList);
};

main();
