import './Auth.scss';
import { useDispatch } from 'react-redux';
import { login } from '../../store/thunks/user.js';

const Login = () => {
  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();

    dispatch(login({ email: 'maqsud@example.com', password: 'pass1234' }));
  };

  return (
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
  );
};

export default Login;
