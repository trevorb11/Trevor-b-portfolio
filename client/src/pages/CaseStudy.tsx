import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import {
  ArrowLeft,
  ExternalLink,
  Database,
  Video,
  Mail,
  Ticket,
  Sparkles,
  Building2,
  Map,
  Brain,
  Trophy,
  BarChart3,
  Globe,
  Phone,
  Users,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectItem {
  title: string;
  tag: string;
  tagColor: string;
  description: string;
  features: string[];
  link?: string;
  icon: React.ReactNode;
}

interface CaseStudyData {
  slug: string;
  client: string;
  title: string;
  heroDescription: string;
  tagLabel: string;
  tagColor: string;
  challenge: string;
  approach: string;
  projects: ProjectItem[];
  testimonial?: {
    quote: string;
    author: string;
    organization: string;
  };
  ctaTitle: string;
  ctaDescription: string;
}

const caseStudies: CaseStudyData[] = [
  // ── Impact Wrapped ──────────────────────────────────────────────
  {
    slug: "impact-wrapped",
    client: "Community Food Share",
    title: "Impact Wrapped: Turning Donor Data into Stories",
    heroDescription:
      "Inspired by Spotify Wrapped, Impact Wrapped transforms raw donation data into personalized, animated impact stories, showing each supporter exactly how their contributions made a difference throughout the year.",
    tagLabel: "Data Visualization",
    tagColor: "bg-rose-500/15 text-rose-400",
    challenge:
      "Nonprofits pour effort into fundraising but often struggle to close the loop with donors. Generic thank-you emails fail to convey the real-world impact of individual gifts, leading to donor fatigue and lower retention. Community Food Share needed a way to make every donor feel personally connected to the mission.",
    approach:
      "I built a fully personalized, interactive web experience that pulls each donor's giving history from the Blackbaud CRM and translates it into meaningful, animated metrics: meals provided, families served, pounds of food rescued. The experience is mobile-first, shareable on social media, and designed to create an emotional connection that a PDF receipt never could.",
    projects: [
      {
        title: "Impact Wrapped FY25",
        tag: "Data Visualization",
        tagColor: "bg-rose-500/15 text-rose-400",
        description:
          "The full interactive experience that walks donors through their personal impact story with animated data visualizations, meal equivalency calculations, and year-over-year comparisons. Each donor receives a unique, shareable link generated from encrypted CRM data.",
        features: [
          "Dynamic data visualization pulling from Blackbaud CRM",
          "Personalized impact metrics for each donor",
          "Animated, mobile-responsive experience",
          "Social sharing capabilities for organic reach",
          "Year-over-year comparison for returning donors",
          "Encrypted donor data URLs for privacy",
        ],
        link: "https://iw-fy25.communityfoodshare.org/impact?data=VTJGc2RHVmtYMTlCV3duVWNraTN5MDFLY2JTQ2ZJNS8wNkpSWlR1eVlJZFZYdUE5clhjbk5nZUlxYUxlZUUyT2ZuMWVHRUNTRzdUUDlmcm1KMTVyYUtKMzJTNHRsQnNsMEw1amtQT1NzbDltTWRIOC9yVWpsSnZUWi9CQ1BySWFRSmRzSFlaa2hLL3JsUXJHV3pkQVVDTUxUb2l0NU5udGg1dEt6VUxzVTFJQ1VSZ3M5YnVETHFWdWlVejNWU0dlM09XRzFCS1owMmp6MHZRbHhSdDR6alQwUlMxcXN0aVBDS1B3V0RDSWMxWWJqRVUreFkzczR6YW5nMTc4eG9iUWtLbEpvTEZlWHE1YmhDSUNVYW5uL2FqTFhVWGxlY094alZpYURteHJTSnhHYUFVbFc5N3huaVMrN0thRE5QRGVzd2hHemhiWldiZndtb1NLYmpxMkdlVXRIUXJCWUdJN250NWRvUEsvYWE4PQ%3D%3D",
        icon: <Sparkles className="h-6 w-6" />,
      },
    ],
    ctaTitle: "Want a Wrapped-Style Experience for Your Organization?",
    ctaDescription: "Impact Wrapped can be adapted for any nonprofit or membership organization that wants to turn supporter data into shareable stories.",
  },

  // ── Community Food Share ────────────────────────────────────────
  {
    slug: "community-food-share",
    client: "Community Food Share",
    title: "Transforming Donor Engagement Through Custom MarTech Solutions",
    heroDescription:
      "Community Food Share is Colorado's largest food bank, serving Boulder and Broomfield counties. As their marketing technology partner, I developed a suite of custom tools that transformed how they engage with donors, manage events, and communicate impact.",
    tagLabel: "Nonprofit MarTech",
    tagColor: "bg-emerald-500/15 text-emerald-400",
    challenge:
      "Like many nonprofits, Community Food Share faced the challenge of donor retention and engagement. Their existing tools were disconnected, making it difficult to create personalized experiences, track donor journeys, and demonstrate individual impact. They needed a cohesive technology strategy that would work within their Blackbaud ecosystem while pushing the boundaries of what's possible in nonprofit marketing.",
    approach:
      "Rather than recommending expensive off-the-shelf solutions, I worked closely with the CFS team to identify specific pain points and build custom tools that integrated seamlessly with their existing CRM. Each solution was designed to be maintainable, scalable, and focused on measurable outcomes.",
    projects: [
      {
        title: "Impact Wrapped",
        tag: "Data Visualization",
        tagColor: "bg-rose-500/15 text-rose-400",
        description:
          "Inspired by Spotify Wrapped, I created a personalized annual impact report for each donor. This interactive experience pulls individual donation data and translates it into meaningful metrics (meals provided, families served, and community impact) presented through engaging animations and shareable graphics.",
        features: [
          "Dynamic data visualization pulling from Blackbaud CRM",
          "Personalized impact metrics for each donor",
          "Animated, mobile-responsive experience",
          "Social sharing capabilities for organic reach",
          "Year-over-year comparison for returning donors",
        ],
        link: "https://iw-fy25.communityfoodshare.org/impact?data=VTJGc2RHVmtYMTlCV3duVWNraTN5MDFLY2JTQ2ZJNS8wNkpSWlR1eVlJZFZYdUE5clhjbk5nZUlxYUxlZUUyT2ZuMWVHRUNTRzdUUDlmcm1KMTVyYUtKMzJTNHRsQnNsMEw1amtQT1NzbDltTWRIOC9yVWpsSnZUWi9CQ1BySWFRSmRzSFlaa2hLL3JsUXJHV3pkQVVDTUxUb2l0NU5udGg1dEt6VUxzVTFJQ1VSZ3M5YnVETHFWdWlVejNWU0dlM09XRzFCS1owMmp6MHZRbHhSdDR6alQwUlMxcXN0aVBDS1B3V0RDSWMxWWJqRVUreFkzczR6YW5nMTc4eG9iUWtLbEpvTEZlWHE1YmhDSUNVYW5uL2FqTFhVWGxlY094alZpYURteHJTSnhHYUFVbFc5N3huaVMrN0thRE5QRGVzd2hHemhiWldiZndtb1NLYmpxMkdlVXRIUXJCWUdJN250NWRvUEsvYWE4PQ%3D%3D",
        icon: <Database className="h-6 w-6" />,
      },
      {
        title: "Corporate Challenge Campaign Platform",
        tag: "Gamified Fundraising",
        tagColor: "bg-indigo-500/15 text-indigo-400",
        description:
          "A gamified corporate fundraising platform that engages corporate partners in friendly competition while tracking donations, team performance, and real-time leaderboards to maximize fundraising outcomes.",
        features: [
          "Real-time leaderboard with live donation tracking",
          "Corporate team registration and management",
          "Gamification elements to drive engagement",
          "Blackbaud integration for donation processing",
          "Admin dashboard for campaign management",
        ],
        link: "https://msb-cc.communityfoodshare.org/",
        icon: <BarChart3 className="h-6 w-6" />,
      },
      {
        title: "14 Tons Campaign Microsite",
        tag: "Campaign Microsite",
        tagColor: "bg-emerald-500/15 text-emerald-400",
        description:
          "A specialized campaign microsite for Community Food Share's 14 Tons fundraising initiative, highlighting donor impact through compelling storytelling and facilitating online donations with a seamless giving experience.",
        features: [
          "Impact-focused storytelling and visuals",
          "Integrated donation forms with Blackbaud",
          "Campaign progress tracking",
          "Mobile-optimized responsive design",
        ],
        link: "https://communityfoodshare.org/14-tons/",
        icon: <Globe className="h-6 w-6" />,
      },
      {
        title: "Monthly Donor Upgrade Campaign",
        tag: "Campaign Strategy",
        tagColor: "bg-teal-500/15 text-teal-400",
        description:
          "A sophisticated automated campaign system designed to convert one-time donors into recurring monthly sustainers. The campaign uses behavioral triggers, personalized messaging, and strategic timing to maximize conversion while maintaining authentic donor relationships.",
        features: [
          "Behavioral trigger-based email sequences",
          "A/B tested messaging and timing optimization",
          "Donor segmentation based on giving history",
          "Personalized ask amounts based on capacity",
          "Automated follow-up and nurture sequences",
        ],
        icon: <Mail className="h-6 w-6" />,
      },
      {
        title: "Smart Video Embed Tool",
        tag: "Custom Development",
        tagColor: "bg-orange-500/15 text-orange-400",
        description:
          "A custom YouTube wrapper that transforms passive video viewers into engaged donors. The moment a video ends, viewers are automatically redirected to a contextually relevant landing page, capturing the emotional momentum of impact storytelling.",
        features: [
          "Seamless YouTube video embedding",
          "Automatic redirect on video completion",
          "Customizable destination URLs per video",
          "Analytics integration for conversion tracking",
          "Mobile-optimized experience",
        ],
        icon: <Video className="h-6 w-6" />,
      },
      {
        title: "Custom Event Portal",
        tag: "Event Technology",
        tagColor: "bg-violet-500/15 text-violet-400",
        description:
          "An end-to-end event management and ticketing system built specifically for nonprofit event complexity. The portal handles everything from registration to check-in, with full integration to Blackbaud for constituent tracking and post-event engagement.",
        features: [
          "Custom registration forms with conditional logic",
          "Tiered ticketing and table management",
          "Real-time attendee dashboard",
          "Blackbaud CRM integration for constituent data",
          "Automated confirmation and reminder emails",
          "Day-of check-in system with QR codes",
        ],
        link: "https://events-rr.communityfoodshare.org/",
        icon: <Ticket className="h-6 w-6" />,
      },
    ],
    testimonial: {
      quote:
        "Trevor's approach to our marketing technology challenges was exactly what we needed. Rather than pushing expensive platforms, he built custom solutions that work seamlessly with our existing systems. The Impact Wrapped experience alone has transformed how our donors see their contribution.",
      author: "Marketing Director",
      organization: "Community Food Share",
    },
    ctaTitle: "Ready to Transform Your Nonprofit's Technology?",
    ctaDescription: "Let's discuss how custom MarTech solutions can solve your organization's unique challenges.",
  },

  // ── HomeBuilder Studio ──────────────────────────────────────────
  {
    slug: "home-builder-studio",
    client: "HomeBuilder Studio",
    title: "An AI-First CRM for Modern Home Builders",
    heroDescription:
      "HomeBuilder Studio reimagines the home builder CRM from the ground up, replacing clunky legacy systems with an intelligent, AI-powered platform that automates lead management, personalizes buyer journeys, and gives sales teams superpowers.",
    tagLabel: "AI & CRM",
    tagColor: "bg-amber-500/15 text-amber-400",
    challenge:
      "Home builders rely on CRMs designed for generic sales pipelines. These tools don't understand the nuances of the home buying journey: long sales cycles, community-specific inventory, design center selections, and construction milestones. Sales teams end up fighting their tools instead of focusing on buyers.",
    approach:
      "I designed and built HomeBuilder Studio as an AI-first platform purpose-built for the residential construction industry. Every feature, from lead scoring to follow-up automation, was designed around how home builders actually sell, not how generic CRMs think they should.",
    projects: [
      {
        title: "HomeBuilder Studio Platform",
        tag: "Full Product",
        tagColor: "bg-amber-500/15 text-amber-400",
        description:
          "The complete HomeBuilder Studio platform: an AI-powered CRM built specifically for residential home builders. Features intelligent lead management, automated buyer journey tracking, community and lot inventory management, and AI-assisted sales tools.",
        features: [
          "AI-powered lead scoring and prioritization",
          "Automated follow-up sequences tailored to buyer stage",
          "Community and lot inventory management",
          "Design center selection tracking",
          "Construction milestone communication",
          "Modern, responsive dashboard with real-time analytics",
        ],
        link: "https://vitale-ci.homebuilder.studio/",
        icon: <Building2 className="h-6 w-6" />,
      },
    ],
    ctaTitle: "Building a Product or Platform?",
    ctaDescription: "I can help you design and build AI-powered tools that solve real industry problems.",
  },

  // ── Financial Services Automation ───────────────────────────────
  {
    slug: "financial-services-automation",
    client: "Multi-lender business funding brokerage (40+ funder network)",
    title: "Sales & Marketing Infrastructure for a Multi-Lender Business Funding Brokerage",
    heroDescription:
      "The full sales and marketing infrastructure for a high-volume alternative lending brokerage. From cold lead sourcing to funded outcome to post-close client support, every step was built into a single connected system spanning CRM architecture, multi-channel outreach, custom technology, and compliance.",
    tagLabel: "Sales Infrastructure",
    tagColor: "bg-indigo-500/15 text-indigo-400",
    challenge:
      "A high-volume alternative lending brokerage needed sales and marketing infrastructure that could match the right business with the right funding option at the right moment. With a 40+ funder network and small business clients (revenue $500K–$5M) seeking $100K–$500K in working capital, the operation had to source and enrich leads, move them through a multi-stage pipeline, submit deals to lenders, and support funded clients afterward, all without anything falling through the cracks across CRM, outreach, technology, and compliance.",
    approach:
      "I designed and built the full sales and marketing infrastructure end to end as Marketing & Operations Lead. The work spanned CRM architecture, multi-channel outreach, custom technology builds, and compliance, all oriented around a single objective: match the right business with the right funding option at the right moment. Every component was built to function as part of a single connected system rather than as isolated tools that happen to coexist.",
    projects: [
      {
        title: "Lead Management Architecture",
        tag: "CRM Stack",
        tagColor: "bg-indigo-500/15 text-indigo-400",
        description:
          "A tightly integrated lead management stack spanning GoHighLevel (GHL), a custom-built deal lifecycle platform, and Salesforce. Each platform serves a distinct function across the sales cycle, with leads flowing from cold contact to funded outcome through a documented, visible, and auditable path across all three systems.",
        features: [
          "GoHighLevel as the operational CRM for inbound capture, outbound sequencing, pipeline tracking, and call dispositions",
          "Custom React/TypeScript deal lifecycle platform managing application flow, document collection, underwriting, and offers",
          "Salesforce as the reporting layer for rep performance, portfolio health, funding volume, and lender relationships",
          "Tagged and scored contact routing based on source, engagement, and product fit",
          "Structured deal-status visibility so reps see exactly where a deal stands without piecing it together from notes",
          "Cross-platform sync ensuring every step is documented and auditable",
        ],
        icon: <Database className="h-6 w-6" />,
      },
      {
        title: "Industry-Specific, Stage-Aware Nurture Sequences",
        tag: "Multi-Channel Outreach",
        tagColor: "bg-emerald-500/15 text-emerald-400",
        description:
          "Generic nurture sequences fail in business lending because a seasonal trucking company, a growing medical practice, and a restaurant chain are not the same contact. They have different cash flow patterns, different capital needs, and different reasons to say yes or no. Multi-channel email and SMS sequences are organized across two primary axes: industry vertical and business stage.",
        features: [
          "Trucking and transportation: fleet expansion, equipment financing, fuel and operating capital",
          "Construction: project-based working capital, equipment, seasonal bridge financing",
          "Healthcare: equipment upgrades, practice growth, payroll stabilization",
          "Restaurants and retail: renovation, expansion, inventory, seasonal scaling",
          "Early-stage growth companies: revenue-based credit lines and flexibility-forward messaging",
          "Established operators with expensive existing positions: consolidation and refinancing framing",
          "Hard-asset businesses: equipment financing with tangible ROI framing",
          "Larger multi-location operators: SBA positioning and relationship-focused outreach",
        ],
        icon: <Mail className="h-6 w-6" />,
      },
      {
        title: "Lead Enrichment and Personalization Pipeline",
        tag: "Data & AI",
        tagColor: "bg-amber-500/15 text-amber-400",
        description:
          "Raw lead data is not sufficient for a rep to have a credible first conversation. The enrichment layer normalizes, scores, and classifies every contact before it ever reaches a rep, then layers AI-assisted personalization on top for high-priority outbound segments. Reps spend less time researching before a call and more time in conversations with context already in hand.",
        features: [
          "Python-based processing pipeline for normalization, scoring, and classification",
          "Lead evaluation based on funding history, business activity, product fit, and outreach priority",
          "Direct GHL CSV import format with no manual reformatting required",
          "Color-coded rep-facing prioritization views built in Excel",
          "Browser-based AI personalization tool for company-level message customization at scale",
          "5,000+ contact referral partner campaign delivered through the personalization tool",
        ],
        icon: <Brain className="h-6 w-6" />,
      },
      {
        title: "Custom Dialer, SMS Middleware, and AI Sales Tooling",
        tag: "Telephony & AI",
        tagColor: "bg-rose-500/15 text-rose-400",
        description:
          "The sales team runs high-volume outbound cold calling. Every component supporting that process was custom-built to eliminate the friction points that erode rep productivity at scale, from answer-gap latency on dialers to compliance gaps on SMS to admin overhead on call notes.",
        features: [
          "Custom power dialer architected on a Twilio conference bridge to eliminate answer-gap latency",
          "Compliant SMS middleware rebuilt to meet 10DLC/A2P carrier registration requirements",
          "Native opt-in consent page and character-limit-aware copy standards",
          "Full Twilio integration through GHL for warm follow-up and appointment confirmation",
          "AI-generated sales notes after every call disposition to reduce rep admin time",
          "AI research summaries on inbound and outbound leads so reps open every record with context",
          "List-level AI lead research for higher-priority outbound segments",
        ],
        icon: <Phone className="h-6 w-6" />,
      },
      {
        title: "Merchant Portal for Funded Clients",
        tag: "Post-Funding Experience",
        tagColor: "bg-violet-500/15 text-violet-400",
        description:
          "Most brokerage relationships end at funding. This engagement included scoping and prototyping a merchant-facing portal designed to extend that relationship, giving funded business owners a resource they can actually use once capital is in hand. The portal positions the brokerage as a long-term partner, not a one-time transaction.",
        features: [
          "Curated business operations resources organized by industry vertical",
          "Vendor management, hiring, and operational efficiency guides and templates",
          "Built-in financial monitoring for expense tracking and revenue trends",
          "Payoff schedules, advance balance visibility, and forward-looking cash flow indicators",
          "Business growth resources covering goal-setting, scaling, and additional capital decisions",
          "Magic-link authentication with no username or password friction",
          "Mobile-responsive interface designed for business owners who check things on their phone",
        ],
        icon: <Users className="h-6 w-6" />,
      },
      {
        title: "End-to-End System Integration",
        tag: "Connected Operations",
        tagColor: "bg-sky-500/15 text-sky-400",
        description:
          "Every component above was built to function as part of a single connected system, not as isolated tools that happen to coexist. A lead can enter cold through a UCC-sourced list and run through enrichment, outreach, qualification, lender submission, funding, and post-close engagement without a rep ever re-entering information that already exists upstream.",
        features: [
          "Defined lifecycle path from cold UCC list to funded client using merchant portal resources",
          "Python pipeline enrichment and scoring with direct GHL import",
          "Tag-based routing into industry- and stage-specific nurture sequences",
          "Outreach via the custom power dialer or compliant SMS middleware",
          "Disposition capture feeding automated AI notes",
          "Deal platform progression for lender submission and offer management",
          "Salesforce sync at close for reporting and accountability",
          "Post-funding access to merchant portal resources",
        ],
        icon: <Workflow className="h-6 w-6" />,
      },
    ],
    ctaTitle: "Need Sales Infrastructure That Connects?",
    ctaDescription:
      "I help operators build connected sales and marketing systems where data and context flow at every handoff, so high-volume outbound, active deal flow, and post-funding support can run simultaneously without anything falling through the cracks.",
  },

  // ── Nonprofit Tools & Workflows ─────────────────────────────────
  {
    slug: "nonprofit-tools",
    client: "Various Nonprofits",
    title: "Purpose-Built Tools for Nonprofit Operations",
    heroDescription:
      "A collection of custom-built tools designed to solve specific nonprofit operational challenges, from converting video viewers into donors, to gamifying corporate fundraising, to streamlining complex event registration workflows.",
    tagLabel: "Custom Development",
    tagColor: "bg-indigo-500/15 text-indigo-400",
    challenge:
      "Nonprofits often face a gap between what off-the-shelf tools offer and what their operations actually need. Generic platforms are either too expensive, too complex, or missing the specific features that would move the needle on fundraising and engagement. Each organization has unique workflows that deserve purpose-built solutions.",
    approach:
      "For each tool, I started by deeply understanding the specific workflow or problem, then built focused solutions that integrate with existing systems (especially Blackbaud). The goal was always: solve one problem extremely well, keep it maintainable, and make it feel seamless to the end user.",
    projects: [
      {
        title: "Smart Video Embed Tool",
        tag: "Conversion Tool",
        tagColor: "bg-orange-500/15 text-orange-400",
        description:
          "A custom YouTube wrapper that automatically redirects viewers to a specific landing page the moment a video ends. This captures the emotional momentum of impact storytelling and converts passive viewers into active donors.",
        features: [
          "Seamless YouTube video embedding with custom controls",
          "Automatic redirect on video completion",
          "Customizable destination URLs per video",
          "Analytics integration for conversion tracking",
          "Mobile-optimized experience",
        ],
        icon: <Video className="h-6 w-6" />,
      },
      {
        title: "Corporate Challenge Leaderboard",
        tag: "Gamified Fundraising",
        tagColor: "bg-indigo-500/15 text-indigo-400",
        description:
          "A gamified corporate fundraising platform that turns corporate giving into friendly competition. Real-time leaderboards, team tracking, and engagement mechanics drive higher participation and donation totals.",
        features: [
          "Real-time leaderboard with live donation tracking",
          "Corporate team registration and management",
          "Gamification elements to drive engagement",
          "Blackbaud integration for donation processing",
          "Admin dashboard for campaign management",
        ],
        link: "https://msb-cc.communityfoodshare.org/",
        icon: <BarChart3 className="h-6 w-6" />,
      },
      {
        title: "Custom Event Platform",
        tag: "Event Technology",
        tagColor: "bg-violet-500/15 text-violet-400",
        description:
          "An end-to-end ticketing and registration system built for the complex logic nonprofits need: tiered pricing, table management, conditional forms, and full CRM integration for constituent tracking and post-event follow-up.",
        features: [
          "Custom registration forms with conditional logic",
          "Tiered ticketing and table management",
          "Real-time attendee dashboard",
          "Blackbaud CRM integration for constituent data",
          "Automated confirmation and reminder emails",
          "Day-of check-in system with QR codes",
        ],
        link: "https://events-rr.communityfoodshare.org/",
        icon: <Ticket className="h-6 w-6" />,
      },
    ],
    ctaTitle: "Need a Custom Tool for Your Organization?",
    ctaDescription: "I specialize in building focused, purpose-built tools that integrate with your existing systems and solve real operational problems.",
  },

  // ── Fun Projects ────────────────────────────────────────────────
  {
    slug: "fun-projects",
    client: "Personal Projects",
    title: "Side Projects & Creative Experiments",
    heroDescription:
      "Not everything has to be serious. These are projects I built for fun, curiosity, or to explore new technologies, from AI-powered travel planning to competitive league tracking to trivia generators.",
    tagLabel: "Experiments",
    tagColor: "bg-sky-500/15 text-sky-400",
    challenge:
      "The best way to stay sharp is to build things that interest you. Side projects let me experiment with new frameworks, explore AI capabilities, and solve problems that are just plain fun, without the constraints of client work.",
    approach:
      "Each of these started as a weekend idea or a 'what if' question. I let curiosity drive the architecture decisions and used them as opportunities to try new tools and techniques that I could later bring back to professional projects.",
    projects: [
      {
        title: "RankZone - Competitive League Tracker",
        tag: "Gamification",
        tagColor: "bg-amber-500/15 text-amber-400",
        description:
          "A platform for tracking wins, losses, and leaderboards in competitive games. Built for a local pool league, it uses Elo-based rankings to maintain fair, dynamic leaderboards with full match history and statistics.",
        features: [
          "Elo-based rating algorithm for fair rankings",
          "Match history and player statistics",
          "Customizable league and season management",
          "Real-time leaderboard updates",
          "Mobile-friendly responsive design",
        ],
        link: "https://rankzone.replit.app",
        icon: <Trophy className="h-6 w-6" />,
      },
      {
        title: "Travel Mate AI",
        tag: "AI Application",
        tagColor: "bg-sky-500/15 text-sky-400",
        description:
          "An intelligent travel planning assistant that uses AI to help users plan personalized trips. It suggests itineraries, finds points of interest, and provides real-time recommendations based on individual preferences, budget, and travel style.",
        features: [
          "AI-powered itinerary generation",
          "Personalized recommendations based on preferences",
          "Google Maps integration for location data",
          "Budget-aware trip planning",
          "User authentication and saved trips",
        ],
        link: "https://travel-mate.replit.app/auth",
        icon: <Map className="h-6 w-6" />,
      },
      {
        title: "AI Trivia Generator",
        tag: "AI Tool",
        tagColor: "bg-emerald-500/15 text-emerald-400",
        description:
          "An engagement tool that uses AI to create customized, topic-specific trivia games on the fly. Originally conceived as a lead generation tool for marketers, it's also just a fun way to test your knowledge on any subject.",
        features: [
          "AI-generated questions on any topic",
          "Multiple difficulty levels",
          "Real-time scoring and feedback",
          "Customizable game settings",
          "Shareable results and challenges",
        ],
        link: "https://trivia-forge.replit.app/",
        icon: <Brain className="h-6 w-6" />,
      },
    ],
    ctaTitle: "Have a Fun Idea? Let's Build It.",
    ctaDescription: "Sometimes the best projects start as a simple 'what if.' I'm always up for a creative challenge.",
  },
];

const CaseStudy = () => {
  const { id } = useParams();

  const data = caseStudies.find((cs) => cs.slug === id);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/#projects">
              <Button variant="ghost" size="sm" className="mb-8 -ml-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>

            <span
              className={`inline-block text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider mb-4 ${data.tagColor}`}
            >
              {data.tagLabel}
            </span>

            <p className="text-muted-foreground mb-2">{data.client}</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {data.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {data.heroDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Challenge & Approach */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">
                The Challenge
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {data.challenge}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">
                The Approach
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {data.approach}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Built */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {data.projects.length === 1 ? "The Project" : "Solutions Delivered"}
            </h2>
            <p className="text-muted-foreground">
              {data.projects.length === 1
                ? "A deep look at what was built and how it works."
                : `${data.projects.length} custom tools designed to address specific challenges and integrate seamlessly with existing systems.`}
            </p>
          </motion.div>

          <div className="space-y-8">
            {data.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background/80 rounded-xl p-8 border border-border/50"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <span
                      className={`inline-block text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2 ${project.tagColor}`}
                    >
                      {project.tag}
                    </span>
                    <h3 className="text-xl font-bold text-foreground">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
                    Key Features
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {project.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-primary mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                  >
                    View Live Project
                    <ExternalLink className="h-4 w-4 ml-1.5" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial (if provided) */}
      {data.testimonial && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card/50 rounded-xl p-8 md:p-12 border border-border/50 text-center"
            >
              <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed mb-6 italic">
                "{data.testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-foreground">
                  {data.testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {data.testimonial.organization}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {data.ctaTitle}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {data.ctaDescription}
            </p>
            <Button asChild size="lg">
              <Link href="/#contact">Get in Touch</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CaseStudy;
