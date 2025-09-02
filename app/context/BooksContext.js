import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BooksContext = createContext();

export const useBooks = () => {
  const ctx = useContext(BooksContext);
  if (!ctx) throw new Error("useBooks must be used within a BooksProvider");
  return ctx;
};

const STORAGE_KEY = "@books_v1";

const initialBooks = [];

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState(initialBooks);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setBooks(parsed);
          }
        }
      } catch (e) {
        console.warn("Failed to load books from storage:", e);
      } finally {
        setLoaded(true);
      }
    };
    load();
  }, []);
  

  useEffect(() => {
    if (!loaded) return;
    const save = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(books));
      } catch (e) {
        console.warn("Failed to save books to storage:", e);
      }
    };
    save();
  }, [books, loaded]);

  const addBook = ({ title, author, year, description }) => {
    const id = String(Date.now());
    const newBook = { id, title, author, year, description };
    setBooks((prev) => [newBook, ...prev]);
    return id;
  };

//   const updateBook = (id, updates) => {
//     setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
//   };
const updateBook = (id, updates) => {
  const allEmpty = Object.values(updates).every(v => !v || v === "");
  if (allEmpty) {
    deleteBook(id);
    return;
  }

  setBooks((prev) =>
    prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
  );
};

  const deleteBook = (id) => {
    setBooks((prevbooks) => prevbooks.filter((b) => b.id !== id));
  };

  const getBookById = (id) => books.find((b) => b.id === id);

  const value = useMemo(
    () => ({
      books,
      addBook,
      updateBook,
      deleteBook,
      getBookById,
      loaded,
    }),
    [books, loaded]
  );


  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
};