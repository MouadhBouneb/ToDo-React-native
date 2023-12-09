import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, createTask, deleteTask } from '../services/taskService';
import { selectTasks, setTasks } from '../slices/taskSlice';

const TaskInitScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks();
      dispatch(setTasks(fetchedTasks));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleCreateTask = async () => {
    try {
      const newTask = {
        userId: 1,
        title: newTaskTitle,
        completed: false,
      };
      await createTask(newTask);
      fetchTasks();
      toggleModal();
      setNewTaskTitle('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TaskDetail', { ...item })}>
      <View style={styles.card}>
        <Text>{item.title}</Text>
        <View style={styles.actions}>
          <Button title="Edit" onPress={() => navigation.navigate('TaskEdit', { ...item })} />
          <Button title="Detail" onPress={() => navigation.navigate('TaskDetail', { ...item })} />
          <Button title="Delete" onPress={() => handleDeleteTask(item.id)} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={toggleModal}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>New Task</Text>
            <TextInput
              placeholder="Task Title"
              value={newTaskTitle}
              onChangeText={(text) => setNewTaskTitle(text)}
            />
            <Button title="Create Task" onPress={handleCreateTask} />
            <Button title="Cancel" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#3498db',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  floatingButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default TaskInitScreen;
