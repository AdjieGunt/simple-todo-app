import React, { Component } from 'react';
// import React-Dom from 'react-dom';
import ReactDOM from 'react-dom';



// [TODO APP]
class TodoApp extends Component {
    constructor(props) {
        super();
        this.state = {
            items : ["Test Todo"]
        }
    }

    getInitialState() {
        return {items:["Test1"]};
    }

    updateItems(newItem) {
        var allItems = this.state.items.concat([newItem]);
        this.setState({items: allItems});
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-xs-4 col-xs-offset-4">
                    <TodoForm  onFormSubmit={this.updateItems}/>
                    <TodoList items={this.state.items}/>
                </div>
            </div>
        );
    }
}
    // TODO FORM
class TodoForm extends Component {
    getInitialState(){
        return {item: ''};
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onFormSubmit(this.state.item);
        this.setState({item: ''});
        ReactDOM.findDOMNode(this.refs.item).focus();
        return
    }

    onChange(e) {
        this.setState({
            item:e.target.value
        });
    }

    render() {
       return(
           <div className="row">
            
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group col-xs-10">
                        <input type="text" className="form-control" ref='item' 
                            onChange={this.onChange.bind(this)}
                            value={this.props.item}/>
                        <input type="submit" className="btn btn-shopee" 
                        style={{"float":"left","marginLeft":"5px"}} 
                        value="Add"/>

                    </div>
                </form>
        
        </div> 
       );
    }
}
    // TODO LIST
class TodoList extends Component {
    render() {
        var createItem = function(itemText) {
            return(
                <TodoListItem>{itemText} </TodoListItem>
            );
        };
        return <ul>{this.props.items.map(createItem)}</ul>
    }

}
        // TODO LIST ITEM #1
        // TODO LIST ITEM #2
        // TODO LIST ITEM #3
        //  .....
        // TODO LIST ITEM #n

class TodoListItem extends Component {
    render(){
        return(
           <li data-id={this.props.value} key={this.props.value}>{this.props.children}</li> 
        );
    }
}


export default TodoApp;