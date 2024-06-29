import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const BottomTabs1 = () => {
  const router = useRouter();
  return (
    <View>
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => router.push("../../PatientsDashbord/PatientsDashbord")}
        >
          <Ionicons name="home-outline" size={30} color="#8BB85C" />
          <Text style={styles.tabButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Ionicons name="document-text-outline" size={30} color="#8BB85C" />
          <Text style={styles.tabButtonText}>Medical Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => router.push("../../PatientsDashbord/Emergency")}
        >
          <Image
            source={require("../assets/Emergency.png")}
            style={styles.imageIcon}
          />
          {/* <Ionicons name="call-outline" size={30} color="#8BB85C" /> */}
          <Text style={styles.tabButtonText}>Emergency</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => router.push("../../PatientsDashbord/Hospitals")}
        >
          <Image
            source={require("../assets/hospital.png")}
            style={styles.imageIcon}
          />
          <Text style={styles.tabButtonText}>Hospitals</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomTabs1;

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
    paddingTop:10
  },
  tabButton: {
    alignItems: "center",
  },
  tabButtonText: {
    fontSize: 12,
    color: "#4F4F4F",
  },
  imageIcon: {
    width: 30,
    height: 20,
  },
});
