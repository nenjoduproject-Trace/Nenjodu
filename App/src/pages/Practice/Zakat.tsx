import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHandsBubbles,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const zakatSteps = [
  {
    section: "ZAKAT / WEALTH",
    title: "Agricultural Produce",
    heading: "Threshold Value (Nisab) for Zakat",
    description: "Wealth Subject to Zakat: Agricultural Produce",
    translationLabel: "Zakat Rate",
    translation: "5% for irrigated land produce; 10% for rain-fed (dry) land produce",
    arabic: "5 Awsaq (653 kg) per harvest*",
    tip: "Ensure proper calculation based on the irrigation method used for the harvest.",
  },
  {
    section: "ZAKAT / WEALTH",
    title: "Gold, Silver, and Gold/Silver Jewelry",
    heading: "Threshold Value (Nisab) for Zakat",
    description: "Wealth Subject to Zakat: Gold, Silver, and Gold/Silver Jewelry",
    translationLabel: "Zakat Rate",
    translation: "2.5%",
    arabic: "85 grams of gold or 595 grams of silver*",
    tip: "Threshold applies when holdings reach or exceed the specified weight.",
  },
  {
    section: "ZAKAT / WEALTH",
    title: "Cash on hand or bank balance",
    heading: "Threshold Value (Nisab) for Zakat",
    description: "Wealth Subject to Zakat: Cash on hand or bank balance",
    translationLabel: "Zakat Rate",
    translation: "2.5% of the amount",
    arabic: "Equivalent value of 595 grams of silver*",
    tip: "Calculated based on current equivalent monetary value of silver.",
  },
  {
    section: "ZAKAT / WEALTH",
    title: "Trade Goods (Merchandise)",
    heading: "Threshold Value (Nisab) for Zakat",
    description: "Wealth Subject to Zakat: Trade Goods (Merchandise)",
    translationLabel: "Zakat Rate",
    translation: "Goods valued at 2.5% of the total worth",
    arabic: "Equivalent value of 595 grams of silver*",
    tip: "Inventory and trade goods are assessed at market value.",
  },
  {
    section: "ZAKAT / WEALTH",
    title: "Cows and Buffaloes",
    heading: "Threshold Value (Nisab) for Zakat",
    description: "Wealth Subject to Zakat: Cows and Buffaloes",
    translationLabel: "Zakat Rate",
    translation: "One 1-year-old animal for every 30; one 2-year-old animal for every 40",
    arabic: "30 Count",
    tip: "Threshold begins at 30 Count of cattle.",
  },
  {
    section: "ZAKAT / WEALTH",
    title: "Goats and Sheep",
    heading: "Threshold Value (Nisab) for Zakat",
    description: "Wealth Subject to Zakat: Goats and Sheep",
    translationLabel: "Zakat Rate",
    translation: "One animal for 1–40; two for 120; three for 300; and one additional animal for every subsequent 100",
    arabic: "40 Count",
    tip: "Follows the tiered livestock distribution rules.",
  },
  {
    section: "ZAKAT / WEALTH",
    title: "Mineral Resources",
    heading: "Threshold Value (Nisab) for Zakat",
    description: "Wealth Subject to Zakat: Mineral Resources",
    translationLabel: "Zakat Rate",
    translation: "20% of the value of the produce",
    arabic: "Any amount",
    tip: "Applies to extracted mineral resources regardless of initial threshold minimums.",
  },
  {
    section: "ZAKAT / WEALTH",
    title: "Camels",
    heading: "Threshold Value (Nisab) for Zakat",
    description: "Wealth Subject to Zakat: Camels.\n1. For 1–24 camels: one goat or sheep for every 5 camels.\n2. For 25–35: one 1-year-old female camel.\n3. For 36–45: one 2-year-old female camel.\n4. For 46–60: one 3-year-old female camel.\n5. For 61–75: one 4-year-old female camel.\n6. For 76–90: two 2-year-old female camels.\n7. If the number is between 91 and 120, two 3-year-old female camels are to be given.\n8. If the number is 121 or more, then for every 40 camels, one additional 2-year-old female camel must be given; alternatively, for every 50 camels in excess, one 3-year-old female camel must be added.",
    translationLabel: "Zakat Rate",
    translation: "Variable scale based on camel count as listed",
    arabic: "5 Count",
    tip: "Refer to the detailed multi-tiered bracket breakdown for exact distribution.",
  },
];

const stepTitles = zakatSteps.map((step) => step.title);

export default function Zakat() {
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const title = stepTitles[activeStep];
  const currentStep = zakatSteps[activeStep];

  function goToStep(step: number) {
    setActiveStep(Math.max(0, Math.min(step, stepTitles.length - 1)));
  }

  return (
    <div className="page purification-page zakat-page">
      <div className="purification-heading">
        <div className="page-heading">
          <span className="section-label">Islam in Zakat</span>
          <h1>Zakat</h1>
          <p>Practical guidance for understanding and paying Zakat.</p>
        </div>
        <span className="purification-count">{stepTitles.length} Slides</span>
      </div>

      <div className="purification-layout">
        <aside className="purification-steps" aria-label="Purification lesson steps">
          <div className="purification-steps-heading">
            <h2>
              {/* <FontAwesomeIcon icon={faDroplet} aria-hidden="true" /> */}
              All 8 Zakat Steps
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

            <p>
              {currentStep.description.split(/\r?\n/).map((line, index) => (
                <Fragment key={index}>
                  {index > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </p>

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
