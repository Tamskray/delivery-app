import User from "../models/User.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateAccessToken = (id, username) => {
  const payload = { id, username };
  return Jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });
};

class UsersController {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  async createUser(req, res) {
    try {
      const { username, password } = req.body;

      const existingUser = await User.findOne({ username: username });

      if (existingUser) {
        return res.status(422).json({ message: "This user exists already" });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const newUser = new User({
        username,
        password: hashedPassword,
        role: "admin",
      });

      await newUser.save();

      res.status(201).json(newUser);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `Акаунт з нікнеймом: ${username} не знайдено` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: `Невірний пароль` });
      }

      const token = generateAccessToken(user._id, user.username);

      return res.json({ token: token, role: user.role });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Login error" });
    }
  }
}

export default new UsersController();
