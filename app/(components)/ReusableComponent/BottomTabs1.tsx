import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Define your navigation routes type
type RootStackParamList = {
  PatientsDashbord: undefined;
  EPrescriptionForm: undefined;
  Emergency: undefined;
  Hospitals: undefined;
};

const BottomTabs1 = ({ activeTab }: { activeTab: string }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Use navigation

  const handleTabPress = (tabName: string, route: keyof RootStackParamList) => {
    navigation.navigate(route);  
  };

  return (
    <View>
      <View style={styles.bottomTabBar}>
        {/* Home Tab */}
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Home" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("Home", "PatientsDashbord")}
        >
          <Image
            source={require("../assets/homeIcon.png")}
            style={styles.imageIcon}
          />
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Home" && styles.activeTabButtonText,
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>

        {/* Medical Report Tab */}
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "MedicalReport" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("MedicalReport", "EPrescriptionForm")}
        >
          <Image
            source={require("../assets/medicalreporticon.png")}
            style={styles.imageIcon}
          />
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "MedicalReport" && styles.activeTabButtonText,
            ]}
          >
            Medical Report
          </Text>
        </TouchableOpacity>

        {/* Emergency Tab */}
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Emergency" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("Emergency", "Emergency")}
        >
          <Image
            source={require("../assets/caricon.png")}
            style={styles.imageIcon}
          />
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Emergency" && styles.activeTabButtonText,
            ]}
          >
            Emergency
          </Text>
        </TouchableOpacity>

        {/* Hospitals Tab */}
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Hospitals" && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress("Hospitals", "Hospitals")}
        >
          <Image
            source={require("../assets/hospital.png")}
            style={styles.imageIcon}
          />
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Hospitals" && styles.activeTabButtonText,
            ]}
          >
            Hospitals
          </Text>
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
    paddingBottom: 4,
    paddingTop: 10,
  },
  tabButton: {
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  activeTabButton: {
    backgroundColor: "#CFDEFF",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tabButtonText: {
    fontSize: 12,
    color: "#93BD68",
    fontWeight: "semibold",
  },
  activeTabButtonText: {
    color: "#93BD68",
    fontWeight: "bold",
  },
  imageIcon: {
    width: 30,
    height: 20,
    objectFit: "contain",
  },
});
