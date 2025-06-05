import sendEmail from '../utils/sendEmail.js';
export const sendOtp = async (req, res) => {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    try {
        await sendEmail(email, 'OTP Verification', `Your OTP is: ${otp}`);
        res.json({ message: 'OTP sent to email', otp });
    } catch (error) {
        console.error('Error sending OTP email:', error);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
};
