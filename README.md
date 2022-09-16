# nlw-ignite
ignite mission
# React para Web e React Native para Mobile - NLW - e-Sports

<br>

## ReactHooks - useState & useEffect

``Todas funções que começam com use... o React as apelida de hooks, que nada mais são que funções que acoplam algum tipo de comportamento dentro de um componente``

``` javascript
import { useEffect, useState } from 'react';
    
```

### No React nós temos algo chamado State que é toda variável que precisa provocar alguma mudança no conteúdo visual da página

 Então colocamos num estado e não numa variável comum do JS<br>
 O método useState retorna duas coisas, primeiro uma variável e segundo uma função para att o estado dessa variável

<br>

## Então como no JS, podemos fazer uma desestruturação

 Desestruturação: `[hasUserClickedOnButton, set] = useState(false)`

<br>

## Então criamos uma função que altera a variável para outro estado e chamamos ela onde quisermos

```javascript
  function handleButtonClick() {
  setHasUserClickedOnButton(true); 
  }
  ```

<br>

## E como a função é para alterar o estado do botão caso clicado foi chamado no próprio botão

 `<button> onClick={handleButtonClick} </button>`

<br>

## Também é possível definir um IF - Operador Ternário no React

Basta colocarmos dentro de chaves {}<br>
 `{ HasUserClickedOnButton ? 'Usuário Clicou' : null }`

<br>

## Entretanto toda alteração de estado no React gera uma nova renderização e executa toda a função novamente

### Como por exemplo

- Chamada de uma API
- Atualização de um Componente
- Uma Propriedade atualizada ou um Componente externo

<br>

# Por isso o React tem outra função, chamada useEffect

useEffect vem de efeito colateral, derivado de uma ação que o usuário fez na tela.
Ela tem dois parâmetros dentro dela, o primeiro é: <br> -  Qual função quero executar ? () <br>E o segundo parâmetro é um array[] <br> Que indica quando quero executar essa função, adicionando as variáveis:

``` javascript
useEffect(() => {
  console.log('Teste')}, 
[HasUserClickedOnButton])
```

**Hack para o useEffect, sempre que eu não passo nada array de dependências, o função dentro do useEffect vai executar uma única vez**  
<br>

Então se boto a VAR dentro do array[], estou falando para o React que quero que toda vez que a VAR tiver o seu valor alterado execute a função acima

<br>

Também podemos aproveitar isso, adicionando sempre um valor inverso ao que ela tem no momento (true ou false), <br>Utilizando o Operador Lógico not '!' na função:

`!HasUserClickedOnButton`

Exemplo:

```javascript
function handleButtonClick() {
setHasUserClickedOnButton(!HasUserClickedOnButton);
}
<button onClick={handleButtonClick}>Clique aqui</button>
{ HasUserClickedOnButton ? 'Usuário Clicou' : null } 
```

## Importando o CSS

```javascript
import './styles/main.css';
```

- ``Quando importamos um CSS o próprio Vite faz a implementação para nós no index``

## Biblioteca para icons

```javascript
import { MagnifyingGlassPlus } from 'phosphor-react';
```

## Importando o logo

```javascript
import logoImg from './assets/logo-nlw-esports.svg';
```

## Importando o Component GameBanner

```javascript
import { GameBanner } from './components/GameBanner';
```

## Importando o Component CreateAdBanner

```javascript
import { CreateAdBanner } from './components/CreateAdBanner';
```

## O React traz uma sintaxe que chamamos de JSX

- JavaScript + XML (HTML)
Uma analogia de tags/atributos como no html:
``<img src=""``

## Dois principais conceitos do React

- **Componentes / Propriedades**

``O Componente nada mais é do que uma função, com um nome sempre começando com a letra maiúscula e que retorna um conjunto de html-tag``

- Nós podemos reaproveitar os mesmos componentes várias vezes, mas precisamos ter um container envolvendo-os
  - Podemos adicionar propriedades aos componentes

## Se quero que uma parte do meu codigo seja interpretada como código JS preciso envolve-las com chaves{}

```javascript
function Button(props:ButtonProps) {
  return (
    <button>
      {props.title}
    </button>
  )
 }
 ```

## TypeScript

O TypeScript não consegue identificar automaticamente sobre o que se trata as Props então precisamos indica-las para ele na função,
fazendo a tipagem
Ele nos indica que em nenhum momento do botão continha essas especificações, então precisamos adiciona-las

## Para o TypeScript identificar o que será salvo da API dentro do useState, <br>Sendo as 'strings', o _count como um objeto{}, e o ads que é number

```javascript
interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}
```

## => Parâmetro de tipagem '<>', do TypeScript, falando que essa variavel Games é uma array de objetos que tem aquele formato tipado definido na interface Game

```javascript
'<Game[]>'
```

```javascript
function App() {
  const [games, setGames] = useState<Game[]>([])
```
## Usamos o fetch, para puxar algo da API
  
```javascript
.then(resposta => response.json())
```
``=> response.json()`` transforma em json que retorna uma promise
Então usamos novamente o ``then.(puxando os dados => {no objeto})``
Podemos usar o ``console.log(data)`` dentro para ver se estão vindo corretamente.
```javascript
  useEffect(() => {
    fetch('http://localhost:3333/games').then(response => response.json()).then(data => {
      setGames(data)
    })
  }, [])
  ```
``Para salvar a lista de games no meu estado usamos a função setGames(data) para atualizar a váriavel Games com o data``
## O método map serve para conseguir percorrer um array e retornar algo de dentro dele
  
  Toda vez que usamos o metodo ``map()`` no React, ele pede que a gente coloque no primeiro elemento que vem dentro do map uma propriedade interna dele chamada ``key={}``
- Que serve para o React encontrar mais facilmente cada jogo e diferenciar um do outro, com um atributo único dentro deles para que caso sejam removidos, sejam identificados mais rapidamente e o React não precise ficar recriando as listas todas novamente, então nesse caso específico, o atributo mais único possível é o `game.id`
```javascript
{games.map(game => {
  return (
    <GameBanner
      key={game.id}
      title={game.title}
      bannerUrl={game.bannerUrl}
      adsCount={game._count.ads}
          )
})}
```
## Instalamos também o Componente @radix-ui/dialog que é um modal
**DOC:** <https://www.radix-ui.com/docs/primitives/components/dialog>
O RADIX-UI é uma biblioteca de componentes de interface do usuário de código aberto para criar sistemas de design e aplicativos da Web acessíveis e de alta qualidade.
Nesse caso iremos utilizar apenas o ``dialog``.
```javascript
npm install @radix-ui/react-dialog
```
## Para importarmos todos os componentes que existem dentro de uma biblioteca
No caso o Dialog é um prefixo, então todos os outros componentes que tenham ele serão puxados
```javascript
import * as Dialog from '@radix-ui/react-dialog'
```
## Portal
``O portal é uma feature do React que permite a gente fazer com que o conteúdo apareça em um local diferente na tela de onde foi colocado``
## Colocando um componente do React para receber todas as propriedades que um elemento no HTML receberia
No caso, seria um input, então segue o código abaixo,
primeiro importando do próprio React
```javascript
import { InputHTMLAttributes } from 'react'
```
Depois criando uma interface que extende as propriedades
```javascript
interface InputProps extends InputHTMLAttributes
```
E também tipar no TypeScript
```javascript
<HTMLInputElement>
```
Para não ter que puxar todas as propriedades dentro do objeto uma a uma, usamos um Spread Operator
```js
{...props}
```
Código completo dessa situação 
```js
import { InputHTMLAttributes } from 'react'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export function Input(props: InputProps) {
  return (
    <input
      {...props}
      id="game"
      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
    />
  )
}
```
