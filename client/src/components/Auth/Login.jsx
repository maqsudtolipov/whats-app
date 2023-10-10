import './Auth.scss';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/thunks/user.js';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(login({ email: e.target[0].value, password: e.target[1].value }));
  };

  return (
    <>
      {user.auth ? (
        <Navigate to="/" />
      ) : (
        <div className="auth">
          <form onSubmit={loginHandler}>
            <h2>Log In</h2>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
            <button type="submit">Log In</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
