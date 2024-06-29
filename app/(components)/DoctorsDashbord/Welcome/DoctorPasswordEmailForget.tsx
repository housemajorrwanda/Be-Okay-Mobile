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

const PasswordEmailForget = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleEmailSubmit = () => {
    if (email) {
      router.push("./DoctorVerifyaccount");
    } else {
      alert("Please enter a valid email address.");
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
          <Text style={styles.yourAccount}>Enter Email To Proceed</Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Pressable style={styles.submitButton} onPress={handleEmailSubmit}>
            <Text style={styles.submitButtonText}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default PasswordEmailForget;

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
  formInputField: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 20,
    paddingTop: 100,
    alignItems: "center",
  },
  mainContainer: {
    height: "100%",
    backgroundColor: "#0C7751",
  },
  yourAccount: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#0C7751",
    textAlign: "center",
    width:"100%"
  },
  emailInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#0C7751",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#0C7751",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    display:"flex",
    width:"100%",
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center"
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
