import User from '../models/userModel.js';

export const userRegistration = async (req, res) => {
    const { userName, userEmail } = req.body;

    try {
        const newUser = new User({
          userName, 
          userEmail
        });

        await newUser.save();
        res.status(201).json(newUser);
    } 
    catch (error) {
        res.status(400).json({error: error.message});
    }
};


export const getDetail = async (req, res) => {
    const { userId } = req.params;
  
    try {
      let detail;
      if (userId) {
        detail = await User.find({ userId })
          .populate(User);
      }
  
      if (detail.length === 0) {
        return res.status(200).json({ detail: null });
      }
  
      res.status(200).json({ detail });
    } 
    catch (error) {
      res.status(500).json({ message: "Error fetching User Detail", error });
    }
  };


export const updateEventCount = async (req, res) => {
  const { activeEvents } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User  not found" });
      }
  
      user.activeEvents = activeEvents;
      await user.save();
  
      res.status(200).json({ message: "User  profile updated successfully"});
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };