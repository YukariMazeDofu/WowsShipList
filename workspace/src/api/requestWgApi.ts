import axios, { AxiosResponse } from "axios";
import { settings } from "../lib/settings.ts";

interface Meta {
  count: number;
  page_total: number;
  total: number;
  limit: number;
  page: number;
}

export interface WgResponse {
  status: string;
  meta: Meta;
}

export const requestWgApi = async <TResponse extends WgResponse>(
  apiUrl: string,
  params: { [key: string]: string }
) => {
  const responses: TResponse[] = [];
  let response: AxiosResponse<TResponse>;
  let pageNo = 1;
  do {
    response = await axios.get<TResponse>(`${settings.WgApi.url}${apiUrl}`, {
      params: {
        application_id: settings.WgApi.appKey,
        language: settings.WgApi.language,
        page_no: pageNo++,
        ...params,
      },
    });
    responses.push(response.data);
  } while (response.data.meta.page !== response.data.meta.page_total);
  return responses;
};
