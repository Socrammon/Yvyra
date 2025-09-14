# Nome do Projeto: Yvyra
-----------------------------------------------------------------------------------------------------------------------------------
# Escola: ETEC Dr. Geraldo José Rodrigues Alckmin
-----------------------------------------------------------------------------------------------------------------------------------
# Equipe:
Marcos Vinicius Alcides da Costa
Luan Kaue dos Santos Queiroz
Mykael Guedes Correia Mota
-----------------------------------------------------------------------------------------------------------------------------------
# Descrição do projeto:
O projeto Yvyra foi criado como resposta à dificuldade que muitas pessoas enfrentam ao aprender eletrônica, principalmente quando precisam criar circuitos de forma estruturada por meio de descrições simples e não técnicas. Em ambientes educacionais e autodidatas, a transição da ideia do circuito até sua representação prática pode ser um grande obstáculo, exigindo conhecimento prévio em ferramentas de modelagem ou montagem manual, o que limita a acessibilidade para iniciantes. Pensando nisso, o Yvyra oferece uma solução que une inteligência artificial e simplicidade de uso: um sistema capaz de transformar descrições escritas em estruturas digitais de circuitos de forma automática. Por meio de uma interface web intuitiva, o usuário insere um texto descrevendo o circuito que deseja, e o sistema, com apoio da API da OpenAI, interpreta esse texto e gera um modelo digital no formato adequado para visualização. Todo o processamento acontece em um backend em Node.js. O resultado é uma ferramenta educacional interativa que reduz barreiras técnicas, acelera o processo de prototipagem e torna o estudo de sistemas embarcados mais acessível, rápido e estimulante.
-----------------------------------------------------------------------------------------------------------------------------------
# Tecnologias usadas:

Linguagem: Node.js: v20.10.0
Framework: Express.js: v5.1.0

Bibliotecas:
@supabase/supabase-js: v2.57.4  
cors: v2.8.5  
dotenv: v17.2.2  
multer: v2.0.2  
sqlite3: v5.1.7  
node-fetch: v3.3.2  
openai: v5.20.1  
sequelize: v6.37.7  
nodemon: v3.1.10  
jsonwebtoken v9.0.2
bcrypt 6.0.0


API externa: Groq

Versionamento: GitHub

Front-end:
HTML, CSS e JavaScript puro
-----------------------------------------------------------------------------------------------------------------------------------
# Instruções de instalação/execução:

Instalação(Via chocolatey):
Node.js: v20.10.0 - choco install nodejs --version=20.10.0 -y

Variaveis de ambiente:
Ghostscript: v10.06.0 - choco install ghostscript --version=10.06.0 -y
MiKTeX: v4.12.0.0 - choco install miktex --version=4.12.0.0 -y
ImageMagick: v7.1.2.3 - choco install imagemagick --version=7.1.2.3 -y

Instalação de bibliotecas:
npm install express@5.1.0 @supabase/supabase-js@2.57.4 cors@2.8.5 dotenv@17.2.2 multer@2.0.2 sqlite3@5.1.7 node-fetch@3.3.2 openai@5.20.1 sequelize@6.37.7 --save
npm install nodemon@3.1.10 --save-dev

Execução(comando):
start: "node src/app.js"
dev: "nodemon src/app.js"
-------------------------------------------------------------------------------------------------------------------
# Documentação das rotas:

Rotas(autentificação):

Parâmetro para a requisições: autentificação

http://localhost:3000/api/register - POST
{
  "nome": "Luan",
  "email": "luan@teste.com",
  "senha": "123456"
}

Resposta esperada :

{ "msg": "Usuário cadastrado!" }

http://localhost:3000/api/login - POST

{
  "email": "luan@teste.com",
  "senha": "123456"
}

Resposta esperada:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

http://localhost:3000/api/perfil - GET
Key: Authorization
Value: Bearer SEU_TOKEN_AQUI

Código para baixar as bibliotecas: npm install express jsonwebtoken bcrypt body-parser dotenv

Reposta esperada:

{
  "msg": "Acesso autorizado",
  "user": {
    "nome": "teste",
    "email": "teste@teste.com",
    "iat": 16900...,
    "exp": 16900...
  }
}

Rotas(perguntar):

Parâmetro para requisições: pergunta

http://localhost:3000/perguntar/simples - POST
http://localhost:3000/perguntar/ensinar - POST
http://localhost:3000/perguntar/imagem - POST
http://localhost:3000/perguntar/simulacao - POST

Rotas(favoritar):

Parâmetro para requisições: titulo, texto
http://localhost:3000/favoritos/mensagem - POST

http://localhost:3000/favoritos/mensagem - GET
http://localhost:3000/favoritos/mensagem/:id - GET
http://localhost:3000/favoritos/mensagem/:id - DELETE

Parâmetro para requisições: titulo
http://localhost:3000/favoritos/imagem - POST

http://localhost:3000/favoritos/imagem - GET
http://localhost:3000/favoritos/imagem/:id - GET
http://localhost:3000/favoritos/imagem/:id - DELETE

Parâmetro para requisições: titulo, codigo
http://localhost:3000/favoritos/simulacao - POST

http://localhost:3000/favoritos/simulacao - GET
http://localhost:3000/favoritos/simulacao/:id - GET
http://localhost:3000/favoritos/simulacao/:id - DELETE

Respostas possiveis:
200 (OK)
201 (Created)
204 (No Content)
400 (Bad Request)
404 (Not found)
500 (Internal Server Error)

Exemplo de requisição:
{
  "pergunta": "imagem:Eu quero um led ligado a uma bateria" 
}

Exemplo de resposta:
{
	"resposta": "\n      \\documentclass{standalone}\n      \\usepackage{circuitikz}\n      \\begin{document}\n      \\begin{circuitikz}\n        \\draw\n          (0,0) to[battery] (0,2)\n          to[resistor] (2,2)\n          to[led] (2,0)\n          -- (0,0);\n      \\end{circuitikz}\n      \\end{document}\n    "
}

Resposta(versão clara):
{
    "resposta": "
      \\documentclass{standalone}
      \\usepackage{circuitikz}
      \\begin{document}
      \\begin{circuitikz}
        \\draw
          (0,0) to[battery] (0,2)
          to[resistor] (2,2)
          to[led] (2,0)
          -- (0,0);
      \\end{circuitikz}
      \\end{document}
    "
}

Observações:
A pergunta não pode ter mais que 50 palavras
O arquivo gerado para imagem é salvo na pasta uploads
-----------------------------------------------------------------------------------------------------------------------------------
# Documentação APIs - Swagger
Para acessar a documentação das APIs pelo swagger, deve se inicializar o servidor com npm run start ou npm run dev
e acessar a url: "http://localhost:3000/api-docs/"
