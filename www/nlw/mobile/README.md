# React Native - Mobile

Precisamos definir a tipagem do arquivo PNG

```js
import backgroundImg from '../../assets/background-galaxy.png';
```

Criamos então uma pasta ``@types`` e um arquivo ``png.d.ts`` para declarar ao ts e podermos usar todas as imagens que forem importadas com essa extensão

```js
declare module '*.png';
```

## 'Children' - Background

Vai pegar tudo que estiver escrito dentro desse componente:

```js
export function Background({children}: Props) {
  return (
    <ImageBackground 
    source={backgroundImg}
    defaultSource={backgroundImg}
    style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}
```

## GameCard

Como será uma região clicável nós importamos o ``TouchableOpacity``.
Como é uma imagem pegando nosso cartão como um todo, usamos o ``ImageBackground``
Também preciso importar o ``TouchableOpacityProps`` para definir todas as Props que o Touchable precisa
Tudo que vamos usar devemos importar, o Text por exemplo também:

```js
import { TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType, Text } from 'react-native';
```

Importamos também o linear gradient para o efeito poder ser utilizado do expo:

```js
import { LinearGradient } from 'expo-linear-gradient';
```

Usamos ``export`` quando queremos reutilizar essa ``interface`` de cards para quando necessitar reutiliza-la
Isso tem uma tipagem que o GameCardProps precisa para renderizar de acordo com API:

```js
export interface GameCardProps {
  id: string;
  title: string;
  _count: {
    ads: number;
  },
  bannerUrl: string;
}
```

Defino que o data é o GameCardsProps

Essa não exporto, uso somente aqui:

```js
interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}
```

Vou pegar da nossa propriedade 'Props'
E então pego todo o restante das Props que não deixei explícito na tipagem e importo elas com '``...rest``'

Para a tag Image source entender que estamos buscando uma imagem por URL, envolvemos em mais uma chaves de objeto {} e adicionamos uma propriedade chamada URI:

```js
export function GameCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.cover}
        source={{ uri: data.bannerUrl}}
      >
```
## Bibliotecas & Imports
Instalamos uma biblioteca de icons para o ``React Native``, ``Phosphor Icons``, com o comando:
```js
 npm install --save phosphor-react-native
```
Também instalamos uma biblioteca do expo svg com o comando:
```js
expo install react-native-svg
```
```js
import { GameController } from 'phosphor-react-native';
```
Definimos que haverá texto no import, também uma ViewProps para dizer que essa View pode receber todas as propriedades, como estilização:
```js
import { View, Text, ViewProps } from 'react-native';
```
ActivityIndicator é o componente para sinalizar o processo de loading:
```js
import { View, ActivityIndicator } from 'react-native';
```
Nós conseguimos desestruturar o createNativeStackNavigator:
```js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
```
Instalamos a estratégia que utilizaremos para navegar que é a Stack
```js
npm install @react-navigation/native-stack
```
Expo-ClipBoard fornece uma interface para obter e definir o conteúdo da área de transferência no Android, iOS e Web:
```js
expo install expo-clipboard
```
Importação:
`import * as Clipboard from 'expo-clipboard';`
Instalando Notificações:
```js
expo install expo-notifications
```
`import * as Notifications from 'expo-notifications';`
Core do expo:
```js
expo install expo-modules-core
```
## Conhecimentos Gerais
Tipo de função que não retorna nada ``() => void``
Criando tipagem
```js
interface Props {
  label: string;
  value: string;
  colorValue?: ColorValue;
}
```
Dentro do React Native, podemos colocar mais de uma regra de estilo, colocamos um array []
Exemplo:
```js
style={[styles.value, {color: colorValue}]}
```
Passamos o title, o subtitle, e também podemos passar todo o resto que a há dentro de Views, com '``...rest``':
```js
export function Heading({title, subtitle, ...rest}:Props)
```
Precisamos também declarar "Image" para exibi-la.
Do ``React Native`` importamos o ``FlatList`` para podermos exibir listas:
```js
import { Image, FlatList } from 'react-native';
```
Podemos importar uma logo png porque tipamos ela com png.d.ts no @types:
```js
import logoImg from '../../assets/logo-nlw-esports.png';
```
Importamos o background e envolvemos a SafeView dentro dele e no game fazemos a mesma coisa:
```js
import { Background } from '../../components/Background';
```
Importa o componente Heading
```js
import { Heading } from '../../components/Heading';
```
Armazenamos no useState o primeiro sendo a variável, o segundo a função que atualiza a variável.
Também adicionamos a tipagem feita no Component ``<GameCarProps>`` para o TS identificar o que iremos puxar da API.
```js
  const [games,setGames] = useState<GameCardProps[]>([]);
  ```
Uma particularidade do mobile é que não colocamos localhost.
Colocamos o endereço IP principalmente por causa do Android:
``http://192.168.1.14:3333/games``.
## Navegação
O ``Navigator`` para criar navegação e o ``Screen`` para quando tal rota for chamada qual componente deve ser renderizado:
```js
const { Navigator, Screen } = createNativeStackNavigator();
```
Criamos uma função chamada ``AppRoutes() {} return ()``
Que retorna o Navigator com um Screen com o nome da rota, por exemplo: home.
E quando alguém chamar pela rota home, definimos qual componente queremos renderizar.
Podemos customizar as ``Screens``, com a propriedade:``options {{ headerShown: false }}``.
Ou passamos direto para o ``Navigator`` ``screenOptions={{ headerShown: false }}`` ele também vai remover o cabeçalho mas para todas as rotas
```js
export function AppRoutes(){
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen
      name="home"
      component={Home}
      />
<Screen
      name="game"
      component={Game}
      />
    </Navigator>
  )
}
```
Na index de routes vamos escolher qual estratégia utilizar para navegação
Importamos o ``NavigationContainer`` para criar um container de navegação
Então importamos o Component de rotas
E criamos a função ``Routes()`` retornando o nosso container de navegação com nosso Component ``AppRoutes``
```js
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  )
}
```
Para irmos de uma página a outra usamos o ``React Navigation``.
Temos 3 estratégias, a ``Stack Navigator`` quando você tem uma tela e abre sobre a outra, na tela home e abre por cima outra tela, a home não foi fechada, está em segundo plano e é a que usamos nesse projeto.
Também temos, a ``Tab Navigator``, com os botões na tela.
E também temos a ``Drawer Navigation``, quando você tem muitas rotas e deseja ter laterais nas telas.
Para instalar a biblioteca usamos ``npm install``, o core da instalação ``@react-navigation/native``
```js
npm install @react-navigation/native
```
Também precisamos instalar dependências que lida com transições de uma tela para outra:
```js
expo install react-native-screens
```
Importamos do ``React Navigation`` o ``useRoute`` para resgatarmos as informações que vem das rotas
```js
import { useRoute, useNavigation } from '@react-navigation/native';
```
Criamos a função e adicionamos o método do navigation.goBack, e chamaremos ele quando clicarmos no ``TouchableOpacity``:
```js
  function handleGoBack(){
    navigation.goBack();
  }
```
Para nos movermos para outra tela, criamos uma função ``handleOpenGame()`` e importamos o useNavigation:
```js
import { useNavigation } from '@react-navigation/native';
```
Então uso de ``navigation`` uma propriedade chamada ``navigate`` e digo qual a rota que quero.
Também preciso definir uma tipagem para o TypeScript reconhecer as rotas.
Na função preciso colocar uma tipagem, nesse caso, usamos a própria do GameCardProps:
```js
function handleOpenGame({id, title, bannerUrl}: GameCardProps){
  navigation.navigate('game', {id, title, bannerUrl});
}
```
## Screens
### Game
// E o safeareacontext para garantir que os elementos estejam sempre sendo exibidos na area segura da tela 
// react-native-safe-area-context
// O comando inteiro 
// expo install react-native-screens react-native-safe-area-context
// Quando utilizamos o expo, precisamos apenas aproveitar os comandos, e não fazer manualmente
// Importamos o rnsac e adicionamos o SafeAreaView e trocamos da View padrão por ela em todos os lugares
//O nosso GameCard tem uma propriedade onPress e passamos a função que queremos chamar, e só está com essa opção porque extendemos as Props do TouchableOpacityProps para o GameCard
