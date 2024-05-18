import React, { useState } from "react";
import axios from "axios";

const MyComponent = () => {
    const [data, setData] = useState({ name: "", email: "" });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/users", data);
            console.log(response.status);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:
                <input
                    type="text"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default MyComponent;