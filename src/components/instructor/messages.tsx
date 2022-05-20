import moment from "moment";
import Link from "next/link";
import { RootStateOrAny, useSelector } from "react-redux";
export default ({ message }: any) => {

    const { User } = useSelector((state: RootStateOrAny) => state?.userReducer)



    return (
        <>
            <main>
                <div className="messages-container" style={{backgroundColor:'ofwhite'}}>
                    <h3>
                        messages
                    </h3>
                    <ul className="messages-manu">
                        {message && message.length > 0 ? message.map((mg: any, index: number) => (
                            <Link href={`/en/instructor/inbox/?id=${mg?.id}`}>
                                <li className={mg?.last_message_obj.is_read === "0" ? "active" : ""} key={index}>
                                    <div className="messages_wraper">
                                        <div className="user_info">
                                            <img src={mg?.user_id == User?.id ? mg?.user_two_details.image : mg?.user_two_id == User?.id ? mg?.user_details.image : "/assets/images/umpire-1.svg"} />
                                            <div className="user_names">
                                                <span className="instructor">
                                                    {mg.user_id == User?.id ? mg?.user_two_details.fullname : mg.user_two_id == User?.id ? mg?.user_details.fullname : ""}
                                                </span>
                                                <br />
                                                <span className="message">
                                                    {mg?.last_message_obj.message}

                                                </span>
                                            </div>
                                        </div>

                                        <div className="date">
                                            {moment(mg?.last_message_obj.createdAt).format('ll')}
                                        </div>


                                    </div>
                                </li>
                            </Link>
                        ))
                            : <div>No Messages</div>
                        }

                    </ul>




                </div>
                {/* */}
                {/* <div className="profile-container">
                    <a className="right">
                        <i className="material-icons dp48 right">settings</i>
                    </a>
                    <span className="user-photo left" />
                    <h1 className="user-name">
                        <a>Helena Knox</a>
                    </h1>
                    <span className="user-email">helenaknox@gmail.com</span>
                    <div className="switch">
                        <input
                            id="language-toggle"
                            className="check-toggle check-toggle-round-flat"
                            type="checkbox"
                        />
                        <label htmlFor="language-toggle" />
                        <span className="on">EN</span>
                        <span className="off">FR</span>
                    </div>
                    <hr />
                    <button className="button secondary-button left">Switch User</button>
                    <button className="button primary-button right">Sign Out</button>
                </div> */}
                {/* */}
                {/* <ul className="menu">
                    <li>
                        <i className="material-icons dp48 gray left">dashboard</i> News Feed
                    </li>
                    <li>
                        <i className="material-icons dp48 gray left">home</i> Properties
                    </li>
                    <li className="dropdown active">
                        <i className="material-icons dp48 teal left">supervisor_account</i> Client
                        Relations <i className="material-icons dp48">expand_more</i>
                    </li>
                    <ul className="active">
                        <li className="active">
                            Tasks &amp; Activities <span className="num-count gray-bg">13</span>
                        </li>
                        <li>Contacts</li>
                        <li>Marketing</li>
                        <li>Action Plans</li>
                        <li>Calendar</li>
                        <li>Guest Accounts</li>
                    </ul>
                    <li className="dropdown">
                        <i className="material-icons dp48 gray left">timeline</i> Reporting{" "}
                        <i className="material-icons dp48">expand_more</i>
                    </li>
                    <li className="dropdown">
                        <i className="material-icons dp48 gray left">face</i> Users{" "}
                        <i className="material-icons dp48">expand_more</i>
                    </li>
                </ul> */}
                <div className="content" />
            </main>

        </>
    )
} 