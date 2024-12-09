import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const BookASession = ({ isOpen, onClose, availability, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [message, setMessage] = useState('');

  // Filter available time slots for the selected date
  const availableSlots = availability[selectedDate?.toString().split('T')[0]] || [];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6">
            
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              onClick={onClose}
            >
              &times;
            </button>
            
            <h2 className="text-2xl font-semibold text-center mb-4">Book a Session</h2>

            {/* Calendar */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Select a Date:</h3>
              <Calendar onChange={setSelectedDate} value={selectedDate} />

            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Available Time Slots:</h3>
                {availableSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-4 rounded-lg border ${
                          selectedSlot === slot
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No slots available for this date.</p>
                )}
              </div>
            )}

            {/* Message Field */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-lg font-semibold mb-2">
                Add a Note (Optional):
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any additional information for the session..."
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="py-2 px-4 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => onConfirm(selectedDate, selectedSlot, message)}
                className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                disabled={!selectedDate || !selectedSlot}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookASession;
