import React, { Component } from 'react';
import './TodoItems.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class TodosItems extends Component {

  listItems = () => {
    let {page, epp} = this.props;
    var startIdx = (page-1)*epp;
    var endIdx = startIdx+epp;

    if(this.props.todos.length === 0) {
      return <h3>No Todos</h3>
    }

    var selectedItems = this.props.selectedItems;
    return this.props.todos.slice(startIdx, endIdx).map((item, idx)=>{
        var ite = selectedItems.filter(i => {
          return i===idx;
        })
        var background = '#fff';
        if(ite.length!==0) {
          background = '#eee';
        }

        return (
          <li key={idx}  className="todoItems">
            <Paper
              className="todosItem"
              onClick={()=>this.props.selectItemHandler(idx)}
              style={{backgroundColor: background}}
            >
              <h5>{item.title}</h5>
              <p>{item.text}</p>
            </Paper>
          </li>);
        });
  };

  render() {
    //create todo list
    return <div>{this.listItems()}</div>;
  };
};

export default TodosItems;
