import { View, Text, StyleSheet, Image,Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";

const GetStarted = () => {
const router=useRouter();
const navigateToSignupMix=()=>{
  router.push("../../OnBording/onbordPage")

}
  return (
    <ScrollView>
          <View style={styles.GetStartedContainer}>
      <View style={styles.ContainerDoquick}>
        <View style={styles.Container}>
          <Image
            source={require("../../assets/Doquick.png")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Do quick medical</Text>
          <Text style={styles.text}>checkup</Text>
          <Text style={styles.text}>anywhere</Text>
          <Text style={styles.text}>anytime</Text>
        </View>
      </View>
      <View style={styles.ContainerDoquick}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Consult a</Text>
          <Text style={styles.text}>doctor of your</Text>
          <Text style={styles.text}>choice</Text>
        </View>
        <View style={styles.Container}>
          <Image
            source={require("../../assets/consult.png")}
          />
        </View>
      </View>
      <View style={styles.ContainerDoquick}>
      <View style={styles.Container}>
          <Image
            source={require("../../assets/haveMedical.png")}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>have medical</Text>
          <Text style={styles.text}>services</Text>
          <Text style={styles.text}>delivered at your</Text>
          <Text style={styles.text}>door</Text>
        </View>
      </View>
      <View style={styles.GetStartedButtonContainer}>
      <Pressable style={styles.GetStartedButton} onPress={navigateToSignupMix}>
      <Text style={styles.getStartedText}>
      Next
      </Text>
      </Pressable>
      </View>
    </View>
    </ScrollView>

  );
};

export default GetStarted;

const styles = StyleSheet.create({
  GetStartedContainer: {
    padding: 10,
    paddingTop: 40,
  },
  Container: {
    width: 170,
    height: 170,
  },

  ContainerDoquick: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
  },
  textContainer: {
    textAlign: "center",
    alignItems: "center",
  },
  text: {
    color: "#93BD68",
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  GetStartedButton:{
    backgroundColor:"#93BD68",
    width:284,borderRadius:20,
    height:40,
    textAlign:"center",
    alignItems:"center",
    display:"flex",
    justifyContent:"center"

  },
  GetStartedButtonContainer:{
    alignItems:"center",
    marginTop:30
  },
  getStartedText:{
    color:"white",
    fontWeight:"bold",
    fontSize:15
  }
});
