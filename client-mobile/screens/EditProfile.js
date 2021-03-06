import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, TextInput, Image, Alert, ScrollView  } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from '@expo/vector-icons';
import DateField from 'react-native-datefield';
import { styles } from "../styles"
import axios from 'axios';
import { server } from '../globalvar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loadingGif from '../assets/loading.gif'

export default function EditProfile({ navigation }) {
  const [userId, setUserId] = useState()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const [birthDate, setBirthDate] = useState(new Date())
  const [phoneNumber, setPhoneNumber] = useState("")
  const [avatar, setAvatar] = useState("airplane")
  const [focused, setFocused] = useState('')
  const phoneInput = Platform.OS === 'ios' ? 'number-pad' : 'numeric'
  const [token, setToken] = useState("")
  const [loading, setLoading] = useState(true)

  function formatDate(value) {
    let newDate = []
    let formated = value.toISOString().split('T')[0];
    formated = formated.split('-')
    newDate.push(formated[1])
    newDate.push(formated[2])
    newDate.push(formated[0])
    newDate = newDate.join('-')
    return newDate
  }

  const submit = () => {
    setLoading(true)
    axios.put(`${server}/users/${userId}`, {
      email,
      username,
      birthDate: formatDate(birthDate),
      phoneNumber,
      avatar
    }, {
      headers: {
        access_token: token
      }
    })
      .then(res => {
        Alert.alert("Success",res.data.message)
        navigation.navigate("Home", {tripId: userId})
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        Alert.alert("Error",err.response.data.message)
      })
  }

  useEffect(() => {
    AsyncStorage.getItem('access_token')
      .then(tokenA => {
        setToken(tokenA)
        return axios.get(`${server}/users/profile`, {
          headers: {
            access_token: tokenA
          }
        })
      })
      .then(res => {
        setUserId(res.data.id)
        setUsername(res.data.username)
        setEmail(res.data.email)
        setBirthDate(new Date(res.data.birthDate))
        setPhoneNumber(res.data.phoneNumber)
        setAvatar(res.data.avatar)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return(
    <SafeAreaView style={styles.mainContainer}>
      
        <View style={{ position: 'relative', height: '100%' }}>
          <View style={editProfileStyle.headerView}>
            <TouchableOpacity style={{padding: 15}} onPress={() => navigation.navigate("Home")}>
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <Text style={{marginLeft: 40, color: "#fff"}}>Username</Text>
            <TextInput
              style={focused === 'username' ? editProfileStyle.title : editProfileStyle.title}
              placeholder='Username'
              placeholderTextColor="#a2e1ff"
              onFocus={() => setFocused('username')}
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <ScrollView>
            <View style={{width: "100%", flexDirection: "row", justifyContent: "center", paddingTop: 20, paddingBottom: 5 }}>
              <Text style={{fontSize: 18, fontWeight: "bold"}}>Edit Profile</Text>
            </View>
            <View style={{marginHorizontal: 40, marginVertical: 10}}>
              <Text>Email Address</Text>
              <TextInput
                keyboardType='email-address'
                style={focused === 'email' ? editProfileStyle.inputOnFocus : editProfileStyle.input}
                placeholder='Email'
                onFocus={() => setFocused('email')}
                value={email}
                onChangeText={setEmail}
              />
              {/* <Text>New Password</Text>
              <TextInput
                secureTextEntry={true}
                style={focused === 'password' ? editProfileStyle.inputOnFocus : editProfileStyle.input}
                placeholder="New Password"
                onFocus={() => setFocused('password')}
                value={password}
                onChangeText={setPassword}
              /> */}
              <Text>Birth Date</Text>
              <View style={editProfileStyle.inputDate}>
                <DateField
                  labelDate="Birth date"
                  labelMonth="Birth month"
                  labelYear="Birth year"
                  onSubmit={(value) => setBirthDate(new Date(value))}
                  defaultValue={birthDate}
                  value={birthDate}
                />
              </View>
              <Text>Phone Number</Text>
              <TextInput
                keyboardType={phoneInput}
                style={focused === 'phoneNumber' ? editProfileStyle.inputOnFocus : editProfileStyle.input}
                placeholder='Phone Number'
                onFocus={() => setFocused('phoneNumber')}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
            <Text style={{marginHorizontal: 40}}>Avatar</Text>
            <View style={editProfileStyle.avatarContainer}>
              <TouchableOpacity onPress={() => setAvatar("airplane")}
              style={avatar === "airplane" ? editProfileStyle.avatarViewCheck : editProfileStyle.avatarView}>
                <Ionicons name="airplane" size={48} color={avatar === "airplane" ? "white" : "#0378a6"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAvatar("location")}
              style={avatar === "location" ? editProfileStyle.avatarViewCheck : editProfileStyle.avatarView}>
                <Ionicons name="location" size={48} color={avatar === "location" ? "white" : "#0378a6"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAvatar("boat")}
              style={avatar === "boat" ? editProfileStyle.avatarViewCheck : editProfileStyle.avatarView}>
                <Ionicons name="boat" size={48} color={avatar === "boat" ? "white" : "#0378a6"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAvatar("bus")}
              style={avatar === "bus" ? editProfileStyle.avatarViewCheck : editProfileStyle.avatarView}>
                <Ionicons name="bus" size={48} color={avatar === "bus" ? "white" : "#0378a6"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAvatar("car-sport")}
              style={avatar === "car-sport" ? editProfileStyle.avatarViewCheck : editProfileStyle.avatarView}>
                <Ionicons name="car-sport" size={48} color={avatar === "car-sport" ? "white" : "#0378a6"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAvatar("earth")}
              style={avatar === "earth" ? editProfileStyle.avatarViewCheck : editProfileStyle.avatarView}>
                <Ionicons name="earth" size={48} color={avatar === "earth" ? "white" : "#0378a6"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAvatar("fast-food")}
              style={avatar === "fast-food" ? editProfileStyle.avatarViewCheck : editProfileStyle.avatarView}>
                <Ionicons name="fast-food" size={48} color={avatar === "fast-food" ? "white" : "#0378a6"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAvatar("home")}
              style={avatar === "home" ? editProfileStyle.avatarViewCheck : editProfileStyle.avatarView}>
                <Ionicons name="home" size={48} color={avatar === "home" ? "white" : "#0378a6"} />
              </TouchableOpacity>
            </View>
            <View style={editProfileStyle.checkContainer}>
              <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={() => submit()}>
                <Ionicons name="checkmark" size={24} color="#0378a6" style={editProfileStyle.checkButton} />
              </TouchableOpacity>
            </View>
          </ScrollView>
            {loading ? (
                <View style={{width: "100%", height: "100%", position: "absolute", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(240, 240, 240, 0.5)"}}>
                  <Image source={loadingGif} />
                </View>
              ) : undefined}
          </View>
      
    </SafeAreaView>
  )
}
const editProfileStyle = StyleSheet.create({
  headerView: {
    width: "100%",
    height: 150,
    backgroundColor: "#72c1f2"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginHorizontal: 40,
    borderBottomColor: "#fff",
    borderBottomWidth: 1
  },
  inputDate: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 35,
    color: '#000',
    paddingHorizontal: 10,
    justifyContent: "center",
    marginVertical: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 40,
    color: '#000',
    paddingLeft: 10,
    marginVertical: 10
  },
  inputOnFocus: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 5,
    width: '100%',
    height: 40,
    color: '#000',
    paddingLeft: 10,
    borderBottomColor: "#72c1f2",
    borderBottomWidth: 3,
    marginVertical: 10
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginHorizontal: 40
  },
  avatarView: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    marginVertical: 10
  },
  avatarViewCheck: {
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#0378a6",
    borderRadius: 30,
    marginVertical: 10
  },
  checkContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 40,
    height:100,
  },
  checkButton: {
    fontSize: 32,
    backgroundColor: "#0378a6",
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 50
  }
})