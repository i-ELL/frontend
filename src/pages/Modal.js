import React, { useEffect, useRef, useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBCheckbox,
} from 'mdb-react-ui-kit';
import axios from "axios";

export default function Modal() {
    const [open, setOpen] = useState(false);
    const [inputFields, setInputFields] = useState([{ id: 1, value: '' }, { id: 2, value: '' }]);
    const inputRef = useRef(null);

    const [successMessage1, setSuccessMessage1] = useState("");
    const [successMessage2, setSuccessMessage2] = useState("");
    const [inputs, setInputs] = useState([
        { sentence: '', translation: '' },
    ]);

    const handleAddField = () => {
        setInputs([...inputs, { sentence: '', translation: '' }]);
    };

    const handleInputChangeSen = (index, field, value) => {
        const newInputs = [...inputs];
        newInputs[index][field] = value;
        setInputs(newInputs);
    };

    useEffect(() => {
        if (open) {
            inputRef.current?.focus();
        }
    }, [open]);

    const handleButtonClick1 = () => {
        setInputFields([...inputFields, { id: inputFields.length + 1, value: '' }, { id: inputFields.length + 2, value: '' }]);
    };

    const handleInputChange1 = (event, index) => {
        const values = [...inputFields];
        values[index].value = event.target.value;
        setInputFields(values);
    };
    const userId = localStorage.getItem('userId');
    const [data, setData] = useState({ word: "", translate: "", img: "", userId: "" });
    const [dataSen, setDataSen] = useState({ sentence: "", translate: "", wordId: ""});

    //ввод слова
    const handleInputChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    //ввод предложения
    const handleInputChangeSentence = (event) => {
        setDataSen({ ...dataSen, sentence: event.target.value });
    };

    const handleInputChangeTranslation = (event) => {
        setDataSen({ ...dataSen, translate: event.target.value });
    };
    //const [wordA, setWordA] = useState([]);

    //записали слово
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setData({ ...data, userId: userId });
            const response = await axios.post("/words", data);
            console.log(response.status);
            setSuccessMessage1("Слово успешно добавлено!");
        } catch (error) {
            console.error(error.response.data);
        }
    };

    var m;



    const handleSubmitSen = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`/words/word/${data.word}`);
            m = response.data.id;
            console.log(response.status);
            console.log("word id");
            console.log(m);

            // setDataSen({
            //     wordId: m
            // });
            setDataSen({ ...dataSen, wordId:  response.data.id});
            console.log("ПредложениеЭ");
            console.log(dataSen.sentence);
            console.log(dataSen.translate);
            console.log(dataSen.wordId);

            const responseSen = await axios.post("/sentences", dataSen);
            console.log(responseSen.status);
            setSuccessMessage2("Предложение успешно записано!");

        } catch (error) {
            console.error(error.response.data);
        }
    };



    return (
        <>
            <MDBBtn style={{display:'flex', marginTop:'5%'}} className='mb-4 gradient-custom-4 w-10' onClick={() => setOpen(!open)}>Добавить слово</MDBBtn>
            <MDBModal open={open} setOpen={setOpen} tabIndex={-1}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Введите новое слово</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setOpen(!open)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput wrapperClass='mb-3' label="Слово" id="typeWord" type="text" ref={inputRef} name="word" value={data.word} onChange={handleInputChange} />
                            <MDBInput wrapperClass='mb-3' label="Перевод" id="typeTranslation" type="text" name="translate" value={data.translate} onChange={handleInputChange}/>
                            <MDBInput wrapperClass='mb-3' label="URL картинки" id="typeURL" type="url" name="img" value={data.img} onChange={handleInputChange}/>
                            <MDBBtn type='button' className='mb-4  gradient-custom-4 w-10' onClick={(event) => {  handleSubmit(event); }}>
                                Добавить слово
                            </MDBBtn>
                            {successMessage1 && <p style={{ color: '#6dae81' }}>{successMessage1}</p>}

                            {/*<MDBBtn className='mb-4  gradient-custom-4 w-10' style={{width: '150px'}} onClick={handleButtonClick1}>*/}
                            {/*    Добавить предложения*/}
                            {/*</MDBBtn>*/}
                            {/*{inputFields.map((field, index) => (*/}
                            {/*    <MDBInput wrapperClass='mb-3'  label="Предложение и перевод" key={field.id} type="text" value={field.value}*/}
                            {/*              onChange={(event) => handleInputChange1(event, index)}/>*/}
                            {/*))}*/}
                            {inputs.map((input, index) => (
                                <div key={index}>
                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Сгенерировать предложение' />
                                    <MDBInput
                                        wrapperClass='mb-3'
                                        type="text"
                                        //value={dataSen.sentence}
                                        onChange={handleInputChangeSentence}
                                        //onChange={(e) => handleInputChangeSen(index, 'sentence', e.target.value)}
                                        label="Предложение"
                                    />
                                    <MDBInput
                                        type="text"
                                        wrapperClass='mb-3'
                                        onChange={handleInputChangeTranslation}
                                        //value={input.translation}
                                        //value={dataSen.translate} onChange={handleInputChangeTranslation}
                                        //onChange={(e) => handleInputChangeSen(index, 'translation', e.target.value)}
                                        label="Перевод"
                                    />
                                    <MDBBtn type='button' className='mb-4  gradient-custom-4 w-10' onClick={handleSubmitSen}>
                                        Записать предложение
                                    </MDBBtn>
                                    {successMessage2 && <p style={{ color: '#6dae81' }}>{successMessage2}</p>}
                                </div>
                            ))}
                            <MDBBtn type='button' className='mb-4  gradient-custom-4 w-10' onClick={handleAddField}>Добавить предложение</MDBBtn>

                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn type='button' className='mb-4  gradient-custom-4 w-10' onClick={() => setOpen(!open)}>Завершить добавление</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}