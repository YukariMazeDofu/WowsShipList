import { parse } from "toml";

interface appSettings {
  wgApi: {
    appKey: string;
    url: string;
    language: string;
    limit: number;
  };
  general: {
    useCache: boolean;
    targetClanTag: string;
    ownedSign: string;
    notOwnedSign: string;
  };
  mercenary: {
    namePrefix: string;
    ignList: string[];
  };
  path: {
    shipListFile: string;
    clanListFile: string;
    clanDetailFile: string;
    accountIdDir: string;
    statsDir: string;
    outputCsvFile: string;
  };
}

const settingsToml = await Deno.readTextFile("settings.toml");
const settingsObj = parse(settingsToml);

export const settings: appSettings = settingsObj as unknown as appSettings;
