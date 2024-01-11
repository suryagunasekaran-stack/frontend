import React from "react";
import withRecordsViewer from '../Views/withRecordsViewer';

const MassSafetyView = withRecordsViewer('/getmasssafetyrecords', 'masssafety');
const MassViewer = () => {
    return (
        <MassSafetyView />
    );
}
export default MassViewer;