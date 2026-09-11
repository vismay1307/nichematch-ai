import { Button } from "@/components/ui/button";
import { MatchScoreCard } from "@/components/matching/MatchScoreCard";
import { WhyCreatorPanel } from "@/components/matching/WhyCreatorPanel";
import { CreatorCard } from "@/components/marketplace/CreatorCard";
import type { MatchSubScores } from "@/types/matching";
import type { Creator } from "@/types/creator";

/**
 * Illustrative data for the hero preview ONLY. This is not a real
 * campaign or a real matching result — it exists purely so the
 * MatchScoreCard/WhyCreatorPanel components have something concrete
 * to render on a page nobody has logged into yet. `isPreview` on
 * MatchScoreCard keeps this labeled as a sample in the UI itself,
 * not just in this comment. Do not copy this object into any
 * authenticated page — those pages get their data from
 * `trpc.campaign.getRecommendations`, never from a local constant.
 */
const PREVIEW_SUB_SCORES: MatchSubScores = {
  semanticSimilarity: 0.91,
  audienceFitScore: 0.88,
  platformFitScore: 0.95,
  engagementScore: 0.8,
  followerRangeFit: 1.0,
  languageLocationFit: 1.0,
};

const PREVIEW_REASONS = [
  "Strong overlap with the developer and startup-founder audience",
  "Platform matches this campaign's target channel",
  "Engagement is high relative to this creator's follower tier",
];

/** Same rule as above — illustrative only, not a real marketplace record. */
const PREVIEW_CREATOR: Creator = {
  id: "preview",
  displayName: "Sample creator profile",
  primaryNiche: "AI & developer tools",
  platform: "X",
  followerCount: 42800,
  engagementRate: 0.041,
  location: "Remote",
  isDemoData: true,
};

export default function LandingPage() {
  return (
    <main>
      <Nav />
      <Hero />
      <HowItWorksTeaser />
      <MarketplaceTeaser />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-transparent bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-base font-semibold tracking-tight text-slate-900">
          NicheMatch AI
        </span>
        <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          <a href="#how-it-works" className="hover:text-slate-900">
            How it works
          </a>
          <a href="#creators" className="hover:text-slate-900">
            Creators
          </a>
          <a href="/login" className="hover:text-slate-900">
            Log in
          </a>
        </nav>
        <Button size="sm">Get started</Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="section mx-auto max-w-6xl px-6">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow mb-4">AI-powered creator-brand matchmaking</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Find the creators your campaign actually needs.
          </h1>
          <p className="mt-5 max-w-md text-lg text-slate-600">
            Semantic matching, audience fit, and explainable recommendations
            — not a follower-count guess.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Button size="lg">Create a campaign</Button>
            <Button size="lg" variant="ghost">
              Explore creators
            </Button>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs text-slate-400">
            Sample match — for illustration, not a live production result
          </p>
          <MatchScoreCard
            finalScore={0.94}
            subScores={PREVIEW_SUB_SCORES}
            isPreview
          />
          <div className="mt-3 rounded-xl border border-slate-200 bg-white p-4">
            <WhyCreatorPanel
              reasons={PREVIEW_REASONS}
              modelVersion="gemini-embedding-001@768d + gemini-2.5-flash-lite"
              defaultOpen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksTeaser() {
  const steps = [
    { n: "01", title: "Create a campaign", body: "Define your brief, audience, and requirements." },
    { n: "02", title: "AI finds relevant creators", body: "Embeddings and vector search surface real candidates." },
    { n: "03", title: "Review explainable matches", body: "Every score comes with sub-scores and reasons." },
  ];

  return (
    <section id="how-it-works" className="section section-subtle">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-semibold text-slate-900">How it works</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n}>
              <p className="font-mono text-sm text-indigo-500">{step.n}</p>
              <h3 className="mt-2 text-base font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketplaceTeaser() {
  return (
    <section id="creators" className="section">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Work with vetted creators
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Illustrative example — real creators come from the live marketplace.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <CreatorCard creator={PREVIEW_CREATOR} />
        </div>
      </div>
    </section>
  );
}