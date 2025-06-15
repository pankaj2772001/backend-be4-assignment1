const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    publishedYear: {
      type: Number,
    },

    genre: [
      {
        type: String,
        enum: [
          "Fiction",
          "Non-fiction",
          "Mystery",
          "Thriller",
          "Science Fiction",
          "Fantasy",
          "Romance",
          "Historical",
          "Biography",
          "Self-help",
          "Other",
          "Business",
          "Autobiography",
        ],
      },
    ],

    language: {
      type: String,

      required: true,
    },

    country: {
      type: String,
      default: "United Status",
    },

    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },

    summary: {
      type: String,
    },

    coverImageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const Book = mongoose.model('Book', BookSchema)

module.exports = Book