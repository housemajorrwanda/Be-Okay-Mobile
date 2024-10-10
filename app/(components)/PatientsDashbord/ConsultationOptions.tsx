import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Pressable, Dimensions } from 'react-native';

const { height } = Dimensions.get("window");

const ConsultationOptions = ({ onOptionSelected }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const consultationOptionss = [
    { shortName: "General", fullName: "General Medicine", image: require("../assets/Consultation/medicine.png") },
    { shortName: "Mental", fullName: "Mental Health", image: require("../assets/Consultation/alzeimer.png") },
    { shortName: "Fertility", fullName: "Fertility Counseling", image: require("../assets/Consultation/pregnancy-virus.png")},
    { shortName: "STD's", fullName: "STD's", image: require("../assets/Consultation/sex-problem.png") },
    { shortName: "Pediatric", fullName: "Pediatric Medicine", image: require("../assets/Consultation/pediatric-surgery.png")},
    { shortName: "Gynecology", fullName: "Gynecology", image: require("../assets/Consultation/Gynecology.png") },
    { shortName: "Chronic", fullName: "Chronic illness", image: require("../assets/Consultation/awareness.png")},
    { shortName: "Intestine", fullName: "Intestine Medicine", image: require("../assets/Consultation/intestine.png") },
  ];

  const handleOptionSelected = (option) => {
    onOptionSelected(option);
    setModalVisible(false);
  };

  return (
    <View>
      <Text style={styles.addressConsultation}>Address your Consultation</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.optionsContainer}>
        {consultationOptionss.map((option, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.optionButton}
            onPress={() => handleOptionSelected(option)}
          >
            <Text style={styles.optionText}>{option.shortName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity
        style={styles.viewAllContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.viewAllContainerText}>View All</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>

            <ScrollView>
              <View style={styles.gridContainer}>
                {consultationOptionss.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.gridItem}
                    onPress={() => handleOptionSelected(item)}
                  >
                    <View style={styles.imageLogo}>
                      <Image source={item.image} style={styles.image} />
                    </View>
                    <Text style={styles.title}>{item.fullName}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addressConsultation: {
    margin: 6,
    marginTop: 100,
    color: "black",
    fontWeight: "regular",
    marginBottom: 0,
  },
  optionsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    margin: 5
  },
  optionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  viewAllContainer: {
    alignItems: "flex-end",
  },
  viewAllContainerText: {
    paddingBottom: 10,
    marginRight: 10,
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 2,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  modalView: {
    width: "70%",
    height: height * 0.52,
    backgroundColor: "#D9D9D9",
    padding: 5,
    paddingTop: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    position: "absolute",
    right: 10,
  },
  buttonClose: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 15,
    marginTop: 5,
    padding: 10,
    paddingBottom: 0,
    paddingTop: 0,
  },
  textStyle: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    top: -10,
  },
  gridItem: {
    width: "30%",
    alignItems: "center",
    marginVertical: 10,
    gap: 5,
    marginRight: 5,
  },
  imageLogo: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#0C7751",
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    marginTop: 8,
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
    color: "#000000",
  },
});

export default ConsultationOptions;