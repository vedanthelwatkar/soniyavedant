import React from "react";
import { CONFIG } from "../config.js";
import callsData from "../../calls.json";

const emoji = {
  sparkles: "\u2728",
  chart: "\u{1F4CA}",
  calendar: "\u{1F4C6}",
  receipt: "\u{1F9FE}",
};

function MoreUsCards() {
  const totalCalls = callsData.summary?.total_calls_all ?? 0;
  const totalDms = CONFIG.instagramStats?.totalMessages ?? 0;
  const totalDays = CONFIG.instagramStats?.totalDays ?? 1;
  const dailyChaos = Math.round((totalDms + totalCalls) / totalDays);

  const cards = [
    {
      icon: emoji.chart,
      title: "Combined yap score",
      value: dailyChaos.toLocaleString(),
      text: "DMs + calls per active day. Academically unserious.",
    },
    {
      icon: emoji.calendar,
      title: "Peak month",
      value: CONFIG.instagramStats.mostActiveMonth,
      text: "The month where the chat apparently had no brakes.",
    },
    {
      icon: emoji.receipt,
      title: "Proof count",
      value: `${CONFIG.instagramStats.fileCount + (callsData.data_sources?.length ?? 0)} files and 22 Screenshots`,
      text: "Exports, bills, screenshots. The receipts are organized.",
    },
  ];

  return (
    <section className="analysisSection">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 px-1">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-pink-500">
            extra stats {emoji.sparkles}
          </p>
          <h2 className="mt-1 text-3xl font-black text-gray-950">
            More us-coded stuff
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-[1.6rem] border border-white/80 bg-white/90 p-5 shadow-lg shadow-pink-100/60"
            >
              <div className="emoji text-3xl">{card.icon}</div>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-pink-500">
                {card.title}
              </p>
              <p className="mt-1 text-3xl font-black text-gray-950">
                {card.value}
              </p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-pink-700">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MoreUsCards;
