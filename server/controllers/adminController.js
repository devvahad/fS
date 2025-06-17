// controllers/adminController.js
import User from '../models/userModel.js';

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true }); // Optional
    const recentUsers = await User.find({ createdAt: { $lt: new Date() } }).sort({ createdAt: -1 }).limit(5);

    res.json({
      totalUsers,
      activeUsers,
      recentUsers
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};
