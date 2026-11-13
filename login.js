import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Is the Auth service running?');
    }
  };

  const handleGuest = async () => {
    setError('');
    try {
      const res = await fetch('/auth/guest', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        router.push('/');
      } else {
        setError(data.error || 'Guest access failed');
      }
    } catch (err) {
      setError('Connection error. Is the Auth service running?');
    }
  };

  return (
    <div className="login-container">
      <Head>
        <title>Login | VisualSearch AI</title>
      </Head>
      <div className="login-card">
        <h1>VisualSearch AI</h1>
        <p>Enter your credentials to access the dashboard</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="guest-btn" onClick={handleGuest}>
          Continue as Guest
        </button>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #0f172a;
          color: white;
          font-family: 'Inter', sans-serif;
        }
        .login-card {
          background: #1e293b;
          padding: 2.5rem;
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        h1 { margin-bottom: 0.5rem; font-size: 1.8rem; }
        p { color: #94a3b8; margin-bottom: 2rem; }
        .form-group { text-align: left; margin-bottom: 1.5rem; }
        label { display: block; margin-bottom: 0.5rem; color: #cbd5e1; }
        input {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #334155;
          background: #0f172a;
          color: white;
        }
        button {
          width: 100%;
          padding: 0.75rem;
          border-radius: 0.5rem;
          background: #3b82f6;
          color: white;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        button:hover { background: #2563eb; }
        .guest-btn {
          margin-top: 1rem;
          background: transparent;
          border: 1px solid #3b82f6;
          color: #3b82f6;
        }
        .guest-btn:hover {
          background: rgba(59, 130, 246, 0.1);
        }
        .divider {
          margin: 1.5rem 0;
          position: relative;
          text-align: center;
        }
        .divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: #334155;
          z-index: 1;
        }
        .divider span {
          background: #1e293b;
          padding: 0 0.75rem;
          color: #64748b;
          font-size: 0.875rem;
          position: relative;
          z-index: 2;
        }
        .error-message {
          background: #7f1d1d;
          color: #fca5a5;
          padding: 0.75rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
        }
      `}</style>
    </div>
  );
}
