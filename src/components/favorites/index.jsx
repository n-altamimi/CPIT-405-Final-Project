// src/components/favorites/index.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import "./favorites.css";

const Favorites = () => {
    const { currentUser } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    // Convert Firestore Timestamp to JS Date
    const convertTimestampToDate = (timestamp) => {
        if (!timestamp) return new Date();
        // Check if it's a Firestore Timestamp
        if (timestamp.seconds) {
            return new Date(timestamp.seconds * 1000);
        }
        // If it's already a Date or string
        return new Date(timestamp);
    };

    // Format date and time
    const formatDateTime = (timestamp) => {
        const date = convertTimestampToDate(timestamp);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit'
            })
        };
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const q = collection(db, "users", currentUser.uid, "favorites");
                const querySnapshot = await getDocs(q);
                const favs = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    favs.push({
                        id: doc.id,
                        ...data,
                        // Convert timestamps to dates
                        start: convertTimestampToDate(data.start),
                        end: convertTimestampToDate(data.end),
                        addedAt: convertTimestampToDate(data.addedAt)
                    });
                });
                setFavorites(favs);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, [currentUser]);

    const handleRemoveFavorite = async (eventId) => {
        try {
            await deleteDoc(doc(db, "users", currentUser.uid, "favorites", eventId));
            setFavorites(favorites.filter(event => event.id !== eventId));
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
    };

    if (loading) {
        return <div className="loading">Loading your favorite events...</div>;
    }

    return (
        <div className="favorites-container">
            <h1>My Favorite Events</h1>
            {favorites.length === 0 ? (
                <p className="no-favorites">You haven't added any events to your favorites yet.</p>
            ) : (
                <div className="event-cards">
                    {favorites.map(event => {
                        const startDateTime = formatDateTime(event.start);
                        const endDateTime = formatDateTime(event.end);
                        
                        return (
                            <div key={event.id} className="event-card">
                                <div className="event-card-header">
                                    <h3>{event.title}</h3>
                                    <span className="event-date">
                                        {startDateTime.date}
                                    </span>
                                </div>
                                <div className="event-card-body">
                                    <div className="event-detail">
                                        <i className="far fa-clock"></i>
                                        <span>
                                            {startDateTime.time} - {endDateTime.time}
                                        </span>
                                    </div>
                                    <div className="event-detail">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>{event.location}</span>
                                    </div>
                                    <p className="event-description">{event.description}</p>
                                </div>
                                <div className="event-card-footer">
                                    <button className="remove-btn" 
                                        onClick={() => handleRemoveFavorite(event.id)}>
                                        Remove from Favorites
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Favorites;