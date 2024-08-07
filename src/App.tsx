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
        <Route path="/Authors/add" component={AddEditAuthorPage} />
        <Route path="/Authors/:id/edit" component={AddEditAuthorPage} />
        <Route path="/Authors" component={AuthorListPage} />
        <Route path="/Books/add" component={AddEditBookPage} />
        <Route path="/Books/:id/edit" component={AddEditBookPage} />
        <Route path="/Books" component={BookListPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
};

export default App;
