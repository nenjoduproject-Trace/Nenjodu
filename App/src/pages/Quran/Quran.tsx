export default function Quran() {
  return (
    <div className="page">

      <div className="page-heading">

        <span className="section-label">
          Quran
        </span>

        <h1>Quran</h1>

        <p>
          Read and explore the Quran.
        </p>

      </div>


      <div className="quran-search">

        <input
          type="text"
          placeholder="Search Surah..."
        />

        <button className="primary-btn">
          Search
        </button>

      </div>


      <div className="surah-grid">

        {[
          ["01", "Al-Fatihah", "الفاتحة"],
          ["02", "Al-Baqarah", "البقرة"],
          ["03", "Aal-E-Imran", "آل عمران"],
          ["04", "An-Nisa", "النساء"],
          ["05", "Al-Ma'idah", "المائدة"],
          ["06", "Al-An'am", "الأنعام"],
        ].map(([number, english, arabic]) => (

          <div className="surah-card" key={number}>

            <div className="surah-number">
              {number}
            </div>

            <div>
              <h3>{english}</h3>
              <span>{arabic}</span>
            </div>

            <span className="arrow">
              →
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}