import React, { Component } from 'react';

import './App.css';
import Header from './Components/template/Header';
import Todo from './Components/Todo';

var user = "user";

class App extends Component {

    constructor(){
        super();
        this.state =  {
            tasks: [],
            completed: 0,
        };
        //USE EXPRESS?

    }

    getTasks(){
        let that = this;
        fetch("http://localhost:12345/todos",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method : 'GET'
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            that.setState({tasks: data}, function () {
                console.log(that.state);
            });
        }).catch(function(error){
            console.log(error)
        });
    }

    componentWillMount(){
        this.getTasks();
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

        fetch("http://localhost:12345/todos/" + item.id,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method : 'POST',
            body: JSON.stringify(item)
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);

        }).catch(function(error){
            console.log(error)
        });

    }

    removeItem(item){

        let taskId = item.props.item.id;
        let tasks = this.state.tasks;

        tasks = tasks.filter(function (el) {
            return el.id !== taskId;
        });

        this.setState({ tasks: tasks });

        fetch("http://localhost:12345/todos/" + taskId,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method : 'DELETE',
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
        }).catch(function(error){
            console.log(error)
        });

        return;

    }

    toogleItem(item) {
        var taskId = item.props.item.id;
        var tasks = this.state.tasks;
        for (var i in tasks) {
            if (tasks[i].id === taskId) {
                tasks[i].status = tasks[i].status === 'true' ? 'false' : 'true';
                break;
            }
        }
        this.setState({ tasks: tasks });

        fetch("http://localhost:12345/todos/" + taskId,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method : 'PUT',
            body: JSON.stringify(item.props.item)
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);

        }).catch(function(error){
            console.log(error)
        });

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