import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/profile/profile";

const Stack = createNativeStackNavigator();
const ProfileStack = ({ loggedIn, setLoggedIn }) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Profile"
				options={{
					headerStyle: { backgroundColor: "#6096ba" },
					headerTintColor: "#FFF",
					headerTitleStyle: {
						fontWeight: "600",
						fontSize: 18,
					},
				}}
			>
				{(props) => (
					<Profile {...props} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
				)}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

export default ProfileStack;
