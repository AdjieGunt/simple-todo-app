import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';

import './Body.css';
// [Todo APP]
class Body extends Component {
    constructor(props){
        super();
        this.state = {
            todo: 'Please add task here..',
            todos: [
                {
                    id:1,
                    text:"Example Task",
                    completed:true
                }
            ]
        };
        // console.log(this.state);        

    };

    onChange(e){
        // console.log(e.target.value);
        // console.log(this.state.todos);
        
        this.setState({
            // todos: [],
            todo:e.target.value
        });
        
    }

    onSubmitHandle(event){
        event.preventDefault();
        // console.log(this.state.todo);
        var todos = this.state.todos.slice()
        // console.log(this.nextId());
        var newTodo = {id:this.nextId(), text:this.state.todo, completed:false}
        todos.push(newTodo)
        // console.log(todos);
        if(this.state.todo!=="") {
            this.setState({
                todo:"",
                todos
             });
        } else {
            alert("Task tidak boleh kosong!");
        }
        // ReactDOM.findDOMNode(this.refs.item).focus();
        return;
    }

    nextId() {
        var todos = this.state.todos;
        // console.log(todos); 
        return todos.length += 1;
    }

    onClick(todoId){
        console.log(todoId);
    }

    render() {
        return(
            <div className="row">
                <div className="col-xs-12">
                    <TodoForm todo={this.state.todo} 
                    onchange={this.onChange.bind(this)}
                    onsubmit={this.onSubmitHandle.bind(this)} />
                </div>
                <div className="col-xs-8 col-xs-offset-1">
                    <TodoList  todos={this.state.todos} onclick={this.onClick.bind(this)}/>
                </div>
            </div>
        );
    }
}

class TodoForm extends Component {
    render(){
        return(
            <div className="todo-input row">
                <form onSubmit={this.props.onsubmit}>
                    <div className="col-xs-10">
                        
                        <input 
                        className="input-text form-control"
                        type="text"
                       
                        placeholder="Add Todo .."
                        value={this.props.todo}
                        onChange={this.props.onchange.bind(this)}/>
                    </div>
                    
                    <div className="col-xs-2 padding-0">
                        <input type="submit" className="btn btn-shopee" value="add" />                    
                    </div>
                </form>
               </div>
            
        );
    }
}

class TodoList extends Component {
    removeHandler(){
        this.props.onRemove(this.todo.id);
        console.log(this.props.onRemove(this.todo.id));
    }
    render(){
        return(
            <div className="row">    
                <ol className="todos">
                    <TodoListItem todos={this.props.todos}/>
                </ol>  
            </div>
        );
    }
}

class TodoListItem extends Component {
    onCheck(i){

        var editTodo = this.props.todos[i];
        editTodo.completed = !editTodo.completed;
        this.setState({
            todos:editTodo
        });
        // console.log(this.state);
    }

    onDelete(i){
        var editTodo = this.props.todos;
        delete editTodo[i];
        this.setState({
            todos:editTodo
        });
    }

    render(){
        var todos = this.props.todos;
        return(
            <div>{todos.map((todo, i)=>  
                 <li key={todo.id} >
                     <span
                        style={ !todo.completed ? {textDecoration:'none'} : {textDecoration:'line-through',color:'grey'} }
                        onClick={() => this.onCheck(i)} >
                            {todo.text}
                             
                     </span>
                     
                     <span onClick={() => this.onDelete(i)} className="delete pull-right">
                         <i className="glyphicon glyphicon-remove"></i>
                     </span>
                 </li>
                 )}
            </div>
        );
    }
}

Body.propTypes = {
    todo: PropTypes.string,
}

export default Body;