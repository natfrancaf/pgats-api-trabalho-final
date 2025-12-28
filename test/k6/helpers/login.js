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