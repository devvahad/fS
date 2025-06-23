import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: 'User not found' });

  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetToken = resetToken;
  user.tokenExpire = Date.now() + 10 * 60 * 1000;
  await user.save();

  const link = `http://localhost:3000/reset-password/${resetToken}`;
  await sendEmail(email, 'Reset Password', `Reset using this link: ${link}`);

  res.json({ message: 'Reset link sent to email' });
  console.log(`Reset Token: ${resetToken}`);

};

export const resetPassword = async (req, res) => {
  const { newPassword, token } = req.body;
  const user = await User.findOne({ resetToken: token, tokenExpire: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  user.password = newPassword;
  user.resetToken = undefined;
  user.tokenExpire = undefined;
  await user.save();

  res.json({ message: 'Password reset successful' });
};
