//bibliotecas
const request = require('supertest'); 
const  {expect} =  require('chai'); 


//Testes
describe('Checkout external', () => {
    describe('POST /api/users/register', () => {
        it('Quando registro um usuário com email já cadastrado recebo 400', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/register')
                .send({
                    name: 'fabio',
                    email: 'alice@email.com',
                    password: '123456'
                })

            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('error', 'Email já cadastrado')
        })

        it('Quando registro um usuário novo recebo 201', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/api/users/register')
                .send({
                    name: 'Natalia',
                    email: 'natalia@email.com',
                    password: '123456'
                })

            expect(resposta.status).to.equal(201)
           // expect(resposta.body).to.have.property('error', 'Email já cadastrado')
        })
    })
})