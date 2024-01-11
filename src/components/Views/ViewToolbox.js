import React from "react";
import withRecordsViewer from '../Views/withRecordsViewer';

const ToolboxRecordsViewer = withRecordsViewer('/gettoolboxrecords', 'toolbox');
const ViewToolbox = () => {
    return (
        <ToolboxRecordsViewer />
    );
}
export default ViewToolbox;