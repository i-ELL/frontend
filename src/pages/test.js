import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBInput } from 'mdb-react-ui-kit';

function Test() {
    const [showForm, setShowForm] = useState(false);
    const [inputFields, setInputFields] = useState([{ id: 1, value: '' }, { id: 2, value: '' }]);

    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // handle form submission logic here
        addInputFields();
        setShowForm(false);
    };

    const addInputFields = () => {
        setInputFields([...inputFields, { id: inputFields.length + 1, value: '' }, { id: inputFields.length + 2, value: '' }]);
    };

    const handleInputChange1 = (event, index) => {
        const values = [...inputFields];
        values[index].value = event.target.value;
        setInputFields(values);
    };

    return (
        <div>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                <MDBBtn className="mb-4 gradient-custom-4 w-10" style={{ width: '100px' }} onClick={handleButtonClick}>
                    Добавить слово
                </MDBBtn>
                {showForm && (
                    <form onSubmit={handleFormSubmit}>
                        <MDBInput wrapperClass="mb-3 " label="Слово" id="typeURL" type="text" />
                        <MDBInput wrapperClass="mb-3" label="Перевод" id="typeURL" type="text" />
                        <MDBInput wrapperClass="mb-3" label="URL картинки" id="typeURL" type="url" />
                        <MDBBtn className="mb-4 gradient-custom-4 w-10" style={{ width: '100px' }} onClick={addInputFields}>
                            Add Input Fields
                        </MDBBtn>
                        <form>
                            {inputFields.map((field, index) => (
                                <input key={field.id} type="text" value={field.value} onChange={(event) => handleInputChange1(event, index)} />
                            ))}
                        </form>

                        <MDBBtn className="mb-4 gradient-custom-4" type="submit">Создать</MDBBtn>
                    </form>
                )}
            </MDBContainer>
        </div>
    );
}

export default Test;