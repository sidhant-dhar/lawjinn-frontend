import axios from 'axios';

function authHeaderPost() {
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
  };
}

function authHeaderGet() {
  return { 'Access-Control-Allow-Origin': '*' };
}

// const config = {
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//   },
// };

const testUrl = 'https://us-central1-lawjinn-30481.cloudfunctions.net/api';
// const prod_url = '';
// const testUrl = 'http://localhost:5000/lawjinn-30481/us-central1/api';
// https://us-central1-lawjinn-30481.cloudfunctions.net/api

// const transformRequest = (jsonData = {}) =>
//   Object.entries(jsonData)
//     .map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
//     .join('&');

export const post = (requestBody, endpoint) => {
  return axios
    .post(testUrl + endpoint, requestBody, authHeaderPost())
    .then((result) => result.data)
    .catch((err) => {
      console.error(`The error is ${err}`);
    });
};

export const get = (requestBody = null, endpoint) => {
  // requestBody must be an object
  return axios
    .get(testUrl + endpoint, { params: requestBody, headers: authHeaderGet() })
    .then((result) => result.data)
    .catch((err) => {
      console.error(`The error is ${err}`);
    });
};
