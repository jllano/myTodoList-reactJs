import React, { Component } from 'react';
import TodoItem from './TodoItem';
import AddItem from './AddItem';

class Todo extends Component {


    handleAddItem(item) {
        this.props.addItem(item);
    }

    handleRemoveItem(item) {
        this.props.removeItem(item);
    }

    handleToogleItem(item) {
        this.props.toogleItem(item);
    }

    render(){

        let todoItems;

        if(this.props.tasks){
            todoItems = this.props.tasks.map(task => {
                return (
                    <TodoItem key={task.title}
                        toogleItem={this.handleToogleItem.bind(this)}
                        removeItem={this.handleRemoveItem.bind(this)}
                        item={task}
                    />
                );
            });
        }

        return (
            <div id="todo" className="todo well">
                <button className="pull-right btn btn-xs btn-success img-circle">{this.props.completeCount}</button>
                <h1 className="vert-offset-top-0"> My Todo List</h1>

                <ul className="list-group">
                    {todoItems}
                </ul>
                <br/>
                <AddItem addItem={this.handleAddItem.bind(this)} />
            </div>
        );
    }

}

export default Todo;