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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckBox from "react-native-check-box";
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

const ErrorModal = ({ visible, onClose, errorMessage }) => (
  <Modal onRequestClose={onClose} visible={visible} transparent>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Error</Text>
        <Text style={styles.modalText}>{errorMessage}</Text>
        <Pressable style={styles.modalButton} onPress={onClose}>
          <Text style={styles.modalButtonText}>Close</Text>
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
const PatientNormalSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation<NavigationProps>()

  const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    gender: yup.string().required("Gender is required"),
    maritalStatus: yup.string().required("Marital status is required"),
    dateOfBirth: yup
      .date()
      .required("Date of birth is required")
      .typeError("Invalid date format"),
    identityNumber: yup.string().required("Identity number is required"),
    hasFamilyMembers: yup.boolean().required("Family status is required"),
    hasChildren: yup.boolean().required("Children status is required"),
    location: yup.string().required("Location is required"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreateAccount = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("https://beok.onrender.com/users/", {
        username: data.fullName.toLowerCase().replace(/\s/g, ""),
        full_name: data.fullName,
        email: data.email,
        phone_number: data.phoneNumber,
        password: data.password,
        gender: data.gender,
        marital_status: data.maritalStatus,
        date_of_birth: data.dateOfBirth.toISOString().split("T")[0], // Format as YYYY-MM-DD
        identity_number: data.identityNumber,
        has_family_members: data.hasFamilyMembers,
        has_childrens: data.hasChildren,
        location: data.location,
        user_type: "patient",
      });

      reset();
      setIsLoading(false);
      setModalVisible(true);
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 400) {
        setErrorMessage(
          error.response.data.message ||
            "Bad request. Please check your inputs and try again."
        );
        setErrorModalVisible(true);
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
        setErrorModalVisible(true);
      }
    }
  };

  const handleVerifyAccount = () => {
    setModalVisible(false);
    setShowProgress(true);

    setTimeout(() => {
      setShowProgress(false);
      navigation.navigate("Verifyaccount");
    }, 1000);
  };
  const LoginPage = () => {
    navigation.navigate("LoginPage");
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
              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.inputField}
                    placeholder="Enter Full name"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName.message}</Text>
            )}

            <View style={styles.row}>
              <View style={[styles.inputFieldContainer, styles.halfWidth]}>
                <Icon
                  name="id-card"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <Controller
                  control={control}
                  name="identityNumber"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputField}
                      placeholder="Identity Number"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
              {errors.identityNumber && (
                <Text style={styles.errorText}>
                  {errors.identityNumber.message}
                </Text>
              )}

              <View style={[styles.inputFieldContainer, styles.halfWidth]}>
                <Icon
                  name="venus-mars"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputField}
                      placeholder="Gender"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
              {errors.gender && (
                <Text style={styles.errorText}>{errors.gender.message}</Text>
              )}
            </View>

            <View style={styles.row}>
              <View style={[styles.inputFieldContainer, styles.halfWidth]}>
                <Icon
                  name="calendar"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputField}
                      placeholder="Date of Birth"
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        // Assuming you're handling the text input to a date conversion elsewhere
                        onChange(text);
                      }}
                      value={value ? new Date(value).toLocaleDateString() : ""}
                    />
                  )}
                />
              </View>
              {errors.dateOfBirth && (
                <Text style={styles.errorText}>
                  {errors.dateOfBirth.message}
                </Text>
              )}

              <View style={[styles.inputFieldContainer, styles.halfWidth]}>
                <Icon
                  name="heart"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <Controller
                  control={control}
                  name="maritalStatus"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputField}
                      placeholder="Marital status"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
              {errors.maritalStatus && (
                <Text style={styles.errorText}>
                  {errors.maritalStatus.message}
                </Text>
              )}
            </View>

            <View style={styles.inputFieldContainer}>
              <Icon
                name="map-marker"
                size={20}
                color="#BDBDBD"
                style={styles.icon}
              />
              <Controller
                control={control}
                name="location"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.inputField}
                    placeholder="Location (City/District/Sector)"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
            {errors.location && (
              <Text style={styles.errorText}>{errors.location.message}</Text>
            )}

            <View style={styles.rowhave}>
              <Text style={styles.label}>Have family with children?</Text>
              <View style={styles.checkboxOption}>
                <Controller
                  control={control}
                  name="hasFamilyMembers"
                  render={({ field: { onChange, value } }) => (
                    <CheckBox
                      style={styles.checkbox}
                      onClick={() => onChange(true)}
                      isChecked={value}
                    />
                  )}
                />
                <Text>Yes</Text>
              </View>
              <View style={styles.checkboxOption}>
                <Controller
                  control={control}
                  name="hasFamilyMembers"
                  render={({ field: { onChange, value } }) => (
                    <CheckBox
                      style={styles.checkbox}
                      onClick={() => onChange(false)}
                      isChecked={!value}
                    />
                  )}
                />
                <Text>No</Text>
              </View>
            </View>
            {errors.hasFamilyMembers && (
              <Text style={styles.errorText}>
                {errors.hasFamilyMembers.message}
              </Text>
            )}

            <View style={styles.emailPhoneNumber}>
              <View style={styles.inputFieldContainerPhone}>
                <Icon
                  name="phone"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputFieldphone}
                      placeholder="Phone number"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
              {errors.phoneNumber && (
                <Text style={styles.errorText}>
                  {errors.phoneNumber.message}
                </Text>
              )}

              <View style={styles.inputFieldContainerPhone}>
                <Icon
                  name="envelope"
                  size={20}
                  color="#BDBDBD"
                  style={styles.icon}
                />
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputFieldphone}
                      placeholder="Email"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            <View style={styles.inputFieldContainer}>
              <Icon name="lock" size={20} color="#BDBDBD" style={styles.icon} />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.inputField}
                    placeholder="Password"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
            <View style={styles.inputFieldContainer}>
              <Icon name="lock" size={20} color="#BDBDBD" style={styles.icon} />
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.inputField}
                    placeholder="Confirm Password"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}

            <Pressable style={styles.createAccountButton}>
              <Text style={styles.createAccountButtonText}>Create account</Text>
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
      <ErrorModal
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
        errorMessage={errorMessage}
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
    paddingTop: 30,
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
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 0,
    marginBottom: 5,
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
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
  },
});
