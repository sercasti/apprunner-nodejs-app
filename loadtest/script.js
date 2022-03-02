import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 2 },
    { duration: '1m30s', target: 20 },
    { duration: '20s', target: 0 },
  ],
};

const targetUrl = 'https://5gfwv2utec.us-east-1.awsapprunner.com'

export default function () {
  const req1 = {
    method: 'GET',
    url: targetUrl + '/list'
  };
  const req2 = {
    method: 'GET',
    url: targetUrl + '/add'
  };
  const req3 = {
    method: 'GET',
    url: targetUrl
  };
  const responses = http.batch([req1, req2, req3]);
  check(responses[0], {
      'main page status was 200': (res) => res.status === 200,
  });
}