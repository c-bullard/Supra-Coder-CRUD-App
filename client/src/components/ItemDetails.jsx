import '../styles/itemdetails.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const itemsUrl = 'http://localhost:8080/inventory/';

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [form, setForm] = useState({
    item_name: '',
    description: '',
    quantity: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  const isOwner = user && item && user.id === item.user_id;

  useEffect(() => {
    fetch(`${itemsUrl}${id}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Could not load item');
        setItem(data);
        setForm({
          item_name: data.item_name,
          description: data.description,
          quantity: data.quantity,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setForm({
      item_name: item.item_name,
      description: item.description,
      quantity: item.quantity,
    });
    setError('');
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${itemsUrl}${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, quantity: Number(form.quantity) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Could not save changes');
        return;
      }
      setItem(data);
      setIsEditing(false);
    } catch {
      setError('Could not reach the server');
    }
  };

  const handleDelete = async () => {
    setError('');
    try {
      const res = await fetch(`${itemsUrl}${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Could not delete item');
        return;
      }
      navigate('/inventory');
    } catch {
      setError('Could not reach the server');
    }
  };

  if (isLoading) {
    return (
      <div className="item-detail">
        <p>Loading...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="item-detail">
        <Link to="/inventory">
          &larr; Back to inventory
        </Link>
        <div className="item-error">{error || 'Item not found'}</div>
      </div>
    );
  }

  return (
    <div className="item-detail">
      <Link to="/inventory">
        &larr; Back to inventory
      </Link>

      <form onSubmit={handleSave}>
        {error && <div className="item-error">{error}</div>}

        <div className="item-field">
          <label className="item-label" htmlFor="item_name">
            Name
          </label>
          {isEditing ? (
            <input              id="item_name"
              name="item_name"
              value={form.item_name}
              onChange={handleChange}
              required
            />
          ) : (
            <h2 className="item-name">{item.item_name}</h2>
          )}
        </div>

        <div className="item-field">
          <label className="item-label" htmlFor="description">
            Description
          </label>
          {isEditing ? (
            <textarea              id="description"
              name="description"
              rows={5}
              maxLength={255}
              value={form.description}
              onChange={handleChange}
              required
            />
          ) : (
            <p>{item.description}</p>
          )}
        </div>

        <div className="item-field">
          <label className="item-label" htmlFor="quantity">
            Quantity
          </label>
          {isEditing ? (
            <input              id="quantity"
              name="quantity"
              type="number"
              min="0"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          ) : (
            <p>{item.quantity}</p>
          )}
        </div>

        {isOwner && (
          <div>
            {isEditing ? (
              <>
                <button
                  key="save"
                  className="item-btn"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="item-btn"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  key="edit"
                  className="item-btn"
                  type="button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button
                  className="item-btn"
                  type="button"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
