import { response } from "express";
import groqResponse from "../groq.js";
import User from "../models/userModel.js";
import moment from "moment/moment.js";

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
    return res.status(400).json({ message: "user.controller error" });
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

export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);
    const userName = user.name;
    const assistantName = user.assistantName;
    // console.log("User name:", user?.name);
    // console.log("Assistant name:", user?.assistantName);
    const result = await groqResponse(command, assistantName, userName);
    const jsonMatch = result.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      return res.status(400).json({ response: "Sorry, I can't understand" });
    }
    const groqResult = JSON.parse(jsonMatch[0]);
    const type = groqResult.type;
    switch (type) {
      case "get_date":
        return res.json({
          type,
          userInput: groqResult.userInput,
          response: `current date is ${moment().format("YYYY-MM-DD")}`,
        });
      case "get_time":
        return res.json({
          type,
          userInput: groqResult.userInput,
          response: `current time is ${moment().format("hh:mm A")}`,
        });
      case "get_day":
        return res.json({
          type,
          userInput: groqResult.userInput,
          response: `today is ${moment().format("dddd")}`,
        });
      case "get_month":
        return res.json({
          type,
          userInput: groqResult.userInput,
          response: `today is ${moment().format("MMMM")}`,
        });
      case "general":
      case "google_search":
      case "youtube_search":
      case "youtube_play":
      case "weather-show":
      case "calculator_open":
      case "facebook_open":
      case "instagram_open":
        return res.json({
          type,
          userInput: groqResult.userInput,
          response: groqResult.response,
        });
      default:
        return res
          .status(400)
          .json({ response: "I didn't understand that command" });
    }
  } catch (error) {
    console.log("Ask to assistant error: ", error);
    return res.status(500).json({ response: "askToAssistant error" });
  }
};
