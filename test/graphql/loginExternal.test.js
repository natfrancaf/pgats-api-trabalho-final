const request = require('supertest');
const {expect} = require('chai');

describe('Testes login', () => {
    
  it('Quando tentar logar com credenciais inválidas recebo um erro', async () => {
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
                    email: "teste@email.com",
                    password: "123456"
}
                
            });

          expect(resposta.body.errors[0].message).to.equal('Credenciais inválidas'); 
    })
    
    
    
})
