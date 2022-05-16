import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import Icons from "../../icons";
import blackIcon from '../../assets/images/apple.svg'
export default ({ resource, key }: any) => {

    const [review, setReview] = useState(false)

    return (
        <div className="cm-web" key={key}>
            {/* <Link href={`/en/student/details/${course?.slug}`}> */}
            {resource?.lectures.map((lec: any, index: number) => (
                <div style={{ cursor: 'pointer', height: '250px' }} key={index}>
                    <div className="dhafusd9we0sd-p">
                        <div>
                            <img
                                src="/assets/images/pdf"
                                className="osaidjs-dsadjd"
                                alt="course_img"
                                height="150px"
                                style={{ objectFit: 'contain' }}
                            />
                        </div>

                    </div>
                    <div className="sdhafadsie-sd">
                        <h3>{lec?.title}</h3>

                    </div>
                </div>

            ))}

        </div>
    );
};
