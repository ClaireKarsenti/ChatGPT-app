import { useState, useEffect } from 'react';
import { usePostLoginMutation, usePostSignUpMutation } from '@/state/api';
import Input from '../elements/Input';
import Button from '../elements/Button';

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState(''); // this temporarily stores the username, it will be saved later with setUser
  const [password, setPassword] = useState(''); // this temporarily stores the password,  it will be saved later with setSecret
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  const handleLogin = () => {
    triggerLogin({ username, password });
  };

  const handleRegister = () => {
    triggerSignUp({ username, password });
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    }
  }, [resultLogin.data]); // eslint-disable-line

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="title">CHATGPT APP</h2>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Already a user?' : 'Are you a new user?'}
        </p>

        <div>
          <Input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="login-actions">
          {isRegister ? (
            <Button title="Register" onClick={handleRegister} />
          ) : (
            <Button title="Login" onClick={handleLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
