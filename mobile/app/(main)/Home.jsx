import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          // If no user is found, send them back to login
          router.replace("/Login");
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Show a loader while checking AsyncStorage to prevent crashes
  if (loading) {
    return (
      <View className="flex-1 bg-[#0B1220] justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // Final safety check
  if (!user) return null;

  return (
    <SafeAreaView className="flex-1 bg-[#0B1220]">
      <View className="px-6 pt-10">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-gray-400 text-lg">Welcome back,</Text>
            <Text className="text-white text-3xl font-bold">
              {user?.name || "User"}
            </Text>
          </View>

          {/* Logout Button */}
          <Pressable
            onPress={async () => {
              await AsyncStorage.clear();
              //   router.replace("/Login");
            }}
            className="w-12 h-12 bg-blue-600 rounded-full items-center justify-center shadow-lg shadow-blue-500/30"
          >
            <Text className="text-white font-bold text-xl">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </Text>
          </Pressable>
        </View>

        {/* Dynamic Content Based on Role */}
        {user.role === "ADMIN" ? (
          <View className="bg-blue-600/10 border border-blue-500/40 p-6 rounded-3xl shadow-sm">
            <Ionicons name="stats-chart" size={32} color="#3b82f6" />
            <Text className="text-white text-xl font-bold mt-4">
              Owner Dashboard
            </Text>
            <Text className="text-gray-400 mt-2 leading-5">
              Manage your turfs, view bookings, and track revenue in real-time.
            </Text>
            <Pressable className="bg-blue-600 mt-6 py-4 rounded-xl items-center active:bg-blue-700">
              <Text className="text-white font-bold text-lg">Manage Turfs</Text>
            </Pressable>
          </View>
        ) : (
          <View className="bg-emerald-600/10 border border-emerald-500/40 p-6 rounded-3xl shadow-sm">
            <Ionicons name="football" size={32} color="#10b981" />
            <Text className="text-white text-xl font-bold mt-4">
              Player Dashboard
            </Text>
            <Text className="text-gray-400 mt-2 leading-5">
              Find nearby turfs, join matches, and book your next slot.
            </Text>
            <Pressable className="bg-emerald-600 mt-6 py-4 rounded-xl items-center active:bg-emerald-700">
              <Text className="text-white font-bold text-lg">Book a Turf</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
