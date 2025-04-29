import axios from "axios";

export async function fetchCalendarEvents() {
  const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID;
  const apiKey =  import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
  const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

  const response = await axios.get(url);
  return response.data.items;
}
