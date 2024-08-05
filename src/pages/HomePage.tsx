import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Electronic Library</h1>
      <div>
        <Link to="/books">View Books</Link>
      </div>
      <div>
        <Link to="/authors">View Authors</Link>
      </div>
    </div>
  );
};

export default HomePage;
