import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "../(app)/splashScreen";
import GetStarted from "../(components)/PatientsDashbord/WelcomePage/GetStarted";
import SignupMix from '../(components)/PatientsDashbord/WelcomePage/SignupMix';
import Join from '../(components)/PatientsDashbord/Join';
import DoctorSignup from '../(components)/DoctorsDashbord/Welcome/DoctorSignup';
import PatientNormalSignUp from '../(components)/PatientsDashbord/WelcomePage/PatientNormalSignUp';
import DoctorLoginPage from '../(components)/DoctorsDashbord/Welcome/DoctorLoginPage'
import PasswordEmailForget from '../(components)/DoctorsDashbord/Welcome/PasswordEmailForget'
import ConfirmResetPassword from '../(components)/DoctorsDashbord/Welcome/ConfirmResetPassword';
import DoctorsDashbord from '../(components)/DoctorsDashbord/DoctorsDashbord'
import PatientsDashboard from '../(components)/PatientsDashbord/PatientsDashbord'
import ChatBoxConsultationBodyImagemapping from '../(components)/PatientsDashbord/ChatBoxConsultationBodyImagemapping'
import TrunkPage from '../(components)/PatientsDashbord/TrunkPage';
import Head from '../(components)/PatientsDashbord/Head';
import LeftArmPage from '../(components)/PatientsDashbord/LeftArmPage';
import LeftLegPage from '../(components)/PatientsDashbord/LeftLegPage';
import NeckChest from '../(components)/PatientsDashbord/NeckChest';
import RightArmPage from '../(components)/PatientsDashbord/RightArmPage';
import RightLegPage from '../(components)/PatientsDashbord/RightLegPage';
import Consultation from '../(components)/PatientsDashbord/Consultation';
import ConsultationWithAI from '../(components)/PatientsDashbord/ConsultationWithAI';
import ConsultationWithDoctor from '../(components)/PatientsDashbord/ConsultationWithDoctor';
import ConsultationWithHomecareForm from '../(components)/PatientsDashbord/ConsultationWithHomecareForm';
import ReproductiveOrgan from '../(components)/PatientsDashbord/ReproductiveOrgan';
import HomeCare from '../(components)/PatientsDashbord/HomeCare';
import Hospitals from '../(components)/PatientsDashbord/Hospitals'
import Emergency from '../(components)/PatientsDashbord/Emergency';
import PatientsDashbord from '../(components)/PatientsDashbord/PatientsDashbord';
import CheckSuport from '../(components)/PatientsDashbord/CheckSuport';
import ConsultationTypeResult from '../(components)/PatientsDashbord/ConsultationTypeResult';
import PatientBookDoctorAppointment from '../(components)/PatientsDashbord/PatientBookDoctorAppointment';




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
        
        <Stack.Screen
        name="SignupMix"
        component={SignupMix}
        options={{ headerShown: false }}
      /> 

        <Stack.Screen
            name="Join"
            component={Join}
            options={{ headerShown: false }}
      />
       <Stack.Screen
          name="DoctorSignup"
          component={DoctorSignup}
          options={{ headerShown: false }}
      />
       <Stack.Screen
          name="PatientNormalSignUp"
          component={PatientNormalSignUp}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="DoctorLoginPage"
          component={DoctorLoginPage}
          options={{ headerShown: false }}
      />
      
      <Stack.Screen
          name="PasswordEmailForget"
          component={PasswordEmailForget}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="ConfirmResetPassword"
          component={ConfirmResetPassword}
          options={{ headerShown: false }}
      /> 
      <Stack.Screen
          name="PatientsDashboard"
          component={PatientsDashboard}
          options={{ headerShown: false }}
      /> 
      <Stack.Screen
          name="ChatBoxConsultationBodyImagemapping"
          component={ChatBoxConsultationBodyImagemapping}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="TrunkPage"
          component={TrunkPage}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="Head"
          component={Head}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="LeftArmPage"
          component={LeftArmPage}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="RightLegPage"
          component={RightLegPage}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="LeftLegPage"
          component={LeftLegPage}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="RightArmPage"
          component={RightArmPage}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="NeckChest"
          component={NeckChest}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="Consultation"
          component={Consultation}
          options={{ headerShown: false }}
          key={Date.now()}
      />
       <Stack.Screen
          name="ConsultationWithAI"
          component={ConsultationWithAI}
          options={{ headerShown: false }}
      />
       <Stack.Screen
          name="ConsultationWithDoctor"
          component={ConsultationWithDoctor}
          options={{ headerShown: false }}
      />
       <Stack.Screen
          name="ConsultationWithHomecareForm"
          component={ConsultationWithHomecareForm}
          options={{ headerShown: false }}
      />
      
      <Stack.Screen
          name="ReproductiveOrgan"
          component={ReproductiveOrgan}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="HomeCare"
          component={HomeCare}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="Hospitals"    
          component={Hospitals}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="Emergency"    
          component={Emergency}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="PatientsDashbord"    
          component={PatientsDashbord}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="ConsultationTypeResult"    
          component={ConsultationTypeResult}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="CheckSuport"    
          component={CheckSuport}
          options={{ headerShown: false }}
      />
      <Stack.Screen
          name="PatientBookDoctorAppointment"    
          component={PatientBookDoctorAppointment}
          options={{ headerShown: false }}
      />


      
      
      

    </Stack.Navigator>
  );
};

export default AppNavigation;
