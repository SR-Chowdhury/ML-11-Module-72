import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Login = () => {

    const [show, setShow] = useState(false);
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = (event) => {

        event.preventDefault();

        setError(null);
        setSuccess(null);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const loggedInUser = result.user;
                // console.log(loggedInUser)
                setSuccess('Successfully Logged In!');
                form.reset();
                navigate(from, { replace: true });
            })
            .catch(err => setError(err.message))

    }

    const handleToggle = () => {
        setShow(!show);
    }


    return (
        <div className='container'>

            <div className="formContainer shadow-lg">
                <h1 className='formTitle'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">Email</label>
                    <div>
                        <input type="email" className='form-control' name="email" id="email" placeholder='Email' required />
                    </div>
                    <label htmlFor="">Password</label>
                    <div>
                        <input type = { show ? "text" : "password"} className='form-control' name="password" id="password" placeholder='Password' required />
                        <p onClick={handleToggle} style={{cursor: 'pointer'}}>
                            {show ? <span>Hide Password</span> : <span>Show Password</span>}
                        </p>
                    </div>
                    <div className='submitBtn'>
                        <button className="form-control" type='submit'>Login</button>
                    </div>
                </form>
                <p className='text-center'><small>New in this site? <Link to="/register">Register</Link></small></p>
                <button className='form-control'>Continue With Google</button>
                {
                    error && <p className='text-center text-danger'>{error}</p>
                }
                {
                    success && <p className='text-center text-success'>{success}</p>
                }
            </div>

        </div>
    );
};

export default Login;