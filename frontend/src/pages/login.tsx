import axios from "axios";
import { useState } from "react";
import { postLogin } from "../appRoutes";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [formField, setFormField] = useState({
        email: "",
        password: "",
    });

    const { fetchUserData } = useUser()
    const navigate = useNavigate()

    const handleLogin = (e: any) => {
        e.preventDefault();
        axios.post(postLogin, formField, { withCredentials: true })
            .then(async (res) => {
                console.log(res.data)
                await fetchUserData()
                navigate("/dashboard")

            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 rounded-lg border border-gray-300 shadow-lg bg-white">
                <div className="text-lg font-medium text-center">Login</div>
                <div className="w-full flex flex-col gap-4 mt-6">
                    <input
                        type="email"
                        name="email"
                        value={formField.email}
                        onChange={(e) => setFormField({ ...formField, email: e.target.value })}
                        className="px-4 py-2 rounded-lg border border-gray-300"
                        placeholder="Enter your email here..."
                    />
                    <input
                        type="password"
                        name="password"
                        value={formField.password}
                        onChange={(e) => setFormField({ ...formField, password: e.target.value })}
                        className="px-4 py-2 rounded-lg border border-gray-300"
                        placeholder="Enter your password here..."
                    />
                    <button className="px-4 py-2 rounded-lg bg-gray-700 text-white" onClick={handleLogin}>Login</button>
                    <button className="" onClick={() => navigate("/SignUp")}>Dont have an account SignUp</button>
                </div>
            </div>
        </div>
    )
}

export default Login;