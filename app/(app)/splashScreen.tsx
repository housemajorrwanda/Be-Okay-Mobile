import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import PatientDashboard from "../(components)/PatientsDashbord/ChatBoxConsultationBodyImagemapping";
const SplashScreen = () => {
  const router = useRouter();

  const GetStartedPage = () => {
    router.push('../(components)/PatientsDashbord/WelcomePage/GetStarted');
  };

  // const navigateToPatientsChatBoxConsultation = () => {
  //   router.push('../(components)/PatientsDashbord/ChatBoxConsultationBodyImagemapping');
  // };

  return (
    <View style={styles.splashScreenContainer}>
      <Pressable style={styles.splashScreenContainerDetails} onPress={GetStartedPage} >
        {/* <Pressable onPress={navigateToPantientDashboard}>
          <Text>Navigate to Patient Dashboard</Text>
        </Pressable>
        <Pressable onPress={navigateToPatientsChatBoxConsultation}>
          <Text>Navigate to Patients ChatBox Consultation Body Image Mapping</Text>
        </Pressable> */}
        <Image
          source={require("../(components)/assets/Be-Okay_logo.png")}
          style={styles.beokayLogo}
        />
        <Text style={styles.beOkay}>Be Okay</Text>
        <Text style={styles.BeHealthy}>Be Healthy</Text>
      </Pressable>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splashScreenContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#93BD68",
    height: "100%",
  },
  beOkay: {
    color: "white",
    fontSize: 24,
    fontWeight: "semibold",
  },
  splashScreenContainerDetails: {
    alignItems: "center",
  },
  beokayLogo: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    height: 100,
    width: 123,
    marginBottom:5,
  },
  BeHealthy: {
    color: "white",
    textAlign: "center",
    marginTop:5,
    fontSize:14,
    fontWeight:"medium",
  },
});
