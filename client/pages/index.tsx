import { useState, useEffect } from 'react';

const Page = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, []);


    const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
        // You can perform search-related actions here
    };

    return (
        <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
            <h1>Course Swap</h1>
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
            {token}
        </div>
    );
}

export default Page;