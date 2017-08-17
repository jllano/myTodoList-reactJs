import React, { Component } from 'react';

import './App.css';
import Header from './Components/template/Header';
import Todo from './Components/Todo';
import TodoRepository from './Repository/TodoRepository';

var user = "user";

class App extends Component {

    constructor(){
        super();
        this.state =  {
            tasks: [],
            completed: 0,
        };
    }
    componentWillMount(){
        var todos = TodoRepository.fetchTasks().then(json => {
            return json;
        });

        let that = this;
        todos.then(function(data){
            that.setState({tasks: data })
        });
    }

    addItem(item){
        let tasks = this.state.tasks;
        tasks = tasks.filter(function (el) {
            if(el.title !== item.title){
                return tasks;
            }
        });
        tasks.push(item);
        this.setState({tasks:tasks});
        TodoRepository.postTask(item);
    }

    removeItem(item){
        let taskId = item.props.item.id;
        let tasks = this.state.tasks;
        tasks = tasks.filter(function (el) {
            return el.id !== taskId;
        });
        this.setState({ tasks: tasks });
        TodoRepository.deleteTask(taskId);
        return;
    }

    toogleItem(item) {
        let taskId = item.props.item.id;
        let tasks = this.state.tasks;
        for (var i in tasks) {
            if (tasks[i].id === taskId) {
                tasks[i].status = tasks[i].status === 'true' ? 'false' : 'true';
                break;
            }
        }
        this.setState({ tasks: tasks });
        TodoRepository.putTask(item);
        return;
    }

    completeCounter(){
        var tasks = this.state.tasks;
        var complete = 0;
        for (var i in tasks) {
            if (tasks[i].status === "true") {
                complete = complete + 1;
            }
        }

       return complete;
    }

    render() {
        return (
            <div className="App">

                <Header completeCount={this.completeCounter()} user={user} />
                <Todo
                    completeCount={this.completeCounter()}
                    toogleItem={this.toogleItem.bind(this)}
                    removeItem={this.removeItem.bind(this)}
                    addItem={this.addItem.bind(this)}
                    tasks={this.state.tasks}
                />
            </div>
        );
    }
}

export default App;