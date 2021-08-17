import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";

export default function ButtonGroup({ selectedType, setSelectedType, mode, style, ...props }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <PaperButton
        style={[
          styles.button,
          style,
        ]}
        onPress={() => setSelectedType("Torem")}
        labelStyle={styles.text}
        mode={selectedType === "Torem" ? "contained" :mode}
        {...props}
      >
        תורם
      </PaperButton>
      <PaperButton
        style={[
          styles.button,
          style,
        ]}
        labelStyle={styles.text}
        onPress={() => setSelectedType("mediator")}
        mode={selectedType === "mediator" ? "contained" :mode}
        {...props}
      >
        מתווך
      </PaperButton>
      <PaperButton
        style={[
          styles.button,
          style,
        ]}
        labelStyle={styles.text}
        onPress={() => setSelectedType("both")}
        mode={selectedType === "both" ? "contained" :mode}
        {...props}
      >
        שניהם
      </PaperButton>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "33%",
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});
