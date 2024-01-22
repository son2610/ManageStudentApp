import React from "react";
import { FaQuestionCircle, FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-dvh flex items-center justify-center flex-col text-xl gap-2">
            <FaQuestionCircle size={70} className="text-yellow-400" />
            <div className="text-5xl">Page Not Found</div>
            <p>Oops! We couldn't find the page that you're looking for.</p>
            <p>Please check the address and try again.</p>
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="p-4 border border-yellow-400 flex items-center justify-center bg-transparent text-yellow-600 cursor-pointer hover:bg-yellow-200 hover:text-black"
            >
                <FaBackward />
                Back to previous
            </button>
        </div>
    );
};

export default NotFoundPage;
