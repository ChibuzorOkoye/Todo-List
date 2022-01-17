import React, {Fragment, useState,useEffect} from "react";
import EditTodo from "./EditTodo";


const ListTodos =() => {
    const [todo,setTodos] = useState([])
    
    const deleteTodo = async (id) => {


        try {
            const removeTodo = await fetch(`http://localhost:5000/todo/${id}`,
            {
                method: "DELETE",
            })
            setTodos(todo.filter(todo =>todo.todo_id !== id))
        } catch (err) {
            console.error(err.message)
        }
    }

   

    const getTodos = async () => {

        try {
            const response = await fetch("http://localhost:5000/todo")
            const data = await response.json()

            setTodos(data)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getTodos()
    },[])
    return (
        <Fragment>
        <h1 className="text-center mt-5">List Todos</h1>
        <table className="table m-2 text-center">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                
                {todo.map(to => (
                    <tr key={to.todo_id}>
                    <td>{to.description}</td>
                    <td><EditTodo todo = {to}/></td>
                    <td><button className="btn btn-danger" onClick={() => deleteTodo(to.todo_id)}>Delete</button></td>
                </tr>
                ))}
            </tbody>
        </table>
        </Fragment>
    )

}


export default ListTodos