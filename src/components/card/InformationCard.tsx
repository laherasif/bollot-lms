import React from 'react';
import Icons from '../../icons';
export default ({title,icon,number}:{title:string,icon:string,number:string})=>{
    return   <div className="vector">
    <Icons name={icon}/>
     <h3>{number}</h3>
     <p>{title}</p>
   </div>

}