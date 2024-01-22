import DepartmentPage from "./pages/DepartmentPage";
import { Routes, Route } from "react-router-dom";
import StudentPage from "./pages/StudentPage";
import StudentList from "./components/student/StudentList";
import CreateStudent from "./components/student/CreateSudent";
import StudentDetail from "./components/student/StudentDetail";
import LoginPage from "./pages/LoginPage";
import NotPermissionPage from "./pages/NotPermissionPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/department" element={<DepartmentPage />} />
                <Route path="/" element={<DepartmentPage />} />
                <Route path="/dashboard" element={<DepartmentPage />} />

                <Route path="/student" element={<StudentPage />}>
                    <Route index element={<StudentList />} />
                    <Route path="list" element={<StudentList />} />
                    <Route path="add" element={<CreateStudent />} />
                    {/* dynamic route */}
                    <Route path=":studentId" element={<StudentDetail />} />
                </Route>
                <Route path="/not-permission" element={<NotPermissionPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}

export default App;
