import React from "react-native"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, DefaultTheme } from "react-native-paper";


import Listagem from './telas/Listagem';
import AdicionarPlanta from './telas/AdicionarPlanta';
import Detalhes from './telas/Detalhes';


const Stack = createStackNavigator()


const tema = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors
  }
}


export default function App() {
  return (
    <Provider theme={tema}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Listagem" component={Listagem} />
          <Stack.Screen name="AdicionarPlanta"     component={AdicionarPlanta} />
          <Stack.Screen name="Detalhes" component={Detalhes}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
