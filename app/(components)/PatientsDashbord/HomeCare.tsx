import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Header1 from "../ReusableComponent/Header1";
import BottomTabs1 from "../ReusableComponent/BottomTabs1";
const HomeCare = () => {
  const [shortComment, setShortComment] = useState("");
  const [LicenseValidation, setLicenseValidation] = useState("");

  const [licenseDocumment, setLicenseDocumment] = useState(null);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    if ("uri" in result && "type" in result) {
      setLicenseDocumment(result.uri);
    } else if ("isCancelled" in result) {
      console.log("Operation cancelled");
    } else {
      console.log("Unknown result:", result);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Header1 />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.subContiner}>

          <View style={styles.headerRelated}>
            <Text>Add Related Medical Docs</Text>
          </View>

          <View style={styles.documentUpload}>
            <Pressable style={styles.uploadButton} onPress={pickDocument}>
              <Text style={styles.uploadButtonText}>
                {licenseDocumment ? licenseDocumment.name : "Choose"}
              </Text>
            </Pressable>
          </View>

          <View>
            <Text style={styles.label}>Location</Text>
          </View>

          <TextInput
            value={LicenseValidation}
            onChangeText={setLicenseValidation}
            placeholder="Kagalama-Kicukiro"
            style={styles.TextInput}
          />

          <View>
          <Text style={styles.label}>Contact Address</Text>
          </View>
          <TextInput
            value={LicenseValidation}
            onChangeText={setLicenseValidation}
            placeholder="+250 785544760"
            style={styles.TextInput}
          />
          <View>
          <Text style={styles.label}>Other Comment</Text>
          </View>
          <TextInput
            value={shortComment}
            onChangeText={setShortComment}
            placeholder="Leave Comment"
            style={styles.TextArea}
          />

          <Pressable style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Proceed To Payment</Text>
          </Pressable>
        </View>
      </ScrollView>
      <BottomTabs1 activeTab="Home"/>
    </View>
  );
};
export default HomeCare;

const styles = StyleSheet.create(
    {
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 100,
  },
  header: {
    paddingBottom: 50,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 25,
  },

  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 2,
    textAlign: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },

  activeButton: {
    backgroundColor: "#E5FFCA",
    borderRadius: 15,
  },
  activeButtonText: {
    color: "#93BD68",
    fontWeight: "bold",
  },
  uploadButton: {
    backgroundColor: "#93BD68",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
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
    backgroundColor: "#93BD68",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
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

  editIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
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
  TextArea: {
    height: 80,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
  },
  TextInput: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  documentUpload: {
    marginBottom: 10,
  },
  headerRelated:{
    paddingTop:20,
    paddingLeft:0,
    paddingBottom:5
  },
  label:{
    fontWeight:"bold",
    marginBottom:10,
    marginTop:10
  },
}
);
