import React, { useEffect, useState } from "react";
import axios from "axios";

const TestCollection = () => {
    const [tests, setTests] = useState([]);
    const [answers, setAnswers] = useState([]);
    const userId = localStorage.getItem("userId");

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

    return (
        <div>
            <h1 style={{ display: "flex", justifyContent: "center" }}>
                Ранее пройденные тесты
            </h1>
            <ul>
                {tests.map((test) => (
                    <li style={{ listStyle: "none", backgroundColor:  'rgba(208,170,74,0.3)', borderRadius: '24px', padding: "2%", margin: "1%" }} key={test.id}>
                        <h3>Пройденный тест</h3>Количество вопросов: {test.count}
                        {test.tests.map((test1, index) => (
                            <div key={test1.id}>
                                <div style={{padding: "2%", margin: "2%", borderRadius: '24px', backgroundColor :  answers[index].correct ? 'rgba(144, 238, 144, 0.7)' : 'rgba(248,136,140,0.7)'}}>
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