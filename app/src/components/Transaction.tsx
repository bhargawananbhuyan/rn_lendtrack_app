import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { options } from "../utils/constants"
import dateFormat from "../utils/dateFormat"

type TransactionProps = {
  transactionType: number
  secondParty: string
  amount: number
  dateOfSettlement: string
  handlePress: (params: object) => void
}

const Transaction: React.FC<TransactionProps> = (props) => {
  return (
    <Pressable style={styles.root} onPress={props.handlePress}>
      <View>
        <View style={styles.titleWrapper}>
          <View
            style={[
              styles.iconWrapper,
              {
                backgroundColor:
                  props.transactionType === 1 ? "#22c55e" : "#ef4444",
              },
            ]}
          >
            <Icon
              name={props.transactionType === 1 ? "south-east" : "north-east"}
              color="#fff"
              size={12}
            />
          </View>
          <View>
            <Text style={{ fontSize: 12 }}>
              {options[props.transactionType]}
            </Text>
            <Text style={styles.title}>{props.secondParty}</Text>
          </View>
        </View>
        <Text style={styles.date}>{dateFormat(props.dateOfSettlement)}</Text>
      </View>
      <Text style={styles.amount}>${props.amount}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#f3f3f3",
    marginTop: 12,
    borderRadius: 5,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
})

export default Transaction
