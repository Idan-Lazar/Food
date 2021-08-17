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

import { icons, SIZES, COLORS, FONTS } from "../constants";

const DonateHome = ({ navigation }) => {
  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [restaurants, setRestaurants] = useState(restaurantData);
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
              לתתתתת
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
        >
          <Image
            source={icons.location}
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
              source={item.photo}
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
              <Text style={{ ...FONTS.h4 }}>{item.duration}</Text>
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
      <FlatList
        data={restaurants}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
          direction: "rtl",
        }}
      />
    );
  }

  return (
    /* !isLoading && */
    <SafeAreaView style={styles.container}>
      {renderHeader()}
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
export default DonateHome;
