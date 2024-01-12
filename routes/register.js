import { User, registerValidate } from "../models/User.js";
import { Router } from "express";
import generateJwtToken from "../services/token.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { error } = registerValidate(req.body);

    if (error) {
      res.send(error.details[0].message);
      return;
    }

    const newUser = await User.create(req.body);
    const token = generateJwtToken(newUser);

    res.cookie("token", token, { httpOnly: true });

    res.send({ newUser, token });
  } catch (error) {
    console.log(error);
  }
});

export default router;
