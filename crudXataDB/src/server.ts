// src/server.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getXataClient } from "./xata";


dotenv.config();

const xata = getXataClient();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// GET all users
app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const users = await xata.db.products.getMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

// GET a user by ID
app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  const userID = req.params.id;
  try {
    const user = await xata.db.products.read(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
});

// POST a new user
app.post("/api/v1/users", async (req: Request, res: Response) => {
  const { userName, displayName } = req.body;
  try {
    const newUser = await xata.db.products.create({ userName, displayName });
    res.status(201).json({
      message: "User created successfully",
      payload: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// PUT - Update a user by ID
app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
  const userID = req.params.id;
  const { userName, displayName } = req.body;

  try {
    const updatedUser = await xata.db.products.update(userID, { userName, displayName });
    res.status(200).json({
      message: "User updated successfully",
      payload: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// PATCH - Update specific fields of a user by ID
app.patch("/api/v1/users/:id", async (req: Request, res: Response) => {
  const userID = req.params.id;
  const updateData = req.body;

  try {
    const updatedUser = await xata.db.products.update(userID, updateData);
    res.status(200).json({
      message: "User updated successfully",
      payload: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// DELETE a user by ID
app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
  const userID = req.params.id;

  try {
    await xata.db.products.delete(userID);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`[server]: Server TypeScript is running at http://localhost:${port}`);
});
