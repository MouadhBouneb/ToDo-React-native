import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateTaskStatus } from '../slices/taskSlice';

const DetailScreen = ({ route, navigation }) => {
  const { id: taskId, title: taskTitle, state: taskStatus } = route.params;
  const dispatch = useDispatch();

  const handleUpdateStatus = () => {
    dispatch(updateTaskStatus({ id: taskId, status: 1 }));
    // Additional logic if needed
  };

  return (
    <ScrollView style={styles.container}>
    <View style = {{flexDirection :'row', width :"60%"}}>
         <Text style = {{fontSize : 20,}}>ID: </Text>
         <Text style = {{fontSize : 22,fontWeight :'bold'}}>{taskId}</Text>
    </View>
    <View style = {{flexDirection :'row', width :"60%"}}>
         <Text style = {{fontSize : 20}}>Title: </Text>
         <Text style = {{fontSize : 22,fontWeight :'bold'}}>{taskTitle}</Text>
    </View>
    <View style = {{flexDirection :'row',width :"60%"}}>
         <Text style = {{fontSize : 20}}>Status: </Text>
         <Text style = {{fontSize : 22,fontWeight :'bold'}}> {taskStatus}</Text>
    </View>
  
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default DetailScreen;
