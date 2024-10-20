import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const SettingsScreen = () => {
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [trackLocation, setTrackLocation] = useState(false);
  const [saveDocuments, setSaveDocuments] = useState(false);
  const [saveDataForCalls, setSaveDataForCalls] = useState(false);
  const [setupProxy, setSetupProxy] = useState(false);
  const [twoStepVerification, setTwoStepVerification] = useState(false);
  const navigation = useNavigation(); 

  const SettingItem = ({ title, children }) => (
    <View style={styles.settingItem}>
      <Text style={styles.settingTitle}>{title}</Text>
      {children}
    </View>
  );

  const Dropdown = ({ placeholder }) => (
    <TouchableOpacity style={styles.dropdown}>
      <Text style={styles.dropdownText}>{placeholder}</Text>
      <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <SettingItem title="Incognito Mode">
          <Switch
            value={incognitoMode}
            onValueChange={setIncognitoMode}
            trackColor={{ false: "#767577", true: "#93BD68" }}
            thumbColor={incognitoMode ? "#93BD68" : "#93BD68"}
          />
        </SettingItem>

        <SettingItem title="Allow google to track location">
          <Switch
            value={trackLocation}
            onValueChange={setTrackLocation}
            trackColor={{ false: "#767577", true: "#93BD68" }}
            thumbColor={trackLocation ? "#93BD68" : "#93BD68"}
          />
        </SettingItem>

        <SettingItem title="Change Location">
          <Dropdown placeholder="Select Location" />
        </SettingItem>

        <SettingItem title="Change Language">
          <Dropdown placeholder="Choose Language" />
        </SettingItem>

        <View style={styles.insurance}>
          <Text style={styles.insuranceText}>Insurance</Text>
          <View style={styles.insuranceContainer}>
            <TextInput
              style={styles.insuranceInput}
              placeholder="Insurance Name"
            />
            <TextInput
              style={styles.insuranceInput}
              placeholder="Date of validation (mm/dd/yyyy)"
            />
            <TouchableOpacity style={styles.okButton}>
              <Text style={styles.okButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>

        <SettingItem title="Save Documents">
          <Switch
            value={saveDocuments}
            onValueChange={setSaveDocuments}
            trackColor={{ false: "#767577", true: "#93BD68" }}
            thumbColor={saveDocuments ? "#93BD68" : "#93BD68"}
          />
        </SettingItem>

        <SettingItem title="Clear Data">
          <Dropdown placeholder="Monthly" />
        </SettingItem>

        <View style={styles.storage}>
          <Text style={styles.storageTitle}>Storage & Cellular Data</Text>
          <View style={styles.storageItem}>
            <Text>Save data for calls</Text>
            <Switch
              value={saveDataForCalls}
              onValueChange={setSaveDataForCalls}
              trackColor={{ false: "#767577", true: "#93BD68" }}
              thumbColor={saveDataForCalls ? "#93BD68" : "#93BD68"}
            />
          </View>
          <View style={styles.storageItem}>
            <Text>Media download</Text>
            <Dropdown placeholder="Wi-Fi & Cellular" />
          </View>
          <View style={styles.storageItem}>
            <Text>Media Quality</Text>
            <Dropdown placeholder="Standard" />
          </View>
          <View style={styles.storageItem}>
            <Text>Set up Proxy</Text>
          <Switch
            value={setupProxy}
            onValueChange={setSetupProxy}
            trackColor={{ false: "#767577", true: "#93BD68" }}
            thumbColor={setupProxy ? "#93BD68" : "#93BD68"}
          />
          </View>
        </View>
        <View style={styles.storage}>
          <Text style={styles.storageTitle}>Account security</Text>
          <View style={styles.storageItem}>
            <Text>Security Options</Text>
            <MaterialIcons name="expand-more" size={24} color="#666" />
          </View>
          <View style={styles.storageItem}>
             <Text>Two-step verification</Text>
            <Switch
              value={twoStepVerification}
              onValueChange={setTwoStepVerification}
              trackColor={{ false: "#767577", true: "#93BD68" }}
              thumbColor={twoStepVerification ? "#93BD68" : "#93BD68"}
            />
          </View>
          <View style={styles.storageItem}>
            <Text>Add recovery email</Text>
            <MaterialIcons name="expand-more" size={24} color="#666" />
          </View>
        </View>

        <TouchableOpacity style={styles.deleteAccount}>
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>

        <SettingItem title="Invite a friend">
          <MaterialIcons name="expand-more" size={24} color="#666" />
        </SettingItem>

        <SettingItem title="Help">
          <MaterialIcons name="expand-more" size={24} color="#666" />
        </SettingItem>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scroll: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#93BD68',
    padding: 15,
    paddingTop: 45,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 130,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 20,
  },
  dropdownText: {
    color: '#666',
    marginRight: 5,
  },
  insurance: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  insuranceText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    fontWeight: 'bold',
    marginLeft: -10
  },
  insuranceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insuranceInput: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 5,
    marginRight: 5,
    borderRadius: 20,
  },
  okButton: {
    backgroundColor: '#93BD68',
    padding: 5,
    borderRadius: 20,
  },
  okButtonText: {
    color: '#fff',
  },
  storage: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  storageTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 3,
    fontWeight: 'bold',
  },
  storageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1
  },
  accountSecurity: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  accountSecurityTitle: {
    fontSize: 16,
    color: '#333',
    padding: 15,
    fontWeight: 'bold',
    paddingBottom: 0,
  },
  deleteAccount: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deleteAccountText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default SettingsScreen;