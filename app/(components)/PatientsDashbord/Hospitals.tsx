import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Header from "../ReusableComponent/Header1";
import BottomTabs1 from "../ReusableComponent/BottomTabs1";
import { ScrollView } from "react-native";
const { height } = Dimensions.get('window');

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
      <ScrollView>
      <View style={styles.middleContent}>
        {hospitalsData.map((hospital, index) => (
          <View key={index} style={styles.hospitalCard}>
            <Image source={hospital.image} style={styles.hospitalImage} />
            <View style={styles.hospitalInfo}>
              <Text style={styles.hospitalName}>{hospital.name}</Text>
              <Text style={styles.hospitalService}>{hospital.mainService}</Text>
              <Text style={styles.hospitalAddress}>{hospital.address}</Text>
              <Text style={styles.hospitalHours}>{hospital.workingHours}</Text>
            </View>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      </ScrollView>

      <View  style={styles.bottomTabs}>
      <BottomTabs1 />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  middleContent: {
    marginTop: 110,
    paddingHorizontal: 10,
    flex: 1,
  },
  hospitalCard: {
    elevation: 3,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: (height - 200) / 5, 
    paddingBottom:0,
    paddingTop:0
  },
  hospitalImage: {
    height: 75,
    width: 80,
    borderRadius:10
    
  },
  hospitalInfo: {
    marginLeft: 10,
    flex: 1,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hospitalAddress: {
    fontSize: 14,
    color: 'gray',
  },
  hospitalHours: {
    fontSize: 14,
    color: 'gray',
  },
  hospitalService: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#93BD68',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomTabs: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Hospitals;
