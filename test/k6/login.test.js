import http from 'k6/http';
import { expect } from  "https://jslib.k6.io/k6-testing/0.5.0/index.js";
import { sleep, check, group } from 'k6';
import { fazerLogin } from './helpers/login.js';
import faker from 'k6/x/faker';

import { SharedArray } from 'k6/data';

const users = new SharedArray('users', function () {
    return JSON.parse(open('./data/login.test.data.json'))
});

import { Trend } from 'k6/metrics';
const postCheckoutDurationTrend = new Trend ('post_checkout_duration')


export const options = {
  vus: 2,
  iterations: 2,
  thresholds: {
    http_req_duration: ['p(90) <= 10'],
    http_req_failed: ['rate < 0.01']
  }

};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

export default function(){

    const user = users[(__VU -1) % users.length];

    console.log(user);

    const email = user.email;
    const password = user.password;

    const res = http.post(`${BASE_URL}/api/users/login`, 
            JSON.stringify({ 
                email, password
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            check(res, {'status deve ser igual a 200': (r) => r.status === 200});

            sleep(1);

            
        }
      
        


