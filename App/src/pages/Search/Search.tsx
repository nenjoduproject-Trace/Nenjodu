export default function Search() {
  return (
    <div className="page search-page">

      <div className="page-heading">

        <span className="section-label">
          Search
        </span>

        <h1>Search Islamic Knowledge</h1>

        <p>
          Search Quran, Hadith, topics and articles.
        </p>

      </div>


      <div className="large-search">

        <input
          type="text"
          placeholder="Search for Quran, Hadith, topic..."
        />

        <button>
          🔍 Search
        </button>

      </div>


      <div className="search-results">

        <h3>Popular Searches</h3>

        <div className="tags">

          <span>Prayer</span>
          <span>Ramadan</span>
          <span>Zakat</span>
          <span>Patience</span>
          <span>Parents</span>
          <span>Quran</span>

        </div>

      </div>

    </div>
  );
}