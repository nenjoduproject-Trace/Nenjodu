import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHandsBubbles,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const masjidSteps = [
  {
    section: "MASJID / LESSON",
    title: "Entering the Masjid",
    heading: "Entering the house of Allah respectfully",
    description:
      "Enter the masjid calmly and respectfully, keeping the place of worship clean and peaceful. It is a Sunnah to enter with the right foot and recite the supplication for entering the masjid. Avoid disturbing people who are praying or remembering Allah.",
    translationLabel: "Arabic Transliteration",
    translation: "Allahumma iftah li abwaba rahmatik.",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    tip: "Meaning: O Allah, open for me the gates of Your mercy.",
  },
  {
    section: "MASJID / LESSON",
    title: "Maintaining Cleanliness",
    heading: "Keeping the masjid clean and pure",
    description:
      "Maintain cleanliness in the prayer hall, entrances, ablution facilities, and other shared areas. Remove footwear where required, dispose of rubbish properly, and avoid bringing dirt or unpleasant odours into the prayer space. Treat all masjid property with care.",
    translationLabel: "Key Term",
    translation: "Taharah — Purification and cleanliness.",
    arabic: "طَهَارَة",
    tip: "Leave the prayer area as clean as, or cleaner than, you found it.",
  },
  {
    section: "MASJID / LESSON",
    title: "Performing Wudu",
    heading: "Preparing for prayer through purification",
    description:
      "Perform Wudu correctly before Salah when purification is required. Use the designated ablution area, avoid wasting water, and leave the facilities tidy for the next person. Follow established Islamic guidance for the required steps of Wudu.",
    translationLabel: "Arabic Transliteration",
    translation: "Bismillah",
    arabic: "بِسْمِ اللَّهِ",
    tip: "Use water responsibly and avoid splashing or creating slippery floors.",
  },
  {
    section: "MASJID / LESSON",
    title: "Entering with the Right Foot",
    heading: "Following the etiquette of entering",
    description:
      "A commonly taught Sunnah of masjid etiquette is to enter with the right foot while remembering Allah. Make the intention to worship, seek beneficial knowledge, or pray, and enter without pushing or disturbing others.",
    translationLabel: "Arabic Transliteration",
    translation: "Allahumma iftah li abwaba rahmatik.",
    arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    tip: "Enter quietly, especially when a congregational prayer or lesson is already in progress.",
  },
  {
    section: "MASJID / LESSON",
    title: "Offering Tahiyyatul Masjid",
    heading: "Praying upon entering when appropriate",
    description:
      "The greeting of the masjid is commonly observed by performing two voluntary Rak'ahs before sitting, when appropriate. Follow the guidance of your Islamic school and local Imam, particularly when the obligatory prayer is beginning or other circumstances apply.",
    translationLabel: "Key Term",
    translation: "Tahiyyatul Masjid — The prayer greeting the masjid.",
    arabic: "تَحِيَّةُ الْمَسْجِد",
    tip: "Do not interrupt an obligatory congregational prayer to perform this voluntary prayer.",
  },
  {
    section: "MASJID / LESSON",
    title: "Respecting the Prayer Rows",
    heading: "Standing together in orderly congregation",
    description:
      "When joining congregational Salah, fill available spaces in the rows and follow the Imam. Stand with consideration for others, avoid leaving unnecessary gaps, and do not push or inconvenience fellow worshippers.",
    translationLabel: "Arabic Transliteration",
    translation: "Saff — A row of worshippers in congregational prayer.",
    arabic: "صَفّ",
    tip: "Help maintain straight, orderly rows while respecting everyone's space and comfort.",
  },
  {
    section: "MASJID / LESSON",
    title: "Silence During Prayer",
    heading: "Avoiding distractions during worship",
    description:
      "Remain quiet while people are praying, reciting the Qur'an, or listening to a sermon. Silence mobile phones, avoid unnecessary conversations, and ensure children are guided kindly so that others can worship without disturbance.",
    translationLabel: "Key Term",
    translation: "Khushu' — Humility, attentiveness, and devotion in prayer.",
    arabic: "خُشُوع",
    tip: "If you need to speak, move to an appropriate area and keep your voice low.",
  },
  {
    section: "MASJID / LESSON",
    title: "Respecting the Qur'an",
    heading: "Handling the Qur'an with care",
    description:
      "Treat copies of the Qur'an with reverence and care. Keep them in clean, appropriate places, avoid placing objects carelessly on them, and return borrowed copies to their proper location. Follow the relevant guidance for handling printed Qur'ans.",
    translationLabel: "Arabic Term",
    translation: "Al-Qur'an — The Book of Allah revealed to Prophet Muhammad ﷺ.",
    arabic: "الْقُرْآن",
    tip: "Handle Qur'ans respectfully and help maintain a neat, organised reading area.",
  },
  {
    section: "MASJID / LESSON",
    title: "Listening to the Khutbah",
    heading: "Paying attention during the sermon",
    description:
      "During the Friday Khutbah and other formal sermons, listen attentively and avoid unnecessary conversation or distractions. Arrive early when possible, silence electronic devices, and follow the Imam's instructions.",
    translationLabel: "Key Term",
    translation: "Khutbah — A sermon delivered on occasions such as Friday prayer.",
    arabic: "خُطْبَة",
    tip: "The detailed rulings on speaking during the Friday Khutbah should be learned from a qualified scholar.",
  },
  {
    section: "MASJID / LESSON",
    title: "Respecting Fellow Worshippers",
    heading: "Showing kindness and consideration to others",
    description:
      "Treat everyone in the masjid with dignity, including elders, children, visitors, people with disabilities, and those from different backgrounds. Avoid arguments, harsh words, discrimination, and behaviour that causes discomfort. Make room for others and offer help when needed.",
    translationLabel: "Arabic Transliteration",
    translation: "As-salamu alaykum",
    arabic: "السَّلَامُ عَلَيْكُمْ",
    tip: "Spread peace through a friendly greeting, patience, and considerate behaviour.",
  },
  {
    section: "MASJID / LESSON",
    title: "Caring for Masjid Property",
    heading: "Protecting shared facilities and resources",
    description:
      "Use prayer mats, shelves, fans, air conditioners, microphones, books, and other facilities responsibly. Do not damage, misuse, or remove masjid property without permission. Report maintenance issues to the responsible committee.",
    translationLabel: "Important Reminder",
    translation: "Masjid property is a trust for the benefit of the community.",
    arabic: "أَمَانَة",
    tip: "Use electricity and water responsibly and help keep shared facilities in good condition.",
  },
  {
    section: "MASJID / LESSON",
    title: "Following Masjid Guidelines",
    heading: "Respecting the Imam and mosque administration",
    description:
      "Follow reasonable masjid rules relating to prayer times, access, cleanliness, lessons, and the use of shared spaces. Consult the Imam or management committee if you have concerns, and resolve disagreements respectfully rather than disturbing worshippers.",
    translationLabel: "Key Term",
    translation: "Adab — Good manners, etiquette, and proper conduct.",
    arabic: "أَدَب",
    tip: "Ask the Imam or management committee for clarification when a local rule is unclear.",
  },
  {
    section: "MASJID / LESSON",
    title: "Leaving the Masjid",
    heading: "Leaving peacefully after worship",
    description:
      "After completing your worship, leave the masjid calmly, avoid blocking entrances, and ensure that personal belongings are collected. A commonly taught Sunnah is to leave with the left foot and recite the supplication for leaving the masjid.",
    translationLabel: "Arabic Transliteration",
    translation: "Allahumma inni as'aluka min fadlik.",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    tip: "Meaning: O Allah, I ask You for Your bounty.",
  },
];

const stepTitles = masjidSteps.map((step) => step.title);

export default function Masjidh() {
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const title = stepTitles[activeStep];
  const currentStep = masjidSteps[activeStep];

  function goToStep(step: number) {
    setActiveStep(Math.max(0, Math.min(step, stepTitles.length - 1)));
  }

  return (
    <div className="page purification-page">
      <div className="purification-heading">
        <div className="page-heading">
          <span className="section-label">Islam in Masjid</span>
          <h1>Masjid</h1>
          <p>Practical guidance for visiting and using the mosque.</p>
        </div>
        <span className="purification-count">{stepTitles.length} Slides</span>
      </div>

      <div className="purification-layout">
        <aside className="purification-steps" aria-label="Purification lesson steps">
          <div className="purification-steps-heading">
            <h2>
              {/* <FontAwesomeIcon icon={faDroplet} aria-hidden="true" /> */}
              All 13 Wudu Steps
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
