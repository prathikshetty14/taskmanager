import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from "../redux/reducers/taskReducer"
import { toast } from "react-toastify";
import styles from "../styles/AddTask.module.css"

// AddTask Component
function AddTask(){

    // Initialising the states for the "tasksArray" Array
    const dispatch = useDispatch();
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low")
    const [date, setDate] = useState("");

    // Add Button Event Handler
    const handleAddTask = () => {

        // If Required Details is not filled
        if (!task || !date || !priority) {
            // Basic form validation
            toast.error('Please fill out all required fields.');
            return;
          }

        // Object with the required details
        const taskToBeAdded = {
            id: Date.now(),
            title: task,
            description: description,
            date: date,
            priority: priority
        }
        
        toast.success("Task added successfully");

        setTask("");
        setDescription("");
        setDate("");

        dispatch(addTask(taskToBeAdded));
    }

    return(
        <>
            {/* Container */}
            <section className={styles.mainContainer}>
                <div className={styles.taskContainer}>

                    {/* Task Title */}
                    <div className={styles.inputBar}>
                        <span className={styles.iconContainer}>
                            <img src="https://cdn-icons-png.flaticon.com/128/9018/9018036.png" alt="h1-heading"/>
                        </span>
                        <input
                        required 
                        type="text"
                        name="title"
                        placeholder="Task name..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        />
                    </div>
                    
                    {/* Task Description */}
                    <div className={styles.inputBar}>
                        <span className={styles.iconContainer}>
                            <img src="https://cdn-icons-png.flaticon.com/128/9018/9018037.png" alt="h2-heading"/>
                        </span>
                        <input
                        type="text" 
                        name="description"
                        placeholder="Task details..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    
                    {/* Task Due */}
                    <div className={styles.inputBar}>
                        <span className={styles.iconContainer}>
                            <img src="https://cdn-icons-png.flaticon.com/128/5440/5440333.png" alt="due"/>
                        </span>
                        <input
                        required
                        type="date"
                        name="due"
                        value={date}
                        onChange={(e) => setDate(e.target.value)} 
                        />
                    </div>

                    {/* Task Priority */}
                    <div className={styles.inputBar}>
                        <span className={styles.iconContainer}>
                            <img src="https://cdn-icons-png.flaticon.com/128/545/545684.png" alt="priority"/>
                        </span>
                        <select
                        required
                        name="priority"
                        onChange={(e) => setPriority(e.target.value)}
                        >
                            <option disabled>Choose the priority level</option>
                            <option value="Low" selected>Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    {/* Add Button */}
                    <button className={styles.addTaskBtn} onClick={handleAddTask}>
                        <span>Add Task</span><span class="material-symbols-outlined">add_task</span>
                    </button>
                </div>

                
            </section>
        </>
    )
}

export default AddTask;