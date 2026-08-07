import Member from "../models/Member.js";

// Add Member
export const addMember = async (req, res) => {
  try {

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    const existingMember = await Member.findOne({
      email: email.toLowerCase()
    });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: "Email already exists."
      });
    }

    const member = await Member.create({
      name,
      email: email.toLowerCase(),
      phone
    });

    res.status(201).json({
      success: true,
      message: "Member added successfully.",
      member
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get All Members
export const getMembers = async (req, res) => {

  try {

    const members = await Member.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: members.length,
      members
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};