import { View, Text, StyleSheet, Pressable, Image, Switch } from "react-native";
import React, { useState } from "react";
import {NavigationProps} from "../../(app)/types"
import { useNavigation } from "@react-navigation/native";

const Join = () => {
  const navigation = useNavigation<NavigationProps>()

  const navigateDoctorSignup=()=>{
    navigation.navigate("DoctorSignup");

  }
  const navigateToJoin=()=>{
    navigation.navigate("PatientNormalSignUp")
  }
  return (
    <View style={Styles.signupMixContainer}>
      <View style={Styles.WelcomeText}>
        <Text style={Styles.welcomet}>Welcome</Text>
        <Text style={Styles.welcomet}>On Be Okay!</Text>
      </View>
      <View>
        <Text style={Styles.subText}>
          Your health, our priority. Explore our services and get started with
          quick and reliable medical checkups anytime, anywhere.
        </Text>
      </View>
      <View>
        <View style={Styles.signupButtonContainer}>
          <Text style={Styles.signup}>JOIN</Text>
          <View>
            <Pressable style={Styles.JoinDoctor} onPress={navigateDoctorSignup}>
              <Image source={require("../assets/maki_doctor.png")} />
              <Text style={Styles.JoinDoctorText}>Join As Doctor</Text>
            </Pressable>
          </View>
          <View>
            <Pressable style={Styles.JoinPatient} onPress={navigateToJoin}>
              <Image source={require("../assets/cough.png")} />
              <Text style={Styles.JoinPatientText}>Join As Patient</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Join;

const Styles = StyleSheet.create({
  signupMixContainer: {
    backgroundColor: "#93BD68",
    width: "100%",
    height: "100%",
    padding: 20,
    paddingTop: 70,
  },
  WelcomeText: {},
  welcomet: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 3,
  },
  subText: {
    width: "60%",
    color: "white",
    marginTop: 15,
    fontSize: 12,
    fontWeight: "regular",
    letterSpacing: 1.5,
    lineHeight: 16,
  },
  signupButtonContainer: {
    position: "relative",
    top:100,
    marginBottom: 20,
  },

  signup:{
    marginBottom:20,
    fontSize:24,
    fontWeight:"medium",
    color:"white"
  },
  SignupButton: {
    height: 48,
    borderRadius: 20,
    backgroundColor: "white",
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
    gap:5,marginBottom:30,
  },
  JoinDoctor:{
    backgroundColor: "#0C7751",
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
    marginBottom:20,
    padding:15,
    borderRadius:10,
    gap:10
  },
  JoinDoctorText:{
color:"white",
fontSize:16,
fontWeight:"bold",
letterSpacing:2
  },
  JoinPatientText:{
    color:"#93BD68",
fontSize:16,
fontWeight:"bold",
letterSpacing:2
  },
  JoinPatient:{
    backgroundColor: "white",
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
    marginBottom:20,
    padding:15,
    borderRadius:10,
    gap:10
  
  },
  with:{
    color:"#525252",
    fontSize:14,
fontWeight:"regular"
},
alreadyhaveanAccount:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    textAlign:"center",
    justifyContent:"center",
    gap:5,
    color:"white",
    marginBottom:10
} ,
haveanaccount:{
    color:"white",

},
login:{
color:"white",
fontWeight:"bold",
borderBlockColor:"black",
borderBottomWidth: 1,
borderBottomColor: "white",
},
SIGNUP:{
    color:"white",
    fontWeight:"bold",
    borderBottomWidth: 1,
    borderBottomColor: "white",
},
switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    textAlign:"center",
    justifyContent:"center"
  },
  switchText: {
    color: "white",
    fontSize: 12,
    fontWeight: "regular",
  },
});
