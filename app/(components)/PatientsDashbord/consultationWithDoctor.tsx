import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import BottomTabs from '../ReusableComponent/ BottomTabs';
const consultationWithDoctor = () => {
  const router = useRouter();

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

  const handleDoctorSelect = () => {
    router.push("../PatientsDashbord/PatientBookDoctorAppointment")
    // console.log(`Selected: ${doctorName}`);
  };

  const navigateToBack=()=>{
    router.push("")
  }
  return (
    <View style={styles.container}>
      <View>
      <TouchableOpacity onPress={navigateToBack} style={styles.backContainer}>
            <AntDesign name="arrowleft" style={styles.backButtonTextarrow} />
            <Text style={styles.headerIllness}>Checkup Page</Text>
          </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>You are going to take real-time with our doctors</Text>
        <Text style={styles.subHeader}>We recommend doctors based on previous illness description you provided</Text>

        <Text style={styles.sectionTitle}>Recent Doctors</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentDoctorsContainer}>
          {recentDoctors.map((doctor, index) => (
            <View key={index} style={styles.doctorCard}>
              <View style={styles.doctorImageContainer}>
              <Image source={doctor.image} style={styles.doctorImage} />
              </View>
              <Text style={styles.doctorName}>{doctor.name}</Text>
            </View>
          ))}
        </ScrollView> 

        <Text style={styles.sectionTitle}>Available Doctor</Text>
          <TouchableOpacity style={styles.availableDoctorCard}  onPress={handleDoctorSelect}>
           <Image source={require("../assets/checkProfile.png")} style={styles.doctorImage} />
           <View>
           <Text style={styles.availableDoctorName}>Dr. Frank</Text>
           <Text style={styles.availableDoctorDescription}>Lorem ipsum dolor sit amet consectetur.</Text>

           </View>
           <View>
            <Text style={styles.availableText}> 
                Available
            </Text>
           <Text style={styles.availableDoctorAvailability}>12h:30 - 17h:30</Text>

           </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.availableDoctorCard}>
           <Image source={require("../assets/checkProfile.png")} style={styles.doctorImage} />
           <View>
           <Text style={styles.availableDoctorName}>Dr. Frank</Text>
           <Text style={styles.availableDoctorDescription}>Lorem ipsum dolor sit amet consectetur.</Text>

           </View>
           <View>
            <Text style={styles.availableText}> 
                Available
            </Text>
           <Text style={styles.availableDoctorAvailability}>12h:30 - 17h:30</Text>

           </View>
          </TouchableOpacity>
      </ScrollView>
      <View>
        <BottomTabs activeTab={undefined} setActiveTab={undefined}/>
      </View>
    </View>
  );
};

export default consultationWithDoctor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 100,
    padding: 16,

  },
  header: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    width:"60%",
    fontWeight:"bold",
    lineHeight:20

  },
  subHeader: {
    fontSize: 14,
    color: '#ffff',
    marginBottom: 30,
    backgroundColor:"#21C074",
    padding:10,
    borderRadius:5,

  },
  sectionTitle: {
    fontSize:14,
    fontWeight: 'regular',
    marginVertical: 10,
    color:"#5A5959"
  },
  recentDoctorsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  doctorCard: {
    alignItems: 'center',
    marginRight: 15,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  doctorName: {
    marginTop: 5,
    fontSize: 10,
    color: '#979797',
    fontWeight:"bold"
  },
  availableDoctorCard: {
    borderRadius: 10,
    marginBottom: 10,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingBottom:10,
    paddingTop:10

  },
  availableDoctorName: {
    fontSize: 14,
    fontWeight: 'medium',
    marginBottom:3
    
  },
  availableDoctorAvailability: {
    fontSize: 10,
    color: '#777',
    fontWeight:"regular"
  },
  availableDoctorDescription: {
    fontSize: 12,
    color: '#777',
    width:"98%"
  },
  backButton: {
    backgroundColor: '#93BD68',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  backButtonTextarrow:{
fontSize:20,
color:"white"
  },
  doctorImageContainer:{
    borderWidth:2,
    borderRadius:35,
    padding:2,
    borderColor:"#93BD68"
  },
  backContainer:{
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    width:"100%",
    backgroundColor:"#93BD68",
    padding:25,
    gap:100
  },
  headerIllness:{
    color:"white",
    fontSize:16
  },
  availableText:{
    fontSize:12,
    fontWeight:"medium",
    marginBottom:3,
  }
});
