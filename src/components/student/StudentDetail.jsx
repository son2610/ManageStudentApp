import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Image, Card, Space, Divider, Row, Col } from "antd";
import { FaUser, FaBirthdayCake, FaMobileAlt } from "react-icons/fa";
import { MdEmail, MdTransgender } from "react-icons/md";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { FcDepartment } from "react-icons/fc";
import dayjs from "dayjs";

const StudentDetail = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState({});
    const getStudentById = async () => {
        const studentRes = await fetch(
            `${import.meta.env.VITE_STUDENT_URL}/students/${studentId}`,
            {
                method: "GET",
            }
        );
        const data = await studentRes.json();
        console.log(data);
        setStudent(data);
    };
    useEffect(() => {
        getStudentById();
    }, [studentId]);

    return (
        <>
            {student !== "Not found" ? (
                <Row justify="center" align="center" className="p-4">
                    <Col span={8} className="flex items-center justify-center">
                        <Image width={220} src={student.avatarUrl} />
                    </Col>
                    <Col span={16}>
                        <Card
                            title="Infomation Student"
                            size="small"
                            style={{ width: "100%" }}
                            bordered={false}
                        >
                            <div>
                                <p>
                                    <FaUser /> {student.fullname}
                                </p>
                                <Divider dashed orientationMargin={100} />
                            </div>
                            <div>
                                <p>
                                    <MdEmail /> {student.email}
                                </p>
                                <Divider dashed />
                            </div>
                            <div>
                                <p>
                                    <FaBirthdayCake />{" "}
                                    {dayjs(student.dob).format("MMM DD YYYY")}
                                </p>
                                <Divider dashed />
                            </div>
                            <div>
                                <p>
                                    <MdTransgender />{" "}
                                    {student.gender ? "Male" : "Female"}
                                </p>
                                <Divider dashed />
                            </div>
                            <div>
                                <p>
                                    <FaMobileAlt /> {student.mobile}
                                </p>
                                <Divider dashed />
                            </div>
                            <div>
                                <p>
                                    <FcDepartment /> {student?.department?.name}
                                </p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <div>Not found!!!</div>
            )}
            <Link to={"/student/list"} className="flex items-center">
                <TbPlayerTrackPrevFilled size={20} className="pr-2" /> Back to
                List Student
            </Link>
        </>
    );
};

export default StudentDetail;
