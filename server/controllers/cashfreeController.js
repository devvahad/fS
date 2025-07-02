// controllers/cashfreeController.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const createPaymentLink = async (req, res) => {
  try {
    const { customer_name, customer_email, customer_phone, amount } = req.body;

    // 1. Get Access Token
    const tokenResponse = await axios.post(
      `${process.env.CASHFREE_BASE_URL}/oauth/token`,
      {
        grant_type: 'client_credentials',
        client_id: process.env.CASHFREE_CLIENT_ID,
        client_secret: process.env.CASHFREE_CLIENT_SECRET,
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // 2. Create Payment Link
    const paymentLinkResponse = await axios.post(
      `${process.env.CASHFREE_BASE_URL}/links`,
      {
        customer_details: {
          customer_name,
          customer_email,
          customer_phone,
          amount,
          payment_status: 'PENDING',
          payment_link_id: process.env.CASHFREE_CLIENT_ID,
          payment_link_url: process.env.CASHFREE_BASE_URL
        },
        link_notify: {
          send_sms: true,
          send_email: true,
        },
        link_amount: amount,
        link_currency: 'INR',
        link_purpose: 'Registration Fee',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'x-api-version': '2022-09-01',
        },
      }
    );

    res.json({ success: true, paymentLink: paymentLinkResponse.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false, message: 'Error creating payment link' });
  }
};
