import React, { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBIcon,
    MDBCollapse
} from 'mdb-react-ui-kit';

export default function Navs() {
    const [openNavSecond, setOpenNavSecond] = useState(false);

    return (

        <MDBNavbar expand='lg' light bgColor='light' className={`gradient-custom-4 ${localStorage.getItem('userId') ? '' : 'd-none'}`}>
            <MDBContainer fluid>
                <MDBNavbarBrand href='#'>Меню</MDBNavbarBrand>
                <MDBNavbarToggler
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setOpenNavSecond(!openNavSecond)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar open={openNavSecond}>
                    <MDBNavbarNav>
                        <MDBNavbarLink active aria-current='page' href='/lk'>
                            Главная страница
                        </MDBNavbarLink>
                        <MDBNavbarLink active aria-current='page' href='/newpage'>Словарь</MDBNavbarLink>
                        <MDBNavbarLink active aria-current='page' href='/testcol'>Тесты</MDBNavbarLink>
                        {/*<MDBNavbarLink disabled href='#' tabIndex={-1} aria-disabled='true'>*/}
                        {/*    Disabled*/}
                        {/*</MDBNavbarLink>*/}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}