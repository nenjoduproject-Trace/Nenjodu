import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useGlobalLoading } from "../context/LoadingContext";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, showLoadingFor } = useGlobalLoading();
  const previousLocationKey = useRef(location.key);
  const isChatOpen = location.pathname === "/ask";

  useEffect(() => {
    if (previousLocationKey.current !== location.key) {
      previousLocationKey.current = location.key;
      showLoadingFor();
    }
  }, [location.key, showLoadingFor]);

  function handleLoadingInteraction(event: MouseEvent<HTMLDivElement>) {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const link = target.closest("a[href]");
    if (
      link instanceof HTMLAnchorElement &&
      link.target !== "_blank" &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin === window.location.origin &&
        destination.href !== window.location.href
      ) {
        showLoadingFor();
        return;
      }
    }

    if (
      target.closest(
        ".purification-controls button, .purification-step-list button",
      )
    ) {
      showLoadingFor();
    }
  }

  function goBack() {
    const historyIndex = window.history.state?.idx;
    if (typeof historyIndex === "number" && historyIndex > 0) {
      navigate(-1);
      return;
    }
    navigate("/");
  }

  return (
    <div className="app" onClickCapture={handleLoadingInteraction}>

      <Header />

      <div className="app-body">

        <Sidebar />

        <main className="main-content">
          {location.pathname !== "/" && (
            <button
              type="button"
              className="mobile-back-button"
              onClick={goBack}
              aria-label="Go back"
            >
              <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
            </button>
          )}
          <Outlet />
        </main>

      </div>

      <BottomNav />

      <button
        type="button"
        className={`chatbot-button${isChatOpen ? " chatbot-button-close" : ""}`}
        aria-label={isChatOpen ? "Close Islamic Q&A chatbot" : "Open Islamic Q&A chatbot"}
        title={isChatOpen ? "Close Islamic Q&A chatbot" : "Open Islamic Q&A chatbot"}
        onClick={() => {
          if (!isChatOpen) {
            navigate("/ask");
            return;
          }

          window.dispatchEvent(new Event("ask-chat-close"));
          if (typeof window.history.state?.idx === "number" && window.history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate("/");
          }
        }}
      >
        {isChatOpen ? (
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="chatbot-close-icon fa-beat"
            aria-hidden="true"
          />
        ) : (
          <img src="/chatbot.gif" alt="" aria-hidden="true" />
        )}
      </button>

      {isLoading && (
        <div className="global-loading-overlay" role="status" aria-label="Loading">
          <img src="/assets/Load_Sandclock.gif" alt="Loading" />
        </div>
      )}

    </div>
  );
}