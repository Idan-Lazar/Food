import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import ButtonGroup from '../components/ButtonGroup'
import { Button as PaperButton } from "react-native-paper";
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import TextInput from '../components/TextInput'
import {
  initialCurrentLocation,
} from "../data/restaurantData";
import { nameValidator } from '../helpers/nameValidator'
import axios from 'axios'

export default function newDonate({ navigation, route }) {
  const [selectedType, setSelectedType] = useState([]);
  const [name, setName] = useState({ value: '', error: '' })
  const [description, setDescription] = useState({ value: '', error: '' })
  const [error, setError] = useState("");

  const onSignUpPressed = async () => {
/*     const nameError = nameValidator(name.value)
    const descriptionError = nameValidator(description.value)
    if (descriptionError  || nameError) {
      setName({ ...name, error: nameError })
      setDescription({ ...description, error: emailError })
      return
    } */
    try {
      const data = {
        name: name.value,
        description: description.value,
        duration: "30 - 45 דק",
        location: {
            latitude: 32.0167,
            longitude: 34.7667
        },
        categories: selectedType,
        photo: "https://hackapp.geralnik.com/img/5718.png"
    }
    const response = await axios.post("https://hackapp.geralnik.com/truma",data)
    if(!response.data.success){
      setError(response.data.reason)
    }
    else{
      route.params.onGoBack()
      navigation.goBack()
    } 
    } catch (error) {
      setError(error)
    }
  
  }
  const onButtonPress = (value) => {
       if(selectedType.includes(value)) {
        setSelectedType((prev) => prev.filter((item)=>{
            return item != value
        }))
      }
      else{
        setSelectedType((prev)=> [...prev, value])
      }
  }
  return (
    <Background>
      <Logo />
      <BackButton goBack={navigation.goBack} />
      <Header>תרומה חדשה</Header>
      <Text style={{alignSelf: 'flex-start',fontSize: 20,fontWeight: 'bold'}}>כותרת:</Text>
      <TextInput
        label="כותרת"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <Text style={{alignSelf: 'flex-start',fontSize: 20,fontWeight: 'bold'}}>מה יש לך בשבילנו?</Text>
    <View style={{flexDirection: "row"}}>
      <PaperButton
        style={[
          styles.button,
        ]}
        onPress={() => onButtonPress(1)}
        labelStyle={styles.text}
        mode={selectedType.includes(1) ? "contained" :"outlined"}
      >
      אוכל מבושל
      </PaperButton>
      <PaperButton
        style={[
          styles.button,
        ]}
        labelStyle={styles.text}
        onPress={() => onButtonPress(2)}
        mode={selectedType.includes(2) ? "contained" :"outlined"}
      >
        כריכים 
      </PaperButton>
      <PaperButton
        style={[
          styles.button,
        ]}
        labelStyle={styles.text}
        onPress={() => onButtonPress(3)}
        mode={selectedType.includes(3) ? "contained" :"outlined"}
      >
        פירות וירקות
      </PaperButton>
    </View>
    <View style={{flexDirection: "row"}}>
      <PaperButton
        style={[
          styles.button,
        ]}
        onPress={() => onButtonPress(4)}
        labelStyle={styles.text}
        mode={selectedType.includes(4) ? "contained" :"outlined"}
      >
        חטיפים
      </PaperButton>
      <PaperButton
        style={[
          styles.button,
        ]}
        labelStyle={styles.text}
        onPress={() => onButtonPress(5)}
        mode={selectedType.includes(5) ? "contained" :"outlined"}
      >
        חטיפים
      </PaperButton>
      <PaperButton
        style={[
          styles.button,
        ]}
        labelStyle={styles.text}
        onPress={() => onButtonPress(6)}
        mode={selectedType.includes(6) ? "contained" :"outlined"}
      >
        שתייה
      </PaperButton>
    </View>
    <Text style={{alignSelf: 'flex-start',fontSize: 20,fontWeight: 'bold'}}>תיאור קצר:</Text>
    <TextInput
        label="תיאור"
        returnKeyType="done"
        value={description.value}
        onChangeText={(text) => setDescription({ value: text, error: '' })}
        error={!!description.error}
        errorText={description.error}
        maxLength={150}
        numberOfLines={4}
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 10 }}
      >
        שלח
      </Button>
      <Text className={styles.description}>{error}</Text>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
    height: 60,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  button: {
    width: "33%",
    height: 90,

    marginVertical: 10,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  text: {
    fontWeight: "bold",
    width: "100%",
    fontSize: 15,
    lineHeight: 26,
    textAlign: "center",
  },
  description: {
    fontSize: 13,
    paddingTop: 8,
    color: 'red'
  },
})

