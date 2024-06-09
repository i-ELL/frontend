import React, { useEffect, useState } from "react";
import axios from "axios";
import {MDBBtn} from "mdb-react-ui-kit";
import TestComp from "./TestComp";
import {Link, useNavigate} from "react-router-dom";

const TestCollection = () => {
    const [tests, setTests] = useState([]);
    const [answers, setAnswers] = useState([]);
    const userId = localStorage.getItem("userId");
    const [value, setValue] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/testCollection/user/${userId}`);
            const data = await result.json();
            setTests(data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchAnswers = async () => {
            const promises = tests.flatMap((test) =>
                test.tests.map((test1) =>
                    axios.get(`/answers/ques/${test1.id}`).then((response) => response.data)
                )
            );
            const results = await Promise.all(promises);
            setAnswers(results);
        };

        fetchAnswers();
    }, [tests]);

    const postTestCollection = (event) => {
        event.preventDefault();
        axios.post(`/testCollection/auto/${userId}`)
            .then(response => {
                const autoTest = response.data;
                console.log("create test", autoTest.id);
                localStorage.setItem('test', autoTest.id);
                setValue(autoTest.id);
                console.log("val ", value);
                navigate("/test")

                // редиректим на страницу "/test"
                //
            })
            .catch(error => {
                console.error(error.response.data);
            });
        navigate("/test")
    };



    return (
        <div>

            <h1 style={{ display: "flex", justifyContent: "center" }}>
                Ранее пройденные тесты
            </h1>
            <div>
            {/*    <Link to="/test">*/}
            {/*<MDBBtn style={{position: "absolute", top: 10, right: 20}} className='mb-4 gradient-custom-4 w-10'*/}
            {/*        onClick={(event) => {*/}
            {/*            postTestCollection(event);*/}
            {/*            // navigate("/test")*/}
            {/*        }}>Пройти новый тест</MDBBtn>*/}


            {/*    </Link>*/}

                <MDBBtn style={{position: "absolute", top: 10, right: 20}} className='mb-4 gradient-custom-4 w-10'
                        onClick={(event) => {
                            postTestCollection(event)
                        }}>

                    Пройти новый тест
                    {/*<Link to="/test"></Link>*/}
                </MDBBtn>
                {/*<TestComp>propValue={value}</TestComp>*/}
                {value && <TestComp propValue={value} />}


            </div>
            <ul>

                <p style={{
                    display: tests.every((test) => test?.count < 5) || tests.length === 0 ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90vh"
                }}>здесь будут ваши пройденные тесты</p>
                {tests.map((test) => (
                    <li style={{
                        display:  test?.count < 5 ? "none" : "block",
                        listStyle: "none",
                        backgroundColor: 'rgba(208,170,74,0.3)',
                        borderRadius: '24px',
                        padding: "2%", margin: "1%" }} key={test.id}>
                        <h3>Пройденный тест</h3>Количество вопросов: {test.count}
                        {test.tests.map((test1, index) => (
                            <div key={test1.id}>
                                <div style={{padding: "2%", margin: "2%", borderRadius: '24px', backgroundColor :  answers[index]?.correct ? 'rgba(144, 238, 144, 0.7)' : 'rgba(248,136,140,0.7)'}}>
                                    <p>Вопрос {index + 1}</p>
                                    <p>Проверяемое слово: {test1.word1.word}</p>
                                    <p>Правильный перевод: {test1.word1.translate}</p>

                                    {answers[index] && <p> Ваш ответ: {answers[index].translate}</p>}

                                    {answers[index] && <p>Результат: {answers[index].correct ? "Правильный ответ" : "Неправильный ответ"} </p>}
                                </div>
                            </div>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TestCollection;