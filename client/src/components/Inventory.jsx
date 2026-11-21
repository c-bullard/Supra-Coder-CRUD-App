import '../App.css';
import '../styles/inventory.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  const [showAll, setShowAll] = useState(!user);

  useEffect(() => {
    const url =
      user && !showAll
        ? `http://localhost:8080/inventory/?user_id=${user.id}`
        : 'http://localhost:8080/inventory/';

    fetch(url)
      .then((res) => res.json())
      .then((data) => setInventory(data))
      .catch((err) => console.error(err));
  }, [user, showAll]);

  return (
    <div className="inventory">
      <div className="inventory-header">
        <h2>{user && !showAll ? `My Inventory` : 'All Items'}</h2>
        {user && (
          <div className="inventory-controls">
            <div className="inventory-toggle">
              <button
                type="button"
                className={!showAll ? 'active' : ''}
                onClick={() => setShowAll(false)}
              >
                My Items
              </button>
              <button
                type="button"
                className={showAll ? 'active' : ''}
                onClick={() => setShowAll(true)}
              >
                All Items
              </button>
            </div>
            <Link className="inventory-add" to="/items/new">
              + Add Item
            </Link>
          </div>
        )}
      </div>
      {inventory.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link className="inventory-link" to={`/items/${item.id}`}>
                    {item.item_name}
                  </Link>
                </td>
                <td>
                  {item.description?.length > 100
                    ? `${item.description.slice(0, 100)}...`
                    : item.description}
                </td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
