import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft, ArrowRight, Video, Megaphone, Palette,
  Cpu, Users, Globe, ChevronRight, ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] },
  }),
};

const tags = [
  "Nonprofit",
  "Campaigns & Storytelling",
  "Brand Architecture",
  "MarTech",
  "Personalization",
  "2021–Present",
];

const campaigns = [
  {
    name: "Making Spirits Bright",
    body: "A narrative-driven holiday campaign centered on the voices of shoppers across Community Food Share's primary programs, including Feeding Families, Mobile Pantries, and Blue Spruce Neighbors. We interviewed shoppers from each program and turned those conversations into videos used throughout a broader campaign across digital ads, email, direct mail, and social media. Still photography ran alongside the video content to create a cohesive visual and emotional identity across channels. This campaign was about more than seasonal messaging. It was about helping supporters hear directly from the people and communities at the heart of the work.",
    cta: null,
  },
  {
    name: "Retail to the Rescue",
    body: "A campaign built around Community Food Share's retail rescue program, where drivers collect food from local retail partners and bring it back to the warehouse to be distributed into the community. The campaign included interview-based video, interactive blog landing pages, and a follow-the-journey direct mail and email experience that allowed supporters to move step by step through the path rescued food takes from pickup to impact. The challenge here was turning logistics into narrative without losing the operational reality underneath it. The result was a campaign that made an often overlooked part of the food system feel visible, tangible, and worth following.",
    cta: { label: "Explore the Retail to the Rescue journey", href: "https://communityfoodshare.org" },
  },
  {
    name: "Fuel Their Summer",
    body: "A summer hunger campaign focused on feeding children during school break, anchored by a series of videos featuring Ximena, an 11-year-old volunteer and shopper at Community Food Share. Ximena became the face of the campaign, helping ground the work in a real voice and lived perspective rather than generic seasonal messaging. The campaign also included a Fuel Their Summer corporate challenge leaderboard platform designed to increase engagement and participation. What made this campaign work was that it centered a real person, not just a theme. That gave the message warmth, specificity, and a stronger emotional center.",
    cta: { label: "Watch the Fuel Their Summer video", href: "https://communityfoodshare.org" },
  },
];

const techStack = [
  { name: "Classy", detail: "Donation experience and donor engagement" },
  { name: "HubSpot", detail: "Centralized marketing and campaign platform" },
  { name: "Google Analytics", detail: "Campaign success, engagement, and revenue tracking" },
  { name: "Omatic", detail: "Connector across platforms and data environments" },
];

const outcomes = [
  "Stronger campaign cohesion across channels",
  "Clearer storytelling around key programs and supporter impact",
  "More intentional personalization and audience-based communication",
  "Improved infrastructure for donor engagement, campaign management, and analytics",
  "A more defined visual identity across major programs",
  "Greater ability to communicate the mission in ways that were both strategic and human",
];

const principles = [
  {
    heading: "Mission has to come before marketing.",
    body: "If the story is not grounded in the actual work, the communication falls flat.",
  },
  {
    heading: "Good storytelling and good systems should reinforce each other.",
    body: "Strong campaigns perform better when the infrastructure behind them is connected, measurable, and built to support long-term engagement.",
  },
  {
    heading: "Innovation only matters if it creates real utility.",
    body: "Whether the tool is a new platform, a new workflow, or an emerging AI use case, the point is not novelty for its own sake. The point is to make the work clearer, more effective, more human, or more scalable.",
  },
];

export default function CommunityFoodShareCaseStudy() {
  return (
    <div className="min-h-screen">

      {/* Back nav */}
      <div className="container max-w-4xl mx-auto px-4 md:px-6 pt-8">
        <Link href="/#projects">
          <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to projects
          </button>
        </Link>
      </div>

      {/* Hero */}
      <section className="container max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6">
            {tags.map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {t}
              </span>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-3">
            Community Food Share
          </motion.p>

          <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
            Story, Systems, and Strategy in Service of a Mission
          </motion.h1>

          <motion.div variants={fadeUp} className="space-y-4 text-muted-foreground leading-relaxed md:text-lg">
            <p>
              Community Food Share operates at the intersection of hunger relief, donor engagement, volunteer activation, public education, and community trust. That creates a communications challenge that goes well beyond promotion.
            </p>
            <p>
              The work requires telling stories with dignity, making impact easier to understand, building consistency across campaigns and channels, and helping a mission-driven organization adopt stronger tools and workflows without making the communication colder or more mechanical.
            </p>
            <p>
              That tension shaped a lot of the work: urgency without fearmongering, clarity without flattening complexity, innovation without losing humanity.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Campaigns & Storytelling */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Video className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">Campaigns & Storytelling</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold mb-3">
              Building campaigns that informed, moved, and activated people
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-12 max-w-2xl">
              A major part of the work involved helping shape and execute campaigns across video, email, direct mail, social media, and digital experiences. The goal was never just to push information out. It was to build campaigns that felt connected, intentional, and rooted in real stories.
            </motion.p>

            <div className="space-y-8">
              {campaigns.map((c, i) => (
                <motion.div
                  key={c.name}
                  custom={i}
                  variants={fadeUp}
                  className="premium-card p-6 md:p-8"
                >
                  <h3 className="text-lg md:text-xl font-bold mb-4 text-foreground">{c.name}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4">{c.body}</p>
                  {c.cta && (
                    <a
                      href={c.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {c.cta.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Architecture */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Palette className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">Brand Architecture</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold mb-6">
              Building a clearer identity across programs
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-4 text-muted-foreground leading-relaxed mb-10">
              <p>
                As Community Food Share expanded and clarified its public-facing programs, part of the work involved helping create a stronger brand structure across those offerings.
              </p>
              <p>
                This included leading a website redesign and helping develop sub-brands for key programs such as Feeding Families, Mobile Pantries, Blue Spruce Neighbors, and the 303 Sustainers program. The goal was not just visual differentiation. It was to help each program feel distinct, recognizable, and intentional while still fitting within a cohesive larger Community Food Share identity.
              </p>
              <p>
                Strong brand architecture makes it easier for people to understand what an organization offers, how its programs relate to one another, and where they fit into the broader mission.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Feeding Families", "Mobile Pantries", "Blue Spruce Neighbors", "303 Sustainers"].map(prog => (
                <div
                  key={prog}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-5 text-center"
                >
                  <span className="text-sm font-medium text-foreground/80">{prog}</span>
                </div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="mt-4 text-xs text-muted-foreground/60 text-center">
              Program identity marks developed to help Community Food Share communicate more clearly across key service areas and supporter pathways.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tech Renovation */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Cpu className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">Tech Renovation</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold mb-6">
              Modernizing the infrastructure behind engagement
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-4 text-muted-foreground leading-relaxed mb-10">
              <p>
                Alongside campaign and storytelling work, I helped lead the implementation of a more connected donor engagement and marketing ecosystem. This included introducing and strengthening tools that improved donation workflows, campaign management, reporting visibility, and cross-platform coordination.
              </p>
              <p>
                This work mattered because stronger campaigns do not live on messaging alone. They depend on infrastructure that allows organizations to understand performance, communicate more intentionally, and create a better experience for supporters over time.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {techStack.map((t, i) => (
                <motion.div
                  key={t.name}
                  custom={i}
                  variants={fadeUp}
                  className="flex items-start gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5"
                >
                  <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-0.5">{t.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Personalization at Scale */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">Personalization at Scale</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold mb-6">
              Creating more relevant supporter experiences
            </motion.h2>

            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-10">
              A major through-line in this work has been finding better ways to make supporter communication feel more relevant, personal, and reflective of the people receiving it.
            </motion.p>

            <div className="space-y-6">
              {[
                {
                  title: "Impact Wrapped",
                  body: "Impact Wrapped was built around the idea that donor communication can be more meaningful when it helps individuals clearly see the difference their support made. By creating personalized impact reports for individual donors, the project moved beyond generic gratitude and toward a more personal, story-driven expression of impact.",
                  link: { label: "View Impact Wrapped", href: "https://iw-fy25.communityfoodshare.org/impact?data=VTJGc2RHVmtYMTlCV3duVWNraTN5MDFLY2JTQ2ZJNS8wNkpSWlR1eVlJZFZYdUE5clhjbk5nZUlxYUxlZUUyT2ZuMWVHRUNTRzdUUDlmcm1KMTVyYUtKMzJTNHRsQnNsMEw1amtQT1NzbDltTWRIOC9yVWpsSnZUWi9CQ1BySWFRSmRzSFlaa2hLL3JsUXJHV3pkQVVDTUxUb2l0NU5udGg1dEt6VUxzVTFJQ1VSZ3M5YnVETHFWdWlVejNWU0dlM09XRzFCS1owMmp6MHZRbHhSdDR6alQwUlMxcXN0aVBDS1B3V0RDSWMxWWJqRVUreFkzczR6YW5nMTc4eG9iUWtLbEpvTEZlWHE1YmhDSUNVYW5uL2FqTFhVWGxlY094alZpYURteHJTSnhHYUFVbFc5N3huaVMrN0thRE5QRGVzd2hHemhiWldiZndtb1NLYmpxMkdlVXRIUXJCWUdJN250NWRvUEsvYWE4PQ%3D%3D" },
                },
                {
                  title: "Audience-Based Lead Nurturing",
                  body: "Lead nurturing workflows were built around the interests of different audience groups, including donors, volunteers, and community members. This allowed communication to become more tailored to what people actually cared about, rather than relying entirely on one-size-fits-all messaging.",
                  link: null,
                },
                {
                  title: "Interest-Based Drip Campaigns",
                  body: "Drip campaigns were developed to support more relevant follow-up based on audience interest and engagement behavior. The larger goal across all of this work was simple: move from mass communication toward more responsive communication, without losing clarity or human tone in the process.",
                  link: null,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i}
                  variants={fadeUp}
                  className="premium-card p-6 md:p-8"
                >
                  <h3 className="text-base md:text-lg font-bold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-3">{item.body}</p>
                  {item.link && (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {item.link.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Public Visibility */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">Public Visibility & PR</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold mb-6">
              Helping extend the organization's voice beyond owned channels
            </motion.h2>

            <motion.div variants={fadeUp} className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Community Food Share's story also needed to reach beyond its own campaigns and platforms.
              </p>
              <p>
                Part of this role involved supporting public visibility through earned media and local press engagement, including interviews and coverage through outlets such as 9News, Denver7, and other local media.
              </p>
              <p>
                This helped extend the organization's reach, strengthen awareness, and bring greater visibility to the realities of food insecurity and community response across the region.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How I Approached the Work */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Megaphone className="h-4 w-4 text-primary" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">How I Approached the Work</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold mb-3">
              Connecting story, systems, and strategy
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-10">
              The approach to this work was rooted in a few core principles.
            </motion.p>

            <div className="space-y-4">
              {principles.map((p, i) => (
                <motion.div
                  key={p.heading}
                  custom={i}
                  variants={fadeUp}
                  className="flex gap-5 rounded-xl border border-white/[0.08] bg-white/[0.03] p-6"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-bold text-primary">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1 text-sm md:text-base">{p.heading}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold mb-3">
              What this work helped strengthen
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-8">
              This work helped support a more connected and capable communications ecosystem across Community Food Share.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-3">
              {outcomes.map((o, i) => (
                <motion.div
                  key={o}
                  custom={i}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{o}</p>
                </motion.div>
              ))}
            </div>

            <motion.p variants={fadeUp} className="mt-8 text-sm text-muted-foreground/70 leading-relaxed italic">
              Not every outcome is best measured by a single metric. Some of the most important gains came through stronger alignment, better systems, and a clearer public-facing story across the organization's work.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Closing Reflection */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold mb-6">
              Building systems that support the human side of impact
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                This work at Community Food Share sharpened a belief I carry into everything else I build: the strongest communications ecosystems are the ones where story, systems, and strategy reinforce each other.
              </p>
              <p>
                The goal is not just to reach more people. It is to create infrastructure and messaging that make impact easier to understand, more personal to experience, and more human to connect with.
              </p>
              <p className="font-medium text-foreground">
                That is the kind of work I want to keep doing.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="premium-card p-8 md:p-12 text-center"
          >
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold mb-4">
              Want to talk about what this kind of work could look like for you?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Whether you need stronger campaigns, better systems, or a clearer story, the work is most effective when all three are connected.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-lg shadow-primary/20 px-7">
                <Link href="/#contact">
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/20 hover:bg-white/5 px-7">
                <Link href="/#projects">
                  View more work
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
