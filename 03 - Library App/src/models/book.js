import { Schema, model, SchemaTypes} from "mongoose";

/*
    TODO:   Complete the bookSchema which will contain the title, author, and ISBN of a book in the database.
*/
const bookSchema = new Schema({
    title: String,
    author: String,
    isbn: Number
});

const Book = model('book', bookSchema);

export default Book;