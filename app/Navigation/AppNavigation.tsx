import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "../(app)/splashScreen";
import GetStarted from "../(components)/PatientsDashbord/WelcomePage/GetStarted";

const Stack = createNativeStackNavigator();


const AppNavigation: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{ headerShown: false }}
      />
        
    </Stack.Navigator>
  );
};

export default AppNavigation;
