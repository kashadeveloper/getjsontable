# getjsontable

JS library which helps to get some site table converted to json

``⚠️ NOTE: this library may work unstable, so please create an issue if you encounter an error``

## Installation

with **NPM**
```
npm install getjsontable
```

with **YARN**
```
yarn add getjsontable
```

## Code example
```javascript
import table from "getjsontable";
table(`https://sa-mp.ru/adminhistory-aurum`)
  .then((res) => console.log(res[1][1]))
  .catch((err) => console.log(`err: ${err}`));
```


```
[
  {'0': <first column data of first row>, '1': <second column data of first row>, .... }
]
```
