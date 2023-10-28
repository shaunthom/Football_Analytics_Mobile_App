import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Profile from "../../components/profile";

export default function PlaybookList(props) {
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			style={styles.scrollViewStyle}
		>
			<View style={styles.container}>
				{props.data.map((obj, i) => {
					return (
						<Profile
							key={i}
							photo={obj.imageUrl}
							name={obj.name}
							jersey={obj.jersey}
							age={obj.age}
							weight={obj.weight}
							height={obj.height}
							position={obj.play_position}
						/>
					);
				})}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "center",
	},
	scrollViewStyle: {
		marginVertical: 10,
	},
});
