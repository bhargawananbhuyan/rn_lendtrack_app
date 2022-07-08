import { StackActions, useNavigation } from "@react-navigation/native"
import * as Yup from "yup"
import React from "react"
import {
  Pressable,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ToastAndroid,
} from "react-native"
import InputField from "../components/InputField"
import SubmitButton from "../components/SubmitButton"
import { Formik } from "formik"
import BackButton from "../components/BackButton"
import { authService, colors } from "../utils/constants"

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("required"),
  email: Yup.string().email("please enter a valid email").required("required"),
  password: Yup.string()
    .min(8, "requires minimum 8 characters")
    .max(12, "maximum 12 characters allowed")
    .required("required"),
  confirmPassword: Yup.string()
    .min(8, "requires minimum 8 characters")
    .max(12, "maximum 12 characters allowed")
    .required("required"),
})

const Register: React.FC = () => {
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
          Sign up
        </Text>
        <Text
          style={{
            color: "#000",
            fontSize: 16,
            marginTop: 8,
            marginBottom: 21,
            maxWidth: 275,
            lineHeight: 24,
          }}
        >
          Please enter your credentials to create a new account.
        </Text>

        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            if (values.password !== values.confirmPassword) {
              ToastAndroid.show(
                "Passwords don't match. Try again.",
                ToastAndroid.SHORT
              )
              return
            }

            try {
              const res = await authService.post("/register", {
                fullName: values.fullName,
                email: values.email,
                password: values.password,
              })

              if (res.status === 201) {
                ToastAndroid.show(
                  "Account registered successfully",
                  ToastAndroid.SHORT
                )
                resetForm()
                navigation.dispatch(StackActions.replace("signin_screen"))
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
                placeholder="Enter your full name"
                value={values.fullName}
                onChangeText={handleChange(`fullName`)}
                onBlur={handleBlur(`fullName`) as any}
                error={touched.fullName && (errors.fullName as any)}
                errorMsg={errors.fullName as any}
              />

              <View style={{ marginVertical: 12 }}>
                <InputField
                  placeholder="Enter your email"
                  isEmail
                  value={values.email}
                  onChangeText={handleChange(`email`)}
                  onBlur={handleBlur(`email`) as any}
                  error={touched.email && (errors.email as any)}
                  errorMsg={errors.email as any}
                />
              </View>

              <View style={{ marginBottom: 12 }}>
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
              <InputField
                placeholder="Confirm password"
                isPassword
                value={values.confirmPassword}
                onChangeText={handleChange(`confirmPassword`)}
                onBlur={handleBlur(`confirmPassword`) as any}
                error={
                  touched.confirmPassword && (errors.confirmPassword as any)
                }
                errorMsg={errors.confirmPassword as any}
              />

              <View style={{ marginVertical: 12 }}>
                <SubmitButton
                  text={isSubmitting ? "Please wait..." : "Register"}
                  onPress={handleSubmit}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <Text style={{ color: "#000", fontSize: 16 }}>
                  Already registered?
                </Text>
                <Pressable
                  style={{ padding: 3.5 }}
                  onPress={() => {
                    resetForm()
                    navigation.dispatch(StackActions.replace("signin_screen"))
                  }}
                >
                  <Text style={{ color: colors.primary, fontSize: 16 }}>
                    Sign in
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

export default Register
