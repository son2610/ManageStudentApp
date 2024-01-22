import { Link, useNavigate } from "react-router-dom";
import AccountLayout from "../layouts/AccountLayout";
import { FaUserShield } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const schema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
});

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "eve.holt@reqres.in",
            password: "cityslicka",
        },
    });
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        try {
            let loginRes = await fetch("https://reqres.in/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            let data = await loginRes.json();
            if (data?.token) {
                let date = new Date();
                let expires = date.setDate(date.getDate() + 1);
                // let expires = date.setMinutes(date.getMinutes() + 1);
                document.cookie = `student_app_token = ${
                    data.token
                }; expires = ${new Date(expires).toUTCString()}`;
                navigate("/student", { replace: true });
            }
        } catch (error) {
            toast.error("User not found!!!");
        }
    };
    return (
        <AccountLayout>
            <div className="flex items-center justify-center flex-col gap-4 w-[500px] mx-auto border border-black shadow p-4 rounded">
                <div className="text-blue-600 text-6xl">
                    <FaUserShield />
                    <span> Student App</span>
                </div>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="flex flex-col text-xl">
                        <label>Email:</label>
                        <input
                            type="email"
                            size={30}
                            className="text-xl"
                            {...register("email")}
                        />
                        <span className="text-red-600">
                            {errors?.email?.message}
                        </span>
                    </div>
                    <div className="flex flex-col text-xl mt-2">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="text-xl"
                            {...register("password")}
                        />
                        <span className="text-red-600">
                            {errors?.password?.message}
                        </span>
                    </div>
                    <button className="bg-blue-300 cursor-pointer w-full mt-4 py-2">
                        Submit
                    </button>
                    <div className="flex items-center justify-center mt-2">
                        <Link to="#">Forgot password</Link>
                    </div>
                </form>
            </div>
        </AccountLayout>
    );
};

export default LoginPage;
