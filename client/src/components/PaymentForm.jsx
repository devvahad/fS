import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        amount: '',
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePay = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/payment/cashfree-link', formData);
            window.location.href = res.data.link; // Redirect to payment page
        } catch (err) {
            alert('Error creating payment link');
            console.error(err);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
            <h2 className="text-xl mb-4">Pay Now</h2>
            <input name="customer_name" placeholder="Name" className="mb-2 w-full border p-2" onChange={handleChange} />
            <input name="customer_email" placeholder="Email" className="mb-2 w-full border p-2" onChange={handleChange} />
            <input name="customer_phone" placeholder="Phone" className="mb-2 w-full border p-2" onChange={handleChange} />
            <input name="amount" placeholder="Amount" type="number" className="mb-4 w-full border p-2" onChange={handleChange} />
            <button onClick={handlePay} className="bg-blue-600 text-white px-4 py-2 rounded">Generate Payment Link</button>
        </div>
    );
};

export default PaymentForm;
