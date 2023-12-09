import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateTask } from '../slices/taskSlice';
import Toast from 'react-native-toast-message';

const EditScreen = ({ route, navigation }) => {
  const { id: taskId, title: defaultTitle, status: defaultCompleted } = route.params;
  const [title, setTitle] = useState(defaultTitle);
  const [completed, setCompleted] = useState(defaultCompleted);
  const dispatch = useDispatch();

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      position: 'top',
      text1: text1,
      text2: text2,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  const handleSave = async () => {
    try {
      dispatch(updateTask({ id: taskId, title, completed }));
      showToast('success', 'Task Updated', 'Task details have been updated successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating task:', error);
      showToast('error', 'Error', 'Failed to update task. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <View style={styles.switchContainer}>
        <Text>Completed</Text>
        <Switch
          value={completed}
          onValueChange={(value) => setCompleted(value)}
        />
      </View>
      <Button title="Save" onPress={handleSave} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: '80%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});

export default EditScreen;
