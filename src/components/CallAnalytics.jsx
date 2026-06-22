import React, { useMemo } from "react";
import callsData from "../../calls.json";

const emoji = {
  phone: "\u{1F4DE}",
  clock: "\u23F1\uFE0F",
  trophy: "\u{1F3C6}",
  calendar: "\u{1F4C5}",
  bill: "\u{1F9FE}",
  screenshot: "\u{1F4F1}",
  missed: "\u{1F4A4}",
  sparkles: "\u2728",
};

const parseDuration = (duration) => {
  if (typeof duration !== "string") return 0;
  const lower = duration.toLowerCase();
  if (
    lower.includes("missed") ||
    lower.includes("cancelled") ||
    lower.includes("unknown")
  ) {
    return 0;
  }

  const hours = Number(lower.match(/(\d+)\s*hour/)?.[1] ?? 0);
  const minutes = Number(lower.match(/(\d+)\s*minute/)?.[1] ?? 0);
  const seconds = Number(lower.match(/(\d+)\s*second/)?.[1] ?? 0);
  return hours * 3600 + minutes * 60 + seconds;
};

const formatDuration = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs) return `${hrs} hr ${mins} min`;
  if (mins) return `${mins} min ${secs ? `${secs} sec` : ""}`.trim();
  return `${secs} sec`;
};

const getAllCalls = (data) => {
  const months = data.months ?? {};
  return [
    ...(months.april_2026?.calls ?? []).map((call) => ({
      ...call,
      sourceBucket: "April",
      durationSec: call.duration_sec ?? 0,
      status: call.status ?? "Connected",
    })),
    ...(months.may_2026?.calls ?? []).map((call) => ({
      ...call,
      sourceBucket: "May",
      durationSec: call.duration_sec ?? 0,
      status: call.status ?? "Connected",
    })),
    ...(months.june_2026?.calls ?? []).map((call) => ({
      ...call,
      sourceBucket: "June",
      durationSec: call.duration_sec ?? parseDuration(call.duration),
      status: call.status ?? "Connected",
    })),
  ];
};

function MiniStat({ icon, label, value, note }) {
  return (
    <div className="rounded-[1.5rem] border border-pink-100 bg-white/80 p-4 shadow-sm">
      <div className="emoji text-2xl">{icon}</div>
      <p className="mt-3 text-xs font-black uppercase tracking-[0.13em] text-pink-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-black leading-tight text-gray-950">
        {value}
      </p>
      {note && <p className="mt-2 text-sm font-medium text-pink-700">{note}</p>}
    </div>
  );
}

function CallAnalytics() {
  const analytics = useMemo(() => {
    const calls = getAllCalls(callsData);
    const knownSeconds = calls.reduce(
      (total, call) => total + call.durationSec,
      0,
    );
    const byDate = calls.reduce((acc, call) => {
      acc[call.date] = (acc[call.date] ?? 0) + 1;
      return acc;
    }, {});
    const busiestDay = Object.entries(byDate).sort((a, b) => b[1] - a[1])[0];
    const bySource = calls.reduce((acc, call) => {
      const source = call.sourceBucket;
      acc[source] = acc[source] ?? { calls: 0, seconds: 0 };
      acc[source].calls += 1;
      acc[source].seconds += call.durationSec;
      return acc;
    }, {});
    const maxSourceCalls = Math.max(
      ...Object.values(bySource).map((source) => source.calls),
      1,
    );
    const sourceRows = Object.entries(bySource).map(([source, value]) => ({
      source,
      ...value,
      width: `${Math.round((value.calls / maxSourceCalls) * 100)}%`,
    }));
    const missed = calls.filter((call) => call.status === "Missed").length;
    const cancelled = calls.filter(
      (call) => call.status === "Cancelled",
    ).length;
    const unknown = calls.filter(
      (call) => call.durationSec === 0 && call.status !== "Missed",
    ).length;
    const completed = calls.filter(
      (call) => call.status === "Connected",
    ).length;
    const longest = calls.reduce(
      (best, call) => (call.durationSec > best.durationSec ? call : best),
      { durationSec: 0 },
    );

    return {
      totalCalls: calls.length,
      knownSeconds,
      busiestDay,
      sourceRows,
      completed,
      missed,
      cancelled,
      unknown,
      longest,
      sourceCount: Object.keys(callsData.months ?? {}).length,
    };
  }, []);

  return (
    <section className="analysisSection">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-pink-50 via-white to-rose-50 p-4 shadow-xl shadow-pink-100/70 sm:p-7 md:p-8">
        <div className="pointer-events-none absolute inset-0 rounded-[2rem]" />

        <div className="relative mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-pink-500">
              call log audit {emoji.phone}
            </p>
            <h2 className="mt-1 text-3xl font-black leading-tight text-gray-950 sm:text-4xl">
              Calls, but make it evidence
            </h2>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-pink-600 sm:text-base">
              Pulled from bills and screenshots. Very normal behavior,
              obviously.
            </p>
          </div>
          <div className="rounded-full bg-pink-50 px-4 py-2 text-sm font-black text-pink-700 shadow-sm">
            {analytics.sourceCount} sources
          </div>
        </div>

        <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MiniStat
            icon={emoji.phone}
            label="Total calls"
            value={analytics.totalCalls}
            note="Known logs only"
          />
          <MiniStat
            icon={emoji.clock}
            label="Call time"
            value={formatDuration(analytics.knownSeconds)}
            note="Approx, because screenshots hehe"
          />
          <MiniStat
            icon={emoji.trophy}
            label="Longest call"
            value={formatDuration(analytics.longest.durationSec)}
            note={`${analytics.longest.date} at ${analytics.longest.time}`}
          />
          <MiniStat
            icon={emoji.calendar}
            label="Busiest day"
            value={analytics.busiestDay?.[0] ?? "N/A"}
            note={`${analytics.busiestDay?.[1] ?? 0} calls. Busy busy.`}
          />
        </div>

        <div className="relative mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.5rem] border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-rose-50 p-4">
            <h3 className="text-base font-black text-pink-950">
              Source breakdown
            </h3>
            <div className="mt-4 space-y-4">
              {analytics.sourceRows.map((row) => (
                <div key={row.source}>
                  <div className="mb-2 flex justify-between gap-3 text-sm font-bold text-pink-700">
                    <span>
                      {row.source === "Screenshots"
                        ? emoji.screenshot
                        : emoji.bill}{" "}
                      {row.source}
                    </span>
                    <span>{row.calls} calls</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-pink-300 to-rose-500"
                      style={{ width: row.width }}
                    />
                  </div>
                  <p className="mt-1 text-xs font-semibold text-pink-500">
                    {formatDuration(row.seconds)} known time
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-pink-100 bg-gray-950 p-4 text-white">
            <h3 className="text-base font-black">Tiny call lore</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="emoji text-2xl">{emoji.phone}</p>
                <p className="mt-2 text-2xl font-black">
                  {analytics.completed}
                </p>
                <p className="text-sm text-pink-100">completed</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="emoji text-2xl">{emoji.missed}</p>
                <p className="mt-2 text-2xl font-black">{analytics.missed}</p>
                <p className="text-sm text-pink-100">missed calls</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="emoji text-2xl">{emoji.sparkles}</p>
                <p className="mt-2 text-2xl font-black">
                  {analytics.cancelled}
                </p>
                <p className="text-sm text-pink-100">cancelled calls</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="emoji text-2xl">{emoji.calendar}</p>
                <p className="mt-2 text-2xl font-black">{analytics.unknown}</p>
                <p className="text-sm text-pink-100">unknown duration</p>
              </div>
            </div>
            <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-gray-950">
              The longest call was not a call, it was a podcast episode with
              feelings.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallAnalytics;
