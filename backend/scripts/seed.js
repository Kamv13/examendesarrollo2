const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const db = new sqlite3.Database(path.join(__dirname, '../data/database.sqlite'));

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      employee_id           INTEGER PRIMARY KEY,
      first_name            TEXT NOT NULL,
      last_name             TEXT NOT NULL,
      email                 TEXT NOT NULL,
      phone_number          TEXT,
      hire_date             TEXT,
      job_id                TEXT,
      salary                REAL,
      commission_pct        TEXT,
      manager_id            INTEGER,
      department_id         INTEGER
    )
  `, (err) => {
    if (err) console.error('Error creating employees table:', err.message);
    else console.log('Employees table ready.');
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      part_number           TEXT PRIMARY KEY,
      product_type          TEXT,
      category_code         TEXT,
      brand_code            TEXT,
      family_code           TEXT,
      line_code             TEXT,
      product_segment_code  TEXT,
      status                TEXT,
      value                 REAL,
      value_currency        TEXT,
      default_quantity_units TEXT,
      name                  TEXT,
      description           TEXT,
      planner_code          TEXT,
      source_link           TEXT
    )
  `, (err) => {
    if (err) console.error('Error creating products table:', err.message);
    else console.log('Products table ready.');
  });

  const employeesPath = path.join(__dirname, '../data/employees.csv');
  const employeeLines = fs.readFileSync(employeesPath, 'utf-8').trim().split('\n');

  const empStmt = db.prepare(`
    INSERT OR IGNORE INTO employees
    (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (let i = 1; i < employeeLines.length; i++) {
    const cols = employeeLines[i].split(',');
    if (cols.length < 11) continue;
    empStmt.run(
      parseInt(cols[0]),
      cols[1].trim(),
      cols[2].trim(),
      cols[3].trim(),
      cols[4].trim(),
      cols[5].trim(),
      cols[6].trim(),
      parseFloat(cols[7]),
      cols[8].trim(),
      parseInt(cols[9]),
      parseInt(cols[10])
    );
  }

  empStmt.finalize((err) => {
    if (err) console.error('Error seeding employees:', err.message);
    else console.log('Employees seeded.');
  });

  const productsPath = path.join(__dirname, '../data/products.csv');
  const productLines = fs.readFileSync(productsPath, 'utf-8').trim().split('\n');

  function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        inQuotes = !inQuotes;
      } else if (line[i] === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += line[i];
      }
    }
    result.push(current.trim());
    return result;
  }

  const prodStmt = db.prepare(`
    INSERT OR IGNORE INTO products
    (part_number, product_type, category_code, brand_code, family_code, line_code, product_segment_code, status, value, value_currency, default_quantity_units, name, description, planner_code, source_link)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (let i = 1; i < productLines.length; i++) {
    const cols = parseCSVLine(productLines[i]);
    if (cols.length < 15) continue;
    prodStmt.run(
      cols[0],
      cols[1],
      cols[2],
      cols[3],
      cols[4],
      cols[5],
      cols[6] || null,
      cols[7],
      parseFloat(cols[8]) || null,
      cols[9],
      cols[10],
      cols[11],
      cols[12],
      cols[13],
      cols[14]
    );
  }

  prodStmt.finalize((err) => {
    if (err) console.error('Error seeding products:', err.message);
    else console.log('Products seeded.');
  });

});
