import axios from "axios";

export async function fetchCalendarEvents() {
  const calendarId = "b299e3ff8a4264f552d82b6b379088a1f70dd147cab33d895adde48306cd7f80@group.calendar.google.com";
  const apiKey = "AIzaSyB0v7Yb2k94rB4fRUc5UNDRJhSUufjsmpw";
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

  const response = await axios.get(url);
  return response.data.items;
}
