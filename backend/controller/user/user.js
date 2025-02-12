import multer from "multer";
import { dataManagement } from "../../models/models.js";
import fs from "fs";
import mongoose from "mongoose";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const addUser = async (req, res) => {
    upload.single("userProfileImage")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "File upload error", error: err.message });
        }

        try {
            console.log("Request Body:", req.body);
            console.log("Uploaded File:", req.file);

            const { userName, userEmail, userDescription } = req.body;
            const userProfileImage = req.file ? req.file.buffer.toString("base64") : "";

            if (!userName || !userEmail || !userDescription) {
                return res.status(400).json({ status: 400, message: "All fields are required" });
            }

            const newUser = new dataManagement({
                userName,
                userEmail,
                userDescription,
                userProfileImage,
            });

            await newUser.save();
            console.log("User added successfully!");

            res.status(201).json({ status: 201, message: "User added successfully" });

        } catch (error) {
            res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
        }
    });
};

export const updateUser = async (req, res) => {
    upload.single("userProfileImage")(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ status: 400, message: "File upload error", error: err.message });
        }

        try {
            const { userId } = req.params;
            const { userName, userEmail, userDescription } = req.body;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ status: 400, message: "Invalid User ID" });
            }

            const existingUser = await dataManagement.findOne({ _id: new mongoose.Types.ObjectId(userId) });
            if (!existingUser) {
                return res.status(404).json({ status: 404, message: "User not found" });
            }
            const updatedData = {
                userName: userName || existingUser.userName,
                userEmail: userEmail || existingUser.userEmail,
                userDescription: userDescription || existingUser.userDescription,
            };
            if (req.file) {
                updatedData.userProfileImage = req.file.buffer.toString("base64");
            }
            await dataManagement.updateOne({ _id: userId }, { $set: updatedData });

            return res.status(200).json({ status: 200, message: "User updated successfully" });
        } catch (error) {
            console.error("Update Error:", error);
            return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
        }
    });
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("Deleting User ID:", userId);
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ status: 400, message: "Invalid User ID" });
        }

        const deletedUser = await dataManagement.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        return res.status(200).json({ status: 200, message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        return res.status(500).json({ status: 500, message: "Internal Server Error", error: error.message });
    }
};




