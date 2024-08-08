# Electronic Library Implementation

## Project Overview
Implement an electronic library with a list of books and authors using React. No backend is required. The minimal setup is an application that starts empty, with books stored in memory within the browser session.

## App Structure

### Book List Page
- **Filter books by author**
    - Dropdown list with single selection of available authors
    - Apply button: applies the filter with page refresh
- **Table of books sorted by title, with columns:**
    - ID
    - Title
    - Author(s)
    - Publication Year
    - Edit button: navigates to the book editing page
    - Delete button: deletes the book
- **Add button:** navigates to the book addition page

### Add/Edit Book Page
- **Title field**
- **Publication Year field**
- **Authors field:** multiple selection from available authors
- **Add/Save button**

### Author List Page
- **Table of authors sorted alphabetically, with columns:**
    - ID
    - Full Name
    - Number of Books
    - Edit button: navigates to the author editing page
    - Delete button: deletes the author
- **Add button:** navigates to the author addition page

### Add/Edit Author Page
- **Full Name field**
- **Add/Save button**

## Requirements
1. The app should be written in TypeScript.
2. A book can have multiple authors.
3. An author can have multiple books.
4. Different pages should have different URLs.
5. Use React Hook Form library with Yup validation for forms, all form fields are mandatory.
6. Using custom hooks is nice to have.
7. The idea is for the app to look production-ready, even with minimal styling.
8. After completing the test, provide a link to the git repository.
