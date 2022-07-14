import moment from 'moment'
import Link from 'next/link'
import React from 'react'

const ZyBooks = ({ item }: any) => {
    return (
        <>
            <Link href={`/en/instructor/courseDetail/${item?.id}`} style={{cursor:'pointer'}}>
                <div className='zybooks_wrapper'>
                    <div className="card_zybooks" style={{ backgroundImage: `url(${item.cover_image})` }}>
                        <div className='blur-color'>
                            <div className='card_title' >
                                <h3>{item?.title}</h3>
                            </div>
                        </div>

                        <div className='card_footer'>
                            <div className='footer_content'>
                                <h4>Total Students : {item?.students_enrolled}</h4>
                                <p>{moment(item?.created_at).format('ll')}</p>
                            </div>
                        </div>
                    </div>



                </div>
            </Link>
        </>
    )
}

export default ZyBooks