import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const elementMenu = ["Dashboard", "Student"];
const items = [
    getItem(elementMenu[0], "1", <PieChartOutlined />),
    getItem(elementMenu[1], "2", <DesktopOutlined />),
];
const Sidebar = () => {
    const navigate = useNavigate();
    const onClick = (e) => {
        const stt = e.key - 1;
        navigate("/" + elementMenu[stt]);
    };
    return (
        <aside
            style={{
                width: 256,
            }}
        >
            <Menu
                defaultSelectedKeys={["1"]}
                mode="inline"
                theme="light"
                items={items}
                onClick={onClick}
            />
        </aside>
    );
};
export default Sidebar;
