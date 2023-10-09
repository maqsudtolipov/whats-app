import './Auth.scss';

const Login = () => {
  return (
    <div className="auth">
      <form>
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
