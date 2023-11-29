import styles from "../styles/Navbar.module.css"
import {Outlet, NavLink} from "react-router-dom";

// Navbar Component
function Navbar(){
    return(
        <>

        {/* Main Navbar Container */}
        <nav className={styles.navContainer}>

            {/* Logo & Home Page */}
            <NavLink to={"/"}>
            <div className={styles.logoContainer}>
                <img src="https://cdn-icons-png.flaticon.com/128/7072/7072925.png" alt="logo"/>
                <h1>Task Management App</h1>
            </div>
            </NavLink>

            {/* Tasks List Page */}
            <NavLink to={"/tasklist"}>
            <div className={styles.listContainer}>
                <span class="material-symbols-outlined">list</span>
                <h2>Task List</h2>
            </div>
            </NavLink>
        </nav>
        <Outlet />
        </>
    )
}

export default Navbar;