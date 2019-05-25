import React, {Component} from 'react';
import './App.css';
import Todo from './Todo';
import ListTodos from './ListTodos';

class App extends Component {
  constructor(props) {
    super(props);
    let todos = localStorage.getItem('todos');
    todos = JSON.parse(todos);
    todos = Object.assign([], todos);
    //mode is for telling Todo to call addTodo or updateTodo function
    this.state = {
      todos,
      mode: 'add',
      title: '',
      text: '',
      selectedItems: []
    };
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.textChange = this.textChange.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
    this.changeSeletedItems = this.changeSeletedItems.bind(this);
  }

  //Function for adding todos to state.todo and saving in localStorage
  addTodo(title, text) {
    let todos = localStorage.getItem('todos');
    todos = JSON.parse(todos);
    todos = Object.assign([], todos);
    todos = [{title, text}, ...todos];
    this.setState({
      todos,
      title: '',
      text: ''
    });
    todos = JSON.stringify(todos);
    localStorage.setItem('todos', todos);
  }

  //Function for updating todo at index stored in state.idx
  //Update and store the todos in localStorage
  updateTodo(title, text) {
    let idx = this.state.idx;
    let todos = localStorage.getItem('todos');
    todos = JSON.parse(todos);
    todos = Object.assign([], todos);
    todos = todos.map((todo, i) => {
      if(i===idx) {
        todo.title = title;
        todo.text = text;
      }
      return todo;
    })
    this.setState({
      todos,
      mode: 'add',
      title: '',
      text: '',
    });
    console.log(todos);
    todos = JSON.stringify(todos);
    localStorage.setItem('todos', todos);
  }

  //updateHandler is passed to ListTodos
  //called when update button of any todo is clicked, sets the state.idx to idx passed
  updateHandler(idx) {
    let todos = localStorage.getItem('todos');
    todos = JSON.parse(todos);
    todos = Object.assign([], todos);
    let todo = todos.filter((todo, i) => {
      return i===idx;
    })[0];
    this.setState({
      mode: 'update',
      title: todo.title,
      text: todo.text,
      idx: idx,
      selectedItems: []
    });
  }

  cancelHandler() {
    this.setState({
      mode: 'add',
      title: '',
      text: '',
      selectedItems: []
    });
  }

  //remove Todo whose index is idx
  removeTodo(selectedIds) {
    console.log(selectedIds);
    let todos = localStorage.getItem('todos');
    todos = JSON.parse(todos);
    todos = Object.assign([], todos);
    todos = todos.filter((todo, i) => {
      var check = selectedIds.filter(id => {
        return id === i;
      });
      return !check.length;
    })
    this.setState({
      todos,
      selectedItems: []
    });
    console.log(todos);
    todos = JSON.stringify(todos);
    localStorage.setItem('todos', todos);
  }

  //function used by <Todo/> to change title
  titleChange(val) {
    this.setState({
      title: val
    })
  }

  //function used by <Todo/> to change text
  textChange(val) {
    this.setState({
      text: val
    })
  }

  changeSeletedItems(selectedItems) {
    this.setState({selectedItems});
  }

  render() {
    let { todos, mode, title, text, selectedItems } = this.state;
    return (
      <div className="App">
          <Todo
            addTodo={this.addTodo}
            mode={mode}
            title={title}
            text={text}
            titleChange={this.titleChange}
            textChange={this.textChange}
            submitHandler={this.submitHandler}
            updateTodo={this.updateTodo}
            cancelHandler={this.cancelHandler}
          />
          <br/><br/>
          <ListTodos
            todos={todos}
            mode={mode}
            removeTodo={this.removeTodo}
            updateHandler={this.updateHandler}
            selectedItems={selectedItems}
            changeSeletedItems={this.changeSeletedItems}
          />
      </div>
    );
  }
}

export default App;
