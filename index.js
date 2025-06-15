const {initializeData} = require('./db/db.connect')

initializeData()

const Book = require("./models/books.model");

const express = require("express");

const app = express();

app.use(express.json());

async function createBook(newBook) {
  try {
    const book = new Book(newBook);

    const saveData = await book.save();

    return saveData;
  } catch (error) {
    console.log("Failed to add new book.", error);
  }
}

app.post("/books", async (req, res) => {
  try {
    const book = await createBook(req.body);

    if (!book) {
      res.status(404).json({ error: "Failed to add new book." });
    } else {
      res.status(201).json({ message: "Book added successfully.", book: book });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add new book." });
  }
});

async function readAllBooks() {
  try {
    const allBooks = await Book.find();

    return allBooks;
  } catch (error) {
    console.log("Failed to fetch data", error);
  }
}

app.get("/books", async (req, res) => {
  try {
    const allBooks = await readAllBooks();
    res.json(allBooks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

async function readBooksByTitle(bookTitle) {
  try {
    const bookByTitle = await Book.findOne({ title: bookTitle });

    return bookByTitle;
  } catch (error) {
    console.log("Failed to fetch book by title.", error);
  }
}

app.get("/books/:bookTitle", async (req, res) => {
  try {
    const bookByTitle = await readBooksByTitle(req.params.bookTitle);

    if (!bookByTitle) {
      res.status(404).json({ error: "Book not found." });
    } else {
      res.json(bookByTitle);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books data" });
  }
});

async function readBookByAuthor(bookAuthor) {
  try {
    const bookByAuthor = await Book.find({ author: bookAuthor });

    return bookByAuthor;
  } catch (error) {
    console.log("Failed to fetch data", error);
  }
}

app.get("/books/author/:authorName", async (req, res) => {
  try {
    const book = await readBookByAuthor(req.params.authorName);

    if (book.length > 0) {
      res.json(book);
    } else {
      res.status(404).json({ error: "book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to fetch books." });
  }
});

async function readBooksByGenre(bookGenre) {
  try {
    const bookByGenre = await Book.find({ genre: bookGenre });

    return bookByGenre;
  } catch (error) {
    console.log("Failed to fetch books", error);
  }
}

app.get("/books/genre/:bookGenre", async (req, res) => {
  try {
    const book = await readBooksByGenre(req.params.bookGenre);

    if (book.length > 0) {
      res.json(book);
    } else {
      res.status(404).json({ error: "book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

async function readBookByYear(bookYear) {
  try {
    const bookByReleasedYear = await Book.find({ publishedYear: bookYear });

    return bookByReleasedYear;
  } catch (error) {
    console.log("Failed to fetch the books", error);
  }
}

app.get("/books/releasedYear/:bookYear", async (req, res) => {
  try {
    const book = await readBookByYear(req.params.bookYear);

    if (book.length > 0) {
      res.json(book);
    } else {
      res.status(404).json({ error: "book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the books data." });
  }
});

async function updateBookById(bookId, dataToUpdate) {
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
      runValidators: true,
    });

    return updatedBook;
  } catch (error) {
    console.log("Failed to fetch the data.", error);
  }
}

app.post("/books/:bookId", async (req, res) => {
  try {
    const book = await updateBookById(req.params.bookId, req.body);

    if (!book) {
      res.status(404).json({ error: "book not found id." });
    } else {
      res
        .status(200)
        .json({ message: "book updated successfully", updatedBook: book });
    }
  } catch (error) {}
});

async function updateBookByTitle(bookTitle, dataToUpdate) {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title: bookTitle },
      dataToUpdate,
      { new: true, runValidators: true }
    );

    return updatedBook;
  } catch (error) {
    console.log("Failed to fetch book", error);
  }
}

app.post("/books/title/:bookTitle", async (req, res) => {
  try {
    const book = await updateBookByTitle(req.params.bookTitle, req.body);

    if (!book) {
      res.status(404).json({ error: "book not found." });
    } else {
      res
        .status(200)
        .json({ message: "Book updated successfully.", updatedBook: book });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update books." });
  }
});

async function deleteBook(bookId) {
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);

    return deletedBook;
  } catch (error) {
    console.log("failed to delete book", error);
  }
}

app.delete("/books/:bookId", async (req, res) => {
  try {
    const deletedBook = await deleteBook(req.params.bookId);

    if (!deletedBook) {
      res.status(404).json({ error: "book not found." });
    } else {
      res.status(200).json({ message: "Book deleted successfully." });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to delete book." });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
