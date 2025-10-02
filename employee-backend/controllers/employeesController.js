export const createEmployee = (db) => (req, res) => {
    const { name, email, position } = req.body;
    if (!name || !email || !position) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const query = `INSERT INTO employees (name, email, position) VALUES (?, ?, ?)`;
    db.run(query, [name, email, position], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, name, email, position });
    });
};

export const getEmployees = (db) => (req, res) => {
    db.all(`SELECT * FROM employees ORDER BY id DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

export const getEmployeeById = (db) => (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM employees WHERE id = ?`, [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Employee not found" });
        res.json(row);
    });
};

export const updateEmployee = (db) => (req, res) => {
    const { id } = req.params;
    const { name, email, position } = req.body;

    const query = `UPDATE employees SET name = ?, email = ?, position = ? WHERE id = ?`;
    db.run(query, [name, email, position, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Employee not found" });
        res.json({ id, name, email, position });
    });
};

export const deleteEmployee = (db) => (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM employees WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Employee not found" });
        res.json({ message: "Employee deleted successfully" });
    });
};
