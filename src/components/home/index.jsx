import { useAuth } from "../../contexts/authContext";
import React, { useEffect, useState } from "react";
import { fetchCalendarEvents } from "../../api/calendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import "./home.css";

const Home = () => {

    const { currentUser, loading } = useAuth();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Check if event is in favorites
    const checkIfFavorite = async (eventId) => {
        const favoriteRef = doc(db, "users", currentUser.uid, "favorites", eventId);
        const docSnap = await getDoc(favoriteRef);
        setIsEventFavorite(docSnap.exists());
    };

    useEffect(() => {
        const getEvents = async () => {
            try {
                const fetchedEvents = await fetchCalendarEvents();
                const formattedEvents = fetchedEvents.map(event => ({
                    id: event.id,
                    title: event.summary,
                    start: event.start.date || event.start.dateTime,
                    end: event.end.date || event.end.dateTime,
                    description: event.description || "No description provided",
                    location: event.location || "No location provided",
                    // Add any other event details you want to display
                }));
                setEvents(formattedEvents);
                console.log('Formatted Events:', formattedEvents); // Debug log
            } catch (error) {
                console.error("Failed to fetch events", error);
            }
        };
        getEvents();
    }, []);

    const handleEventClick = async (clickInfo) => {
        const clickedEventId = clickInfo.event.id;
    
        const favoriteRef = doc(db, "users", currentUser.uid, "favorites", clickedEventId);
        const docSnap = await getDoc(favoriteRef);
    
        setSelectedEvent({
            id: clickedEventId,
            title: clickInfo.event.title,
            start: clickInfo.event.start,
            end: clickInfo.event.end,
            description: clickInfo.event.extendedProps.description || "No description provided",
            location: clickInfo.event.extendedProps.location || "No location provided",
            isFavorite: docSnap.exists(), 
        });
    
        setIsSidebarOpen(true);
    };

        // Check if this event is favorite
        const toggleFavorite = async () => {
            if (!selectedEvent) return;
        
            const eventId = selectedEvent.id;
            const favoriteRef = doc(db, "users", currentUser.uid, "favorites", eventId);
        
            try {
                if (selectedEvent.isFavorite) {
                    // Remove from favorites
                    await deleteDoc(favoriteRef);
                    setSelectedEvent(prev => ({ ...prev, isFavorite: false }));
                } else {
                    // Add to favorites
                    await setDoc(favoriteRef, {
                        ...selectedEvent,
                        addedAt: new Date(),
                    });
                    setSelectedEvent(prev => ({ ...prev, isFavorite: true }));
                }
            } catch (error) {
                console.error("Error toggling favorite:", error);
            }
        };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-container">
            <h1>Welcome {currentUser.displayName}</h1>
            <h3>The upcoming events you can attend...</h3>
            <h2>KAU Events Calendar</h2>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleEventClick}
                eventColor="#2c5f3d"
                eventTextColor="#ffffff"
                height="auto"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek'
                }}
                buttonText={{
                    today: 'Today',
                    month: 'Month',
                    week: 'Week',
                }}
            />

            {isSidebarOpen && selectedEvent && (
                <div className="sidebar">
                    <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>X</button>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h2>{selectedEvent.title}</h2>
                    <p><strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
                    <p><strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
                    <p><strong>Description:</strong> {selectedEvent.description}</p>
                    <p><strong>Location:</strong> {selectedEvent.location}</p>

                    <button
                        onClick={toggleFavorite}
                        className={`favorite-btn ${selectedEvent.isFavorite ? 'remove' : 'add'}`}
                    >
                        {selectedEvent.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>

                </div>
            )}
        </div>
    );
};

export default Home;


