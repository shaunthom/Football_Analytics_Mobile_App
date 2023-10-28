import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Playbook from "../screens/playbook/playbook";

const Stack = createNativeStackNavigator();
const PlaybookStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Plays"
				options={{
					headerStyle: { backgroundColor: "#6096ba" },
					headerTintColor: "#FFF",
					headerTitleStyle: {
						fontWeight: "600",
						fontSize: 18,
					},
				}}
			>
				{(props) => <Playbook {...props} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

export default PlaybookStack;
