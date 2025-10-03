import express, { Router } from "express";
import {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} from "../controllers/employeesController.js";
import type { SQLiteDatabase } from "../config/connectDB.js";

const router: Router = express.Router();

export const employeesRoutes = (db: SQLiteDatabase): Router => {
    router.post("/", createEmployee(db));
    router.get("/", getEmployees(db));
    router.get("/:id", getEmployeeById(db));
    router.put("/:id", updateEmployee(db));
    router.delete("/:id", deleteEmployee(db));
    return router;
};


