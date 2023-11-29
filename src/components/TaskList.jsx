import { taskSelector } from '../redux/reducers/taskReducer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../redux/reducers/taskReducer';
import { toast } from "react-toastify";
import styles from "../styles/TaskList.module.css"
import { updateTask } from '../redux/reducers/taskReducer';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

// TaskList Component
function TaskList(){
    
    // Retrieving the tasks array from the reducer
    const {tasks} = useSelector(taskSelector);
    const dispatch = useDispatch();

    // Initialising the sorting state
    const [sortOrder, setSortOrder] = useState('');

    // If sortOrder not selected then display based on time
    const sortedTasks = sortOrder
    ? [...tasks].sort((a, b) => {
        const priorityOrder = { Low: 0, Medium: 1, High: 2 };
        const priorityA = priorityOrder[a.priority];
        const priorityB = priorityOrder[b.priority];

        if (sortOrder === 'asc') {
          return priorityA - priorityB;
        } else {
          return priorityB - priorityA;
        }
      })
    : tasks.slice().sort((a, b) => {
        // Sort based on completion status
        if (a.completed && !b.completed) return 1;
        if (!a.completed && b.completed) return -1;
        return 0;
    });

    
    // Todays Date
    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }

    const todayDate = getTodayDate();

    // Calculating the Remaining Days from the Today's Date
    const calculateRemainingDays = (dueDate) => {
        const dueDateObj = new Date(dueDate);
        const todayObj = new Date(todayDate);
    
        const timeDiff = dueDateObj.getTime() - todayObj.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
        return daysRemaining;
    };

    // Handle checkbox toggle
    const handleCheckboxToggle = (id, completed) => {
        if(completed === false){
            toast.success("Task completed!")
        }

        // Dispatch the updateTask action with the updated completed status
        dispatch(updateTask({ id, updatedTask: { completed: !completed } }));
    };


    return(
        <>
            
            {tasks.length === 0 ? 
            (   
                // Diplay if Tasks array is Empty
                <section className={styles.mainContainer}>
                    <div className={styles.taskContainer}>
                        <div className={styles.taskDetails}>
                            <h1>You haven't added any task! <br/><br/> Yet...</h1>
                        </div>
                    </div>
                </section>
            ) :
            (
                // Diplay if Tasks array isn't empty
                <section className={styles.mainContainer}>

                    {/* Sorting Dropdown */}
                    <div className={styles.sortDropdownContainer}>
                        <label htmlFor="sortOrder">Sort by Priority:</label>
                        <select
                        id="sortOrder"
                        onChange={(e) => setSortOrder(e.target.value)}
                        value={sortOrder}
                        className={styles.sortDropdown}
                        >
                        <option value="">None</option>
                        <option value="asc">Low - Medium - High</option>
                        <option value="desc">High - Medium - Low</option>
                        </select>
                    </div>

                    {/* List of Tasks */}
                    {sortedTasks.map((task) => (
                    <div className={`${styles.taskContainer} ${task.completed ? styles.completedTask : ''}`}>

                        {/* Each Task Card */}
                        <div className={styles.taskDetails}>

                            {/* Task Title */}
                            <div className={`${styles.taskName} ${task.completed ? 'completed' : ''}`}>
                                {task.title}
                            </div>

                            {/* Task Description */}
                            {task.description === '' ? (
                                <div className={`${styles.taskDescription} ${task.completed ? 'completed' : ''}`}>
                                    <small><i>(No task description provided)</i></small>
                                </div>
                            ) : (
                                <div className={`${styles.taskDescription} ${task.completed ? 'completed' : ''}`}>
                                    {task.description}
                                </div>
                            ) }
                            
                            {/* Task Priority */}
                            <div className={`${styles.taskDescription} ${task.completed ? 'completed' : ''}`}>
                                <span className={styles.descriptionTitle}>Priority Level:</span> {task.priority}
                            </div>

                            {/* Task Due Date */}
                            {task.date <= todayDate ? (
                            <div className={`${styles.taskDescription} ${task.completed ? 'completed' : ''}`}>
                                Due Date <u>Completed</u>
                            </div>
                            ) : (
                            <div className={`${styles.taskDescription} ${task.completed ? 'completed' : ''}`}>
                                <span className={styles.descriptionTitle}>Due Date:</span> {task.date} <u>({calculateRemainingDays(task.date)} days remaining)</u>
                            </div>
                            )}
                        </div>


                        {/* Button Container */}
                        <span className={styles.btnContainer}>


                            {/* Edit Button */}
                            <NavLink to={`/${task.id}`}>
                                <span className={styles.editBtn}>
                                    <span class="material-symbols-outlined">edit</span>
                                    <span class="material-symbols-outlined">edit</span>
                                </span>
                            </NavLink>


                            {/* Checkbox */}
                            <span
                                className={styles.checkbox}
                                onClick={() => handleCheckboxToggle(task.id, task.completed)}
                            >
                                {task.completed ? (
                                <span id={styles.checked} className="material-symbols-outlined">check_box</span>
                                ) : (
                                <span id={styles.unchecked} className="material-symbols-outlined">check_box_outline_blank</span>
                                )}
                            </span>
                            

                            {/* Delete Button */}
                            <span 
                            className={styles.deleteBtn}
                            onClick={() => {
                                dispatch(deleteTask(task.id));
                                toast.error('Task deleted!');
                            }}
                            >
                                <span class="material-symbols-outlined">delete</span>
                                <span class="material-symbols-outlined">delete</span>
                            </span>
                        </span>
                    </div>
                    ))}

                </section>
            )}            
        </>
    )
}

export default TaskList;