import React, {Component} from 'react';
import './App.scss';
import Post from './Post';
import Button from 'react-bootstrap/Button';
import { Navbar, Nav } from 'react-bootstrap'
import { connect } from 'react-redux';
import { categoryListActions, changeCategory } from './actions/categoryListActions';
import { Link } from 'react-router-dom'


class App extends Component {

  state = {
    pathname: '/business'
  };

  componentDidMount() {
    //call categoryListActions
    this.props.categoryListActions(this.props.location.pathname);
  }

  //change state.pathname as route changes
  static getDerivedStateFromProps(nextProps, prevState) {
     if(nextProps.location.pathname!==prevState.pathname){
       var pathname = nextProps.location.pathname;
       if(pathname !== '/business' && pathname !== '/economy')
        pathname = '/business';
       return { pathname };
    }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.location.pathname!==this.props.location.pathname) {
      this.props.changeCategory();
      this.props.categoryListActions(this.props.location.pathname);
    }
    // console.log(prevProps.location.pathname, this.state.pathname);
  }

  // generate a list of <Post/> from props.posts
  postList() {
    return this.props.posts.map((post, idx) => {
      return <Post post={post} key={idx}/>
    });
  }

  loadMoreHandler() {
    if(!this.props.fetching)
      this.props.categoryListActions(this.props.location.pathname);
  }

  render() {
    var displayLoader = this.props.fetching? 'unset':'none';
    var displayButton = this.props.fetching? 'none':'unset';
    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Category List</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link><Link to="/business">Business Page</Link></Nav.Link>
              <Nav.Link><Link to="/economy">Economy Page</Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <h1>{this.state.pathname.slice(1,2).toUpperCase()+this.state.pathname.slice(2)} Category List</h1>
        {this.postList()}
        <div className="loadButton">
          <img style={{display: displayLoader}} src="loader.gif" alt=""/>
          {/* calling loadMoreHandler() this way binds this to loadMoreHandler() */}
          <Button style={{display: displayButton}} variant="primary" onClick={()=>
            this.loadMoreHandler()
          }>
            Load More
          </Button>
        </div>
      </div>
    );
  }
}

// map categoryListReducer.result to props
const mapStateToProps = state => ({
 ...state.categoryListReducer.result
})

const mapDispatchToProps = dispatch => ({
  changeCategory: () => dispatch(changeCategory()),
  categoryListActions: (pathname) => dispatch(categoryListActions(pathname))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
