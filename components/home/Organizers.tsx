import { Organizer } from '../../types/types'

function Organizers({ organizers }: { organizers: Organizer[] }) {
  // Pattern overlay style using radial-gradient to simulate the Figma dot pattern
  const patternOverlayStyle = {
    backgroundImage: 'radial-gradient(circle, #008BFF 15%, transparent 15%)',
    backgroundSize: '16px 16px',
    opacity: 0.8,
    WebkitMaskImage: 'linear-gradient(to bottom, transparent 10%, black 90%)',
    maskImage: 'linear-gradient(to bottom, transparent 10%, black 90%)',
  }

  return (
    <section className="s-container w-full h-auto bg-white dark:bg-dark pt-10 md:pt-20 transition-colors">
      {/* Header Block */}
      <div className="w-full bg-accent rounded-3xl p-8 mb-8 md:mb-12">
        <div className="flex items-center text-black text-sm md:text-base font-medium mb-4 md:mb-6 opacity-90">
          <div className="w-6 md:w-8 h-px bg-black mr-3" />
          Community Partner
        </div>
        <h2 className="text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] leading-tight font-display whitespace-nowrap">
          Community Partner
        </h2>
      </div>

      {/* Flutter Kenya */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
        <div className="w-full bg-primary rounded-[24px] md:rounded-[20px] p-8 md:p-12 flex flex-col justify-center">
          <h4 className="font-display font-black capitalize text-accent text-5xl md:text-6xl mb-6">
            Flutter Kenya
          </h4>
          <p className="text-white text-base md:text-lg leading-relaxed opacity-90">
            Established in 2020, Flutter Kenya is the leading Flutter community
            in Kenya with over 4,000 members. It aims to foster a vibrant
            ecosystem of Flutter developers through monthly meetups, offering
            education, inspiration, and networking opportunities. With over 65
            physical meetups organized, it attracts over 50 attendees each
            month, empowering developers to leverage Flutter for mobile, web,
            and desktop app development.
          </p>
        </div>
        <div className="w-full min-h-[300px] md:min-h-[400px] relative rounded-[24px] md:rounded-[32px] overflow-hidden">
          <img
            src="/images/gallery/1.jpg"
            alt="Flutter Kenya Community"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Blue Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/10 mix-blend-multiply" />
          {/* Polka Dot Pattern Overlay */}
          <div className="absolute inset-0 z-10" style={patternOverlayStyle} />
        </div>
      </div>

      {/* Organizers loaded from the API — sponsor-style logo grid */}
      {organizers?.length > 0 && (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 pb-16">
          {organizers.map((org) => (
            <a
              key={org.created_at || org.name}
              href={org.link}
              target="_blank"
              rel="noreferrer"
              className="w-full aspect-square p-6 flex items-center justify-center rounded-2xl bg-lighter dark:bg-black-dark border border-primary hover:scale-105 transition-transform"
            >
              <img
                className="w-full h-full object-contain"
                src={org.photo || '/images/icon.png'}
                alt={org.name}
              />
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

export default Organizers
