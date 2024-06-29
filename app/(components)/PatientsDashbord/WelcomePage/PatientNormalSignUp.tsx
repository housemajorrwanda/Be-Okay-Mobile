import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import CheckBox from "react-native-check-box";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
const PatientNormalSignUp = () => {
  const router=useRouter();
  const LoginPage = () => {
    router.push('./LoginPage');
  };
  const [hasChildren, setHasChildren] = useState(false);
  const [usePhoneSecurity, setUsePhoneSecurity] = useState(false);

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
            <View style={styles.row}>
              <View style={[styles.inputFieldContainer, styles.halfWidth]}>
                <Icon name="id-card" size={20} color="#BDBDBD" style={styles.icon} />
                <TextInput
                  style={styles.inputField}
                  placeholder="Identity Number"
                />
              </View>
              <View style={[styles.inputFieldContainer, styles.halfWidth]}>
                <Icon name="venus-mars" size={20} color="#BDBDBD" style={styles.icon} />
                <TextInput
                  style={styles.inputField}
                  placeholder="Gender"
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={[styles.inputFieldContainer, styles.halfWidth]}>
                <Icon name="calendar" size={20} color="#BDBDBD" style={styles.icon} />
                <TextInput
                  style={styles.inputField}
                  placeholder="Date of Birth"
                />
              </View>
              <View style={[styles.inputFieldContainer, styles.halfWidth]}>
                <Icon name="heart" size={20} color="#BDBDBD" style={styles.icon} />
                <TextInput
                  style={styles.inputField}
                  placeholder="Marital status"
                />
              </View>
            </View>
            <View style={styles.inputFieldContainer}>
              <Icon name="map-marker" size={20} color="#BDBDBD" style={styles.icon} />
              <TextInput
                style={styles.inputField}
                placeholder="Location (City/District/Sector)"
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
              <View style={styles.inputFieldContainerPhone}>
                <Icon name="phone" size={20} color="#BDBDBD" style={styles.icon} />
                <TextInput
                  style={styles.inputFieldphone}
                  placeholder="Phone number"
                />
              </View>
              <View style={styles.inputFieldContainerPhone}>
                <Icon name="envelope" size={20} color="#BDBDBD" style={styles.icon} />
                <TextInput
                  style={styles.inputFieldphone}
                  placeholder="Email"
                />
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
              <CheckBox
                style={styles.checkbox}
                onClick={() => setUsePhoneSecurity(!usePhoneSecurity)}
                isChecked={usePhoneSecurity}
              />
              <Text>Use phone security to login</Text>
            </View>
          </View>
        </View>
      </View>
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
});
