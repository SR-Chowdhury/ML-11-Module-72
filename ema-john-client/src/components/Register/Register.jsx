import React, { useContext, useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Register = () => {

    const {createUser} = useContext(AuthContext);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        setError(null);
        setSuccess(null);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password !== confirmPassword) {
            setError('Your password did not match');
            return;
        } 
        else if (password.length < 6) {
            setError('Password length should be more than 6 characters');
            return;
        }

        createUser(email, password)
            .then(result => {
                const loggedInUser = result.user;
                setSuccess('Successfully created user!');
                form.reset();
            })
            .catch(err => setError(err.message))

    }
    return (
        <div className='container'>

            <div className="formContainer shadow-lg">
                <h1 className='formTitle'>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">Email</label>
                    <div>
                        <input type="email" className='form-control' name="email" id="email" placeholder='Email' required />
                    </div>
                    <label htmlFor="">Password</label>
                    <div>
                        <input type="password" className='form-control' name="password" id="password" placeholder='*************' required />
                    </div>
                    <label htmlFor="">Confirm Password</label>
                    <div>
                        <input type="password" className='form-control' name="confirmPassword" id="confirm-password" placeholder='*************' required />
                    </div>
                    <div className='submitBtn'>
                        <button className="form-control" type='submit'>Sign up</button>
                    </div>
                </form>
                <p className='text-center'><small>Already have an account? <Link to="/login">Login</Link></small></p>
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

export default Register;