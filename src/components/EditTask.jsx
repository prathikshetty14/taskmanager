import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask } from '../redux/reducers/taskReducer';
import { taskSelector } from '../redux/reducers/taskReducer';
import { toast } from "react-toastify";
import styles from "../styles/EditTask.module.css"

// EditTask Component
function EditTask(){

    // Obtaining the taskID from useParams() 
    const { taskId } = useParams();
    const { tasks } = useSelector(taskSelector);
    const dispatch = useDispatch();

    // Local state to track form changes
    const [editedTask, setEditedTask] = useState({
        title: '',
        description: '',
        due: '',
        priority: 'Low',
    });

    // Fetch the task details when the component mounts
    useEffect(() => {
        const currentTask = tasks.find((task) => task.id === Number(taskId));
        if (currentTask) {
        setEditedTask({
            title: currentTask.title,
            description: currentTask.description,
            due: currentTask.date,
            priority: currentTask.priority,
        });
        }
    }, [tasks, taskId]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prevTask) => ({
        ...prevTask,
        [name]: value,
        }));
    };

    // Handle form submission
    const handleEditTask = () => {
        toast.success('Task updated!');

        // Dispatch the updateTask action
        dispatch(updateTask({ id: Number(taskId), updatedTask: editedTask }));
    };

    return(
        <>
            {/* Container */}
            <section className={styles.mainContainer}>
                <div className={styles.taskContainer}>

                    <h1>Edit Task</h1>

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
                        value={editedTask.title}
                        onChange={handleInputChange}
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
                        value={editedTask.description}
                        onChange={handleInputChange}
                        />
                    </div>
                    
                    {/* Task Due */}
                    <div className={styles.inputBar}>
                        <span className={styles.iconContainer}>
                            <img src="https://cdn-icons-png.flaticon.com/128/5440/5440333.png" alt="due"/>
                        </span>
                        <input
                        type="date"
                        name="due"
                        value={editedTask.due}
                        onChange={handleInputChange}
                        />
                    </div>

                    {/* Task Priority */}
                    <div className={styles.inputBar}>
                        <span className={styles.iconContainer}>
                            <img src="https://cdn-icons-png.flaticon.com/128/545/545684.png" alt="priority"/>
                        </span>
                        <select
                        name="priority"
                        onChange={handleInputChange}
                        >
                            <option disabled>Choose the priority level</option>
                            <option value="Low" selected>Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <span className={styles.btnContainer}>
                        {/* Save Button */}
                        <Link to="/tasklist">
                            <button className={styles.editTaskBtn} onClick={handleEditTask}>
                                <span>Edit Task</span><span class="material-symbols-outlined">save</span>
                            </button>
                        </Link>

                        {/* Cancel Button */}
                        <Link to="/tasklist">
                            <button className={styles.cancelTaskBtn}>
                                <span>Cancel</span><span class="material-symbols-outlined">disabled_by_default</span>
                            </button>
                        </Link>
                    </span>
                </div>

                
            </section>
        </>
    )
}

export default EditTask;