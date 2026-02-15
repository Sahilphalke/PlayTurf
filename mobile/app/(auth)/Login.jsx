import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Animatable from "react-native-animatable"; // Ensure this is installed
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  // States for API and Feedback logic (Matching Register)
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    // Basic UI Validation
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const API_URL = "http://10.149.77.44:5000/api/users/login";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");

        await AsyncStorage.setItem("user", JSON.stringify(result.user));
        await AsyncStorage.setItem("token", result.accessToken);
        // Success feedback delay before navigating
        setTimeout(() => {
          setStatus(null);
          router.replace("/Home");
        }, 1000);
      } else {
        setErrorMessage(result.message || "Invalid email or password");
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
      <View className="flex-1 px-6 justify-center">
        {/* Animated Feedback Overlay (Same as Register) */}
        {status && (
          <Animatable.View
            animation="fadeInDown"
            duration={500}
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
                  {status === "success" ? "Welcome Back!" : "Login Failed"}
                </Text>
                <Text className="text-white/90 text-sm">
                  {status === "success" ? "Logging you in..." : errorMessage}
                </Text>
              </View>
            </View>
          </Animatable.View>
        )}

        {/* Logo Section */}
        <View className="items-center mb-10">
          <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4 shadow-xl shadow-blue-500/30">
            <Ionicons name="football" size={40} color="white" />
          </View>
          <Text className="text-3xl font-bold text-white mb-2 text-center">
            Welcome Back
          </Text>
          <Text className="text-gray-400 text-center px-4">
            Sign in to manage your turf bookings or find a match.
          </Text>
        </View>

        {/* Inputs Group */}
        <View className="space-y-4">
          <View>
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
                value={email}
                onChangeText={setEmail}
                className="flex-1 text-white px-3"
              />
            </View>
          </View>

          <View className="mt-4">
            <Text className="text-gray-400 font-medium mb-2 ml-1">
              Password
            </Text>
            <View className="flex-row items-center bg-[#111827] border border-gray-700 rounded-xl px-4 h-14">
              <Feather name="lock" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="Enter password"
                placeholderTextColor="#6B7280"
                secureTextEntry={secure}
                value={password}
                onChangeText={setPassword}
                className="flex-1 text-white px-3"
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

        {/* Forgot Password */}
        <Pressable className="items-end mt-4 mb-8">
          <Text className="text-blue-500 font-medium">Forgot Password?</Text>
        </Pressable>

        {/* Sign In Button */}
        <Pressable
          onPress={handleLogin}
          disabled={loading}
          className={`py-4 rounded-xl items-center shadow-lg ${
            loading
              ? "bg-gray-700 opacity-50"
              : "bg-blue-600 active:bg-blue-700"
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-lg font-bold">Sign In →</Text>
          )}
        </Pressable>

        {/* Footer Link */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-400">New here? </Text>
          <Pressable onPress={() => router.push("/Register")}>
            <Text className="text-blue-500 font-bold">Create Account</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
