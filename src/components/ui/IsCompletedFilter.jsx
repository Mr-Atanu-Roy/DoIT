import TagSelect from './TagSelect';

const IsCompletedFilter = ({ status, setIsCompleteFilter, disabled }) => {
    const options = [
        { id: 'all', label: 'All', color: 'bg-blue-500' },
        { id: 'incompleted', label: 'Incompleted', color: 'bg-rose-500' },
        { id: 'completed', label: 'Completed', color: 'bg-emerald-500' }
    ];

    return (
        <TagSelect
            label="Status"
            value={status}
            options={options}
            onChange={setIsCompleteFilter}
            disabled={disabled}
        />
    );
};

export default IsCompletedFilter;
