import { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function EditButton() {
    const [user, setUser] = useState(null);
    const userId = localStorage.getItem('userId');


    useEffect(() => {
        if (userId) {
            axios.get(`/users/id/${userId}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user: ', error);
                });
        }
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }

    <h1 className="user-name-pink">{user.name}</h1>




    return (
        <div className="gradient-custom-2" style={{backgroundColor: 'rgba(144, 238, 144, 0.7)'}}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="9" xl="7">
                        <MDBCard>
                            <div className="rounded-top text-white"
                                 style={{backgroundColor: '#000', height: '200px'}}>
                                <div  style={{width: '150px'}}>
                                    {/*<MDBCardImage*/}
                                    {/*    src="https://sun1-27.userapi.com/s/v1/if1/9rXWLfNuiaJ6UkIzq81AWQ223sbmgmggbHHnQ2QrkXXrcXq19T8e9lB3Z_bMun94nc3OZAON.jpg?size=872x872&quality=96&crop=62,33,872,872&ava=1"*/}
                                    {/*    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid*/}
                                    {/*    style={{width: '150px', zIndex: '1'}}/>*/}


                                </div>
                                <div className="ms-3" style={{marginTop: '130px'}}>
                                    <MDBTypography tag="h5">{user.name}</MDBTypography>
                                    <MDBCardText>{user.email}</MDBCardText>
                                    <Link to="/">
                                    <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                                        Выйти
                                    </MDBBtn>
                                    </Link>

                                </div>
                            </div>
                            <div className="p-4 text-black" style={{backgroundColor: '#f8f9fa'}}>
                                <div className="d-flex justify-content-end text-center py-1">
                                    <div>
                                        <MDBCardText className="mb-1 h5">0</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Words</MDBCardText>
                                    </div>
                                    <div className="px-3">
                                        <MDBCardText className="mb-1 h5">0</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Tests</MDBCardText>
                                    </div>

                                </div>
                            </div>
                            <Link to="/newpage">
                                <MDBBtn className='w-100 mb-4 gradient-custom-4' size='md'>Перейти к созданию
                                    слов</MDBBtn>
                            </Link>
                            <Link to="/testcol">
                                <MDBBtn className='w-100 mb-4 gradient-custom-4' size='md'>Перейти к тестам</MDBBtn>
                            </Link>
                            {/*<MDBCardBody className="text-black p-4">*/}
                            {/*    <div className="mb-5">*/}
                            {/*        <p className="lead fw-normal mb-1">Напишите информацию о себе</p>*/}
                            {/*        <div className="p-4" style={{backgroundColor: '#f8f9fa'}}>*/}
                            {/*            <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>*/}

                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <div className="d-flex justify-content-between align-items-center mb-4">*/}
                            {/*        <MDBCardText className="lead fw-normal mb-0">Статистика</MDBCardText>*/}

                            {/*    </div>*/}

                                {/*<MDBRow>*/}
                                {/*    <MDBCol className="mb-2">*/}
                                {/*        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"*/}
                                {/*                      alt="image 1" className="w-100 rounded-3" />*/}
                                {/*    </MDBCol>*/}
                                {/*    <MDBCol className="mb-2">*/}
                                {/*        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"*/}
                                {/*                      alt="image 1" className="w-100 rounded-3" />*/}
                                {/*    </MDBCol>*/}
                                {/*</MDBRow>*/}
                                {/*<MDBRow className="g-2">*/}
                                {/*    <MDBCol className="mb-2">*/}
                                {/*        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"*/}
                                {/*                      alt="image 1" className="w-100 rounded-3" />*/}
                                {/*    </MDBCol>*/}
                                {/*    <MDBCol className="mb-2">*/}
                                {/*        <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"*/}
                                {/*                      alt="image 1" className="w-100 rounded-3" />*/}
                                {/*    </MDBCol>*/}
                                {/*</MDBRow>*/}
                            {/*</MDBCardBody>*/}
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        </div>
    );
}