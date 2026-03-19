const DICEBEAR_STYLE = "lorelei";

const dicebearAvatar = (seed: string) =>
  `https://api.dicebear.com/7.x/${DICEBEAR_STYLE}/svg?seed=${encodeURIComponent(seed)}`;

export interface Testimonial {
  authorAvatar: string;
  authorName: string;
  authorTagline?: string;
  url: string;
  quote: string;
}

export const FEATURED_TESTIMONIAL: Testimonial = {
  authorAvatar: "https://unavatar.io/x/cramforce",
  authorName: "Malte Ubl",
  authorTagline: "CTO @Vercel",
  quote: "I love it. In fact, you can now connect it to real world usage data.",
  url: "https://x.com/cramforce/status/2024624151064088902",
};

export const TESTIMONIALS_ROW_ONE: Testimonial[] = [
  {
    authorAvatar: "https://unavatar.io/x/grimcodes",
    authorName: "grim",
    quote: "interesting!",
    url: "https://x.com/grimcodes/status/2024998810578288885",
  },
  {
    authorAvatar: "https://unavatar.io/x/naelodev",
    authorName: "Naelo",
    quote: "Will try it tomorrow! Thanks",
    url: "https://x.com/naelodev/status/2024968195065741804",
  },
  {
    authorAvatar: dicebearAvatar("jsthon_"),
    authorName: "jsthon",
    quote: "Looks good!!!",
    url: "https://www.reddit.com/r/vercel/comments/1r9umkt/comment/o6fqqys",
  },
  {
    authorAvatar: "https://unavatar.io/x/AmyAEgan",
    authorName: "Amy Egan",
    authorTagline: "Community @Vercel",
    quote:
      "Love that you saw a problem and found a way to solve it with a very smart solution. And it's open source 😍",
    url: "https://community.vercel.com/t/kept-seeing-racked-up-vercel-bills-every-now-and-then-built-a-tool-to-fix-this-once-and-for-all/34159/3?u=aniket-508",
  },
];

export const TESTIMONIALS_ROW_TWO: Testimonial[] = [
  {
    authorAvatar: "https://unavatar.io/x/paw_lean",
    authorName: "Pauline P. Narvas",
    authorTagline: "Community @Vercel",
    quote: "👀 This is a great idea. Thanks for sharing!",
    url: "https://www.reddit.com/r/vercel/comments/1r9umkt/comment/o6eycmk",
  },
  {
    authorAvatar: dicebearAvatar("Prestigious-Bus-8069"),
    authorName: "Prestigious-Bus-8069",
    quote: "Need of the time, love it.",
    url: "https://www.reddit.com/r/vercel/comments/1r9umkt/comment/o6f0tik",
  },
  {
    authorAvatar: dicebearAvatar("JoshSmeda"),
    authorName: "krokodil",
    quote: "Yeah this is good. Nice work",
    url: "https://www.reddit.com/r/vercel/comments/1r9umkt/comment/o6f73bi",
  },
];
