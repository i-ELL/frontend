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
    const [pass, setPass] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();

    const ErrorMessages = ({ errorMessages }) => {
        return (
            <div className="text-danger mt-2">
                {errorMessages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setErrorMessages([]);
            const response = await axios.get(`/users/${email}`);
            if (response.data.length === 0) {
                console.log("data empty");
                setErrorMessages(prevErrorMessages => [...prevErrorMessages, "Неверный email."]);
            } else {
                const userId = response.data.id;
                const passwordGet = response.data.password;
                if (passwordGet == pass) {
                    localStorage.setItem('userId', userId);
                    navigate('/lk')
                    window.location.reload();
                } else {
                    setErrorMessages(prevErrorMessages => [...prevErrorMessages, "Неверный пароль."]);
                }
            }
            // handle successful login logic here
        } catch (error) {
            console.error(error);
            setErrorMessages(prevErrorMessages => [...prevErrorMessages, "Ошибка при получении данных."]);
            // handle error logic here
        }
    };

    return (
        <MDBContainer fluid>
            <div className="p-5 bg-image" style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)' , backgroundColor: 'rgba(144, 238, 144, 0.7)', height: '500px', background: 'rgba(144, 238, 144, 0.7)' }}></div>
            <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{ marginTop: '-400px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
                <MDBCardBody className='p-5 text-center'
                             style={{width: '380px', marginLeft: 'auto', marginRight: 'auto'}}>
                    <h2 className="fw-bold mb-5">Войдите в аккаунт</h2>
                    <MDBRow>
                        <MDBCol col='6'>
                            {/*<MDBInput wrapperClass='mb-4' label='Ваше имя' id='form1' type='text' />*/}
                        </MDBCol>
                    </MDBRow>
                    <form onSubmit={handleSubmit}>
                        <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' value={email}
                                  onChange={(event) => setEmail(event.target.value)}/>
                        <MDBInput wrapperClass='mb-4' label='Пароль' id='form1' type='password' value={pass}
                                  onChange={(event) => setPass(event.target.value)}/>

                        <ErrorMessages errorMessages={errorMessages}/>
                        <MDBBtn className='w-100 mb-4 gradient-custom-4' size='md' >Войти</MDBBtn>

                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
};

export default Login;