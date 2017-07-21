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
            ],
            filter : 'all'
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

     onDelete(i){
        var editTodo = this.state.todos;
        editTodo.splice(i, 1);
        this.setState({
            todos:editTodo
        });
        // console.log(this.props.todos.length);
    }

     onCheck(i){
        var editTodo = this.state.todos;
        editTodo[i].completed = !editTodo[i].completed;
        this.setState({
            todos:editTodo
        });

        
    }

    onFilterHandler(filter) {
        this.setState({
            filter:filter
        })
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
                <div className="col-xs-9 col-xs-offset-1 text-center">
                    <TodoFilter todos={this.state.todos} 
                    onfilter={this.onFilterHandler.bind(this)}
                    />
                </div>
                <div className="col-xs-9 col-xs-offset-1">
                    <TodoList  
                        todos={this.state.todos}
                        onclick={this.onClick.bind(this)}
                        ondelete={this.onDelete.bind(this)}
                        oncheck={this.onCheck.bind(this)}
                        filter={this.state.filter}
                        
                        />
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
  
    }
    render(){
        return(
            <div className="row">    
                <ol className="todos">
                    <TodoListItem 
                        todos={this.props.todos}
                        ondelete={this.props.ondelete}
                        oncheck={this.props.oncheck}
                        filter={this.props.filter}
                        onfilter={this.props.filter}/>
                </ol>  
            </div>
        );
    }
}

class TodoListItem extends Component {
    render(){
        var todos = this.props.todos;
        // console.log(todos);
        var filter = this.props.filter;
        var completedTodos = [];
        var IncompletedTodos = [];
        
        for (var i=0;i<todos.length;i++) {
            if (todos[i].completed) {
                completedTodos[i] = todos[i];
            } else {
                IncompletedTodos[i] = todos[i];
            }
        }

        if (filter===true) {
            todos = completedTodos;            
        } else if (filter===false) {
            todos = IncompletedTodos;            
        } 

        return(
            <div>{todos.map((todo, i)=>  
                 <li key={todo.id} >
                     <span
                        style={ !todo.completed ? {textDecoration:'none'} : {textDecoration:'line-through',color:'grey'} }
                        onClick={() => this.props.oncheck(i)} >
                            {todo.text}
                             
                     </span>
                     
                     <span onClick={() => this.props.ondelete(i)} className="delete pull-right">
                         <i className="glyphicon glyphicon-remove"></i>
                     </span>
                 </li>
                 )}
            </div>
        );
    }
}

class TodoFilter extends Component {
    render(){
        var allTodo = this.props.todos.length;
        var Incompleted = 0;
        var Completed = 0;

        for (var i=0;i<allTodo;i++) {
            if(this.props.todos[i].completed) {
                Completed += 1;
            } else {
                Incompleted += 1;
            }
        }


        return(
            <div className="todo-filter">
                <span className="btn btn-info" onClick={() => this.props.onfilter('all')}>All Tasks<span className="badge">{allTodo}</span></span>
                <span className="btn btn-primary" onClick={() => this.props.onfilter(false)}>Incompleted <span className="badge">{Incompleted}</span></span>
                <span className="btn btn-success" onClick={() => this.props.onfilter(true)}>Completed <span className="badge">{Completed}</span></span>
            </div>
        );
    }
}

Body.propTypes = {
    todo: PropTypes.string,
    todos: PropTypes.object,    
}

export default Body;