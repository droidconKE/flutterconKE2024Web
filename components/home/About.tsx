import React from 'react'

const statsBoxes = [
  { value: '3RD', label: 'FLUTTERCON EDITION' },
  { value: '7TH', label: 'DROIDCON EDITION' },
  { value: '230+', label: 'Sessions Delivered' },
  { value: '3,000+', label: 'Attendees Since 2018' },
]

const About = () => {
  return (
    <section className="s-container ">
      <div className="flex flex-col md:flex-row w-full rounded-3xl overflow-hidden shadow-xl">
        {/* Left Column (Blue) */}
        <div className="w-full md:w-[55%] bg-primary p-8 md:p-10 lg:p-12 flex flex-col justify-center [container-type:inline-size]">
          {/* "FlutterconKE" is one unbreakable word, 6.8px wide per pixel of
              font size in the display font. Below md the card leaves
              width - 96px for it, so each step starts where it fits: 30px to
              359, 36px from 360, 48px from 430. From md the column is a size
              container and the heading is sized from it: 100cqw, the column's
              text box, over 6.8, capped at the design's 72px, so it is always
              as large as the column allows and never clipped, which fixed
              steps were from 768 to about 1250. */}
          <h2 className="text-accent dark:text-white text-3xl min-[360px]:text-4xl min-[430px]:text-5xl md:text-[clamp(1.875rem,calc(100cqw/6.8),4.5rem)] font-display leading-none mb-8">
            About
            <br />
            FlutterconKE
          </h2>
          <p className="text-white dark:text-white text-lg md:text-xl leading-relaxed mb-6">
            FlutterconKE returns for its 3rd edition on November 5th and 6th,
            2026, at PrideInn Azure Hotel in Nairobi, bringing together Flutter
            and Dart experts, Google Developer Experts, and hundreds of Mobile
            developers from across the continent.
          </p>
          <p className="text-white dark:text-white text-lg md:text-xl leading-relaxed">
            Co-located with DroidconKE, FlutterconKE is part of next.app devCon,
            the global home of Droidcon, Fluttercon, and the wider mobile
            developer community.
          </p>
        </div>

        {/* Right Column — 2x2 split by blue hairlines. Inverts between themes
            in the design: black panel with magenta figures in light, magenta
            panel with white figures in dark. */}
        <div className="w-full md:w-[45%] bg-black-dark dark:bg-accent grid grid-cols-2">
          {statsBoxes.map((box, index) => (
            <div
              key={box.value}
              className={`p-6 flex flex-col justify-center [container-type:inline-size] ${
                index < 2 ? 'border-b border-primary' : ''
              }`}
            >
              {/* "3,000+" is 3.6px wide per pixel of font size, and a cell's
                  text box is 66px at md and 165px at xl, so fixed sizes ran
                  into the next cell and lost the "+" at the card's edge even
                  on desktop. Each cell is a size container and every figure
                  takes the size the widest one fits at, capped at the step
                  the design used for that breakpoint. The cells pad 24px at
                  every size: at 32px the md box was 66px, under the 20px
                  floor, and at 40px the figures sat at 46px on laptops where
                  24px lets them reach 54px and the design's 60px at 1920. */}
              <div className="text-accent dark:text-white text-[clamp(1.25rem,calc(100cqw/3.6),1.875rem)] md:text-[clamp(1.25rem,calc(100cqw/3.6),3rem)] lg:text-[clamp(1.25rem,calc(100cqw/3.6),3.75rem)] font-display mb-2">
                {box.value}
              </div>
              {/* Two lines reserved at every size (15px lines on phones, 16px from
                  md), so a label that wraps beside one that does not cannot
                  push the figures in a row out of level; at 360 exactly one
                  label per row wraps. */}
              <div className="text-accent dark:text-white text-[10px] md:text-xs min-h-[1.875rem] md:min-h-[2rem] uppercase">
                {box.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
