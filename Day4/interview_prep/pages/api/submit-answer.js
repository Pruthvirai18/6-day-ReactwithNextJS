import prisma from "../../utils/prismaClient";
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { userId, type, question, answer } = req.body;

  const test = await prisma.test.create({
    data: { userId, type, question, answer },
  });

  res.json(test);
}
import { supabase } from "../../utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { question, answer, category } = req.body;

  const { data, error } = await supabase
    .from("answers")
    .insert([{ question, answer, category }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ message: "Answer submitted successfully!", data});
}
