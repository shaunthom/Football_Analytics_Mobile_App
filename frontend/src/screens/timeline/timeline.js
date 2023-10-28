import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  ScrollView,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const sampleData = [
    {
        id: 1,
        gameid: "2023-03-17-BUF-PIT",
        timeStamp: '00:05',
        playerName: 'Josh Allen',
        sentiment: 'positive',
        rating: 8.5,
        highlightText: 'Touchdown pass to Gronkowski!',
        highlightVideo: 'https://www.example.com/highlight1.mp4',
        commentRole: "ATT",
        commentBy: "Parth Sonkhia",
        impact : 10
      },
      {
        id: 2,
        gameid: "2023-03-17-BUF-PIT",
        timeStamp: '00:07',
        playerName: 'Matt Milano',
        sentiment: 'negative',
        rating: 2.0,
        highlightText: 'Bad defense!',
        highlightVideo: 'https://www.example.com/highlight1.mp4',
        commentRole: "DEF",
        commentBy: "Tanmay",
        impact : 10
      },
      {
        id: 3,
        gameid: "2023-03-17-BUF-PIT",
        timeStamp: '00:10',
        playerName: 'Josh Allen',
        sentiment: 'negative',
        rating: 4.5,
        highlightText: 'Interception by the defense!',
        highlightVideo: 'https://www.example.com/highlight2.mp4',
        commentRole: "ATT",
        commentBy: "Parth Sonkhia",
        impact : 4
      },
      {
        id: 4,
        gameid: "2023-03-17-BUF-PIT",
        timeStamp: '00:15',
        playerName: 'Josh Allen',
        sentiment: 'neutral',
        rating: 5.5,
        highlightText: 'Incomplete pass to Diggs!',
        highlightVideo: 'https://www.example.com/highlight3.mp4',
        commentRole: "ATT",
        commentBy: "Parth Sonkhia",
        impact : 8
      },
      {
        id: 5,
        gameid: "2023-03-17-BUF-PIT",
        timeStamp: '00:20',
        playerName: 'Josh Allen',
        sentiment: 'positive',
        rating: 7.5,
        highlightText: 'Touchdown pass to Diggs!',
        highlightVideo: 'https://www.example.com/highlight4.mp4',
        commentRole: "ATT",
        commentBy: "Parth Sonkhia",
        impact : 7
      },
];


const TimelineItem = ({ timeStamp, playerName, sentiment, rating, highlightText, highlightVideo, index }) => {
  const sentimentColor = () => {
    switch (sentiment) {
      case 'positive':
        return '#00C48C';
      case 'negative':
        return '#FF3D71';
      case 'neutral':
        return '#B0B0B0';
      default:
        return '#B0B0B0';
    }
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
        delay: index * 100,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
        delay: index * 100,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={[styles.sentimentIndicator, { backgroundColor: sentimentColor() }]} />
      <View style={styles.card}>
        <Text style={styles.timeStamp}>{
          timeStamp}</Text>
          <Text style={styles.playerName}>{playerName}</Text>
          <Text style={styles.highlightText}>{highlightText}</Text>
          <Text style={styles.ratingText}>Rating: {rating}</Text>
          <TouchableOpacity style={styles.highlightButton} onPress={() => {}}>
            <Ionicons name="play-circle-outline" size={20} color="#147efb" />
            <Text style={styles.highlightButtonText}>Watch highlight</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      );
      };
      
      const FilterButtons = ({ title, options, selectedOption, onSelect }) => (
      <View style={styles.filterButtonsContainer}>
      <Text style={styles.filterButtonsTitle}>{title}</Text>
      <View style={styles.filterButtons}>
      {options.map((option) => (
      <TouchableOpacity
      key={option}
      style={[
      styles.filterButton,
      selectedOption === option && styles.activeFilterButton,
      ]}
      onPress={() => onSelect(option)}
      accessibilityLabel={option}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selectedOption === option }}
      >
      <Text
      style={[
      styles.filterButtonText,
      selectedOption === option && styles.activeFilterButtonText,
      ]}
      >
      {option}
      </Text>
      </TouchableOpacity>
      ))}
      </View>
      </View>
      );
      
      const Timeline = () => {
      const [searchText, setSearchText] = useState('');
      const [sortBy, setSortBy] = useState('');
      const [sortOrder, setSortOrder] = useState('');
      const [filterByRole, setFilterByRole] = useState('');
      const [filterByUser, setFilterByUser] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      
      const commentRoles = useMemo(() => {
      const roles = new Set(sampleData.map((item) => item.commentRole));
      return ['All', ...Array.from(roles)];
      }, []);
      
      const commentUsers = useMemo(() => {
      const users = new Set(sampleData.map((item) => item.commentBy));
      return ['All', ...Array.from(users)];
      }, []);
      
      const filteredData = useMemo(() => {
      let data = [...sampleData];
      if (searchText) {
      data = data.filter((item) =>
      item.playerName.toLowerCase().includes(searchText.toLowerCase())
      );
      }
      if (filterByRole && filterByRole !== 'All') {
      data = data.filter((item) => item.commentRole === filterByRole);
      }
      if (filterByUser && filterByUser !== 'All') {
      data = data.filter((item) => item.commentBy === filterByUser);
      }
      if (sortBy) {
      if (sortBy === 'rating') {
      data.sort((a, b) =>
      sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating
      );
      } else if (sortBy === 'sentiment') {
      const sentimentOrder = { positive: 3, neutral: 2, negative: 1 };
      data.sort((a, b) =>
      sortOrder === 'asc'
      ? sentimentOrder[a.sentiment] - sentimentOrder[b.sentiment]
      : sentimentOrder[b.sentiment] - sentimentOrder[a.sentiment]
      );
      }
      } else {
      data.sort((a, b) => a.timeStamp.localeCompare(b.timeStamp));
      }
      return data;
      }, [searchText, sortBy, sortOrder, filterByRole, filterByUser]);
      
      const handleSortBy = (value) => {
      setSortBy(value);
      sortOrder === 'asc' ? setSortOrder('desc') : setSortOrder('asc');
    };
    
    const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
    setIsLoading(false);
    }, 1000);
    };
    
    return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Text style={styles.title}>Game Highlights</Text>
    <TextInput
           style={styles.searchBar}
           onChangeText={setSearchText}
           value={searchText}
           placeholder="Search by player name"
           returnKeyType="search"
         />
    </View>
    <ScrollView>
    <View style={styles.filtersContainer}>
    <FilterButtons
             title="Role:"
             options={commentRoles}
             selectedOption={filterByRole}
             onSelect={setFilterByRole}
           />
    <FilterButtons
             title="User:"
             options={commentUsers}
             selectedOption={filterByUser}
             onSelect={setFilterByUser}
           />
    </View>
    <View style={styles.sortContainer}>
    <Text style={styles.sortText}>Sort by:</Text>
    <TouchableOpacity
    onPress={() => handleSortBy('rating')}
    style={[
    styles.sortButton,
    sortBy === 'rating' && styles.activeSortButton,
    ]}
    accessibilityLabel="Sort by rating"
    accessibilityRole="button"
    >
    <Text
    style={[
    styles.sortButtonText,
    sortBy === 'rating' && styles.activeSortButtonText,
    ]}
    >
    Rating {sortBy === 'rating' && (sortOrder === 'asc' ? '▲' : '▼')}
    </Text>
    </TouchableOpacity>
    <TouchableOpacity
    onPress={() => handleSortBy('sentiment')}
    style={[
    styles.sortButton,
    sortBy === 'sentiment' && styles.activeSortButton,
    ]}
    accessibilityLabel="Sort by sentiment"
    accessibilityRole="button"
    >
    <Text
    style={[
    styles.sortButtonText,
    sortBy === 'sentiment' && styles.activeSortButtonText,
    ]}
    >
    Sentiment {sortBy === 'sentiment' && (sortOrder === 'asc' ? '▲' : '▼')}
    </Text>
    </TouchableOpacity>
    </View>
    <View style={styles.timeline}>
    <FlatList
    data={filteredData}
    renderItem={({ item, index }) => (
    <TimelineItem
    key={item.id.toString()}
    {...item}
    index={index}
    highlightVideo={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'} // just a sample link
    />
    )}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={styles.timeline}
    onRefresh={handleRefresh}
    refreshing={isLoading}
    />
    </View>
    </ScrollView>
    </View>
    );
    };
    
    const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    },
    header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    },
    searchBar: {
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    },
    sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    },
    
    
    
    sortText: {
      fontSize: 16,
      fontWeight: 'bold',
      },
      sortButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: '#F2F2F2',
      flexDirection: 'row',
      alignItems: 'center',
      },
      sortButtonText: {
      fontSize: 16,
      color: '#000000',
      marginLeft: 4,
      },
      activeSortButton: {
      backgroundColor: '#147efb',
      },
      activeSortButtonText: {
      color: '#ffffff',
      },
      timeline: {
      flex: 1,
      padding: 16,
      },
      itemContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 24,
      },
      sentimentIndicator: {
      width: 4,
      height: 40,
      borderRadius: 2,
      marginRight: 16,
      },
      card: {
      flex: 1,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      },
      timeStamp: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 4,
      },
      playerName: {
      fontSize: 14,
      fontStyle: 'italic',
      marginBottom: 4,
      },
      highlightText: {
      fontSize: 14,
      marginBottom: 4,
      },
      ratingText: {
      fontSize: 14,
      marginBottom: 4,
      fontWeight: 'bold',
      },
      highlightButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      },
      highlightButtonText: {
      marginLeft: 8,
      fontSize: 16,
      color: '#147efb',
      },
      filtersContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 16,
      paddingVertical: 8,
      },
      filterButtonsContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      },
      filterButtonsTitle: {
      fontWeight: 'bold',
      fontSize: 14,
      marginBottom: 4,
      },
      filterButtons: {
      flexDirection: 'row',
      },
      filterButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#147efb',
      backgroundColor: 'transparent',
      marginLeft: 4,
      },
      filterButtonText: {
      fontSize: 14,
      color: '#147efb',
      },
      activeFilterButton: {
      backgroundColor: '#147efb',
      },
      activeFilterButtonText: {
      color: '#ffffff',
      },
      });
      
      export default Timeline;