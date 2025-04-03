import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { useUser } from "../context/userContext";
import { leads, leadStats, recentActivity, users } from "../components/ui/data";
import axios from "axios";
import { getSubAdmin, postCreateSubAdmin, postDeleteSubAdmi, postEditCreateSubAdmin } from "../appRoutes";

interface subAdmin {
    id: string,
    name: string,
    role: string,
    email: string
}

const Dashboard = () => {

    const { user } = useUser();

    const [userRole, setUserRole] = useState(user?.role);
    const [subAdmin, setsubAdmin] = useState<subAdmin[]>([])
    const [formField, setFormField] = useState({
        userName: "",
        role: "",
        email: ""
    });
    const [shwoModal, setshwoModal] = useState({
        vissible: false,
        type: "",
        data: {}
    })

    const handleEditAssignClick = (data: any, type: any) => {
        setshwoModal({ ...shwoModal, vissible: true, type: type, data: data })
        setFormField({ ...formField, userName: data.name, role: data.role, email: data.email })
    }

    useEffect(() => {
        axios.post(getSubAdmin, {}, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                setsubAdmin(res.data.subAdmins)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleCreateSubAdmin = (e: any) => {
        e.preventDefault();
        axios.post(postCreateSubAdmin, formField, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleEditSubAdmin = (e: any) => {
        e.preventDefault();
        axios.post(postEditCreateSubAdmin, formField, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handledeleteSubAdmin = (id: any) => {
        axios.post(postDeleteSubAdmi, id, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
                setsubAdmin(subAdmin => subAdmin.filter(subAdmin => subAdmin.id !== id));
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="flex h-screen">
            <aside className="w-64 bg-gray-900 text-white p-4">
                <div className="text-lg font-bold mb-4">{user?.role}</div>
                <nav className="space-y-2">
                    {userRole === "Super Admin" && (
                        <button className={`block w-full text-left px-4 py-2 rounded-lg ${userRole === "Super Admin" ? "bg-blue-500" : "hover:bg-gray-700"}`} onClick={() => setUserRole("Super Admin")}>
                            Super Admin Section
                        </button>
                    )}
                    {userRole === "Sub-Admin" && (
                        <button className={`block w-full text-left px-4 py-2 rounded-lg ${userRole === "Sub-Admin" ? "bg-green-500" : "hover:bg-gray-700"}`} onClick={() => setUserRole("Sub-Admin")}>
                            Sub-Admin Section
                        </button>
                    )}
                    {userRole === "Support Agent" && (
                        <button className={`block w-full text-left px-4 py-2 rounded-lg ${userRole === "Support Agent" ? "bg-purple-500" : "hover:bg-gray-700"}`} onClick={() => setUserRole("Support Agent")}>
                            Support Agent Section
                        </button>
                    )}
                </nav>
            </aside>
            <main className="flex-1 p-6 overflow-auto">
                <h1 className="text-2xl font-bold mb-4">Dashboard - {userRole}</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-500 text-white p-4 rounded-lg">
                        <div className="text-lg">Total Leads</div>
                        <p className="text-xl font-bold">{leads.length}</p>
                    </div>
                    <div className="bg-yellow-500 text-white p-4 rounded-lg">
                        <div className="text-lg">New Leads</div>
                        <p className="text-xl font-bold">{leadStats.new}</p>
                    </div>
                    <div className="bg-green-500 text-white p-4 rounded-lg">
                        <div className="text-lg">Won Leads</div>
                        <p className="text-xl font-bold">{leadStats.won}</p>
                    </div>
                    <div className="bg-red-500 text-white p-4 rounded-lg">
                        <div className="text-lg">Lost Leads</div>
                        <p className="text-xl font-bold">{leadStats.lost}</p>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="text-xl font-bold mb-2">Recent Activity</div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((activity) => (
                                <div key={activity.id} className="border-b py-2">
                                    <p className="text-sm">
                                        <span className="font-semibold">{activity.user}</span> {activity.action}
                                    </p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            ))
                        ) : (
                            <p>No recent activity.</p>
                        )}
                    </div>
                </div>
                {userRole === "Super Admin" && (
                    <div className="mt-6 bg-blue-500 text-white p-4 rounded-lg">
                        <div className="text-lg font-bold mb-2">Super Admin Section</div>
                        <p className="mb-4">Manage users and assign leads.</p>
                        <div className="text-md font-semibold">Sub Admins</div>
                        <ul className="bg-blue-600 p-2 rounded-lg mt-2 flex justify-between">
                            <div className=" flex flex-col gap-2">
                                {subAdmin.map((user) => (
                                    <li key={user.id} className="flex justify-between items-center gap-4 border-b border-blue-400 py-1">
                                        <div className=" flex flex-col gap-2 w-full">{user.name} ({user.role})
                                            ({user.email})
                                        </div>
                                        <button className="bg-white text-blue-700 px-2 py-1 text-xs rounded" onClick={() => handleEditAssignClick(user, "editUser")}>Edit</button>
                                        <button className="bg-white text-blue-700 px-2 py-1 text-xs rounded" onClick={() => handledeleteSubAdmin(user?.id)}>Delete</button>
                                    </li>
                                ))}
                            </div>
                            <Button onClick={() => setshwoModal({ ...shwoModal, vissible: true, data: {}, type: "" })} className=" bg-white text-black text-xs h-max">Add Sub-Admin</Button>
                        </ul>
                        <div className="text-md font-semibold mt-4">Support Agents</div>
                        <ul className="bg-blue-600 p-2 rounded-lg mt-2">
                            {leads.map((lead) => (
                                <li key={lead.id} className="flex justify-between items-center border-b border-blue-400 py-1">
                                    <span>{lead.lead} → {lead.assignedTo}</span>
                                    <button className="bg-white text-blue-700 px-2 py-1 text-xs rounded" onClick={() => handleEditAssignClick(lead, "asignLead")}>Assign</button>
                                </li>
                            ))}
                        </ul>
                        <div className="text-md font-semibold mt-4">System Overview</div>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="bg-blue-700 p-3 rounded-lg text-center">
                                <h4 className="text-sm">Total Users</h4>
                                <p className="text-lg font-bold">{users.length}</p>
                            </div>
                            <div className="bg-blue-700 p-3 rounded-lg text-center">
                                <h4 className="text-sm">Total Leads</h4>
                                <p className="text-lg font-bold">{leads.length}</p>
                            </div>
                        </div>
                    </div>
                )}
                {userRole === "Sub-Admin" && (
                    <div className="mt-6 bg-green-500 text-white p-4 rounded-lg">
                        <div className="text-lg">Sub-Admin Section</div>
                        <p>Manage leads and assign to agents.</p>
                    </div>
                )}
                {userRole === "Support Agent" && (
                    <div className="mt-6 bg-purple-500 text-white p-4 rounded-lg">
                        <div className="text-lg">Support Agent Section</div>
                        <p>View and update assigned leads.</p>
                    </div>
                )}
                <Modal
                    show={shwoModal.vissible}
                    onHide={() => setshwoModal(prevState => ({ ...prevState, vissible: false }))}
                    centered={true}
                >
                    <ModalHeader closeButton>
                    </ModalHeader>
                    <ModalBody>
                        {shwoModal.data && (
                            shwoModal.type === "editUser" ? (
                                <div className=" w-full h-full">
                                    <div className=" flex flex-col gap-4">
                                        <input type=" text" name="email" value={formField.email} onChange={(e: any) => setFormField({ ...formField, email: e.target.value })} className=" w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter your email here..." />
                                        <input type=" text" name="userName" value={formField.userName} onChange={(e: any) => setFormField({ ...formField, userName: e.target.value })} className=" w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter your name here..." />
                                        <div className=" flex items-center gap-2 w-full">
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
                                    </div>
                                </div>
                            ) : shwoModal.type === "asignLead" ? (
                                <div className=" w-full h-full">
                                    <div>Asign support agent to lead</div>
                                    <select className="w-full p-2 border rounded mt-2">
                                        <option value="">Select a Lead</option>
                                        {users.filter(data => data.role === "Support Agent").map((data) => (
                                            <option key={data.id}>{data.name}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (
                                <div className=" flex flex-col gap-4">
                                    <input type=" text" name="email" value={formField.email} onChange={(e: any) => setFormField({ ...formField, email: e.target.value })} className=" w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter your email here..." />
                                    <input type=" text" name="userName" value={formField.userName} onChange={(e: any) => setFormField({ ...formField, userName: e.target.value })} className=" w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter your name here..." />
                                    <div className=" flex items-center gap-2 w-full">
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
                                </div>
                            )
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {shwoModal.type === "" ? (
                            <>
                                <Button>Cancel</Button>
                                <Button onClick={handleCreateSubAdmin}>Add Sub admin</Button>
                            </>
                        ) : (
                            <>
                                <Button>Cancel</Button>
                                <Button onClick={handleEditSubAdmin}>Update</Button>
                            </>
                        )}
                    </ModalFooter>
                </Modal>
            </main>
        </div>
    );
};

export default Dashboard;
