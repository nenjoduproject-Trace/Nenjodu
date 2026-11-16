import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faDroplet,
  faHandsBubbles,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import washingFingerImage from "../../../public/assets/image/wudu/washing-finger.png";
import washingNoseImage from "../../../public/assets/image/wudu/washing-nose2.png";
import washingMouthImage from "../../../public/assets/image/wudu/washing-mouth.png";
import washingFaceImage from "../../../public/assets/image/wudu/washing-face.png";
import washingHandImage from "../../../public/assets/image/wudu/washing-hand.png";
import washingHeadImage from "../../../public/assets/image/wudu/washing-head.png";
import washingEarImage from "../../../public/assets/image/wudu/washing-ear.png";
import washingLegImage from "../../../public/assets/image/wudu/washing-leg.png";

const wuduSteps = [
  {
    section: "SUNNAH / ESSENTIAL PREPARATION",
    title: "Niyyah & Bismillah",
    heading: "Setting the intention and starting with Allah's name",
    description:
      "Make the intention in your heart to perform wudu for purification and worship. Begin by saying Bismillah.",
    translationLabel: "Arabic Transliteration",
    translation: "Bismillah hir-Rahman nir-Rahim",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    tip: "Intention is an act of the heart and does not need to be spoken aloud.",
  },
  {
    section: "WUDU / LESSON",
    title: "Washing Hands",
    heading: "Wash both hands up to the wrists",
    description:
      "Wash both hands thoroughly, ensuring water reaches between the fingers.",
    translationLabel: "Practical Guidance",
    translation: "Wash both hands up to the wrists.",
    arabic: "",
    imageURL: washingFingerImage,
    tip: "Pay attention to the spaces between your fingers.",
  },
  {
    section: "WUDU / LESSON",
    title: "Mouth Gargle",
    heading: "Rinse the mouth",
    description:
      "Take water into your mouth, rinse thoroughly, and spit it out.",
    translationLabel: "Practical Guidance",
    translation: "Rinse the mouth with clean water.",
    arabic: "",
    imageURL: washingMouthImage,
    tip: "Use water carefully and avoid swallowing it while rinsing.",
  },
  {
    section: "WUDU / LESSON",
    title: "Nose Cleansing",
    heading: "Cleanse the nose",
    description:
      "Gently draw water into the nostrils and expel it.",
    translationLabel: "Practical Guidance",
    translation: "Gently rinse and clean the nose.",
    arabic: "",
    imageURL: washingNoseImage,
    tip: "Be gentle and avoid forcing water into the nose.",
  },
  {
    section: "WUDU / LESSON",
    title: "Washing Face",
    heading: "Wash the entire face",
    description:
      "Wash the face from the usual hairline to the chin and from ear to ear.",
    translationLabel: "Practical Guidance",
    translation: "Wash the entire face thoroughly.",
    arabic: "",
    imageURL: washingFaceImage,
    tip: "Ensure water reaches all areas of the face.",
  },
  {
    section: "WUDU / LESSON",
    title: "Washing Arms",
    heading: "Wash both arms including the elbows",
    description:
      "Wash the arms, including the elbows, ensuring water reaches every area.",
    translationLabel: "Practical Guidance",
    translation: "Wash both arms thoroughly, including the elbows.",
    arabic: "",
    imageURL: washingHandImage,
    tip: "Do not miss the elbows or areas around the wrists.",
  },
  {
    section: "WUDU / LESSON",
    title: "Wiping Head",
    heading: "Wipe the head with wet hands",
    description:
      "Wipe the head with wet hands according to the method of wudu you follow.",
    translationLabel: "Practical Guidance",
    translation: "Wipe the head with wet hands.",
    arabic: "",
    imageURL: washingHeadImage,
    tip: "Follow the requirements of your school of Islamic jurisprudence.",
  },
  {
    section: "WUDU / LESSON",
    title: "Wiping Ears",
    heading: "Wipe the ears",
    description:
      "Wipe the ears as part of your wudu according to the method you follow.",
    translationLabel: "Practical Guidance",
    translation: "Wipe the ears with wet hands.",
    arabic: "",
    imageURL: washingEarImage,
    tip: "Follow the established method taught by a reliable teacher.",
  },
  {
    section: "WUDU / LESSON",
    title: "Washing Feet",
    heading: "Wash both feet including the ankles",
    description:
      "Wash both feet thoroughly, including the ankles and between the toes.",
    translationLabel: "Practical Guidance",
    translation: "Wash the feet and ankles thoroughly.",
    arabic: "",
    imageURL: washingLegImage,
    tip: "Ensure water reaches between the toes.",
  },
  {
    section: "WUDU / LESSON",
    title: "Complete the Both Side",
    heading: "Give attention to the both side",
    description:
      "Learn the recommended order and practices concerning the both side of the body.",
    translationLabel: "Practical Guidance",
    translation: "Follow the established sequence of wudu.",
    arabic: "",
    tip: "Washing the both side first is a recommended practice.",
  },
  {
    section: "WUDU / LESSON",
    title: "Repeat Washing",
    heading: "Understand repetition in wudu",
    description:
      "Learn the guidance concerning washing the required parts once, twice, or three times.",
    translationLabel: "Practical Guidance",
    translation: "Avoid unnecessary waste of water.",
    arabic: "",
    tip: "The rulings on repetition vary by action; follow reliable guidance.",
  },
  {
    section: "WUDU / LESSON",
    title: "Between the Hand-fingers",
    heading: "Ensure water reaches between the hand-fingers",
    description:
      "Pay attention to areas where water may be missed during washing.",
    translationLabel: "Practical Guidance",
    translation: "Ensure all required areas are washed.",
    arabic: "",
    tip: "Check carefully without making the process unnecessarily difficult.",
  },
  {
    section: "WUDU / LESSON",
    title: "Between the Toes",
    heading: "Ensure water reaches between the toes",
    description:
      "Wash between the toes while washing the feet.",
    translationLabel: "Practical Guidance",
    translation: "Clean between the toes.",
    arabic: "",
    tip: "Do not leave dry areas on parts that must be washed.",
  },
  {
    section: "WUDU / LESSON",
    title: "Order of Wudu",
    heading: "Follow the prescribed sequence",
    description:
      "Learn the correct order of the actions of wudu.",
    translationLabel: "Practical Guidance",
    translation: "Follow the prescribed sequence.",
    arabic: "",
    tip: "The ruling on order depends on the school of jurisprudence.",
  },
  {
    section: "WUDU / LESSON",
    title: "Water Conservation",
    heading: "Use water responsibly",
    description:
      "Perform wudu carefully while avoiding excessive water consumption.",
    translationLabel: "Practical Guidance",
    translation: "Use only the water you need.",
    arabic: "",
    tip: "Avoid wasting water even when it is readily available.",
  },
  {
    section: "WUDU / LESSON",
    title: "Check Your Wudu",
    heading: "Make sure all required parts are covered",
    description:
      "Review the required washing and wiping actions before finishing.",
    translationLabel: "Practical Guidance",
    translation: "Ensure the required actions are completed.",
    arabic: "",
    tip: "Learn the obligatory actions and recommended practices separately.",
  },
  {
    section: "WUDU / LESSON",
    title: "After Wudu",
    heading: "Learn the practices after purification",
    description:
      "Learn the authentic supplications and recommended practices after completing wudu.",
    translationLabel: "After Wudu",
    translation: "Consult a reliable source for the authentic supplication.",
    arabic: "",
    tip: "Learn the supplication from an authentic hadith source.",
  },
];

const stepTitles = wuduSteps.map((step) => step.title);

export default function Purification() {
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const title = stepTitles[activeStep];
  const currentStep = wuduSteps[activeStep];

  function goToStep(step: number) {
    setActiveStep(Math.max(0, Math.min(step, stepTitles.length - 1)));
  }

  return (
    <div className="page purification-page">
      <div className="purification-heading">
        <div className="page-heading">
          <span className="section-label">Islam in Practice</span>
          <h1>Purification</h1>
          <p>Practical guidance for Wudu and purification.</p>
        </div>
        <span className="purification-count">{stepTitles.length} Slides</span>
      </div>

      <div className="purification-layout">
        <aside className="purification-steps" aria-label="Purification lesson steps">
          <div className="purification-steps-heading">
            <h2>
              <FontAwesomeIcon icon={faDroplet} aria-hidden="true" />
              All 17 Wudu Steps
            </h2>
            <span>{stepTitles.length} Slides</span>
          </div>

          <div className="purification-step-list">
            {stepTitles.map((stepTitle, index) => (
              <button
                className={`purification-step${activeStep === index ? " active" : ""}`}
                type="button"
                key={stepTitle}
                aria-current={activeStep === index ? "step" : undefined}
                onClick={() => goToStep(index)}
              >
                <span className="purification-step-number">{index + 1}</span>
                <span className="purification-step-copy">
                  <strong>{stepTitle}</strong>
                  <small>
                    Step {index + 1}: {index === 0 ? "Niyyah & Bismillah" : "Add a short description"}
                  </small>
                </span>
                <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
              </button>
            ))}
          </div>
        </aside>

        <section className="purification-lesson" aria-live="polite">
          <div className="purification-lesson-title">
            <span className="purification-sparkle">
              <FontAwesomeIcon icon={faStar} aria-hidden="true" />
            </span>
            <div>
              <span className="purification-section-label">
                {currentStep.section}
              </span>
              <h2 key={isFirstStep ? "first-step" : `step-${activeStep}`}>
                Step {activeStep + 1}: {title}
              </h2>
            </div>
          </div>

          <article className="purification-content">
            <h3>{currentStep.heading}</h3>

            <p>{currentStep.description}</p>

            <div className="purification-translation">
              <div>
                <span>{currentStep.translationLabel}</span>
                <strong>{currentStep.translation}</strong>
              </div>
              {currentStep.arabic && (
                <b lang="ar" dir="rtl">
                  {currentStep.arabic}
                </b>
              )}
                </div>
              {currentStep.imageURL && (
                <img
                  src={currentStep.imageURL}
                  alt={currentStep.title}
                  className="purification-content-image"
                />
              )}
          </article>

          {/* <aside className="purification-tip">
            <FontAwesomeIcon icon={faLightbulb} aria-hidden="true" />
            <div>
              <strong>Practical Guidance &amp; Tip</strong>
              <p>{currentStep.tip}</p>
            </div>
          </aside> */}

          <div className="purification-controls">
            <button
              type="button"
              className="purification-previous"
              onClick={() => goToStep(activeStep - 1)}
              disabled={activeStep === 0}
            >
              <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
              Previous
            </button>
            <button
              type="button"
              className="purification-next"
              onClick={() => goToStep(activeStep + 1)}
              disabled={activeStep === stepTitles.length - 1}
            >
              Next
              <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>
      <span className="purification-watermark" aria-hidden="true">
        <FontAwesomeIcon icon={faHandsBubbles} />
      </span>
    </div>
  );
}
