import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { changeUserName, deleteall } from './store/actions';
import { forData, edit, Delete, updateTodo } from './store/actions';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper';


const style = {
  margin: "0 auto",
  textAlign: 'center',
  display: 'inline-block',
  width: "300px"
};




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
      editname: '',
      flag: false,
      val: [],
      id: []
    }
  }


  handleChange(ev) {
    this.setState({
      todo: ev.target.value,
    })
  }



  onChangeHandler(eve) {
    this.setState({
      [eve.target.name]: eve.target.value
    })
  }




  submit() {
    let name1 = this.state.todo
    this.props.changeUserName(name1)
    this.setState({
      todo: ''
    })
  }



  editSubmit(id, ind) {
    let edited = this.state.editname
    this.props.updateTodo(edited, id, ind)
  }


  edit(ind) {
    this.props.edit(ind)
  }



  delete(id, ind) {
    this.props.Delete(id, ind)
  }


  componentDidMount() {
    this.props.forData()
  }



  deleteall() {
    this.props.deleteall()
  }


  render() {

    return (
      <div>

        <AppBar
          title="Todo Application"
          iconClassNameRight="muidocs-icon-navigation-expand-more" />

        <div className="text-center">

          <Paper style={style} zDepth={5}>

            <TextField ref="todo" name="todo" value={this.state.todo} onChange={this.handleChange.bind(this)}
              hintText="Your Todo Here......"
              floatingLabelText="Note Down Your Daily Todo"
              floatingLabelFixed={true} />

            <RaisedButton label="Add Todo" primary={true} type="submit" onClick={this.submit.bind(this)} />

            <RaisedButton label="DELETE ALL" primary={true} type="submit" onClick={this.deleteall.bind(this)} />



            {this.props.todo.map((val, ind) => {
              var id = val.id
              return (<div key={ind}>

                <ListItem value={3} primaryText={val.todo} key={val.id} />

                {(!val.flag) ?

                  <div>
                    <TextField hintText='edit' name='editname' onChange={this.onChangeHandler.bind(this)} />
                    <button onClick={this.editSubmit.bind(this, id, ind)}>update</button>
                  </div>

                  :

                  <div>
                    <button onClick={this.delete.bind(this, val.id, ind)}>Delete</button>

                    <button onClick={this.edit.bind(this, ind)}>Edit</button>
                  </div>
                }
              </div>
              )
            })
            }

          </Paper>

        </div>

      </div>
    );
  }
}


function mapStateToProp(state) {
  return ({
    todo: state.root.todo,
    flag: state.root.flag
  })
}



function mapDispatchToProp(dispatch) {
  return ({
    changeUserName: (name) => { dispatch(changeUserName(name)) },
    forData: () => { dispatch(forData()) },
    Delete: (id, ind) => { dispatch(Delete(id, ind)) },
    edit: (ind) => { dispatch(edit(ind)) },
    updateTodo: (edited, id, ind) => { dispatch(updateTodo(edited, id, ind)) },
    deleteall: () => { dispatch(deleteall()) }
  })
}





export default connect(mapStateToProp, mapDispatchToProp)(App);
