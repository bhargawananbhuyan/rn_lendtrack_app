import { StackActions, useNavigation } from "@react-navigation/native"
import React, { useEffect } from "react"
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import SubmitButton from "../components/SubmitButton"
import { colors } from "../utils/constants"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Landing = () => {
  const navigation = useNavigation()

  useEffect(() => {
    ;(async () => {
      if (await AsyncStorage.getItem("@token")) {
        navigation.dispatch(StackActions.replace("homepage_screen"))
      }
    })()
  }, [])

  return (
    <SafeAreaView style={styles.root}>
      <View>
        <View style={styles.title}>
          <Text style={styles.titleText}>lend</Text>
          <Text style={[styles.titleText, styles.titleSub]}>track.</Text>
        </View>

        <Text style={styles.subtitle}>
          keep track of all your lendings and borrowings.
        </Text>
      </View>
      <View>
        <SubmitButton
          outlined
          text="Create new account"
          onPress={() => navigation.navigate("register_screen" as any)}
        />
        <View style={{ marginTop: 12 }}>
          <SubmitButton
            text="Sign in"
            onPress={() => navigation.navigate("signin_screen" as any)}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fbfbfb",
    flex: 1,
    padding: 20,
    justifyContent: "space-evenly",
  },
  title: {
    flexDirection: "row",
  },
  titleText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#000",
  },
  titleSub: {
    color: colors.primary,
  },
  subtitle: {
    fontSize: 24,
    color: "#000",
    fontWeight: "300",
    lineHeight: 36,
    marginTop: 21,
  },
})

export default Landing
