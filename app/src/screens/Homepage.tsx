import AsyncStorage from "@react-native-async-storage/async-storage"
import { StackActions, useNavigation } from "@react-navigation/native"
import React, { useContext, useEffect, useReducer } from "react"
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Transaction from "../components/Transaction"
import { authService, colors, transactionService } from "../utils/constants"
import { calculateTaxes } from "../utils/taxUtils"
import { TransactionsContext } from "../utils/TransactionsProvider"

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

  const { transactions, addTransaction, getAllTransactions }: any =
    useContext(TransactionsContext)

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
    ;(async () => {
      try {
        const res = await transactionService.get("/", {
          headers: {
            auth_token: "Bearer " + (await AsyncStorage.getItem("@token")),
          },
        })
        getAllTransactions(res.data?.data)
      } catch (error) {
        console.warn(error)
      }
    })()
  }, [])

  const handleFab = () => {
    navigation.navigate("add_txn_screen" as never)
  }

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

          <ScrollView style={{ paddingTop: "25%", paddingHorizontal: 20 }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  backgroundColor: "#f3f3f3",
                  flexDirection: "row",
                  paddingHorizontal: 21,
                  paddingVertical: 21,
                  borderRadius: 5,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "900", color: "#000" }}
                  >
                    ${calculateTaxes(transactions).lend}
                  </Text>
                  <Text
                    style={{ color: "#22c55e", fontSize: 12, marginTop: 3.5 }}
                  >
                    Lend
                  </Text>
                </View>
                <View
                  style={{
                    width: 1,
                    height: "100%",
                    backgroundColor: "#d3d3d3",
                    marginHorizontal: 16,
                  }}
                />
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "900", color: "#000" }}
                  >
                    ${calculateTaxes(transactions).borrowed}
                  </Text>
                  <Text
                    style={{ color: "#ef4444", fontSize: 12, marginTop: 3.5 }}
                  >
                    Borrowed
                  </Text>
                </View>
              </View>
            </View>

            {transactions?.length > 0 &&
              transactions.map((t: any) => (
                <Transaction
                  key={t._id}
                  secondParty={t.secondParty}
                  amount={t.amount}
                  transactionType={t.transactionType}
                  dateOfSettlement={t.dateOfSettlement}
                  handlePress={() => {}}
                />
              ))}
          </ScrollView>

          <Pressable
            style={styles.addButton}
            android_ripple={{ color: "#fff" }}
            onPress={handleFab}
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
    zIndex: 100,
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
