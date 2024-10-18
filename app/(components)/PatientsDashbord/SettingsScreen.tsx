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

const SettingsScreen = () => {
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [trackLocation, setTrackLocation] = useState(false);
  const [saveDocuments, setSaveDocuments] = useState(false);
  const [saveDataForCalls, setSaveDataForCalls] = useState(false);
  const [twoStepVerification, setTwoStepVerification] = useState(false);

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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <SettingItem title="Incognito Mode">
        <Switch
          value={incognitoMode}
          onValueChange={setIncognitoMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={incognitoMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </SettingItem>

      <SettingItem title="Allow google to track location">
        <Switch
          value={trackLocation}
          onValueChange={setTrackLocation}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={trackLocation ? "#f5dd4b" : "#f4f3f4"}
        />
      </SettingItem>

      <SettingItem title="Change Location">
        <Dropdown placeholder="Select Location" />
      </SettingItem>

      <SettingItem title="Change Language">
        <Dropdown placeholder="Choose Language" />
      </SettingItem>

      <SettingItem title="Insurance">
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
      </SettingItem>

      <SettingItem title="Save Documents">
        <Switch
          value={saveDocuments}
          onValueChange={setSaveDocuments}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={saveDocuments ? "#f5dd4b" : "#f4f3f4"}
        />
      </SettingItem>

      <SettingItem title="Clear Data">
        <Dropdown placeholder="Monthly" />
      </SettingItem>

      <SettingItem title="Storage & Cellular Data">
        <SettingItem title="Save data for calls">
          <Switch
            value={saveDataForCalls}
            onValueChange={setSaveDataForCalls}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={saveDataForCalls ? "#f5dd4b" : "#f4f3f4"}
          />
        </SettingItem>
        <SettingItem title="Media download">
          <Dropdown placeholder="Wi-Fi & Cellular" />
        </SettingItem>
        <SettingItem title="Media Quality">
          <Dropdown placeholder="Standard" />
        </SettingItem>
      </SettingItem>

      <SettingItem title="Set up Proxy">
        <Switch
          value={false}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={"#f4f3f4"}
        />
      </SettingItem>

      <SettingItem title="Account security">
        <SettingItem title="Security Options">
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </SettingItem>
        <SettingItem title="Two-step verification">
          <Switch
            value={twoStepVerification}
            onValueChange={setTwoStepVerification}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={twoStepVerification ? "#f5dd4b" : "#f4f3f4"}
          />
        </SettingItem>
        <SettingItem title="Add recovery email">
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        </SettingItem>
      </SettingItem>

      <TouchableOpacity style={styles.deleteAccount}>
        <Text style={styles.deleteAccountText}>Delete Account</Text>
      </TouchableOpacity>

      <SettingItem title="Invite a friend">
        <MaterialIcons name="chevron-right" size={24} color="#666" />
      </SettingItem>

      <SettingItem title="Help">
        <MaterialIcons name="chevron-right" size={24} color="#666" />
      </SettingItem>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    marginLeft: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 5,
  },
  dropdownText: {
    color: '#666',
    marginRight: 5,
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
    borderRadius: 5,
  },
  okButton: {
    backgroundColor: '#93BD68',
    padding: 5,
    borderRadius: 5,
  },
  okButtonText: {
    color: '#fff',
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