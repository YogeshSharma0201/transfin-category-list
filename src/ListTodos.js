import React, { Component } from 'react';
import './ListTodos.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TodoItems from './TodoItems';

//List all todos with pagination
class ListTodos extends Component {
  // epp = entries per page
  state = {
    open: false,
    epp: 5,
    page: 1,
  };

  //handle dialog open
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  //handle dialog close
  handleClose = () => {
    this.setState({ open: false });
  };

  //handle entries per page change
  handleEntriesChange = (e) => {
    this.setState({
      epp: e.target.value,
      page: 1
    })
  }

  //handle page change
  handlePageChange = (e) => {
    this.setState({
      page: e.target.value
    })
  }

  pageSelectList = () => {
    //nop = number of pages
    var nop = Math.ceil(this.props.todos.length / this.state.epp);
    var menuItems = [];
    for(var i=1; i<=nop; i++) {
      menuItems.push(<MenuItem value={i}>{i}</MenuItem>);
    }

    //Items for page select dropdown
    return menuItems.map((menuItem, idx) => {
      return <MenuItem value={idx+1} key={idx}>{idx+1}</MenuItem>
    });
  }

  selectItemHandler = (idx) => {
    console.log(idx);
    var selectedItems = this.props.selectedItems;
    var item = selectedItems.filter(i => {
      return i===idx;
    })
    if(item.length===0) {
      selectedItems.push(idx);
      this.props.changeSeletedItems(selectedItems);
      console.log(selectedItems);
    } else {
      selectedItems = selectedItems.filter((i)=>{
        return i!==idx;
      });
      this.props.changeSeletedItems(selectedItems);
      console.log(selectedItems);
    }
  }

  render() {
    let {page, epp} = this.state;
    let {selectedItems} = this.props;
    var nop = Math.ceil(this.props.todos.length / this.state.epp);
    console.log('a',selectedItems);
    return (
      <div className="listTodos">
        <h3>List of Todos</h3>
        <div className="navigationSelect">
          {/* dropdown for selecting entries per page */}
          <FormControl style={{minWidth: '230px', marginRight: '20px'}}>
            <InputLabel htmlFor="entries">Number of entries per page</InputLabel>
            <Select
              value={epp}
              onChange={this.handleEntriesChange}
              inputProps={{
                name: 'entries',
                id: 'entries',
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          {/* dropdown for selecting page number */}
          <FormControl style={{minWidth: '150px'}}>
            <InputLabel htmlFor="pageNumber">Page number</InputLabel>
            <Select
              value={page}
              onChange={this.handlePageChange}
              inputProps={{
                name: 'pageNumber',
                id: 'pageNumber',
              }}
            >
              {this.pageSelectList()}
            </Select>
          </FormControl>
        </div>
        <br/><br/>
        <Button disabled={selectedItems.length!==1 || this.props.mode==='update'} style={{marginRight: '10px'}} variant="contained" color="default" onClick={()=>this.props.updateHandler(this.props.selectedItems[0])}>Update</Button>
        <Button disabled={selectedItems.length===0 || this.props.mode==='update'} variant="contained" color="secondary" onClick={()=>this.handleClickOpen()}>Delete</Button>
        <ul>
          <TodoItems
            todos={this.props.todos}
            page={this.state.page}
            epp={this.state.epp}
            updateHandler={this.props.updateHandler}
            handleClickOpen={this.handleClickOpen}
            selectItemHandler={this.selectItemHandler}
            selectedItems={selectedItems}
          />
        </ul>
        {/* navigation button for incrementing and decrementing page number */}
        <div className="navigationButtons">
          <Fab disabled={page===1} color="primary" aria-label="Add" onClick={()=>this.setState({
            page: page-1
          })} className=''>
            <ArrowBack />
          </Fab>
          <Fab disabled={page===nop || nop===0} color="primary" aria-label="Add" className='' onClick={()=>this.setState({
            page: page+1
          })}>
            <ArrowForward />
          </Fab>
        </div>
        {/* Alert dialog when delete button is clicked */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete selected todos?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{
              this.handleClose();
              this.props.removeTodo(this.props.selectedItems);
            }} color="secondary">
              Yes
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
};

export default ListTodos;
