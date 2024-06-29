import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Pressable,
  Dimensions,
  TextInput
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CountryCodeDropdownPicker from "react-native-dropdown-country-picker";
import { useNavigation } from "@react-navigation/native";
import {NavigationProps} from "../../(app)/types"

const { height } = Dimensions.get("window");
const ConsultationResult = () => {
  const navigation = useNavigation<NavigationProps>()

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Mobile Money");
  const [selected, setSelected] = React.useState("+250");
  const [country, setCountry] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const navigateToBack = () => {
    navigation.navigate("Consultation");
  };
  const navigatePaymentResult = () => {
    navigation.navigate("paymentResult");
  };

  const recentDoctors = [
    { name: 'Dr. Jules', image: require('../assets/checkProfile.png') },
    { name: 'Dr. James', image: require('../assets/checkProfile.png') },
    { name: 'Dr. Anne', image: require('../assets/checkProfile.png') },
    { name: 'Dr. Jeanne', image: require('../assets/checkProfile.png') },
    { name: 'Dr. Jeff', image: require('../assets/checkProfile.png') },
    { name: 'Dr. Jules', image: require('../assets/checkProfile.png') },
    { name: 'Dr. James', image: require('../assets/checkProfile.png') },
    { name: 'Dr. Anne', image: require('../assets/checkProfile.png') },
    { name: 'Dr. Jeanne', image: require('../assets/checkProfile.png') },
    { name: 'Dr. Jeff', image: require('../assets/checkProfile.png') },
  ];
  
  const renderPaymentTabContent = () => {
    switch (selectedTab) {
      case "Mobile Money":
        return (
          <View>
            <Text style={styles.savedText}>Saved Numbers:</Text>
            <View style={styles.numberContainer}>
              <Image
                source={require("../assets/MTN.png")}
                style={styles.MTNIMAGE}
              />
              <View>
                <Text style={styles.mtnText}>MTN</Text>
                <Text style={styles.phoneText}>+250 78. ..00</Text>
              </View>
            </View>
            <View style={styles.numberContainer}>
              <Image
                source={require("../assets/AIRTEL.png")}
                style={styles.MTNIMAGE}
              />
              <View>
                <Text style={styles.mtnText}>Airtel</Text>
                <Text style={styles.phoneText}>+250 73. ..00</Text>
              </View>
            </View>
            <Text style={styles.NewPaymentMethod}>New Payment Method:</Text>
            <CountryCodeDropdownPicker
              selected={selected}
              setSelected={setSelected}
              setCountryDetails={setCountry}
              phone={phone}
              setPhone={setPhone}
              countryCodeTextStyles={{ fontSize: 13 }}
              dropdownStyles={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                overflow: "hidden",
              }}
            />

            <View style={styles.moneyView}>
              <Text style={styles.price1}>Price</Text>
              <Text style={styles.price}>20,000 RWF</Text>
            </View>
            <TouchableOpacity style={styles.payButton} onPress={navigatePaymentResult}>
            <Text style={styles.payButtonText}>Pay</Text>
          </TouchableOpacity>
          </View>
        );
        case "Debit/Credit Card":
          return (
            <View>

              <Text style={styles.savedText}>Saved Cards:</Text>
              <View  style={styles.debitCard}>
              <Text style={styles.debitCardText}>Debit Card</Text>

              </View>
              <TextInput
                style={styles.inputField}
                placeholder="xxxx xxxx xxxx 0101"
                placeholderTextColor="#A9A9A9"
                keyboardType="numeric"
              />
              <View style={styles.debitCard}>
              <Image source={require("../assets/debitCard.png")}/>
              </View>
              <Text style={styles.expiryText}>Expires </Text>
              <Text style={styles.expiryText}>END 2106</Text>
              <View style={styles.moneyView}>
              <Text style={styles.price1}>Price</Text>
              <Text style={styles.price}>20,000 RWF</Text>
            </View>
              <TouchableOpacity style={styles.payButton}>
                <Text style={styles.payButtonText}>Pay</Text>
              </TouchableOpacity>
            </View>
          );
        
      case "PayPal":
        return (
          <View>
            <Text style={styles.savedText}>Saved Pay:</Text>
            <Text>Login to your PayPal account to proceed.</Text>
            <Text>Price: 20,000 RWF</Text>
            <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payButtonText}>Pay</Text>
          </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToBack} style={styles.backButton}>
          <AntDesign name="arrowleft" style={styles.backButtonText} />
          <Text style={styles.headerIllness}>Consultation Result</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollContainer}>
        <View style={styles.yourGoingContainer}>
          <Text style={styles.yourGoingText}>
            Your going to take consultation with AI
          </Text>
        </View>
        <View style={styles.drContainer}>
          <Text style={styles.drtext}>Dr. Emile Results</Text>
        </View>
        <View style={styles.ImageLogo}>
          <View style={styles.ImageLogoContainer}>
            <Image
              source={require("../assets/carbonreminder-medical.png")}
            />
          </View>
        </View>
        <View style={styles.containers}>
          <View style={styles.resultTextcontainer}>
            <Text style={styles.resultText}>
              Your results are now available with recommended medication.{" "}
              <Text style={styles.highlightedText}>
                Please pay to access medical record.
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.containerpayb}>
          <TouchableOpacity
            style={styles.paymentContainer}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.Proceed}>Proceed with Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <BottomTabs /> */}

      {/* Payment Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
        <View style={styles.modalView}>
        <Pressable
            style={ styles.buttonClose}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle}>X</Text>
          </Pressable>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={
                selectedTab === "Mobile Money" ? styles.activeTab : styles.tab
              }
              onPress={() => setSelectedTab("Mobile Money")}
            >
              <Text style={styles.tabText}>Mobile Money</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                selectedTab === "Debit/Credit Card"
                  ? styles.activeTab
                  : styles.tab
              }
              onPress={() => setSelectedTab("Debit/Credit Card")}
            >
              <Text style={styles.tabText}>Debit/Credit Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={selectedTab === "PayPal" ? styles.activeTab : styles.tab}
              onPress={() => setSelectedTab("PayPal")}
            >
              <Text style={styles.tabText}>PayPal</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabContent}>{renderPaymentTabContent()}</View>
        </View>
        </View>

      </Modal>
    </View>
  );
};

export default ConsultationResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 140,
    marginTop: 80,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#93BD68",
    padding: 15,
    paddingBottom: 10,
    paddingTop: 30,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1,
  },
  headerIllness: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 2,
  },
  backButtonText: {
    fontSize: 20,
    color: "white",
  },
  yourGoingContainer: {
    backgroundColor: "#EEFFDC",
    padding: 10,
    margin: 10,
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 10,
  },
  yourGoingText: {
    width: "40%",
    fontSize: 14,
    fontWeight: "medium",
  },
  drContainer: {
    alignItems: "center",
  },
  drtext: {
    fontWeight: "semibold",
    fontSize: 20,
    marginBottom: 20,
  },
  ImageLogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  ImageLogoContainer: {
    backgroundColor: "#D9F4BD",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  resultText: {
    color: "#838181",
    fontSize: 14,
    fontWeight: "regular",
    textAlign: "center",
  },
  resultTextcontainer: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: "70%",
  },
  highlightedText: {
    color: "black",
    fontSize: 14,
    fontWeight: "regular",
    lineHeight: 20,
  },
  containers: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  paymentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#93BD68",
    width: "85%",
    padding: 10,
    borderRadius: 20,
  },
  containerpayb: {
    alignItems: "center",
    marginTop: 20,
  },
  Proceed: {
    color: "white",
    fontWeight: "bold",
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    height: height * 0.5, 
    backgroundColor: "white",
    borderRadius: 20,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    padding: 35,
    paddingTop:5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  tab: {
    borderRadius: 10,
  },
  activeTab: {
    borderWidth: 1,
    borderColor: "blacck",
    borderLeftColor: "white",
    borderRightColor: "white",
    borderTopColor: "white",
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom:3
  },
  tabText: {
    fontWeight: "medium",
    fontSize: 12,
    color: "#676767",
  },
  tabContent: {
    width: "100%",
    paddingLeft: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    display:"flex",
    justifyContent:"flex-end",
    alignItems:"flex-end",
    marginBottom:15,
    marginTop:5
  },
  textStyle: {
    fontWeight: "bold",
    color:"black",
    fontSize:20
  },
  savedText: {
    fontSize: 13,
    fontWeight: "regular",
    color: "#7A7A7A",
    marginBottom: 5,
  },
  numberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  MTNIMAGE: {
    width: 35,
    height: 25,
    objectFit: "cover",
  },
  phoneText: {
    fontSize: 10,
    color: "#929090",
    fontWeight: "semibold",
  },
  mtnText: {
    fontWeight: "bold",
    fontSize: 11,
  },
  NewPaymentMethod: {
    color: "#525050",
    fontSize: 12,
    marginBottom: 10,
    marginTop: 5,
  },
  moneyView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  price: {
    fontWeight: "bold",
    fontSize: 20,
  },
  price1: {
    fontSize: 18,
  },
  payButton: {
    backgroundColor: "#93BD68",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  inputField: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  expiryText: {
    fontSize: 12,
    color: "#7A7A7A",
    marginBottom: 5,
    alignItems:"center",
    textAlign:"center",
  },
  debitCard:
  {
    alignItems:"flex-end",
    // backgroundColor:"red",
    justifyContent:"flex-end"

  },
  debitCardText:{
    fontWeight:"medium",
    fontSize:13
  }
  
});
