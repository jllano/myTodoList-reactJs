import {EventEmitter} from "events";

const todoUrl = "http://localhost:12345/todos";

class TodoRepository extends EventEmitter{

    constructor(){
        super();
    }

    fetchTasks(){
        return fetch(todoUrl,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method : 'GET'
        }).then(response => response.json());
    }

    postTask(task){
        fetch(todoUrl +"/"+ task.id,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method : 'POST',
            body: JSON.stringify(task)
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
        }).catch(function(error){
            console.log(error)
        });
    }

    deleteTask(id){
        fetch(todoUrl +"/"+ id,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method : 'DELETE',
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
        }).catch(function(error){
            console.log(error)
        });
    }

    putTask(item){
        let id = item.props.item.id;
        fetch(todoUrl +"/"+ id,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method : 'PUT',
            body: JSON.stringify(item.props.item)
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
        }).catch(function(error){
            console.log(error)
        });
    }

}
const  todoRepository = new TodoRepository();
export default todoRepository;