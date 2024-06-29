// Please enhance the calendar for selecting a starting date and an ending date by following these rules:

// 1.No selection of dates from the previous or future years, or months beyond the current year and month, is allowed and only allowed to be selected is from current.now to all future current
// 2.If the doctor selects the same day, set the starting day and ending day to be the same, but ensure that the minutes and seconds differ.
// 3.If the doctor selects two different days, set one day as the starting day date and place it in the starting_date field, and the other day as the ending day date and place it in the ending_date field, along with their corresponding hours and minutes as specified.

import InputReusable from "../ReusableComponent/InputReusable";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  Image,
  ScrollView,
} from "react-native";
import CheckBox from "react-native-check-box";
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const DoctorEditProfile = () => {
  const [shortBio, setShortBio] = useState("");
  const [status, setStatus] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [physical, setPhysical] = useState(false);
  const [virtual, setVirtual] = useState(false);
  const [LicenseValidation, setLicenseValidation] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [license, setLicense] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const StatusOptions = [
    { key: "1", value: "Nurse" },
    { key: "2", value: "Doctor" },
  ];
  const SpecializationOptions = [
    { key: "1", value: "Cardiology" },
    { key: "2", value: "Neurology" },
    { key: "3", value: "Pediatrics" },
  ];

  const handleSave = () => {
    console.log({
      shortBio,
      status,
      specialization,
      physical,
      virtual,
      licenseNumber,
      selectedImage,
      selectedDocument,
    });
  };

  const pickImageToEdit = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setProfileImageUrl(uri);
      uploadImage(uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const formData = new FormData();

    formData.append("image", {
      uri,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any);

    const accessToken = await AsyncStorage.getItem("accessToken");

    try {
      const response = await fetch(
        "https://beok.onrender.com/users/profile-picture/",
        {
          method: "POST",
          headers: {
            Authorization: `JWT ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Image uploaded successfully:", result);
      } else {
        console.error("Image upload failed:", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    if ("uri" in result && "type" in result) {
      setLicense(result.uri);
    } else if ("isCancelled" in result) {
      console.log("Operation cancelled");
    } else {
      console.log("Unknown result:", result);
    }
  };
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          const response = await axios.get(
            "https://beok.onrender.com/users/profile-picture/",
            {
              headers: {
                Authorization: `JWT ${token}`,
              },
            }
          );
          setProfileImageUrl(response.data.image);
        } else {
          console.log("No access token found");
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.largeContainer}>
          <View style={styles.imageBeOkayContainer}>
            <Image
              source={require("../assets/Be-Okay_logo.png")}
              style={{ width: 33, height: 27 }}
            />
            <Text style={styles.beokay}>Be Okay</Text>
          </View>
          <View style={styles.CompleteProfile}>
            <Text style={styles.header}>Complete Profile</Text>
            <Text style={styles.subHeader}>
              Please take a few minutes to complete your profile
            </Text>
            <View style={styles.doctorProfile}>
              <View style={styles.doctorContaierDetails}>
                <View style={styles.imagep}>
                  <Image
                    source={{ uri: profileImageUrl }}
                    style={{ width: 45, height: 45, borderRadius: 40 }}
                  />
                </View>
                <View>
                  <Text style={styles.firstName}> James</Text>
                  <Text style={styles.lastName}>Karangwa</Text>
                </View>
                <Pressable style={styles.editIcon} onPress={pickImageToEdit}>
                  <MaterialIcons name="edit" style={{ fontSize: 12 }} />
                  <Text style={{ fontSize: 12 }}>Edit</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.subContiner}>
          <InputReusable
            type="textarea"
            label=""
            value={shortBio}
            onChangeText={setShortBio}
            placeholder="Short Bio"
          />
          <InputReusable
            type="select"
            label=""
            selectedOption={status}
            onOptionChange={setStatus}
            options={StatusOptions}
            placeholder="Status (Nurse / Doctor)"
          />

          <InputReusable
            type="select"
            label=""
            selectedOption={specialization}
            onOptionChange={setSpecialization}
            options={SpecializationOptions}
            placeholder="Specialisations"
          />

          <Text style={styles.consultationHeader}>
            Consultation Availability
          </Text>
          <View style={styles.Consultation}>
            <View style={styles.checkboxOption}>
              <CheckBox
                style={styles.checkbox}
                onClick={() => setPhysical(!physical)}
                isChecked={physical}
              />
              <Text>Physical</Text>
            </View>
            <View style={styles.checkboxOption}>
              <CheckBox
                style={styles.checkbox}
                onClick={() => setVirtual(!virtual)}
                isChecked={virtual}
              />
              <Text>Virtual</Text>
            </View>
          </View>
          <InputReusable
            type="text"
            label=""
            value={LicenseValidation}
            onChangeText={setLicenseValidation}
            placeholder="License Number"
          />
          <View style={styles.documentUpload}>
            <Pressable style={styles.uploadButton} onPress={pickDocument}>
              <Text style={styles.uploadButtonText}>
                {license ? license.name : "Upload License"}
              </Text>
            </Pressable>
          </View>

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save and Continue</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  subHeader: {
    fontSize: 12,
    marginBottom: 20,
    fontWeight: "medium",
    color: "white",
    width: "50%",
  },
  consultationHeader: {
    fontSize: 12,
    marginVertical: 10,
    fontWeight: "regular",
  },
  documentUpload: {
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: "#0C7751",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  uploadTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#0C7751",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  checkboxOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkbox: {
    marginLeft: 0,
  },
  Consultation: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
    gap: 20,
  },
  imageBeOkayContainer: {
    backgroundColor: "#0C7751",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 10,
  },
  documentText: {
    marginTop: 10,
    fontSize: 14,
    color: "#333",
  },
  beokay: {
    color: "white",
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  CompleteProfile: {
    backgroundColor: "#0C7751",
    padding: 20,
  },
  doctorProfile: {
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 20,
  },
  doctorContaierDetails: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 0,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
  },

  firstName: {
    fontWeight: "regular",
    fontSize: 16,
  },
  lastName: {
    fontWeight: "regular",
    fontSize: 16,
  },
  editIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  imagep: {
    width: 64,
    height: 64,
    backgroundColor: "#F3ABA7",
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  subContiner: {
    backgroundColor: "white",
    padding: 20,
    marginTop: -30,
    zIndex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  largeContainer: {
    paddingBottom: 40,
    backgroundColor: "#0C7751",
  },
});

export default DoctorEditProfile;
