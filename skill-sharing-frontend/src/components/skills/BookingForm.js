import React, { useState, useEffect } from 'react';

const BookingForm = ({ hourlyRate, onClose, onSubmit, availabilities }) => {
    const [duration, setDuration] = useState(1); // Default duration (1 hour)
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [filteredTimes, setFilteredTimes] = useState([]);

    const calculateDuration = (start, end) => {
        if (!start || !end) return 0;

        const [startHours, startMinutes] = start.split(":").map(Number);
        const [endHours, endMinutes] = end.split(":").map(Number);

        // Convert times to total minutes
        const startTotalMinutes = startHours * 60 + startMinutes;
        const endTotalMinutes = endHours * 60 + endMinutes;

        // Calculate duration in hours
        const durationInMinutes = endTotalMinutes - startTotalMinutes;

        return durationInMinutes > 0 ? durationInMinutes / 60 : 0; // Return hours
    };

    useEffect(() => {
        // Filter availabilities based on the selected day_of_week
        if (dayOfWeek) {
            const availableTimes = availabilities.filter(
                (day) => day.day_of_week === dayOfWeek
            );
            setFilteredTimes(availableTimes);
            setStartTime(''); // Reset start time when day changes
            setEndTime('');   // Reset end time when day changes
        }
    }, [dayOfWeek, availabilities]);

    useEffect(() => {
        // Update duration whenever startTime or endTime changes
        const calculatedDuration = calculateDuration(startTime, endTime);
        setDuration(calculatedDuration);
    }, [startTime, endTime]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (duration <= 0) {
            alert("Invalid time selection. Please check Start and End Time.");
            return;
        }

        try {
            const response = await onSubmit(duration);

            if (response) {
                alert("Booking successful!");
            } else {
                alert("Booking failed. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting booking:", error);
            alert("An unexpected error occurred. Please try again later.");
        } finally {
            onClose();
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Book a Session</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Day of the Week:
                    <select
                        value={dayOfWeek}
                        onChange={(e) => setDayOfWeek(e.target.value)}
                        className="w-full p-2 border rounded mt-1"
                    >
                        <option value="">Select a day</option>
                        {availabilities.map((day) => (
                            <option key={day.id} value={day.day_of_week}>
                                {day.day_of_week}
                            </option>
                        ))}
                    </select>
                </label>

                {dayOfWeek && (
                    <>
                        <label className="block mb-2">
                            Start Time:
                            <select
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full p-2 border rounded mt-1"
                            >
                                <option value="">Select start time</option>
                                {filteredTimes.map((time) => (
                                    <option key={time.id} value={time.start_time}>
                                        {time.start_time}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="block mb-2">
                            End Time:
                            <select
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full p-2 border rounded mt-1"
                            >
                                <option value="">Select end time</option>
                                {filteredTimes.map((time) => (
                                    <option key={time.id} value={time.end_time}>
                                        {time.end_time}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </>
                )}

                <label className="block mb-2">
                    Duration (hours):
                    <input
                        type="number"
                        min="1"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full p-2 border rounded mt-1"
                    />
                </label>

                <p className="mt-2">Total Cost: {hourlyRate * duration} credits</p>
                <div className="mt-4 flex justify-center gap-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
