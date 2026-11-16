import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookAtlas, faCheck, faGlobe, faMagnifyingGlass, faMoon, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import { useGlobalLoading } from "../context/LoadingContext";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          elementId: string,
        ) => unknown;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const languages = [
  { code: "en", label: "English" },
  { code: "ta", label: "Tamil" },
  { code: "ml", label: "Malayalam" },
  { code: "te", label: "Telugu" },
  { code: "kn", label: "Kannada" },
  { code: "hi", label: "Hindi" },
];

function getSavedLanguage() {
  const translationCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("googtrans="));
  const languageCode = translationCookie?.split("=")[1]?.split("/").filter(Boolean).at(-1);

  return languages.find(({ code }) => code === languageCode)?.code ?? "en";
}

function notifyLanguageChange(languageCode: string) {
  window.dispatchEvent(
    new CustomEvent("app-language-change", { detail: languageCode }),
  );
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { showLoadingFor } = useGlobalLoading();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [translatorStatus, setTranslatorStatus] = useState<"loading" | "ready" | "error">("loading");
  const [selectedLanguage, setSelectedLanguage] = useState(getSavedLanguage);
  const languageControlRef = useRef<HTMLDivElement>(null);
  const initialTranslationText = useRef<string | null>(null);

  useEffect(() => {
    if (!document.documentElement.classList.contains("translation-pending")) {
      return;
    }

    const root = document.getElementById("root");
    if (!root) {
      return;
    }

    const releaseLoader = () => {
      document.documentElement.classList.remove("translation-pending");
      delete document.documentElement.dataset.pendingLanguage;
      document.getElementById("translation-preloader")?.remove();
    };

    if (translatorStatus === "error") {
      releaseLoader();
      return;
    }

    initialTranslationText.current ??= root.textContent ?? "";
    const initialText = initialTranslationText.current;
    const languageScripts: Record<string, RegExp> = {
      ta: /[\u0B80-\u0BFF]/,
      ml: /[\u0D00-\u0D7F]/,
      te: /[\u0C00-\u0C7F]/,
      kn: /[\u0C80-\u0CFF]/,
      hi: /[\u0900-\u097F]/,
    };
    const expectedScript = languageScripts[selectedLanguage];
    let settleTimer: number | undefined;
    let fallbackTimer: number | undefined;
    const checkTranslation = () => {
      const text = root.textContent ?? "";
      const hasGoogleTranslatedClass =
        document.documentElement.classList.contains("translated-ltr") ||
        document.documentElement.classList.contains("translated-rtl") ||
        document.body.classList.contains("translated-ltr") ||
        document.body.classList.contains("translated-rtl");

      if (
        !hasGoogleTranslatedClass ||
        text === initialText ||
        !expectedScript?.test(text)
      ) {
        window.clearTimeout(settleTimer);
        return;
      }

      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        observer.disconnect();
        window.clearTimeout(fallbackTimer);
        releaseLoader();
      }, 500);
    };
    const observer = new MutationObserver(checkTranslation);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    fallbackTimer = window.setTimeout(() => {
      observer.disconnect();
      window.clearTimeout(settleTimer);
      console.error("The selected page language was not applied in time.");
      releaseLoader();
    }, 30000);
    checkTranslation();

    return () => {
      observer.disconnect();
      window.clearTimeout(settleTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [selectedLanguage, translatorStatus]);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      const TranslateElement = window.google?.translate?.TranslateElement;
      if (!TranslateElement) {
        setTranslatorStatus("error");
        return;
      }

      try {
        new TranslateElement(
          { pageLanguage: "en", includedLanguages: "en,ta,ml,te,kn,hi", autoDisplay: false },
          "google_translate_element",
        );
        setTranslatorStatus("ready");
      } catch (error) {
        console.error("Google Translate could not be initialized.", error);
        setTranslatorStatus("error");
      }
    };

    const existingScript = document.getElementById("google-translate-script") as HTMLScriptElement | null;
    if (existingScript) {
      if (window.google?.translate?.TranslateElement) {
        window.googleTranslateElementInit();
      }
      existingScript.addEventListener("error", () => setTranslatorStatus("error"), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => setTranslatorStatus("error");
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isLanguageMenuOpen) return;

    const closeMenuOnOutsideClick = (event: MouseEvent) => {
      if (!languageControlRef.current?.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };
    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLanguageMenuOpen(false);
    };

    document.addEventListener("mousedown", closeMenuOnOutsideClick);
    document.addEventListener("keydown", closeMenuOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenuOnOutsideClick);
      document.removeEventListener("keydown", closeMenuOnEscape);
    };
  }, [isLanguageMenuOpen]);

  const selectLanguage = (languageCode: string) => {
    if (languageCode === "en") {
      document.cookie = "googtrans=/en/en; path=/; max-age=31536000";
      showLoadingFor();
      window.location.reload();
      return;
    }

    const translateSelect = document.querySelector<HTMLSelectElement>(
      "#google_translate_element select.goog-te-combo",
    );
    if (!translateSelect) {
      setTranslatorStatus("error");
      return;
    }

    showLoadingFor();
    translateSelect.value = languageCode;
    translateSelect.dispatchEvent(new Event("change", { bubbles: true }));
    setSelectedLanguage(languageCode);
    setIsLanguageMenuOpen(false);
    notifyLanguageChange(languageCode);
  };

  return (
    <header className="header">

      <div className="logo-area">
        <div className="logo-icon" aria-hidden="true"><FontAwesomeIcon icon={faBookAtlas} /></div>

        <div>
          <h2>GuideMe Pro</h2>
          <span>Learn • Ask • Practice</span>
        </div>
      </div>

      <nav className="desktop-nav">

        <Link to="/search" className="header-icon-button" aria-label="Search" title="Search">
          <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
        </Link>

        <button
          type="button"
          className="theme-toggle"
          onClick={() => {
            showLoadingFor();
            toggleTheme();
          }}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} aria-hidden="true" />
        </button>

        <div className="language-control notranslate" translate="no" ref={languageControlRef}>
          <button
            type="button"
            className="language-icon"
            aria-label="Choose language"
            aria-haspopup="menu"
            aria-expanded={isLanguageMenuOpen}
            onClick={() => setIsLanguageMenuOpen((isOpen) => !isOpen)}
          >
            <FontAwesomeIcon icon={faGlobe} />
          </button>
          {isLanguageMenuOpen && (
            <div className="language-menu" role="menu" aria-label="Choose language">
              {translatorStatus === "loading" && (
                <p className="language-status" role="status">Loading languages...</p>
              )}
              {translatorStatus === "error" && (
                <p className="language-status" role="status">Google Translate is unavailable.</p>
              )}
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  role="menuitem"
                  className={selectedLanguage === code ? "selected" : ""}
                  disabled={translatorStatus !== "ready"}
                  onClick={() => selectLanguage(code)}
                >
                  {label}
                  {selectedLanguage === code && <FontAwesomeIcon icon={faCheck} aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
          <div id="google_translate_element" className="google-translate-widget" aria-hidden="true" />
        </div>

        <Link to="/admin" className="login-btn">
          <FontAwesomeIcon icon={faUser} aria-hidden="true" />
          <span className="visually-hidden">Admin</span>
        </Link>

      </nav>

    </header>
  );
}