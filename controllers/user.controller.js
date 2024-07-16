import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../db/db.js";

//User Controllers
const registerUser = async (req, res) => {
  try {
    const { email, password, name, is_admin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password, name, is_admin) VALUES ($1, $2, $3, $4) RETURNING id",
      [email, hashedPassword, name, is_admin || false]
    );

    res.status(201).json({
      message: "User created successfully",
      userId: result.rows[0].id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Cannot find user" });
    }

    const user = result.rows[0];

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        { userId: user.id, is_admin: user.is_admin },
        process.env.JWT_SECRET
      );
      res.json({ accessToken: accessToken, message: `Welcome ${user.name}` });
    } else {
      res.status(401).json({ error: "Wrong password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
};

const getUserByID = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email, name, is_admin, created_at, updated_at FROM users WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];

    // Check if the requesting user is an admin or the user themselves
    if (req.user.is_admin || req.user.userId === user.id) {
      res.json(user);
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, name, is_admin } = req.body;

    // Check if the requesting user is an admin or the user themselves
    if (req.user.is_admin || req.user.userId === parseInt(req.params.id)) {
      let query = "UPDATE users SET email = $1, name = $2";
      let values = [email, name];

      // Only allow admin status change if the requester is an admin
      if (req.user.is_admin && is_admin !== undefined) {
        query += ", is_admin = $3";
        values.push(is_admin);
      }

      query +=
        " WHERE id = $" +
        (values.length + 1) +
        " RETURNING id, email, name, is_admin, updated_at";
      values.push(req.params.id);

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(result.rows[0]);
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    // Check if the requesting user is an admin or the user themselves
    if (req.user.is_admin || req.user.userId === parseInt(req.params.id)) {
      const result = await pool.query(
        "DELETE FROM users WHERE id = $1 RETURNING id",
        [req.params.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting user" });
  }
};

// Admin Controllers
const adminGetAllUser = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email, name, is_admin, created_at, updated_at FROM users"
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching users by admin" });
  }
};

export {
  registerUser,
  loginUser,
  getUserByID,
  updateUser,
  deleteUser,
  adminGetAllUser,
};
