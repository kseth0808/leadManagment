import { dataManagement } from "../models/models.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await dataManagement.find();
        if (!users.length) {
            return res.status(404).json({ status: 404, message: "No users found" });
        }

        const usersWithMappedIds = users.map(user => ({
            userId: user._id,
            userName: user.userName,
            userEmail: user.userEmail,
            userDescription: user.userDescription,
            userProfileImage: user.userProfileImage
                ? `data:image/jpeg;base64,${user.userProfileImage}`
                : null,
        }));

        res.status(200).json({ status: 200, message: "Users retrieved successfully", users: usersWithMappedIds });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
    }
};


export const getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await dataManagement.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }
        const formattedUser = {
            userId: user._id,
            userName: user.userName,
            userEmail: user.userEmail,
            userDescription: user.userDescription,
            userProfileImage: user.userProfileImage
                ? `data:image/jpeg;base64,${user.userProfileImage}`
                : null,
        };

        res.status(200).json({ status: 200, message: "User details retrieved successfully", user: formattedUser });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
    }
};


