import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { editTodo, toggleTodo, removeTodo } from '../redux/actions'
import { connect } from 'react-redux'
import { Dimension,AppText } from '../ui-kit'

const ActionTask = ({ onPress, onPressOut, actionType }) => {
  return (
    <TouchableOpacity onPressOut={onPressOut} onPress={onPress}>
      <View style={styles.button}>
        <AppText>{actionType}</AppText>
      </View>
    </TouchableOpacity>
  )
}

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      task: props.todo
    }
  }

  onChangeTask = () => {
    this.setState({ isEditing: true })
  }



  onEndTask = () => {
    const { task } = this.state
    const { id } = this.props
    editTodo(task, id)
    this.setState({ isEditing: false })
  }

  render() {
    const { isEditing, task } = this.state
    const { id, isCompleted, toggleTodo, removeTodo } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => toggleTodo(id)}>
            <AppText style={styles.button}>{isCompleted ? '✅' : '⬜'}</AppText>
          </TouchableOpacity>
          {isEditing
            ? <TextInput value={task}
              style={[styles.text, isCompleted ? styles.completed : styles.text]}
              returnKeyType={'done'}
              onBlur={this.onEndTask}
              onChangeText={(newText) => this.setState({ task: newText })}
              autoCorrect={false} />
            : <AppText style={[styles.text, isCompleted ? styles.completed : styles.text]}>{task}</AppText>
          }
        </View>
        <View style={styles.buttonContainer}>
          {isEditing
            ?
            <ActionTask onPressOut={this.onEndTask} actionType={"🆗"} />
            :
            <ActionTask onPressOut={this.onChangeTask} actionType={"✏️"} />
          }
          <ActionTask onPress={() => removeTodo(id)} actionType={"❌"} />
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  editTodo: (task, id) => dispatch(editTodo(task, id)),
  toggleTodo: id => dispatch(toggleTodo(id)),
  removeTodo: id => dispatch(removeTodo(id))
})

export default connect(null, mapDispatchToProps)(TodoList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width - Dimension(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    padding: Dimension(10)
  },
  row: {
    flex: 0.8,
    flexDirection: 'row',
    alignItems: 'center',


  },
  text: {
    fontSize: Dimension(24),
    fontWeight: '300',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#0000ff',

  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    padding: Dimension(10)
  }
})