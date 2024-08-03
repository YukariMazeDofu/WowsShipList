import axios, { AxiosResponse } from "axios";
import { settings } from "../lib/settings.ts";
import { parseJsonFromFile, writeJsonToFile } from "../lib/io.ts";

interface Meta {
  count: number;
  total?: number;
  page?: number;
}

export interface WgResponse<TData> {
  status: string;
  meta: Meta;
  data: TData;
}

export const requestWgApi = async <TData>(
  apiUrl: string,
  params: { [key: string]: string }
): Promise<WgResponse<TData>[]> => {
  const responses: WgResponse<TData>[] = [];
  let response: AxiosResponse<WgResponse<TData>>;
  let pageNo = 1;
  let viewedCount = 0;
  let needRepeat = false;
  do {
    response = await axios.get<WgResponse<TData>>(
      `${settings.wgApi.url}${apiUrl}`,
      {
        params: {
          application_id: settings.wgApi.appKey,
          language: settings.wgApi.language,
          limit: settings.wgApi.limit,
          page_no: pageNo,
          ...params,
        },
      }
    );
    responses.push(response.data);
    if (response.data.meta.total === undefined) {
      needRepeat = false;
    } else {
      viewedCount += settings.wgApi.limit;
      pageNo++;
      needRepeat = viewedCount < response.data.meta.total;
    }
  } while (needRepeat);
  return responses;
};

export const requestList = async <TList>(
  url: string,
  params: { [key: string]: string },
  cachePath: string
) => {
  if (settings.general.useCache) {
    const cacheObj = await parseJsonFromFile<TList>(cachePath);
    if (cacheObj !== false) {
      return cacheObj;
    }
  }

  const responses = await requestWgApi<TList>(url, params);

  const list = responses
    .map((i) => i.data)
    .reduce((acc, obj) => {
      return { ...acc, ...obj };
    });

  writeJsonToFile(cachePath, list);
  return list;
};
