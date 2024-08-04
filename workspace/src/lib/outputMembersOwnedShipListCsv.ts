import { settings } from "./settings.ts";
import { MembersOwnedShips } from "../api/getMembersOwnedShipList.ts";
import { ShipList, shipDataKeys } from "../api/getShipList.ts";
import { format } from "datetime";

export const outputMemberOwnedShipListCsv = async (
  membersOwnedShips: MembersOwnedShips,
  shipList: ShipList
): Promise<void> => {
  const path = settings.path.outputCsvFile;
  const file = await Deno.open(path, {
    write: true,
    create: true,
    truncate: true,
  });
  const encoder = new TextEncoder();
  const writer = file.writable.getWriter();

  const memberNames = Object.keys(membersOwnedShips).sort();
  const mercenaryNames = memberNames.filter((v) =>
    v.startsWith(settings.mercenary.namePrefix)
  );

  const metaData: string[][] = [];
  metaData.push([
    `"exportDate"`,
    `"${format(new Date(), "yyyy/mm/dd hh:mm:ss")} UTC"`,
  ]);
  metaData.push([
    `"mercenaries"`,
    mercenaryNames.map((name) => `"${name}"`).join(","),
  ]);
  metaData.forEach(
    async (line) => await writer.write(encoder.encode(line.join(",") + "\n"))
  );

  await writer.write(encoder.encode("\n"));

  const header = [
    ...shipDataKeys.map((fieldName) => `"${fieldName}"`),
    ...memberNames.map((userName) => `"${userName}"`),
  ];
  await writer.write(encoder.encode(header.join(",") + "\n"));

  for (const shipId of Object.keys(shipList)) {
    const line = [
      ...shipDataKeys.map((field) => `"${shipList[shipId][field]}"`),
      ...memberNames.map(
        (memberName) => `"${membersOwnedShips[memberName][shipId]}"`
      ),
    ];
    await writer.write(encoder.encode(line.join(",") + "\n"));
  }
};
