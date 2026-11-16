import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCompass,
  faFileLines,
  faHandHoldingHeart,
  faLandmark,
  faLightbulb,
  faPeopleGroup,
  faScaleBalanced,
  faScroll,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { getCategories, type Category } from "../../services/categoryService";
import { useGlobalLoading } from "../../context/LoadingContext";

const categoryIcons = [
  faLightbulb,
  faBook,
  faScroll,
  faFileLines,
  faScaleBalanced,
  faLandmark,
  faShieldHalved,
  faPeopleGroup,
  faHandHoldingHeart,
  faCompass,
];

export default function Explore() {

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { beginLoading } = useGlobalLoading();


  const loadCategories = useCallback(async () => {
    const endLoading = beginLoading();
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
      setError(
        "Unable to load Islamic topics."
      );
    } finally {
      setLoading(false);
      endLoading();
    }
  }, [beginLoading]);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  if (loading) {
    return (
      <div className="page">
        <h2>Loading topics...</h2>
      </div>
    );
  }


  if (error) {
    return (
      <div className="page">
        <h2>{error}</h2>
      </div>
    );
  }


  return (
    <div className="page">
      <div className="page-heading">
        <span className="section-label">
          EXPLORE
        </span>
        <h1>Learn about Islam</h1>
        <p>
          Discover Islamic knowledge through
          different topics.
        </p>
      </div>


      <div className="category-grid">
        {categories.map((category, index) => {
          const card = (
            <>
              <div className="category-icon">
                <FontAwesomeIcon icon={categoryIcons[index % categoryIcons.length]} aria-hidden="true" />
              </div>

              <h3>{category.name}</h3>

              <p>{category.description}</p>

              <span>View topic →</span>
            </>
          );

          return category.slug.toLowerCase() === "quran" ? (
            <a
              href="https://www.iftchennai.in/equran"
              className="category-card"
              key={category.id}
            >
              {card}
            </a>
          ) : (
            <Link
              to={`/topic/${category.slug}`}
              className="category-card"
              key={category.id}
            >
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}