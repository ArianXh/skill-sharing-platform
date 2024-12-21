const Reviews = ({ reviews }) => (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800">Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-300 py-4">
            <p>
              <strong>{review.user?.name || 'Anonymous'}</strong>: {review.review_text}
            </p>
            <p>Rating: {review.rating} stars</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
);

export default Reviews;