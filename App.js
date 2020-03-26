import * as React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppLoading, SplashScreen } from "expo";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import LoginOrCreate from "./src/LoginScreen/LoginOrCreate";
import LoginHandler from "./src/LoginScreen/LoginHandler";
import CreateAccountHandler from "./src/LoginScreen/CreateAccountHandler";
import CreateDisplayName from "./src/LoginScreen/CreateDisplayName";
import HomeScreen from "./src/HomeScreen/HomeScreen";
import TodaysPoll from "./src/HomeScreen/TodaysPoll/TodaysPoll";

console.disableYellowBox = true;
const Stack = createStackNavigator();
const initialRouteName = "Main";

export default class App extends React.Component {
  state = {
    isReady: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginOrCreate">
          <Stack.Screen
            name="LoginOrCreate"
            component={LoginOrCreate}
            options={{ title: "Welcome to Pollcat" }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginHandler"
            component={LoginHandler}
            options={{ title: "Login" }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateAccountHandler"
            component={CreateAccountHandler}
            options={{ title: "Create Account" }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateDisplayName"
            component={CreateDisplayName}
            options={{ title: "Create Display Name" }}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="TodaysPoll"
            component={TodaysPoll}
            options={{ title: "Today's Poll" }}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
