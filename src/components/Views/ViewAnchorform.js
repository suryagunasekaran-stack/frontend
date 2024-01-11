import React from "react";
import withRecordsViewer from '../Views/withRecordsViewer';

const AnchorView = withRecordsViewer('/getanchorrecords', 'anchor');
const AnchorageViewer = () => {
    return (
        <AnchorView />
    );
}
export default AnchorageViewer;