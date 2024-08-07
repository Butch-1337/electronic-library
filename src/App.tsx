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
        {/* Author Routes */}
        <Route path="/Authors/Add" exact component={AddEditAuthorPage} />
        <Route path="/Authors/Edit/:id" exact component={AddEditAuthorPage} />
        <Route path="/Authors" exact component={AuthorListPage} />

        {/* Book Routes */}
        <Route path="/Books/Add" exact component={AddEditBookPage} />
        <Route path="/Books/Edit/:id" exact component={AddEditBookPage} />
        <Route path="/Books" exact component={BookListPage} />

        {/* Home Page */}
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
};

export default App;
