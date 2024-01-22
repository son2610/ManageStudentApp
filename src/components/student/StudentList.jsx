import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { BsGenderAmbiguous, BsGenderFemale } from "react-icons/bs";
import { AiOutlineLoading } from "react-icons/ai";
import { FaUserPen } from "react-icons/fa6";
import Swal from "sweetalert2";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import ModifyStudentModal from "./ModifyStudentModal";

const StudentList = () => {
    const [studentList, setStudentList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState({
        searchText: "",
        sort: "fullname",
        order: "asc",
        page: 1,
        limit: 1,
    });
    const [totalPages, setTotalPages] = useState(0);
    const [searchText, setSearchText] = useState(null);

    useEffect(() => {
        // function getStudentList() {
        //     fetch("https://65a3776fa54d8e805ed3a61a.mockapi.io/student")
        //         .then((response) => response.json())
        //         .then((data) => setStudentList(data));
        // }

        async function getStudentList() {
            setIsLoading(true);
            let res = await fetch(
                `${import.meta.env.VITE_STUDENT_URL}/students?_page=${
                    filter.page
                }&_limit=${filter.limit}&_sort=${filter.sort}&_order=${
                    filter.order
                }&fullname_like=${filter.searchText}`,
                {
                    method: "GET",
                }
            );
            let data = await res.json();
            setStudentList(data);
            setIsLoading(false);
        }
        getStudentList();
    }, [selectedStudent, filter]);

    useEffect(() => {
        async function getTotalRows() {
            let res = await fetch(
                `${import.meta.env.VITE_STUDENT_URL}/students?fullname_like=${
                    filter.searchText
                }`,
                {
                    method: "GET",
                }
            );
            let data = await res.json();

            let total = Math.ceil(Number(data.length) / Number(filter.limit));

            setTotalPages(total);
            console.log(totalPages);
        }
        getTotalRows();
    }, [filter.limit, filter.searchText]);
    const handleRemoveStudent = (id) => {
        Swal.fire({
            title: "Are you sure to remove this student?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                let removeStudentRes = await fetch(
                    `${import.meta.env.VITE_STUDENT_URL}/students/${id}`,
                    {
                        method: "DELETE",
                    }
                );
                let result = await removeStudentRes.json();
                if (result) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                    });
                    setSelectedStudent(result);
                }
            }
        });
    };

    const handleModifyStudent = (student) => {
        setIsModalOpen(true);
        setSelectedStudent(student);
    };

    const handleNextPage = () => {
        if (filter.page <= totalPages - 1) {
            setFilter({
                ...filter,
                page: Number(filter.page) + 1,
            });
        }
    };
    const handlePrevPage = () => {
        if (filter.page > 1) {
            setFilter({
                ...filter,
                page: Number(filter.page) - 1,
            });
        }
    };
    const handleChangePageSize = (e) => {
        setFilter({
            ...filter,
            limit: e.target.value,
        });
    };

    const handleChangeSoryBy = (e) => {
        setFilter({
            ...filter,
            sort: e.target.value,
        });
    };

    const handleChangeOrder = (e) => {
        setFilter({
            ...filter,
            order: e.target.value,
        });
    };
    const handleSearch = (e) => {
        e.preventDefault();
        setFilter({
            ...filter,
            searchText: searchText,
        });
    };
    return (
        <>
            {isLoading ? (
                <div>
                    <AiOutlineLoading className="animate-spin" /> Loading...
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center my-2">
                        <form onSubmit={handleSearch}>
                            <div className="relative w-[300px]">
                                <input
                                    type="search"
                                    id="search-dropdown"
                                    className="block p-2 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                    placeholder="Search"
                                    required
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    className="absolute top-0 end-0 p-2 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={handleSearch}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </form>
                        <div className="flex gap-4">
                            <span>
                                <label>Field</label>
                                <select
                                    name="field"
                                    id="field"
                                    className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
                                    defaultValue={filter.sort}
                                    onChange={handleChangeSoryBy}
                                >
                                    <option value="fullname">Fullname</option>
                                    <option value="email">Email</option>
                                </select>
                            </span>
                            <span>
                                <label>Sort</label>
                                <select
                                    name="sort"
                                    id="sort"
                                    className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
                                    defaultValue={filter.order}
                                    onChange={handleChangeOrder}
                                >
                                    <option value="asc">Ascendent</option>
                                    <option value="desc">Descendent</option>
                                </select>
                            </span>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Fullname
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date of birth
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Mobile
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Department
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList?.map((student) => (
                                <tr
                                    key={student.id}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 "
                                >
                                    <td className="px-6 py-4">{student.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-start gap-4">
                                            <img
                                                src={student.avatarUrl}
                                                alt="avater student"
                                                width={"50px"}
                                                height={"50px"}
                                                className="rounded-full object-cover "
                                            />
                                            <div className="flex flex-col">
                                                <Link
                                                    to={`/student/${student.id}`}
                                                >
                                                    {student.fullname}
                                                </Link>
                                                {Boolean(student.gender) ? (
                                                    <BsGenderAmbiguous className="text-blue-600" />
                                                ) : (
                                                    <BsGenderFemale className="text-orange-600" />
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {dayjs(student.dob).format(
                                            "MMM DD YYYY"
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.mobile}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.department.name}
                                    </td>
                                    <td className=" gap-2 flex items-center justify-center">
                                        <IoPersonRemoveSharp
                                            size={20}
                                            onClick={() =>
                                                handleRemoveStudent(student.id)
                                            }
                                            className="text-red-600 cursor-pointer"
                                        />
                                        <FaUserPen
                                            size={22}
                                            className="text-yellow-500 cursor-pointer"
                                            onClick={() => {
                                                handleModifyStudent(student);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between">
                        <div className="mt-4 flex gap-2">
                            <button
                                type="button"
                                disabled={filter.page <= 1}
                                className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ${
                                    filter.page <= 1
                                        ? "cursor-not-allowed hover:bg-gray-400"
                                        : "cursor-pointer"
                                }`}
                                onClick={handlePrevPage}
                            >
                                Prev
                            </button>
                            <button
                                type="button"
                                className={`text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ${
                                    filter.page >= totalPages
                                        ? "cursor-not-allowed hover:bg-gray-400"
                                        : "cursor-pointer"
                                }`}
                                onClick={handleNextPage}
                            >
                                Next
                            </button>
                        </div>
                        <span>
                            <label>Items per page:</label>
                            <select
                                name="paginate"
                                id="paginate"
                                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5"
                                defaultValue={filter.limit}
                                onChange={handleChangePageSize}
                            >
                                <option value="1">1</option>
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                        </span>
                    </div>
                </>
            )}
            <ModifyStudentModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedStudent={selectedStudent}
                setSelectedStudent={setSelectedStudent}
            />
        </>
    );
};

export default StudentList;
