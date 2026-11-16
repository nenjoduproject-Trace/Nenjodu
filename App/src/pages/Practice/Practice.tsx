import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faHandHoldingHeart,
  faHandsPraying,
  faBatteryEmpty,
  faGlassWater,
  faPersonPraying,
  faMosque,
  faHandsBubbles,
  faBookJournalWhills,
} from "@fortawesome/free-solid-svg-icons";

export default function Practice() {
  const items = [
    { icon: faBookJournalWhills, title: "Kalimas", description: "The Six Kalimas are six foundational Islamic phrases and declarations of faith" },
    { icon: faPersonPraying, title: "Namaz(Thozhukai)", description: "Learn about the five daily prayers" },
    { icon: faHandsBubbles, title: "Purification", description: "Wudu and purification" },
    { icon: faGlassWater, title: "Fasting", description: "Guidance for fasting and Ramadan" },
    { icon: faHandHoldingHeart, title: "Mandatory Charity(Tharmam)", description: "Learn about Zakat and charity" },
    { icon: faHandsPraying, title: "Supplication to God (Dua)", description: "Daily supplications and remembrance" },
    { icon: faMosque, title: "Masjidh", description: "Conducting dignity at a place of worship" },
    { icon: faBatteryEmpty, title: "Funeral(Janaza)", description: "Islamic manners and ethics" },
  ];

  return (
    <div className="page">

      <div className="page-heading">

        <span className="section-label">
          Islam in Practice
        </span>

        <h1>Islam in Practice</h1>

        <p>
          Practical guidance for everyday Muslim life.
        </p>

      </div>


      <div className="practice-grid">

        {items.map(({ icon, title, description }) => {
          const card = (
            <>
              <div className="practice-icon">
                <FontAwesomeIcon icon={icon} aria-hidden="true" />
              </div>

              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>

              <span>→</span>
            </>
          );

          return title === "Purification" ? (
            <Link to="/Practice/purification" className="practice-card" key={title}>
              {card}
            </Link>
          ) : title === "Namaz(Thozhukai)" ? (
            <Link to="/Practice/salah" className="practice-card" key={title}>
              {card}
            </Link>
          ) : title === "Funeral(Janaza)" ? (
            <Link to="/Practice/janaza" className="practice-card" key={title}>
              {card}
            </Link>
          ) : title === "Fasting" ? (
            <Link to="/Practice/fasting" className="practice-card" key={title}>
              {card}
            </Link>
          ) : title === "Masjidh" ? (
            <Link to="/Practice/masjidh" className="practice-card" key={title}>
              {card}
            </Link>
          ) : title === "Mandatory Charity(Tharmam)" ? (
            <Link to="/Practice/zakat" className="practice-card" key={title}>
              {card}
            </Link>
          ) : title === "Kalimas" ? (
            <Link to="/Practice/kalimah" className="practice-card" key={title}>
              {card}
            </Link>
          ) : title === "Supplication to God (Dua)" ? (
            <Link to="/Practice/dua" className="practice-card" key={title}>
              {card}
            </Link>
          ) : (
            <div className="practice-card" key={title}>
              {card}
            </div>
          );
        })}

      </div>

    </div>
  );
}