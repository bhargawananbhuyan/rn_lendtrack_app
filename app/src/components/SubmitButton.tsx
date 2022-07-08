import React from "react"
import { Pressable, StyleSheet, Text } from "react-native"
import { colors } from "../utils/constants"

type SubmitButtonProps = {
  text: string
  outlined?: boolean
  onPress: () => void
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Pressable
      style={props.outlined ? styles.outlinedButton : styles.submitButton}
      android_ripple={{ color: "#ffffff" }}
      onPress={props.onPress}
    >
      <Text
        style={{
          color: props.outlined ? colors.primary : "#ffffff",
          fontWeight: "500",
          fontSize: 16,
        }}
      >
        {props.text}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: colors.primary,
    alignItems: "center",
    padding: 18,
    borderRadius: 5,
  },

  outlinedButton: {
    borderColor: colors.primary,
    borderWidth: 1,
    alignItems: "center",
    padding: 18,
    borderRadius: 5,
  },
})

export default SubmitButton
