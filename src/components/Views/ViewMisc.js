import React from "react";
import { Button, DropdownButton, Dropdown, Row, Col } from "react-bootstrap";

const FilterDropdown = ({ title, uniqueItems, setFilter }) => {
    return (
        <DropdownButton variant='secondary' id={`dropdown-${title.toLowerCase()}`} title={title}>
            {uniqueItems.map(item => (
                <Dropdown.Item key={item} onClick={() => setFilter(item)}>
                    {item}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
};

export const FilterRow = ({ filters, onClearFilters }) => {
    return (
        <div className='pb-3'>
            <Row className="justify-content-end">
                {filters.map(({ title, uniqueItems, setFilter }) => (
                    <Col key={title} xs={6} sm={4} md="auto" className="mb-2 mb-md-0 text-center">
                        <FilterDropdown title={title} uniqueItems={uniqueItems} setFilter={setFilter} />
                    </Col>
                ))}
                <Col xs={6} sm={4} md="auto" className="mb-2 mb-md-0 text-center">
                    <Button variant="warning" onClick={onClearFilters}>Clear Filters</Button>
                </Col>
            </Row>
        </div>
    );
};

export const cardTitle = {
    toolbox: "Toolbox Meeting Records",
    anchor: "Anchorage Meeting Records",
    masssafety: "Mass Safety Briefing",
  };