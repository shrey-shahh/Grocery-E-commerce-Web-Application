import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { AuthContext } from "./../Firebase/Auth";
import { Badge, Container } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import queries from "./../queries";
import UserReviewCard from "./UserReviewCard";

const styles = {
    reviews: {
        margin: "20px",
        fontFamily: "monospace",
        fontSize: "larger",
        textAlign: "left",
    },
};
function UserReviews() {
    const { currentUser } = useContext(AuthContext);
    const { data } = useQuery(queries.REVIEW_BY_USERID, { variables: { userId: currentUser.uid } });
    if (data && data.userReview) {
        const { userReview } = data;
        const buildCard = (review) => {
            console.log(review);
            let rating = [];
            for (let i = 1; i < review.rating + 1; i++) {
                rating.push(
                    <FaStar
                        key={i}
                        size={18}
                        color={"rgb(252, 186, 3)"}
                        style={{
                            marginRight: 10,
                        }}
                    />
                );
            }
            return <UserReviewCard key={review._id} rating={rating} review={review} />;
        };
        return (
            <Container fluid="true">
                <div style={styles.reviews} variant="dark">
                    Reviews
                    <Badge bg="info" style={{ marginLeft: "5px" }}>
                        {userReview?.length}
                    </Badge>
                </div>
                {userReview?.map((review) => buildCard(review))}
            </Container>
        );
    }
}

export default UserReviews;