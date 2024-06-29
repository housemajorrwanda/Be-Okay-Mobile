import { View, Text, StyleSheet, Pressable, Image, Switch } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
const SignupMix = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const router=useRouter();
  const navigateToNormalSignup=()=>{
    router.push("../WelcomePage/NormalSignUp")
  
  }
  const navigateToJoin=()=>{
    router.push("../Join")

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
          <Text style={Styles.signup}>SIGN UP</Text>
          <View>
            <Pressable style={Styles.SignupButton}>
              <Image source={require("../../assets/google-icon.png")} />
              <Text style={Styles.with}>With Google</Text>
            </Pressable>
          </View>
          <View>
            <Pressable style={Styles.SignupButton}>
              <Image source={require("../../assets/apple.png")} />
              <Text style={Styles.with}>With Apple</Text>
            </Pressable>
          </View>
          <View>
            <Pressable style={Styles.SignupButtonLast} onPress={navigateToJoin}>
              <Image source={require("../../assets/email.png")} />
              <Text style={Styles.with}>With Email</Text>
            </Pressable>
          </View>
          <View style={Styles.alreadyhaveanAccount}>
            <Text style={Styles.haveanaccount}>Already have an account?</Text>
            <Pressable>
              <Text style={Styles.login}>LOG IN</Text>
            </Pressable>
          </View>
          <View style={Styles.switchContainer}>
          <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={Styles.switchText}>Use phone security to login</Text>

          </View>
        </View>
      </View>
    </View>
  );
};
export default SignupMix;

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
    top: 100,
    marginBottom: 20,
  },

  signup:{
    marginBottom:50,
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
    gap:5,marginBottom:30
  },
  SignupButtonLast:{
    height: 48,
    borderRadius: 20,
    backgroundColor: "white",
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
    gap:5,marginBottom:20
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
