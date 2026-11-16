import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHandsBubbles,
  faStar,
} from "@fortawesome/free-solid-svg-icons";


const kalimahSteps = [
    {
        section: "KALIMAH / LESSON",
        title: "First Kalimah - Tayyibah (Declaration of Faith)",
        heading: "Declaration of Faith",
        description:
        "Meaning: There is none worthy of worship except Allah; Muhammad (peace be upon him) is the Messenger of Allah.",
        translationLabel: "Transliteration",
        translation: "La ilaha illallahu Muhammadur Rasulullah",
        arabic: "لَا إِلٰهَ إِلَّا اللهُ مُحَمَّدُ رَسُولُ اللهِ",
        tip: "",
    },
    {
        section: "KALIMAH / LESSON",
        title: "Second Kalimah - Shahadah (Declaration of Testimony)",
        heading: "Declaration of Testimony",
        description:
        "Meaning: I bear witness that there is none worthy of worship except Allah, and I bear witness that Muhammad (peace be upon him) is His servant and Messenger.",
        translationLabel: "Transliteration",
        translation:
        "Ashhadu an la ilaha illallahu wa ashhadu anna Muhammadan abduhu wa rasuluhu",
        arabic:
        "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        tip: "",
    },
    {
        section: "KALIMAH / LESSON",
        title: "Third Kalimah - Tamjeed (Glorification)",
        heading: "Glorification of Allah",
        description:
        "Allah is Pure; all praise belongs to Allah; there is no deity except Allah; Allah is the Greatest. There is no power to refrain from sins and no strength to perform good deeds except through Allah, the Most High, the Most Great.",
        translationLabel: "Transliteration",
        translation:
        "Subhanallahi walhamdulillahi wa la ilaha illallahu wallahu akbar. Wa la hawla wa la quwwata illa billahil aliyyil azeem.",
        arabic:
        "سُبْحَانَ اللهِ وَالْحَمْدُ لِلهِ وَلَا إِلٰهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ الْعَلِيِّ الْعَظِيمِ",
        tip: "",
    },
    {
        section: "KALIMAH / LESSON",
        title: "Fourth Kalimah - Tawheed (Oneness of Allah)",
        heading: "Oneness of Allah",
        description:
        "There is none worthy of worship except Allah. He is One; He has no partner. Sovereignty belongs to Him and all praise belongs to Him. He gives life and causes death. He is Ever-Living and never dies, forever and ever. He is the Possessor of Majesty and Honour. All goodness is in His Hand, and He has power over everything.",
        translationLabel: "Transliteration",
        translation:
        "La ilaha illallahu wahdahu la sharika lahu, lahul mulku walhamdu, yuhyi wa yumitu, wa huwa hayyul la yamutu abadan abada, dhul jalali wal ikram, biyadihil khair, wa huwa ala kulli shayin qadeer.",
        arabic:
        "لَا إِلٰهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ أَبَدًا أَبَدًا، ذُو الْجَلَالِ وَالإِكْرَامِ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        tip: "",
    },
    {
    section: "KALIMAH / LESSON",
    title: "Fifth Kalimah - Raddu al-Kufr (Rejection of Disbelief)",
    heading: "Seeking Protection and Forgiveness",
    description:
        "O Allah! I seek refuge in You from associating anything with You knowingly. I ask Your forgiveness for what I do unknowingly. I have repented from it and disassociated myself from all disbelief (Kufr), associating partners with Allah (Shirk), and all sins. I have submitted and believed, and I say: There is none worthy of worship except Allah; Muhammad is the Messenger of Allah.",
    translationLabel: "Transliteration (Tamil Script)",
    translation:
      "Allahumma inni a'udhu bika min an ushrika bika shay'an wa ana a'lamu, wa astaghfiruka lima la a'lamu, tubtu anhu wa tabarra'tu minal kufri wash-shirki wal-ma'siyati kulliha, wa aslamtu wa amantu wa aqulu la ilaha illallahu Muhammadur Rasulullah.",
    arabic:
        "اَللّٰهُمَّ إِنِّيْ أَعُوذُ بِكَ مِنْ أَنْ أُشْرِكَ بِكَ شَيْئًا وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ، تُبْتُ عَنْهُ وَتَبَرَّأْتُ مِنَ الْكُفْرِ وَالشِّرْكِ وَالْمَعْصِيَةِ كُلِّهَا، وَأَسْلَمْتُ وَآمَنْتُ وَأَقُولُ لَا إِلٰهَ إِلَّا اللهُ مُحَمَّدُ رَسُولُ اللهِ",
    tip: "",
    },
];

const stepTitles = kalimahSteps.map((step) => step.title);

export default function Kalimah() {
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const title = stepTitles[activeStep];
  const currentStep = kalimahSteps[activeStep];

  function goToStep(step: number) {
    setActiveStep(Math.max(0, Math.min(step, stepTitles.length - 1)));
  }

  return (
    <div className="page purification-page">
      <div className="purification-heading">
        <div className="page-heading">
          <span className="section-label">Islam in Kalimah</span>
          <h1>Kalimah</h1>
          <p>Practical guidance for reciting the Kalimah.</p>
        </div>
        <span className="purification-count">{stepTitles.length} Slides</span>
      </div>

      <div className="purification-layout">
        <aside className="purification-steps" aria-label="Purification lesson steps">
          <div className="purification-steps-heading">
            <h2>
              {/* <FontAwesomeIcon icon={faDroplet} aria-hidden="true" /> */}
              All 5 Kalimah Steps
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
