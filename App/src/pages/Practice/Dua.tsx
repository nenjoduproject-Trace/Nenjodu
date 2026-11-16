import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHandsBubbles,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useGlobalLoading } from "../../context/LoadingContext";


const duaSteps = [
  {
    section: "DUA / SUPPLICATION",
    title: "The Greatness of Allah",
    heading: "All Praise Belongs to Allah",
    description:
      "All praise belongs to Allah, the Lord of all the worlds, who created and sustains everything.",
    translationLabel: "Transliteration",
    translation: "Alhamdu lillahi Rabbil Alameen",
    arabic: "اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَ",
    tip: "",
  },
  {
    section: "DUA / SUPPLICATION",
    title: "Salawat (Blessings) upon Muhammad (sa)",
    heading: "Sending Blessings Upon Prophet Muhammad ﷺ",
    description:
      "O Allah, send Your blessings, mercy, peace, and grace upon our master Muhammad ﷺ and upon the family of our master Muhammad ﷺ.",
    translationLabel: "Transliteration",
    translation:
      "Allahumma Salli Ala Sayyidina Muhammadin Wa Ala Aali Sayyidina Muhammadin Wa Barik Wa Sallim",
    arabic:
      "اَللّٰهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَّعَلَى اٰلِ سَيِّدِنَا مُحَمَّدٍ وَّبَارِكْ وَسَلِّمْ",
    tip: "",
  },
  {
    section: "DUA / SUPPLICATION",
    title: "Wrongs we have committed against ourselves",
    heading: "Supplication for Forgiveness and Mercy",
    description:
      "Our Lord, we have wronged ourselves. If You do not forgive us and have mercy upon us, we will surely be among the losers.",
    translationLabel: "Transliteration",
    translation:
      "Rabbana Zalamna Anfusana Wa Illam Taghfir Lana Wa Tarhamna Lanakoonanna Minal Khasireen",
    arabic:
      "رَبَّنَا ظَلَمْنَا اَنْفُسَنَا وَاِنْ لَّمْ تَغْفِرْلَنَا وَتَرْحَمْنَا لَنَكُوْنَنَّ مِنَ الْخٰسِرِيْنَ",
    tip: "",
  },
  {
    section: "DUA / SUPPLICATION",
    title: "A prayer to guide hearts onto the right path",
    heading: "Supplication for Steadfastness",
    description:
      "Our Lord, do not let our hearts deviate after You have guided us. Grant us mercy from Yourself. Indeed, You are the Bestower.",
    translationLabel: "Transliteration",
    translation:
      "Rabbana La Tuzigh Quloobana Ba'da Idh Hadaytana Wa Hab Lana Min Ladunka Rahmatan Innaka Antal Wahhab",
    arabic:
      "رَبَّنَا لَا تُزِغْ قُلُوْبَنَا بَعْدَ اِذْ هَدَيْتَنَا وَهَبْ لَنَامِنْ لَّدُنْكَ رَحْمَةً اِنَّكَ اَنْتَ الْوَهَّابُ",
    tip: "",
  },
  {
    section: "DUA / SUPPLICATION",
    title: "Declaring the exalted attributes of Allah",
    heading: "Supplication for Peace",
    description:
      "O Allah, You are Peace, and from You comes peace. Blessed are You, O Possessor of Majesty and Honour.",
    translationLabel: "Transliteration",
    translation:
      "Allahumma Antas Salam Wa Minkas Salam Tabarakta Ya Dhal Jalali Wal Ikram",
    arabic:
      "اَللّٰهُمَّ اَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَاالْجَلَالِ وَالْاِكْرَامِ",
    tip: "",
  },
  {
    section: "DUA / SUPPLICATION",
    title: "Seeking guidance toward righteousness",
    heading: "Supplication for Help in Worship",
    description:
      "O Allah, help me to remember You, to thank You, and to worship You in the best manner.",
    translationLabel: "Transliteration",
    translation:
      "Allahumma Ainni Ala Dhikrika Wa Shukrika Wa Husni Ibadatik",
    arabic:
      "اَللّٰهُمَّ اَعِنِّىْ عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    tip: "",
  },
  {
    section: "DUA / SUPPLICATION",
    title: "Seeking protection from the torment of Hellfire",
    heading: "Supplication for Forgiveness and Protection from Hellfire",
    description:
      "Our Lord, indeed we have believed. So forgive our sins and protect us from the punishment of the Fire.",
    translationLabel: "Transliteration",
    translation:
      "Rabbana Innana Aamanna Faghfir Lana Dhunoobana Wa Qina Adhabannar",
    arabic:
      "رَبَّنَا اِنَّنَا اٰمَنَّا فَاغْفِرْلَنَا ذُنُوْبَنَا وَقِنَا عَذَابَ النَّارِ",
    tip: "",
  },
  {
    section: "DUA / SUPPLICATION",
    title: "Supplications for one’s family",
    heading: "Supplication for Righteous Families",
    description:
      "Our Lord, grant us from among our spouses and offspring comfort to our eyes, and make us leaders for the righteous.",
    translationLabel: "Transliteration",
    translation:
      "Rabbana Hab Lana Min Azwajina Wa Dhurriyyatina Qurrata A'yunin Waj'alna Lil Muttaqina Imama",
    arabic:
      "رَبَّنَا هَبْ لَنَا مِنْ اَزْوَاجِنَا وَذُرِّيّٰتِنَا قُرَّةَ اَعْيُنٍ وَّاجْعَلْنَا لِلْمُتَّقِيْنَ اِمَامًا",
    tip: "",
  },
  {
    section: "DUA / SUPPLICATION",
    title: "Declaring the unique attributes of Allah",
    heading: "Supplication for Forgiveness and Mercy",
    description:
      "My Lord, forgive and have mercy. You are the Best of those who show mercy.",
    translationLabel: "Transliteration",
    translation: "Rabbi Ghfir Warham Wa Anta Khairur Rahimeen",
    arabic:
      "رَبِّ اغْفِرْوَارْحَمْ وَاَنْتَ خَيْرُ الرّٰحِمِيْنَ",
    tip: "",
  },
  {
    section: "DUA / SUPPLICATION",
    title: "Seeking forgiveness for sins and mistakes",
    heading: "Supplication for Protection from Mistakes",
    description:
      "Our Lord, do not hold us accountable if we forget or make a mistake.",
    translationLabel: "Transliteration",
    translation: "Rabbana La Tuakhidhna In Naseena Aw Akhta'na",
    arabic:
      "رَبَّنَا لَا تُؤَاخِذْنَا اِنْ نَّسِيْنَا اَوْ اَخْطَانَا",
    tip: "",
  },
  {
    section: "DUA / SUPPLICATION",
    title: "Bearing burdens",
    heading: "Supplication for Relief from Heavy Burdens",
    description:
      "Our Lord, do not place upon us a burden like the one You placed upon those before us.",
    translationLabel: "Transliteration",
    translation:
      "Rabbana Wa La Tahmil Alayna Isran Kama Hamaltahu Alalladhina Min Qablina",
    arabic:
      "رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا اِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِيْنَ مِنْ قَبْلِنَا",
    tip: "",
  },
  {
    section: "DUA / SUPPLICATION",
    title: "Seeking victory against those who reject the truth",
    heading: "Supplication for Forgiveness, Mercy, and Victory",
    description:
      "Our Lord, do not burden us with what we cannot bear. Pardon us, forgive us, and have mercy upon us. You are our Protector, so help us against the disbelieving people.",
    translationLabel: "Transliteration",
    translation:
      "Rabbana Wa La Tuhammilna Ma La Taqata Lana Bihi Wa'fu Anna Waghfir Lana Warhamna Anta Mawlana Fansurna Alal Qawmil Kafireen",
    arabic:
      "رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهٖ وَاعْفُ عَنَّا وَاغْفِرْلَنَا وَارْحَمْنَا اَنْتَ مَوْلٰنَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكٰفِرِيْنَ",
    tip: "",
  },
  {
    section: "DUA / SUPPLICATION",
    title: "For goodness in this world and the Hereafter",
    heading: "Supplication for Good in This World and the Hereafter",
    description:
      "Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
    translationLabel: "Transliteration",
    translation:
      "Rabbana Atina Fid Dunya Hasanatan Wa Fil Akhirati Hasanatan Wa Qina Adhabannar",
    arabic:
      "رَبَّنَا اٰتِنَا فِى الدُّنْيَا حَسَنَةً وَّفِى الْاٰخِرَةِ حَسَنَةً وَّقِنَا عَذَابَ النَّارِ",
    tip: "",
  },
  {
    section: "DUA / SUPPLICATION",
    title: "Declaring the purity of Allah",
    heading: "Closing Supplication and Praise",
    description:
      "Glory be to your Lord, the Lord of Honour, above what they describe. Peace be upon the Messengers. And all praise belongs to Allah, the Lord of all the worlds.",
    translationLabel: "Transliteration",
    translation:
      "Subhana Rabbika Rabbil Izzati Amma Yasifoon Wa Salamun Alal Mursaleen Walhamdu Lillahi Rabbil Alameen",
    arabic:
      "سُبْحٰنَ رَبِّكَ رَبِّ الْعِزَّةِ عَمَّا يَصِفُوْنَ وَسَلٰمٌ عَلَى الْمُرْسَلِيْنَ وَالْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَ",
    tip: "",
  },
];

const dayByDayDuas = [
  {
    section: "DAILY DUA / LESSON",
    title: "Entering the Toilet",
    heading: "Supplication Before Entering the Toilet",
    description:
      "In the name of Allah. O Allah, indeed, I seek refuge in You from the male and female devils.",
    translationLabel: "Transliteration",
    translation:
      "Bismillahi Allahumma Inni A'udhu Bika Minal Khubuthi Wal Khabaa'ith",
    arabic:
      "بِسْمِ اللهِ اللّٰهُمَّ اِنِّىْ اَعُوْذُبِكَ مِنَ الْخُبْثِ وَالْخَبَائِثِ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "Leaving the Toilet",
    heading: "Supplication After Leaving the Toilet",
    description:
      "I seek Your forgiveness. All praise belongs to Allah, who removed harm from me and granted me well-being.",
    translationLabel: "Transliteration",
    translation:
      "Ghufranaka Alhamdulillahil Ladhi Adh-haba Anniyal Adha Wa A'afani",
    arabic:
      "غُفْرَانَكَ الْحَمْدُ لِلّٰهِ الَّذِىْ اَذْهَبَ عَنِّى الْاَذٰى وَعَافَانِىْ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "Before Performing Ablution",
    heading: "Supplication Before Wudu",
    description:
      "In the name of Allah. O Allah, forgive my sins, make my home spacious, and bless my provision.",
    translationLabel: "Transliteration",
    translation:
      "Bismillahi Allahumma Ghfir Li Dhanbi Wa Wassi' Li Fi Dari Wa Barik Li Fi Rizqi",
    arabic:
      "بِسْمِ اللَّهِ اللَّهُمَّ اغْفِرْلِي ذَنْبِي وَوَسِّعْ لِي فِي دَارِي وَبَارِكْ لِي فِي رِزْقِي",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "After Performing Ablution",
    heading: "Supplication After Wudu",
    description:
      "I bear witness that there is no deity worthy of worship except Allah alone, without any partner. And I bear witness that Muhammad is His servant and Messenger. O Allah, make me among those who constantly repent and make me among those who purify themselves.",
    translationLabel: "Transliteration",
    translation:
      "Ash-hadu An La Ilaha Illallahu Wahdahu La Sharika Lahu Wa Ash-hadu Anna Muhammadan Abduhu Wa Rasuluhu Allahummaj'alni Minat Tawwabeena Waj'alni Minal Mutatah-hireen",
    arabic:
      "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "Entering the Mosque",
    heading: "Supplication When Entering the Mosque",
    description:
      "O Allah, open for me the gates of Your mercy.",
    translationLabel: "Transliteration",
    translation: "Allahummaftah Li Abwaba Rahmatik",
    arabic:
      "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "Leaving the Mosque",
    heading: "Supplication When Leaving the Mosque",
    description:
      "O Allah, indeed, I ask You for Your bounty and mercy.",
    translationLabel: "Transliteration",
    translation: "Allahumma Inni As'aluka Min Fadhlik Wa Rahmatik",
    arabic:
      "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "Before Eating",
    heading: "Supplication Before Eating",
    description:
      "O Allah, bless this food for us and provide us with something better than it.",
    translationLabel: "Transliteration",
    translation:
      "Allahumma Barik Lana Fihi Wa At'imna Khairan Minhu",
    arabic:
      "اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَأَطْعِمْنَا خَيْرًا مِنْهُ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "Beginning to Eat",
    heading: "Supplication When Starting a Meal",
    description:
      "In the name of Allah, and with the blessings of Allah, I eat.",
    translationLabel: "Transliteration",
    translation: "Bismillahi Wa Ala Barakatillah",
    arabic:
      "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "If You Forget to Say Bismillah",
    heading: "Supplication Upon Remembering During a Meal",
    description:
      "In the name of Allah at its beginning and at its end.",
    translationLabel: "Transliteration",
    translation: "Bismillahi Awwalahu Wa Akhirahu",
    arabic:
      "بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "After Eating",
    heading: "Supplication After Finishing a Meal",
    description:
      "All praise belongs to Allah, who fed me, gave me drink, and made me one of the Muslims.",
    translationLabel: "Transliteration",
    translation:
      "Alhamdulillahil Ladhi At'amani Wa Saqani Wa Ja'alani Minal Muslimeen",
    arabic:
      "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي وَسَقَانِي وَجَعَلَنِي مِنَ الْمُسْلِمِينَ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "After Eating at a Guest's Home",
    heading: "Supplication for the Host",
    description:
      "O Allah, bless them in what You have provided for them, forgive them, and have mercy upon them.",
    translationLabel: "Transliteration",
    translation:
      "Allahumma Barik Lahum Fima Razaqtahum Waghfir Lahum Warhamhum",
    arabic:
      "اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "Before Sleeping",
    heading: "Supplication Before Going to Sleep",
    description:
      "O Allah, in Your name I die and I live.",
    translationLabel: "Transliteration",
    translation: "Allahumma Bismika Amutu Wa Ahya",
    arabic:
      "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "After Waking Up",
    heading: "Supplication Upon Waking from Sleep",
    description:
      "All praise belongs to Allah, who gave us life after causing us to die, and to Him is the resurrection.",
    translationLabel: "Transliteration",
    translation:
      "Alhamdulillahil Ladhi Ahyana Ba'da Ma Amatana Wa Ilaihin Nushur",
    arabic:
      "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "Entering the Home",
    heading: "Supplication When Entering the Home",
    description:
      "O Allah, I ask You for the goodness of entering and the goodness of leaving. In the name of Allah, we enter, and in the name of Allah, we leave. And upon Allah, our Lord, we place our trust.",
    translationLabel: "Transliteration",
    translation:
      "Allahumma Inni As'aluka Khairal Mawlaji Wa Khairal Makhraji Bismillahi Walajna Wa Bismillahi Kharajna Wa Alallahi Rabbina Tawakkalna",
    arabic:
      "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "Leaving the Home",
    heading: "Supplication When Leaving the Home",
    description:
      "In the name of Allah, I place my trust in Allah. There is no power and no strength except through Allah.",
    translationLabel: "Transliteration",
    translation:
      "Bismillahi Tawakkaltu Alallah La Hawla Wa La Quwwata Illa Billah",
    arabic:
      "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "Wearing Clothes",
    heading: "Supplication When Wearing Clothes",
    description:
      "All praise belongs to Allah, who clothed me with this garment and provided it for me without any power or strength from myself.",
    translationLabel: "Transliteration",
    translation:
      "Alhamdu Lillahil Ladhi Kasani Hatha Wa Razaqanihi Min Ghairi Hawlin Minni Wa La Quwwah",
    arabic:
      "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "Looking in the Mirror",
    heading: "Supplication When Looking in the Mirror",
    description:
      "O Allah, just as You have made my physical appearance beautiful, make my character beautiful as well.",
    translationLabel: "Transliteration",
    translation:
      "Allahumma Anta Hassanta Khalqi Fahassin Khuluqi",
    arabic:
      "اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "When It Rains",
    heading: "Supplication During Rain",
    description:
      "O Allah, send down upon us rain that benefits us and does not harm us.",
    translationLabel: "Transliteration",
    translation:
      "Allahumma Anzil Alayna Al-Ghaitha Alladhi Yanfa'una Wa La Yadurruna",
    arabic:
      "اللَّهُمَّ أَنْزِلْ عَلَيْنَا الْغَيْثَ الَّذِي يَنْفَعُنَا وَلَا يَضُرُّنَا",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "After Sneezing",
    heading: "Words to Say After Sneezing",
    description: "All praise belongs to Allah.",
    translationLabel: "Transliteration",
    translation: "Alhamdulillah",
    arabic: "الْحَمْدُ لِلَّهِ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "When Someone Else Sneezes",
    heading: "Reply to Someone Who Sneezes",
    description: "May Allah have mercy upon you.",
    translationLabel: "Transliteration",
    translation: "Yarhamukallah",
    arabic: "يَرْحَمُكَ اللَّهُ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "When Hearing Something Amazing",
    heading: "Words of Glorification",
    description:
      "Glory be to Allah. Allah is free from all imperfections and weaknesses.",
    translationLabel: "Transliteration",
    translation: "Subhanallah",
    arabic: "سُبْحَانَ اللَّهِ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "Seeking Forgiveness",
    heading: "Words of Seeking Forgiveness",
    description: "I seek forgiveness from Allah.",
    translationLabel: "Transliteration",
    translation: "Astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "When Experiencing a Death or Calamity",
    heading: "Supplication at the Time of Loss",
    description:
      "Indeed, we belong to Allah, and indeed, to Him we shall return.",
    translationLabel: "Transliteration",
    translation: "Inna Lillahi Wa Inna Ilaihi Raji'un",
    arabic:
      "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "When Someone Does Good to You",
    heading: "Supplication to Thank Someone",
    description: "May Allah reward you with goodness.",
    translationLabel: "Transliteration",
    translation: "Jazakallahu Khairan",
    arabic: "جَزَاكَ اللَّهُ خَيْرًا",
    tip: "",
  },
  {
    section: "DAILY DUA / LESSON",
    title: "When Remembering Something That Happened",
    heading: "Acknowledging Allah's Will",
    description: "As Allah has willed; it happened by the will of Allah.",
    translationLabel: "Transliteration",
    translation: "Masha Allah",
    arabic: "مَا شَاءَ اللَّهُ",
    tip: "",
  },
];

export default function Fasting() {
  const { completeLoading, showLoadingFor } = useGlobalLoading();
  const [duaMode] = useState<"prayer" | "daily">(() => {
    const savedMode = window.sessionStorage.getItem("dua-mode");
    if (savedMode === "prayer" || savedMode === "daily") {
      window.sessionStorage.removeItem("dua-mode");
      return savedMode;
    }
    return "prayer";
  });
  const [activeStep, setActiveStep] = useState(0);
  const currentDuas = duaMode === "prayer" ? duaSteps : dayByDayDuas;
  const stepTitles = currentDuas.map((step) => step.title);
  const isFirstStep = activeStep === 0;
  const title = stepTitles[activeStep];
  const currentStep = currentDuas[activeStep];

  useEffect(() => {
    if (window.sessionStorage.getItem("dua-mode-loading") !== "true") {
      return;
    }

    const translationCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("googtrans="));
    const languageCode = translationCookie?.split("=")[1]?.split("/").filter(Boolean).at(-1);
    if (!languageCode || languageCode === "en") {
      completeLoading();
      return;
    }

    let quietTimer: number | undefined;
    const fallbackTimer = window.setTimeout(() => {
      console.error("Google Translate did not finish translating the dua page.");
      completeLoading();
    }, 20000);

    const checkTranslation = () => {
      const isTranslated = document.documentElement.classList.contains("translated-ltr")
        || document.documentElement.classList.contains("translated-rtl");
      if (!isTranslated) {
        return;
      }

      window.clearTimeout(quietTimer);
      quietTimer = window.setTimeout(() => {
        window.clearTimeout(fallbackTimer);
        observer.disconnect();
        completeLoading();
      }, 800);
    };
    const observer = new MutationObserver(checkTranslation);

    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });
    checkTranslation();

    return () => {
      observer.disconnect();
      window.clearTimeout(quietTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, [completeLoading]);

  function goToStep(step: number) {
    setActiveStep(Math.max(0, Math.min(step, stepTitles.length - 1)));
  }

  function selectDuaMode(mode: "prayer" | "daily") {
    if (mode === duaMode) {
      return;
    }

    showLoadingFor();
    window.sessionStorage.setItem("dua-mode", mode);
    window.sessionStorage.setItem("dua-mode-loading", "true");
    window.setTimeout(() => window.location.reload(), 100);
  }

  return (
    <div className="page purification-page">
      <div className="purification-heading">
        <div className="page-heading">
          <span className="section-label">Islam in Dua</span>
          <h1>Dua</h1>
          <p>Practical guidance for reciting supplications.</p>
        </div>
        <div className="dua-mode-toggle" role="group" aria-label="Dua category">
          <button
            type="button"
            aria-pressed={duaMode === "prayer"}
            className={duaMode === "prayer" ? "active" : ""}
            onClick={() => selectDuaMode("prayer")}
          >
            Prayer Duas
          </button>
          <button
            type="button"
            aria-pressed={duaMode === "daily"}
            className={duaMode === "daily" ? "active" : ""}
            onClick={() => selectDuaMode("daily")}
          >
            Daily Activity Duas
          </button>
        </div>
      </div>

      <div className="purification-layout">
        <aside className="purification-steps" aria-label="Dua list">
          <div className="purification-steps-heading">
            <h2>{duaMode === "prayer" ? "Prayer Duas" : "Daily Activity Duas"}</h2>
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
                    Dua {index + 1}
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
