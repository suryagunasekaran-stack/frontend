import React from "react";
import withRecordsViewer from '../Views/withRecordsViewer';

const AnchorView = withRecordsViewer('/getrecords', 'anchor');
const AnchorageViewer = () => {
    return (
        <AnchorView />
    );
}
export default AnchorageViewer;