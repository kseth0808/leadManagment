import axios from "axios";
import { useState } from "react";
import { postSignUp } from "../appRoutes";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const SignUp = () => {

    const [formField, setFormField] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Super Admin",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate()
    const { fetchUserData } = useUser()

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (formField.password !== formField.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        setError("");
        axios.post(postSignUp, formField, { withCredentials: true })
            .then(async (res) => {
                console.log(res.data)
                await fetchUserData()
                navigate("/dashboard")

            })
            .catch((err) => {
                console.log(err)
            })
    };

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form
                className="max-w-lg w-full p-4 rounded-lg border border-gray-300 shadow-lg bg-white"
                onSubmit={handleSubmit}
            >
                <div className="text-lg font-medium text-center">Sign Up</div>
                <div className="w-full flex flex-col gap-4 mt-6">
                    <input
                        type="text"
                        name="name"
                        value={formField.name}
                        onChange={(e) => setFormField({ ...formField, name: e.target.value })}
                        className="px-4 py-2 rounded-lg border border-gray-300"
                        placeholder="Enter your name..."
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formField.email}
                        onChange={(e) => setFormField({ ...formField, email: e.target.value })}
                        className="px-4 py-2 rounded-lg border border-gray-300"
                        placeholder="Enter your email..."
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formField.password}
                        onChange={(e) => setFormField({ ...formField, password: e.target.value })}
                        className="px-4 py-2 rounded-lg border border-gray-300"
                        placeholder="Enter your password..."
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formField.confirmPassword}
                        onChange={(e) => setFormField({ ...formField, confirmPassword: e.target.value })}
                        className="px-4 py-2 rounded-lg border border-gray-300"
                        placeholder="Confirm your password..."
                        required
                    />

                    <div className="flex justify-center gap-2 my-3 w-full">
                        {["Super Admin", "Sub-Admin", "Support Agent", "Lead"].map((role) => (
                            <button
                                key={role}
                                type="button"
                                onClick={() => setFormField({ ...formField, role })}
                                className={`px-3 py-1 rounded-full text-sm ${formField.role === role ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}


                    <button type="submit" className="px-4 py-2 rounded-lg bg-gray-700 text-white">
                        Sign Up as {formField.role}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
