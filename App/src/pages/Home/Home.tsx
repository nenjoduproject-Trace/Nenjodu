import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getGeneralDoubts, type GeneralDoubt } from "../../services/dashboardService";
import { translateQuestionForDisplay } from "../../services/askService";

function getSelectedLanguage() {
  const translationCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("googtrans="));

  return translationCookie?.split("/").filter(Boolean).at(-1) ?? "en";
}

const knowledgeVideos = [
  {
    id: "RJDRSD7-gm2",
    url: "https://youtu.be/vjCJGqZPD4c?si=Be_WFcuBRRXlt6Jb",
  },
  {
    id: "RJDRSD7-gm1",
    url: "https://youtu.be/S6nxdLO0ido?si=jgP5-wFxtD8DJfBC",
  },
  {
    id: "RJDRSD7-gm0",
    url: "https://youtu.be/RJDRSD7-gm0?si=arnixdxx2tUkRGNc",
  },
  {
    id: "sTeCLi3ymCU",
    url: "https://youtu.be/sTeCLi3ymCU?si=afa-MfSKNfAsYEMk",
  },
  {
    id: "FI3Wa3JEw7c",
    url: "https://youtu.be/FI3Wa3JEw7c?si=U1UBvtKMlBVDuRuS",
  },
  {
    id: "ONfFRp-V0Y0",
    url: "https://youtu.be/ONfFRp-V0Y0?si=PJqJxGRgvyjD6x9J",
  },
  {
    id: "NbN2QWcr-TU",
    url: "https://youtu.be/NbN2QWcr-TU?si=0rXSviwZEQsA1rS3",
  },
  {
    id: "uqRnM63DHq4",
    url: "https://youtu.be/uqRnM63DHq4?si=NGivye_uUnwOCpxD",
  },
  {
    id: "cCSRnSu7ML8",
    url: "https://youtu.be/cCSRnSu7ML8?si=tRCVINRwPPokJOOB",
  },
];

const answerTranslationLength = 100;

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [generalDoubts, setGeneralDoubts] = useState<GeneralDoubt[]>([]);
  const [displayDoubts, setDisplayDoubts] = useState<GeneralDoubt[]>([]);
  const [rotationIndex, setRotationIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(getSelectedLanguage);
  const [generalDoubtsLoading, setGeneralDoubtsLoading] = useState(true);
  const [translationLoading, setTranslationLoading] = useState(false);
  const [generalDoubtsError, setGeneralDoubtsError] = useState("");
  const [translationError, setTranslationError] = useState("");
  const videoCarouselRef = useRef<HTMLDivElement>(null);

  const promoSlides = [
    { eyebrow: "TODAY'S KNOWLEDGE", title: "Read the Quran every day", action: "Read now", link: "/quran", tone: "promo-green" },
    { eyebrow: "ASK WITH CONFIDENCE", title: "Find clarity in your questions", action: "Ask Islam", link: "/ask", tone: "promo-blue" },
    { eyebrow: "PRACTICAL GUIDANCE", title: "Turn faith into everyday action", action: "Explore now", link: "/practice", tone: "promo-amber" },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % promoSlides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [promoSlides.length]);

  useEffect(() => {
    let active = true;

    getGeneralDoubts()
      .then((data) => {
        if (active) setGeneralDoubts(data);
      })
      .catch((error: unknown) => {
        console.error(error);
        if (active) {
          setGeneralDoubtsError("Unable to load essential questions and facts.");
        }
      })
      .finally(() => {
        if (active) setGeneralDoubtsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const updateLanguage = (event: Event) => {
      const languageCode =
        event instanceof CustomEvent && typeof event.detail === "string"
          ? event.detail
          : getSelectedLanguage();
      setSelectedLanguage(languageCode);
    };

    window.addEventListener("app-language-change", updateLanguage);
    return () => window.removeEventListener("app-language-change", updateLanguage);
  }, []);

  useEffect(() => {
    if (generalDoubtsLoading || generalDoubtsError) return;

    let active = true;

    const translateDoubts = async () => {
      setTranslationLoading(true);
      setTranslationError("");

      try {
        if (selectedLanguage === "ta") {
          setDisplayDoubts(generalDoubts);
          return;
        }

        const translatedDoubts = await Promise.all(
          generalDoubts.map(async (doubt) => {
            const [translatedQuestion, translatedAnswer] = await Promise.all([
              translateQuestionForDisplay(doubt.doubts, selectedLanguage, "ta"),
              translateQuestionForDisplay(
                doubt.answer.slice(0, answerTranslationLength),
                selectedLanguage,
                "ta",
              ),
            ]);

            return {
              ...doubt,
              doubts: translatedQuestion,
              answer: translatedAnswer,
            };
          }),
        );

        if (active) setDisplayDoubts(translatedDoubts);
      } catch (error: unknown) {
        console.error(error);
        if (active) {
          setTranslationError("Unable to translate essential questions and facts.");
        }
      } finally {
        if (active) setTranslationLoading(false);
      }
    };

    void translateDoubts();

    return () => {
      active = false;
    };
  }, [generalDoubts, generalDoubtsError, generalDoubtsLoading, selectedLanguage]);

  useEffect(() => {
    if (displayDoubts.length <= 2) return;

    const timer = window.setInterval(() => {
      setRotationIndex((current) => (current + 2) % displayDoubts.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [displayDoubts.length]);

  const visibleDoubts = Array.from(
    { length: Math.min(2, displayDoubts.length) },
    (_, index) => displayDoubts[(rotationIndex + index) % displayDoubts.length],
  );

  const scrollVideos = (direction: -1 | 1) => {
    const carousel = videoCarouselRef.current;
    const firstCard = carousel?.querySelector<HTMLElement>(".knowledge-video-card");

    if (!carousel || !firstCard) return;

    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap) || 0;
    carousel.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const carousel = videoCarouselRef.current;
    if (!carousel) return;

    const advanceCarousel = () => {
      const firstSet = carousel.querySelector<HTMLElement>(".knowledge-video-set");
      const firstCard = carousel.querySelector<HTMLElement>(".knowledge-video-card");
      if (!firstSet || !firstCard) return;

      const gap = Number.parseFloat(window.getComputedStyle(firstSet).columnGap) || 0;
      carousel.scrollBy({
        left: firstCard.offsetWidth + gap,
        behavior: "smooth",
      });
    };

    const handleScroll = () => {
      const firstSet = carousel.querySelector<HTMLElement>(".knowledge-video-set");
      if (!firstSet) return;

      const loopDistance = firstSet.offsetWidth + (Number.parseFloat(window.getComputedStyle(carousel).columnGap) || 0);
      if (carousel.scrollLeft >= loopDistance) {
        carousel.scrollLeft -= loopDistance;
      }
    };

    const timer = window.setInterval(advanceCarousel, 3000);
    carousel.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearInterval(timer);
      carousel.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="home-page">

      {/* Promo Slider */}
      <section className="mobile-promo" aria-label="Featured content">
        <div className="promo-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {promoSlides.map((slide) => (
            <Link to={slide.link} className={`promo-slide ${slide.tone}`} key={slide.title}>
              <span>{slide.eyebrow}</span>
              <strong>{slide.title}</strong>
              <small>{slide.action} <b>→</b></small>
            </Link>
          ))}
        </div>
        <div className="promo-dots" aria-hidden="true">
          {promoSlides.map((slide, index) => (
            <span className={index === activeSlide ? "active" : ""} key={slide.tone} />
          ))}
        </div>
      </section>


      {/* Islamic knowledge videos */}
      <section className="section knowledge-section">
        <div className="section-header">
          <div>
            <span className="section-label">
              QUICK ACCESS
            </span>
            <h2>
              Improve Islamic knowledge
            </h2>
          </div>
          <div className="knowledge-carousel-controls" aria-label="Video carousel controls">
            <button type="button" onClick={() => scrollVideos(-1)} aria-label="Previous videos">
              ←
            </button>
            <button type="button" onClick={() => scrollVideos(1)} aria-label="Next videos">
              →
            </button>
          </div>
        </div>

        <div className="knowledge-video-carousel" ref={videoCarouselRef} aria-label="Islamic knowledge videos">
          {[0, 1].map((setIndex) => (
            <div className="knowledge-video-set" key={setIndex} aria-hidden={setIndex === 1}>
              {knowledgeVideos.map((video, index) => (
                <a
                  className="knowledge-video-card"
                  href={video.url}
                  key={video.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={setIndex === 1 ? -1 : undefined}
                  aria-label={setIndex === 0 ? `Watch Islamic knowledge video ${index + 1} on YouTube` : undefined}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={setIndex === 0 ? `Islamic knowledge video ${index + 1}` : ""}
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </section>


      <section className="daily-doubts-section">
        <h2>Essential Questions and Facts</h2>
        <div className="daily-doubts-grid">
          {generalDoubtsError || translationError ? (
            <p role="alert">{generalDoubtsError || translationError}</p>
          ) : generalDoubtsLoading || translationLoading ? (
            <p>Loading essential questions and facts...</p>
          ) : visibleDoubts.length > 0 ? (
            visibleDoubts.map((doubt, index) => (
              <div
                className={`daily-doubt-card daily-doubt-card--${index === 0 ? "purple" : "green"}${displayDoubts.length > 2 ? " daily-doubt-card--rotating" : ""}`}
                key={`${doubt.id}-${rotationIndex}`}
              >
                <span>General Info</span>
                <h3>{doubt.doubts}</h3>
                <p>{doubt.answer.slice(0, 30)}...</p>
                <Link to="/explore" className="essential-btn">
                  Start Exploring →
                </Link>
              </div>
            ))
          ) : (
            <p>No essential questions and facts are available.</p>
          )}
        </div>
      </section>

      {/* Hero */}
      {/* <section className="hero">
        <div className="hero-content">
          <h1>
            Explore Islam.
            <br />
            Learn. Understand. Practice.
          </h1>
          <p>
            A simple platform to explore authentic Islamic knowledge, ask questions and practice Islam in everyday life.
          </p>
          <div className="hero-buttons">
            <Link to="/explore" className="primary-btn">
              Explore Islam
            </Link>
            <Link to="/ask" className="secondary-btn">
              Ask a Question
            </Link>
          </div>
        </div>
        <div className="hero-decoration">
          ☪
        </div>
      </section> */}

    </div>
  );
}