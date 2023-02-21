import { useState, useEffect } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.scss'
export default () => {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState()
    const getToken = (usertoken) => {
        localStorage.setItem('token', (usertoken))
        const tokenString = localStorage.getItem('token');
        return tokenString?.token;
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token !== undefined) {
            Navigate('/')
        }
    }, [])
    const handleApi = (e) => {
        e.preventDefault(e);
        setError("")
        setLoader(true);
        if (email && password) {
            axios.post("https://vast-erin-rooster-wrap.cyclic.app/signin/", {
                email: email,
                password: password,
            }).then((res) => {
                getToken(res.data.token);
                setLoader(false);
                Navigate('/location')
            },
                reason => {
                    console.error(reason);
                    setError("Invalid Email or Password")
                    setLoader(false)
                }
            )
        }
        else {
            alert("Please Fill Form")
            setLoader(false)
        }
    }

    return (
        <>
            <div className="container-fluid main-login">
                <div className='container main-login-container'>
                    <div className='align-wrap-center' style={{ "paddingTop": "10rem" }}>
                        <div className="  vertical-align-center pt-5">
                            <div className='login-box mt-5 '>
                                <div className="content-login">
                                    <h3>Login</h3>
                                    <form>
                                        <div className="form-group mt-5">
                                            <label className="labels">Email</label>
                                            <input type="Email" className="form-control form-control-lg mt-2" placeholder="Enter your E-mail address" onChange={(e) => setEmail(e.target.value)} value={email}
                                                name="Email" />
                                        </div>
                                        <div className="form-group mt-4">
                                            <label className="labels">Password</label>
                                            <input type="Password" className="form-control form-control-lg mt-2" placeholder="Enter Your Password" onChange={(e) => setPassword(e.target.value)} value={password}
                                                name="Enter Your Password" />
                                        </div>
                                        {error ? <span style={{ "color": "white" }}>{error}</span> : ""}
                                        {loader ? <div class="spinner-border text-primary d-flex justify-content-center mt-2" role="status">
                                            <span class="sr-only text-white">Loading...</span>
                                        </div> : <div className="login-buttons mt-5">
                                            <button type="submit" className="btn btn-primary login" onClick={(e) => handleApi(e)}>Login</button>

                                        </div>}

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}