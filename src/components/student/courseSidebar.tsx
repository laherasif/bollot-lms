import Link from 'next/link'
import React from 'react'
import { useSelector, RootStateOrAny } from 'react-redux'
import { Header2Item } from '../../../pages/[language]/instructor/details/[id]'
const CourseSideBar = ({courseId}:any) => {
    const { User } = useSelector((state: RootStateOrAny) => state.userReducer)

    return (
        <>
            <div className="aksldnsd-sdnaskdse">
                {/* <div className="aksldnsd-sdnaskdse-1">
                    <img src={User?.image} alt="user_image" />
                    <p>{User?.fullname}</p>
                </div> */}
                <div className="hsaid9iawdeka">
                    <div >
                        <h2 className="ksdfhd-active">Content</h2>
                        <div>
                            <Header2Item title="Week 01" isChecked={false} />
                            <Header2Item title="Week 02" isChecked={true} />
                            <Header2Item title="Week 03" isChecked={false} />
                            <Header2Item title="Week 04" isChecked={false} />
                        </div>
                    </div>
                    <div>
                        <h2>Notes</h2>
                    </div>
                    <div>
                        <h2>Announcements</h2>
                    </div>
                    <div>
                        <h2>Resources</h2>
                    </div>
                    <div>
                        
                        <h2>Live Classes</h2>
                    </div>
                    <div>
                      <Link href={`/en/student/quiz/${courseId}`}>
                        <h2>Quiz</h2>
                        </Link>
                    </div>
                    <div>
                        <h2>Review</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseSideBar