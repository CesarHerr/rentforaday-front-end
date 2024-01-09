import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Spinner from '../Spinner';
import { clearRegistration } from '../../redux/users/authSlice';
import { registerUser } from '../../redux/users/authApi';
import '../../styles/Registration.css';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nameInput, setName] = React.useState('');
  const [emailInput, setEmail] = React.useState('');
  const [passwordInput, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');

  const { isRegistered, isLoading } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (isRegistered) {
      toast.success('User registered successfully');
      setTimeout(() => {
        dispatch(clearRegistration());
        navigate('/rentforaday-front-end/login');
      }, 2000);
    }
  }, [dispatch, isRegistered, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nameInput || !emailInput || !passwordInput || !confirm) {
      toast.error('All fields are required');
    } else if (passwordInput.length < 8) {
      toast.error('Password must be at least 8 characters long');
    } else if (passwordInput !== confirm) {
      toast.error('Passwords do not match');
    } else if (!emailInput.includes('@') || !emailInput.includes('.com')) {
      toast.error('The email is invalid');
    } else if (passwordInput === confirm) {
      try {
        const formData = {
          name: nameInput,
          email: emailInput,
          password: passwordInput,
        };
        dispatch(
          registerUser(formData),
        );
        setName('');
        setEmail('');
        setPassword('');
        setConfirm('');
      } catch (error) {
        toast.error('Error when registering the user.');
      }
    } else {
      toast.error('Unknown error when registering the user.');
    }
  };

  if (isLoading) {
    return (
      <div className="container text-center d-flex justify-content-center align-items-center min-vh-100">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="loginContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1 className="formTitle">User registration</h1>
        <div className="form-group">
          <label htmlFor="name" aria-label="Name">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={nameInput}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label htmlFor="email" aria-label="Email">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email address"
              value={emailInput}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password" aria-label="Password">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={passwordInput}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <label htmlFor="confirm" aria-label="ConfirmPassword">
            <input
              type="password"
              className="form-control"
              id="confirm"
              placeholder="Confirm your password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
            />
          </label>
        </div>
        <small id="passwordHelp" className="form-text text-muted">
          Password must be at least 8 characters long.
        </small>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </section>
  );
};

export default Registration;
