import React, { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput,
} from 'mdb-react-ui-kit';
import './regis.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`/users/${email}`);
            const userId = response.data.id;
            localStorage.setItem('userId', userId);
            navigate('/lk')
            // handle successful login logic here
        } catch (error) {
            console.error(error);
            // handle error logic here
        }
    };

    return (
        <MDBContainer fluid>
            <div className="p-5 bg-image" style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', height: '500px' }}></div>
            <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{ marginTop: '-400px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
                <MDBCardBody className='p-5 text-center' style={{ width: '380px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <h2 className="fw-bold mb-5">Войдите в аккаунт</h2>
                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput wrapperClass='mb-4' label='Ваше имя' id='form1' type='text' />
                        </MDBCol>
                    </MDBRow>
                    <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
                    <MDBInput wrapperClass='mb-4' label='Пароль' id='form1' type='password' />
                    <MDBBtn className='w-100 mb-4 gradient-custom-4' size='md' onClick={handleSubmit}>Войти</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default Login;