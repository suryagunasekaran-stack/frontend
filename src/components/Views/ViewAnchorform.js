import React from "react";
import withRecordsViewer from '../withRecordsViewer';

const AnchorView = withRecordsViewer('/getanchorrecords', 'anchor');
const AnchorageViewer = () => {
    return (
        <AnchorView />
    );
}
export default AnchorageViewer;