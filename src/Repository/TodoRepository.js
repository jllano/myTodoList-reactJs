import {EventEmitter} from "events";

const todoUrl = "http://localhost:12345/todos";

class TodoRepository extends EventEmitter{

    constructor(){
        super();
    }

    fetchTasks(){
        return fetch(todoUrl,{
            method : 'GET'
        }).then(response => response.json());
    }

    postTask(task){
        fetch(todoUrl +"/"+ task.id,{
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
            method : 'DELETE',
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
        }).catch(function(error){
            console.log(error)
        });
    }

    putTask(id, task){
        fetch(todoUrl +"/"+ id,{
            method : 'PUT',
            body: JSON.stringify(task)
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