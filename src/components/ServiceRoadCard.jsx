import React from "react";

const emoji = {
  pin: "\u{1F4CD}",
  kiss: "\u{1F48B}",
  sparkles: "\u2728",
  promise: "\u{1F91D}",
  warning: "\u26A0\uFE0F",
};

const loreBits = [
  {
    label: "The spot",
    value: "service road",
    icon: emoji.pin,
  },
  {
    label: "Receipts",
    value: "kiss, fight, promise",
    icon: emoji.promise,
  },
  {
    label: "Current status",
    value: "still relevant, somehow",
    icon: emoji.sparkles,
  },
];

function ServiceRoadCard() {
  return (
    <section className="mx-auto mb-8 max-w-6xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-5 shadow-xl shadow-pink-100/70 sm:p-7">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-pink-100 blur-2xl" />
        <div className="absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-rose-100 blur-2xl" />

        <div className="relative grid gap-5 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-pink-500">
              lowkey important
            </p>
            <h2 className="mt-2 text-3xl font-black leading-tight text-gray-950 sm:text-4xl">
              Not just a road anymore.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-700 sm:text-lg">
              It was supposed to be a normal place. Then it collected a kiss,
              one fight, and that promise on the road like it was taking
              attendance.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-rose-50 p-4">
            <div className="emoji text-4xl">{emoji.kiss}</div>
            <p className="mt-3 text-sm font-bold text-pink-950">
              Honest review
            </p>
            <p className="mt-1 text-2xl font-black text-gray-950">
              promise included
            </p>
            <p className="mt-2 text-sm leading-relaxed text-pink-700">
              Would pretend it is not that deep. The promise says otherwise.
            </p>
          </div>
        </div>

        <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
          {loreBits.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-pink-100 bg-pink-50/70 p-4"
            >
              <div className="emoji text-2xl">{item.icon}</div>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-pink-500">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-bold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>

        <p className="relative mt-4 rounded-2xl bg-gray-950 px-4 py-3 text-sm font-semibold text-white">
          <span className="emoji mr-2">{emoji.warning}</span>
          Side effects may include acting chill and failing immediately.
        </p>
      </div>
    </section>
  );
}

export default React.memo(ServiceRoadCard);
