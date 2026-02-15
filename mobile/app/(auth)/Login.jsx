import { View, Text, TextInput, Pressable, Image } from "react-native";
import { useState } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  return (
    <View className="h-full flex-1 bg-[#101622] px-6  justify-center">
      {/* Logo Section */}
      <View className="items-center mb-10 pb-10 p-5">
        <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4">
          <Ionicons name="leaf-outline" size={32} color="white" />
        </View>

        <Text className="text-3xl font-bold text-white mb-2">Welcome Back</Text>
        <Text className="text-gray-400 text-center">
          Sign in to manage your turf bookings
        </Text>
      </View>

      <View>
        {/* Email */}
        <Text className="text-gray-300 mb-2">Email</Text>
        <View className="flex-row items-center bg-[#111827] border border-gray-700 rounded-xl px-4 mb-5">
          <Feather name="mail" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#6B7280"
            value={email}
            onChangeText={setEmail}
            className="flex-1 text-white p-4"
          />
        </View>

        {/* Password */}
        <Text className="text-gray-300 mb-2">Password</Text>
        <View className="flex-row items-center bg-[#111827] border border-gray-700 rounded-xl px-4 mb-3">
          <Feather name="lock" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Enter password"
            placeholderTextColor="#6B7280"
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
            className="flex-1 text-white p-4"
          />
          <Pressable onPress={() => setSecure(!secure)}>
            <Feather
              name={secure ? "eye-off" : "eye"}
              size={20}
              color="#9CA3AF"
            />
          </Pressable>
        </View>

        {/* Forgot Password */}
        <Pressable className="items-end mb-6">
          <Text className="text-blue-500">Forgot Password?</Text>
        </Pressable>

        {/* Sign In Button */}
        <Pressable className="bg-blue-600 rounded-xl py-4 items-center mb-6">
          <Text className="text-white text-lg font-semibold">Sign In →</Text>
        </Pressable>

        {/* Sign Up */}
        <View className="flex-row justify-center">
          <Text className="text-gray-400">Don't have an account? </Text>
          <Pressable onPress={() => router.push("/Register")}>
            <Text className="text-blue-500 font-semibold">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;
