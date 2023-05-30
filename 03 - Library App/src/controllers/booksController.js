import Book from '../models/book.js';

const booksController = {
    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `index.hbs` with all
            books currently stored in the database.
    */
    getIndex: function(req, res) {
        // your code here
        Book.find({}).lean().exec().then(results => {
            const books = results;
            res.render('index', {
                books: books
            });
        })
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getISBN`. This function checks if a
            specific ISBN is stored in the database. If the number
            is stored in the database, it returns an object with the
            ISBN, otherwise, it returns an empty string.
    */
    getCheckISBN: function(req, res) {
        // your code here
        const isbn = req.query.isbn;
        Book.findOne({isbn: isbn}).lean().exec().then(result => {
            if (result == null) {
                res.json('');
            } else {
                res.json(result);
            }
        });

    },

    /*
    TODO:   This function is executed when the client sends an HTTP POST
            request to path `/book`. This function adds the book
            sent by the client to the database, then appends the new
            book to the list of books, as displayed in `index.hbs`.
    */
    postBook: function(req, res) {
        // your code here

        Book.create(req.body);
        req.body.layout = false;
        console.log(req.body);
        res.render('partials/card', req.body);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP DELETE
            request to path `/book`. This function deletes the book
            from the database, then removes the book from the list of
            books, as displayed in `index.hbs`.
    */
    deleteBook: function (req, res) {
        const isbn = req.query.isbn;
        Book.deleteOne({isbn: isbn})
        .then(() => {
          console.log(`Deleted ${isbn}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
}

export default booksController;