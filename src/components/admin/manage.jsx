import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";
import { useAuth } from "../../contexts/authContext";
import "./manage.css";

const Manage = () => {
  const { currentUser, role } = useAuth();
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    location: ""
  });

  // Fetch events created by current user
  useEffect(() => {
    const fetchEvents = async () => {
      const q = query(
        collection(db, "events"),
        where("createdBy", "==", currentUser.uid)
      );
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(fetched);
    };

    if (currentUser) fetchEvents();
  }, [currentUser]);

  // Create event
  const handleCreate = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "events"), {
      ...newEvent,
      createdBy: currentUser.uid,
      createdAt: new Date()
    });
    setEvents(prev => [...prev, { ...newEvent, id: docRef.id }]);
    setNewEvent({ title: "", description: "", start: "", end: "", location: "" });
  };

  // Delete event
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "events", id));
    setEvents(events.filter(e => e.id !== id));
  };

  // TODO: handleEdit could go here

  return (
    <div className="manage-container">
      <h2>Manage Your Events</h2>
  
      {/* Top: Event Form */}
      <form onSubmit={handleCreate} className="event-form">
        <input
          type="text"
          placeholder="Title"
          value={newEvent.title}
          onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newEvent.description}
          onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <input
          type="datetime-local"
          value={newEvent.start}
          onChange={e => setNewEvent({ ...newEvent, start: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={newEvent.end}
          onChange={e => setNewEvent({ ...newEvent, end: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <button type="submit">Create Event</button>
      </form>
  
      {/* Bottom: Event Cards */}
      <div className="event-list">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>
              {new Date(event.start).toLocaleString()} → {new Date(event.end).toLocaleString()}
            </p>
            <p><strong>Location:</strong> {event.location}</p>
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};

export default Manage;
