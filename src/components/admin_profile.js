import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AdminProfile = () => {
    const { admin_id } = 5;  // Get the admin_id from the URL params
    const [admin, setAdmin] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch admin profile data from an API
        const fetchAdminData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/show_admin_profile/?admin_id=5`); // Use backticks for string interpolation
                setAdmin(response.data.data);
                console.log(response.data)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin profile:", error);
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [admin_id]);  // Add admin_id to the dependency array

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="main">
            <h1>Admin Profile</h1>
            <div className="profile-details mt-3">
                <p><strong>Id:</strong> {admin.admin_id || 'N/A'}</p>
                <p><strong>Name:</strong> {admin.admin_fname} {admin.admin_lname}</p>
                <p><strong>Email:</strong> {admin.admin_email}</p> {/* Dynamically render email if available */}
                <p><strong>Phone:</strong> {admin.admin_phone}</p>  {/* Dynamically render phone if available */}
                <p><strong>Role:</strong> {admin.admin_role}</p>
                <p><strong>Joined Date:</strong> {admin.admin_date_joined}</p>
            </div>
        </div>
    );
};

export default AdminProfile;
