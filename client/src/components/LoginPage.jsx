import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      localStorage.setItem('user', JSON.stringify(data));
      navigate('/inventory');
    } catch {
      setError('Could not reach the server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Welcome</h2>
          <p className="login-subtitle">
            Please enter your details to sign in.
          </p>

          {error && <div className="login-error">{error}</div>}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label className="login-label" htmlFor="username">
                Username
              </label>
              <input
                className="login-input"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="login-input-group">
              <label className="login-label" htmlFor="password">
                Password
              </label>
              <input
                className="login-input"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
                required
              />
            </div>

            <button className="login-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
            <button
              className="login-button"
              type="button"
              onClick={() => {
                localStorage.removeItem('user');
                navigate('/inventory');
              }}
            >
              Continue as Guest
            </button>
          </form>

          <p className="login-switch">
            <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
}
