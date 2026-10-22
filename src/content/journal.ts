export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  body: Block[];
};

export const articles: Article[] = [
  {
    slug: "how-quickly-to-reply-to-a-horse-enquiry",
    title: "How quickly should you reply to a horse enquiry?",
    description:
      "Why the first useful reply matters, what a good one contains, and how to keep up when you are busy.",
    date: "2026-10-20",
    readingTime: "3 min read",
    body: [
      {
        type: "p",
        text: "Most horse buyers are not choosing between one horse and nothing. They are comparing several at once, often on a phone, often in the evening. The seller who replies first with something useful has a head start.",
      },
      { type: "h2", text: "Fast matters, but useful matters more" },
      {
        type: "p",
        text: "A quick “thanks, I’ll get back to you” is better than silence, but it does not move the buyer forward. The reply that works does three things at once: it confirms the horse is still available, it answers the question that was asked, and it makes the next step obvious.",
      },
      { type: "h2", text: "What a good first reply contains" },
      {
        type: "ul",
        items: [
          "A warm, personal opening that uses the buyer’s name",
          "A direct answer to their question",
          "The facts they will want next: age, height, level and location",
          "Two or three short questions about the rider and what they plan to do",
          "A clear next step, such as a video call or a viewing",
        ],
      },
      { type: "h2", text: "Set expectations if you cannot reply straight away" },
      {
        type: "p",
        text: "Nobody can answer instantly at a show or on a long drive. If you know you will be away, say when you will reply. A buyer who knows to expect an answer by six o’clock is far more patient than one left guessing.",
      },
      { type: "h2", text: "Make the second reply easy too" },
      {
        type: "p",
        text: "Keep your answers to common questions written down in one place. When you are busy, a short, well-written reply you can send in seconds beats a longer one you never get round to writing.",
      },
      {
        type: "p",
        text: "If you find yourself typing the same answers every week, that is the sign part of the process can be automated, so the first reply goes out straight away and you step in for the conversation that matters.",
      },
    ],
  },
  {
    slug: "what-a-good-horse-sales-page-includes",
    title: "What a good horse sales page includes",
    description:
      "The facts, photographs, video and next steps that help a serious buyer say yes to a viewing.",
    date: "2026-10-20",
    readingTime: "4 min read",
    body: [
      {
        type: "p",
        text: "A sales page has one job: to help the right buyer decide that this horse is worth a visit. The more clearly it does that, the fewer questions you answer and the more viewings you get from people who are genuinely interested.",
      },
      { type: "h2", text: "Start with the facts" },
      {
        type: "p",
        text: "Put the essentials at the top, where nobody has to hunt for them.",
      },
      {
        type: "ul",
        items: [
          "Age, height, colour and sex",
          "Breeding, if you know it",
          "Current level and what the horse is best suited to",
          "Where the horse is based",
          "Price, or a clear price range",
        ],
      },
      { type: "h2", text: "Describe the horse honestly" },
      {
        type: "p",
        text: "Say what the horse is genuinely like to ride and to handle, including any quirks. An honest description attracts buyers who suit the horse and quietly filters out those who do not, which saves everyone a wasted journey.",
      },
      { type: "h2", text: "Show the horse properly" },
      {
        type: "ul",
        items: [
          "A clear photograph standing square from the side, in natural light",
          "Head, front and back views",
          "Video of the horse in walk, trot and canter, and jumping if relevant",
          "A video of the horse being handled, caught or loaded, if you can",
        ],
      },
      { type: "h2", text: "Make the next step obvious" },
      {
        type: "p",
        text: "End every page with a simple way to ask a question or request a viewing. Have the horse’s passport and paperwork details ready to discuss, so a serious buyer can move quickly.",
      },
      {
        type: "p",
        text: "Keep each horse on one page of its own, rather than spread over several posts and platforms. One page is easier to share, easier to keep up to date, and easier to buy from.",
      },
    ],
  },
  {
    slug: "the-questions-every-buyer-asks",
    title: "The questions every buyer asks, and how to answer them once",
    description:
      "Write your answers down once, and every future enquiry becomes quicker and better.",
    date: "2026-10-20",
    readingTime: "3 min read",
    body: [
      {
        type: "p",
        text: "If you sell horses, you already know the questions. They arrive in a slightly different order each time, but they are nearly always the same ones.",
      },
      { type: "h2", text: "The usual questions" },
      {
        type: "ul",
        items: [
          "Is the horse still available?",
          "How old, how tall, and at what level?",
          "Can I see videos?",
          "Is the horse good to hack, to load and to travel?",
          "Where are you, and when can I come and see the horse?",
          "What is the price, and is there any room on it?",
        ],
      },
      { type: "h2", text: "Write the answers down once" },
      {
        type: "p",
        text: "For each horse, put the answers in one place: a short paragraph for each question, plus links to the videos. Keep the tone warm and personal. When an enquiry arrives, you are copying and adjusting, not starting from a blank screen.",
      },
      { type: "h2", text: "Ask your own questions early" },
      {
        type: "p",
        text: "The best replies also ask the buyer a few things: their riding experience, what they hope to do with the horse, and how far they would travel. The answers tell you quickly whether a viewing is worth arranging, and they help you suggest the right horse if this one is not a fit.",
      },
      { type: "h2", text: "Then let the routine part run itself" },
      {
        type: "p",
        text: "Once your answers and your questions are written down, the first reply no longer needs you. It can go out the moment an enquiry arrives, with the horse’s details, the videos and your questions already in it. You join the conversation when there is a real buyer on the other end.",
      },
    ],
  },
];
