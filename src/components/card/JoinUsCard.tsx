import React from 'react';
export default ({color,title,para,btext}:{color:number,title:string,para:string,btext:string})=>{
    return <div className={`ajsdhfnd-awen asdwdewa-${color}`}>
        <h5>{title}</h5>
    <p>{para}</p>
    <button>{btext}</button>
    </div>
}