import React from "react";
import { Review } from "../../../components/review";
import { v4 as uuidv4 } from "uuid";

type TypeCreator = {
    email: string;
};

type TypeReview = {
    text: string;
    creator: TypeCreator;
};

type IReviews = {
    reviews: TypeReview[];
};

export const DashboardReviews: React.FC<IReviews> = ({ reviews }) => {
    return (
        <div className="p-10 grid grid-flow-row gap-10">
            {reviews &&
                reviews.map((review) => {
                    return (
                        <Review
                            key={uuidv4()}
                            email={review.creator.email}
                            text={review.text}
                        />
                    );
                })}
            {reviews.length === 0 && <div>No reviews yet</div>}
        </div>
    );
};
