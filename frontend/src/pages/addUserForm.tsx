import { useEffect, useState } from "react";
import Button from "../components/ui/button";
import axios from "axios";
import { addUser, getUserDetails, postUpdateEentDetails } from "../appRoutes";
import { useNavigate, useParams } from "react-router-dom";

interface FormFields {
    userId?: string;
    userName: string;
    userEmail: string;
    userDescription: string;
    userProfileImage: File | null | string;
}

const AddUserForm = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState<FormFields>({
        userName: "",
        userEmail: "",
        userDescription: "",
        userProfileImage: null,
    });

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("userName", formFields.userName);
        formData.append("userEmail", formFields.userEmail);
        formData.append("userDescription", formFields.userDescription);
        if (formFields.userProfileImage) {
            formData.append("userProfileImage", formFields.userProfileImage);
        }
        axios.post(addUser, formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((res) => {
                console.log(res.data);
                if (res.data?.status === 201) {
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleEdit = async () => {
        const formData = new FormData();
        formData.append("userName", formFields.userName);
        formData.append("userEmail", formFields.userEmail);
        formData.append("userDescription", formFields.userDescription);
        if (formFields.userProfileImage && typeof formFields.userProfileImage !== "string") {
            formData.append("userProfileImage", formFields.userProfileImage);
        }
        axios.post(`${postUpdateEentDetails}/${userId}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
            .then((res) => {
                console.log(res.data);
                if (res.data?.status === 200) {
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleUserDetail = (userId: string) => {
        axios
            .get(`${getUserDetails}/${userId}`)
            .then((res) => {
                if (res.data?.user) {
                    setFormFields({
                        userName: res.data.user.userName,
                        userEmail: res.data.user.userEmail,
                        userDescription: res.data.user.userDescription,
                        userProfileImage: res.data.user.userProfileImage || null,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (userId) {
            handleUserDetail(userId);
        }
    }, [userId]);

    return (
        <div className="w-full h-screen p-10">
            <div className="w-full h-full p-6 max-w-xl mx-auto">
                <div className="text-2xl font-semibold text-center">{userId ? "Edit User" : "Add User"}</div>
                <div className="w-full mt-16 flex flex-col gap-4">
                    <input
                        type="text"
                        value={formFields.userName}
                        onChange={(e) => setFormFields((prev) => ({ ...prev, userName: e.target.value }))}
                        placeholder="Enter user name here"
                        className="px-4 py-2 rounded-lg border border-gray-300"
                    />
                    <input
                        type="email"
                        value={formFields.userEmail}
                        onChange={(e) => setFormFields((prev) => ({ ...prev, userEmail: e.target.value }))}
                        placeholder="Enter user email here"
                        className="px-4 py-2 rounded-lg border border-gray-300"
                    />
                    <textarea
                        value={formFields.userDescription}
                        onChange={(e) => setFormFields((prev) => ({ ...prev, userDescription: e.target.value }))}
                        placeholder="Enter user description here"
                        rows={4}
                        className="px-4 py-2 rounded-lg border border-gray-300"
                    />
                    <input
                        type="file"
                        name="userProfileImage"
                        onChange={(e) =>
                            e.target.files?.[0] &&
                            setFormFields((prev) => ({ ...prev, userProfileImage: e.target.files![0] }))
                        }
                        className="px-4 py-2 rounded-lg border border-gray-300"
                        multiple={false}
                    />
                    {formFields.userProfileImage && (
                        <div className="relative w-40 h-full flex-shrink-0">
                            <button
                                onClick={() => setFormFields((prev) => ({ ...prev, userProfileImage: null }))}
                                className="absolute top-0 right-0 bg-gray-300 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-gray-900 m-2"
                            >
                                ✖
                            </button>
                            <img
                                src={
                                    typeof formFields.userProfileImage === "string"
                                        ? formFields.userProfileImage
                                        : formFields.userProfileImage instanceof File
                                            ? URL.createObjectURL(formFields.userProfileImage)
                                            : undefined
                                }
                                alt=""
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    )}
                    <div className="flex justify-start mt-2">
                        <Button className="bg-gray-700 text-white" onClick={userId ? handleEdit : handleSubmit}>
                            {userId ? "Update" : "Save"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUserForm;
