import axios, { AxiosRequestConfig } from 'axios';
import { tabletojson } from 'tabletojson';

import XRay from 'x-ray';
import { IOptions } from './types/IOptions';

const xray = XRay();

function formattedData(result: any, options?: IOptions) {
  if (options?.hideColumnsDescription) result.splice(0, 1);
  return result;
}

async function table(
  url: string,
  method: AxiosRequestConfig<any>['method'],
  axiosOptions?: AxiosRequestConfig<any>,
  options?: IOptions
): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    axios({ url, method, ...axiosOptions })
      .then((response) => {
        xray(response.data, ['table@html'])((error, data) => {
          if (error) {
            return reject(error);
          }

          const result = data.map(
            (x: string) => tabletojson.convert(`<table>${x}</table>`)[0]
          )[0];

          resolve(formattedData(result, options));
        });
      })
      .catch((err) => {
        return reject(err);
      });
  });
}

export default table;
