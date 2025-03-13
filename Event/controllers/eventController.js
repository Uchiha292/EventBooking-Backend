import axios from 'axios';
import Event from '../models/eventModel.js';

export const createEvent = async (req, res) => {
    const { userId, eventId, name, description, date, time } = req.body;

    try {
        const userResponse = await axios.get(`localhost:5001/users/:${userId}`);

        const newEvent = new Event({
          userId,
          eventId,
          name,
          description,
          date,
          time
        });

        await newEvent.save();
        const incEvent = await axios.put(`localhost:5001/users/:${userId}`, `${userResponse.activeBookings + 1 }`);
        res.status(201).send(newEvent);
    } 
    catch (error) {
        res.status(400).send(error);
    }
};

export const getDetail = async (req, res) => {
    const { eventId } = req.params;
  
    try {
      let detail;
      if (eventId) {
        detail = await Event.find(eventId)
          .populate(Event);
      }
  
      if (detail.length === 0) {
        return res.status(200).json({ detail: null });
      }
  
      res.status(200).json({ detail });
    } 
    catch (error) {
      res.status(500).json({ message: "Error fetching Event Detail", error });
    }
};

export const categorizeEvent = async (req, res) => {
  const { eventId, category } = req.body;
  
    try {
      const event = await Event.findById(req.event.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      event.category = category;
      await event.save();
  
      res.status(200).json({ message: "Event Categorized successfully"});
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getAllEvents = async (req, res) => {
    const { userId } = req.params;
    try {
        const userResponse = await axios.get(`localhost:5001/users/:${userId}`);
        if (!userResponse) {
          return res.status(404).json({ message: "User not found" });
        }

        const events = await Event.find(userId);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }
};