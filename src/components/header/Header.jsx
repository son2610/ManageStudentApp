import { PiStudentFill } from "react-icons/pi";
import { Divider } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const handleSigout = () => {
        navigate("/login", { replace: true });
    };
    return (
        <>
            <header className="flex flex-row items-center py-2 justify-between">
                <span className="flex flex-row items-center text-3xl gap-2 no-underline">
                    <Link to={"/"} style={{ textDecoration: "none" }}>
                        <PiStudentFill size={30} />
                        Student App
                    </Link>
                </span>
                <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    size="large"
                    onClick={handleSigout}
                >
                    Sign Out
                </Button>
            </header>
            <Divider />
        </>
    );
};

export default Header;
