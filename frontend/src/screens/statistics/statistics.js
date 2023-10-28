import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Button,
  Switch,
} from "react-native";
import axios from "axios";

const SampleAdvancedData = {'Score by Quarter': {'1st Quarter': 72.0, '2nd Quarter': 148.0, '3rd Quarter': 147.0, '4th Quarter': 51.0}, 'Total Yards': 418.0, 'Passing Yards': 207.0, 'Rushing Yards': 161.0, 'First Downs': 44, 'Turnovers': 2, 'Fumbles Lost': 1, 'Interceptions Thrown': 1, 'Pass Completion Percentage': 0.45, '3rd Down Efficiency': 0.0, '4th Down Efficiency': 0.0, 'Run/Pass Ratio': {'Run': 0.67, 'Pass': 0.32}, 'Play Direction Tendencies': {'Left': 0.48, 'Right': 0.51}, 'Motion Tendencies': {'Right': 0.88, 'Left': 0.11}, 'Rushing plays direction': {'Right': 22, 'Left': 16}, 'Passing plays direction': {'Right': 5, 'Left': 7}, 'Short passes': 26, 'Medium passes': 4, 'Deep passes': 1, 'Coaches Tendencies': {'Left': 42, 'Balance': 29, 'Right': 25}, 'Average Short Pass Distance': 8.76, 'Average Medium Pass Distance': 14.0, 'Average Deep Pass Distance': 22.0, 'Most Common Play Direction': 'R', 'Most Common Formation': 'Dart/Delt', 'Most Common Backfield': 'PAC', 'Average rush yards per attempt': 2.51, 'Average pass yards per attempt': 6.67, 'Rush percentage': 41.83, 'Pass percentage': 20.26, 'Attack patterns': {'Left': 46, 'Right': 49}}

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [stat_data, setData] = useState([]);
  const [showAdvancedStats, setShowAdvancedStats] = useState(false);

  const fetchData = () => {
    setLoading(true);
    const baseURL = "http://3.12.84.145/report?play=" + global.counter_no;
    axios({
      method: "get",
      url: baseURL,
    })
      .then((response) => {
        setData([response.data]);
		console.log(baseURL)
		console.log(response);
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
	try {
		console.log("IN REFRESH!!!!!!")
	  const response = await axios.get(
		"http://3.12.84.145/report?play=" + global.counter_no
	  );
	  setData([response.data]);
	  console.log("Success Refresh");
	} catch (error) {
	  console.log(error);
	}
  };
  const onRefresh = () => {
	setLoading(true);
	handleRefresh().finally(() => setLoading(false));
  };

  const toggleAdvancedStats = () => {
    setShowAdvancedStats(!showAdvancedStats);
  };

  const renderBasicStats = () => {
    return (
      // ... Basic stats components ...
	  <>
	  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>First Down Efficiency</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.first_down_efficiency}
		  </Text>
	  </View>
  </View>
  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Second Down Efficiency</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.second_down_efficiency.toFixed(
				  2
			  )}
		  </Text>
	  </View>
  </View>
  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Third Down Efficiency</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.third_down_efficiency}
		  </Text>
	  </View>
  </View>
  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Fourth Down Efficiency</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.fourth_down_efficiency}
		  </Text>
	  </View>
  </View>
  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Total Punts</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.n_punts}
		  </Text>
	  </View>
  </View>
  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Total Touchdowns</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.n_touchdowns}
		  </Text>
	  </View>
  </View>
  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Total Passing Yards</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.passing_yards}
		  </Text>
	  </View>
  </View>
  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Total Rushing Yards</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.rushing_yards}
		  </Text>
	  </View>
  </View>
  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Total First Downs</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.total_first_down}
		  </Text>
	  </View>
  </View>
  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Total Second Downs</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.total_second_down}
		  </Text>
	  </View>
  </View>
  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Total Third Downs</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.total_third_down}
		  </Text>
	  </View>
  </View>
  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Total Fourth Downs</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.total_fourth_down}
		  </Text>
	  </View>
  </View>
  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Total Plays</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.total_plays}
		  </Text>
	  </View>
  </View>
  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Total Yards</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.total_yards}
		  </Text>
	  </View>
  </View>
  <View style={[styles.container, { marginBottom: 10 }]}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Yards per Play</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {stat_data[0].result.statistics.yards_per_play}
		  </Text>
	  </View>
  </View>
  </>
    );
  };

  const renderAdvancedStats = () => {
    return (
      // Code to render advanced stats from sampleadvanced data
	  <>
	  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>First Quarter Score</Text>
	  </View>
	  <View style={styles.value}>
		  <Text style={styles.detailsText}>
			  {SampleAdvancedData['Score by Quarter']['1st Quarter']}
		  </Text>
	  </View>
  </View>
  <View style={styles.container}>
	  <View style={styles.label}>
		  <Text style={styles.labelText}>Second Quarter Score</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Score by Quarter']['2nd Quarter']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Third Quarter Score</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Score by Quarter']['3rd Quarter']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Fourth Quarter Score</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Score by Quarter']['4th Quarter']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Total Yards</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Total Yards']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Passing Yards</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Passing Yards']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Rushing Yards</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Rushing Yards']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>First Downs</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['First Downs']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Turnovers</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Turnovers']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Fumbles Lost</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Fumbles Lost']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Interceptions Thrown</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Interceptions Thrown']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Pass Completion Percentage</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Pass Completion Percentage']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>3rd Down Efficiency</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['3rd Down Efficiency']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>4th Down Efficiency</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['4th Down Efficiency']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Run Ration</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Run/Pass Ratio']['Run']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Pass Ration</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Run/Pass Ratio']['Pass']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Left Play Direction Tendencies</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Play Direction Tendencies']['Left']}
			</Text>
		</View>
	</View>

	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Right Play Direction Tendencies</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Play Direction Tendencies']['Right']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Left Motion Tendencies</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Motion Tendencies']['Left']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Right Motion Tendencies</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Motion Tendencies']['Right']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Let Rushing plays direction</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Rushing plays direction']['Left']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Right Rushing plays direction</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Rushing plays direction']['Right']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Left Passing plays direction</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Passing plays direction']['Left']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Right Passing plays direction</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Passing plays direction']['Right']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Short passes</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Short passes']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Medium passes</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Medium passes']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Deep passes</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Deep passes']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Left Coaches Tendencies</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Coaches Tendencies']['Left']}		
			</Text>	
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Right Coaches Tendencies</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Coaches Tendencies']['Right']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Balance Coaches Tendencies</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Coaches Tendencies']['Balance']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Average Short pass Distance</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Average Short Pass Distance']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Average Medium pass Distance</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Average Medium Pass Distance']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Average Deep pass Distance</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Average Deep Pass Distance']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Most Common Play Direction</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Most Common Play Direction']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Most Common Formation</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Most Common Formation']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Most Common Backfield</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Most Common Backfield']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Average rush yards per attempt</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Average rush yards per attempt']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Average pass yards per attempt</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Average pass yards per attempt']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Rush Percentage</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Rush percentage']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Pass Percentage</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Pass percentage']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Left Attack patterns</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Attack patterns']['Left']}
			</Text>
		</View>
	</View>
	<View style={styles.container}>
		<View style={styles.label}>
			<Text style={styles.labelText}>Right Attack patterns</Text>
		</View>
		<View style={styles.value}>
			<Text style={styles.detailsText}>
				{SampleAdvancedData['Attack patterns']['Right']}
			</Text>
		</View>
	</View>
  </>  

    );
  };

  return (
    <View style={styles.parentContainer}>
      {!loading ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Show Advanced Stats:</Text>
            <Switch
              onValueChange={toggleAdvancedStats}
              value={showAdvancedStats}
            />
          </View>
          <Button onPress={onRefresh} title="Refresh">
            Refresh
          </Button>
          {showAdvancedStats ? renderAdvancedStats() : renderBasicStats()}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#6096ba" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // ... Existing styles ...
  container: {
	flexDirection: "row",
	marginTop: 5,
	paddingHorizontal: 20,
	paddingVertical: 10,
	backgroundColor: "#fff",
	borderRadius: 8,
	marginBottom: 10,
  },
  label: {
	justifyContent: "center",
	width: "62%",
  },
  value: {
	width: "38%",
	justifyContent: "center",
	alignItems: "center",
  },
  detailsText: {
	fontSize: 15,
	fontWeight: "600",
	color: "#333",
  },
  labelText: {
	fontSize: 15,
	fontWeight: "700",
	color: "#333",
  },
  parentContainer: {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "#f0f0f0",
	padding: 16,
  },
  scrollViewContent: {
	paddingBottom: 20,
  },
  refreshButton: {
	backgroundColor: "#6096ba",
	borderRadius: 8,
	paddingVertical: 10,
	paddingHorizontal: 20,
	alignSelf: "flex-start",
	marginBottom: 20,
  },
  refreshButtonText: {
	color: "#fff",
	fontWeight: "bold",
	fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginRight: 5,
  },
});

export default Statistics;
