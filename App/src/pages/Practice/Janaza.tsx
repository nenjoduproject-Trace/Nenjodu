import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHandsBubbles,
  faStar,
} from "@fortawesome/free-solid-svg-icons";


const janazaSteps = [
  {
    section: "JANAZA / LESSON",
    title: "Positioning the Body",
    heading: "Preparing the deceased before the funeral prayer",
    description:
      "Before placing the body in the mosque, position it according to the funeral arrangements followed by the local Muslim community. Your provided procedure specifies the head facing north and the feet facing south. Body orientation should be confirmed with the local imam, as directions depend on the location and are not a universal Islamic requirement.",
    translationLabel: "Important Note",
    translation: "Follow the guidance of the local imam when positioning the deceased.",
    arabic: "",
    tip: "Handle the deceased with dignity, gentleness, and respect.",
  },
  {
    section: "JANAZA / LESSON",
    title: "Arranging the Rows",
    heading: "Standing together for the Janazah prayer",
    description:
      "Before performing the Janazah prayer, participants should stand in orderly rows behind the Imam. The number of rows may vary according to attendance and the space available. Some communities prefer an odd number of rows.",
    translationLabel: "Prayer Practice",
    translation: "Stand in orderly rows and follow the Imam throughout the prayer.",
    arabic: "",
    tip: "Maintain straight rows and avoid unnecessary conversation during the prayer.",
  },
  {
    section: "JANAZA / LESSON",
    title: "Assuming Responsibility",
    heading: "Addressing the deceased's outstanding debts and obligations",
    description:
      "The family or responsible representatives should make reasonable efforts to identify any outstanding debts and obligations of the deceased. A person may voluntarily undertake responsibility for settling debts when appropriate. The family and community may also seek forgiveness from those who were wronged by the deceased.",
    translationLabel: "Important Reminder",
    translation:
      "Outstanding debts and the rights of other people should be taken seriously and addressed responsibly.",
    arabic: "",
    tip: "A public declaration is not a universal requirement for every Janazah prayer. Seek guidance from a qualified scholar regarding specific obligations.",
  },
  {
    section: "JANAZA / LESSON",
    title: "Niyyah (Intention)",
    heading: "Making the intention for the funeral prayer",
    description:
      "Form the intention in your heart to perform the Janazah prayer for the sake of Allah, supplicating for the deceased and following the Imam. The intention does not need to be pronounced aloud.",
    translationLabel: "Arabic Transliteration",
    translation: "Niyyah is the intention in the heart.",
    arabic: "نِيَّة",
    tip: "Make your intention sincerely for Allah before the prayer begins.",
  },
  {
    section: "JANAZA / LESSON",
    title: "Method of Prayer",
    heading: "Performing the four Takbirs of Janazah",
    description:
      "The Janazah prayer is performed standing, without bowing or prostration. In the commonly followed method, the prayer consists of four Takbirs: after the first, recite Sana; after the second, recite Durood-e-Ibrahim; after the third, recite a supplication for the deceased; and after the fourth, conclude with Salam according to the method taught by your Imam.",
    translationLabel: "Prayer Sequence",
    translation:
      "First Takbir: Sana\nSecond Takbir: Durood-e-Ibrahim\nThird Takbir: Dua for the deceased\nFourth Takbir: Conclude the prayer with Salam according to the method followed.",
    arabic: "اللَّهُ أَكْبَرُ",
    tip: "Follow the Imam carefully. Details of the recitations and concluding Salam can differ among Islamic schools.",
  },
  {
    section: "JANAZA / LESSON",
    title: "Reciting Supplications (Duas)",
    heading: "Praying for the deceased's forgiveness and mercy",
    description:
      "During the Janazah prayer, recite the appropriate supplication for the deceased, asking Allah to forgive their sins, have mercy upon them, grant them well-being in the Hereafter, and admit them into Paradise. Follow a reliable prayer manual or the guidance of a qualified Imam for the appropriate supplication.",
    translationLabel: "Arabic Transliteration",
    translation:
      "Allahummaghfir lahu warhamhu — O Allah, forgive him and have mercy upon him.",
    arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ",
    tip: "For a female deceased, the wording of the supplication is adjusted accordingly.",
  },
  {
    section: "JANAZA / LESSON",
    title: "Viewing the Face",
    heading: "Allowing family members to see the deceased",
    description:
      "Where appropriate, family members and others who have not had the opportunity to see the deceased may be allowed to view the face respectfully before burial. The process should protect the deceased's dignity and follow the family's wishes and applicable Islamic guidance.",
    translationLabel: "Important Note",
    translation:
      "Viewing the face is subject to appropriate arrangements, privacy, and the guidance of the family and local scholars.",
    arabic: "",
    tip: "This practice is not restricted to male deceased persons as a universal Islamic rule. Ask a qualified scholar about specific circumstances.",
  },
  {
    section: "JANAZA / LESSON",
    title: "Transporting to the Burial Site",
    heading: "Carrying the deceased respectfully to the grave",
    description:
      "Transport the deceased carefully from the mosque or funeral location to the burial site. Those accompanying the funeral should maintain dignity, avoid unnecessary noise, and remember Allah. Recitation of the Kalima Shahadah may be practiced according to local custom, but it should not be treated as a universally prescribed requirement for carrying the body.",
    translationLabel: "Kalima Shahadah",
    translation:
      "La ilaha illallah, Muhammadur Rasulullah — There is no deity worthy of worship except Allah, and Muhammad is the Messenger of Allah.",
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ",
    tip: "Carry the deceased gently and avoid delaying the funeral without a valid reason.",
  },
  {
    section: "JANAZA / LESSON",
    title: "Preparing the Grave",
    heading: "Preparing a suitable grave for burial",
    description:
      "Prepare the grave to accommodate the deceased safely and respectfully, taking account of the soil, local burial regulations, and established Muslim burial practices. Your provided measurements are approximately 3 to 4 feet deep, 6 to 7 feet long, and 2 feet wide. Actual dimensions should be determined by the cemetery and local requirements. The grave should permit the deceased to be positioned facing the Qiblah.",
    translationLabel: "Grave Preparation",
    translation:
      "Depth: approximately 3–4 feet\nLength: approximately 6–7 feet\nWidth: approximately 2 feet\nThese are suggested measurements, not universal Islamic requirements.",
    arabic: "",
    tip: "Confirm the Qiblah direction and grave design with the cemetery staff or local Imam before burial.",
  },
  {
    section: "JANAZA / LESSON",
    title: "Before Placing the Body in the Grave",
    heading: "Lowering the deceased gently into the grave",
    description:
      "Designated individuals should carefully receive and lower the deceased into the grave. Handle the body with respect, supporting it securely throughout the process. Position the deceased on the right side facing the Qiblah, using suitable support where necessary to maintain the position.",
    translationLabel: "Burial Practice",
    translation:
      "Lower the deceased gently and ensure the body is positioned facing the Qiblah.",
    arabic: "",
    tip: "Ensure everyone involved knows their role and that the lowering process is safe and dignified.",
  },
  {
    section: "JANAZA / LESSON",
    title: "After Placing the Body in the Grave",
    heading: "Covering the deceased and filling the grave",
    description:
      "After the deceased has been placed in the grave, arrange suitable coverings according to the grave's construction and established local burial practice. Fill the grave with soil carefully until it is properly covered. Any additional practices, such as placing a plant or branch near the grave, should be discussed with a qualified scholar because customs and scholarly opinions differ.",
    translationLabel: "Burial Reminder",
    translation:
      "Complete the burial respectfully and ensure the grave is securely and properly filled.",
    arabic: "",
    tip: "Avoid damaging the burial shroud or disturbing the deceased while filling the grave.",
  },
  {
    section: "JANAZA / LESSON",
    title: "Final Supplication (Dua)",
    heading: "Praying for forgiveness and steadfastness after burial",
    description:
      "After the burial, ask Allah to forgive the deceased, show them mercy, grant them steadfastness, and admit them into Paradise. Pray for the deceased's well-being in the Hereafter and ask Allah to forgive any wrongs committed against Him or other people.",
    translationLabel: "Arabic Transliteration",
    translation:
      "Allahummaghfir lahu warhamhu wa thabbit-hu — O Allah, forgive him, have mercy upon him, and make him steadfast.",
    arabic: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَثَبِّتْهُ",
    tip: "Make sincere supplication for the deceased and follow authentic guidance for post-burial duas.",
  },
];

const stepTitles = janazaSteps.map((step) => step.title);

export default function Janaza() {
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const title = stepTitles[activeStep];
  const currentStep = janazaSteps[activeStep];

  function goToStep(step: number) {
    setActiveStep(Math.max(0, Math.min(step, stepTitles.length - 1)));
  }

  return (
    <div className="page purification-page">
      <div className="purification-heading">
        <div className="page-heading">
          <span className="section-label">Islam in Janaza</span>
          <h1>Janaza</h1>
          <p>Practical guidance for Janazah (funeral) prayer.</p>
        </div>
        <span className="purification-count">{stepTitles.length} Slides</span>
      </div>

      <div className="purification-layout">
        <aside className="purification-steps" aria-label="Purification lesson steps">
          <div className="purification-steps-heading">
            <h2>
              {/* <FontAwesomeIcon icon={faDroplet} aria-hidden="true" /> */}
              All 12 Wudu Steps
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
              {/* {currentStep.imageURL && (
                <img
                  src={currentStep.imageURL}
                  alt={currentStep.title}
                  className="purification-content-image"
                />
              )} */}
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
