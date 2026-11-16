import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Ask from "../pages/Ask/Ask";
import Quran from "../pages/Quran/Quran";
import Search from "../pages/Search/Search";
import About from "../pages/About/About";
import Admin from "../pages/Admin/Admin";

import Explore from "../pages/Explore/Explore";
import Topic from "../pages/Explore/Topic";
import Article from "../pages/Explore/Article";
import Belief from "../pages/Explore/Belief";
import BeliefBook from "../pages/Explore/BeliefBook";


import Practice from "../pages/Practice/Practice";
import Purification from "../pages/Practice/Purification";
import Salah from "../pages/Practice/Salah";
import Janaza from "../pages/Practice/Janaza";
import Fasting from "../pages/Practice/Fasting";
import Masjidh from "../pages/Practice/Masjidh";
import Zakat from "../pages/Practice/Zakat";
import Kalimah from "../pages/Practice/Kalimah";
import Dua from "../pages/Practice/Dua";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/topic/:slug" element={<Topic />} />
        <Route path="/Explore/article" element={<Article />} />
        <Route path="/Explore/belief" element={<Belief />} />
        <Route path="/belief/book/:bookId" element={<BeliefBook />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/Practice/purification" element={<Purification />} />
        <Route path="/Practice/salah" element={<Salah />} />
        <Route path="/Practice/janaza" element={<Janaza />} />
        <Route path="/Practice/fasting" element={<Fasting />} />
        <Route path="/Practice/masjidh" element={<Masjidh />} />
        <Route path="/Practice/zakat" element={<Zakat />} />
        <Route path="/Practice/kalimah" element={<Kalimah />} />
        <Route path="/Practice/dua" element={<Dua />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/quran" element={<Quran />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
}