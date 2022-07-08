import React from "react"
import { Pressable } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

const BackButton = ({ action }: any) => {
  return (
    <Pressable
      style={{
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 6,
        marginTop: 12,
        marginBottom: 18,
      }}
      onPress={action}
    >
      <Icon name="arrow-back" size={24} color="#000" />
    </Pressable>
  )
}

export default BackButton
