import React, { useEffect } from 'react';
import useFetchData from '../CustomHooks/useFetchData';
import UserCard from './UserCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const UserDataFetcher = () => {
    const { data: usersData } = useFetchData('getallusers');

    useEffect(() => {
        if (usersData) {
            console.log(usersData);
        }
    }, [usersData]);

    return (
        <Container>
            <h1>Users</h1>
            {usersData ? (
                <Row xs={1} sm={2} md={3} lg={4} xl={3}>
                    {usersData.map(user => (
                        <Col key={user._id} style={{ padding: '0.5rem' }}>  {/* Added padding */}
                            <UserCard user={user} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>Loading...</p>
            )}
        </Container>
    );
};

export default UserDataFetcher;
