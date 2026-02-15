import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Register = () => {
  const [role, setRole] = useState("player");
  const [secure, setSecure] = useState(true);
  const [agree, setAgree] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <ScrollView className="flex-1 bg-[#0B1220] px-6 pt-16">
      {/* Header */}
      <View className="mb-8">
        <View className="w-16 h-16 bg-blue-600 rounded-2xl items-center justify-center mb-4">
          <Ionicons name="football-outline" size={28} color="white" />
        </View>

        <Text className="text-3xl font-bold text-white mb-2">
          Create Account
        </Text>

        <Text className="text-gray-400">
          Join the community to book or manage turfs seamlessly.
        </Text>
      </View>
      {/* Role Switch */}
      <View className="flex-row bg-[#111827] rounded-xl p-1 mb-6">
        <Pressable
          onPress={() => setRole("player")}
          className={`flex-1 py-3 rounded-lg items-center ${
            role === "player" ? "bg-gray-500" : ""
          }`}
        >
          <Text className="text-white font-medium">Player</Text>
        </Pressable>

        <Pressable
          onPress={() => setRole("owner")}
          className={`flex-1 py-3 rounded-lg items-center ${
            role === "owner" ? "bg-gray-500" : ""
          }`}
        >
          <Text className="text-white font-medium">Turf Owner</Text>
        </Pressable>
      </View>
      {/* Full Name */}
      <Text className="text-gray-300 mb-2">Full Name</Text>
      <View className="flex-row items-center bg-[#111827] border border-gray-700 rounded-xl px-4 mb-5">
        <Feather name="user" size={20} color="#9CA3AF" />
        <TextInput
          placeholder="John Doe"
          placeholderTextColor="#6B7280"
          className="flex-1 text-white p-4"
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
        />
      </View>
      {/* Email */}
      <Text className="text-gray-300 mb-2">Email Address</Text>
      <View className="flex-row items-center bg-[#111827] border border-gray-700 rounded-xl px-4 mb-5">
        <Feather name="mail" size={20} color="#9CA3AF" />
        <TextInput
          placeholder="john@example.com"
          placeholderTextColor="#6B7280"
          className="flex-1 text-white p-4"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
        />
      </View>
      {/* Phone */}
      <Text className="text-gray-300 mb-2">Phone Number</Text>
      <View className="flex-row items-center bg-[#111827] border border-gray-700 rounded-xl px-4 mb-5">
        <Feather name="phone" size={20} color="#9CA3AF" />
        <TextInput
          placeholder="+1 (555) 000-0000"
          placeholderTextColor="#6B7280"
          keyboardType="phone-pad"
          className="flex-1 text-white p-4"
          value={form.phone}
          onChangeText={(text) => handleChange("phone", text)}
        />
      </View>
      {/* Password */}
      <Text className="text-gray-300 mb-2">Password</Text>
      <View className="flex-row items-center bg-[#111827] border border-gray-700 rounded-xl px-4 mb-5">
        <Feather name="lock" size={20} color="#9CA3AF" />
        <TextInput
          placeholder="Min. 8 characters"
          placeholderTextColor="#6B7280"
          secureTextEntry={secure}
          className="flex-1 text-white p-4"
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
        />
        <Pressable onPress={() => setSecure(!secure)}>
          <Feather
            name={secure ? "eye-off" : "eye"}
            size={20}
            color="#9CA3AF"
          />
        </Pressable>
      </View>
      {/* Terms Checkbox */}
      <Pressable
        className="flex-row items-start mb-6"
        onPress={() => setAgree(!agree)}
      >
        <View
          className={`w-5 h-5 mr-3 border rounded ${
            agree ? "bg-blue-600 border-blue-600" : "border-gray-500"
          }`}
        />
        <Text className="text-gray-400 flex-1">
          By creating an account, you agree to our
          <Text className="text-blue-500">Terms of Service</Text>
          <Text className="text-blue-500">Privacy Policy</Text>.
        </Text>
      </Pressable>
      {/* Create Account Button */}
      <Pressable className="bg-blue-600 py-4 rounded-xl items-center mb-6">
        <Text className="text-white text-lg font-semibold">Create Account</Text>
      </Pressable>
      {/* Login Link */}
      <View className="flex-row justify-center mb-10">
        <Text className="text-gray-400">Already have an account? </Text>
        <Pressable onPress={() => router.push("/login")}>
          <Text className="text-blue-500 font-semibold">Log In</Text>
        </Pressable>
      </View>
      F
    </ScrollView>
  );
};

export default Register;
