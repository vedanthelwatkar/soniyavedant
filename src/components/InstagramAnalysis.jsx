import React, { useMemo, useState } from "react";
import { CONFIG } from "../config.js";

const emoji = {
  mail: "\u{1F48C}",
  hearts: "\u{1F495}",
  chat: "\u{1F4AC}",
  heart: "\u2764\uFE0F",
  pleading: "\u{1F979}",
  flower: "\u{1F337}",
  sparkles: "\u2728",
  calendar: "\u{1F4C5}",
  empty: "\u2661",
};

const isEmoji = (value) => {
  try {
    return /\p{Extended_Pictographic}/u.test(String(value));
  } catch {
    return false;
  }
};

const displayEmoji = (value) => (isEmoji(value) ? value : emoji.empty);

function StatCard({ id, title, value, note, icon, activeCard, onToggle, children }) {
  const active = activeCard === id;

  return (
    <button
      type="button"
      className={`group relative min-w-0 overflow-hidden rounded-[1.6rem] border p-4 text-left shadow-sm transition duration-200 sm:p-5 ${
        active
          ? "border-pink-200 bg-white shadow-lg -translate-y-0.5"
          : "border-pink-100 bg-gradient-to-br from-white via-pink-50 to-rose-50 hover:-translate-y-0.5 hover:shadow-md"
      }`}
      onClick={() => onToggle(id)}
      aria-expanded={active}
    >
      <span className="emoji absolute right-4 top-4 text-2xl opacity-90 sm:text-3xl">
        {icon}
      </span>
      <div className="relative pr-10">
        <h3 className="text-sm font-black text-pink-950 sm:text-base">{title}</h3>
        <p className="mt-2 break-words text-3xl font-extrabold leading-none tracking-tight text-gray-950 sm:text-4xl">
          {value}
        </p>
        <small className="mt-3 block text-sm font-medium leading-snug text-pink-600">
          {note}
        </small>
      </div>
      {active && <div className="mt-4 text-sm leading-relaxed text-pink-700">{children}</div>}
    </button>
  );
}

function InstagramAnalysis() {
  const stats = CONFIG.instagramStats;
  const [activeCard, setActiveCard] = useState("");

  const chartRows = useMemo(() => {
    if (!stats) return [];
    const max = Math.max(...Object.values(stats.perPerson), 1);
    return Object.entries(stats.perPerson).map(([name, value]) => ({
      name,
      value,
      width: `${Math.round((value / max) * 100)}%`,
    }));
  }, [stats]);

  const toggleCard = (id) => {
    setActiveCard((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/80 bg-white/90 p-4 shadow-xl shadow-pink-100/70 sm:p-7 md:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-100 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-rose-100 blur-2xl" />

      <div className="relative mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.14em] text-pink-500">
            DM audit {emoji.mail}
          </p>
          <h2 className="mt-1 text-3xl font-black leading-tight text-gray-950 sm:text-4xl">
            Instagram DMs Analysis
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-pink-600 sm:text-base">
            Data science, but make it mildly embarrassing.
          </p>
        </div>
        <div className="emoji hidden rounded-full bg-pink-50 px-4 py-2 text-3xl shadow-sm sm:block">
          {emoji.hearts}
        </div>
      </div>

      {!stats && (
        <div className="relative rounded-2xl border border-pink-200 bg-pink-50 p-6 text-center text-pink-700">
          <p>No Instagram stats configured in config.js.</p>
        </div>
      )}

      {stats && (
        <div className="relative grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
          <StatCard
            id="dm"
            title="Total DMs"
            value={stats.totalMessages.toLocaleString()}
            note={`${stats.fileCount} export file${stats.fileCount === 1 ? "" : "s"}`}
            icon={emoji.chat}
            activeCard={activeCard}
            onToggle={toggleCard}
          >
            <p>Every message from the exports. Normal people would call this a lot.</p>
          </StatCard>

          <StatCard
            id="love"
            title="Love messages"
            value={`${stats.loved.toLocaleString()} times`}
            note={Object.entries(stats.loveCounts)
              .map(([name, count]) => `${name}: ${count}`)
              .join(" · ")}
            icon={emoji.hearts}
            activeCard={activeCard}
            onToggle={toggleCard}
          >
            <p>Romantic words detected. The algorithm said stop blushing.</p>
          </StatCard>

          <StatCard
            id="hearts"
            title="Heart emoji count"
            value={stats.heartTotal.toLocaleString()}
            note="Warm reactions and love icons"
            icon={emoji.heart}
            activeCard={activeCard}
            onToggle={toggleCard}
          >
            <p>Heart-style emojis only. Very subtle. Extremely casual.</p>
          </StatCard>

          <StatCard
            id="missed"
            title="Miss you"
            value={stats.missed.toLocaleString()}
            note="Messages that said miss you"
            icon={emoji.pleading}
            activeCard={activeCard}
            onToggle={toggleCard}
          >
            <p>Separation anxiety, but make it searchable.</p>
          </StatCard>

          <StatCard
            id="streak"
            title="Longest streak"
            value={`${stats.longestStreak} days`}
            note="Consecutive chat days in Instagram"
            icon={emoji.flower}
            activeCard={activeCard}
            onToggle={toggleCard}
          >
            <p>Back-to-back yap days. The dedication is frankly suspicious.</p>
          </StatCard>

          <StatCard
            id="average"
            title="Average DMs per day"
            value={stats.averagePerDay}
            note={`Across ${stats.totalDays} active days`}
            icon={emoji.sparkles}
            activeCard={activeCard}
            onToggle={toggleCard}
          >
            <p>A daily average, because apparently feelings needed analytics.</p>
          </StatCard>

          <div className="rounded-[1.6rem] border border-pink-100 bg-white p-4 shadow-sm sm:p-5 md:col-span-2">
            <h3 className="mb-4 text-base font-black text-pink-950 sm:text-lg">
              DMs per person
            </h3>
            <div className="space-y-4">
              {chartRows.map((row) => (
                <div key={row.name} className="grid gap-2 sm:grid-cols-[120px_1fr_auto] sm:items-center">
                  <span className="text-sm font-bold text-pink-800 sm:text-base">
                    {row.name}
                  </span>
                  <div className="relative h-3 overflow-hidden rounded-full bg-pink-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pink-300 via-rose-400 to-pink-600"
                      style={{ width: row.width }}
                    />
                  </div>
                  <strong className="text-sm text-pink-700 sm:text-base">
                    {row.value.toLocaleString()}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          <StatCard
            id="month"
            title="Most active month"
            value={stats.mostActiveMonth}
            note="Top month in Instagram chat volume"
            icon={emoji.calendar}
            activeCard={activeCard}
            onToggle={toggleCard}
          >
            <p>This month was doing overtime. HR has been notified.</p>
          </StatCard>

          <div className="min-w-0 rounded-[1.6rem] border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-rose-50 p-4 shadow-sm sm:p-5">
            <h3 className="text-sm font-black text-pink-950 sm:text-base">Top emojis</h3>
            <div className="mt-4 grid grid-cols-3 gap-2 min-[420px]:grid-cols-4 sm:grid-cols-6">
              {stats.topEmojis && stats.topEmojis.length ? (
                stats.topEmojis.map((item) => (
                  <div
                    key={item.emoji}
                    className="flex min-w-0 flex-col items-center rounded-2xl bg-white px-2 py-3 text-center shadow-sm"
                  >
                    <span className="emoji text-3xl leading-none sm:text-4xl">
                      {displayEmoji(item.emoji)}
                    </span>
                    <span className="mt-2 text-xs font-bold text-pink-600">
                      x{item.count.toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="col-span-full rounded-2xl bg-white px-4 py-5 text-center shadow-sm">
                  <p className="emoji text-4xl">
                    {emoji.mail} {emoji.hearts} {emoji.sparkles}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-pink-700">
                    No emojis found yet. Suspiciously mature behavior.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InstagramAnalysis;
