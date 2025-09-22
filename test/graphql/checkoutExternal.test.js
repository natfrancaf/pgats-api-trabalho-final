const request = require('supertest');
const {expect} = require('chai');

describe('Testes checkout', () => {
    
  beforeEach(async() => {
        const resposta = await request('http://localhost:4002/graphql')
            .post('')
            .send({
                query: `
                    mutation Login($email: String!, $password: String!) {
                       login(email: $email, password: $password) {
                          token
                        }
                    }`,
                variables:{  
                    email: "alice@email.com",
                    password: "123456"
}
                
            });

            token = resposta.body.data.login.token;
    })
    
    
    it('Validar o checkout com boleto', async () => {
        const respostaCheckout = await request('http://localhost:4002/graphql')
            .post('')
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
                    mutation Checkout($items: [CheckoutItemInput!]!, $freight: Float!, $paymentMethod: String!) {
                     checkout(items: $items, freight: $freight, paymentMethod: $paymentMethod) {
                      freight
                      items {
                          productId
                          quantity
                       }
                      paymentMethod
                      userId
                      valorFinal
                     }
                  }`,
                variables:{
                    items: [
                        {
                        "productId": 1,
                        "quantity": 2
                        },
                        {
                        "productId": 2,
                        "quantity": 1
                        }
                    ],
                    freight: 10,
                    paymentMethod: 'boleto'
                }
            });

                
        expect(respostaCheckout.status).to.equal(200)

    
    });

})
