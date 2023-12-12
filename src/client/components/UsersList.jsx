import { useState, useEffect } from "react";
import axios from "axios";

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        let API = "http://localhost:3000/api";

        try {
            const response = await axios.get(`${API}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(token);
            setUsers(response.data.users);
            console.log(response.data.users)
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    }

    return (
        <ul style={{marginTop: "80px"}}>
            {users.map((user) => (
                <li key={user.id}>
                    <h4>#{user.id}</h4>
                    <h4>{user.first_name}</h4>
                    <h4>{user.last_name}</h4>
                    <h4>${user.email}</h4>
                </li>
            ))}
        </ul>
    );
}
