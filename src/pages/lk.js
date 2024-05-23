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
                                    <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                                        Edit profile
                                    </MDBBtn>

                                </div>
                            </div>
                            <div className="p-4 text-black" style={{backgroundColor: '#f8f9fa'}}>
                                <div className="d-flex justify-content-end text-center py-1">
                                    <div>
                                        <MDBCardText className="mb-1 h5">253</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Words</MDBCardText>
                                    </div>
                                    <div className="px-3">
                                        <MDBCardText className="mb-1 h5">1026</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Tests</MDBCardText>
                                    </div>

                                </div>
                            </div>
                            <Link to="/newpage">
                                <MDBBtn className='w-100 mb-4 gradient-custom-4' size='md'>Перейти к созданию
                                    слов</MDBBtn>
                            </Link>
                            <Link to="/test">
                                <MDBBtn className='w-100 mb-4 gradient-custom-4' size='md'>Перейти к тестам</MDBBtn>
                            </Link>
                            
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        </div>
    );
}
