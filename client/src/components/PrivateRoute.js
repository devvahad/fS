// src/components/PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

<Routes>
    <Route path="/" element={<Home />} />
    <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
    </Route>
</Routes>
