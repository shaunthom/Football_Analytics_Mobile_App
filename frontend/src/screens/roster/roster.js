import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, TextInput, Text, TouchableOpacity } from "react-native";
import PlayerList from "./playerList";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

/*
the player list is imported each time as a row in the roster table. So, the roster table contains player list as records.
*/



const Roster = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [role, setRole] = useState("");
  const [searchText, setSearchText] = useState('');
  const [arg1, setArg1] = useState('BUF');
  const [arg2, setArg2] = useState('ATT');

  const baseURL = "https://data.mongodb-api.com/app/data-ahunl/endpoint";


  /*
The roster "Buf" is updated
*/

  useEffect(() => {
    const fetchData = async () => {
      console.log("Getting Token");
			SecureStore.getItemAsync("token")
				.then((res) => {
          console.log("Got Token : ",res);
					const baseURL =
						"https://data.mongodb-api.com/app/data-ahunl/endpoint/userInfo?token=" +
						res;
					axios({
						method: "get",
						url: baseURL,
					})
						.then((response) => {
              console.log("Got User Details :- ",response.data);
							setRole(response.data.role);
              setArg1(response.data.teamAbr);
              if (response.data.role == "Offense Coach")
                setArg2('ATT');
              else if (response.data.role == "Defense Coach")
                setArg2('DEF');
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
    // axios({
    //   method: "get",
    //   url: `${baseURL}/roster_details?arg1=${arg1}&arg2=${arg2}`,
    // })
    //   .then((response) => {
    //     setData(response.data);
    //     console.log(response.data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }, [arg1]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}/roster_details?arg1=${arg1}&arg2=${arg2}`,
    })
      .then((response) => {
        setData(response.data);
        console.log("ROSTER DATA :- ",response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });

  },[arg1,arg2]);

  useEffect(() => {
    // Filter data based on searchText
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchText, data]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, arg2 === 'DEF' && styles.activeButton]}
          onPress={() => setArg2('DEF')}
        >
          <Text style={[styles.buttonText, arg2 === 'DEF' && styles.activeButtonText]}>
            DEF
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, arg2 === 'ATT' && styles.activeButton]}
          onPress={() => setArg2('ATT')}
        >
          <Text style={[styles.buttonText, arg2 === 'ATT' && styles.activeButtonText]}>
            ATT
          </Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search players..."
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
        </View>
      </View>
      {!loading ? (
        <PlayerList data={filteredData} />
      ) : (
        <ActivityIndicator size="large" color="#6096ba" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#6096ba',
    backgroundColor: '#fff',
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: '#6096ba',
    borderColor: '#6096ba',
  },
  buttonText: {
    color: '#6096ba',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeButtonText: {
    color: '#fff',
  },
  searchContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginLeft: 10,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 10,
  }
});

export default Roster;
