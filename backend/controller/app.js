import User from "../models/models.js";

export const getLoggedInUser = async (req, res) => {
    console.log("trigger")
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: "Unauthorized. No user logged in." });
        }

        const user = await User.findById(req.session.user.id).select("-password");
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getSubAdmins = async (req, res) => {
    try {
        const subAdmins = await User.find({ role: "Sub-Admin" });
        res.status(200).json({ message: "Sub-Admins fetched successfully", subAdmins });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



