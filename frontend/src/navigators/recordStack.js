import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recording from "../screens/record/recording";

const Stack = createNativeStackNavigator();
const RecordStack = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Recording"
				options={{
					headerStyle: { backgroundColor: "#6096ba" },
					headerTintColor: "#FFF",
					headerTitleStyle: {
						fontWeight: "600",
						fontSize: 18,
					},
				}}
			>
				{(props) => <Recording {...props} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
};

export default RecordStack;
