import './Home.css'
import AddIcon from "./plus.png"
import TodoCard from '../../component/TodoCard/TodoCard'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Swal from "sweetalert2"

function Home() {
    const [todolist, setTodoList] = useState([])
    const [newTask, setNewTask] = useState("")
    const [category, setCategory] = useState("")

    useEffect(()=>{
        const savedTodoList = localStorage.getItem("todoList")

        if (savedTodoList){
            setTodoList(JSON.parse(savedTodoList))
        }
    }, [])

    useEffect(()=>{
        if(todolist.length === 0) return

        localStorage.setItem("todoList", JSON.stringify(todolist))

    }, [todolist])

    function deleteItem (index){
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete a task!",
            icon: "warning",
            showCancelButton: true
        }).then((result)=> {
            if(!result.isConfirmed){
                return
            }


            const newTodoList = todolist.filter((item, i)=>{
                if (i === index){
                    return false
                }
                else{
                    return true
                }
            })
            setTodoList(newTodoList)
        })

    }

    return (
        <div>
            <h1 className='app-title'>ToDo App</h1>

            <div className='todolist-container'>
                {todolist.map((todoItem, i) => {

                    const {task, category} = todoItem

                    return <TodoCard key={i} index={i} task={task} category={category}
                    deleteItem={deleteItem} />
                })}

                {
                    todolist.length === 0
                        ?

                        <p style={{ textAlign: "center" }}>
                            No task to show, please add a new task
                        </p>
                        :
                        null
                }
            </div>

            <div className='add-todo-item-container'>
                <input
                    type='text'
                    className='add-input'
                    placeholder='Add a new task'
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />

                <select 
                className='category-select' 
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                >
                    <option value="">Category</option>
                    <option value="Learning">Learning</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Health">Health</option>
                    <option value="Others">Others</option>
                </select>

                <img
                    src={AddIcon}
                    alt='Add'
                    className='add-icon'
                    onClick={() => {
                        if(newTask === ""){
                            toast.error("Task cannot be empty!")
                            return
                        }
                        if(category === ""){
                            toast.error('Please select a category')
                        }

                        setTodoList([...todolist, {task: newTask, category: category}])
                        setNewTask("")
                        toast.success('Task added successfully!')
                    }}
                />
            </div>
            <Toaster position='top-right'/>
        </div >
    )
}

export default Home