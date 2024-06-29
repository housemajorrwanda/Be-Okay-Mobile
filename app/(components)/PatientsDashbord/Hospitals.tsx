import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Header from "../ReusableComponent/Header1";
import BottomTabs1 from "../ReusableComponent/BottomTabs1";
const { height } = Dimensions.get("window");
const hospitalsData = [
  {
    name: "Mayao Clinic, Rochester",
    address: "99 Crown Street London city",
    image: require("../assets/Mayo-Clinic.png"),
    workingHours: "9:00 AM - 5:00 PM",
    mainService: "Cardiology",
  },
  {
    name: "UCLA Medical Center",
    address: "99 Crown Street London city",
    image: require("../assets/Mayo-Clinic.png"),
    workingHours: "8:00 AM - 6:00 PM",
    mainService: "Neurology",
  },
  {
    name: "John Hopkins Hospital",
    address: "99 Crown Street London city",
    image: require("../assets/Mayo-Clinic.png"),
    workingHours: "7:00 AM - 8:00 PM",
    mainService: "Orthopedics",
  },
  {
    name: "St. Michael's Hospital",
    address: "101 Main Street New York",
    image: require("../assets/Mayo-Clinic.png"),
    workingHours: "9:00 AM - 6:00 PM",
    mainService: "Pediatrics",
  },
  {
    name: "Cedar Sinai Medical Center",
    address: "123 Elm Street Los Angeles",
    image: require("../assets/Mayo-Clinic.png"),
    workingHours: "8:00 AM - 7:00 PM",
    mainService: "Oncology",
  },
];

const Hospitals = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.middleContent}>
          {hospitalsData.map((hospital, index) => (
            <View key={index} style={styles.hospitalCard}>
              <Image source={hospital.image} style={styles.hospitalImage} />
              <View >
                <View style={styles.nameAndbutton}>
                  <View >
                    <Text style={styles.hospitalName}>{hospital.name}</Text>
                    <Text style={styles.hospitalService}>
                      {hospital.mainService}
                    </Text>
                  </View>

                  <View>
                    <TouchableOpacity style={styles.bookButton}>
                      <Text style={styles.bookButtonText}>Book</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.addressHours}>
                  <Text style={styles.hospitalAddress}>{hospital.address}</Text>
                  <Text style={styles.hospitalHours}>
                    {hospital.workingHours}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomTabs}>
        <BottomTabs1 activeTab="Hospitals" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 70,
  },
  container: {
    flex: 1,
  },
  middleContent: {
    marginTop: 100,
    paddingHorizontal: 10,
    flex: 1,
  },
  hospitalCard: {
    elevation: 3,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    // padding: 10,
    height: (height - 240) / 5,
    paddingBottom: 0,
    paddingTop: 0,
    justifyContent:"space-around"
  },
  hospitalImage: {
    height: 75,
    width: 80,
    borderRadius: 10,
  },
  hospitalInfo: {
    marginLeft: 10,
    flex: 1,
  },
  hospitalName: {
    fontSize: 13,
    fontWeight: "semibold",
    marginBottom:5
  },
  hospitalAddress: {
    fontSize: 13,
    fontWeight: "semibold",
    color: "#000",
    
  },
  hospitalHours: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
  },
  hospitalService: {
    fontSize: 13,
    fontWeight: "semibold",
    marginBottom:5

  },
  bookButton: {
    backgroundColor: "#93BD68",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  bookButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomTabs: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  nameAndbutton:{
    flexDirection:"row",
    justifyContent:"space-between",
  },
  addressHours:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    gap:7
  }
});

export default Hospitals;
