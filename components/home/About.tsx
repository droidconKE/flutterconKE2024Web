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
        <div className="w-full md:w-[55%] bg-primary p-8 md:p-10 lg:p-12 flex flex-col justify-center">
          <h2 className="text-accent dark:text-white text-5xl md:text-7xl font-display leading-none mb-8">
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
              className={`p-6 md:p-8 lg:p-10 flex flex-col justify-center ${
                index < 2 ? 'border-b border-primary' : ''
              }`}
            >
              <div className="text-accent dark:text-white text-3xl md:text-5xl lg:text-6xl font-display mb-2">
                {box.value}
              </div>
              <div className="text-accent dark:text-white text-[10px] md:text-xs uppercase">
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
