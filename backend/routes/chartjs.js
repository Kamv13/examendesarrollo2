const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/avg-price-by-category', (req, res) => {
  const sql = `
    SELECT category_code, AVG(value) as avg_price
    FROM products
    GROUP BY category_code
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ status: 200, data: rows });
  });
});

router.get('/products-by-brand', (req, res) => {
  const sql = `
    SELECT brand_code, COUNT(*) as total
    FROM products
    GROUP BY brand_code
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ status: 200, data: rows });
  });
});

module.exports = router;