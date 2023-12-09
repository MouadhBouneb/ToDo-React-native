import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateTaskStatus } from '../slices/taskSlice';

const DetailScreen = ({ route, navigation }) => {
  const { id: taskId, title: taskTitle, status: taskStatus } = route.params;
  const dispatch = useDispatch();

  const handleUpdateStatus = () => {
    dispatch(updateTaskStatus({ id: taskId, status: 1 }));
    // Additional logic if needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Detail</Text>
      <Text>ID: {taskId}</Text>
      <Text>Title: {taskTitle}</Text>
      <Text>Status: {taskStatus}</Text>
      <Button title="Update Status" onPress={handleUpdateStatus} />
    </View>
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
