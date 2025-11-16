import { Request, Response } from "express";
import User from "../../models/user.model";

const deleteSkill = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { skill } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
       res.status(404).json({ message: "User not found" });
       return;
    }

    user.Skills = user.Skills.filter((s) => s !== skill);
    await user.save();

    res.status(200).json({ message: "Skill removed successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove skill", error });
  }
};

export default deleteSkill;
