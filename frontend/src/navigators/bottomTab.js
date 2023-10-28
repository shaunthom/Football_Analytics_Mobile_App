import React from "react";
import { View, Text, Platform, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import RosterStack from "./rosterStack";
import ProfileStack from "./profileStack";
import RecordStack from "./recordStack";
import StatStack from "./statStack";
import HistoryStack from "./historyStack";
import TimelineStack from "./timelineStack";
import PlaybookStack from "./playbookStack";

const Tab = createBottomTabNavigator();

export default function BottomTab(props) {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: "#6096ba",
					height: Platform.OS === "ios" ? 90 : 65,
				},
				headerShown: false,
			}}
		>
			<Tab.Screen
				name="Record tab"
				component={RecordStack}
				options={{
					tabBarLabel: ({ focused }) =>
						focused ? (
							<Text
								style={{
									fontWeight: "700",
									color: "white",
									fontSize: 13,
									paddingBottom: 5,
								}}
							>
								Record
							</Text>
						) : (
							<Text
								style={{ fontSize: 12, color: "#edf2fb", paddingBottom: 5 }}
							>
								Record
							</Text>
						),
					tabBarIcon: ({ focused }) =>
						focused ? (
							<View style={styles.iconContainer}>
								<Feather
									name="mic"
									size={23}
									color="white"
									style={{ paddingTop: 5 }}
								/>
							</View>
						) : (
							<View>
								<Feather
									name="mic"
									size={20}
									color="#edf2fb"
									style={{ paddingTop: 5 }}
								/>
							</View>
						),
				}}
			/>
			<Tab.Screen
				name="Statistics tab"
				component={StatStack}
				options={{
					tabBarLabel: ({ focused }) =>
						focused ? (
							<Text
								style={{
									fontWeight: "700",
									color: "white",
									fontSize: 13,
									paddingBottom: 5,
								}}
							>
								Stats
							</Text>
						) : (
							<Text
								style={{ fontSize: 12, color: "#edf2fb", paddingBottom: 5 }}
							>
								Stats
							</Text>
						),
					tabBarIcon: ({ focused }) =>
						focused ? (
							<View style={styles.iconContainer}>
								<Ionicons name="stats-chart-outline" size={23} color="white" />
							</View>
						) : (
							<View>
								<Ionicons
									name="stats-chart-outline"
									size={20}
									color="#edf2fb"
								/>
							</View>
						),
				}}
			/>
			<Tab.Screen
				name="Timeline tab"
				component={TimelineStack}
				options={{
					tabBarLabel: ({ focused }) =>
						focused ? (
							<Text
								style={{
									fontWeight: "700",
									color: "white",
									fontSize: 13,
									paddingBottom: 5,
								}}
							>
								Timeline
							</Text>
						) : (
							<Text
								style={{ fontSize: 12, color: "#edf2fb", paddingBottom: 5 }}
							>
								Timeline
							</Text>
						),
					tabBarIcon: ({ focused }) =>
						focused ? (
							<View style={styles.iconContainer}>
								<Entypo name="time-slot" size={23} color="white" />
							</View>
						) : (
							<View>
								<Entypo name="time-slot" size={20} color="#edf2fb" />
							</View>
						),
				}}
			/>
			<Tab.Screen
				name="Roster tab"
				component={RosterStack}
				options={{
					tabBarLabel: ({ focused }) =>
						focused ? (
							<Text
								style={{
									fontWeight: "700",
									color: "white",
									fontSize: 13,
									paddingBottom: 5,
								}}
							>
								Roster
							</Text>
						) : (
							<Text
								style={{ fontSize: 12, color: "#edf2fb", paddingBottom: 5 }}
							>
								Roster
							</Text>
						),
					tabBarIcon: ({ focused }) =>
						focused ? (
							<View style={styles.iconContainer}>
								<Entypo name="users" size={23} color="white" />
							</View>
						) : (
							<View>
								<Entypo name="users" size={20} color="#edf2fb" />
							</View>
						),
				}}
			/>
			<Tab.Screen
				name="Playbook tab"
				component={PlaybookStack}
				options={{
					tabBarLabel: ({ focused }) =>
						focused ? (
							<Text
								style={{
									fontWeight: "700",
									color: "white",
									fontSize: 13,
									paddingBottom: 5,
								}}
							>
								Plays
							</Text>
						) : (
							<Text
								style={{ fontSize: 12, color: "#edf2fb", paddingBottom: 5 }}
							>
								Plays
							</Text>
						),
					tabBarIcon: ({ focused }) =>
						focused ? (
							<View style={styles.iconContainer}>
								<MaterialCommunityIcons name="strategy" size={23} color="white" />
							</View>
						) : (
							<View>
								<MaterialCommunityIcons name="strategy" size={20} color="#edf2fb" />
							</View>
						),
				}}
			/>
			<Tab.Screen
				name="History tab"
				component={HistoryStack}
				options={{
					tabBarLabel: ({ focused }) =>
						focused ? (
							<Text
								style={{
									fontWeight: "700",
									color: "white",
									fontSize: 13,
									paddingBottom: 5,
								}}
							>
								History
							</Text>
						) : (
							<Text
								style={{ fontSize: 12, color: "#edf2fb", paddingBottom: 5 }}
							>
								History
							</Text>
						),
					tabBarIcon: ({ focused }) =>
						focused ? (
							<View style={styles.iconContainer}>
								<MaterialIcons name="history" size={27} color="white" />
							</View>
						) : (
							<View>
								<MaterialIcons name="history" size={24} color="#edf2fb" />
							</View>
						),
				}}
			/>
			<Tab.Screen
				name="Profile tab"
				children={() => (
					<ProfileStack
						loggedIn={props.loggedIn}
						setLoggedIn={props.setLoggedIn}
					/>
				)}
				options={{
					tabBarLabel: ({ focused }) =>
						focused ? (
							<Text
								style={{
									fontWeight: "700",
									color: "white",
									fontSize: 13,
									paddingBottom: 5,
								}}
							>
								Profile
							</Text>
						) : (
							<Text
								style={{ fontSize: 12, color: "#edf2fb", paddingBottom: 5 }}
							>
								Profile
							</Text>
						),
					tabBarIcon: ({ focused }) =>
						focused ? (
							<View style={styles.iconContainer}>
								<AntDesign
									name="user"
									size={23}
									color="white"
									style={{ paddingTop: 5 }}
								/>
							</View>
						) : (
							<View>
								<AntDesign
									name="user"
									size={20}
									color="#edf2fb"
									style={{ paddingTop: 5 }}
								/>
							</View>
						),
				}}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	iconContainer: {
		flex: 1,
		width: "80%",
		borderTopWidth: 4,
		alignItems: "center",
		justifyContent: "center",
		borderColor: "#003f88",
	},
});
