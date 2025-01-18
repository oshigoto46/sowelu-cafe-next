import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const cookies = parse(req.headers.cookie || "");
  const sessionToken = cookies.sessionToken;

  if (!sessionToken) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    const user = jwt.verify(sessionToken, SECRET_KEY);
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Session validation error:", err);
    return res.status(401).json({ error: "Invalid or expired session." });
  }
}
