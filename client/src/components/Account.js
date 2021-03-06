import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Firebase/Auth";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Alert, Container } from "react-bootstrap";
import { dosignOut } from "../Firebase/FirebaseFunctions";
import { useQuery } from "@apollo/client";
import queries from "../queries";
import UserOrders from "./orders/UserOrders";
import UserReviews from "./UserReviews";

const styles = {
    header: { fontSize: "xx-large", fontWeight: "300" },
};
function Account(props) {
    const { currentUser } = useContext(AuthContext);
    const [error1, setError] = useState("");
    const navigate = useNavigate();
    const { loadiing, error, data } = useQuery(queries.GET_USER_BY_ID, {
        fetchPolicy: "cache-and-network",
        variables: {
            id: currentUser.uid,
        },
    });

    useEffect(() => {
        if (!data?.getUser) {
            navigate("/userDetail");
        }
    }, [data, navigate]);

    if (data && data.getUser) {
        const { getUser } = data;

        async function handleLogout() {
            
            setError("");

            try {
                await dosignOut();
                navigate("/signin");
            } catch {
                setError("Error logging out");
            }
        }

        return (
            <div>
                <>
                    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
                        <div className="w-100">
                            <Card style={{ marginBottom: "25px" }}>
                                <Card.Header>
                                    <Card.Text className="text-center" style={styles.header}>
                                        Profile
                                    </Card.Text>
                                </Card.Header>
                                <Card.Body>
                                    {error1 && <Alert variant="danger">{error1}</Alert>}
                                    <strong>Name:</strong> {currentUser && currentUser.displayName}
                                    <br />
                                    <br />
                                    <strong>Email:</strong> {currentUser && currentUser.email}
                                    <br />
                                    <br />
                                    <strong>Phone:</strong> {getUser && getUser.phoneNumber}
                                    <br />
                                    <br />
                                    <strong>Address:</strong>{" "}
                                    {getUser.addressStreet + ", " + getUser.apt + ", " + getUser.city + ", " + getUser.state + ", " + getUser.zip}
                                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3 ">
                                        Update Profile
                                    </Link>
                                </Card.Body>
                            </Card>
                            <div className="w-100">
                                <Card style={{ marginBottom: "25px" }}>
                                    <Card.Header>
                                        <Card.Text className="text-center" style={styles.header}>
                                            Your Orders
                                        </Card.Text>
                                    </Card.Header>
                                    <Card.Body>
                                        <UserOrders />
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="w-100">
                                <Card>
                                    <Card.Header>
                                        <Card.Text className="text-center" style={styles.header}>
                                            Your Reviews
                                        </Card.Text>
                                    </Card.Header>
                                    <Card.Body>
                                        <UserReviews />
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className="w-100 text-center mt-2">
                                <Button variant="btn btn-danger" onClick={handleLogout}>
                                    Log Out
                                </Button>
                            </div>
                        </div>
                    </Container>
                </>
                
            </div>
        );
    } else if (loadiing) {
        return <div>Loading...</div>;
    } else if (error) {
        return <div>Error</div>;
    }
}

export default Account;
