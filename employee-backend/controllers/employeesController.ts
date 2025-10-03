import type { Request, Response } from "express";
import type { SQLiteDatabase } from "../config/connectDB.js";

export const createEmployee = (db: SQLiteDatabase) => (req: Request, res: Response) => {
    const { name, email, position } = req.body as { name?: string; email?: string; position?: string };
    if (!name || !email || !position) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const query = `INSERT INTO employees (name, email, position) VALUES (?, ?, ?)`;
    db.run(query, [name, email, position], function (err: Error | null) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, name, email, position });
    });
};

export const getEmployees = (db: SQLiteDatabase) => (_req: Request, res: Response) => {
    db.all(`SELECT * FROM employees ORDER BY id DESC`, [], (err: Error | null, rows: unknown[]) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

export const getEmployeeById = (db: SQLiteDatabase) => (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    db.get(`SELECT * FROM employees WHERE id = ?`, [id], (err: Error | null, row: unknown) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Employee not found" });
        res.json(row);
    });
};

export const updateEmployee = (db: SQLiteDatabase) => (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const { name, email, position } = req.body as { name?: string; email?: string; position?: string };

    const query = `UPDATE employees SET name = ?, email = ?, position = ? WHERE id = ?`;
    db.run(query, [name, email, position, id], function (err: Error | null) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Employee not found" });
        res.json({ id, name, email, position });
    });
};

export const deleteEmployee = (db: SQLiteDatabase) => (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    db.run(`DELETE FROM employees WHERE id = ?`, [id], function (err: Error | null) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: "Employee not found" });
        res.json({ message: "Employee deleted successfully" });
    });
};


