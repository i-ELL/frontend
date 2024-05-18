import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from 'lodash';

const TestComp = () => {
    const userId = 353; // Replace with the actual user ID
    const [data, setData] = useState(null);
    const [answer, setAnswer] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`/testCollection/user/${userId}`);
            setData(result.data);
        };

        fetchData();
        console.log(data);
    }, [userId]);

    if (data === null) {
        return <div>Loading...</div>;
    }

    var Cor;


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
                Cor = `${correct}`;
                console.log(`Правильный ответ: `, Cor);

            })
            .catch(error => console.error(error));

    };

    return (
        <div>
            {data.map((item) => (
                <div key={item.id}>
                    {item.tests &&
                        item.tests.map((test, index) => (
                            <div key={test.id}>
                                <p>Вопрос №{index + 1}</p>
                                <p>Выберите перевод слова {test.word1.word} </p>
                                <ul>
                                    {[
                                        { value: test.word1.translate, label: test.word1.translate },
                                        { value: test.word2.translate, label: test.word2.translate },
                                        { value: test.word3.translate, label: test.word3.translate },
                                        { value: test.word4.translate, label: test.word4.translate },
                                    ].map((option, index) => (
                                        <li key={index}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question-${test.id}`} // Use the test id as the name to ensure separate groups for each question
                                                    value={option.value}
                                                    onChange={(e) => {
                                                        handleSubmit(e, test.id);
                                                        console.log(`Selected option: ${e.target.value}`);
                                                    }}

                                                />
                                                {option.label}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                                {answer !== null && answer && <p>Правильный ответ</p>}
                                {answer !== null && !answer && <p>Неправильный ответ</p>}
                                <p>Ваш ответ {Cor}</p>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default TestComp;