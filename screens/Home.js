import React, { useState,useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Platform,
  Text,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Divider } from '@ui-kitten/components';

import {
  restaurantData,
  initialCurrentLocation,
  categoryData,
} from "../data/restaurantData";
import * as Location from "expo-location";
import axios from 'axios'

import { icons, SIZES, COLORS, FONTS } from "../constants";

const Home = ({ navigation, route }) => {
  const { user,newRestaurants } = route.params;

  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(
    initialCurrentLocation
  );

  /*  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setIsLoading(false)
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      setIsLoading(false)
    })();
  }, []); */
  const refresh = async ()=>{
    try {
      const response = await axios.get("https://hackapp.geralnik.com/truma");
      setRestaurants(response.data.result)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }
     useEffect(() => {
      refresh()
  }, []);

  function onSelectCategory(category) {
    let restaurantsList = restaurantData.filter((a) =>
      a.categories.includes(category.id)
    );
    setRestaurants(restaurantsList);
    setSelectedCategory(category);
  }

  function getCategoryNameById(id) {
    let category = categories.filter((a) => a.id == id);
    if (category.length > 0) {
      return category[0].name;
    }
    return "";
  }

  function renderHeader() {
    return (
      <>
      <View
        style={{
          flexDirection: "row",
          height: 40,
          marginTop: Platform.OS == "android" ? 35 : 0,
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            height: "100%",
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: "70%",
              height: "90%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>
              לתת
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            height: "100%",
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
          onPress={()=> navigation.navigate('newDonate',{
            onGoBack: () => refresh()
          })}
        >
          <Image
            source={icons.plus}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        
      </View>
      <Divider/>
      </>
    );
  }

  function renderMainCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            marginLeft: SIZES.padding,
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id === item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}
        >
          <View
            style={{
              backgroundColor:
                selectedCategory?.id === item.id
                  ? COLORS.white
                  : COLORS.lightGray,
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                height: 30,
                width: 30,
              }}
            />
          </View>
          <Text
            style={{
              color:
                selectedCategory?.id === item.id ? COLORS.white : COLORS.black,
              marginTop: SIZES.padding,
              ...FONTS.body5,
              fontWeight: "bold",
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <Text style={{textAlign: "left",fontWeight: "bold",fontSize:25,margin: 10}}>בוקר טוב , {user.name || "עידן"}</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />
      </View>
    );
  }

  function renderRestaurantList() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ padding: SIZES.padding * 2 }}
          onPress={() =>
            navigation.navigate("OrderDelivery", {
              restaurant: item,
              currentLocation,
            })
          }
        >
          <View>
            <Image
              source={{uri: item.photo}}
              resizeMode="cover"
              style={{
                width: "100%",
                height: 200,
                borderRadius: SIZES.radius,
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                height: 50,
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.white,
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                alignItems: "center",
                justifyContent: "center",
                ...styles.shadow,
              }}
            >
              <Text style={{ ...FONTS.h4 }}>{item.duration || "30 - 45 דק"}</Text>
            </View>
          </View>

          {/* Restaurant Info */}
          <Text style={{ ...FONTS.body2,textAlign: 'left',marginTop:10,marginLeft: 10,fontSize: 25 }}>{item.name}</Text>
          <Text style={{ ...FONTS.body5,textAlign: 'left',marginTop:0,marginLeft: 10,fontSize: 15,color: 'gray'}}>{item.description}</Text>
          <View
            style={{
              marginTop: SIZES.padding,
              marginRight: 10
            }}
          >
           <Text>{new Date().toLocaleTimeString()}</Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      !isLoading ?
      <FlatList
        data={restaurants}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
          direction: "rtl",
        }}
      /> : <Text>Loading...</Text>
    );
  }

  return (
    /* !isLoading && */
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderRestaurantList()}
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
    direction: "rtl",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
export default Home;
