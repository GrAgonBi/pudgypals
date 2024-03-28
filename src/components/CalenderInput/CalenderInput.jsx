import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalenderInput.scss";

export default function CalendarInput({ today }) {
  return (
    <div className="calendar-container">
      <div className="calendar">
        <Calendar
          value={today}
          navigation={false}
          onChange={() => {}} // Disable onChange
          locale="en-US"
          onClickDay={() => {}} // Disable onClickDay
        />
      </div>
    </div>
  );
}
