import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../../models/models.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, role } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();

        req.session.user = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        };

        console.log("added")

        res.status(201).json({ message: "User registered successfully", user: req.session.user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        res.status(200).json({ message: "Login successful", user: req.session.user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const createSubAdmin = async (req, res) => {
    console.log("passed")
    try {
        const { name, email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const newSubAdmin = new User({
            name,
            email,
            role: "Sub-Admin",
        });

        await newSubAdmin.save();
        console.log("created")
        res.status(201).json({ message: "Sub-Admin created successfully", user: newSubAdmin });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const editSubAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        let updateData = { name, email };
        const updatedSubAdmin = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedSubAdmin) {
            return res.status(404).json({ message: "Sub-Admin not found" });
        }

        res.status(200).json({ message: "Sub-Admin updated successfully", user: updatedSubAdmin });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteSubAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "Sub-Admin not found" });
        }

        res.status(200).json({ message: "Sub-Admin deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
