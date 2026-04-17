import Tasks from "./pages/Tasks.tsx";
import {TaskContextProvider} from "./context/TaskContextProvider.tsx";
import {Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import Categories from "./pages/Categories.tsx";

function App() {

    return (
        <>
            <TaskContextProvider>
                <NavBar />
                <Routes>
                    <Route path={"/"} element={<Tasks/>}></Route>
                    <Route path={"/tasks"} element={<Tasks/>}></Route>
                    <Route path={"/categories"} element={<Categories/>}></Route>
                </Routes>
            </TaskContextProvider>
        </>
    )
}

export default App
