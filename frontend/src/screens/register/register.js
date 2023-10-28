import React, { useState,useEffect } from "react";
import {
	View,
	StyleSheet,
	TextInput,
	Text,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Button from "../../components/button";
import Label from "../../components/label";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const Register = ({ navigation, route, setLoggedIn }) => {
	const roles = ["Offense Coach", "Defense Coach", "Head Coach", "Other"];
	const [team, setTeam] = useState([]);
	const [name, setName] = useState("");
	const [loaded, setLoaded] = useState(false);
	var teamlist=[]
	var teamabr=[]
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [role, setRole] = useState("");
	const [userteam,setUserTeam] = useState("");
	const [userteamAbr,setUserTeamAbr] = useState("");
	const [password, setPassword] = useState("");
	const [validName, setValidName] = useState(true);
	const [validEmail, setValidEmail] = useState(true);
	const [validPassword, setValidPassword] = useState(true);
	const [validPhone, setValidPhone] = useState(true);
	const [validRole, setValidRole] = useState(true);
	const [validTeam, setValidTeam] = useState(true);
	const baseURL = "https://data.mongodb-api.com/app/data-ahunl/endpoint";
	useEffect(() => {
		axios({
		  method: "get",
		  url: `${baseURL}/team_list`,
		})
		  .then((response) => {
			setTeam(response.data);
			for (let i=0;i<response.data.length;i++)
			{
				teamlist.push(response.data[i].name);
				teamabr.push(response.data[i].abbr);
			}
			console.log(response.data);
			console.log(teamlist);
			console.log(teamabr);
			setLoaded(true);
		  })
		  .catch((err) => {
			console.error(err);
		  });
	  }, []);
	const actionRegister = () => {
		const baseURL =
			"https://data.mongodb-api.com/app/data-ahunl/endpoint/user/register";
		const data = {
			name,
			email,
			phone,
			role,
			password,
			userteam,
			userteamAbr
		};
		console.log("This is data being send for registration: ",data)
		axios({
			method: "post",
			url: baseURL,
			headers: {
				"Content-Type": "application/json",
			},
			data: data,
		})
			.then(async (response) => {
				saveToken(response.data.token);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	const saveToken = async (token) => {
		SecureStore.setItemAsync("token", token)
			.then((res) => setLoggedIn(true))
			.catch((err) => console.log(err));
	};
	const actionSkip = () => {
		navigation.navigate("Login");
	};
	const validation = () => {
		const emailregex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
		const alph = /^[a-zA-Z]{2,40}$/;
		let valid = 0;
		// name check
		if (name == "") {
			valid -= 1;
			setValidName(false);
		}
		// else if (!alph.test(name)) {
		// 	valid -= 1;
		// 	setValidName(false);}
		else {
			valid += 1;
			setValidName(true);
		}
		// email check
		if (email == "") {
			valid -= 1;
			setValidEmail(false);
		} else if (!emailregex.test(email)) {
			valid -= 1;
			setValidEmail(false);
		} else {
			valid += 1;
			setValidEmail(true);
		}
		// password check
		if (password == "" || password.length < 6) {
			valid -= 1;
			setValidPassword(false);
			setPassword("");
		} else {
			valid += 1;
			setValidPassword(true);
		}
		// phone number check
		if (phone == "" || phone.length !== 10) {
			valid -= 1;
			setValidPhone(false);
		} else {
			valid += 1;
			setValidPhone(true);
		}
		// role check
		if (role == "") {
			valid -= 1;
			setValidRole(false);
		} else {
			valid += 1;
			setValidRole(true);
		}
		// team check
		if (userteam == ""){
			valid -= 1;
			setValidTeam(false);
		} else {
			valid += 1;
			setValidTeam(true);
		}

		if (valid === 6) {
			actionRegister();
		}
	};
	return (
		<ScrollView>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Label text="Name" />
				<TextInput
					style={
						validName
							? styles.textBoxStyle
							: [styles.textBoxStyle, { borderColor: "red" }]
					}
					onChangeText={setName}
					value={name}
				/>
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
				<Label text="Phone" />
				<TextInput
					style={
						validPhone
							? styles.textBoxStyle
							: [styles.textBoxStyle, { borderColor: "red" }]
					}
					onChangeText={setPhone}
					value={phone}
					keyboardType={"number-pad"}
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
				<Label text="Roles" />
				<SelectDropdown
					data={roles}
					rowTextForSelection={(item, index) => {
						return item;
					}}
					onSelect={(selectedItem, index) => {
						setRole(selectedItem);
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						return selectedItem;
					}}
					buttonStyle={styles.selectionButton}
					buttonTextStyle={styles.selectionButtonText}
					dropdownStyle={styles.selectionDropdown}
				/>
				{validRole ? (
					<View style={{ height: 20 }} />
				) : (
					<Text style={{ color: "red" }}>Please select a role</Text>
				)}
				<Label text="Team" />
				{loaded && (
				<SelectDropdown
					data={team}
					rowTextForSelection={(item, index) => {
						return item.name;
					}}
					onSelect={(selectedItem, index) => {
						setUserTeam(selectedItem.name);
						setUserTeamAbr(selectedItem.abbr);
					}}
					buttonTextAfterSelection={(selectedItem, index) => {
						return selectedItem.name;
					}}
					buttonStyle={styles.selectionButton}
					buttonTextStyle={styles.selectionButtonText}
					dropdownStyle={styles.selectionDropdown}
				/>)}
				{validTeam ? (
					<View style={{ height: 20 }} />
				) : (
					<Text style={{ color: "red" }}>Please select a team</Text>
				)}
				<Button
					text="GO"
					marginTop={60}
					onButtonPress={validation}
					buttonStyle={{ width: "60%" }}
				/>
				<Button
					text="Log In"
					marginTop={10}
					onButtonPress={actionSkip}
					textStyle={{ color: "#FFF" }}
					buttonStyle={{ backgroundColor: "#6096ba", borderWidth: 0 }}
				/>
			</View>
		</TouchableWithoutFeedback>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#FFFFFF",
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
		width: "80%",
		borderRadius: 10,
		paddingHorizontal: 10,
	},
});

export default Register;
