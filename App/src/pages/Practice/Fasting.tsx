import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHandsBubbles,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const fastingSteps = [
  {
    section: "FASTING / LESSON",
    title: "Niyyah (Intention)",
    heading: "Making the intention to fast for Allah",
    description:
      "Make a sincere intention in your heart to observe the fast for the sake of Allah. Fasting during Ramadan is an act of worship that includes abstaining from food, drink, and marital relations from dawn until sunset. The detailed timing of the intention may differ according to the Islamic school followed.",
    translationLabel: "Arabic Transliteration",
    translation: "Nawaytu sawma ghadin lillahi ta'ala",
    arabic: "نَوَيْتُ صَوْمَ غَدٍ لِلَّهِ تَعَالَى",
    tip: "Intention is an act of the heart. The specific verbal formula above is an example, not a universally required wording.",
  },
  {
    section: "FASTING / LESSON",
    title: "Sahur (Pre-Dawn Meal)",
    heading: "Preparing for the fast before dawn",
    description:
      "Eat the pre-dawn meal, known as Sahur, before the beginning of Fajr. Choose nourishing foods, drink sufficient water, and avoid overeating. Sahur is a blessed practice that helps prepare the body for the day's fast.",
    translationLabel: "Arabic Transliteration",
    translation: "Tasahharu fa-inna fis-sahuri barakah",
    arabic: "تَسَحَّرُوا فَإِنَّ فِي السَّحُورِ بَرَكَةً",
    tip: "Do not delay Fajr beyond its prescribed time. Finish eating and drinking by the start of dawn.",
  },
  {
    section: "FASTING / LESSON",
    title: "Beginning the Fast",
    heading: "Starting the fast at dawn",
    description:
      "Begin fasting at the prescribed time of Fajr, when true dawn begins. From this time until sunset, abstain from food, drink, and other acts that invalidate the fast. Follow a reliable local prayer timetable for the correct times.",
    translationLabel: "Key Term",
    translation: "Fajr — the dawn prayer and the beginning of the daily fasting period.",
    arabic: "الْفَجْر",
    tip: "Check your local timetable rather than estimating dawn by clock time alone.",
  },
  {
    section: "FASTING / LESSON",
    title: "Guarding the Tongue",
    heading: "Practising good character while fasting",
    description:
      "Fasting is not limited to abstaining from food and drink. Avoid lying, backbiting, insulting others, arguing, and harmful speech. Practise patience, honesty, kindness, and self-control throughout the day.",
    translationLabel: "Arabic Transliteration",
    translation: "Inni sa'im — Indeed, I am fasting.",
    arabic: "إِنِّي صَائِمٌ",
    tip: "When faced with anger or provocation, respond calmly and remember the spiritual purpose of fasting.",
  },
  {
    section: "FASTING / LESSON",
    title: "Reciting the Qur'an",
    heading: "Strengthening your connection with the Qur'an",
    description:
      "Dedicate time during Ramadan to reciting the Qur'an, understanding its meanings, and reflecting on its guidance. Set a realistic daily reading goal and try to apply the lessons learned in your everyday life.",
    translationLabel: "Arabic Transliteration",
    translation: "Iqra' — Read or recite.",
    arabic: "اقْرَأْ",
    tip: "Consistency and reflection are more beneficial than rushing through a reading goal without understanding.",
  },
  {
    section: "FASTING / LESSON",
    title: "Giving Charity",
    heading: "Sharing blessings with those in need",
    description:
      "Ramadan is an opportunity to give charity, support struggling families, feed those in need, and help the wider community. Muslims may give voluntary charity throughout Ramadan and should fulfil any Zakat obligations that apply to them.",
    translationLabel: "Arabic Transliteration",
    translation: "Sadaqah — Voluntary charity given for the sake of Allah.",
    arabic: "صَدَقَة",
    tip: "Give sincerely and respectfully, protecting the dignity and privacy of those receiving assistance.",
  },
  {
    section: "FASTING / LESSON",
    title: "Avoiding Invalidating Acts",
    heading: "Protecting the validity of the fast",
    description:
      "Learn which actions invalidate the fast and avoid them during fasting hours. Deliberately eating or drinking generally invalidates the fast. Other situations, including illness, medication, forgetfulness, and accidental actions, may have specific rulings depending on the circumstances and scholarly school.",
    translationLabel: "Key Reminder",
    translation: "Learn the rules of fasting from reliable Islamic guidance.",
    arabic: "",
    tip: "If you accidentally eat or drink out of forgetfulness, the general ruling is to continue the fast. Ask a qualified scholar about more complicated cases.",
  },
  {
    section: "FASTING / LESSON",
    title: "Iftar (Breaking the Fast)",
    heading: "Breaking the fast at sunset",
    description:
      "Break the fast when the sun has set and the prescribed time for Maghrib begins. It is a Sunnah to break the fast with fresh or dried dates when available, or with water. Eat moderately and remember Allah with gratitude.",
    translationLabel: "Arabic Transliteration",
    translation: "Dhahaba al-zama'u wabtallatil-'urooqu wa thabatal-ajru in sha Allah.",
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    tip: "Confirm sunset using a reliable local timetable and avoid delaying Iftar unnecessarily.",
  },
  {
    section: "FASTING / LESSON",
    title: "Performing the Prayers",
    heading: "Maintaining the five daily prayers",
    description:
      "Continue to observe all five obligatory prayers during Ramadan. Attend congregational prayers when possible and consider performing Taraweeh during the nights of Ramadan according to your circumstances and established Islamic guidance.",
    translationLabel: "Key Terms",
    translation: "Salah — Prayer. Taraweeh — Special night prayers commonly performed during Ramadan.",
    arabic: "صَلَاة",
    tip: "Do not let meals, sleep, work, or entertainment cause you to neglect obligatory prayers.",
  },
  {
    section: "FASTING / LESSON",
    title: "Laylat al-Qadr",
    heading: "Seeking the Night of Decree",
    description:
      "Devote extra time to worship during the last ten nights of Ramadan, especially the odd-numbered nights. Increase your prayers, Qur'an recitation, remembrance of Allah, and supplications while seeking the blessings of Laylat al-Qadr.",
    translationLabel: "Arabic Transliteration",
    translation: "Allahumma innaka 'afuwwun tuhibbul-'afwa fa'fu 'anni.",
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    tip: "Meaning: O Allah, You are Most Forgiving and love forgiveness, so forgive me.",
  },
  {
    section: "FASTING / LESSON",
    title: "Understanding Exemptions",
    heading: "Recognising valid reasons for not fasting",
    description:
      "Islam provides concessions in fasting for certain circumstances, including illness, travel, menstruation, and other situations described in Islamic law. Depending on the circumstance, a person may need to make up missed fasts or follow another applicable ruling.",
    translationLabel: "Important Reminder",
    translation: "Allah intends ease for you and does not intend hardship for you.",
    arabic: "يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ",
    tip: "People with health concerns should seek appropriate medical advice and consult a qualified scholar about their fasting obligations.",
  },
  {
    section: "FASTING / LESSON",
    title: "Zakat al-Fitr",
    heading: "Giving the charity associated with Eid",
    description:
      "Zakat al-Fitr is a prescribed charity associated with the end of Ramadan. It helps those in need participate in the Eid celebration. The amount, eligible recipients, and deadline should be confirmed with a reliable local Islamic authority.",
    translationLabel: "Key Term",
    translation: "Zakat al-Fitr — The charity due at the end of Ramadan under its applicable rules.",
    arabic: "زَكَاةُ الْفِطْر",
    tip: "Arrange payment early enough for it to reach eligible recipients within the required time.",
  },
  {
    section: "FASTING / LESSON",
    title: "Celebrating Eid al-Fitr",
    heading: "Completing Ramadan with gratitude",
    description:
      "When Ramadan ends and Shawwal begins according to the established moon-sighting or calendar authority followed by your community, celebrate Eid al-Fitr with gratitude to Allah. Perform the Eid prayer according to local guidance, maintain family ties, and share happiness with others.",
    translationLabel: "Arabic Greeting",
    translation: "Eid Mubarak",
    arabic: "عِيدٌ مُبَارَك",
    tip: "Celebrate responsibly, remember those in need, and continue the good habits developed during Ramadan.",
  },
];


const stepTitles = fastingSteps.map((step) => step.title);

export default function Fasting() {
  const [activeStep, setActiveStep] = useState(0);
  const isFirstStep = activeStep === 0;
  const title = stepTitles[activeStep];
  const currentStep = fastingSteps[activeStep];

  function goToStep(step: number) {
    setActiveStep(Math.max(0, Math.min(step, stepTitles.length - 1)));
  }

  return (
    <div className="page purification-page">
      <div className="purification-heading">
        <div className="page-heading">
          <span className="section-label">Islam in Fasting</span>
          <h1>Fasting</h1>
          <p>Practical guidance for observing Ramadan fasting.</p>
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
