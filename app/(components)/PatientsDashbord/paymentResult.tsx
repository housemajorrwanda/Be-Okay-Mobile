import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const PaymentResult = () => {
  return (
    <View style={styles.container}>
      {/* Header with back button and title */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Consultation Results</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Doctor and Illness Information */}
        <View style={styles.illnessContainer}>
          <Text style={styles.doctorTitle}>Dr. Emile Results</Text>
          <View style={styles.illnessDetailsContainer}>
            <Text style={styles.illnessTitle}>Illness Details</Text>
            <Text style={styles.illnessName}>Fabry Disease</Text>
            <Text style={styles.illnessDescription}>
              Fabry disease is a rare genetic disease that is passed down
              through your family. It affects organs all around your body,
              including your heart, brain and kidneys, and can cause them
              to get less blood than they need. Over time, this can cause
              chronic kidney disease or kidney failure.
            </Text>
          </View>

          {/* Recommended Medication */}
          <View style={styles.medicationContainer}>
            <Text style={styles.recommendationTitle}>Recommended Medication</Text>
            <View style={styles.medicationList}>
              {['ACE inhibitors', 'Ibuprofen', 'Naproxen'].map((medication, index) => (
                <View key={index} style={styles.medicationPill}>
                  <Text style={styles.medicationText}>{medication}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Recommended Doctors */}
        <View style={styles.recommendedDoctorsContainer}>
          <View style={styles.recommendationHeader}>
            <Text style={styles.recommendationTitle}>Recommended Doctors</Text>
            <Text style={styles.consultationReminder}>consult a doctor at least in 3 days</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>see more</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.doctorsScroll}>
            {['Dr. Jules', 'Dr. James', 'Dr. Anne', 'Dr. Jeanne', 'Dr. J'].map((doctor, index) => (
              <View key={index} style={styles.doctorCircle}>
                <Image source={require('../assets/checkProfile.png')} style={styles.doctorImage} />
                <Text style={styles.doctorName}>{doctor}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Pharmacy Information */}
          <View style={styles.pharmacyContainer}>
         {Array(4).fill(null).map((_, index) => (
    <View key={index} style={styles.pharmacyCard}>
      <View style={styles.pharmacyInfo}>
        <Text style={styles.pharmacyName}>VIVA Pharmacy</Text>
        <Text style={styles.pharmacyDistance}>500 m</Text>
        <Text style={styles.pharmacyStatus}>Open</Text>
        <Text style={styles.pharmacyDistance}>1.5 Km</Text>
        <Text style={styles.pharmacyOpening}>Open till 20H</Text>
      </View>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book appointment</Text>
      </TouchableOpacity>
    </View>
  ))}
</View>

        </View>
      </ScrollView>

      {/* Bottom Tabs (Dummy for placement) */}
      <View style={styles.bottomTabs}>
        {/* Add your tab icons here */}
        <Text>Home</Text>
        <Text>Consult</Text>
        <Text>Pharmacy</Text>
        <Text>Emergency</Text>
      </View>
    </View>
  );
};

export default PaymentResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#93BD68',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
  },
  illnessContainer: {
    backgroundColor: '#e0f5cc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  doctorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  illnessDetailsContainer: {
    marginBottom: 15,
  },
  illnessTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  illnessName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 5,
  },
  illnessDescription: {
    fontSize: 12,
    color: '#777',
    lineHeight: 18,
  },
  medicationContainer: {
    marginBottom: 15,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  medicationList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  medicationPill: {
    backgroundColor: '#d5f0bc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 10,
    marginBottom: 5,
  },
  medicationText: {
    fontSize: 12,
    color: '#333',
  },
  recommendedDoctorsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  consultationReminder: {
    fontSize: 12,
    color: '#777',
  },
  seeMoreText: {
    fontSize: 12,
    color: '#1e90ff',
  },
  doctorsScroll: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  doctorCircle: {
    alignItems: 'center',
    marginRight: 10,
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#93BD68',
  },
  doctorName: {
    fontSize: 10,
    color: '#333',
    marginTop: 5,
  },
  pharmacyContainer: {
    marginTop: 10,
  },
  pharmacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pharmacyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pharmacyName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  pharmacyDistance: {
    fontSize: 10,
    color: '#999',
    marginRight: 5,
  },
  pharmacyStatus: {
    fontSize: 10,
    color: '#28a745',
    marginRight: 5,
  },
  pharmacyOpening: {
    fontSize: 10,
    color: '#999',
  },
  bookButton: {
    backgroundColor: '#93BD68',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 12,
  },
  bottomTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
