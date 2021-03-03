/**
 * 封装请求
 */
import MD5 from 'react-native-md5';

export const fetchData = {
  get: function (url) {
    return new Promise((resolve, reject) => {
      const nowTime = new Date().getTime();
      fetch(url, {
        method: 'GET',
        headers: {
          'X-LC-Id': 'AD74Yq1LURwcow94hSGXHRK9-gzGzoHsz',
          'X-LC-Sign':
            MD5.hex_md5(nowTime + 'LtxMXfalIyT29FAXchQLzAmJ') + ',' + nowTime,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  post: function (url, data) {
    return new Promise((resolve, reject) => {
      const nowTime = new Date().getTime();
      fetch(url, {
        method: 'POST',
        headers: {
          'X-LC-Id': 'AD74Yq1LURwcow94hSGXHRK9-gzGzoHsz',
          'X-LC-Sign':
            MD5.hex_md5(nowTime + 'LtxMXfalIyT29FAXchQLzAmJ') + ',' + nowTime,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  put: function (url, data) {
    return new Promise((resolve, reject) => {
      const nowTime = new Date().getTime();
      fetch(url, {
        method: 'PUT',
        headers: {
          'X-LC-Id': 'AD74Yq1LURwcow94hSGXHRK9-gzGzoHsz',
          'X-LC-Sign':
            MD5.hex_md5(nowTime + 'LtxMXfalIyT29FAXchQLzAmJ') + ',' + nowTime,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
