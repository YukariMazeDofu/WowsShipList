import { parse } from "toml";

interface appSettings {
  WgApi: {
    url: string;
    language: string;
    appKey: string;
  };
}

const settingsToml = Deno.readTextFileSync("settings.toml");
const settingsObj = parse(settingsToml);

export const settings: appSettings = settingsObj as unknown as appSettings;
