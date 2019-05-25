import React, { Component } from 'react';
import './Todo.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

//This component is used for adding and updating Todos
//Use "mode" to decide wheter todos are added or deleted
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: 'none',
      errorText: ''
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.titleHandler = this.titleHandler.bind(this);
    this.textHandler = this.textHandler.bind(this);
  }

  //Handler for Title Input
  titleHandler(e) {
    this.props.titleChange(e.target.value);
  }

  //Handler for Text input
  textHandler(e) {
    this.props.textChange(e.target.value);
  }

  //Handler for sumbit action of the form
  submitHandler(e) {
    e.preventDefault();
    let {title, text} = this.props;
    if(title.length < 5) {
      this.setState({
        showError: 'block',
        errorText: 'Title\'s length should be more than 5 characters!!'
      })
      return;
    }
    //add or update todo
    if(this.props.mode === 'add') {
      this.props.addTodo(title, text);
    } else {
      this.props.updateTodo(title, text);
    }

    this.setState({
      showError: 'none',
      errorText: ''
    })
  }

  render() {
    let {showError, errorText} = this.state;
    let {mode, title, text} = this.props;
    return (
      <div className="addTodoContainer">
        <Paper className="addTodo">
          <p style={{display: showError, color: 'red'}}>{errorText}</p>
          <h3>{mode==='add' ? 'Add Todos' : 'Update Todos'}</h3>
          <form onSubmit={this.submitHandler}>
            <div>
              <label htmlFor="title"> Title </label>
              <input id="title" type="text" value={title} onChange={this.titleHandler}></input>
            </div>
            <br/>
            <div>
              <label htmlFor="Note"> Note </label>
              <textarea id="Note" value={text} onChange={this.textHandler}></textarea>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="addbutton"
                style={{marginRight: mode==='add'? '':'10px'}}
              >
                {mode==='add' ? 'Add' : 'Update'}
              </Button>
              <Button
                style={{display: mode==='add'? 'none':'block'}}
                variant="contained"
                color="secondary"
                className="addbutton"
                onClick={this.props.cancelHandler}
              >
                {mode==='add' ? '' : 'Cancel'}
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  };
};

export default Todo;
