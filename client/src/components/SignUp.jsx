import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

export default function SignUp() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Sign up failed');
        return;
      }

      navigate('/');
    } catch {
      setError('Could not reach the server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Create Account</h2>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <label className="login-label" htmlFor="first_name">
              First Name
            </label>
            <input
              className="login-input"
              id="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </div>

          <div className="login-input-group">
            <label className="login-label" htmlFor="last_name">
              Last Name
            </label>
            <input
              className="login-input"
              id="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </div>

          <div className="login-input-group">
            <label className="login-label" htmlFor="username">
              Username
            </label>
            <input
              className="login-input"
              id="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
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
              value={form.password}
              onChange={handleChange}
              placeholder="*********"
            />
          </div>

          <button className="login-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
