import axios, { AxiosRequestConfig } from 'axios';
import { tabletojson } from 'tabletojson';

import XRay from 'x-ray';
import { IOptions } from './types/IOptions';
import { isValidTable } from './helpers/isValidData';
import { TableToJSONError } from './types/TableToJsonError';
import { XRayError } from './types/XRayError';

const xray = XRay();

function formattedData(result: any, options?: IOptions) {
  if (options?.hideColumnsDescription) {
    if (Array.isArray(result)) result.splice(0, 1);
  }
  if (!isValidTable(result)) return [];
  return result;
}

async function table(
  url: string,
  method: AxiosRequestConfig<any>['method'],
  axiosOptions?: AxiosRequestConfig<any>,
  options?: IOptions,
): Promise<Array<Record<string, string>>> {
  return new Promise((resolve, reject) => {
    axios({ url, method, ...axiosOptions })
      .then((response) => {
        xray(response.data, ['table@html'])((error, data) => {
          if (error) {
            return reject(new TableToJSONError(new XRayError(error)));
          }

          const result = data.map(
            (x: string) => tabletojson.convert(`<table>${x}</table>`)[0],
          )[0];

          resolve(formattedData(result, options));
        });
      })
      .catch((err) => {
        return reject(new TableToJSONError(err));
      });
  });
}

export default table;
