import { StackActions, useNavigation, useRoute } from "@react-navigation/native"
import React, { useContext } from "react"
import { StyleSheet, Text, ToastAndroid, View } from "react-native"
import BackButton from "../components/BackButton"
import { options, transactionService } from "../utils/constants"
import dateFormat from "../utils/dateFormat"
import Icon from "react-native-vector-icons/MaterialIcons"
import SubmitButton from "../components/SubmitButton"
import { TransactionsContext } from "../utils/TransactionsProvider"
import AsyncStorage from "@react-native-async-storage/async-storage"

const TransactionDetails: React.FC = () => {
  const { transaction }: any = useRoute().params
  const navigation = useNavigation()
  const { deleteTransaction }: any = useContext(TransactionsContext)

  return (
    <View style={{ backgroundColor: "#fbfbfb", flex: 1 }}>
      <BackButton action={() => navigation.dispatch(StackActions.pop())} />

      <View style={styles.root}>
        <View style={styles.root__}>
          <Text>Transaction ID:</Text>
          <Text style={{ fontWeight: "bold", color: "#000", marginTop: 8 }}>
            {transaction._id}
          </Text>
        </View>

        <View style={{ marginVertical: 12 }}>
          <View style={styles.root__}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <View>
                <View style={styles.titleWrapper}>
                  <View
                    style={[
                      styles.iconWrapper,
                      {
                        backgroundColor:
                          transaction.transactionType === 1
                            ? "#22c55e"
                            : "#ef4444",
                      },
                    ]}
                  >
                    <Icon
                      name={
                        transaction.transactionType === 1
                          ? "south-east"
                          : "north-east"
                      }
                      color="#fff"
                      size={12}
                    />
                  </View>
                  <View>
                    <Text style={{ fontSize: 12 }}>
                      {options[transaction.transactionType]}
                    </Text>
                    <Text style={styles.title}>{transaction.secondParty}</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.amount}>${transaction.amount}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.date__}>
              <Text>Date of transaction: </Text>
              <Text style={styles.date___}>
                {dateFormat(transaction.createdAt)}
              </Text>
            </View>
            <View style={styles.date__}>
              <Text>Date of settlement: </Text>
              <Text style={styles.date___}>
                {dateFormat(transaction.dateOfSettlement)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <SubmitButton
            text="Edit"
            onPress={() => {
              navigation.dispatch(
                StackActions.replace("edit_txn_screen", {
                  transaction,
                })
              )
            }}
            addStyle={{ flex: 1 }}
          />
          <View style={{ marginHorizontal: 6 }} />
          <SubmitButton
            text="Settled"
            onPress={async () => {
              await transactionService
                .delete(`/${transaction._id}`, {
                  headers: {
                    auth_token: ("Bearer " +
                      (await AsyncStorage.getItem("@token"))) as string,
                  },
                })
                .then(() => {
                  deleteTransaction(transaction._id)
                  ToastAndroid.show("Transaction settled.", ToastAndroid.SHORT)
                  navigation.dispatch(StackActions.pop())
                })
                .catch((error) => {
                  ToastAndroid.show(error?.message, ToastAndroid.SHORT)
                })
            }}
            addStyle={{ flex: 1, backgroundColor: "#22c55e" }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
  },
  root__: {
    backgroundColor: "#f3f3f3",
    borderRadius: 5,
    padding: 16,
  },
  iconWrapper: {
    height: 36,
    width: 36,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    marginTop: 8,
  },
  amount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  divider: {
    borderTopWidth: 1,
    borderColor: "#dbdbdb",
  },
  date__: {
    flexDirection: "row",
    marginTop: 12,
  },
  date___: {
    fontWeight: "bold",
    color: "#000",
  },
})

export default TransactionDetails
