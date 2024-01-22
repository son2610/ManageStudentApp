import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { Button, DatePicker, Form, Input, Radio, Select, Space } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const CreateSudent = () => {
    const [departments, setDepartments] = useState([]);
    const [loadings, setLoadings] = useState([]);
    useEffect(() => {
        async function getDepartment() {
            let res = await fetch(
                `${import.meta.env.VITE_STUDENT_URL}/deparment`,
                {
                    method: "GET",
                }
            );
            let data = await res.json();
            setDepartments(data);
        }
        getDepartment();
    }, []);
    const config = {
        rules: [
            {
                type: "object",
                required: true,
                message: "Please select time!",
            },
        ],
    };
    const [form] = Form.useForm();
    const { Option } = Select;
    const onReset = () => {
        form.resetFields();
    };
    const onFinish = (values) => {
        values = {
            ...values,
            gender: values.gender === "male" ? true : false,
            dob: dayjs(values.dob).toISOString(),
            department: values.department && JSON.parse(values.department),
        };

        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });
        //call API to create new student
        fetch(`${import.meta.env.VITE_STUDENT_URL}student`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoadings((prevLoadings) => {
                    const newLoadings = [...prevLoadings];
                    newLoadings[0] = false;
                    return newLoadings;
                });
                toast.success("Student created successfully");
                onReset();
            });
    };

    return (
        <div className="w-full">
            <Form
                className="border rounded"
                layout="vertical"
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Row gutter={8}>
                    <Col xs={24} md={12} lg={12} className="">
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
                                <Form.Item
                                    name="dob"
                                    label="DatePicker"
                                    {...config}
                                >
                                    <DatePicker format="YYYY/MM/DD" />
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
                    <Col xs={24} md={12} lg={12} className="">
                        <Form.Item
                            label="Email Address"
                            name="email"
                            rules={[
                                {
                                    type: "email",
                                    message: "The input is not valid E-mail!!",
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
                                    message: "Please select your department",
                                },
                            ]}
                        >
                            <Select placeholder="Please select a department">
                                {/* Option value */}
                                {departments.map((department) => (
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
                                    message: "Please select your url Avatar",
                                },
                                {
                                    type: "url",
                                    message: "Your url does not valid",
                                },
                            ]}
                        >
                            <Input placeholder="Avatar Url" />
                        </Form.Item>
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loadings[0]}
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
                        </Space>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default CreateSudent;
