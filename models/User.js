import { model, Schema } from "mongoose";
import Joi from "joi";

const UserSchema = new Schema({
  firstName: { type: String, required: true, minlength: 6, maxlength: 24 },
  lastName: { type: String, required: true, minlength: 6, maxlength: 24 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
});

const User = model("User", UserSchema);

function registerValidate(user) {
  const schema = Joi.object({
    firstName: Joi.string().required().min(6).max(24),
    lastName: Joi.string().required().min(6).max(24),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    username: Joi.string().alphanum().min(3).max(30).required(),
  });

  const result = schema.validate(user);
  return result;
}

export { User, registerValidate };
