export type Audience = {
  slug: string;
  name: string;
  active: boolean;
  line: string;
};

export const audiences: Audience[] = [
  {
    slug: "horse-sellers",
    name: "Horse sellers",
    active: true,
    line: "Sales yards, dealers, producers and private sellers who want every serious buyer answered fast.",
  },
  { slug: "breeders", name: "Breeders", active: false, line: "Foal and youngstock enquiries, handled with care." },
  { slug: "yards-and-livery", name: "Yards and livery", active: false, line: "Bookings, waiting lists and client messages." },
  { slug: "trainers", name: "Trainers", active: false, line: "Lessons, clinics and rider enquiries in one place." },
  { slug: "studs", name: "Studs", active: false, line: "Stallion pages and mare booking enquiries." },
  { slug: "tack-shops", name: "Tack shops", active: false, line: "Product enquiries and fitting appointments." },
  { slug: "event-organisers", name: "Event organisers", active: false, line: "Entries, schedules and competitor questions." },
];
