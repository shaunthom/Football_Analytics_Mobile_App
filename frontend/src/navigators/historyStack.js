import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { History } from "../screens/history/history";

const Stack = createNativeStackNavigator();
const HistoryStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="History"
				options={{
					headerStyle: { backgroundColor: "#6096ba" },
					headerTintColor: "#FFF",
					headerTitleStyle: {
						fontWeight: "600",
						fontSize: 18,
					},
				}}
			>
				{(props) => <History {...props} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

export default HistoryStack;
