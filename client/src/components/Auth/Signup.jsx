import './Auth.scss';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/thunks/user.js';
import { Navigate } from 'react-router-dom';

const Signup = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const signupHandler = (e) => {
    e.preventDefault();

    dispatch(
      signup({
        name: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
        passwordConfirm: e.target[3].value,
      }),
    );
  };

  return (
    <>
      {user.auth ? (
        <Navigate to="/" />
      ) : (
        <div className="auth">
          <form onSubmit={signupHandler}>
            <h2>Sign Up</h2>
            <label htmlFor="name">Name</label>
            <input type="name" id="name" placeholder="Enter your name" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="passwordConfirm"
              id="passwordConfirm"
              placeholder="Confirm your password"
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
