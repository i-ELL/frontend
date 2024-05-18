import { useState } from "react";

const SaveLocalStorage = () => {
    const [data, setData] = useState({});

    const saveData = () => {
        // Преобразуйте объект data в строку JSON
        const dataString = JSON.stringify(data);

        // Запишите данные в локальное хранилище
        localStorage.setItem("myData", dataString);
    };

    return (
        <>
            {/* Отображение данных и элементов управления */}

            <button onClick={saveData}>Сохранить данные</button>
        </>
    );
};

export default SaveLocalStorage;