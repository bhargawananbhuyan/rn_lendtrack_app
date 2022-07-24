import AsyncStorage from "@react-native-async-storage/async-storage"
import { StackActions, useNavigation, useRoute } from "@react-navigation/native"
import dayjs from "dayjs"
import React, { useContext, useState } from "react"
import { Text, ToastAndroid, View } from "react-native"
import BackButton from "../components/BackButton"
import Dropdown from "../components/Dropdown"
import InputField from "../components/InputField"
import SubmitButton from "../components/SubmitButton"
import { options, transactionService } from "../utils/constants"
import { TransactionsContext } from "../utils/TransactionsProvider"

const EditTransaction = () => {
  const navigation = useNavigation()
  const { transaction }: any = useRoute().params
  const [txnType, setTxnType] = useState(options[transaction.transactionType])
  const [otherFormData, setOtherFormData] = useState({
    receipentName: transaction.secondParty,
    amount: `${transaction.amount}`,
    dateOfSettlement: dayjs(transaction.dateOfSettlement).format("YYYY-MM-DD"),
  })
  const { updateTransaction }: any = useContext(TransactionsContext)
  const [loading, setLoading] = useState(false)

  return (
    <View>
      <BackButton action={() => navigation.dispatch(StackActions.pop())} />

      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            color: "#000",
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 16,
          }}
        >
          Edit transaction
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
          text={loading ? "Please wait..." : "Submit"}
          onPress={async () => {
            if (
              !otherFormData.receipentName ||
              !otherFormData.amount ||
              !otherFormData.dateOfSettlement
            ) {
              ToastAndroid.show("All fields are required.", ToastAndroid.SHORT)
              return
            }

            try {
              setLoading(true)
              const res = await transactionService.put(
                `/${transaction._id}`,
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
                setLoading(false)
                ToastAndroid.show(
                  "Transaction updated successfully",
                  ToastAndroid.SHORT
                )
                updateTransaction(res.data?.data)
                navigation.dispatch(StackActions.pop())
                return
              }
            } catch (error) {
              setLoading(false)
              ToastAndroid.show((error as any)?.message, ToastAndroid.SHORT)
            }
          }}
        />
      </View>
    </View>
  )
}

export default EditTransaction
