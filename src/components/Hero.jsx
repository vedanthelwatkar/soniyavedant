import React, { useEffect, useMemo, useState } from "react";
import { CONFIG } from "../config.js";
import { FiShare2 } from "react-icons/fi";

const emoji = {
  mail: "\u{1F48C}",
  heart: "\u2764\uFE0F",
  couple: "\u{1F491}",
  chat: "\u{1F4AC}",
  sparkles: "\u2728",
};

const pad = (value) => String(value).padStart(2, "0");

const getAgeSince = (date) => {
  const now = new Date();
  const diff = Math.max(0, now.getTime() - date.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const days = Math.floor(totalSeconds / 86400);
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  return { years, months, days: days % 30, hours, minutes, seconds };
};

function TimerCard({ title, date, subtitle, onShare }) {
  const [age, setAge] = useState(getAgeSince(date));

  useEffect(() => {
    const timer = setInterval(() => setAge(getAgeSince(date)), 1000);
    return () => clearInterval(timer);
  }, [date]);

  return (
    <div className="flex flex-col justify-between flex-1 rounded-[1.75rem] border border-white/80 bg-white/85 p-4 shadow-xl shadow-pink-100/70 backdrop-blur sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-black text-pink-950">{title}</h3>
        {onShare && (
          <button
            className="rounded-full bg-pink-50 p-2 text-pink-600 shadow-sm transition hover:bg-pink-100"
            type="button"
            onClick={onShare}
            aria-label="Share this page"
          >
            <FiShare2 />
          </button>
        )}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-6">
        {Object.entries(age).map(([key, value]) => (
          <div
            key={key}
            className="rounded-2xl bg-pink-50 px-2 py-3 text-center"
          >
            <span className="block text-xl font-extrabold leading-none text-gray-950 sm:text-2xl">
              {pad(value)}
            </span>
            <small className="mt-1 block text-[0.7rem] font-semibold text-gray-500 sm:text-xs">
              {key}
            </small>
          </div>
        ))}
      </div>
      {subtitle && (
        <p className="mt-4 rounded-2xl bg-pink-50 px-4 py-3 text-sm font-semibold leading-relaxed text-pink-700">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Hero() {
  const [copyMessage, setCopyMessage] = useState("");

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyMessage(`Link copied ${emoji.mail}`);
      setTimeout(() => setCopyMessage(""), 2200);
    } catch {
      setCopyMessage(`Clipboard said no. Rude. ${emoji.heart}`);
      setTimeout(() => setCopyMessage(""), 2200);
    }
  };

  const togetherSince = useMemo(() => CONFIG.datingStartDate, []);
  const talkingSince = useMemo(() => CONFIG.talkingStartDate, []);

  return (
    <header className="relative overflow-hidden px-4 py-12 sm:px-6 md:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#ffe4ef,transparent_34%),linear-gradient(135deg,#fff7fb,#ffeaf1)]" />
      <div className="mx-auto max-w-6xl">
        <p className="font-black uppercase tracking-[0.18em] text-pink-500">
          certified yap archive
        </p>
        <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight text-gray-950 sm:text-6xl">
          Soniya x Vedant
        </h1>
        <p className="mt-3 max-w-3xl text-lg font-semibold leading-relaxed text-gray-700 sm:text-2xl">
          Soft launch? Bro this is the whole production build.
          <span className="emoji ml-2">{emoji.sparkles}</span>
        </p>
        <p className="mt-2 max-w-2xl text-sm font-medium text-pink-700 sm:text-base">
          A tiny website for a very dramatic chat history. Respectfully, we were
          not normal about this.
        </p>

        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          <TimerCard
            title={`Together since ${emoji.couple}`}
            date={togetherSince}
            subtitle="I just wish this timer never ends"
            onShare={handleShare}
          />
          <TimerCard
            title={`Been talking since ${emoji.chat}`}
            date={talkingSince}
            subtitle="Sleep schedule got humbled immediately."
          />
        </div>
        {copyMessage && (
          <div className="mt-4 inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-pink-700 shadow-sm">
            {copyMessage}
          </div>
        )}
      </div>
    </header>
  );
}

export default React.memo(Hero);
