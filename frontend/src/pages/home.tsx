import { useEffect, useState } from "react";
import Button from "../components/ui/button";
import axios from "axios";
import { getAllUsers, postDeleteUser } from "../appRoutes";
import { useNavigate } from "react-router-dom";

interface User {
    userId: string;
    userName: string;
    userEmail: string;
    userDescription: string;
    userProfileImage: string | null;
}

const Home = () => {

    const [users, setusers] = useState<User[]>([])
    const [loading, setloading] = useState(false)

    useEffect(() => {
        setloading(true)
        axios.get(getAllUsers)
            .then((res) => {
                setusers(res.data?.users)
                setloading(false)
                console.log(res.data)
            })
            .catch((err) => {
                setloading(false)
                setusers(err)
                console.log(err)
            })
    }, [])

    const navigate = useNavigate();

    const handleAddUser = () => {
        navigate("/addUser")
    }

    const handleEdit = (userId: string) => {
        navigate(`/addUser/${userId}`)
    }

    const handeDelete = (userId: string) => {
        axios.delete(`${postDeleteUser}/${userId}`)
            .then((res) => {
                setusers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className=" w-full h-screen p-10">
            <div className=" w-full h-full p-6 ">
                <div className=" text-2xl font-semibold text-center">Data Manage</div>
                <div className=" w-full mt-16">
                    <Button className=" bg-gray-800 text-white" onClick={handleAddUser}>Add User</Button>
                    <div className=" w-full border border-gray-300 mt-4 mb-10"></div>
                    <div className=" grid grid-cols-12 gap-4">
                        {loading ? (
                            <div className=" col-span-12">Loading...</div>
                        ) : (
                            <>
                                {users.length > 0 ? users?.map((data, index) => (
                                    <div className=" col-span-3" key={index}>
                                        <div className=" w-full border border-gray-300 rounded-lg">
                                            <div className=" w-full h-full flex-shrink-0">
                                                <img src={data?.userProfileImage || ""} alt="" className=" w-full h-full object-cover rounded-t-lg" />
                                            </div>
                                            <div className=" p-4 w-full">
                                                <div className=" text-lg font-medium">{data.userName}</div>
                                                <div className=" text-sm">{data.userDescription}</div>
                                                <div className=" w-full flex items-center justify-end gap-2 mt-4">
                                                    <Button className="  bg-gray-700 text-white" onClick={() => handleEdit(data.userId)}>Edit</Button>
                                                    <Button className=" bg-gray-700 text-white" onClick={() => handeDelete(data.userId)}>Delete</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="">No user found!</div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;