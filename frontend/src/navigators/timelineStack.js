import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Timeline from "../screens/timeline/timeline";

const Stack = createNativeStackNavigator();
const StatStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Timeline"
				options={{
					headerStyle: { backgroundColor: "#6096ba" },
					headerTintColor: "#FFF",
					headerTitleStyle: {
						fontWeight: "600",
						fontSize: 18,
					},
				}}
			>
				{(props) => <Timeline {...props} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

export default StatStack;
