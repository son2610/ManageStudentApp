import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import {
    Button,
    DatePicker,
    Form,
    Input,
    Radio,
    Select,
    Image,
    Flex,
} from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const ModifyStudentModal = (props) => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const [avaterModify, setAvatarModify] = useState(null);

    const { isModalOpen, setIsModalOpen, selectedStudent, setSelectedStudent } =
        props;

    const handleOk = async (values) => {
        let temp = {};
        temp = {
            ...values,
            gender: values.gender === "male" ? true : false,
            dob: dayjs(values.dob).toISOString(),
            department: JSON.parse(values.department),
        };
        try {
            let modifyStudentRes = await fetch(
                `${import.meta.env.VITE_STUDENT_URL}/students/${
                    selectedStudent?.id
                }`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(temp),
                }
            );
            let res = await modifyStudentRes.json(); // oject
            if (Object.keys(res).length) {
                toast.success("Modify successful!!!");
                setAvatarModify(null);
                setIsModalOpen(false);
                setSelectedStudent(null);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!!!!");
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setAvatarModify(null);
        setIsModalOpen(false);
    };
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        async function getDepartment() {
            let res = await fetch(
                `${import.meta.env.VITE_STUDENT_URL}/department`,
                { method: "GET" }
            );
            let data = await res.json();
            setDepartments(data);
        }
        getDepartment();
    }, []);

    useEffect(() => {
        if (selectedStudent) {
            const formattedBirthday = dayjs(selectedStudent?.dob);
            form.setFieldsValue({
                fullname: selectedStudent?.fullname,
                email: selectedStudent?.email,
                mobile: selectedStudent?.mobile,
                avatarUrl: selectedStudent?.avatarUrl,
                dob: formattedBirthday,
                department: JSON.stringify(selectedStudent?.department),
                gender: selectedStudent?.gender ? "male" : "female",
                // dob: "2024-03-02",
            });
        }
    }, [selectedStudent]);

    return (
        <Modal
            title="Basic Modal"
            open={isModalOpen}
            // onOk={(e) => handleOk(e)}
            onCancel={handleCancel}
            maskClosable={false}
            width={"80%"}
            centered={true}
            footer={null}
        >
            <div className="w-full">
                <Form
                    className="border rounded"
                    layout="vertical"
                    form={form}
                    name="control-hooks"
                    // onFinish={onFinish}
                    scrollToFirstError
                    onFinish={handleOk}
                >
                    <Row gutter={8}>
                        <Col xs={24} md={10} lg={10} className="">
                            <Form.Item
                                label="Full name"
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your name",
                                    },
                                ]}
                            >
                                <Input placeholder="Your name" />
                            </Form.Item>
                            <Row>
                                <Col md={12}>
                                    <Form.Item name="dob" label="DatePicker">
                                        <DatePicker format="YYYY-MM-DD" />
                                    </Form.Item>
                                </Col>

                                <Col md={12}>
                                    <Form.Item
                                        label="Gender"
                                        name="gender"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please select your gender",
                                            },
                                        ]}
                                    >
                                        <Radio.Group>
                                            <Radio value="male">Male</Radio>
                                            <Radio value="female">Female</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item
                                label="Mobile Number"
                                name="mobile"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your phone",
                                    },
                                ]}
                            >
                                <Input placeholder="Your mobile phone" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={10} lg={10} className="">
                            <Form.Item
                                label="Email Address"
                                name="email"
                                rules={[
                                    {
                                        type: "email",
                                        message:
                                            "The input is not valid E-mail!!",
                                    },
                                    {
                                        required: true,
                                        message: "Please input your email!!!",
                                    },
                                ]}
                            >
                                <Input placeholder="Email..." />
                            </Form.Item>
                            <Form.Item
                                label="Department"
                                name="department"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please select your department",
                                    },
                                ]}
                            >
                                <Select placeholder="Please select a department">
                                    {/* Option value */}
                                    {departments?.map((department) => (
                                        <Option
                                            key={department.id}
                                            value={JSON.stringify(department)}
                                        >
                                            {department.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="AvatarUrl"
                                name="avatarUrl"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please select your url Avatar",
                                    },
                                    {
                                        type: "url",
                                        message: "Your url does not valid",
                                    },
                                ]}
                                onChange={
                                    (e) => setAvatarModify(e.target.value)
                                    // console.log(e.target.value)
                                }
                            >
                                <Input placeholder="Avatar Url" />
                            </Form.Item>
                            {/* <Space>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    // loading={loadings[0]}
                                >
                                    Submit
                                </Button>
                                <Button
                                    type="button"
                                    onClick={onReset}
                                    className="bg-gray-600 text-white"
                                >
                                    Cancel
                                </Button>
                            </Space> */}
                        </Col>
                        <Col xs={24} md={4} lg={4}>
                            <Image
                                src={avaterModify || selectedStudent?.avatarUrl}
                                alt="Avatar"
                                width={"100%"}
                                height={"100%"}
                            />
                        </Col>
                    </Row>
                    <Flex justify="center" align="center" gap="large">
                        <Button
                            type="primary"
                            htmlType="submit"
                            // loading={loadings[0]}
                        >
                            Submit
                        </Button>
                        <Button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-600 text-white"
                        >
                            Cancel
                        </Button>
                    </Flex>
                </Form>
            </div>
        </Modal>
    );
};

export default ModifyStudentModal;
