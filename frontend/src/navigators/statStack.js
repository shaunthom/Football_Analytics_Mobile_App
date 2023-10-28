import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Statistics from "../screens/statistics/statistics";

const Stack = createNativeStackNavigator();
const StatStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Statistics"
				options={{
					headerStyle: { backgroundColor: "#6096ba" },
					headerTintColor: "#FFF",
					headerTitleStyle: {
						fontWeight: "600",
						fontSize: 18,
					},
				}}
			>
				{(props) => <Statistics {...props} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

export default StatStack;
