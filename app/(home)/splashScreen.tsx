import { View, Text,Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import React from 'react'

const splashScreen = () => {
  const router =useRouter()

  const navigateToPantientDashbord=()=>{
    router.push('(components)/PatientsDashbord/PatientsDashbord')
  }
  return (
    <View>
      <Text>splashScreen</Text>
      <View>
        <Pressable onPress={navigateToPantientDashbord}>
          <Text>navigate To Pantient Dashbord</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default splashScreen