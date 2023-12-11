import { useState, useEffect } from "react";
import axios from "axios";

export default function UsersList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        let API = "http://localhost:3000/api";

        try {
            const response = await axios.get(`${API}/users`);
            console.log(response);
            setUsers(response.data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    }

    return (
        <ul>
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
