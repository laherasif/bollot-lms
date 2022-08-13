import Link from 'next/link';
import React from 'react';
export default ({ color, title, para, btext, link }: { color: number, title: string, para: string, btext: string, link: string }) => {
    return <div className={`ajsdhfnd-awen asdwdewa-${color}`}>
        <h5>{title}</h5>
        <p>{para}</p>
        <Link href={link}>
            <button>{btext}</button>
        </Link>
    </div>
}