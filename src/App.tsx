import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthorListPage from './pages/AuthorListPage';
import AddEditAuthorPage from './pages/AddEditAuthorPage';
import BookListPage from './pages/BookListPage';
import AddEditBookPage from './pages/AddEditBookPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/authors/add" component={AddEditAuthorPage} />
        <Route path="/authors/:id/edit" component={AddEditAuthorPage} />
        <Route path="/authors" component={AuthorListPage} />
        <Route path="/books/add" component={AddEditBookPage} />
        <Route path="/books/:id/edit" component={AddEditBookPage} />
        <Route path="/books" component={BookListPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
};

export default App;
