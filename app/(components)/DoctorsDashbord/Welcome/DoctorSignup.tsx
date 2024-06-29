import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert,
} from "react-native";
import CheckBox from "react-native-check-box";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialIcons, Entypo, Fontisto } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import {NavigationProps} from "../../../(app)/types"
const VerificationModal = ({ visible, onClose, onVerify }) => (
  <Modal onRequestClose={onClose} visible={visible} transparent>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Account Created Success</Text>
        <Text style={styles.modalText}>
          A verification code has been sent to your email address. Please check
          your inbox and enter the code to verify your account.
        </Text>
        <Pressable style={styles.modalButton} onPress={onVerify}>
          <Text style={styles.modalButtonText}>Proceed to Verify Account</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);
const CustomProgressBar = ({ visible }) => (
  <Modal onRequestClose={() => null} visible={visible} transparent>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={{ fontSize: 20, fontWeight: "200" }}>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    </View>
  </Modal>
);
interface DocumentResult {
  uri: string;
  name: string;
  size: number;
  mimeType: string;
}

const DoctorSignup = () => {
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateofbirth, setdateofbirth] = useState("");
  const [maritalstatus, setmaritalstatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [physical, setPhysical] = useState(false);
  const [virtual, setVirtual] = useState(false);
  const [license, setLicense] = useState<DocumentResult | null>(null);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<NavigationProps>()

  const SpecializationData = [
    { key: "0", value: "Select Specialization", disabled: true },
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

  const ProfessionData = [
    { key: "0", value: "Select Profession", disabled: true },
    { key: "1", value: "Medical Doctor" },
    { key: "2", value: "Pharmacist" },
    { key: "3", value: "Nurse" },
    { key: "4", value: "Dentist" },
    { key: "5", value: "Physiotherapist" },
    { key: "6", value: "Psychologist" },
    { key: "7", value: "Radiographer" },
    { key: "8", value: "Medical Laboratory Scientist" },
    { key: "9", value: "Optician" },
    { key: "10", value: "Medical Record Officer" },
  ];

  const GenderData = [
    { key: "0", value: "Select Gender", disabled: true },
    { key: "1", value: "male" },
    { key: "2", value: "female" },
    { key: "3", value: "other" },
  ];

  const [errors, setErrors] = useState({
    fullName: false,
    username: false,
    email: false,
    phoneNumber: false,
    dateofbirth: false,
    password: false,
    confirmPassword: false,
    location: false,
    maritalstatus: false,
    profession: false,
    specialization: false,
    gender: false,
    licenseNumber: false,
  });

  const handleDocumentUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({});

    if (
      result &&
      !result.canceled &&
      result.assets &&
      result.assets.length > 0
    ) {
      const file = result.assets[0];
      setLicense({
        uri: file.uri,
        name: file.name,
        size: file.size,
        mimeType: file.mimeType,
      });
    } else {
      Alert.alert(
        "No document selected",
        "Please select a document to upload."
      );
    }
  };

  const handleCreateAccount = async () => {
    const newErrors = {
      fullName: !fullName,
      username: !username,
      email: !email,
      gender: !gender,
      dateofbirth: !dateofbirth,
      maritalstatus: !maritalstatus,
      phoneNumber: !phoneNumber,
      password: !password,
      confirmPassword: !confirmPassword,
      location: !location,
      profession: !profession,
      specialization: !specialization,
      licenseNumber: !licenseNumber,
    };

    if (newErrors.dateofbirth && !/^\d{4}-\d{2}-\d{2}$/.test(dateofbirth)) {
      Alert.alert("Error", "Date has wrong format. Use YYYY-MM-DD.");
      setErrors((prev) => ({ ...prev, dateofbirth: true }));
      return;
    }

    if (!license) {
      Alert.alert("Error", "No file was submitted. Please choose a file.");
      return;
    }

    if (
      maritalstatus &&
      !["married", "single", "divorced", "widowed"].includes(
        maritalstatus.toLowerCase()
      )
    ) {
      Alert.alert(
        "Error",
        `Marital status "${maritalstatus}" is not a valid choice. Please choose married, single, divorced, or widowed.`
      );
      setErrors((prev) => ({ ...prev, maritalstatus: true }));
      return;
    }

    if (gender && !["male", "female", "other"].includes(gender.toLowerCase())) {
      Alert.alert("Error", "Invalid gender choice.");
      setErrors((prev) => ({ ...prev, gender: true }));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      setErrors((prev) => ({ ...prev, confirmPassword: true }));
      return;
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("date_of_birth", dateofbirth);
      formData.append("marital_status", maritalstatus);
      formData.append("phone_number", phoneNumber);
      formData.append("password", password);
      formData.append("location", location);
      formData.append("profession", profession);
      formData.append("specialities", specialization);
      formData.append("gender", gender);
      formData.append("physical_consultation", physical ? "true" : "false");
      formData.append("online_consultation", virtual ? "true" : "false");

      if (license) {
        formData.append("license_number", licenseNumber);
        formData.append("document", {
          uri: license.uri,
          type: license.mimeType,
          name: license.name,
        } as any);
      }

      const response = await fetch(
        "https://beok.onrender.com/doctor/registration/",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsLoading(false);
        setModalVisible(true);
        console.log("User created:", data);
      } else {
        console.error("Registration Error:", data);
        setErrorMessage(
          data.message || "An error occurred during registration."
        );
        setErrorModalVisible(true);
      }
    } catch (error: any) {
      // console.error("Network or server error:", error);

      if (error.response) {
        switch (error.response.status) {
          case 400:
            setErrorMessage(
              error.response.data.message ||
                "Bad request. Please check your inputs and try again."
            );
            break;
          case 401:
            setErrorMessage(
              "Unauthorized access. Please log in and try again."
            );
            break;
          case 403:
            setErrorMessage(
              "Forbidden. You do not have permission to perform this action."
            );
            break;
          case 500:
            setErrorMessage("Internal server error. Please try again later.");
            break;
          default:
            setErrorMessage(
              "An unexpected error occurred. Please try again later."
            );
            break;
        }
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please check your network connection and try again."
        );
      }
      setErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const LoginPage = () => {
    navigation.navigate("DoctorLoginPage");
  };

  const handleVerifyAccount = () => {
    setModalVisible(false);
    setShowProgress(true);

    setTimeout(() => {
      setShowProgress(false);
      navigation.navigate("DoctorVerifyaccount");
    }, 1000);
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
          <View>
            <View
              style={[
                styles.inputFieldContainer,
                errors.fullName && styles.errorInput,
              ]}
            >
              <Icon name="user" size={20} color="#BDBDBD" style={styles.icon} />
              <TextInput
                style={styles.inputField}
                placeholder="Enter Full name"
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  setErrors((prev) => ({ ...prev, fullName: !text }));
                }}
              />
            </View>
            <View style={styles.row}>
              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.username && styles.errorInput,
                ]}
              >
                <Entypo
                  name="user"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Username"
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    setErrors((prev) => ({ ...prev, username: !text }));
                  }}
                />
              </View>
              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.location && styles.errorInput,
                ]}
              >
                <Entypo
                  name="location-pin"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Location"
                  value={location}
                  onChangeText={(text) => {
                    setLocation(text);
                    setErrors((prev) => ({ ...prev, location: !text }));
                  }}
                />
              </View>
            </View>
            <View
              style={[
                styles.picker,
                errors.specialization && styles.errorInput,
              ]}
            >
              <Picker
                selectedValue={specialization}
                onValueChange={(itemValue) => {
                  setSpecialization(itemValue);
                  setErrors((prev) => ({
                    ...prev,
                    specialization: !itemValue,
                  }));
                }}
              >
                {SpecializationData.map((item) => (
                  <Picker.Item
                    key={item.key}
                    label={item.value}
                    value={item.value}
                    enabled={!item.disabled}
                  />
                ))}
              </Picker>
            </View>
            <View
              style={[styles.picker, errors.profession && styles.errorInput]}
            >
              <Picker
                selectedValue={profession}
                onValueChange={(itemValue) => {
                  setProfession(itemValue);
                  setErrors((prev) => ({ ...prev, profession: !itemValue }));
                }}
                enabled={
                  specialization !== "" &&
                  specialization !== "Select Specialization"
                }
              >
                {ProfessionData.map((item) => (
                  <Picker.Item
                    key={item.key}
                    label={item.value}
                    value={item.value}
                    enabled={!item.disabled}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.row}>
              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.dateofbirth && styles.errorInput,
                ]}
              >
                <Fontisto
                  name="date"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />

                <TextInput
                  style={[styles.inputField]}
                  placeholder="YY-MM-DD"
                  onChangeText={(text) => {
                    setdateofbirth(text);
                    setErrors((prev) => ({ ...prev, dateofbirth: !text }));
                  }}
                />
              </View>

              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.maritalstatus && styles.errorInput,
                ]}
              >
                <TextInput
                  style={[styles.inputField]}
                  onChangeText={(text) => {
                    setmaritalstatus(text);
                    setErrors((prev) => ({ ...prev, maritalstatus: !text }));
                  }}
                  placeholder="Marital status"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.picker, errors.gender && styles.errorInput]}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => {
                    setGender(itemValue);
                    setErrors((prev) => ({
                      ...prev,
                      gender: !itemValue,
                    }));
                  }}
                >
                  {GenderData.map((item) => (
                    <Picker.Item
                      key={item.key}
                      label={item.value}
                      value={item.value}
                      enabled={!item.disabled}
                    />
                  ))}
                </Picker>
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
                <Pressable
                  onPress={handleDocumentUpload}
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <Text style={{ color: "#BDBDBD", fontWeight: "bold" }}>
                    {license ? license.name : "Upload License"}
                  </Text>
                </Pressable>
              </View>
              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.licenseNumber && styles.errorInput,
                ]}
              >
                <MaterialIcons
                  name="numbers"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Licence number"
                  value={licenseNumber}
                  onChangeText={(text) => {
                    setLicenseNumber(text);
                    setErrors((prev) => ({ ...prev, licenseNumber: !text }));
                  }}
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
              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.phoneNumber && styles.errorInput,
                ]}
              >
                <Icon
                  name="phone"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={(text) => {
                    setPhoneNumber(text);
                    setErrors((prev) => ({ ...prev, phoneNumber: !text }));
                  }}
                />
              </View>
              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.email && styles.errorInput,
                ]}
              >
                <Icon
                  name="envelope"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrors((prev) => ({ ...prev, email: !text }));
                  }}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.password && styles.errorInput,
                ]}
              >
                <Icon
                  name="lock"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Password"
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors((prev) => ({ ...prev, password: !text }));
                  }}
                />
              </View>
              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.confirmPassword && styles.errorInput,
                ]}
              >
                <Icon
                  name="lock"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Confirm Password"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setErrors((prev) => ({ ...prev, confirmPassword: !text }));
                  }}
                />
              </View>
            </View>

            <View style={styles.submitButton}>
              <Pressable
                style={styles.createAccountButton}
                onPress={handleCreateAccount}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Create Account</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <CustomProgressBar visible={showProgress} />
      <VerificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onVerify={handleVerifyAccount}
      />
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
    paddingTop: 15,
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
    marginBottom: 12,
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
    height: 43,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  Consultation: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
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
    marginBottom: 15,
    width: "48%",
  },
  inputFieldContainers: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingLeft: 10,
  },
  dropdownStyles: {
    backgroundColor: "#0C7751",
    zIndex: 1,
  },
  dropdownTextStyles: {
    color: "white",
    fontWeight: "medium",
  },

  profession: {
    marginBottom: 15,
  },
  boxList: {
    height: 43,
    borderColor: "#0C7751",
    borderWidth: 1,
    width: "100%",
  },
  selectText: {
    fontSize: 12,
    color: "red",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  modalButton: {
    backgroundColor: "#93BD68",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorInput: {
    borderColor: "red",
  },
  confirmPassword: {},

  picker: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#0C7751",
    marginBottom: 10,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
  },
  errorPicker: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  submitButton: {
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#A5D6A7",
  },

  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
});
