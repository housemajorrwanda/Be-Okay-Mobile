import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BottomTabs = ({ activeTab, setActiveTab }) => {
  const router = useRouter();

  const navigateTo = (screen) => {
    setActiveTab(screen);
    router.push(`./${screen}`);
  };

  return (
    <View style={styles.bottomTabContainer}>
      <TouchableOpacity
        style={[styles.tabItem, activeTab === "Home" && styles.activeTab]}
        onPress={() => navigateTo("ChatBoxConsultationBodyImagemapping")}
      >
        <MaterialIcons name="home" size={24} color={activeTab === "Home" ? "#93BD68" : "#222"} />
        <Text style={[styles.tabText, activeTab === "Home" && styles.activeTabText]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabItem, activeTab === "Consultation" && styles.activeTab]}
        onPress={() => navigateTo("Consultation")}
      >
        <MaterialIcons name="chat" size={24} color={activeTab === "Consultation" ? "#93BD68" : "#222"} />
        <Text style={[styles.tabText, activeTab === "Consultation" && styles.activeTabText]}>Consultation</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabItem, activeTab === "Checkup" && styles.activeTab]}
        onPress={() => navigateTo("Checkup")}
      >
        <MaterialIcons name="event" size={24} color={activeTab === "Checkup" ? "#93BD68" : "#222"} />
        <Text style={[styles.tabText, activeTab === "Checkup" && styles.activeTabText]}>Checkup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabItem, activeTab === "Emergency" && styles.activeTab]}
        onPress={() => navigateTo("Emergency")}
      >
        <MaterialIcons name="warning" size={24} color={activeTab === "Emergency" ? "#93BD68" : "#222"} />
        <Text style={[styles.tabText, activeTab === "Emergency" && styles.activeTabText]}>Emergency</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    color: "#222",
  },
  activeTab: {
    backgroundColor: "#e0f7e4",
  },
  activeTabText: {
    color: "#93BD68",
  },
});

export default BottomTabs;
