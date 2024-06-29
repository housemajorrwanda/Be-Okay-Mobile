import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import Community from "../DoctorsDashbord/Community";
const DoctorBottomTab = () => {
  const router = useRouter();
  return (
    <View>
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => router.push("../../PatientsDashbord/PatientsDashbord")}
        >
          <Image source={require("../assets/Home.png")}></Image>
          <Text style={styles.tabButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}
        onPress={()=> router.push("../DoctorsDashbord/DoctorSetScheduleAppointment")}
        >
         <Image source={require("../assets/Calendars.png")}></Image>
          <Text style={styles.tabButtonText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => router.push("../DoctorsDashbord/DoctorEmergency")}
        >
          <Image
            source={require("../assets/Emergrncy2.png")}
          />
          <Text style={styles.tabButtonText}>Emergency</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => router.push("../DoctorsDashbord/Community")}
        >
          <Image
            source={require("../assets/Community.png")}
          />
          <Text style={styles.tabButtonText}>Community</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorBottomTab;

const styles = StyleSheet.create({
  bottomTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingBottom:4,
    paddingTop:10,
    zIndex:1,
  },
  tabButton: {
    alignItems: "center",
  },
  tabButtonText: {
    fontSize: 12,
    color: "#0C7751",
    fontWeight:"medium",
    marginTop:3
  },
  imageIcon: {
    width: 30,
    height: 20,
  },
});
