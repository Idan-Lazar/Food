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


export default function Places({ navigation, route }) {
  const { user } = route.params;
  const [selectedType, setSelectedType] = useState([]);

  const onSignUpPressed = () => {
    navigation.navigate('Home', {user: user});
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
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>בחר מקומות שעליהם תקבל התראות</Header>
      <View style={{flexDirection: "row"}}>
      <PaperButton
        style={[
          styles.button,
        ]}
        onPress={() => onButtonPress("חיפה והסביבה")}
        labelStyle={styles.text}
        mode={selectedType.includes("חיפה והסביבה") ? "contained" :"outlined"}
      >
          חיפה והסביבה
      </PaperButton>
      <PaperButton
        style={[
          styles.button,
        ]}
        labelStyle={styles.text}
        onPress={() => onButtonPress("אזור הקריות")}
        mode={selectedType.includes("אזור הקריות") ? "contained" :"outlined"}
      >
        אזור הקריות
      </PaperButton>
      <PaperButton
        style={[
          styles.button,
        ]}
        labelStyle={styles.text}
        onPress={() => onButtonPress("תל אביב")}
        mode={selectedType.includes("תל אביב") ? "contained" :"outlined"}
      >
        תל אביב
      </PaperButton>
    </View>
    <View style={{flexDirection: "row"}}>
      <PaperButton
        style={[
          styles.button,
        ]}
        onPress={() => onButtonPress("רמת גן")}
        labelStyle={styles.text}
        mode={selectedType.includes("רמת גן") ? "contained" :"outlined"}
      >
        רמת גן
      </PaperButton>
      <PaperButton
        style={[
          styles.button,
        ]}
        labelStyle={styles.text}
        onPress={() => onButtonPress("ירושלים")}
        mode={selectedType.includes("ירושלים") ? "contained" :"outlined"}
      >
        ירושלים 
      </PaperButton>
      <PaperButton
        style={[
          styles.button,
        ]}
        labelStyle={styles.text}
        onPress={() => onButtonPress("באר שבע")}
        mode={selectedType.includes("באר שבע") ? "contained" :"outlined"}
      >
        באר שבע
      </PaperButton>
    </View>
    <View style={{flexDirection: "row"}}>
      <PaperButton
        style={[
          styles.button,
        ]}
        onPress={() => onButtonPress("שדרות ונתיבות")}
        labelStyle={styles.text}
        mode={selectedType.includes("שדרות ונתיבות") ? "contained" :"outlined"}
      >
        שדרות ונתיבות
      </PaperButton>
      <PaperButton
        style={[
          styles.button,
        ]}
        labelStyle={styles.text}
        onPress={() => onButtonPress("מצפה רמון")}
        mode={selectedType.includes("מצפה רמון") ? "contained" :"outlined"}
      >
        מצפה רמון
      </PaperButton>
      <PaperButton
        style={[
          styles.button,
        ]}
        labelStyle={styles.text}
        onPress={() => onButtonPress("אילת והערבה")}
        mode={selectedType.includes("אילת והערבה") ? "contained" :"outlined"}
      >
        אילת והערבה
      </PaperButton>
    </View>
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        סיום
      </Button>
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
})

