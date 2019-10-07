# PokemonProject

Projeto de um aplicativo desenvolvido em [react-native](https://facebook.github.io/react-native/), utilizando a API [PokéAPI](https://pokeapi.co/).

## Visão geral

O aplicativo apresenta uma lista de pokénmons extraida da API. Clicando em um dos pokémons, ele apresenta alguns detalhes do mesmo. Na tela de detalhes, ao clicar na imagem, a mesma é trocada para a imagem do pokémon e costas.

## Ambintes

O app foi testado em Android uma máquina Linux/Ubuntu e no Mac.

Ao fazer o download do projeto, acessar a pasta do mesmo e executar o comando abaixo para baixar as dependências:

```bach
npm install
```

O servidor deve ser iniciado com o comando yarn:

```bach
yarn start
```

### iOS

Para execução do app no iOS, deve-se acessar a pasta ios carregar os pods:

```bach
pod install
```

Em seguida, abrir o arquivo .xcworkspace no xCode e executar o app no Simulador.

### Android

Para execução do app no Android, deve-se primeiramente inicializar o emulador e em seguida executar o sequinte comando:

```bach
yarn android
```
