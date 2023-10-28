import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Header from "./header";

const Profile = (props) => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: props.photo }} style={styles.photo} />
			<View style={styles.rightBox}>
				<View style={styles.upperBox}>
					<View style={styles.nameBox}>
						<Text style={styles.nameText}>
							{props.jersey}
							{". "}
							{props.name}
						</Text>
					</View>
					<View style={styles.ageBox}>
						<Text style={styles.ageText}>Age: {props.age}</Text>
					</View>
				</View>
				<View style={styles.bottomBox}>
					<View style={styles.details}>
						<Text style={styles.detailsText}>Wt: {props.weight}</Text>
					</View>
					<View style={styles.divider} />
					<View style={styles.details}>
						<Text style={styles.detailsText}>Ht: {props.height}</Text>
					</View>
					<View style={styles.divider} />
					<View style={styles.details}>
						<Text style={styles.detailsText}>Pos: {props.position}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// borderWidth: 1,
		borderColor: "silver",
		width: "97%",
		height: 100,
		flexDirection: "row",
		marginBottom: 10,
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	photo: {
		borderColor: "silver",
		width: "25%",
		aspectRatio: 1,
		borderRadius: 50,
	},
	rightBox: {
		width: "70%",
		height: 80,
	},
	upperBox: {
		flexDirection: "row",
		height: 40,
		alignItems: "center",
	},
	nameBox: {
		width: "70%",
		padding: 5,
	},
	ageBox: {
		width: "25%",
		padding: 5,
	},
	bottomBox: {
		borderTopWidth: 1,
		borderColor: "silver",
		flexDirection: "row",
		alignItems: "center",
		height: 40,
	},
	details: {
		width: "33%",
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
	},
	nameText: {
		fontWeight: "600",
		fontSize: 16,
	},
	ageText: {
		fontWeight: "600",
	},
	detailsText: {
		fontSize: 13,
		fontWeight: "500",
	},
	divider: {
		borderLeftWidth: 1,
		borderColor: "silver",
		height: 20,
	},
});

export default Profile;
