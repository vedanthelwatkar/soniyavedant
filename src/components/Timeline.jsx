import React, { useEffect, useRef, useState } from "react";

const imageMap = {
  "sv1.JPG": new URL("../assets/sv1.JPG", import.meta.url).href,
  "sv2.JPG": new URL("../assets/sv2.JPG", import.meta.url).href,
  "sv3.JPG": new URL("../assets/sv3.JPG", import.meta.url).href,
  "sv4.JPG": new URL("../assets/sv4.JPG", import.meta.url).href,
};

function TimelineItem({ memory, imageUrl }) {
  const itemRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={itemRef}
      className={`mb-6 sm:mb-8 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} transition-all duration-600`}
    >
      <div className="flex items-start gap-3 sm:gap-6">
        <div className="mt-3 flex-shrink-0">
          <span className="block h-3 w-3 rounded-full bg-pink-500 shadow sm:h-4 sm:w-4" />
        </div>
        <div className="min-w-0 flex-1 overflow-hidden rounded-[1.5rem] border border-white/80 bg-white shadow-md">
          <div className="flex flex-col md:flex-row">
            <div className="h-72 w-full overflow-hidden bg-pink-50 sm:h-80 md:h-[36rem] md:w-1/2">
              <img
                src={imageUrl}
                alt={memory.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex-1 p-5 md:p-8">
              <div className="mb-3 flex items-center justify-between gap-3 text-sm text-gray-500">
                <div className="emoji text-2xl leading-none">{memory.icon}</div>
                <time className="text-sm text-gray-400">{memory.date}</time>
              </div>
              <h3 className="text-xl font-bold text-gray-800 md:text-2xl">
                {memory.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                {memory.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Timeline({ memories }) {
  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
      <div className="mb-2">
        <p className="text-sm font-semibold text-pink-600">Our Story</p>
        <h2 className="text-3xl font-black leading-tight md:text-4xl">
          Moments worth keeping forever
        </h2>
      </div>
      <div>
        {memories.map((memory) => (
          <TimelineItem
            key={memory.title}
            memory={memory}
            imageUrl={imageMap[memory.imageName]}
          />
        ))}
      </div>
    </section>
  );
}

export default React.memo(Timeline);
