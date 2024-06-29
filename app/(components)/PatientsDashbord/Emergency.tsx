import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
  Pressable
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import Header from "../ReusableComponent/Header1";
import BottomTabs from "../ReusableComponent/ BottomTabs";
import InputReusable from "../ReusableComponent/InputReusable";
import BottomTabs1 from "../ReusableComponent/BottomTabs1";
const EmergencyForm = () => {
  const [emergencyType, setEmergencyType] = useState("");
  const [details, setDetails] = useState("");
  const [requirements, setRequirements] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: -1.9441,
    longitude: 30.0619,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [address, setAddress] = useState("");
  const [activeTab, setActiveTab] = useState("Emergency");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const place = reverseGeocode[0];
        const formattedAddress = `${place.name}, ${place.street}, ${place.city}, ${place.region}, ${place.country}`;
        setAddress(formattedAddress);
      }
    })();
  }, []);

  const handleSubmit = () => {
    if (!emergencyType || !details || !requirements || !contactNumber) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    const formData = {
      emergencyType,
      details,
      requirements,
      contactNumber,
      location: {
        latitude: region.latitude,
        longitude: region.longitude,
        address,
      },
    };

    console.log("Form Data: ", formData);
    Alert.alert("Success", "Emergency details submitted successfully.");
  };

  const emergencyOptions = [
    { key: "Fire", value: "Fire" },
    { key: "Medical", value: "Medical" },
    { key: "Police", value: "Police" },
    { key: "Other", value: "Other" },
  ];

  return (
    <ActionSheetProvider>
      <View style={styles.container}>
        <Header/>
        <ScrollView style={styles.scrollView}>
          <View style={styles.form}>
            <View style={styles.formGroup}>
              <InputReusable
                type="select"
                label="Emergency Type"
                value={emergencyType}
                options={emergencyOptions}
                onOptionChange={setEmergencyType}
              />
            </View>

            <View style={styles.formGroup}>
              <InputReusable
                type="textarea"
                label="Emergency details"
                value={details}
                onChangeText={setDetails}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Specific requirements</Text>
              <TextInput
                style={styles.input}
                value={requirements}
                onChangeText={setRequirements}
                multiline
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Location</Text>
              <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
              >
                {location && (
                  <Marker
                    coordinate={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    }}
                    title="You are here"
                  />
                )}
              </MapView>
              <Text style={styles.locationText}>
                {address || `${region.latitude}, ${region.longitude}`}
              </Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Contact number</Text>
              <TextInput
                style={styles.input}
                value={contactNumber}
                onChangeText={setContactNumber}
                keyboardType="phone-pad"
              />
            </View>

            <Pressable style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </Pressable>
          </View>
        </ScrollView>
        <BottomTabs1  activeTab="Emergency"/>
      </View>
    </ActionSheetProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
    marginTop:110,
  },
  form: {
    padding: 20,
    paddingTop:0,
    paddingBottom:0
  },
  formGroup: {
    // marginTop: -10,
  },
  label: {
    fontSize: 16,
    // marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "white",
  },
  map: {
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 10,
  },
  locationText: {
    textAlign: "center",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#83c788",
    padding:10,
    borderRadius:15,
    alignItems: "center",
    marginTop:5
  },
  submitButtonText: {
    color: "white",
    fontSize: 15,
  },
});

export default EmergencyForm;
