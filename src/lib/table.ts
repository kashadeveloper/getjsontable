import axios from 'axios';
import { Tabletojson } from 'tabletojson';
import XRay from 'x-ray';

const xray = XRay();

async function table(
  url: string,
  method: 'post' | 'get',
  options?: any
): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    if (method == 'get')
      axios
        .get(url, options)
        .then((response) => {
          if (response.status >= 400)
            return reject(
              new Error(`Site was returned ${response.status} code`)
            );
          xray(response.data, ['table@html'])((error, data) => {
            if (error) {
              return reject(error);
            }
            resolve(
              data.map(
                (x: string) => Tabletojson.convert(`<table>${x}</table>`)[0]
              )[0]
            );
          });
        })
        .catch((err) => {
          return reject(err);
        });
    else
      axios
        .post(url, options)
        .then((response) => {
          if (response.status >= 400)
            return reject(
              new Error(`Site was returned ${response.status} code`)
            );
          xray(response.data, ['table@html'])((error, data) => {
            if (error) {
              return reject(error);
            }
            resolve(
              data.map(
                (x: string) => Tabletojson.convert(`<table>${x}</table>`)[0]
              )[0]
            );
          });
        })
        .catch((err) => {
          return reject(err);
        });
  });
}

export default table;
