import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import { getAll, update } from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    Books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  };

  componentDidMount() {
    getAll()
      .then(books => {
        this.setState({ Books: books });

        // filter book to different shelf
        const cReading = this.state.Books.filter(
          item => item.shelf === "currentlyReading"
        );
        const wtRead = this.state.Books.filter(
          item => item.shelf === "wantToRead"
        );
        const readMe = this.state.Books.filter(item => item.shelf === "read");

        // update state for different books
        this.setState({ currentlyReading: cReading });
        this.setState({ wantToRead: wtRead });
        this.setState({ read: readMe });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = (book, shelf) => {
    console.log(book, shelf);
    update(book, shelf).then(books => {
      this.setState({ currentlyReading: books.currentlyReading });
      this.setState({ wantToRead: books.wantToRead });
      this.setState({ read: books.read });
    });
  };
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.currentlyReading.length > 0
                        ? this.state.currentlyReading.map(item => (
                            <li key={item.id}>
                              <div className="book">
                                <div className="book-top">
                                  <div
                                    className="book-cover"
                                    style={{
                                      width: 128,
                                      height: 193,
                                      backgroundImage: `url("${item.imageLinks.smallThumbnail}")`
                                    }}
                                  ></div>
                                  <div className="book-shelf-changer">
                                    <select
                                      onChange={e =>
                                        this.handleChange(item, e.target.value)
                                      }
                                    >
                                      <option value="move">Move to...</option>
                                      <option value="currentlyReading">
                                        Currently Reading
                                      </option>
                                      <option value="wantToRead">
                                        Want to Read
                                      </option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{item.title}</div>
                                <div className="book-authors">
                                  {item.authors.map((author, index) => (
                                    <span key={index}>{author}</span>
                                  ))}
                                </div>
                              </div>
                            </li>
                          ))
                        : "Empty shelf"}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.wantToRead.length > 0
                        ? this.state.wantToRead.map(book => (
                            <li key={book.id}>
                              <div className="book">
                                <div className="book-top">
                                  <div
                                    className="book-cover"
                                    style={{
                                      width: 128,
                                      height: 193,
                                      backgroundImage: `url("${book.imageLinks.smallThumbnail}")`
                                    }}
                                  ></div>
                                  <div className="book-shelf-changer">
                                    <select
                                      onChange={e =>
                                        this.handleChange(book, e.target.value)
                                      }
                                    >
                                      <option value="move">Move to...</option>
                                      <option value="currentlyReading">
                                        Currently Reading
                                      </option>
                                      <option value="wantToRead">
                                        Want to Read
                                      </option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">
                                  {book.authors.map((author, index) => (
                                    <span key={index}>{author}</span>
                                  ))}
                                </div>
                              </div>
                            </li>
                          ))
                        : "Empty shelf"}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.read.length > 0
                        ? this.state.read.map((book, index) => (
                            <li key={index}>
                              <div className="book">
                                <div className="book-top">
                                  <div
                                    className="book-cover"
                                    style={{
                                      width: 128,
                                      height: 192,
                                      backgroundImage: `url("${book.imageLinks.smallThumbnail}")`
                                    }}
                                  ></div>
                                  <div className="book-shelf-changer">
                                    <select
                                      onChange={e =>
                                        this.handleChange(book, e.target.value)
                                      }
                                    >
                                      <option value="move">Move to...</option>
                                      <option value="currentlyReading">
                                        Currently Reading
                                      </option>
                                      <option value="wantToRead">
                                        Want to Read
                                      </option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">
                                  {book.authors.map((author, index) => (
                                    <span key={index}>{author}</span>
                                  ))}
                                </div>
                              </div>
                            </li>
                          ))
                        : "Empty shelf"}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
