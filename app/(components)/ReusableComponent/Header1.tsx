import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Header1 = () => {
  const router =useRouter()
  const navigateTCheckSupport=()=>{
  router.push("../PatientsDashbord/CheckSuport")
  }
  const navigateToEditProfile=()=>{
  router.push("../Profile/PatientProfile/EditProfile")
  }
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={navigateToEditProfile}>
        <Image
          source={require("../assets/profileImage.png")}
          style={styles.profileImage}
        />
        <View style={styles.activeIcon} />
      </TouchableOpacity>
      <View style={styles.profileDetails}>
        <Text style={styles.profileName}>NGOGA Innocent</Text>
        <Text style={styles.secondName}>Patrick</Text>
        <Text style={styles.ProfileName}>Profile</Text>
      </View>
      <View style={styles.logoutNotificationContainer}>
        <TouchableOpacity style={styles.logout}>
          <Text style={styles.LogoutText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={navigateTCheckSupport}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={30}
            color="white"
          />
          </TouchableOpacity>

          <Ionicons name="notifications-sharp" size={30} color="white" />
        </View>
      </View>
    </View>
  );
};

export default Header1;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#93BD68",
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 25,
  },
  profileDetails: {
    display: "flex",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    color: "#FFFDFD",
    fontSize: 18,
    fontWeight: "bold",
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
    top: 10,
  },
  subtitle: {
    fontWeight: "bold",
    color: "black",
    fontSize: 14,
    marginLeft: 15,
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
  ProfileName: {
    fontSize: 16,
    marginTop: 10,
    color: "white",
  },
  logoutNotificationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  logout: {
    position: "relative",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    bottom: 7,
    width: 66,
    height: 27,
    borderRadius: 10,
  },
  LogoutText: {
    fontSize: 16,
    color: "#8BB85C",
    fontWeight: "bold",
  },
});
