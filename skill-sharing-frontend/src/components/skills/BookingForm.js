import React, { useState } from 'react';

const BookingForm = ({ hourlyRate, onClose, onSubmit }) => {
    const [duration, setDuration] = useState(1); // Default duration (1 hour)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
    try {
        // Attempt to submit the booking
        const response = await onSubmit(duration);

        if (response) {
            alert('Booking successful!');
        } else {
            alert('Booking failed. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting booking:', error);
        alert('An unexpected error occurred. Please try again later.');
    } finally {
        // Close the modal regardless of the outcome
        onClose();
    }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Book a Session</h2>
            <form onSubmit={handleSubmit}>
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
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => onSubmit(null)} // Optional cancel behavior
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                    >
                        Cancel
                    </button>
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
