import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const PatientBookDoctorAppointmentHeader = () => {
  const router = useRouter();
  const navigateTCheckSupport = () => {
    router.push("../PatientsDashbord/CheckSuport");
  };
  return (
    <View>
      <View style={styles.profileHeader}>
        <View style={styles.doctorStatusheadContainer}>
          <View>
            <Image
              source={require("../assets/DoctorImage.png")}
              style={styles.profileImage}
            />
            <View style={styles.activeIcon} />
          </View>

          <View>
            <Text style={styles.doctorName}>Dr. NZARORA J. Marie Vianney</Text>
            <View style={styles.specialization_icon}>
              <Text style={styles.specialization}>Neurologist</Text>
              <View style={styles.logoutNotificationContainer}>
                <View style={styles.headerIcons}>
                  <TouchableOpacity onPress={navigateTCheckSupport}>
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={30}
                      color="white"
                    />
                  </TouchableOpacity>

                  <Ionicons
                    name="notifications-sharp"
                    size={30}
                    color="white"
                  />
                </View>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.doctorstatus}>
                <Text style={styles.detailsText}>Patients</Text>
                <Text style={styles.status}>200+</Text>
              </View>
              <View>
                <Text style={styles.detailsText}>Experience</Text>
                <Text style={styles.status}>5 Yrs+</Text>
              </View>
              <View style={styles.doctorstatus1}>
                <Text style={styles.detailsText}>Ratings</Text>
                <Text style={styles.status}>3.5</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PatientBookDoctorAppointmentHeader;

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#8BB85C",
    padding: 10,
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },

  logoutNotificationContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  activeIcon: {
    position: "absolute",
    bottom: 103,
    right: 18,
    width: 15,
    height: 15,
    borderRadius: 20,
    backgroundColor: "#18B415",
  },
  specialization_icon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "relative",
    left: 50,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 30,
    marginRight: 20,
  },
  doctorstatus: {
    borderWidth: 2,
    borderLeftColor: "#8BB85C",
    borderRightColor: "white",
    borderTopColor: "#8BB85C",
    borderBottomColor: "#8BB85C",
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },
  doctorstatus1: {
    borderWidth: 2,
    padding: 2,
    borderLeftColor: "white",
    borderRightColor: "#8BB85C",
    borderTopColor: "#8BB85C",
    borderBottomColor: "#8BB85C",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 20,
  },
  doctorStatusheadContainer: {
    flexDirection: "row",
    borderWidth: 1,
    width: "100%",
    borderRightColor: "#8BB85C",
    borderTopColor: "#8BB85C",
    borderBottomColor: "#fff",
    borderLeftColor: "#8BB85C",
    paddingBottom: 4,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailsText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "light",
    marginBottom: 2,
  },
  status: {
    color: "white",
    fontWeight: "bold",
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFDFD",
    width: "80%",
    lineHeight: 21,
  },
  specialization: {
    fontSize: 12,
    color: "#FFFDFD",
    fontWeight: "medium",
    marginTop: 2,
  },
});
