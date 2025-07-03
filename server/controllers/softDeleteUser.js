import User from "../models/userModel.js";

export const softDeleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        user.isDeleted = true;
        user.deletedAt = new Date();

        await user.save();

        res.status(200).json({
            message: 'user successfully deleted'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};