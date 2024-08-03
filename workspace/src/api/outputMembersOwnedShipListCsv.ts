import { settings } from "../lib/settings.ts";
import { MembersOwnedShips } from "./getMembersOwnedShipList.ts";
import { ShipList, shipDataKeys } from "./getShipList.ts";

export const outputMemberOwnedShipListCsv = async (
  membersOwnedShips: MembersOwnedShips,
  shipList: ShipList
) => {
  const path = settings.path.outputCsvFile;
  const file = await Deno.open(path, {
    write: true,
    create: true,
    truncate: true,
  });
  const encoder = new TextEncoder();
  const writer = file.writable.getWriter();

  const memberNames = Object.keys(membersOwnedShips);

  const header = [
    ...shipDataKeys.map((fieldName) => `"${fieldName}"`),
    ...memberNames.map((userName) => `"${userName}"`),
    "\n",
  ];
  await writer.write(encoder.encode(header.join(",")));

  for (const shipId of Object.keys(shipList)) {
    const line = [
      ...shipDataKeys.map((field) => `"${shipList[shipId][field]}"`),
      ...memberNames.map(
        (memberName) => `"${membersOwnedShips[memberName][shipId]}"`
      ),
      "\n",
    ];
    await writer.write(encoder.encode(line.join(",")));
  }
};
