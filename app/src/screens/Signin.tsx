import AsyncStorage from "@react-native-async-storage/async-storage"
import { StackActions, useNavigation } from "@react-navigation/native"
import { Formik } from "formik"
import React from "react"
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native"
import * as Yup from "yup"
import BackButton from "../components/BackButton"
import InputField from "../components/InputField"
import SubmitButton from "../components/SubmitButton"
import { authService, colors } from "../utils/constants"

const validationSchema = Yup.object().shape({
  email: Yup.string().email("please enter a valid email").required("required"),
  password: Yup.string()
    .min(8, "requires minimum 8 characters")
    .max(12, "maximum 12 characters allowed")
    .required("required"),
})

const Signin: React.FC = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.root}>
      <BackButton action={() => navigation.dispatch(StackActions.pop())} />
      <View style={{ paddingHorizontal: 16 }}>
        <Text
          style={{
            fontSize: 21,
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          Sign in
        </Text>
        <Text
          style={{
            color: "#000",
            fontSize: 16,
            marginTop: 4.5,
            marginBottom: 21,
          }}
        >
          Please enter your credentials to sign in.
        </Text>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const res = await authService.post("/login", {
                email: values.email,
                password: values.password,
              })

              if (res.status === 200) {
                resetForm()
                await AsyncStorage.setItem("@token", res.data?.data)
                navigation.dispatch(StackActions.replace("homepage_screen"))
                return
              }
            } catch (error) {
              ToastAndroid.show(
                (error as any).response?.data?.error ??
                  "Server error. Please try again.",
                ToastAndroid.SHORT
              )
            }
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            touched,
            errors,
            handleSubmit,
            resetForm,
            isSubmitting,
          }) => (
            <>
              <InputField
                placeholder="Enter your email"
                isEmail
                value={values.email}
                onChangeText={handleChange(`email`)}
                onBlur={handleBlur(`email`) as any}
                error={touched.email && (errors.email as any)}
                errorMsg={errors.email as any}
              />

              <View style={{ marginVertical: 12 }}>
                <InputField
                  placeholder="Enter your password"
                  isPassword
                  value={values.password}
                  onChangeText={handleChange(`password`)}
                  onBlur={handleBlur(`password`) as any}
                  error={touched.password && (errors.password as any)}
                  errorMsg={errors.password as any}
                />
              </View>

              <SubmitButton
                text={isSubmitting ? "Signing in..." : "Sign in"}
                onPress={handleSubmit}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  marginTop: 12,
                }}
              >
                <Text style={{ color: "#000", fontSize: 16 }}>
                  Not yet registered?
                </Text>
                <Pressable
                  style={{ padding: 3.5 }}
                  onPress={() => {
                    resetForm()
                    navigation.dispatch(StackActions.replace("register_screen"))
                  }}
                >
                  <Text style={{ color: colors.primary, fontSize: 16 }}>
                    Sign up
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fbfbfb",
    flex: 1,
  },
})

export default Signin
