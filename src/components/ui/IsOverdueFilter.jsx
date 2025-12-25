import TagSelect from './TagSelect';

const IsOverdueFilter = ({ status, setIsOverdueFilter }) => {
    const options = [
        { id: 'all', label: 'All', color: 'bg-blue-500' },
        { id: 'overdue', label: 'Overdue', color: 'bg-rose-500' },
        { id: 'completed', label: 'Completed', color: 'bg-emerald-500' }
    ];

    return (
        <TagSelect
            label="Due"
            value={status}
            options={options}
            onChange={setIsOverdueFilter}
        />
    );
};

export default IsOverdueFilter;
