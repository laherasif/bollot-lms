import React from 'react'
import { VideTitle } from '../../../pages/[language]/instructor/details/[id]'
import CourseSideBar from './courseSidebar'
import NavigationBar2 from './NavigationBar2'
import TopNavbar from './TopNavbar'

const LiveClasses = () => {
    return (
        <>
            <NavigationBar2 />

            <section className="dash-board">
                <div className="dash-board-1">
                    <CourseSideBar />
                    <div className="w-100">
                        <div className="sad-ds-asajd">
                            <div className="dash-2 m-0">
                                <div className="my-course">
                                    <TopNavbar />
                                </div>
                            </div>
                        </div>
                        <div className="my-course jdsad-snd">
                            <h3>
                                <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.57 5.93L3.5 12L9.57 18.07"
                                        stroke="#131313"
                                        strokeWidth={2}
                                        strokeMiterlimit={10}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M20.4999 12H3.66992"
                                        stroke="#131313"
                                        strokeWidth={2}
                                        strokeMiterlimit={10}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>

                                <span style={{ marginLeft: 10 }}>Week 3</span>
                            </h3>
                            <p>
                                Motion Design with Figma: Animations, Motion Graphics & UX
                                Design{" "}
                            </p>
                            <div className="seting-method-payment">
                                <div className="first-payment-1">
                                    <div className="com-flex-1 ">
                                        <h3>Learning Objectives</h3>
                                    </div>

                                    <div className="start-list-item">
                                        <ul>
                                            <li>
                                                Start the UX Design Process: Empathize, Define, and
                                                Ideate
                                            </li>
                                            <li>Build Wireframes and Low-Fidelity Prototypes</li>
                                            <li>Conduct UX Research and Test Early Concepts</li>
                                            <li>
                                                Create High-Fidelity Designs and Prototypes in Figma
                                            </li>
                                            <li>Responsive Web Design in Adobe XD</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="first-payment-1">
                                    <div className="com-flex-1 ">
                                        <h3>Understand design sprints</h3>
                                    </div>

                                    <div className="start-list-item">
                                        <ul className="sjasd-dsajd">
                                            <VideTitle isChecked={true} title="Welcome to week 346 sec" />
                                            <VideTitle isChecked={true} title="Introduction to design sprints  3 min" />
                                            <VideTitle isChecked={false} title="Five phases of design sprints 5 min" />
                                            <img className="shadsa-sdnds" src="/assets/images/Group 276.png" />
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LiveClasses