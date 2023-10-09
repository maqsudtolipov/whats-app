import './Auth.scss';

const Signup = () => {
  return (
    <div className="auth">
      <form>
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
  );
};

export default Signup;
