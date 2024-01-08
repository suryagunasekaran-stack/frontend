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
                    <Col key={title} xs={12} md="auto">
                        <FilterDropdown title={title} uniqueItems={uniqueItems} setFilter={setFilter} />
                    </Col>
                ))}
                <Col xs={12} md="auto">
                    <Button onClick={onClearFilters}>Clear Filters</Button>
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