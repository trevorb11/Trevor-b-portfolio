import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const tags = [
  "SaaS / Platform",
  "AI-Powered CRM",
  "White-label",
  "Home Builders",
  "2024\u2013Present",
];

const stats = [
  { value: "4+", label: "Separate tools replaced by one platform" },
  { value: "0%", label: "Leads lost to missed calls or manual entry" },
  { value: "24/7", label: "Lead coverage via Voice AI and Chat AI" },
  { value: "~90%", label: "Cost savings vs. HubSpot at comparable scale" },
];

const capabilities = [
  {
    label: "Lead capture",
    title: "Every source, zero gaps",
    body: "Website forms, click-to-call, chatbot, Facebook and Google ads \u2014 every lead flows in automatically. No manual entry. No leads lost to missed calls or disconnected tools.",
  },
  {
    label: "Contact management",
    title: "One central hub",
    body: "Filterable by community, lead source, and last interaction. Every contact stores the full history of calls, texts, emails, and notes in one place accessible by the whole team.",
  },
  {
    label: "Automation",
    title: "Follow-up that never sleeps",
    body: "New leads automatically receive tailored email and SMS sequences. Reps layer personal touchpoints on top. The system works around the clock while the team focuses on buyers who are ready to move.",
  },
  {
    label: "Pipeline tracking",
    title: "Visual opportunity management",
    body: "Drag-and-drop Kanban pipeline with customizable stages. Reps see only their leads; management sees everything. Round robin assignment keeps lead distribution fair automatically.",
  },
  {
    label: "Voice AI",
    title: "AI call screening and routing",
    body: "Answers inbound calls when reps are unavailable. Provides home information, screens out spam and non-sales calls, and schedules follow-ups. Forwards filtered calls to the right person \u2014 reps only talk to real buyers.",
  },
  {
    label: "Conversation AI",
    title: "24/7 website and social chat",
    body: "Smart chatbot deployed on the website, Instagram, and Facebook Messenger. Engages visitors instantly, answers community and floor plan questions, captures leads, and books appointments after hours.",
  },
  {
    label: "Phone system",
    title: "Native VOIP replacement",
    body: "Replaces CallRail and 3CX. Every call recorded and transcribed. AI auto-creates new contacts or appends conversation summaries to existing profiles. All tracking stays inside the platform.",
  },
  {
    label: "Reputation management",
    title: "Google review automation",
    body: "Post-close surveys route happy buyers directly to Google reviews and flag negative feedback internally before it goes public. Replaces Birdeye with no additional cost.",
  },
  {
    label: "AI content writer",
    title: "Brand-trained copywriting",
    body: "Generates emails, social posts, and ad copy trained on the specific builder's homes, communities, and selling points \u2014 not generic AI output. On-brand content from day one.",
  },
  {
    label: "Competitor intelligence",
    title: "Automated market tracking",
    body: "AI-generated case files on direct competitors. Tracks pricing, incentives, new listings, and Zillow data automatically. Configurable cadence. Includes side-by-side floor plan comparisons.",
  },
  {
    label: "AI sales coach",
    title: "Rep training via role-play",
    body: "Reps practice objection handling with an AI bot before live calls. Especially effective for onboarding new team members and building consistent messaging across the sales floor.",
  },
  {
    label: "Post-sale nurturing",
    title: "Lifecycle marketing",
    body: "Anniversary messages, birthday greetings, and home maintenance reminders keep past buyers engaged long after closing \u2014 driving referrals and reviews without any manual effort.",
  },
];

const replacedTools = [
  "Constant Contact",
  "CallRail",
  "3CX",
  "Birdeye",
  "HubSpot",
];

const techPills = [
  "White-label platform architecture",
  "Custom CSS injection",
  "JavaScript injection",
  "LLM integration",
  "Voice AI",
  "Conversation AI",
  "DOM MutationObserver",
  "SPA navigation hooks",
  "Native VOIP",
  "AI knowledge base training",
];

const learnings = [
  {
    bold: "Industry specificity is the product.",
    text: 'The same CRM functionality that lands lukewarmly when positioned generically becomes immediately compelling when every label, workflow, and default speaks the customer\u2019s exact language. "Homesites," "communities," "close of escrow" \u2014 that specificity is the competitive moat.',
  },
  {
    bold: "Stack consolidation is a stronger pitch than any feature list.",
    text: "Builders don\u2019t want to evaluate capabilities \u2014 they want to know what this replaces. Framing the platform as \u201cone system instead of five\u201d consistently lands harder than leading with individual features.",
  },
  {
    bold: "White-label economics unlock otherwise impossible pricing.",
    text: "Building on top of existing infrastructure changes the unit economics entirely \u2014 allowing enterprise-grade functionality at a price point a regional builder can justify without a formal procurement process.",
  },
  {
    bold: "AI adoption follows friction reduction, not feature excitement.",
    text: "Voice AI and Conversation AI succeeded not because builders were excited about AI \u2014 but because they quietly solved problems that already existed. Fewer missed calls. Faster follow-up. No behavior change required.",
  },
  {
    bold: "Training quality separates useful AI from impressive demos.",
    text: "The podcast interview process \u2014 extracting real institutional knowledge directly from the builder\u2019s team \u2014 is what makes the AI genuinely useful in the field rather than just technically impressive in a sales deck.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Divider = () => (
  <hr className="border-t border-white/[0.06] my-10 md:my-14" />
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground flex items-center gap-2.5 mb-4">
    <span className="inline-block w-7 h-px bg-muted-foreground/50" />
    {children}
  </p>
);

const BuilderStudioCaseStudy = () => {
  return (
    <main className="bg-background min-h-screen">
      <div className="max-w-[820px] mx-auto px-5 pt-32 pb-28">
        {/* Back */}
        <Link href="/#projects">
          <Button variant="ghost" size="sm" className="mb-8 -ml-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </Link>

        {/* ─── Hero ─────────────────────────────────────────── */}
        <motion.div {...fadeUp}>
          <SectionLabel>Case study</SectionLabel>

          <h1 className="text-3xl sm:text-4xl md:text-[2.8rem] font-bold leading-[1.12] tracking-tight text-foreground mb-5">
            Builder Studio &mdash;
            <br />
            <em className="font-normal italic">
              the all-in-one platform
              <br className="hidden sm:block" /> homebuilders never had
            </em>
          </h1>

          <p className="text-muted-foreground text-base md:text-[1.05rem] font-light leading-[1.8] max-w-[580px] mb-7">
            An AI-powered CRM and marketing platform designed from the ground up
            for residential homebuilders &mdash; replacing a fragmented stack of
            point solutions with a single system built around how builders
            actually sell.
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {tags.map((t) => (
              <span
                key={t}
                className="text-xs font-medium px-3.5 py-1.5 rounded-full border border-white/[0.12] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 border border-white/[0.08] rounded-xl overflow-hidden mb-10">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`py-5 px-5 ${
                  i < stats.length - 1 ? "border-b md:border-b-0 md:border-r" : ""
                } ${i % 2 === 0 && i < stats.length - 1 ? "border-r md:border-r" : ""} border-white/[0.08]`}
              >
                <div className="text-2xl md:text-3xl font-bold text-foreground leading-none mb-1.5">
                  {s.value}
                </div>
                <div className="text-[11.5px] text-muted-foreground leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <Divider />

        {/* ─── The Problem ──────────────────────────────────── */}
        <motion.div {...fadeUp}>
          <SectionLabel>The problem</SectionLabel>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4 leading-tight">
            A fragmented stack &mdash; and a market no one built for
          </h2>
          <p className="text-muted-foreground text-[0.97rem] font-light leading-[1.85] mb-4">
            Most homebuilders are running their sales and marketing operations
            across four, five, or six disconnected tools: a phone tracking
            service, a VOIP system, a review platform, an email marketing tool,
            and maybe a CRM bolted on as an afterthought. Leads fall through gaps
            between systems. Follow-up is inconsistent. And none of it was
            designed with a builder&rsquo;s sales cycle in mind.
          </p>
          <p className="text-muted-foreground text-[0.97rem] font-light leading-[1.85] mb-6">
            Enterprise platforms like HubSpot and Salesforce have the
            functionality &mdash; but price out regional builders, penalize growth
            with per-contact fees, and require months of configuration just to
            approximate what a builder actually needs. The industry had been
            underserved for so long that even solvable problems &mdash; like leads
            not making it into the CRM at all &mdash; were accepted as normal.
          </p>

          <div className="border-l-2 border-primary pl-5 py-4 bg-primary/[0.06] rounded-r-lg">
            <p className="italic text-foreground/80 text-[1.05rem] leading-[1.7]">
              &ldquo;The industry had been ignored for so long that even basic
              problems &mdash; like 50% of leads never making it into the system
              &mdash; were just accepted as the cost of doing business.&rdquo;
            </p>
          </div>
        </motion.div>

        <Divider />

        {/* ─── The Approach ─────────────────────────────────── */}
        <motion.div {...fadeUp}>
          <SectionLabel>The approach</SectionLabel>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4 leading-tight">
            Purpose-built, not generic with a new logo
          </h2>
          <p className="text-muted-foreground text-[0.97rem] font-light leading-[1.85] mb-6">
            Builder Studio was built by a team with nearly 30 years in
            homebuilder marketing. Every feature, workflow, and default was
            designed around the specific pain points builder sales and marketing
            teams face &mdash; not retrofitted from a general-purpose platform.
            The terminology, pipeline stages, automation logic, and AI training
            all reflect how builders actually operate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card/60 rounded-xl p-5 border border-white/[0.06]">
              <p className="text-sm font-medium text-foreground mb-2">
                Why white-label over build-from-scratch?
              </p>
              <p className="text-[13px] font-light text-muted-foreground leading-[1.7]">
                Building on existing platform infrastructure eliminates years of
                engineering overhead for commoditized CRM functionality &mdash;
                phone systems, email delivery, contact management &mdash; and
                redirects all energy toward the vertical differentiation and AI
                layer that actually matters.
              </p>
            </div>
            <div className="bg-card/60 rounded-xl p-5 border border-white/[0.06]">
              <p className="text-sm font-medium text-foreground mb-2">
                Why AI-first?
              </p>
              <p className="text-[13px] font-light text-muted-foreground leading-[1.7]">
                In an industry resistant to tech adoption, the fastest path to
                uptake is making the platform do the work automatically. Builders
                don&rsquo;t need more dashboards &mdash; they need fewer missed
                calls, faster follow-up, and less time on tasks the software
                should handle.
              </p>
            </div>
          </div>

          {/* Replaces row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] font-medium tracking-[0.06em] uppercase text-muted-foreground">
              Replaces
            </span>
            {replacedTools.map((tool) => (
              <span
                key={tool}
                className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-card/60 border border-white/[0.12] text-muted-foreground line-through decoration-white/30"
              >
                {tool}
              </span>
            ))}
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
              Builder Studio
            </span>
          </div>
        </motion.div>

        <Divider />

        {/* ─── What Was Built ───────────────────────────────── */}
        <motion.div {...fadeUp}>
          <SectionLabel>What was built</SectionLabel>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4 leading-tight">
            The full platform, end to end
          </h2>
          <p className="text-muted-foreground text-[0.97rem] font-light leading-[1.85] mb-6">
            Builder Studio covers the entire builder sales and marketing
            lifecycle &mdash; from first touch to post-close &mdash; in a single
            system.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-white/[0.08] rounded-xl overflow-hidden">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className={`p-5 ${
                  i < capabilities.length - 2 ? "border-b" : ""
                } ${i % 2 === 0 ? "md:border-r" : ""} border-white/[0.06]`}
              >
                <p className="text-[10.5px] font-medium tracking-[0.09em] uppercase text-muted-foreground mb-1">
                  {cap.label}
                </p>
                <p className="text-sm font-medium text-foreground mb-1.5">
                  {cap.title}
                </p>
                <p className="text-[13px] font-light text-muted-foreground leading-[1.65]">
                  {cap.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <Divider />

        {/* ─── Differentiation ──────────────────────────────── */}
        <motion.div {...fadeUp}>
          <SectionLabel>Differentiation</SectionLabel>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4 leading-tight">
            The AI knows your builder &mdash; not just the internet
          </h2>
          <p className="text-muted-foreground text-[0.97rem] font-light leading-[1.85] mb-4">
            Generic AI tools produce generic output. Builder Studio&rsquo;s AI
            bots are trained specifically on each client &mdash; their homes,
            floor plans, communities, selling points, and brand voice. Training
            combines website crawls, uploaded sales materials, and a signature
            onboarding process: a podcast-style deep interview conducted with the
            builder&rsquo;s own team.
          </p>
          <p className="text-muted-foreground text-[0.97rem] font-light leading-[1.85] mb-6">
            That interview content also doubles as an SEO and AI search asset.
            Repurposed across YouTube, the website, social, and blog, it gives
            search engines and AI assistants high-quality, original content to
            pull from when recommending builders in a market. With roughly 80% of
            homebuyers now using AI search tools during their research process,
            original content depth is increasingly what drives organic discovery.
          </p>

          <div className="border-l-2 border-primary pl-5 py-4 bg-primary/[0.06] rounded-r-lg">
            <p className="italic text-foreground/80 text-[1.05rem] leading-[1.7]">
              &ldquo;The AI doesn&rsquo;t just know the homes &mdash; it knows
              the market, the story, and the selling points the way a seasoned
              sales rep would after years on the floor.&rdquo;
            </p>
          </div>
        </motion.div>

        <Divider />

        {/* ─── Technical Implementation ─────────────────────── */}
        <motion.div {...fadeUp}>
          <SectionLabel>Technical implementation</SectionLabel>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-4 leading-tight">
            White-labeling from the inside out
          </h2>
          <p className="text-muted-foreground text-[0.97rem] font-light leading-[1.85] mb-4">
            Transforming a general-purpose platform into something genuinely
            industry-specific required deep customization at the UI layer. Custom
            CSS and JavaScript &mdash; injected at the agency level &mdash;
            restyle every visible surface, replace default terminology with
            builder-specific language (homesites, communities, buyer journey
            stages, close of escrow), and hook into the platform&rsquo;s
            single-page app navigation to deliver consistent branding across all
            sub-accounts.
          </p>
          <p className="text-muted-foreground text-[0.97rem] font-light leading-[1.85] mb-6">
            The work demands operating within &mdash; and creatively around
            &mdash; an underlying React architecture not designed for external
            modification. Stable DOM selectors, MutationObservers for navigation
            detection, and carefully scoped injection logic make the
            customizations resilient to platform updates without requiring a full
            rebuild on every release.
          </p>

          <div className="flex flex-wrap gap-2">
            {techPills.map((pill) => (
              <span
                key={pill}
                className="text-xs font-medium px-3 py-1.5 rounded-full bg-card/60 border border-white/[0.08] text-muted-foreground"
              >
                {pill}
              </span>
            ))}
          </div>
        </motion.div>

        <Divider />

        {/* ─── Key Learnings ────────────────────────────────── */}
        <motion.div {...fadeUp}>
          <SectionLabel>Key learnings</SectionLabel>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-5 leading-tight">
            What this project taught me
          </h2>

          <div className="bg-card/40 rounded-xl p-6 border border-white/[0.06]">
            {learnings.map((item, i) => (
              <div
                key={i}
                className={`flex gap-4 py-4 ${
                  i < learnings.length - 1
                    ? "border-b border-white/[0.06]"
                    : ""
                } ${i === 0 ? "pt-0" : ""} ${
                  i === learnings.length - 1 ? "pb-0" : ""
                }`}
              >
                <span className="text-xl font-bold text-muted-foreground/60 min-w-[28px] leading-none pt-0.5 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.93rem] font-light text-muted-foreground leading-[1.75]">
                  <strong className="font-medium text-foreground">
                    {item.bold}
                  </strong>{" "}
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── CTA ──────────────────────────────────────────── */}
        <div className="mt-14 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Building a product or platform?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              I can help you design and build AI-powered tools that solve real
              industry problems.
            </p>
            <Button asChild size="lg">
              <Link href="/#contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default BuilderStudioCaseStudy;
