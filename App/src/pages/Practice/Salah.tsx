import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faDroplet,
  faHandsBubbles,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import SalahTaskbeeraatImage from "../../../public/assets/image/salah/salah-Taskbeerat.png";
import SalahQiyamImage from "../../../public/assets/image/salah/salah-Qiyam.png";
import SalahRukuImage from "../../../public/assets/image/salah/salah-Ruku.png";
import SalahAfterRukuImage from "../../../public/assets/image/salah/salah-AfterRuku.png";
import SalahSajdahImage from "../../../public/assets/image/salah/salah-Sajjtha.png";
import SalahTashajjudImage from "../../../public/assets/image/salah/salah-Tashahhud.png";
import SalahSajjitha2Image from "../../../public/assets/image/salah/salah-Sajjtha2.png";
import SalahQuoodImage from "../../../public/assets/image/salah/salah-Quood.png";


const salahSteps = [
  {
    section: "SALAH POSTURE 1",
    title: "Takbeerat-ul-Ihram",
    heading: "Raising hands and opening the prayer",
    description: "Bring hands, palms open, up to ears, and place thumbs behind earlobes as Allah Akbar is uttered.",
    translationLabel: "Arabic Meaning",
    translation: "Allah is the greatest.",
    arabic: "اللَّهُ أَكْبَرُ",
    imageURL: SalahTaskbeeraatImage,
    tip: "Keep your palms facing forward toward the Qibla when raising your hands.",
  },
  {
    section: "SALAH POSTURE 2",
    title: "Al-Qiyam & Recitation",
    heading: "Standing posture, opening supplication, and Surah Al-Fatihah",
    description: "Recite the opening supplication (Dua al-Istiftah), seek refuge from Satan, and recite Surah Al-Fatihah followed by a short chapter or verses from the Holy Qur'an.",
    translationLabel: "Opening Supplication (Dua al-Istiftah)",
    translation: "O Allah, Glorified, praise-worthy and blessed is Thy Name and exalted Thy Majesty, and there is no deity worthy of worship except Thee.",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ، وَلا إِلَهَ غَيْرُكَ",
    imageURL: SalahQiyamImage,
    tip: "Keep your eyes focused on the spot where you will prostrate (Sajjdah).",
  },
  {
    section: "SALAH POSTURE 3",
    title: "Ruku (Bowing)",
    heading: "Bowing down with back parallel to the ground",
    description: "Bend down at the waist, placing palms of hands with fingers spread over knees. Back is parallel to ground, and eyes look down directly ahead.",
    translationLabel: "Recitation in Ruku (3 Times)",
    translation: "Glory to my Lord, the most magnificent.",
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    imageURL: SalahRukuImage,
    tip: "Ensure your back is flat enough that a glass of water balanced on it would not spill.",
  },
  {
    section: "SALAH POSTURE 4",
    title: "Qiyam / Rising from Ruku",
    heading: "Standing upright after bowing",
    description: "While rising from Ruku, declare praise to Allah, then return to the standing position with arms at your side for six seconds before moving to prostration.",
    translationLabel: "Praises upon Rising",
    translation: "Allah has heard all who praise Him. Our Lord: Praise be to Thee.",
    arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا لَكَ الْحَمْدُ",
    imageURL: SalahAfterRukuImage,
    tip: "Hold this standing balance steadily before saying Allah Akbar for Sajjdah.",
  },
  {
    section: "SALAH POSTURE 5",
    title: "Sajjdah (Prostration)",
    heading: "Prostrating with seven body parts touching the ground",
    description: "Go down to a kneeling position, lowering slowly onto knees, then touch the head upon the ground so that the seven body parts are in contact: forehead, two palms, two knees, and toes of both feet.",
    translationLabel: "Recitation in Sajjdah (3 Times)",
    translation: "Glory to my Lord, the most high.",
    arabic: "سُبْحَانَ رَبِّيَ الأَعْلَى",
    imageURL: SalahSajdahImage,
    tip: "Ensure your elbows are raised off the ground and your arms are kept away from your sides.",
  },
  {
    section: "SALAH POSTURE 6",
    title: "Quood (Sitting between Prostrations)",
    heading: "Sitting upright between the two prostrations",
    description: "Rise from the Sajjdah position by saying Allah Akbar and assume the sitting posture for six seconds before moving to the second prostration.",
    translationLabel: "Sitting Supplication",
    translation: "O Allah, forgive me, have mercy on me, and guide me.",
    arabic: "رَبِّ اغْفِرْ لِي وَرْحَمْنِي وَاهْدِنِي",
    imageURL: SalahQuoodImage,
    tip: "Rest your hands calmly on your thighs while seated upright.",
  },
  {
    section: "SALAH POSTURE 7",
    title: "Second Sajjdah",
    heading: "Performing the second prostration",
    description: "Go down to a kneeling position once more, touching the same seven body parts to the ground identically to the first prostration.",
    translationLabel: "Recitation in Sajjdah (3 Times)",
    translation: "Glory to my Lord, the most high.",
    arabic: "سُبْحَانَ رَبِّيَ الأَعْلَى",
    imageURL: SalahSajjitha2Image,
    tip: "Maintain complete tranquility and focus during prostration.",
  },
  {
    section: "SALAH POSTURE 8",
    title: "Tashahhud & Final Salutation",
    heading: "Sitting for testimony, blessings, and closing salam",
    description: "Recite At-Tahiyyat, the Shahada, and Darud for the Prophet, concluding the prayer by turning your face to the right and left saying the salam.",
    translationLabel: "Concluding Salam",
    translation: "Peace be on you and Allah's blessings.",
    arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
    imageURL: SalahTashajjudImage,
    tip: "Turn your head completely so your cheek is visible to anyone behind you when making the salam.",
  },
];

const stepTitles = salahSteps.map((step) => step.title);

export default function Salah() {
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const title = stepTitles[activeStep];
  const currentStep = salahSteps[activeStep];

  function goToStep(step: number) {
    setActiveStep(Math.max(0, Math.min(step, stepTitles.length - 1)));
  }

  return (
    <div className="page purification-page">
      <div className="purification-heading">
        <div className="page-heading">
          <span className="section-label">Islam in Practice</span>
          <h1>Namaz</h1>
          <p>Practical guidance for Salah and prayer.</p>
        </div>
        <span className="purification-count">{stepTitles.length} Slides</span>
      </div>

      <div className="purification-layout">
        <aside className="purification-steps" aria-label="Purification lesson steps">
          <div className="purification-steps-heading">
            <h2>
              {/* <FontAwesomeIcon icon={faDroplet} aria-hidden="true" /> */}
              All 8 Salah Steps
            </h2>
            {/* <span>{stepTitles.length} Slides</span> */}
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