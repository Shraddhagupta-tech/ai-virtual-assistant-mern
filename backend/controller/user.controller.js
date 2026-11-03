import User from "../models/userModel.js";

export const getCurrUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).josn({ message: "user.controller error" });
  }
};

export const updateAssistant = async (req, res) => {
  console.log(req.body);
  try {
    const { assistantName, imageUrl } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          assistantName,
          assistantImg: imageUrl,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).select("-password");
    console.log("Updated user from MongoDB:", user);
console.log("Assistant Name:", user?.assistantName);
console.log("Assistant Image:", user?.assistantImg);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("Update Assistant Error:", error);
    return res.status(500).json({
      message: "updateAssistantError",
      error: error.message,
    });
  }
};
