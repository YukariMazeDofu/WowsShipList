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
  };
  filePath: {
    shipList: string;
    clanList: string;
    clanDetail: string;
  };
}

const settingsToml = await Deno.readTextFile("settings.toml");
const settingsObj = parse(settingsToml);

export const settings: appSettings = settingsObj as unknown as appSettings;
