import React, { useState } from 'react'
import { StyleSheet, View, TextInput, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import TodoList from '../components/todolist'
import { addTodo } from '../redux/actions'
import { connect } from 'react-redux'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dimension } from '../ui-kit';

const Todo = ({
    state,
    addTodo
}) => {
    const [task, setTask] = useState('');
    return (
        <LinearGradient
            style={{ flex: 1 }}
            useAngle={true}
            angle={176}
            colors={['#F084D2', '#FAACA8', '#F2B18E']}>
            <View style={styles.inputBox}>
                <TextInput style={styles.input}
                    placeholder="Add task"
                    value={task}
                    maxLength={20}
                    onChangeText={(task) => setTask(task)}
                    onBlur={() => setTask('')}
                    onSubmitEditing={() => addTodo(task)}
                    returnKeyType={'done'}
                    autoCorrect={false} />
            </View>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={false}
            >
                <ScrollView style={{ flex: 1 }}>
                    {state.todo && state.todo.length > 0 && state.todo.map(todo =>
                        <TodoList
                            key={todo.id}
                            id={todo.id}
                            {...todo} />
                    )}
                </ScrollView>
            </KeyboardAwareScrollView>
        </LinearGradient>
    )
}

const mapStateToProps = state => ({
    state: state
})

const mapDispatchToProps = dispatch => ({
    addTodo: todo => dispatch(addTodo(todo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: Dimension(40),
        marginTop: Dimension(85),
        fontWeight: '500'
    },
    list: {
        flex: 0.9,
        borderRadius: Dimension(10),
        marginTop: Dimension(25)
    },
    input: {
        padding: Dimension(20),
        fontSize: Dimension(24),
        fontWeight: '300'
    },
    inputBox: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#a9a9a9'
    }
})