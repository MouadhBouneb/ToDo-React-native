import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

const HomeScreen = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchTodoDates = async () => {
      try {
        const response = await fetch('http://192.168.160.163:8000/api/to-do');
        const apiResponse = await response.json();

        const formattedDates = apiResponse.map((item) => {
          const date = moment(item.date).format('YYYY-MM-DD');
          return { [date]: { selected: true, marked: true, selectedColor: '#7300e6' } };
        });

        const mergedDates = Object.assign({}, ...formattedDates);
        setMarkedDates(mergedDates);
      } catch (error) {
        console.error('Error fetching todo dates:', error);
      }
    };

    fetchTodoDates();
  }, []);

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <CalendarPicker
        onDateChange={onDateChange}
        selectedStartDate={selectedDate}
        selectedEndDate={selectedDate}
        previousTitle="Previous"
        nextTitle="Next"
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
        markedDates={markedDates}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
