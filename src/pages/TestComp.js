import React, {useEffect, useState} from "react";
import axios from "axios";
import _ from 'lodash';
import {MDBBtn} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";

function TestComp(props){
    const testIDls = localStorage.getItem("test");

    const userId = localStorage.getItem('userId');
    const [data, setData] = useState(null);
    const [answer, setAnswer] = useState(null);

    const [correct, setCorrect] = useState(null);


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`/testCollection/user/${userId}`);
            setData(result.data);
        };

        fetchData();
        console.log("data", data);
    }, [userId]);

    useEffect(() => {
        if (data && data.length > 0 && currentQuestionIndex < data[data.length -1].tests.length) {
            setCurrentQuestion(data[data.length -1].tests[currentQuestionIndex]);
        }
    }, [data, currentQuestionIndex]);

    if (data === null) {
        return <div>Loading...</div>;
    }

    var Cor;

    console.log("data1", data);

    const handleSubmit = (e, testId) => {
        const translateUsers = e.target.value;

        const dataToSend = {
            translateUsers,
            testId,
        };

        fetch('/answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
            .then(response => response.json())
            .then(data => {
                const {id, translate, correct} = data;
                console.log(`ID: ${id}`);
                console.log(`Перевод: ${translate}`);
                setAnswer(`${correct}`);
                setCorrect(correct);
                console.log(`сет коррект: `, correct);
                Cor = `${correct}`;
                console.log(`Правильный ответ: `, Cor);

            })
            .catch(error => console.error(error));

    };



    const nextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const resetRadioButtons = (questionId) => {
        const radioButtons = document.getElementsByName(`question-${questionId}`);
        for (let i = 0; i < radioButtons.length; i++) {
            radioButtons[i].checked = false;
        }
    };

    return (
        <div>
            <p style={{
                display: data[data.length-1].count === 0 ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
                height: "90vh"
            }}>Вы можете создавать тесты, после добавления хотя бы пяти слов</p>

            {currentQuestion && (
                <div>
                    <p style={{display: 'flex', justifyContent: 'center'}}>Вопрос №{currentQuestionIndex + 1}</p>
                    <p style={{display: 'flex', justifyContent: 'center'}}>Выберите перевод
                        слова {currentQuestion.word1.word} </p>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <ul style={{listStyleType: 'none'}}>
                            {[
                                {value: currentQuestion.word1.translate, label: currentQuestion.word1.translate},
                                {value: currentQuestion.word2.translate, label: currentQuestion.word2.translate},
                                {value: currentQuestion.word3.translate, label: currentQuestion.word3.translate},
                                {value: currentQuestion.word4.translate, label: currentQuestion.word4.translate},
                            ].map((option, index) => (
                                <li key={index}>
                                    <label>
                                        <input
                                            disabled={answer !== null}
                                            type="radio"
                                            name={`question-${currentQuestion.id}`} // Use the test id as the name to ensure separate groups for each question
                                            value={option.value}
                                            onChange={(e) => {
                                                handleSubmit(e, currentQuestion.id);
                                                console.log(`Selected option: ${e.target.value}`);
                                            }}
                                        />
                                        {option.label}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {answer !== null && (
                        <p style={{
                            display: 'flex',
                            justifyContent: 'center',
                            color: correct ? 'green' : 'red'
                        }}>{correct ? "Правильный ответ" : "Неправильный ответ"}</p>
                    )}

                    {/*<p>Ваш ответ {correct}</p>*/}
                    {currentQuestionIndex < data[data.length - 1].tests.length - 1 && (
                        <MDBBtn style={{display: 'flex', justifyContent: 'center'}}
                                className='mb-4 gradient-custom-4 w-10' disabled={answer === null} onClick={() => {
                            setAnswer(null);
                            nextQuestion();
                            resetRadioButtons(currentQuestion.id);
                        }}>Следующий вопрос</MDBBtn>)}
                    {currentQuestionIndex === data[data.length - 1].tests.length - 1 && (
                        <Link to="/testcol">
                            <MDBBtn style={{display: 'flex', justifyContent: 'center'}}
                                    className='mb-4 gradient-custom-4 w-10' disabled={answer === null} onClick={() => {
                                setAnswer(null);
                                resetRadioButtons(currentQuestion.id);
                            }}>Завершить тест</MDBBtn>
                        </Link>)}
                </div>
            )}
        </div>
    );
};

export default TestComp;