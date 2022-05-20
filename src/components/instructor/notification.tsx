

export default ({notifications}:any) => {
    return (
        <>
            <main>
                <div className="notification-container">
                    <h3>
                        Notifications
                    </h3>
                    <ul className="notification-manu">
                        {notifications &&  notifications.length > 0 ? notifications.map((notif: any, i: number) => (

                            <li>
                                <div style={{ padding: '0px 5px' }}key={i}>
                                    <span style={{ fontWeight: '500', fontSize: '14' }}>{notif?.title}</span>
                                    <br />
                                    <span>{notif?.details}</span>

                                </div>
                            </li>

                        ))
                        :<div>No Notification</div>
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