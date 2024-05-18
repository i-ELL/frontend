import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';
import './regis.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

function Reg() {
    const navigate = useNavigate();
    const [data, setData] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({});

    const [errorMessages, setErrorMessages] = useState([]);

    const handleInputChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/users", data);
            console.log(response.status);
            navigate('/login');
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const validateForm = () => {
        const errorMessages = [];

        if (!data.name) {
            errorMessages.push("Имя не может быть пустым.");
            console.log("Имя не может быть пустым.");
        }

        if (!/^[^@]+@[^@]+\.[^@]+$/.test(data.email)) {
            errorMessages.push("Email должен быть валидным.");
            console.log("Email должен быть валидным.");
        }

        if (data.password && data.password !== data.confirmPassword) {
            errorMessages.push("Пароли не совпадают.");
            console.log("Пароли не совпадают.");
        }

        setErrorMessages(errorMessages);

        return errorMessages.length === 0;
    };

    const ErrorMessages = ({ errorMessages }) => {
        return (
            <div className="text-danger mt-2">
                {errorMessages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
        );
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            handleSubmit(event);
        }
    };

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', height: '100vh'}}>
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{maxWidth: '600px'}}>
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Создайте аккаунт</h2>
                    <form onSubmit={handleFormSubmit}>
                        <MDBInput wrapperClass='mb-4' label='Ваше имя' size='lg' id='form1' name='name' type='text' value={data.name} onChange={handleInputChange} error={errors.name}/>
                        <MDBInput wrapperClass='mb-4' label='Ваш Email' size='lg' id='form2' name='email' type='email' value={data.email} onChange={handleInputChange} error={errors.email}/>
                        <MDBInput wrapperClass='mb-4' label='Пароль' size='lg' id='form3' name='password' type='password' value={data.password} onChange={handleInputChange}/>
                        <MDBInput wrapperClass='mb-4' label='Повторите ваш пароль' size='lg' id='form4' name='confirmPassword' type='password'  onChange={handleInputChange} error={errors.confirmPassword}/>

                        <ErrorMessages errorMessages={errorMessages} />
                        <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit'>Зарегистриорваться!</MDBBtn>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default Reg;