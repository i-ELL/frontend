import React from 'react';
import {useNavigate} from "react-router-dom";
import {
    MDBBtn
}     from 'mdb-react-ui-kit';


const WelcomePage = () => {
    const navigate = useNavigate()


    const lightGreen = {
        backgroundImage: "url('https://mobiletrend.de/wp-content/uploads/2017/04/HeaderiDateLondon.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        color: '#222',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
    };

    const overlay = {
        backgroundColor: 'rgba(144, 238, 144, 0.7)', // Add sветло-зеленый цвет с прозрачностью
        height: '100%',
        width: '100%',
        position: 'absolute',
        left: 0,
        top:'0'
    };

    const welcomeStyle = {
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: '20px 30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        marginTop:'3%',
        maxWidth: '800px',
        borderRadius: '24px',
    };

    const imageStyle = {
        width: '100%',
        maxWidth: '400px',
        marginBottom: '20px'
    };

    const benefits = [
        'Удобное изучение английского языка в любое время и в любом месте',
        'Возможность добавлять собственные слова и предложения для практики',
        'Автогенерация предложений на основе вашего словарного запаса',
        'Прохождение тестов в любое время для оценки вашего уровня владения языком'
    ];

    return (
        <div style={lightGreen}>
            <div style={overlay}>
                <div style={welcomeStyle}>
                    <h1 className={'pb-5'}>Добро пожаловать на нашу платформу изучения английского языка!</h1>
                    <div className={'pb-5 d-flex align-items-center'}>
                        <p className={'fs-6 text-start m-0'}>
                            Наша платформа предлагает удобное и эффективное изучение английского языка в любое время и в
                            любом месте. Мы предоставляем возможность добавлять собственные слова и предложения для
                            практики, автогенерацию предложений на основе вашего словарного запаса, а также возможность
                            прохождения тестов в любое время для оценки вашего уровня владения языком.
                        </p>
                        <img style={{width: '33%'}} src="https://englex.ru/app/uploads/pronouns-1.png" alt="Logo"/>
                    </div>
                    <ul className={'text-start'}>
                        {benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                    <MDBBtn className='mb-4 w-40 gradient-custom-4'  onClick={()=> navigate('/reg')} style={{

                        color: 'white',
                        padding: '15px 32px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 2px',
                        cursor: 'pointer',
                        border: 'none',
                        borderRadius: '4px',
                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)'
                    }}>
                        Присоединиться
                    </MDBBtn>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;