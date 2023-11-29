import './styles/App.css';
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList"
import AddTask from "./components/AddTask"
import EditTask from "./components/EditTask"
import {createBrowserRouter, RouterProvider} from "react-router-dom"

// Root File App
function App() {

  // Routes for the Components
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children:[
        {
          index: true,
          element: <AddTask/>
        },
        {
          path: "/tasklist",
          element: <TaskList />,
        },
        {
          path: "/:taskId",
          element: <EditTask />
        }
      ]
    }
  ])

  return (
    <RouterProvider router={browserRouter} />
  );
}

export default App;
