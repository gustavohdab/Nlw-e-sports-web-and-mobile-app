# NLW-eSports-Server

## Back-end with NodeJs & Prisma & TypeScript

Descomentamos a linha no tsconfig json para que entenda o node
``"moduleResolution": "node"``

A biblioteca do CORS necessita também de um package para entender o TypeScript  

```javascript
npm i @types/cors -D
```

O CORS é um "limitador" para que ninguém acesse páginas além das definidas

```js
import cors from 'cors'
```

## Por padrão o express não entende que podemos enviar uma informação em JSON

Para faze-lo entender que estamos enviando JSON usamos

```js
app.use(express.json())
```

No express para identificarmos que esse 'id' é um parâmetro, colocamos dois pontos ':', ou seja, uma informação dinâmica

```js
app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
```
Também é possível que duas rotas tenham o mesmo nome, mas oque diferenciará será o Method, nesse é o Method **post**
```js
app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
```
## HTTP methods / API RESTful
GET, POST, PUT, PATCH, DELETE
**HTTP CODES**
Os principais são os que começam com o Nº2, que são de sucesso
Nº300 REDIRECIONAMENTO
Nº400 - ERROS ALGUM CODIGO BUGADO
Nº500 ERROS INESPERADOS
'response.status(201)'
Recomenda-se fazer validação com a biblioteca zod javascript
Um site onde contém esses HTTP CODES e é bem fofinho está em:
LINK: <https://http.cat/>
## PARAMS
Query:``localhost:3333/ads?page=2``
São utilizados quando precisamos persistir estado da pagina daquele momento, como filtros, ordenação.
Também sempre são nomeados:
``localhost: 3333/ads?page2&sort=title``
  
Route: ``localhost:3333/post/api-node``
Não são nomeados, é específica.
Body: Geralmente para envio de formulário, para informações sensíveis
Criar a primeira rota da aplicação com o método **get** a primeira pagina depois da '/'
O segundo parâmetro desse **app.get()** precisa ser uma função.
Qual função vai ser executada quando o usuário acessar ``/games``.
No express quando se define esse tipo de função ele grava um request, response, esperando uma requisição e uma resposta
contendo objetos{}.
Quando se usa um método assíncrono é melhor utilizar a sintaxe
``async, await``
Na função que está por volta da instrução, coloco async, e na frente do método que demora para executar, coloco await
```js
app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })
```
## Entidades
### Game
- id: string;
- title: string;
- bannerUrl: string;
- _count: {
- ads: number;
- }
(Armazenamento de dados)
CDN (Amazon S3) (Content Delivery Network) => url
### Ad
id
gameId
name
yearsPlaying
discord
weekDays
hourStart
hourEnd
useVoiceChannel
createdAt
Sempre que trabalhar com db, e tiverem numeros decimais ou numeros quebrados
Melhor trabalhar com números inteiros
1:30h -> 90min
R$ 179,89 * 100 -> 17989
``Criada uma função para converter as horas para minutos``
```js
// 18:00 -> ["18","00"] -> [18, 00]
export function convertHourStringToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(':').map(Number)
  const minutesAmount = (hours * 60) + minutes;
  return minutesAmount;
```
``Também foi criada uma função para o inverso, minutos para horas em string``
```js
// 1080 -> 18:00
export function convertMinutesToHourString(minutesAmount: number) {
  const hours = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;
  // `` Acento grave
  return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}`;
}
```
Que são coisas um pouco chatas de se trabalhar
- Datas (fuso horário / formatos diferentes )
- Pontos flutuantes
## Casos de uso
- Listagem de games com contagem de anúncios
- Criação de novo anúncio
- Listagem de anúncios por game
- Buscar discord pelo ID do anúncio
## Utilizando um ORM - PRISMA
Utilizar um ORM - Object-Relational Mapping existem vários, e nesse caso estaremos utilizando o Prisma
Com o Prisma também podemos requisitar logs se desejarmos
Para instalarmos o Prisma, rodamos:
```javascript
npm i prisma -D (-D de desenvolvimento)
```
Para deixarmos em ambiente de produção:
```javascript
npm i @prisma/client
```
npx prisma studio - gera uma interface grafica (GUI) para navegarmos na DB e podermos edita-la ou criar novos itens
```javascript
npx prisma studio
```
npx prisma generate, ele cria em node-modules, dentro de prisma/client, um arquivo de tipificação do TypeScript, definições de tipos do TS, cria baseado no Banco de Dados do SCHEMA do Prisma e cria tbm todos os métodos que podemos executar
```javascript
npx prisma generate
```
Ele vai tentar encontrar um ad com o id, senão encontrar vai disparar um erro, `findUniqueOrThrow`
```js
const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
}) 
   ```
`A maioria dos packages existem a tag -h no final que trazem um relatório sobre o comando`
Footer
© 2022 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About

