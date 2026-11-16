import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCategories, type Category } from "../../services/categoryService";
import { useGlobalLoading } from "../../context/LoadingContext";
import Article from "./Article";
import Belief from "./Belief";

export default function Topic() {
  const { slug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { beginLoading } = useGlobalLoading();

  useEffect(() => {
    const endLoading = beginLoading();
    async function loadTopic() {
      try {
        const categories = await getCategories();
        setCategory(categories.find((item) => item.slug === slug) ?? null);
      } catch (loadError) {
        console.error(loadError);
        setError("Unable to load this topic.");
      } finally {
        setLoading(false);
        endLoading();
      }
    }

    void loadTopic();
  }, [slug, beginLoading]);

  if (loading) {
    return <div className="page"><h2>Loading topic...</h2></div>;
  }

  if (error) {
    return <div className="page"><h2>{error}</h2></div>;
  }

  if (!category) {
    return (
      <div className="page">
        <h2>Topic not found.</h2>
        <Link to="/explore">Back to Explore</Link>
      </div>
    );
  }

  return category.slug === "aqeedah" ? (
      <Belief />
    ) : category.slug === "islamic-ethics" ? (
      <Article />
    ) : (
      <div className="page">
        <div className="page-heading">
          <span className="section-label">EXPLORE</span>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
        <Link to="/explore" className="text-link">← Back to Explore</Link>
      </div>
    );
}
