"use client";

interface Step {
  num: string;
  title: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "DISCOVERY & STRATEGY",
  },
  {
    num: "02",
    title: "AI SYNTHESIS",
  },
  {
    num: "03",
    title: "FINE-TUNING & POST",
  },
  {
    num: "04",
    title: "MULTI-CHANNEL DEPLOYMENT",
  },
];

export default function Process() {
  return (
    <section className="w-full bg-[#F5F4F0] py-20 sm:py-28 px-6 sm:px-12 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 sm:mb-20">
          <span className="font-haas font-medium text-xs sm:text-sm uppercase tracking-widest text-black/50 mb-3 block">
            HOW WE WORK
          </span>
          <h2 className="font-being uppercase text-black select-none text-[7.2vw] sm:text-[7.6vw] md:text-[8vw] lg:text-[7.6vw] leading-[0.72] tracking-[-0.0005em]">
            OUR CASE METHODOLOGY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {STEPS.map((step) => (
            <div key={step.num} className="border-t border-black/20 pt-6 flex flex-col justify-between h-full">
              <div>
                <span className="font-haas font-medium text-3xl text-black/40 block mb-4">
                  {step.num}
                </span>
                <h3 className="font-haas font-normal text-base sm:text-lg text-black/80 uppercase leading-snug">
                  {step.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
