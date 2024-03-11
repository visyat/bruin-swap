import React, { useState } from 'react';

function Page() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
        // You can perform search-related actions here
    };

    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
            <h1>Bruin Swap</h1>
            <input
                type="text"
                placeholder="Search..."
                style={{
                    padding: '8px 12px', 
                    border: '2px solid #ccc', 
                    borderRadius: '20px',
                    fontSize: '16px',
                    width: '300px',
                    outline: 'none'
                }}
                onChange={handleSearchChange}
                value={searchTerm}
            />
            {/* Additional content or components */}
        </div>
    );
}

export default Page;