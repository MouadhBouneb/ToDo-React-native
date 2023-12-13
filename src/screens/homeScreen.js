import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text ,TouchableOpacity, Animated} from 'react-native';
import {Calendar, LocaleConfig,Agenda} from 'react-native-calendars';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

const App = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [agendaItems, setAgendaItems] = useState({});
  const token = useSelector((state) => state?.auth?.token)

  useEffect(() => {
    const fetchTodoDates = async () => {
      try {
        const response = await axios.get('http://192.168.133.117:8000/api/to-do', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        const apiResponse = await response.data;

        const formattedDates = apiResponse.reduce((dates, item) => {
          const date = moment(item.date).format('YYYY-MM-DD');
          const color = getColorBasedOnState(item.state);

          dates[date] = {
            selected: true,
            marked: true,
            selectedColor: color,
            columnTitle: item.title,
          };    
          return dates;
        }, {});
        setMarkedDates(formattedDates);
        const agendaItemsData = apiResponse.reduce((items, item) => {
          const date = moment(item.date).format('YYYY-MM-DD');
          const existingItems = items[date] || [];
          existingItems.push({ name: item.title }); 
          items[date] = existingItems;
          return items;
        }, {});
        setAgendaItems(agendaItemsData);

        } catch (error) {
        console.error('Error fetching todo dates:', error);
      }
    };

    fetchTodoDates();
  }, []);

  const getColorBasedOnState = (state) => {
    switch (state) {
      case 0:
        return '#808080'; 
      case 1:
        return '#0000FF'; 
      case 2:
        return '#00FF00'; 
      default:
        return '#000000'; 
    }
  };
  const onDateChange = (date) => {
    setModalVisible(true);
    setSelectedDate(date);
  };
  return (
    <SafeAreaView style={styles.container}>
      
        <Text style={styles.titleStyle}>My To Do Calendar</Text>
        {/* <Calendar
          startFromMonday={true}
          minDate={new Date(2018, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
          months={[
            'January',
            'Febraury',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
          previousTitle="Previous"
          nextTitle="Next"
          todayBackgroundColor="#e6ffe6"
          selectedDayColor="#66ff33"
          selectedDayTextColor="#000000"
          scaleFactor={375}
          modalContent={'test'}
          textStyle={{
            fontFamily: 'Cochin',
            color: '#000000',
          }}
          markedDates={markedDates}
                  onDateChange={onDateChange}
        /> */}
        <Agenda
        items={agendaItems}
        markedDates={markedDates}
        onDateChange={onDateChange}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.agendaItemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
        <View style={styles.textStyle}></View>
     
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  agendaItemText: {
    color: '#000000',
    fontSize: 16,
    marginTop: 60,
  },
});

export default App;