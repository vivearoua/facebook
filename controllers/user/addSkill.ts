import { Request, Response } from "express";
import User from "../../models/user.model";

const addSkill = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { skill } = req.body;

  try {
    if (!skill) {
      res.status(400).json({ message: "Skill is required" });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.Skills.push(skill);
    await user.save();

    res.status(200).json({ message: "Skill added successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to add skill", error });
  }
};

export default addSkill;
