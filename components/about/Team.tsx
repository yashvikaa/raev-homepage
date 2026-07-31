export default function Team() {
  return (
    <section className="w-full bg-white py-16 sm:py-24 md:py-32 px-6 sm:px-12 md:px-20 lg:px-28 xl:px-36">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-start">
        {/* TEAM Display Heading */}
        <h2 className="font-being uppercase text-black text-6xl sm:text-7xl md:text-8xl lg:text-[9vw] xl:text-[8vw] leading-none tracking-tight select-none mb-10 sm:mb-14 md:mb-16">
          TEAM
        </h2>

        {/* Text Paragraphs */}
        <div className="flex flex-col space-y-6 sm:space-y-8 max-w-xl sm:max-w-2xl text-left">
          <p className="font-haas text-black text-base sm:text-lg md:text-xl lg:text-[1.35rem] font-normal leading-snug tracking-tight">
            We are creatives, designers, and AI specialists united by one goal; to make exceptional visual content more accessible. Every campaign is crafted with precision, balancing innovation with timeless design principles.
          </p>

          <p className="font-haas text-black text-base sm:text-lg md:text-xl lg:text-[1.35rem] font-normal leading-snug tracking-tight">
            Our work begins with understanding your brand and ends with campaign-ready visuals that captivate audiences, strengthen identity, and drive meaningful results.
          </p>
        </div>
      </div>
    </section>
  );
}

