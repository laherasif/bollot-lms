import React from "react";
import {
    Container,
    Form,
    Nav,
    Navbar,
    NavDropdown,
    Offcanvas,
} from "react-bootstrap";
import Icons from "../../icons";
import gapi from "gapi";

export default () => {
    const CLIENT_ID = "1049994665620-0cdjhhgkod0skqt3390fbmvt8mvme2l5.apps.googleusercontent.com";
    const CLIENT_SECRET = "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";
    const REDIRECT_URL = "https://dev.thetechub.us/fixar/google-redirect";

    // const oAuth2Client = new google.auth.OAuth2(
    //     CLIENT_ID,
    //     CLIENT_SECRET,
    //     REDIRECT_URL
    // );


    // let  GoogleAuth; // Google Auth object.
    // function initClient() {
    //     gapi.client.init({
    //         'apiKey': "AIzaSyAfvtcPZTKoemkWntT3R_GzYvAxT6PGMb8" ,
    //         'clientId': CLIENT_ID,
    //         'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
    //         'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
    //     }).then(function () {
    //         GoogleAuth = gapi.auth2.getAuthInstance();
    //          console.log("GoogleAuth", GoogleAuth)
    //         // Listen for sign-in state changes.
    //         // GoogleAuth.isSignedIn.listen(updateSigninStatus);
    //     });
    // }

    // initClient()

    return (
        <>

            <div className="p-field">
                <div className="d-flex">
                    <Icons name="i24" />
                    <h4>Curriculum</h4>
                </div>
                <h5>
                    Start putting together your course by creating sections,
                    lectures and practice (quizzes, coding exercises and
                    assignments).
                </h5>

                <div className="my-4">
                    <hr></hr>
                </div>
                <div className="drop-box mb-3">
                    <div className="kvjadsd-j43rm">
                        <div className="jodsa-wnedas">
                            <h6>Section 1</h6>
                            <div className="jodsa-wnedas">
                                <Icons name="i25" />
                                <p>Introduction</p>
                            </div>
                        </div>
                        <Icons name="i26" />
                    </div>
                    <div className="kvjadsd-j43rm kjascs-anj3eds">
                        <div className="d-flex align-items-center">
                            <Icons name="i25" />
                            <p>Introduction</p>
                            <span className="mx-2">
                                <Icons name="i27" />
                            </span>
                        </div>
                        <div>
                            <Icons name="i28" />
                        </div>
                    </div>
                    <h3 className="my-2">+ Add more to your response</h3>
                </div>










            </div>
            <div className="d-flex">
                <div className="idfadsf-sads kajfds-sdfe hfdajss-3ersad">
                    <button className="upload-1 sdisad-dsdactive ">
                        Preview
                    </button>
                </div>
                <div className="idfadsf-sads kajfds-sdfe">
                    <button className="upload-1 sdisad-dsdactive">
                        Submit for review
                    </button>
                </div>
            </div>
        </>
    );
};
