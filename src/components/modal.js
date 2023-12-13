import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch ,useSelector} from 'react-redux';
import { getTasks, createTask } from '../services/taskService';
import { selectTasks, setTasks } from '../slices/taskSlice';

const AddTaskModal = ({ state }) => {
    const dispatch = useDispatch();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const tasks = useSelector(selectTasks);

    const fetchTasks = async () => {
        try {
            const fetchedTasks = await getTasks(state);
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
                title: newTaskTitle,
            };
            await createTask(newTask);
            fetchTasks();
            toggleModal();
            setNewTaskTitle('');
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };



    return (
        <View>
            <TouchableOpacity style={styles.floatingButton} onPress={toggleModal}>
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.tasktTitleContainer}><Text style={{ ...styles.primaryTouchable, backgroundColor: "white", color: "#002551", fontWeight: "bold" }} >New Task</Text></View>
                        <TextInput
                            multiline
                            placeholder="Task Title"
                            style={{ width: 250, height: 200, flexWrap: 'wrap', textAlignVertical: 'top', backgroundColor: "rgba(32,32,32,0.05)", borderRadius: 14, marginVertical: 4, padding: 16, justifyContent: "flex-start", alignItems: "flex-start" }}
                            value={newTaskTitle}
                            onChangeText={(text) => setNewTaskTitle(text)}
                        />
                        <TouchableOpacity style={{ marginVertical: 15 }} onPress={handleCreateTask}><Text style={styles.primaryTouchable}>Create Task</Text></TouchableOpacity>
                        <Button color="red" title="Cancel" onPress={toggleModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({


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

export default AddTaskModal;
