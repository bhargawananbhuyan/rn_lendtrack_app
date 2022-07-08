import AsyncStorage from "@react-native-async-storage/async-storage"
import { StackActions, useNavigation } from "@react-navigation/native"
import React, { useEffect, useReducer, useState } from "react"
import {
  BackHandler,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { authService, colors } from "../utils/constants"

let initialState = {
  loading: false,
  user: {},
  error: "",
}

const userReducer = (state: any, action: any) => {
  switch (action.type) {
    case "GET_USER_REQUEST":
      return {
        ...state,
        loading: true,
      }

    case "GET_USER_SUCCESS":
      return {
        loading: false,
        user: action.payload,
        error: "",
      }

    case "GET_USER_ERROR":
      return {
        loading: false,
        user: {},
        error: action.payload,
      }

    default:
      return state
  }
}

const Homepage = () => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  const navigation = useNavigation()

  useEffect(() => {
    ;(async () => {
      dispatch({ type: "GET_USER_REQUEST" })
      const auth_token = await AsyncStorage.getItem("@token")
      const res = await authService.get("/user", {
        headers: {
          auth_token: `Bearer ${auth_token}`,
        },
      })
      dispatch({ type: "GET_USER_SUCCESS", payload: res.data?.data })
    })()
  }, [])

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp()
      return true
    })

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () => true)
  }, [])

  return (
    <SafeAreaView style={styles.root}>
      {state.loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "#000", fontSize: 16 }}>loading...</Text>
        </View>
      ) : (
        <>
          <Pressable
            style={styles.avatarWrapper}
            onPress={async () => {
              await AsyncStorage.removeItem("@token")
              navigation.dispatch(StackActions.replace("landing_screen"))
            }}
          >
            <Text style={{ color: "#fff" }}>
              {state.user.email?.slice(0, 12)}...
            </Text>
            <View style={styles.avatar}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {state.user.fullName?.split(" ")[0][0]}
                {state.user.fullName?.split(" ")[1][0]}
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.addButton}
            android_ripple={{ color: "#fff" }}
          >
            <Icon name="add" color="#fff" size={27} />
          </Pressable>
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fbfbfb",
    flex: 1,
  },
  avatarWrapper: {
    position: "absolute",
    top: 24,
    right: 16,
    backgroundColor: colors.primary,
    padding: 8,
    paddingLeft: 16,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "rgba(255,255,255,.25)",
    padding: 8,
    borderRadius: 100,
    marginLeft: 8,
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 16,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
  },
})

export default Homepage
