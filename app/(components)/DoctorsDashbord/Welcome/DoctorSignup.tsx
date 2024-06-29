import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import CheckBox from "react-native-check-box";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { SelectList } from "react-native-dropdown-select-list";

const DoctorSignup = () => {
  const router = useRouter();
  const [gender, setGender] = useState("");
  const [profession, setProfession] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [physical, setPhysical] = useState(false);
  const [virtual, setVirtual] = useState(false);
  const [license, setLicense] = useState(null);
  const [selected, setSelected] = React.useState("");

  const GenderData = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Others" },
  ];

  const ProfessionData = [
    { key: "1", value: "Doctor" },
    { key: "2", value: "Nurse" },
    { key: "3", value: "Therapist" },
    { key: "4", value: "Pharmacist" },
    { key: "5", value: "Dentist" },
    { key: "6", value: "Surgeon" },
    { key: "7", value: "Physiotherapist" },
    { key: "8", value: "Psychologist" },
    { key: "9", value: "Nutritionist" },
    { key: "10", value: "Medical Technician" },
  ];

  const SpecializationData = [
    { key: "1", value: "Cardiology" },
    { key: "2", value: "Neurology" },
    { key: "3", value: "Pediatrics" },
    { key: "4", value: "Orthopedics" },
    { key: "5", value: "Gastroenterology" },
    { key: "6", value: "Oncology" },
    { key: "7", value: "Dermatology" },
    { key: "8", value: "Pulmonology" },
    { key: "9", value: "Endocrinology" },
    { key: "10", value: "Rheumatology" },
  ];

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result);
    if ('uri' in result && 'type' in result) {
      setLicense(result.uri);
    } else if ('isCancelled' in result) {
      console.log('Operation cancelled');
    } else {
      console.log('Unknown result:', result);
    }
  };

  
  const LoginPage = () => {
    router.push("./DoctorLoginPage");
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.NormalSignUpContainer}>
          <View style={styles.WelcomeText}>
            <Text style={styles.welcomet}>You’re</Text>
            <Text style={styles.welcomet}>almost there</Text>
          </View>
          <Text style={styles.subText}>
            Lorem ipsum dolor sit amet consectetur. Vitae integer.
          </Text>
        </View>
        <View style={styles.formInputField}>
          <View style={styles.textSignup}>
            <Text style={styles.signup}>SIGN UP</Text>
            <View style={styles.Alreadyhave}>
              <Text>Already have an account?</Text>
              <Pressable onPress={LoginPage}>
                <Text style={styles.loginText}>LOG IN</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.inputFieldsContainer}>
            <View style={styles.inputFieldContainer}>
              <Icon name="user" size={20} color="#BDBDBD" style={styles.icon} />
              <TextInput
                style={styles.inputField}
                placeholder="Enter Full name"
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <MaterialIcons name="numbers" size={20} color="#BDBDBD" style={styles.icon}></MaterialIcons>
              <TextInput
                style={styles.inputField}
                placeholder="Identity Number"
              />
            </View>
            <View style={styles.profession}>
            <SelectList
              setSelected={(val: React.SetStateAction<string>) =>
                setSelected(val)
              }
              dropdownItemStyles={{ backgroundColor: "#0C7751" ,width:365}}
              data={ProfessionData}
              save="value"
              placeholder="Profession"
              dropdownTextStyles={{ color: "white" }}
              dropdownStyles={{
                backgroundColor: "#0C7751",
                borderColor: "#0C7751",
                maxHeight: "auto",
                width:"100%"
              }}
              boxStyles={{width:"100%"}}
              
            />
            </View>
            <View style={styles.row}>
              <View style={styles.indentityContainerinput}>
                <SelectList
                  setSelected={setSpecialization}
                  data={SpecializationData}
                  save="value"
                  placeholder="Specialization"
                  dropdownStyles={styles.dropdownStyles}
                  dropdownTextStyles={styles.dropdownTextStyles}
                />
              </View>
              <View style={styles.indentityContainerinput}>
                <SelectList
                  setSelected={setGender}
                  data={GenderData}
                  save="value"
                  placeholder="Select Gender"
                  dropdownStyles={styles.dropdownStyles}
                  dropdownTextStyles={styles.dropdownTextStyles}
                />
              </View>
            </View>
            <View style={styles.row}>
            <View style={[styles.inputFieldContainer, styles.halfWidth]}>
                <Icon
                  name="file"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <Button title={license ? license.name : "Upload License"} onPress={pickDocument} />
              </View>
              <View style={[styles.inputFieldContainer, styles.halfWidth]}>
              <MaterialIcons name="numbers" size={20} color="#BDBDBD" style={styles.icon}></MaterialIcons>
              <TextInput
                style={styles.inputField}
                placeholder="Licence Number"
              />
              </View>
            </View>

            <View style={styles.Consultation}>

              <Text style={styles.label}>Consultation Mode</Text>
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
            
            <View style={styles.row}>
            <View style={[styles.inputFieldContainer, styles.halfWidth]}>
              <Icon
                name="phone"
                size={20}
                color="#BDBDBD"
                style={styles.icon}
              />
              <TextInput style={styles.inputField} placeholder="Phone number" />
            </View>
            <View style={[styles.inputFieldContainer, styles.halfWidth]}>
              <Icon
                name="envelope"
                size={20}
                color="#BDBDBD"
                style={styles.icon}
              />
              <TextInput style={styles.inputField} placeholder="Email" />
            </View>
            </View>

            <View style={styles.inputFieldContainer}>
              <Icon name="lock" size={20} color="#BDBDBD" style={styles.icon} />
              <TextInput
                style={styles.inputField}
                placeholder="Password"
                secureTextEntry
              />
            </View>
            <View style={styles.inputFieldContainer}>
              <Icon name="lock" size={20} color="#BDBDBD" style={styles.icon} />
              <TextInput
                style={styles.inputField}
                placeholder="Confirm Password"
                secureTextEntry
              />
            </View>
            <Pressable style={styles.createAccountButton}>
              <Text style={styles.createAccountButtonText}>Create account</Text>
            </Pressable>
            <View style={styles.securityOption}>
              <Text>Use phone security to login</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DoctorSignup;
const styles = StyleSheet.create({
  NormalSignUpContainer: {
    backgroundColor: "#0C7751",
    width: "100%",
    padding: 20,
    paddingTop: 10,
  },
  WelcomeText: {
    // alignItems: "center",
  },
  welcomet: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 3,
  },
  subText: {
    width: "80%",
    color: "white",
    marginTop: 15,
    fontSize: 12,
    letterSpacing: 1.5,
    lineHeight: 16,
    marginBottom: 20,
  },
  formInputField: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 20,
    paddingTop: 25,
  },
  mainContainer: {
    height: "100%",
    backgroundColor: "#0C7751",
  },
  textSignup: {
    marginBottom: 10,
  },
  signup: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  Alreadyhave: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    marginTop: 10,
  },
  loginText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0C7751",
    borderBottomWidth: 1,
    borderBottomColor: "#0C7751",
    marginLeft: 5,
  },
  inputFieldsContainer: {
    alignItems: "center",
  },
  inputFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#0C7751",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
  },
  inputFieldContainerPhone: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#93BD68",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    width: "48%",
  },
  inputField: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  Consultation:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom:10
  },

  rowhave: {
    flexDirection: "row",
    width: "100%",
    gap: 30,
  },
  halfWidth: {
    width: "48%",
  },
  label: {
    fontSize: 14,
    color: "#0C7751",
  },
  checkbox: {
    marginLeft: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: 5,
  },
  createAccountButton: {
    backgroundColor: "#0C7751",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 0,
    marginBottom: 0,
  },
  createAccountButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  securityOption: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    marginTop: 10,
  },
  securityOptionText: {
    fontSize: 14,
    marginLeft: 10,
  },
  checkboxOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  emailPhoneNumber: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 2,
  },
  inputFieldphone: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  EnterField: {
    borderWidth: 1,
    borderColor: "#0C7751",
    padding: 5,
    borderRadius: 10,
  },
  indentityRow: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    marginBottom: 10,
  },
  indentityContainerinput: {
    marginBottom:15,
    width: "48%",
  },
  dropdownStyles: {
    backgroundColor: "#0C7751",
    zIndex: 1,
  },
  dropdownTextStyles: {
    color: "white",
    fontWeight: "medium",
  },

  profession:{
    marginBottom:15
  }
});
