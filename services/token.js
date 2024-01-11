import Jwt from "jsonwebtoken";

function generateJwtToken(userId) {
  const accessToken = Jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return accessToken;
}

export default generateJwtToken;
