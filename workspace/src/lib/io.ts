export const parseJsonFromFile = async <TRead>(
  path: string
): Promise<TRead | false> => {
  try {
    const jsonText = await Deno.readTextFile(path);
    return JSON.parse(jsonText) as TRead;
  } catch {
    return false;
  }
};

export const writeJsonToFile = async <TWrite>(path: string, obj: TWrite) => {
  const jsonText = JSON.stringify(obj, null, 2);
  await Deno.writeTextFile(path, jsonText);
};
