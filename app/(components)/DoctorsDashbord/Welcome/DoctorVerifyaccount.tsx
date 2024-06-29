import React, { useState, useRef } from "react";
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
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {NavigationProps} from "../../../(app)/types"
const DoctorVerifyaccount = () => {
  const navigation = useNavigation<NavigationProps>()
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const [otpExpired, setOtpExpired] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const otpInputRefs = useRef([
    React.createRef<TextInput>(),
    React.createRef<TextInput>(),
    React.createRef<TextInput>(),
    React.createRef<TextInput>(),
  ]);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setShowError(false);
    setOtpErrorMessage("");

    if (value && index < 3) {
      otpInputRefs.current[index + 1].current?.focus();
    }
  };

  const handleVerifyCode = async () => {
    if (otp.includes("")) {
      setShowError(true);
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        const code = otp.join("");
        const response = await axios.post("https://beok.onrender.com/users/account-activation/", { code });

        if (response.data.otpExpired) {
          setOtpExpired(true);
        } else {
          console.log("Code verified successfully:", response.data);
          setShowLoader(true); 

          // Simulate a delay for showing the loader
          setTimeout(() => {
            setShowLoader(false);
            navigation.navigate("DoctorLoginPage");
          }, 1000);
        }
      } catch (error) {
        if (error.response?.data?.message === "Invalid OTP") {
          setOtpErrorMessage("Invalid OTP. Please try again.");
        } else {
          setOtpErrorMessage("An error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

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

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.VerifyaccountContainer}>
          <View style={styles.WelcomeText}>
            <Text style={styles.welcomet}>You're</Text>
            <Text style={styles.welcomet}>almost there</Text>
          </View>
        </View>
        <View style={styles.formInputField}>
          <Text style={styles.yourAccount}>Verify your account</Text>
          <View style={styles.VerifyaccountSubcontainer}>
            <Text style={styles.subText}>
              We have sent you a verification code to
              <Text style={styles.highlightText}> m***t@gmail.com</Text> and
              <Text style={styles.highlightText}> +250 78- --- --7</Text>.
            </Text>
          </View>
          <View>
            <View style={styles.otpInputContainer}>
              {otp.map((_, index) => (
                <TextInput
                  key={index}
                  ref={otpInputRefs.current[index]}
                  style={[
                    styles.otpInput,
                    {
                      borderColor:
                        showError && otp[index] === ""
                          ? "red"
                          : focusedIndex === index
                          ? "#000"
                          : "#0C7751",
                    },
                  ]}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={otp[index]}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                />
              ))}
            </View>
            {showError && (
              <Text style={styles.errorText}>
                Please fill in all OTP boxes before submitting!
              </Text>
            )}
            {otpErrorMessage && (
              <Text style={styles.errorText}>{otpErrorMessage}</Text>
            )}
            <View style={styles.verifyCodeContainer}>
              <Pressable style={styles.submitButton} onPress={handleVerifyCode}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Verify Code</Text>
                )}
              </Pressable>
            </View>
            <View style={styles.recieveCode}>
              <Text style={styles.resendDidnt}>Didn’t Receive code? </Text>
              <Pressable
              onPress={()=>{
                navigation.navigate("ResendCodeForEmailField")
              }}
              >
                <Text style={styles.resend}>Resend</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* OTP Expired Modal */}
        {otpExpired && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={otpExpired}
            onRequestClose={() => setOtpExpired(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Your OTP code has expired. Please request a new one.
                </Text>
                <Pressable
                  style={styles.modalButton}
                  onPress={() => setOtpExpired(false)}
                >
                  <Text style={styles.modalButtonText}>OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}

        {/* Custom Progress Loader */}
        <CustomProgressBar visible={showLoader} />
      </View>
    </ScrollView>
  );
};

export default DoctorVerifyaccount;

const styles = StyleSheet.create({
  VerifyaccountContainer: {
    backgroundColor: "#0C7751",
    width: "100%",
    padding: 20,
    paddingTop: 50,
  },
  WelcomeText: {
    marginBottom: 50,
  },
  welcomet: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 3,
  },
  VerifyaccountSubcontainer: {
    width: "68%",
    paddingLeft: 20,
    marginBottom: 10,
  },
  subText: {
    color: "#686868",
  },
  highlightText: {
    color: "black",
    fontWeight: "bold",
  },
  formInputField: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 20,
    paddingTop: 100,
  },
  mainContainer: {
    height: "100%",
    backgroundColor: "#0C7751",
  },
  otpInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#0C7751",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    display: "flex",
    width: "80%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  yourAccount: {
    paddingLeft: 20,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0C7751",
  },
  recieveCode: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    paddingLeft: 20,
    justifyContent: "center",
  },
  resend: {
    color: "#686868",
    fontWeight: "bold",
    letterSpacing: 1,
    cursor:"pointer"
  },
  resendDidnt: {
    color: "black",
    letterSpacing: 1,
  },
  verifyCodeContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#0C7751",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
