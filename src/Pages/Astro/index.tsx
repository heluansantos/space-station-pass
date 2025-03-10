import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StatusBar,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import api from "../../Services/api";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Astro: React.FC = () => {
  const [astros, setAstros] = useState<
    {
      name: string;
      craft: string;
    }[]
  >([]);

  useEffect(() => {
    getAstros();
  });

  const getAstros = useCallback(async () => {
    try {
      const astrosX = await api.get("/astros.json");
      setAstros(astrosX.data.people);
    } catch (err) {
      console.log(err, "Error getting astros");
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ backgroundColor: "#000", height: "100%" }}>
        <ImageBackground
          source={require("../../Assets/backgroundjpeg.jpeg")}
          style={{
            flex: 1,
            alignSelf: "stretch",
            width: "100%",
            height: "100%",
          }}
        >
          <FlatList
            data={astros}
            style={{ marginTop: 40 }}
            renderItem={(item) => (
              <View
                style={{
                  borderWidth: 0.3,
                  borderBottomColor: "#ddd",
                  height: 100,
                  marginBottom: 3,
                  padding: 10,
                  marginTop: 3,
                  flexDirection: "row",
                }}
              >
                <MaterialCommunityIcons
                  name="account-tie"
                  size={50}
                  color="#fff"
                  style={{ marginTop: 9 }}
                />
                <View style={{ flexDirection: "column", padding: 10 }}>
                  <Text style={{ fontSize: 18, color: "#fff" }}>
                    Astronauta: {item.item.name}
                  </Text>
                  <Text style={{ fontSize: 18, color: "#fff" }}>
                    Espaçonave: {item.item.craft}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default Astro;
