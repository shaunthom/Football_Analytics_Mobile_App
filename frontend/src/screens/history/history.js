import React, { useState,useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
export const History = () => {
	const [showTranscript, setShowTranscript] = useState(-1);
	const [showRecordingList, setShowRecordingList] = useState(-1);
	const [userHistory, setUserHistory] = useState([
		{ game: "Game 1", recordings: ["rec1", "rec2", "rec3"] },
	]);
	useEffect(() => {
		const fetchData = async () => {
			SecureStore.getItemAsync("token")
				.then((res) => {
					const baseURL =
						"https://data.mongodb-api.com/app/data-ahunl/endpoint/history?token=" +
						res;
					axios({
						method: "get",
						url: baseURL,
					})
						.then((response) => {
							setUserHistory(response.data);
						})
						.catch((err) => {
							console.error(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchData();
	}, []);

	const handleShowTranscript = (gameIndex, recordingIndex) => {
		if (showTranscript == recordingIndex) {
			setShowTranscript(-1);
		} else {
			setShowTranscript(recordingIndex);
		}
	};

	const handleShowRecordingList = (gameIndex) => {
		if (showRecordingList == gameIndex) {
			setShowRecordingList(-1);
		} else {
			setShowRecordingList(gameIndex);
		}
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View>
				{userHistory.map((obj, ind) => {
					return (
						<TouchableOpacity
							activeOpacity={0.6}
							key={ind}
							style={styles.mainBox}
							onPress={() => handleShowRecordingList(ind)}
						>
							<View style={styles.headerBox}>
								<Text style={styles.headerStyles}>{obj.game}</Text>
								<Entypo
									name={
										showRecordingList == ind ? "chevron-up" : "chevron-down"
									}
									size={24}
									color="black"
								/>
							</View>
							<View style={{ height: 10 }} />
							{showRecordingList == ind
								? obj.recordings.map((recording, i) => {
										return (
											<View key={i}>
												<View
													style={[
														styles.recordingBoxContainer,
														{ borderBottomWidth: 0 },
													]}
												>
													<Text style={styles.recordingNameText}>
														{recording.timestamp}
													</Text>
													<View style={styles.recordingButtonContainer}>
														<TouchableOpacity
															onPress={() => recording.sound.replayAsync()}
															style={styles.button}
														>
															<Feather name="play" size={26} color="green" />
														</TouchableOpacity>
														<TouchableOpacity
															onPress={() => handleShowTranscript(ind, i)}
															style={styles.button}
														>
															<MaterialIcons
																name="translate"
																size={26}
																color="black"
															/>
														</TouchableOpacity>
													</View>
												</View>
												{showTranscript == i ? (
													<View style={styles.transcriptBoxStyle}>
														<Text style={styles.transcriptBoxText}>
															{/* {recording.transcript} */}
															{recording.transcript}
														</Text>
													</View>
												) : null}
											</View>
										);
								  })
								: null}
						</TouchableOpacity>
					);
				})}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	mainBox: {
		borderBottomWidth: 1,
		width: "100%",
		paddingVertical: 7,
		paddingHorizontal: 15,
		marginTop: 7,
	},
	headerBox: {
		height: 30,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerStyles: {
		fontWeight: "700",
		fontSize: 17,
	},
	recordingBoxContainer: {
		padding: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 45,
	},
	recordingButtonContainer: {
		width: "30%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	transcriptBoxStyle: {
		padding: 5,
		justifyContent: "center",
		borderBottomWidth: 2,
		borderColor: "#6096ba",
	},
	transcriptBoxText: {
		fontSize: 17,
		fontWeight: "500",
	},
});
