const express = require('express');
const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile.js')['development']);
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }
  try {
    const user = await knex('users')
      .select('*')
      .where('username', 'ilike', username)
      .first();
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    return res.status(200).json({
      id: user.id,
      username: user.username,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
