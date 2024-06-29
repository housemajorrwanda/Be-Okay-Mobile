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
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {NavigationProps} from "../../../(app)/types"
import axios from "axios";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const DoctorLoginPage = () => {
  const navigation = useNavigation<NavigationProps>()
  const [isLoading, setIsLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const schema = yup.object().shape({
    username: yup.string().required("User name or Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigateToSignup = () => {
   navigation.navigate("NormalSignUp");
  };

  const PasswordEmailForget = () => {
   navigation.navigate("PasswordEmailForget");

  };

  const navigateToPatientsDashbord = () => {
   navigation.navigate("DoctorsDashbord");

  };

  const handleLogin = async (data: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await axios.post("https://beok.onrender.com/login/", {
        username: data.username.toLowerCase().replace(/\s/g, ""),
        password: data.password,
      });

      const { access, refresh } = response.data;

      await AsyncStorage.setItem("accessToken", access);
      await AsyncStorage.setItem("refreshToken", refresh);
      console.log(access)  
      setIsLoading(false);
      setShowProgress(true);
      setTimeout(() => {
        setShowProgress(false);
        navigateToPatientsDashbord();
      }, 1000); 
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 400) {
        const errorData = error.response.data;
        if (errorData.username) {
          setErrorMessage("Invalid username or email.");
        } else if (errorData.password) {
          setErrorMessage("Invalid password.");
        } else {
          setErrorMessage(
            errorData.message ||
              "Bad request. Please check your inputs and try again."
          );
        }
        setErrorModalVisible(true);
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again later."
        );
        setErrorModalVisible(true);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.welcomeText}>On Be-Okay!</Text>
        </View>
        <View style={styles.subTextContainer}>
          <Text style={styles.subText}>
            Lorem ipsum dolor sit amet consectetur. Vitae integer.
          </Text>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>LOG IN</Text>
          <Pressable style={styles.signupButton} onPress={navigateToSignup}>
            <Text style={styles.signupText}>
              Don't have an account? Sign UP
            </Text>
          </Pressable>
          <View style={styles.continue}>
            <Pressable style={styles.socialButton}>
              <Image
                source={require("../../assets/google-icon.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>with Google</Text>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <Image
                source={require("../../assets/apple.png")}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>with Apple</Text>
            </Pressable>
          </View>
          <View style={styles.lineOrLog}>
            <Text style={styles.line}></Text>
            <Text style={styles.orText}>or Log with email</Text>
            <Text style={styles.line}></Text>
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={require("../../assets/User.png")}
              style={styles.inputIcon}
            />
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Email or User Name"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.username && (
            <Text style={styles.errorText}>{errors.username.message}</Text>
          )}
          <View style={styles.inputContainer}>
            <Image
              source={require("../../assets/lock.png")}
              style={styles.inputIcon}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
          <View style={styles.forgotContainer}>
            <Pressable onPress={PasswordEmailForget}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.forgotText}>Get Help</Text>
            </Pressable>
          </View>
          <Pressable
            style={styles.loginButton}
            onPress={handleSubmit(handleLogin)}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.loginText}>Log In</Text>
            )}
          </Pressable>
          <CustomProgressBar visible={showProgress} />
          <ErrorModal
            visible={errorModalVisible}
            onClose={() => setErrorModalVisible(false)}
            errorMessage={errorMessage}
          />
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              Terms of services Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DoctorLoginPage;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  welcomeContainer: {
    marginBottom: 10,
  },
  welcomeText: {
    color: "#0C7751",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 35,
    letterSpacing: 1,
  },
  subTextContainer: {
    marginBottom: 20,
  },
  subText: {
    color: "#888888",
    fontSize: 14,
    width: "60%",
  },
  loginContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
  },
  loginTitle: {
    color: "#202020",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  continue: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // backgroundColor: "blue",
    justifyContent: "space-between",
  },
  signupButton: {
    marginBottom: 20,
  },
  signupText: {
    color: "#A5A5A5",
    fontSize: 14,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 10,
    borderColor: "#888888",
    borderWidth: 1,
    width: "48%",
  },
  socialIcon: {
    marginRight: 10,
  },
  socialText: {
    color: "#202020",
    fontSize: 16,
  },
  orText: {
    color: "#A5A5A5",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#0C7751",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotContainer: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 3,
  },
  forgotText: {
    color: "#A5A5A5",
    fontSize: 14,
  },
  fingerprintButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  fingerprintIcon: {
    width: 50,
    height: 50,
  },
  termsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  termsText: {
    color: "#A5A5A5",
    fontSize: 14,
  },
  line: {
    width: 77,
    height: 1,
    backgroundColor: "#9B9B9B",
  },
  lineOrLog: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
  },
  errorInput: {
    borderColor: "red",
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
    backgroundColor: "#0C7751",
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
});
