
import TagSelect from './TagSelect';

const PriorityFilter = ({ priorityFilter, setPriorityFilter }) => {
    const options = [
        { id: 'all', label: 'All', color: 'bg-blue-500' },
        { id: '1', label: 'High', color: 'bg-rose-500' },
        { id: '2', label: 'Medium', color: 'bg-amber-500' },
        { id: '3', label: 'Low', color: 'bg-emerald-500' }
    ];

    return (
        <TagSelect
            label="Priority"
            value={priorityFilter}
            options={options}
            onChange={setPriorityFilter}
        />
    );
};

export default PriorityFilter;