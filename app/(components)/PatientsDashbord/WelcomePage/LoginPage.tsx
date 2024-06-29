import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  Alert,
} from "react-native";
import FingerprintScanner from "react-native-fingerprint-scanner";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
// import PatientProfile from "../../Profile/PatientProfile/PatientProfile";
import EditProfile from "../../Profile/PatientProfile/EditProfile";
import PatientDashboard from "../PatientsDashbord";
import onbordPage from "../../OnBording/onbordPage";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biometricError, setBiometricError] = useState(null);
  const [scannerInitialized, setScannerInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    FingerprintScanner.isSensorAvailable()
      .then(() => {
        console.log("Biometric sensor is available");
        setScannerInitialized(true);
      })
      .catch((error) => {
        setBiometricError(error.message);
      });

    return () => {
      if (scannerInitialized) {
        FingerprintScanner.release();
      }
    };
  }, [scannerInitialized]);

  const navigateToSignup = () => {
    router.push("../WelcomePage/NormalSignUp");
  };

  const navigateToVerifyaccount=()=>{
    router.push("./Verifyaccount")
  }
  const PasswordEmailForget = () => {
    router.push("./PasswordEmailForget");
  };

const navigateToPatientsDashbord=()=>{
  router.push("../PatientsDashbord")
}

  const authenticateWithBiometrics = () => {
    FingerprintScanner.authenticate({ title: "Log in with Biometrics" })
      .then(() => {
        Alert.alert("Authenticated successfully");
        // Navigate to authenticated screen
      })
      .catch((error) => {
        Alert.alert("Authentication failed", error.message);
      });
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
            <TextInput
              style={styles.input}
              placeholder="Email or Phone number"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Image
              source={require("../../assets/lock.png")}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.forgotContainer}>
            <Pressable onPress={PasswordEmailForget}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.forgotText}>Get Help</Text>
            </Pressable>
          </View>
          <Pressable style={styles.loginButton} onPress={navigateToPatientsDashbord}>
            <Text style={styles.loginText}>Log In</Text>
          </Pressable>

          {scannerInitialized && biometricError === null && (
            <Pressable
              style={styles.fingerprintButton}
              onPress={authenticateWithBiometrics}
            >
              <Image
                source={require("../../assets/fingerPrint.png")}
                style={styles.fingerprintIcon}
              />
            </Pressable>
          )}
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

export default LoginPage;

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
    color: "#7DB149",
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
    backgroundColor: "#93BD68",
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
});
