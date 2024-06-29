import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from './types';

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const GetStartedPage = () => {
    navigation.navigate("GetStarted");
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("GetStarted");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.splashScreenContainer}>
      <Pressable
        style={styles.splashScreenContainerDetails}
        onPress={GetStartedPage}
      >
        <Image
          source={require("../(components)/assets/Be-Okay_logo.png")}
          style={styles.beokayLogo}
        />
        <Text style={styles.beOkay}>Be Okay</Text>
        <Text style={styles.BeHealthy}>Be Healthy</Text>
      </Pressable>
      <View style={styles.beokayLogobelContainer}>
        <Image
          source={require("../(components)/assets/belfast.png")}
          style={styles.beokayLogobel}
        />
      </View>
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
    marginBottom: 5,
  },
  beokayLogobel: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    height: 50,
    width: 330,
    marginBottom: 5,
    padding: 10,
    objectFit: "contain",
  },
  BeHealthy: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
    fontSize: 14,
    fontWeight: "medium",
  },
  beokayLogobelContainer: {
    position: "absolute",
    bottom: 30,
  },
});
