import RootLayout from '../app/layout';
import React, {useState } from 'react';
import styles from '../styles/Search.module.css'



const Search = () => {

  const [search, setSearch] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearch(event.target.value); 
  }
 

    
  return (
    <RootLayout>
      <div>Search</div>
      <div className={styles.searchInput}>
      <input 
            type="text"
            id="header-search"
            placeholder="Search blog posts"
            name="s" 
            defaultValue= {search}
            onChange={handleChange}
            
        />
        </div>
    </RootLayout>
  )
}

export default Search;