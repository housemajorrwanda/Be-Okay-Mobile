import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";

import { useRouter } from "expo-router";

const Verifyaccount = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const otpInputRefs = useRef([
    React.createRef<TextInput>(),
    React.createRef<TextInput>(),
    React.createRef<TextInput>(),
    React.createRef<TextInput>(),
  ]);


  const handleVerifyCode = () => {
      router.push("./DoctorConfirmPassword");
    }
  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      // Move to the next input field
      otpInputRefs.current[index + 1].current?.focus();
    }
  };

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
                      borderColor: focusedIndex === index ? "#000" : "#0C7751",
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
            <View style={styles.verifyCodeContainer}>
              <Pressable style={styles.submitButton} onPress={handleVerifyCode}>
                <Text style={styles.submitButtonText}>
                Verify Code
                </Text>
              </Pressable>
            </View>
            <View style={styles.recieveCode}>
              <Text style={styles.resendDidnt}>Didn’t Receive code? </Text>
              <Pressable>
                <Text style={styles.resend}>Resend</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Verifyaccount;

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
    // Example highlight color
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
    display:"flex",
    width:"80%",
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center"
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
    color: "#CDCDCD",
    fontWeight: "bold",
    letterSpacing:1

  },
  resendDidnt:{
    color:"black",
    letterSpacing:1
  },
  verifyCodeContainer:{
    display:"flex",
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  }
});
