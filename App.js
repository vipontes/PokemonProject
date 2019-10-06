import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from './src/screens/MainScreen';
import DetailScreen from './src/screens/DetailScreen';

const MainNavigator = createStackNavigator({
   Main: {
      screen: MainScreen,
      navigationOptions: {
         header: null,
      }
   },
   Detail: { screen: DetailScreen,
      navigationOptions: {
         title: 'Detalhes',
         headerTintColor: '#ffffff',
         headerStyle: {
           backgroundColor: '#d32b2b',
           borderBottomColor: '#ffffff',
           borderBottomWidth: 0,
         },
         headerTitleStyle: {
           fontSize: 22,
         },         
      } 
   },
});

let Navigation = createAppContainer(MainNavigator);

export default class App extends React.Component {
   render() {
     return (
         <Navigation />
     );
   }
 }