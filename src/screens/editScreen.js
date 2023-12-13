import React, { useState } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useDispatch } from 'react-redux';
import { updateTask } from '../slices/taskSlice';
import Toast from 'react-native-toast-message';

const EditScreen = ({ route, navigation }) => {
  const { id: taskId, title: defaultTitle, state: defaultCompleted } = route.params;
  const [title, setTitle] = useState(defaultTitle);
  const [completed, setCompleted] = useState(defaultCompleted == 2 ? true : false);
  const [inProgress, setinProgress] = useState(defaultCompleted == 1 ? true : false);
  const [init, setinit] = useState(defaultCompleted == 0 ? true : false);
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
      dispatch(updateTask({ id: taskId, title, status: completed ? 2 : init ? 0 : 1 }));
      showToast('success', 'Task Updated', 'Task details have been updated successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating task:', error);
      showToast('error', 'Error', 'Failed to update task. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: "8%" }} >
      <View style={styles.tasktTitleContainer}><Text style={{ ...styles.primaryTouchable, backgroundColor: "white", color: "#002551", fontWeight: "bold" }} >New Task</Text></View>
      <TextInput
        multiline
        placeholder="Task Title"
        style={{ width: 250, height: 200, flexWrap: 'wrap', textAlignVertical: 'top', backgroundColor: "rgba(32,32,32,0.05)", borderRadius: 14, marginVertical: 4, padding: 16, justifyContent: "flex-start", alignItems: "flex-start" }}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <View style={{ flexDirection: 'row', justifyContent: "space-evenly", width: "100%", marginTop: 18, marginBottom: 25 }}>
        <View style={styles.switchContainer}>
          <Text style={{ marginRight: 6 }}>To do</Text>
          <Checkbox
            value={init}
            onValueChange={(value) => { setinit(value), setinProgress(false), setCompleted(false) }}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={{ marginRight: 6 }}>In progress</Text>
          <Checkbox
            value={inProgress}
            onValueChange={(value) => { setinProgress(value), setinit(false), setCompleted(false) }}
          />
        </View>
        <View style={styles.switchContainer}>
          <Text style={{ marginRight: 6 }}>Completed</Text>
          <Checkbox
            value={completed}
            onValueChange={(value) => { setCompleted(value), setinProgress(false), setinit(false) }}
          />
        </View>
      </View>
      <Button title="Save" onPress={handleSave} />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
    justifyContent: 'space-around',

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

export default EditScreen;
