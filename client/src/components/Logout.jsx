import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';

const Logout = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/api/users/logout', {}, {
                withCredentials: true // So the token cookie is included
            });


            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>

    );
};

export default Logout;
