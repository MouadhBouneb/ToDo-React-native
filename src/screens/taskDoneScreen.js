import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, createTask, deleteTask } from '../services/taskService';
import { selectTasks, setTasks } from '../slices/taskSlice';
import CustomButton from '../components/customButton';
import AddTaskModal from '../components/modal';

const TaskDoneScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    fetchTasks();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Fetch data when the screen becomes focused
      fetchTasks();
    });

    // Cleanup the subscription when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, [navigation]);
  const fetchTasks = async () => {
    try {
      const fetchedTasks = await getTasks(2);
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
    <TouchableOpacity onPress={() => navigation.navigate('Task Detail', { ...item })}>
      <View style={styles.card}>
        <Text>{item.title}</Text>
        <View style={styles.actions}>
          <CustomButton title="Edit" onPress={() => navigation.navigate('Task Edit', { ...item })} style={styles.edit} />
          <CustomButton title="Detail" onPress={() => navigation.navigate('Task Detail', { ...item })} style={styles.detail} />
          <CustomButton title="Delete" onPress={() => handleDeleteTask(item.id)} style={styles.delete} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <AddTaskModal state={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  edit: {
    backgroundColor: '#FFD00C',
    color: '#FFFFFF',
    padding: 8,
  },
  detail: {
    backgroundColor: '#002551',
    color: '#FFFFFF',
    padding: 8,
  },
  delete: {
    backgroundColor: '#FA1111',
    color: '#FFFFFF',
    padding: 8,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
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
    marginTop: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#002551',
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

export default TaskDoneScreen;
