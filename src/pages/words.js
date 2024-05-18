import React, {useEffect, useState} from 'react';
import {Component} from "react";
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardLink,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import axios from "axios";

import Modal from "./Modal";
export default function Cards()  {
    const centerStyle = {
        width: '450px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '40px'
    };
    const [words, setWords] = useState([]);
    const [wordsWithSentences, setWordsWithSentences] = useState([]);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            axios.get(`/words/user/${userId}`)
                .then(response => {
                    setWords(response.data);
                })
                .catch(error => {
                    console.error('Error fetching words: ', error);
                });
        }
    }, [userId]);

    const [sentences, setSentences] = useState([]);

    useEffect(() => {
        Promise.all(words.map(word =>
            axios.get(`/sentences/word/${word.id}`)
                .then(response => {
                    word.sentences = response.data;
                })
                .catch(error => {
                    console.error(`Error fetching sentences for word ${word.id}: `, error);
                })
        ))
            .then(() => {
                setWordsWithSentences(words);
            });
    }, [words]);






    return (
        <div>

            <Modal></Modal>
            {/*<MDBListGroup style={{ width: '90%', padding: '10px' }}>*/}
            {/*    {wordsWithSentences.map((word) => (*/}
            {/*        <MDBListGroupItem key={word.id}>*/}
            {/*            {word.word} ({word.translate})*/}
            {/*            <ul>*/}
            {/*                {word.sentences.map((sentence, index) => (*/}
            {/*                    <li key={index}>{sentence.sentence}</li>*/}
            {/*                ))}*/}
            {/*            </ul>*/}
            {/*        </MDBListGroupItem>*/}
            {/*    ))}*/}
            {/*</MDBListGroup>*/}
            {wordsWithSentences.map((word) => (
                <MDBCard key={word.id} style={centerStyle}>
                    <MDBListGroup style={{width: '90%', padding: '10px'}} flush>
                        <MDBListGroupItem>{word.word} </MDBListGroupItem>
                        <MDBListGroupItem>{word.translate}</MDBListGroupItem>

                        <div>
                            {word.sentences.map((sentence) => (
                                <div key={sentence.id}>
                                    <MDBListGroupItem>{sentence.sentence} </MDBListGroupItem>
                                    <MDBListGroupItem>({sentence.translate}) </MDBListGroupItem></div>

                            ))}
                        </div>


                    </MDBListGroup>
                    <MDBCardImage style={{width: '80%'}} position='top' alt='...' src={word.img}/>
                    <MDBCardBody>

                        <MDBCardLink href='#'>Редактировать</MDBCardLink>
                    </MDBCardBody>
                </MDBCard>
            ))}
        </div>
    );
}