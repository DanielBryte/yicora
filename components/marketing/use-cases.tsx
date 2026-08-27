import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const USE_CASES = [
  {
    title: "Content Creators",
    description: "Dub YouTube videos, podcasts, and vlogs into Yoruba, Igbo, Hausa, Swahili & Pidgin in minutes.",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Filmmakers and Studios",
    description: "Translate feature films, documentaries, and TV series with lip-synced audio and natural subtitles.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Brands and Businesses",
    description: "Localize marketing campaigns, ads, and product demos across pan-African commercial markets.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Educators and Trainers",
    description: "Expand educational reach across African classrooms and e-learning portals with localized voice.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Social Media Managers",
    description: "Scale short-form viral localized content for TikTok, Instagram Reels, and YouTube Shorts.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Musicians and Artists",
    description: "Compose original Afrobeats & Amapiano songs, transform vocals, and localize song lyrics effortlessly.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-24 px-4 bg-offwhite">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-darktext">
              YiCora Use Cases
            </h2>
            <p className="text-mutedtext mt-2 text-base sm:text-lg">
              Built for real-world creative workflows across Africa and beyond.
            </p>
          </div>

          <Link
            href="/signup"
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-berry hover:bg-berry-hover text-white font-medium text-xs sm:text-sm transition-all shadow-md active:scale-95"
          >
            <span>Start Creating</span>
          </Link>
        </div>

        {/* Use Cases Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {USE_CASES.map((uc, index) => (
            <div
              key={index}
              className="group relative h-[450px] sm:h-[480px] rounded-[2rem] overflow-hidden shadow-lg border border-neutral-200/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={uc.image}
                alt={uc.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Card Content */}
              <div className="absolute inset-0 p-7 flex flex-col justify-end text-white">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 text-white">
                  {uc.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  {uc.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <span className="text-xs sm:text-sm font-medium tracking-wide text-neutral-600">
            and more...
          </span>
        </div>
      </div>
    </section>
  );
}
