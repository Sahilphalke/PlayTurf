import { useEffect } from "react";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/(auth)/Login");
    }, 100);
  }, []);

  return null;
}
