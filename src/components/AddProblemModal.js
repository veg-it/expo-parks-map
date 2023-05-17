import React from 'react'
import { useState } from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'

const AddProblemModal = ({onClose, onSubmit}) => {
    const [problemSaved, setProblemSaved] = useState();
    return (
        <View style={{
            backgroundColor: '#fff', flex: 1
        }}>
            <Text>Modal</Text>
            <TextInput value={problemSaved} onChangeText={setProblemSaved}/>
            <TouchableOpacity onPress={() => onSubmit(problemSaved)}>
                <Text>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose}>
                <Text>Close</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default AddProblemModal