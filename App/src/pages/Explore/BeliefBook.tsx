import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { getBeliefList, type BeliefBooks } from "../../services/categoryService";
import { useGlobalLoading } from "../../context/LoadingContext";
import { normalizeLineBreaks } from "../../utils/contentText";

export default function BeliefBook() {
  const { bookId } = useParams();
  const [book, setBook] = useState<BeliefBooks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { beginLoading } = useGlobalLoading();

  useEffect(() => {
    let active = true;
    const endLoading = beginLoading();

    async function loadBook() {
      try {
        const books = await getBeliefList();
        if (active) {
          setBook(books.find((item) => String(item.id) === bookId) ?? null);
        }
      } catch (loadError) {
        console.error(loadError);
        if (active) {
          setError("Unable to load this book.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
        endLoading();
      }
    }

    void loadBook();
    return () => {
      active = false;
      endLoading();
    };
  }, [bookId, beginLoading]);

  if (loading) {
    return <div className="page"><h2>Loading book...</h2></div>;
  }

  if (error || !book) {
    return (
      <div className="page">
        <h2>{error || "Book not found."}</h2>
        <Link to="/Explore/belief" className="text-link">Back to Belief</Link>
      </div>
    );
  }

  return (
    <div className="page belief-reading-page">
      <Link to="/Explore/belief" className="text-link">← Back to Belief</Link>
      <header className="belief-reading-header">
        <img src={book.imageURL} alt={`${book.book_name} book cover`} />
        <div>
          <span className="section-label">BELIEF</span>
          <h1>{book.book_name}</h1>
          <ReactMarkdown remarkPlugins={[remarkBreaks]}>
            {normalizeLineBreaks(book.description || "")}
          </ReactMarkdown>
        </div>
      </header>
      {book.content && (
        <article className="belief-reading-content">
          <ReactMarkdown remarkPlugins={[remarkBreaks]}>
            {normalizeLineBreaks(book.content)}
          </ReactMarkdown>
        </article>
      )}
    </div>
  );
}
