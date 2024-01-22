import MainLayout from "../layouts/MainLayout";
import { Button } from "antd";
import { TeamOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, Outlet } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";

import { Radio } from "antd";

import { useNavigate } from "react-router-dom";

const StudentPage = () => {
    const location = useLocation();
    const { studentId } = useParams();
    const pathname =
        location.pathname === "/Student" ? "/student/list" : location.pathname;
    // console.log(pathname);
    // const isActive = pathname === "Student" || pathname === "list";
    // console.log(isActive);
    const navigate = useNavigate();
    const handleOnchange = (e) => {
        navigate(e.target.value);
    };
    return (
        <MainLayout>
            {/* <div className="flex min-w-full flex-col">
                <ul className="list-none flex flex-row text-2xl p-0 m-o gap-3">
                    <li className="border-2">
                        <Button type="primary" icon={<TeamOutlined />}>
                            <NavLink to={"/student/list"}>Student List</NavLink>
                        </Button>
                    </li>
                    <li>
                        <Button primary type="text" icon={<UserAddOutlined />}>
                            <NavLink to={"/student/add"}>
                                Create Student
                            </NavLink>
                        </Button>
                    </li>
                    <li>
                        <Button type="text" icon={<UserOutlined />}>
                            Student Details
                        </Button>
                    </li>
                </ul>
            </div> */}
            <Radio.Group value={pathname} onChange={(e) => handleOnchange(e)}>
                <Radio.Button value="/student/list">Student List</Radio.Button>
                <Radio.Button value="/student/add">Create Student</Radio.Button>
                {studentId && (
                    <Radio.Button value={`/student/${studentId}`}>
                        Student Detail
                    </Radio.Button>
                )}
            </Radio.Group>

            <Outlet />
        </MainLayout>
    );
};

export default StudentPage;
