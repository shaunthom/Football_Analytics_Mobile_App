import React, { useState } from "react";
import {
	View,
	StyleSheet,
	TextInput,
	Text,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import Button from "../../components/button";
import Label from "../../components/label";
import axios from "axios";
/*
SecureStore from 'expo-secure-store': This provides a secure way to store sensitive data, like tokens.
*/
import * as SecureStore from "expo-secure-store";

/*
axios - a package in JS for sending data, sends the data(login credentials)
if it's wrong, err catches it
*/

/*
navigation: Typically comes from React Navigation and helps in navigating between different screens.
route: This is another prop usually provided by React Navigation, containing various details about the current route/screen.
setLoggedIn: This is a function prop. It's intended to be called with a boolean argument to update the user's login status.
*/

const Login = ({ navigation, route, setLoggedIn }) => {

/*
These lines use the useState hook to declare and initialize local state variables:

email and setEmail: Used to store and update the user's email input.
password and setPassword: Used to store and update the user's password input.
validEmail and setValidEmail: A boolean state that represents whether the entered email is valid. It initializes to true.
validPassword and setValidPassword: A boolean state that checks if the password entered is valid. It also initializes to true
*/

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validEmail, setValidEmail] = useState(true);
	const [validPassword, setValidPassword] = useState(true);

/*
This function handles the login action. When invoked, it will send the user's email and password to a server endpoint for authentication.
*/
	const actionLogin = () => {
		const baseURL =
			"https://data.mongodb-api.com/app/data-ahunl/endpoint/user/login";
		const data = {
			email,
			password,
		};
		axios({
			method: "post",
			url: baseURL,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		})
/*
If the request is successful and the server responds, the .then() callback is executed. The function expects 
to receive a token in the response, which it passes to the saveToken function (not shown in the provided code).
If there's an error (like network issues, server errors, or invalid credentials), the .catch() callback is executed
to log the error to the console.
*/

			.then((response) => {
				saveToken(response.data.token);
			})
			.catch((err) => {
				console.error(err);
			});
	};
/*
SecureStore is a part of the Expo framework and provides a way to securely store key-value pairs in a way that is encrypted and sandboxed.
In this line:

setItemAsync is a method to save a key-value pair.
"token" is the key under which the value will be saved.
token (the parameter passed into the function) is the value to be stored.
This is an asynchronous operation, which returns a promise. 


Once the token is successfully saved, the .then() callback is triggered. Here, the state updater function setLoggedIn is called with the
argument true, indicating that the user is now logged in. The res parameter is the result of the setItemAsync promise. However, since 
setItemAsync doesn't provide any significant resolved value, res isn't utilized within the callback.
*/
	const saveToken = async (token) => {
		SecureStore.setItemAsync("token", token)
			.then((res) => setLoggedIn(true))
			.catch((err) => console.log(err));
	};

/*
password validations coming up
*/

	const validation = () => {
		const emailregex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		let valid = 0;
		// email check
		if (email == "") {
			setValidEmail(false);
			valid -= 1;
		} else if (!emailregex.test(email)) {
			setValidEmail(false);
			valid -= 1;
		} else {
			setValidEmail(true);
		}
		// password check
		if (password == "" || password.length < 6) {
			setValidPassword(false);
			valid -= 1;
			setPassword("");
		} else {
			setValidPassword(true);
		}
		if (valid === 0) {
			actionLogin();
		}
	};

/*
The <TouchableWithoutFeedback> component is a wrapper that doesn't render any visible UI, but captures touch events. Here, it's being used to 
dismiss the keyboard when the user taps outside of the text input fields. The onPress prop is set to Keyboard.dismiss, 
which is a method from React Native's Keyboard API to hide the keyboard.
*/

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Label text="Email" />
				<TextInput
					style={
						validEmail
							? styles.textBoxStyle
							: [styles.textBoxStyle, { borderColor: "red" }]
					}
					onChangeText={setEmail}
					value={email}
				/>
				<Label text="Password" />
				<TextInput
					secureTextEntry={true}
					style={
						validPassword
							? styles.textBoxStyle
							: [styles.textBoxStyle, { borderColor: "red" }]
					}
					onChangeText={setPassword}
					value={password}
				/>
				<Button
					text="GO"
					marginTop={80}
					onButtonPress={validation}
					textStyle={{ color: "#FFF" }}
					buttonStyle={{
						backgroundColor: "#6096ba",
						borderWidth: 0,
						width: "60%",
					}}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	textStyle: {
		fontWeight: "bold",
		fontSize: 20,
	},
	textBoxStyle: {
		height: 50,
		borderWidth: 1,
		width: "80%",
		borderRadius: 10,
		paddingHorizontal: 10,
	},
	selectionButton: {
		height: 50,
		borderWidth: 1,
		width: "80%",
		borderRadius: 10,
		paddingHorizontal: 10,
		backgroundColor: "transparent",
	},
	selectionDropdown: {
		borderWidth: 1,
		width: "80%",
		borderRadius: 10,
		paddingHorizontal: 10,
	},
});

export default Login;
