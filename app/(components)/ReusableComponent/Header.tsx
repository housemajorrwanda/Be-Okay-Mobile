import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
const Header = ({ title }) => {
  return (
    <View style={styles.header}>
    <View style={styles.checkProfileConatiner}>
      <Image
        source={require("../assets/checkProfile.png")}
        style={styles.profileImage}
      />
    </View>
    <View style={styles.ImageBeokay}>
      <Image
        source={require("../assets/Be-Okay_logo.png")}
        style={styles.BeokayLog}
      />
      <Text style={styles.profileName}>Be-Okay</Text>
    </View>
    <View style={styles.NotificationContainer}>
      <Image source={require("../assets/message.png")} />
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0C7751",
    padding: 15,
    paddingBottom: 20,
    paddingTop: 20,
    zIndex: 1,
  },
  profileImage: {
    width: 25,
    height: 25,
    objectFit: "contain",
  },
  profileDetails: {
    display: "flex",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    color: "#FFFDFD",
    fontSize: 14,
    marginLeft:5
  },
  secondName: {
    color: "#FFFDFD",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 80,
    position: "relative",
    top: 25,
  },
  activeIcon: {
    position: "absolute",
    bottom: 55,
    right: 0,
    width: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: "#18B415",
  },
  checkProfileConatiner: {
    backgroundColor: "#B2C3FF",
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  NotificationContainer: {
    width: 36,
    height: 36,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  BeokayLog: {
    width: 27,
    height: 23,
  },
  ImageBeokay: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },

});

export default Header;
