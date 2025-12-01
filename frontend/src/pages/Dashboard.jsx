import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderAssets from "../components/HeaderAssets";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  // Fetch user + books from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Adjust API endpoints as per your backend routes
        const userRes = await fetch("http://localhost:5000/api/user/me", {
          credentials: "include",
        });
        const bookRes = await fetch("http://localhost:5000/api/books/user", {
          credentials: "include",
        });

        const userData = await userRes.json();
        const bookData = await bookRes.json();

        setUser(userData);
        setBooks(bookData);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <HeaderAssets />

      <div className="container my-5">
        {/* Welcome Section */}
        <div className="text-center mb-4">
          <h2>
            Welcome, {user?.firstname || "User"} 👋
          </h2>
          <p className="text-muted">
            Manage your books or explore what others are selling.
          </p>
        </div>

        {/* Add Book Button */}
        <div className="d-flex justify-content-center mb-4">
          <Link to="/books/add" className="btn btn-primary btn-lg">
            + Add New Book
          </Link>
        </div>

        {/* Books List */}
        <div className="container mt-4">
          <div className="row">

            {books.length === 0 && (
              <p className="text-center text-secondary">
                No books found. Add your first one!
              </p>
            )}

            {books.map((book) => (
              <div className="col-md-4 mb-4" key={book._id}>
                <div className="card shadow-sm h-100">

                  <img
                    src={book.image}
                    className="img-fluid rounded"
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                    alt={book.title}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>

                    <p className="card-text text-muted">
                      {book.description.substring(0, 80)}...
                    </p>

                    <Link
                      to={`/books/details/${book._id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}
