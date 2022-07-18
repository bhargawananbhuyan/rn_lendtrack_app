import AsyncStorage from "@react-native-async-storage/async-storage"
import { StackActions, useNavigation } from "@react-navigation/native"
import dayjs from "dayjs"
import React, { useContext, useState } from "react"
import { Text, ToastAndroid, View } from "react-native"
import BackButton from "../components/BackButton"
import Dropdown from "../components/Dropdown"
import InputField from "../components/InputField"
import SubmitButton from "../components/SubmitButton"
import { options, transactionService } from "../utils/constants"
import { TransactionsContext } from "../utils/TransactionsProvider"

const AddTransaction = () => {
  const navigation = useNavigation()
  const [txnType, setTxnType] = useState(options[0])
  const [otherFormData, setOtherFormData] = useState({
    receipentName: "",
    amount: "",
    dateOfSettlement: "",
  })
  const { addTransaction }: any = useContext(TransactionsContext)

  return (
    <View>
      <BackButton />

      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            color: "#000",
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 16,
          }}
        >
          Add a new transaction
        </Text>

        <Dropdown
          options={options}
          defaultValue={txnType}
          onChange={setTxnType}
        />
        <View style={{ marginVertical: 12 }}>
          <InputField
            placeholder="Enter receipent name"
            value={otherFormData.receipentName}
            onChangeText={(value) =>
              setOtherFormData({ ...otherFormData, receipentName: value })
            }
            onBlur={() => {}}
            error={false}
            errorMsg={""}
          />
        </View>

        <InputField
          placeholder="Enter amount"
          value={otherFormData.amount}
          onChangeText={(value) =>
            setOtherFormData({ ...otherFormData, amount: value })
          }
          onBlur={() => {}}
          error={false}
          errorMsg={""}
        />

        <View style={{ marginVertical: 12 }}>
          <InputField
            placeholder="Date of settlement (YYYY-MM-DD)"
            value={otherFormData.dateOfSettlement}
            onChangeText={(value) =>
              setOtherFormData({ ...otherFormData, dateOfSettlement: value })
            }
            onBlur={() => {}}
            error={false}
            errorMsg={""}
          />
        </View>

        <SubmitButton
          text="Submit"
          onPress={async () => {
            try {
              const res = await transactionService.post(
                "/",
                {
                  transactionType: options.indexOf(txnType),
                  secondParty: otherFormData.receipentName,
                  amount: parseFloat(otherFormData.amount),
                  dateOfSettlement: dayjs(otherFormData.dateOfSettlement),
                },
                {
                  headers: {
                    auth_token: ("Bearer " +
                      (await AsyncStorage.getItem("@token"))) as string,
                  },
                }
              )
              if (res.data?.data) {
                ToastAndroid.show(
                  "Transaction added successfully",
                  ToastAndroid.SHORT
                )
                addTransaction(res.data?.data)
                navigation.dispatch(StackActions.pop())
                return
              }
            } catch (error) {
              ToastAndroid.show((error as any)?.message, ToastAndroid.SHORT)
            }
          }}
        />
      </View>
    </View>
  )
}

export default AddTransaction
