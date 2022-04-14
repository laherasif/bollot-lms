import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import Icons from "../../icons";
export default () => {

    const [ques, setQues] = useState([
        {
            question: '',
            option: [
                { name: "first" },
                { name: "second" },
                { name: "third" },
                { name: "forth" },
            ]
        }
    ])

    const Questions = () => {
        setQues([...ques , 
            {
                question: '',
                option: [
                    { name: "first" },
                    { name: "second" },
                    { name: "third" },
                    { name: "forth" },
                ]
            }


        ])
    }

    const removeInputFields = (index: number) => {
        const rows = [...ques];
        rows.splice(index, 1);
        setQues(rows);
    }
    const handleChange = (index: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
        debugger
        const { name, value } = evnt.target;
        const list: any = [...ques];
        list[index][name] = value;
        setQues(list);



    }

    const handleChangeRadio = (index: number, i: number, evnt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evnt.target;
        const list: any = [...ques];
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            for (let j = 0; j < element.option.length; j++) {
                const elements = element.option[j];
                elements.value = 0
            }
        }

        list[index].option[i].value = 1;
        // setQues(list);



    }




    return (
        <>
            {ques && ques.map((q, index) => (
                <div className="p-3 quiz" key={index}>
                    <div className="p-field  ">
                        <div className="d-flex " style={{ justifyContent: 'space-between' }}>
                            <Icons name="i24" />
                            <label>Question </label>
                            {(ques.length !== 1) ? <button className="btn btn-info mb-2" onClick={() => removeInputFields(index)}>Delete</button> : ""}
                        </div>
                        <input
                            type="text"
                            name="question"
                            className="w-100"
                            value={q.question}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Write here..." />

                    </div>
                    {q.option.map((op, i) => (
                        <div className="">
                            <input id={op.name} onChange={(e) => handleChangeRadio(index, i, e)} value={1} name={op.name} type="radio" />
                            <label htmlFor={op.name}>{op.name}</label>
                        </div>

                    ))}





                </div>
            ))}
            <span onClick={() => Questions()}>+ Add more question</span>
        </>
    );
};
