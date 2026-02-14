import { View, Text, Image } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111F35",
      }}
    >
      <Text style={{ color: "white" }}>Hello, I am sahil phalke</Text>
      <Text style={{ color: "white" }}>My First React Native App</Text>
    </View>
  );
}
