import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { useGlobalLoading } from "../../context/LoadingContext";
import { getBeliefList, type BeliefBooks } from "../../services/categoryService";
import { normalizeLineBreaks } from "../../utils/contentText";

function getSelectedLanguage() {
  const translationCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("googtrans="));

  return translationCookie?.split("/").filter(Boolean).at(-1) ?? "ta";
}

export default function Belief() {
    const [selectedLanguage, setSelectedLanguage] = useState(getSelectedLanguage);
    const [beliefList, setBeliefList] = useState<BeliefBooks[]>([]);
    const [selectedBook, setSelectedBook] = useState<BeliefBooks | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { beginLoading } = useGlobalLoading();
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const loadBeliefList = useCallback(async () => {
        const endLoading = beginLoading();
        try {
          const data = await getBeliefList();
          setBeliefList(data);
          console.log('beliefList');
          console.log(data);
        } catch (error) {
          console.error(error);
          setError("Unable to load belief books.");
        } finally {
          setLoading(false);
          endLoading();
        }
      }, [beginLoading]);

  useEffect(() => {
    if (!selectedBook) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedBook(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedBook]);

  useEffect(() => {
    void loadBeliefList();
    const updateLanguage = (event: Event) => {
      const languageCode =
        event instanceof CustomEvent && typeof event.detail === "string"
          ? event.detail
          : getSelectedLanguage();
      setSelectedLanguage(languageCode);
    };

    window.addEventListener("app-language-change", updateLanguage);
    return () => window.removeEventListener("app-language-change", updateLanguage);
  }, [loadBeliefList]);

  return (
    <div className="page purification-page article-page belief-page">
      <div className="purification-heading">
        <div className="page-heading">
          <span className="section-label">Belief</span>
          <h1>Islamic Belief</h1>
          <p>Discover the fundamental beliefs that this books reveals regarding the practice of Islam.</p>
        </div>
      </div>

      <div className="belief-book-grid">
        {loading ? (
          <p role="status">Loading books...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : beliefList.map((book) => (
          <button
	        type="button"
            className="belief-book-card"
	        aria-label={`View details for ${book.book_name}`}
            key={book.id}
	        onClick={() => setSelectedBook(book)}
          >
	        <img src={book.imageURL} alt={`${book.book_name} book cover`} />
	        <span>
            {selectedLanguage === "ta" && book.book_name === "Ondre kulam Oruvaney Dhevan"
                ? "ஒன்றே குலம் ஒருவனே தேவன்"
                : `${book.book_name}`}
            </span>
          </button>
        ))}
      </div>

      {selectedBook && (
        <div
          className="belief-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedBook(null);
            }
          }}
        >
          <section
            className="belief-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="belief-modal-title"
          >
            <header className="belief-modal-header">
                <h2 id="belief-modal-title">
                    {selectedLanguage === "ta" && selectedBook.book_name === "Ondre kulam Oruvaney Dhevan"
                        ? "ஒன்றே குலம் ஒருவனே தேவன்"
                        : `${selectedBook.book_name}`}
                </h2>
              <button
                ref={closeButtonRef}
                type="button"
                className="belief-modal-close"
                aria-label="Close book details"
                onClick={() => setSelectedBook(null)}>×</button>
            </header>
            <div className="belief-modal-content">
              <div className="belief-modal-book">
                <img
                  src={selectedBook.imageURL}
                  alt={`${selectedBook.book_name} book cover`}
                />
              </div>
              <div className="belief-modal-description">
                <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                  {normalizeLineBreaks(selectedBook.description || "")}
                </ReactMarkdown>
                <Link
                  className="belief-read-link"
                  to={`/belief/book/${selectedBook.id}`}
                  onClick={() => setSelectedBook(null)}
                >
                  <FontAwesomeIcon icon={faHandPointRight} aria-hidden="true" />
                  <span>Click here to read the book.</span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
