import React, { useState } from 'react';
import { Container, Row, Col, Form, Spinner, Alert } from 'react-bootstrap';
import RecordsViewer from './RecordsViewer';
import useFetchRecords from '../CustomHooks/useFetchRecords';
import { cardTitle } from './ViewMisc';

const withRecordsViewer = (apiEndpoint, cardType) => {
  return (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term

    // Fetch records based on current page and search term
    const { records, isLoading, isError, error, totalPages } = useFetchRecords(
      apiEndpoint,
      cardType,
      currentPage,
      30,
      searchTerm
    );

    return (
        <Container fluid style={{ backgroundColor: '#E5ECF4', minHeight: '100vh', overflowY: 'auto',  // Enables vertical scrolling
        maxHeight: '100%',  // Optionally limits the height
        scrollbarWidth: 'none',  // For Firefox
        msOverflowStyle: 'none',  // For Internet Explorer 10+
        '&::WebkitScrollbar': {
            display: 'none'  // For Chrome, Safari, and Opera
        } }} >
        <div style={{ marginLeft: '25px'}}>
          <h2 style={{ marginTop: '95px' }}>{cardTitle[cardType]}</h2>
          <Row className="mb-3">
            <Col md={4} lg={3}>
              <Form>
                <Form.Group controlId="searchInput">
                  <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          </div>

          {/* Conditional Loading and Error Handling */}
          {isLoading && <Spinner animation="border" />}
          {isError && <Alert variant="danger">Error: {error.message}</Alert>}

          {/* Display Records */}
          <RecordsViewer
            records={records}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            cardType={cardType}
            {...props}
          />

        </Container>
    );
  };
};

export default withRecordsViewer;

