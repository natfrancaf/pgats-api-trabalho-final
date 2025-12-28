import http from 'k6/http';
import { expect } from  "https://jslib.k6.io/k6-testing/0.5.0/index.js";
import { sleep, check, group } from 'k6';
import { fazerLogin } from './helpers/login.js';
import faker from 'k6/x/faker';

import { Trend } from 'k6/metrics';
const postCheckoutDurationTrend = new Trend ('post_checkout_duration')


export const options = {
  //vus: 10,
  //duration: '10s',
  thresholds: {
    http_req_duration: ['p(90) <= 10'],
    http_req_failed: ['rate < 0.01']
  },
   stages: [
      { duration: '3s', target: 10 },
      { duration: '15s', target: 10 },
      { duration: '5s', target: 0 },
   
  ],

};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";



export default function() {
  let responseLogin = '';

  group('Fazendo Login', function(){
      responseLogin = fazerLogin(BASE_URL)
  })

  
  let responseRealizarCheckout= '';

  group('Fazendo checkout de produtos', function(){
      const card = faker.zen.creditCard();     
          
      responseRealizarCheckout = http.post(
        `${BASE_URL}/api/checkout`, 
        JSON.stringify({ 
            
        
            items: [
              {
                productId: 1,
                quantity: 25
              }
            ],
            freight: 0,
            paymentMethod: "boleto",
            cardData: {
              number: card.Number,
              name: faker.person.firstName(),
              expiry: "12/2025",
              cvv: "548"

                
      }
      
      

        }),

            

        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${responseLogin.json('token')}`
            }
        });

        check(responseRealizarCheckout, {
          'status deve ser igual a 200': (res => res.status === 200)
        })

        postCheckoutDurationTrend.add(responseRealizarCheckout.timings.duration)
      })    

 //console.log(res.body)

 //console.log(responseRealizarCheckout)
// console.log(responseLogin.json('token'))

  sleep(1);
}
