import InputReusable from "../ReusableComponent/InputReusable";
import React, { useState } from "react";
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
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from "@expo/vector-icons";
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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
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
                    source={require("../assets/Doctor1.png")}
                    style={{ width: 45, height: 45, borderRadius: 40 }}
                  />
                </View>
                <View>
                  <Text style={styles.firstName}> James</Text>
                  <Text style={styles.lastName}>Karangwa</Text>
                </View>
                <Pressable style={styles.editIcon}>
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
    fontWeight:"regular"
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
    marginTop:10
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
    justifyContent: "space-between"
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
    paddingBottom:10
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
