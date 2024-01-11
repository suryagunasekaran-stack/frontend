// withRecordsViewer.js
import React from 'react';
import RecordsViewer from './RecordsViewer';
import useFetchRecords from '../CustomHooks/useFetchRecords';

const withRecordsViewer = (apiEndpoint, cardType) => {
    return (props) => {
        const { records, isLoading, error, setRecords } = useFetchRecords(apiEndpoint);

        if (isLoading) return <p>Loading...</p>;
        if (error) return <p>Error loading data: {error}</p>;

        return (
            <RecordsViewer 
                records={records}
                setRecords={setRecords}
                cardType={cardType}
                {...props} // Pass down additional props
            />
        );
    };
};

export default withRecordsViewer;
