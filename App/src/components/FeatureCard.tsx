import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: IconDefinition;
  title: string;
  description: string;
  link: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  link,
}: FeatureCardProps) {
  return (
    <Link to={link} className="feature-card">
      <div className="feature-icon">
        <FontAwesomeIcon icon={icon} className="feature-item-icon" aria-hidden="true" />
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <span className="feature-card-action">Explore →</span>
    </Link>
  );
}