import React from "react";

const StarRating = ({ rating }) => {
  // Convert the rating to an array of 5 elements
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    return (
      <div
        key={index}
        className="star-wrapper"
        style={{
          position: "relative",
          display: "inline-block",
          width: "20px",
          height: "20px",
        }}
      >
        <i
          className="fa fa-star"
          style={{
            color: "lightgray",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></i>

        {rating >= starValue ? (
          <i
            className="fa fa-star"
            style={{
              color: "gold",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          ></i>
        ) : (
          rating > index && (
            <i
              className="fa fa-star"
              style={{
                color: "gold",
                position: "absolute",
                top: 0,
                left: 0,
                width: `${(rating - index) * 100}%`, // Fill the star based on the fraction of the rating
                overflow: "hidden",
              }}
            ></i>
          )
        )}
      </div>
    );
  });

  return <div>{stars}</div>;
};

export default StarRating;
