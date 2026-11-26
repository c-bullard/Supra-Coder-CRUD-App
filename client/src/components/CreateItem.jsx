import '../styles/itemdetails.css';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const itemsUrl = 'http://localhost:8080/inventory/';

export default function CreateItem() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    item_name: '',
    description: '',
    quantity: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch(itemsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          quantity: Number(form.quantity),
          user_id: user.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not create item');
        return;
      }
      navigate('/inventory');
    } catch {
      setError('Could not reach the server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="item-detail">
      <Link to="/inventory">&larr; Back to inventory</Link>

      <form onSubmit={handleSubmit}>
        <h2 className="item-name">New Item</h2>

        {error && <div className="item-error">{error}</div>}

        <div className="item-field">
          <label className="item-label" htmlFor="item_name">
            Name
          </label>
          <input            id="item_name"
            name="item_name"
            value={form.item_name}
            onChange={handleChange}
            placeholder="Item name"
            required
          />
        </div>

        <div className="item-field">
          <label className="item-label" htmlFor="description">
            Description
          </label>
          <textarea            id="description"
            name="description"
            rows={5}
            maxLength={255}
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the item"
            required
          />
        </div>

        <div className="item-field">
          <label className="item-label" htmlFor="quantity">
            Quantity
          </label>
          <input            id="quantity"
            name="quantity"
            type="number"
            min="0"
            value={form.quantity}
            onChange={handleChange}
            placeholder="0"
            required
          />
        </div>

        <div>
          <button className="item-btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Item'}
          </button>
          <button
            className="item-btn"
            type="button"
            onClick={() => navigate('/inventory')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
