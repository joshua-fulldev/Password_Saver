import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './HNavbar';
import '../bootstrap/dist/css/bootstrap.css';
import * as Bootstrap from 'react-bootstrap';
import '../App.css';
import groupi from './images/bizinsider.png';
import groupii from './images/mashable.png';
import { UseUserContext, UpdateUsername } from '../UserContext';
import axios from 'axios';


function Home(props) {
    console.log(props);
    const history = useHistory();
    const theme = UpdateUsername();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userInput, setuserInput] = useState(null);
    const [userInputt, setuserInputt] = useState(null);
    const [userSignUpInput, setUserSignUpInput] = useState(true);
    const [loginForm, setLoginForm] = useState(true);
    const [signUpForm, setSignUpForm] = useState(false);
    const [signUpUserEmail, setSignUpUsername] = useState('');
    const [signUpUserPassword, setSignUpUserPassword] = useState('');
    const [wrongInput, setWrongInput] = useState(false);
    const [userHasTyped, setUserHasTyped] = useState(false);
    const [fakeRedirect, setFakeRedirect] = useState(false);
    const [signUpInputCorrect, setSignUpInputCorrect] = useState(true);
    const [signUpUserHasTyped, setSignUpUserHasTyped] = useState(false);


    /*
    
    if (props.location.pathname !== "/") {
        const fakePush = props.location.pathname;
        const excel = fakePush.split("/");

        history.push({
            pathname: '/loggedhome',
            username: excel[3]
        });
    }

    */


    const HandleEmailInput = (event) => {
        setUserEmail(event.target.value);
    }

    const HandlePasswordInput = (event) => {
        setUserPassword(event.target.value);
    }

    const HandleSignUpEmailInput = (event) => {
        setSignUpUserHasTyped(true);
        setSignUpUsername(event.target.value);
    }

    const HandleSignUpPasswordInput = (event) => {
        setSignUpUserPassword(event.target.value);
    }


    function HandleSelectLogin() {
        /*console.log("Display the Login Form")*/
        setLoginForm(true);
        setSignUpForm(false);
        setSignUpInputCorrect(true);
        setSignUpUserPassword('');
        setSignUpUsername('');
        setUserSignUpInput(true);
        setuserInput('');
        setSignUpUserHasTyped(false);
        setUserSignUpInput(true);
    }

    function HandleSelectSignUp() {
        setSignUpForm(true);
        setLoginForm(false);    
        setUserEmail('');
        setUserPassword('');
        setUserHasTyped(false);
        setWrongInput(false);
        setuserInput('');
    }


    /*
    function HandleSubmission(event) {
        theme.setUserName(userEmail);

        console.log("I am here...");
        useEffect(() => {
            axios.get('api/').then(res => {
                console.log("This is one")

                
                console.log(res.data);
                setDataResponse(res.data);
                console.log(res.data.status);
                

            }).catch(err =>
                console.log(err));
        })

        axios.get('/api/').then(res => {
            console.log("This is two")

            
            console.log(res.data);
            setDataResponse(res.data);
            console.log(res.data.status);
            

        }).catch(err =>
            console.log(err));
    }

    */    

    function HandleFormButtonClick(event) {
        setuserInput("a");     
        setUserHasTyped(true);
        
    }

    function HandleSignUpFormButtonClick(event) {
        setUserSignUpInput(true);
        setSignUpUserHasTyped(true);
        setuserInputt("a");
        
    }


    
        useEffect(() => {
            const URL = '/api/login/' + userEmail + '/' + userPassword + '/';
            axios.get('/api/login/' + userEmail + '/' + userPassword + '/').then(res => {
                theme.TypeUser(userEmail);
                setFakeRedirect(true);
                history.push({
                    pathname: '/loggedhome',
                    username: userEmail
                });
    
            }).catch(() => {
                console.log("we stil move");
                
                
                if (userHasTyped){
                    setWrongInput(true); 
                    history.push({
                        pathname: '/loggedhome',
                        username: userEmail
                    });          
                } 

            })
        }, [userInput]);


        useEffect(() => {
            console.log("I am at the second useEffect");
            axios.post('/api/signUp/' + signUpUserEmail + '/' + signUpUserPassword + '/').then(res => {
                if (userSignUpInput === true){
                    console.log("At the signUp useEffect");
                    history.push({
                        pathname: '/loggedhome',
                        username: signUpUserEmail
                    })
                }               

            }).catch(() => {
                console.log("irjwoeiow");
                if (signUpInputCorrect === true & signUpUserHasTyped === true) {
                    setSignUpInputCorrect(false);
                }                
            })
        }, [userInputt]);


    return (
        <>
            <Navbar />
            <div className="Background-view">

                <div className="First_View">
                    <Bootstrap.Container fluid="sm">
                        <Bootstrap.Row>
                            <Bootstrap.Col xs={12} md={8} className="mt-5 pt-5 text-left">

                                <div className="First_text">

                                    <h1>Hello, world!</h1>
                                    <p>
                                        This is a simple hero unit, a simple jumbotron-style component for calling
                                        extra attention to featured content or information.
                                </p>
                                    <p>
                                        <Bootstrap.Button variant="primary">Learn more</Bootstrap.Button>
                                    </p>
                                </div>

                            </Bootstrap.Col>
                            <Bootstrap.Col xs={11} md={4} className="my-5 pt-5 First_form mx-auto">
                                <Bootstrap.Nav fill variant="tabs" defaultActiveKey="/home">
                                    <Bootstrap.Nav.Item>
                                        <Bootstrap.Nav.Link href="#Login" onClick={HandleSelectLogin}>Login</Bootstrap.Nav.Link>
                                    </Bootstrap.Nav.Item>
                                    <Bootstrap.Nav.Item>
                                        <Bootstrap.Nav.Link href="#SignUp" onClick={HandleSelectSignUp}>SignUp</Bootstrap.Nav.Link>
                                    </Bootstrap.Nav.Item>
                                </Bootstrap.Nav>
                                {
                                    loginForm === true &&
                                    <Bootstrap.Form className="pb-4">
                                        <Bootstrap.Form.Group controlId="formBasicEmail">
                                            <Bootstrap.Form.Label>Email address</Bootstrap.Form.Label>
                                            <Bootstrap.Form.Control type="email" placeholder="Enter email" name="username" onChange={HandleEmailInput} value={userEmail} />
                                            <Bootstrap.Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                    </Bootstrap.Form.Text>
                                        </Bootstrap.Form.Group>

                                        <Bootstrap.Form.Group controlId="formBasicText">
                                            <Bootstrap.Form.Label>Password</Bootstrap.Form.Label>
                                            <Bootstrap.Form.Control type="text" placeholder="Password" name="password" onChange={HandlePasswordInput} value={userPassword} />
                                        </Bootstrap.Form.Group>
                                        <Bootstrap.Button variant="primary" type="submit" className="mb-2" onClick={HandleFormButtonClick}>
                                            Log In
                                        </Bootstrap.Button>

                                        {wrongInput === true && 
                                        
                                        <p className="Red-Flag">

                                            Please make sure the username matches the password
                                        
                                        </p>
                                        
                                        }

                                    </Bootstrap.Form>
                                }

                                {
                                    signUpForm === true &&
                                    <Bootstrap.Form className="pb-4">
                                        <Bootstrap.Form.Group controlId="formBasicEmail">
                                            <Bootstrap.Form.Label>Email address</Bootstrap.Form.Label>
                                            <Bootstrap.Form.Control type="email" placeholder="Enter email" name="username" onChange={HandleSignUpEmailInput} value={signUpUserEmail} />
                                            <Bootstrap.Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                                            </Bootstrap.Form.Text>
                                        </Bootstrap.Form.Group>

                                        <Bootstrap.Form.Group controlId="formBasicPassword">
                                            <Bootstrap.Form.Label>Password</Bootstrap.Form.Label>
                                            <Bootstrap.Form.Control type="password" placeholder="Password" name="password" onChange={HandleSignUpPasswordInput} value={signUpUserPassword} />
                                        </Bootstrap.Form.Group>
                                        
                                        <Bootstrap.Button variant="primary" type="submit" className="mb-2" onClick={HandleSignUpFormButtonClick}>
                                            Sign Up
                                        </Bootstrap.Button>

                                        { signUpInputCorrect !== true &&
                                            <p className="Red-Flag">
                                                Username is already in use
                                            </p> }

                                    </Bootstrap.Form>
                                }

                            </Bootstrap.Col>
                        </Bootstrap.Row>
                    </Bootstrap.Container>



                </div>
                <div className="mt-5 pt-2">
                    <h4>INNOVATIVE BUSINNESSES TRUST ALCOVE</h4>
                </div>
                <div className="container Sponsor-container my-2">
                    <div className="S_Groupic">
                        <img src={groupi} alt="" className="img-fluid" />
                    </div>
                    <div className="S_Groupic">
                        <img src={groupii} alt="" className="img-fluid" />
                    </div>
                    <div className="S_Groupic">
                        <img src={groupii} alt="" className="img-fluid" />
                    </div>
                    <div className="S_Groupic">
                        <img src={groupii} alt="" className="img-fluid" />
                    </div>
                    <div className="S_Groupic">
                        <img src={groupii} alt="" className="img-fluid" />
                    </div>

                </div>
                <div>
                    <p>
                        Hello world!
                </p>
                </div>
            </div>
        </>

    )
}

export default Home;