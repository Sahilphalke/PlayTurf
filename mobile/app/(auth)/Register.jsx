import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import PhoneInput from "react-native-phone-number-input";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const phoneInput = useRef(null);

  // --- States ---
  const [role, setRole] = useState("USER"); // Match Prisma Role Enum
  const [secure, setSecure] = useState(true);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState("");

  const roleMessage =
    role === "USER"
      ? "Join the community to book turfs seamlessly."
      : "List your turf and start managing bookings today.";

  const [form, setForm] = useState({
    name: "",
    email: "",
    contactNo: "", // Formatted with country code for DB
    rawPhone: "", // Local digits for validation
    password: "",
    timezone: "",
  });

  // --- Effects ---
  useEffect(() => {
    // Automatically detect user timezone on mount
    const deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setForm((prev) => ({ ...prev, timezone: deviceTimezone }));
  }, []);

  // --- Handlers ---
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhoneChange = (text) => {
    setForm((prev) => ({ ...prev, rawPhone: text }));
    if (text.length > 5) {
      const checkValid = phoneInput.current?.isValidNumber(text);
      setIsValidPhone(checkValid);
    } else {
      setIsValidPhone(true);
    }
  };

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !form.rawPhone) {
      setErrorMessage("Please fill in all required fields.");
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
      return; // Code stops here, loading was never true, so no spinner!
    }

    const isPhoneValid = phoneInput.current?.isValidNumber(form.rawPhone);
    if (!isPhoneValid) {
      setIsValidPhone(false);
      setErrorMessage("Invalid phone number.");
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    setLoading(true);
    setStatus(null);

    // Prepare data for Prisma Backend
    const userData = {
      name: form.name,
      email: form.email.toLowerCase().trim(),
      password: form.password,
      contactNo: form.contactNo,
      role: role, // "PLAYER" or "OWNER"
      timezone: form.timezone, // e.g. "Asia/Kolkata"
    };

    try {
      // Replace '192.168.1.5' with your actual computer IP address
      const API_URL = "http://10.149.77.44:5000/api/users/register";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");

        // Brief delay so user sees the success animation before redirecting
        setTimeout(() => {
          setStatus(null);
          router.replace("/Login");
        }, 1000);
      } else {
        setErrorMessage(result.message || "Registration failed");
        setStatus("error");
        setTimeout(() => setStatus(null), 3000);
      }
    } catch (error) {
      setErrorMessage("Network Error: Check your IP/WiFi connection");
      setStatus("error");
      console.error("API Error:", error);
      setTimeout(() => setStatus(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#0B1220]"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        className="px-6 pt-10"
      >
        {/* Header */}
        <View className="mb-8">
          <View className="w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center mb-4 shadow-xl shadow-blue-500/30">
            <Ionicons
              name={role === "USER" ? "football" : "business"}
              size={32}
              color="white"
            />
          </View>
          <Text className="text-3xl font-bold text-white mb-2">
            {role === "USER" ? "Player Account" : "Owner Account"}
          </Text>
          <Text className="text-gray-400 text-base">{roleMessage}</Text>
        </View>

        {/* ADDED HERE: UPDATED ROLE SELECTOR */}
        <View className="flex-row bg-[#111827] border border-gray-800 rounded-xl p-1.5 mb-8">
          <Pressable
            onPress={() => setRole("USER")}
            className={`flex-1 py-3 rounded-lg items-center transition-all ${
              role === "USER" ? "bg-blue-600" : "bg-transparent"
            }`}
          >
            <Text
              className={`font-semibold ${role === "USER" ? "text-white" : "text-gray-500"}`}
            >
              Player
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setRole("ADMIN")}
            className={`flex-1 py-3 rounded-lg items-center transition-all ${
              role === "ADMIN" ? "bg-blue-600" : "bg-transparent"
            }`}
          >
            <Text
              className={`font-semibold ${role === "ADMIN" ? "text-white" : "text-gray-500"}`}
            >
              Turf Owner
            </Text>
          </Pressable>
        </View>

        {/* Inputs */}
        <View className="space-y-4">
          {/* Full Name */}
          <View>
            <Text className="text-gray-400 font-medium mb-2 ml-1">
              Full Name
            </Text>
            <View className="flex-row items-center bg-[#111827] border border-gray-700 rounded-xl px-4 h-14">
              <Feather name="user" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="John Doe"
                placeholderTextColor="#6B7280"
                className="flex-1 text-white px-3"
                value={form.name}
                onChangeText={(t) => handleChange("name", t)}
              />
            </View>
          </View>

          {/* Email */}
          <View className="mt-4">
            <Text className="text-gray-400 font-medium mb-2 ml-1">
              Email Address
            </Text>
            <View className="flex-row items-center bg-[#111827] border border-gray-700 rounded-xl px-4 h-14">
              <Feather name="mail" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="email@example.com"
                placeholderTextColor="#6B7280"
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 text-white px-3"
                value={form.email}
                onChangeText={(t) => handleChange("email", t)}
              />
            </View>
          </View>

          {/* Phone Number - Fixed for Visibility & Flags */}
          <View className="mt-4">
            <Text className="text-gray-400 font-medium mb-2 ml-1">
              Phone Number
            </Text>
            <PhoneInput
              ref={phoneInput}
              defaultValue={form.rawPhone}
              defaultCode="IN"
              layout="first"
              onChangeText={handlePhoneChange}
              onChangeFormattedText={(t) => handleChange("contactNo", t)}
              containerStyle={{
                width: "100%",
                height: 50,
                backgroundColor: "#111827",
                borderRadius: 12,
                borderWidth: 1,
                borderColor: isValidPhone ? "#374151" : "#EF4444",
              }}
              textContainerStyle={{
                backgroundColor: "transparent",
                paddingVertical: 0,
              }}
              textInputStyle={{
                color: "white",
                fontSize: 16,
                height: 58, // Fix for hidden text
              }}
              codeTextStyle={{ color: "white", fontSize: 16 }}
              flagButtonStyle={{ backgroundColor: "transparent" }}
              countryPickerProps={{
                withFilter: true,
                withFlag: true,
                withEmoji: true,
                renderFlagButton: undefined, // Fix for India flag bug
                theme: {
                  backgroundColor: "#111827",
                  onBackgroundTextColor: "#ffffff",
                },
              }}
            />
            {!isValidPhone && (
              <Text className="text-red-500 text-[10px] mt-1 ml-1 uppercase font-bold">
                Invalid Number for selected country
              </Text>
            )}
          </View>

          {/* Password */}
          <View className="mt-4">
            <Text className="text-gray-400 font-medium mb-2 ml-1">
              Password
            </Text>
            <View className="flex-row items-center bg-[#111827] border border-gray-700 rounded-xl px-4 h-14">
              <Feather name="lock" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="Min. 8 characters"
                placeholderTextColor="#6B7280"
                secureTextEntry={secure}
                className="flex-1 text-white px-3"
                value={form.password}
                onChangeText={(t) => handleChange("password", t)}
              />
              <Pressable onPress={() => setSecure(!secure)}>
                <Feather
                  name={secure ? "eye-off" : "eye"}
                  size={20}
                  color="#9CA3AF"
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Agree Terms */}
        <Pressable
          className="flex-row items-center mt-8 mb-8"
          onPress={() => setAgree(!agree)}
        >
          <View
            className={`w-6 h-6 items-center justify-center mr-3 border rounded-md ${
              agree ? "bg-blue-600 border-blue-600" : "border-gray-500"
            }`}
          >
            {agree && <Feather name="check" size={14} color="white" />}
          </View>
          <Text className="text-gray-400 flex-1 text-sm">
            I agree to the{" "}
            <Text className="text-blue-500">Terms of Service</Text> &
            <Text className="text-blue-500">Privacy Policy</Text>.
          </Text>
        </Pressable>

        {/* Submit Button */}
        <Pressable
          onPress={handleRegister}
          disabled={!agree || loading}
          className={`py-4 rounded-xl items-center shadow-lg ${
            agree && !loading
              ? "bg-blue-600 active:bg-blue-700"
              : "bg-gray-700 opacity-50"
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-bold">Create Account</Text>
          )}
        </Pressable>

        {/* Footer */}
        <View className="flex-row justify-center mt-3">
          <Text className="text-gray-400">Already have an account? </Text>
          <Pressable onPress={() => router.push("/Login")}>
            <Text className="text-blue-500 font-bold">Log In</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Animated Feedback Overlay */}
      {status && (
        <View
          style={{
            position: "absolute",
            top: 50,
            left: 20,
            right: 20,
            zIndex: 999,
          }}
        >
          <View
            className={`flex-row items-center p-4 rounded-2xl shadow-2xl ${
              status === "success" ? "bg-emerald-500" : "bg-rose-500"
            }`}
          >
            <View className="bg-white/20 p-2 rounded-full">
              <Ionicons
                name={
                  status === "success" ? "checkmark-circle" : "alert-circle"
                }
                size={28}
                color="white"
              />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-white font-bold text-lg">
                {status === "success" ? "Welcome!" : "Hold on..."}
              </Text>
              <Text className="text-white/90 text-sm">
                {status === "success"
                  ? "Account created successfully"
                  : errorMessage}
              </Text>
            </View>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default Register;
