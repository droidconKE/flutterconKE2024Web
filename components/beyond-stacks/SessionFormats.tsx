// Font Awesome ships with the site; these are the closest glyphs to the
// design's custom icons, which cannot be exported from the prototype.
const formats = [
  {
    name: 'Lightning',
    icon: 'fa-bolt',
    body: 'One sharp idea, practical technique, or anti-pattern',
  },
  {
    name: 'Talk',
    icon: 'fa-comments-o',
    body: 'Deep dive into a workflow, architectural pattern, or case study',
  },
  {
    name: 'Live Demo',
    icon: 'fa-eye',
    body: 'End-to-end live running loops—no slides',
  },
  {
    name: 'Panel',
    icon: 'fa-users',
    body: 'Cross-company debates, post-mortems, and trade-offs',
  },
  {
    name: 'Keynote',
    icon: 'fa-microphone',
    body: 'Strategic framing and industry mindset shifts',
  },
  {
    name: 'Workshop',
    icon: 'fa-wrench',
    body: 'Hands-on, build-along technical sessions',
  },
]

export const SessionFormats = () => (
  <section
    className="s-container mt-16 md:mt-24"
    aria-labelledby="session-formats"
  >
    {/* Fixed brand surface in both themes; text pinned against the global
        `p` rule. The design's accent titles would be 1.09:1 on this blue. */}
    <div className="w-full rounded-4xl md:rounded-5xl bg-primary px-6 py-8 md:px-10 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-16 items-start">
        <h2
          id="session-formats"
          className="font-display text-white dark:text-white text-4xl md:text-6xl leading-none"
        >
          Session
          <br />
          Formats
        </h2>
        <p className="text-white dark:text-white text-base md:text-lg leading-relaxed max-w-md lg:pt-2">
          Every session prioritizes interactive debate and practical execution
          over passive presentations.
        </p>
      </div>

      <ul className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {formats.map((format) => (
          <li
            key={format.name}
            className="flex items-start gap-5 rounded-3xl bg-white/10 px-5 py-5 md:px-6 md:py-6"
          >
            <i
              className={`fa ${format.icon} text-accent text-3xl md:text-4xl w-10 text-center shrink-0`}
              aria-hidden="true"
            />
            <div>
              <h3 className="text-white dark:text-white text-xl font-semibold leading-tight">
                {format.name}
              </h3>
              <p className="mt-1 text-white dark:text-white text-sm md:text-base leading-snug">
                {format.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
)
