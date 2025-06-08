// models/Payment.js
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
    {
        customer_name: {
            type: String,
            required: true,
        },
        customer_email: {
            type: String,
            required: true,
        },
        customer_phone: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        payment_status: {
            type: String,
            default: 'PENDING',
        },
        payment_link_id: {
            type: String,
        },
        payment_link_url: {
            type: String,
        },
        payment_method: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
