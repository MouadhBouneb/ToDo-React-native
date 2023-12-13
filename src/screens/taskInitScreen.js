import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, createTask, deleteTask } from '../services/taskService';
import { selectTasks, setTasks } from '../slices/taskSlice';
import CustomButton from '../components/customButton';
import AddTaskModal from '../components/modal';

const TaskInitScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

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
      const fetchedTasks = await getTasks(0);
      dispatch(setTasks(fetchedTasks));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setNewTaskTitle("")
  };

  const handleCreateTask = async () => {
    try {
      const newTask = {
        userId: 1,
        title: newTaskTitle,
        state: 0
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
        <Text style={styles.textTask}>{item.title}</Text>
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
      <AddTaskModal state={0} />
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
  textTask: {
    color: '#A0A0A0',
    fontWeight: 'bold',
    padding: 4,
    fontSize: 18,
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
    width: "75%",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  primaryTouchable: {
    fontSize: 20,
    backgroundColor: "#002551",
    width: '100%', paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 4, color: 'white'
  },
  tasktTitleContainer: {
    justifyContent: 'center',
    alignItems: "center",
    marginBottom: "5%"
  }
});

export default TaskInitScreen;
