import React from "react";
import withRecordsViewer from '../Views/withRecordsViewer';

const ToolboxRecordsViewer = withRecordsViewer('/getrecords', 'toolbox');
const ViewToolbox = () => {
    return (
        <ToolboxRecordsViewer />
    );
}
export default ViewToolbox;