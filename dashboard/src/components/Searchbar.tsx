import { useEffect, useState } from 'react';

type SearchbarProps = {
    onAction?: (query: string) => void;
};

function Searchbar({ onAction }: SearchbarProps) {
     const [query, setQuery] = useState('');

    useEffect(() => {
        if (onAction) {
            onAction(query);
        }
    }, [query]);

    return (
        <div className="searchbar w-full max-w-md absolute left-1/2 transform -translate-x-1/2">
            <input className="bg-bg_dark w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" type="text" placeholder="Search..." value={query} onChange={e => {
                setQuery(e.target.value)
            }} />
        </div>
    );
}

export default Searchbar;
