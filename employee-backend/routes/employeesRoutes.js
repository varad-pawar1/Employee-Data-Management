import express from "express";
import {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} from "../controllers/employeesController.js";

const router = express.Router();

export const employeesRoutes = (db) => {
    router.post("/", createEmployee(db));
    router.get("/", getEmployees(db));
    router.get("/:id", getEmployeeById(db));
    router.put("/:id", updateEmployee(db));
    router.delete("/:id", deleteEmployee(db));
    return router;
};
