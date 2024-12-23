const AddReview = ({
    reviewText,
    setReviewText,
    rating,
    setRating,
    handleAddReview,
    token,
    message,
  }) => (
    <div className="mt-6">
      {token ? (
        <>
          <h3 className="text-xl font-semibold text-gray-800">Add a Review</h3>
          <form onSubmit={handleAddReview} className="mt-4">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Write your review here..."
              required
            ></textarea>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-2 mt-2 border rounded-md"
              required
            >
              <option value="" disabled>
                Rate the skill
              </option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 && 's'}
                </option>
              ))}
            </select>

            <div className="mt-4 flex justify-center gap-2">
              <button
                type="submit"
                className="px-4 py-2 mt-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-400 focus:outline-none"
              >
                Submit Review
              </button>
            </div>
          </form>
          {message && <p className="mt-2 text-blue-500">{message}</p>}
        </>
      ) : (
        <p className="mt-6 text-gray-500">Log in to leave a review!</p>
      )}
    </div>
);

export default AddReview;