import { useEffect } from "react";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const MainLayout = (props) => {
    const navigate = useNavigate();
    const getToken = () => {
        let cookieArr = document.cookie
            .split(";")
            .map((item) => item.split("="));
        // console.log("cokiearr", cookieArr);
        let cookieObj = cookieArr.reduce((obj, [key, value]) => {
            obj = {
                ...obj,
                [key.trim()]: value,
            };
            return obj;
        }, {});
        // console.log("cookieObj", cookieObj);
        return cookieObj;
    };

    let cookies = getToken();
    // console.log(cookies);
    useEffect(() => {
        if (!cookies || !cookies.student_app_token) {
            navigate("/not-permission");
        }
    }, [cookies]);
    return (
        <div className="max-w-[1180px] h-full mx-auto">
            <Header />
            <div className="flex flex-row">
                <Sidebar />
                <div className="flex flex-col w-full">{props.children}</div>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
