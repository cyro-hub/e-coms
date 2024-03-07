import bcrypt from "bcryptjs";

export default function compare(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}