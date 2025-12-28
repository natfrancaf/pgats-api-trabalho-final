# Trabalho Final Disciplina Automação de Testes de Performance 

# Thresholds
(Código armazenado no arquivo \test\k6\trabalho-final-k6.js)
O código abaixo usa o conceito de thresholds, validando as requisições http_req_duration e http_req_failed


export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(90) <= 10'],
    http_req_failed: ['rate < 0.01']
  }

# Checks
(Código armazenado no arquivo \test\k6\trabalho-final-k6.js)
O código abaixo usa o conceito de check, validando a resposta 200 da api após fazer o checkout de um produto

check(responseRealizarCheckout, {
      'status deve ser igual a 200': (res => res.status === 200)
    })


# Helpers

(Código armazenado no arquivo test\k6\helpers\login.js) 
O código abaixo utiliza o conceito de Helper. Foi criado um helper de login que retorna o token que é utilizado no arquivo de testes

import http from 'k6/http';

export function fazerLogin(baseUrl){
    return http.post(`${baseUrl}/api/users/login`, 
            JSON.stringify({ 
                email: 'teste@teste.com.br', 
                password: '123456'
            }),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
      
        }

Chamada da função do helper (arquivo \test\k6\trabalho-final-k6.js)
export default function() {
  let responseLogin = '';

  group('Fazendo Login', function(){
      responseLogin = fazerLogin(BASE_URL)
  })

# Trends
(Código armazenado no arquivo \test\k6\trabalho-final-k6.js)
O código abaixo utiliza o conceito de Trends. 


const postCheckoutDurationTrend = new Trend ('post_checkout_duration')


 postCheckoutDurationTrend.add(responseRealizarCheckout.timings.duration)


# Faker
(Código armazenado no arquivo \test\k6\trabalho-final-k6.js)
O código abaixo utiliza o conceito de Faker para os dados de nome e número do cartão. 

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


# Variável de Ambiente
(Código armazenado no arquivo \test\k6\trabalho-final-k6.js)
O código abaixo utiliza o conceito de variável de ambiente, definindo a url base dos testes

Definição da variavel
const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

Utilizando a variavel
  group('Fazendo Login', function(){
      responseLogin = http.post(`${BASE_URL}/api/users/login`, 
        JSON.stringify({ 


# Stages
(Código armazenado no arquivo \test\k6\trabalho-final-k6.js)
O código abaixo utiliza o conceito de stages

export const options = {
  vus: 10,
  duration: '10s',
  thresholds: {
    http_req_duration: ['p(90) <= 10'],
    http_req_failed: ['rate < 0.01']
  },
   stages: [
      { duration: '3s', target: 10 },
      { duration: '15s', target: 10 },
      { duration: '5s', target: 0 },
   
  ],


# Reaproveitamento de Resposta
(Código armazenado no arquivo \test\k6\trabalho-final-k6.js)
Utilizando a resposta do login com o token para fazer o teste do checkout
{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${responseLogin.json('token')}`
            }
        });


# Uso de Token de Autenticação
(Código armazenado no arquivo \test\k6\trabalho-final-k6.js)
O código abaixo utiliza o token de autetincação para recuperado no response do login para realizar um checkout de produto
 {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${responseLogin.json('token')}`
            }
        });

# Data-Driven Testing

Os códigos abaixo utilizam o conceito de data-driven testing
(Código armazenado no arquivo test\k6\data\login.test.data.json)
Arquivo com os dados:

[
    {
         "email": "bob@email.com",
         "password": "123456"

    },
    {
        "email": "alice@email.com",
        "password": "123456"
    }

    

]

Utilização dos dados no teste (código armazenado no arquivo test\k6\login.test.js):
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
      


# Groups
(Código armazenado no arquivo \test\k6\trabalho-final-k6.js)
O código abaixo utiliza o conceito de groups 

group('Fazendo Login', function(){
      responseLogin = fazerLogin(BASE_URL)
  })

  
  let responseRealizarCheckout= '';

  group('Fazendo checkout de produtos', function(){
      const card = faker.zen.creditCard(); 






# API Checkout Rest e GraphQL

Se você é aluno da Pós-Graduação em Automação de Testes de Software (Turma 2), faça um fork desse repositório e boa sorte em seu trabalho de conclusão da disciplina.

## Instalação

```bash
npm install express jsonwebtoken swagger-ui-express apollo-server-express graphql
```

## Exemplos de chamadas

### REST

#### Registro de usuário
```bash
curl -X POST http://localhost:3000/api/users/register \
	-H "Content-Type: application/json" \
	-d '{"name":"Novo Usuário","email":"novo@email.com","password":"senha123"}'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/users/login \
	-H "Content-Type: application/json" \
	-d '{"email":"novo@email.com","password":"senha123"}'
```

#### Checkout (boleto)
```bash
curl -X POST http://localhost:3000/api/checkout \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer <TOKEN_JWT>" \
	-d '{
		"items": [{"productId":1,"quantity":2}],
		"freight": 20,
		"paymentMethod": "boleto"
	}'
```

#### Checkout (cartão de crédito)
```bash
curl -X POST http://localhost:3000/api/checkout \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer <TOKEN_JWT>" \
	-d '{
		"items": [{"productId":2,"quantity":1}],
		"freight": 15,
		"paymentMethod": "credit_card",
		"cardData": {
			"number": "4111111111111111",
			"name": "Nome do Titular",
			"expiry": "12/30",
			"cvv": "123"
		}
	}'
```

### GraphQL

#### Registro de usuário
Mutation:
```graphql
mutation Register($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    email
    name
  }
}

Variables:
{
  "name": "Julio",
  "email": "julio@abc.com",
  "password": "123456"
}
```

#### Login
Mutation:
```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}

Variables:
{
  "email": "alice@email.com",
  "password": "123456"
}
```


#### Checkout (boleto)
Mutation (envie o token JWT no header Authorization: Bearer <TOKEN_JWT>):
```graphql
mutation Checkout($items: [CheckoutItemInput!]!, $freight: Float!, $paymentMethod: String!, $cardData: CardDataInput) {
  checkout(items: $items, freight: $freight, paymentMethod: $paymentMethod, cardData: $cardData) {
    freight
    items {
      productId
      quantity
    }
    paymentMethod
    userId
    valorFinal
  }
}

Variables:
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ],
  "freight": 10,
  "paymentMethod": "boleto"
}
```

#### Checkout (cartão de crédito)
Mutation (envie o token JWT no header Authorization: Bearer <TOKEN_JWT>):
```graphql
mutation {
	checkout(
		items: [{productId: 2, quantity: 1}],
		freight: 15,
		paymentMethod: "credit_card",
		cardData: {
			number: "4111111111111111",
			name: "Nome do Titular",
			expiry: "12/30",
			cvv: "123"
		}
	) {
		valorFinal
		paymentMethod
		freight
		items { productId quantity }
	}
}

Variables:
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ],
  "freight": 10,
  "paymentMethod": "credit_card",
  "cardData": {
    "cvv": "123",
    "expiry": "10/04",
    "name": "Julio Costa",
    "number": "1234432112344321"
  }
}
```

#### Consulta de usuários
Query:
```graphql
query Users {
  users {
    email
    name
  }
}
```

## Como rodar

### REST
```bash
node rest/server.js
```
Acesse a documentação Swagger em [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### GraphQL
```bash
node graphql/app.js
```
Acesse o playground GraphQL em [http://localhost:4000/graphql](http://localhost:4000/graphql)

## Endpoints REST
- POST `/api/users/register` — Registro de usuário
- POST `/api/users/login` — Login (retorna token JWT)
- POST `/api/checkout` — Checkout (requer token JWT)

## Regras de Checkout
- Só pode fazer checkout com token JWT válido
- Informe lista de produtos, quantidades, valor do frete, método de pagamento e dados do cartão se necessário
- 5% de desconto no valor total se pagar com cartão
- Resposta do checkout contém valor final

## Banco de dados
- Usuários e produtos em memória (veja arquivos em `src/models`)

## Testes
- Para testes automatizados, importe o `app` de `rest/app.js` ou `graphql/app.js` sem o método `listen()`

## Documentação
- Swagger disponível em `/api-docs`
- Playground GraphQL disponível em `/graphql`
