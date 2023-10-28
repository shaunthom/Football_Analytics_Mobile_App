import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Roster from "../screens/roster/roster";

const Stack = createNativeStackNavigator();
const RosterStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Roster"
				options={{
					headerStyle: { backgroundColor: "#6096ba" },
					headerTintColor: "#FFF",
					headerTitleStyle: {
						fontWeight: "600",
						fontSize: 18,
					},
				}}
			>
				{(props) => <Roster {...props} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

export default RosterStack;
