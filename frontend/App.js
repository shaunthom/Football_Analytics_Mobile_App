import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTab from "./src/navigators/bottomTab";
import Login from "./src/screens/login/login";
import Register from "./src/screens/register/register";

/*
Usestate - a listener function - used to update when profile stats are inputted
also checks if token has been generated
global variable - counter number
*/
const Stack = createNativeStackNavigator();
global.counter_no = 1;
export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			SecureStore.getItemAsync("token")
				.then((res) => {
					if (res !== null) {
						setLoggedIn(true);
					} else {
						setLoggedIn(false);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchData();
	}, []);
/*
signup page comin up
*/
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				{!loggedIn ? (
					<Stack.Navigator>
						<Stack.Screen
							name="Sign Up"
							options={{
								headerStyle: { backgroundColor: "#6096ba" },
								headerTintColor: "#FFF",
								headerTitleStyle: {
									fontWeight: "600",
									fontSize: 18,
								},
							}}
						>
							{(props) => <Register {...props} setLoggedIn={setLoggedIn} />}
						</Stack.Screen>
						<Stack.Screen
							name="Login"
							options={{
								headerStyle: { backgroundColor: "#6096ba" },
								headerTintColor: "#FFF",
								headerTitleStyle: {
									fontWeight: "600",
									fontSize: 18,
								},
							}}
						>
							{(props) => <Login {...props} setLoggedIn={setLoggedIn} />}
						</Stack.Screen>
					</Stack.Navigator>
				) : (
					<BottomTab loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
				)}
			</NavigationContainer>
		</SafeAreaProvider>
	);
}

/*
This is the first page
*/