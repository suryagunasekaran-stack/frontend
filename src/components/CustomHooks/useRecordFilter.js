import { useState, useMemo } from 'react';

const useRecordFilter = (records) => {
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [vesselFilter, setVesselFilter] = useState('');
    const [raNumberFilter, setRANumberFilter] = useState('');

    const clearFilters = () => {
        setDepartmentFilter('');
        setAuthorFilter('');
        setVesselFilter('');
        setRANumberFilter('');
    };

    const filteredRecords = useMemo(() => {
        return records.filter(record => 
            (departmentFilter === '' || record.department === departmentFilter) &&
            (authorFilter === '' || record.author === authorFilter) &&
            (vesselFilter === '' || record.vessel === vesselFilter) &&
            (raNumberFilter === '' || record.raNumber === raNumberFilter)
        ).sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
    }, [records, departmentFilter, authorFilter, vesselFilter, raNumberFilter]);


    const filtersConfig = useMemo(() => {
        return [
            { title: "Department", uniqueItems: [...new Set(records.map(record => record.department))], setFilter: setDepartmentFilter },
            { title: "Author", uniqueItems: [...new Set(records.map(record => record.author))], setFilter: setAuthorFilter },
            { title: "Vessel", uniqueItems: [...new Set(records.map(record => record.vessel))], setFilter: setVesselFilter },
            { title: "RA Number", uniqueItems: [...new Set(records.map(record => record.raNumber))], setFilter: setRANumberFilter }
        ];
    }, [records]);

    return { filteredRecords, filtersConfig, clearFilters };
};

export default useRecordFilter;
