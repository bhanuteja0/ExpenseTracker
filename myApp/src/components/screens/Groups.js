import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const Groups = () => {
  const [image, setImage] = useState(null);

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert("Camera permission required");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      uploadImage(uri);
    }
  };

  // const uploadImage = async (uri) => {
  //   const formData = new FormData();
  //   formData.append("photo", {
  //     uri,
  //     name: "photo.jpg",
  //     type: "image/jpeg",
  //   });

  //   try {
  //     const res = await axios.post(
  //       "http://YOUR_IP:3000/upload",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     console.log("Uploaded:", res.data);
  //   } catch (err) {
  //     console.log("Upload error:", err);
  //   }
  // };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Groups</Text>

      <Pressable
        onPress={openCamera}
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <Ionicons name="camera" size={24} color="black" />
        <Text style={{ marginLeft: 10 }}>Create Group</Text>
      </Pressable>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 150, height: 150, marginTop: 20, borderRadius: 10 }}
        />
      )}
    </View>
  );
};

export default Groups;