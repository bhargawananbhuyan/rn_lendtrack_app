import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { Text, View } from "react-native"
import BackButton from "../components/BackButton"
import Dropdown from "../components/Dropdown"
import InputField from "../components/InputField"
import SubmitButton from "../components/SubmitButton"
import { options } from "../utils/constants"

const AddTransaction = () => {
  const navigation = useNavigation()
  const [txnType, setTxnType] = useState(options[0])
  const [otherFormData, setOtherFormData] = useState({
    receipentName: "",
    amount: "",
    dateOfSettlement: "",
  })

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
            placeholder="Date of settlement (DD-MM-YYYY)"
            value={otherFormData.dateOfSettlement}
            onChangeText={(value) =>
              setOtherFormData({ ...otherFormData, dateOfSettlement: value })
            }
            onBlur={() => {}}
            error={false}
            errorMsg={""}
          />
        </View>

        <SubmitButton text="Submit" onPress={() => {}} />
      </View>
    </View>
  )
}

export default AddTransaction
