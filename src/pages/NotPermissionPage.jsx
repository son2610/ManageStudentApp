import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotPermissionPage = () => {
    return (
        <div className="w-full h-dvh flex items-center justify-center flex-col text-xl gap-2">
            <FaTimesCircle size={70} className="text-red-600" />
            <div className="text-5xl">Access Denied</div>
            <p>You do not have permission to access this page</p>
            <p>
                Please <Link to={"/login"}>Signin</Link> and try again
            </p>
        </div>
    );
};

export default NotPermissionPage;
