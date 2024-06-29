import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Modal
} from "react-native";
import CheckBox from "react-native-check-box";
import Icon from "react-native-vector-icons/FontAwesome";
import { Entypo } from "@expo/vector-icons";
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

interface FormErrors {
  [key: string]: string;
}

const PatientNormalSignUp = () => {
  const navigation = useNavigation<NavigationProps>()
  const [errors, setErrors] = useState<FormErrors>({});
  const [usePhoneSecurity, setUsePhoneSecurity] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [hasChildren, setHasChildren] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    identity_number: "",
    gender: "",
    date_of_birth: "",
    marital_status: "",
    location: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
    has_family_members: true,
  });

  const validateForm = () => {
    const newErrors: FormErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        newErrors[key] = "This field is required";
      }
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });

    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleRegistrationError = (error: any) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          const errorData = error.response.data;
          if (errorData.username) {
            setErrorMessage("Username is already taken.");
          } else if (errorData.phone_number) {
            setErrorMessage("Phone number is already registered.");
          } else if (errorData.email) {
            setErrorMessage("Email is already registered.");
          } else {
            setErrorMessage(
              errorData.message || "Bad request. Please check your inputs and try again."
            );
          }
          break;
        case 401:
          setErrorMessage("Unauthorized access. Please log in and try again.");
          break;
        case 403:
          setErrorMessage("Forbidden. You do not have permission to perform this action.");
          break;
        case 500:
          setErrorMessage("Internal server error. Please try again later.");
          break;
        default:
          setErrorMessage("An unexpected error occurred. Please try again later.");
          break;
      }
    } else {
      setErrorMessage(
        "An unexpected error occurred. Please check your network connection and try again."
      );
    }
    setErrorModalVisible(true);
  };
  

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://beok.onrender.com/patients/registration/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              use_phone_security: usePhoneSecurity,
              userType: "patient",
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setIsLoading(false);
          setModalVisible(true);
        } else {
          handleRegistrationError({ response });
        }
      } catch (error) {
        handleRegistrationError(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const LoginPage = () => {
    navigation.navigate("LoginPage");
  };

  const handleVerifyAccount = () => {
    setModalVisible(false);
    setShowProgress(true);
    setTimeout(() => {
      setShowProgress(false);
      navigation.navigate("Verifyaccount");
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
          <View style={styles.inputFieldsContainer}>
            <View style={styles.row}>
              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.full_name && styles.errorBorder,
                ]}
              >
                <Icon
                  name="user"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.inputField]}
                  placeholder="Enter Full name"
                  value={formData.full_name}
                  onChangeText={(text) => handleChange("full_name", text)}
                />
              </View>
              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.username && styles.errorBorder,
                ]}
              >
                <Entypo
                  name="user"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.inputField]}
                  placeholder="Enter User name"
                  value={formData.username}
                  onChangeText={(text) => handleChange("username", text)}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.identity_number && styles.errorBorder,
                ]}
              >
                <Icon
                  name="id-card"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.inputField]}
                  placeholder="Identity Number"
                  value={formData.identity_number}
                  onChangeText={(text) => handleChange("identity_number", text)}
                />
              </View>
              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.gender && styles.errorBorder,
                ]}
              >
                <Icon
                  name="venus-mars"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.inputField]}
                  placeholder="Gender"
                  value={formData.gender}
                  onChangeText={(text) => handleChange("gender", text)}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.date_of_birth && styles.errorBorder,
                ]}
              >
                <Icon
                  name="calendar"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.inputField]}
                  placeholder="YYYY-MM-DD"
                  value={formData.date_of_birth}
                  onChangeText={(text) => handleChange("date_of_birth", text)}
                />
              </View>
              <View
                style={[
                  styles.inputFieldContainer,
                  styles.halfWidth,
                  errors.marital_status && styles.errorBorder,
                ]}
              >
                <Icon
                  name="heart"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.inputField]}
                  placeholder="Marital status"
                  value={formData.marital_status}
                  onChangeText={(text) => handleChange("marital_status", text)}
                />
              </View>
            </View>

            <View
              style={[
                styles.inputFieldContainer,
                errors.location && styles.errorBorder,
              ]}
            >
              <Icon
                name="map-marker"
                size={20}
                color="#BDBDBD"
                style={styles.icon}
              />
              <TextInput
                style={[styles.inputField]}
                placeholder="Location (City/District/Sector)"
                value={formData.location}
                onChangeText={(text) => handleChange("location", text)}
              />
            </View>
            <View style={styles.rowhave}>
              <Text style={styles.label}>Have family with children?</Text>
              <View style={styles.checkboxOption}>
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => setHasChildren(!hasChildren)}
                  isChecked={hasChildren}
                />
                <Text>Yes</Text>
              </View>
              <View style={styles.checkboxOption}>
                <CheckBox
                  style={styles.checkbox}
                  onClick={() => setHasChildren(!hasChildren)}
                  isChecked={!hasChildren}
                />
                <Text>No</Text>
              </View>
            </View>

            <View style={styles.emailPhoneNumber}>
              <View
                style={[
                  styles.inputFieldContainerPhone,
                  errors.phone_number && styles.errorBorder,
                ]}
              >
                <Icon
                  name="phone"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.inputFieldphone]}
                  placeholder="Phone number"
                  value={formData.phone_number}
                  onChangeText={(text) => handleChange("phone_number", text)}
                />
              </View>
              <View
                style={[
                  styles.inputFieldContainerPhone,

                  errors.email && styles.errorBorder,
                ]}
              >
                <Icon
                  name="envelope"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.inputFieldphone]}
                  placeholder="Email"
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                />
              </View>
            </View>
            <View
              style={[
                styles.inputFieldContainer,
                errors.password && styles.errorBorder,
              ]}
            >
              <Icon name="lock" size={20} color="#BDBDBD" style={styles.icon} />
              <TextInput
                style={[styles.inputField]}
                placeholder="Password"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleChange("password", text)}
              />
            </View>
            <View
              style={[
                styles.inputFieldContainer,
                errors.confirmPassword && styles.errorBorder,
              ]}
            >
              <Icon name="lock" size={20} color="#BDBDBD" style={styles.icon} />
              <TextInput
                style={[styles.inputField]}
                placeholder="Confirm Password"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
              />
            </View>
            <Pressable
              style={styles.createAccountButton}
              onPress={handleSubmit}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.createAccountText}>Create Account</Text>
              )}
            </Pressable>
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

export default PatientNormalSignUp;

const styles = StyleSheet.create({
  NormalSignUpContainer: {
    backgroundColor: "#93BD68",
    width: "100%",
    padding: 20,
    paddingTop: 30,
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
    backgroundColor: "#93BD68",
  },
  textSignup: {
    marginBottom: 20,
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
    borderColor: "#93BD68",
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
    backgroundColor: "#93BD68",
    borderRadius: 10,
    marginTop: 0,
    marginBottom: 5,

    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  createAccountText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
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
    marginRight: 0,
  },
  errorBorder: {
    borderColor: "red",
    borderWidth: 1,
  },
});
