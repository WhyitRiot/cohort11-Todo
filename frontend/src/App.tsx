import Tasks from "./pages/Tasks.tsx";
import {TaskContextProvider} from "./context/TaskContextProvider.tsx";
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar.tsx";

function App() {

    return (
        <>
            <TaskContextProvider>
                <NavBar />
                <Routes>
                    <Route path={"/"} element={<Tasks/>}></Route>
                    <Route path={"/tasks"} element={<Tasks/>}></Route>
                </Routes>
            </TaskContextProvider>
        </>
    )
}

export default App
