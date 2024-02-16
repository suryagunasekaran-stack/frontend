// withRecordsViewer.js
import React, {useState} from 'react';
import RecordsViewer from './RecordsViewer';
import useFetchRecords from '../CustomHooks/useFetchRecords';

const withRecordsViewer = (apiEndpoint, cardType) => {
    return (props) => {
        const [currentPage, setCurrentPage] = useState(1);
        const { records, isLoading, error, setRecords, totalPages } = useFetchRecords(apiEndpoint, cardType, currentPage, 30);
        if (isLoading) return <p>Loading...</p>;
        if (error) return <p>Error loading data: {error}</p>;

        return (
            <RecordsViewer 
            records={records}
            setRecords={setRecords}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            cardType={cardType}
            {...props} // Pass down additional props
        />
        );
    };
};

export default withRecordsViewer;
