import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Onboard = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const router = useRouter();

  const screens = [
    {
      backgroundColor: '#f3f4f6',
      imageSource: require('../assets/amico.png'),
      title: 'Track your disease',
      subtitle: 'Keep a detailed record of your symptoms and monitor the progression of your condition over time. With our easy-to-use tracking system, you can gain insights into your health and make informed decisions about your care.',
    },
    {
      backgroundColor: '#f3f4f6',
      imageSource: require('../assets/cuate.png'),
      title: 'Schedule your appointment',
      subtitle: 'Easily schedule your appointments with our intuitive system. Choose a convenient time, get reminders, and manage your health appointments effortlessly to ensure you never miss a critical consultation.',
    },
  ];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      router.push('../PatientsDashbord/WelcomePage/SignupMix');
    }
  };

  const handleSkip = () => {
    router.push('../PatientsDashbord/WelcomePage/SignupMix');
  };

  const handleScroll = (event) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentScreen(pageIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContainer}
      >
        {screens.map((screen, index) => (
          <View key={index} style={[styles.screenContainer, { backgroundColor: screen.backgroundColor }]}>
            <Image source={screen.imageSource} style={styles.image} />
            <Text style={styles.title}>{screen.title}</Text>
            <Text style={styles.subtitle}>{screen.subtitle}</Text>
            <View style={styles.paginationContainer}>
              {screens.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setCurrentScreen(index)}
                  style={[styles.dot, currentScreen === index && styles.activeDot]}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        {currentScreen === 0 && (
          <TouchableOpacity style={styles.buttonSkip} onPress={handleSkip}>
            <Text style={styles.buttonTextSkip}>Skip and Get Started</Text>
          </TouchableOpacity>
        )}
        {currentScreen === 1 && (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FFFFFF"
  },
  scrollViewContainer: {
    flexDirection: 'row',
  },
  screenContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#93BD68",
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    color: "#9E9E9E",
    lineHeight: 20,
    letterSpacing: 2,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#888',
    margin: 5,
  },
  activeDot: {
    width: 20,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#93BD68',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#93BD68',
    padding: 10,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonSkip: {
    padding: 10,
    borderRadius: 5,
    width: 'auto',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextSkip: {
    color: '#494949',
    fontSize: 14,
  },
});

export default Onboard;
