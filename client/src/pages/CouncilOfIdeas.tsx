import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ChevronDown,
  Scale,
  Compass,
  Brain,
  Landmark,
  Scroll,
  Waves,
  Laugh,
  Crown,
  Sparkles,
  MessageSquareQuote,
  AlertTriangle,
  HelpCircle,
  Check,
  Lightbulb,
} from "lucide-react";

// ─── Council Member Data ───────────────────────────────────────────

interface CouncilMember {
  name: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  borderColor: string;
}

const councilMembers: CouncilMember[] = [
  {
    name: "George Washington",
    title: "The Steward",
    icon: <Landmark className="w-6 h-6" />,
    color: "text-blue-300",
    gradient: "from-blue-500/20 to-blue-900/20",
    borderColor: "border-blue-500/30",
  },
  {
    name: "Marcus Aurelius",
    title: "The Stoic",
    icon: <Scroll className="w-6 h-6" />,
    color: "text-amber-300",
    gradient: "from-amber-500/20 to-amber-900/20",
    borderColor: "border-amber-500/30",
  },
  {
    name: "Alan Watts",
    title: "The Reframer",
    icon: <Waves className="w-6 h-6" />,
    color: "text-teal-300",
    gradient: "from-teal-500/20 to-teal-900/20",
    borderColor: "border-teal-500/30",
  },
  {
    name: "Douglas Adams",
    title: "The Absurdist",
    icon: <Laugh className="w-6 h-6" />,
    color: "text-purple-300",
    gradient: "from-purple-500/20 to-purple-900/20",
    borderColor: "border-purple-500/30",
  },
  {
    name: "Catherine the Great",
    title: "The Strategist",
    icon: <Crown className="w-6 h-6" />,
    color: "text-rose-300",
    gradient: "from-rose-500/20 to-rose-900/20",
    borderColor: "border-rose-500/30",
  },
];

// ─── Animation Variants ────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// ─── Council Response Card Component ───────────────────────────────

interface CouncilResponseProps {
  member: CouncilMember;
  position?: string;
  likes: string;
  worries: string;
  question: string;
  verdict?: string;
}

function CouncilResponse({
  member,
  position,
  likes,
  worries,
  question,
  verdict,
}: CouncilResponseProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      className={`relative overflow-hidden rounded-xl border ${member.borderColor} bg-gradient-to-br ${member.gradient} backdrop-blur-sm`}
    >
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 md:p-6 flex items-center justify-between group cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg bg-background/30 ${member.color}`}
          >
            {member.icon}
          </div>
          <div>
            <h4 className={`font-bold text-lg ${member.color}`}>
              {member.name}
            </h4>
            <p className="text-sm text-muted-foreground italic">
              {member.title}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {position && !isExpanded && (
            <span className="hidden sm:inline text-xs font-medium px-3 py-1 rounded-full bg-background/20 text-muted-foreground">
              {position}
            </span>
          )}
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-4">
              {position && (
                <div className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-background/20 text-foreground/80 sm:hidden">
                  Position: {position}
                </div>
              )}

              <div className="flex items-start gap-3">
                <MessageSquareQuote className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-1">
                    What resonates
                  </p>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    {likes}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 mt-1 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-yellow-400 mb-1">
                    What worries them
                  </p>
                  <p className="text-foreground/90 text-sm leading-relaxed">
                    {worries}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HelpCircle className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                    The question they force you to answer
                  </p>
                  <p className="text-foreground/90 text-sm leading-relaxed italic">
                    "{question}"
                  </p>
                </div>
              </div>

              {verdict && (
                <div className="flex items-start gap-3 pt-2 border-t border-white/10">
                  <Check className="w-4 h-4 mt-1 text-foreground flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-1">
                      Verdict
                    </p>
                    <p className="text-foreground font-medium text-sm">
                      {verdict}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page Component ───────────────────────────────────────────

const CouncilOfIdeas = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Session 1 data
  const session1Responses: CouncilResponseProps[] = [
    {
      member: councilMembers[0], // Washington
      likes:
        "This signals restraint and seriousness. You're not shouting competence; you're demonstrating judgment. That earns trust with people who matter.",
      worries:
        "Fragmentation. Too many clever ideas can make a portfolio feel unfocused, like a commander spreading forces thin.",
      question:
        "Does this strengthen your core narrative — or dilute it?",
    },
    {
      member: councilMembers[1], // Marcus Aurelius
      likes:
        "This tool encourages reflection, humility, and perspective. It doesn't promise certainty — only clarity. That's aligned with wisdom, not ego.",
      worries:
        "Vanity. If this becomes about showing off intelligence instead of serving clarity, it corrupts its own purpose.",
      question:
        "Are you building this to help others think... or to reassure yourself that you think well?",
    },
    {
      member: councilMembers[2], // Alan Watts
      likes:
        "You're externalizing inner dialogue. This is playful seriousness — exactly where insight lives. It invites curiosity rather than instruction.",
      worries:
        "People mistaking the council for authority. The illusion of borrowed certainty is seductive.",
      question:
        "Do you make it unmistakably clear that the user remains sovereign?",
    },
    {
      member: councilMembers[3], // Douglas Adams
      likes:
        "It's clever without being self-important. Humor plus rigor is rare and disarming. Also: people will actually remember this.",
      worries:
        "Over-explaining. Kill the joke and you kill the magic.",
      question:
        "Can this be experienced in under five minutes without a manual?",
    },
    {
      member: councilMembers[4], // Catherine
      likes:
        "This positions you above \"tool operators.\" It implies taste, discernment, and leadership — qualities that attract serious collaborators.",
      worries:
        "Audience mismatch. Some visitors won't get it. That's fine — unless they're the ones you actually need.",
      question:
        "Who is this for — and who are you comfortable alienating?",
    },
  ];

  // Session 2 data
  const session2Responses: CouncilResponseProps[] = [
    {
      member: councilMembers[0],
      position: "Demo first",
      likes:
        "A demo lets you control the narrative. You establish intent, tone, and boundaries. That's how trust is earned. A live tool invites interpretation before context. Some visitors will misuse it, rush it, or miss the point entirely.",
      worries:
        "Authority is fragile. Don't hand it away too early.",
      question:
        "Can you establish intent before granting interaction?",
      verdict: "Lead with example. Let others follow later.",
    },
    {
      member: councilMembers[1],
      position: "Demo",
      likes:
        "Wisdom is shown through restraint. A demo reflects deliberation; a feature invites impulse. He strongly prefers one thoughtful, grounded scenario over many shallow interactions.",
      worries: "Tools without context become toys.",
      question:
        "Does this teach how to think, or just offer another distraction?",
      verdict:
        "Show how it should be used before allowing it to be used.",
    },
    {
      member: councilMembers[2],
      position: "Demo, then optional interaction",
      likes:
        "The demo is a story. Stories open minds. Once someone gets it, then interaction becomes meaningful instead of performative.",
      worries:
        "If people start with interaction, they may mistake novelty for insight.",
      question:
        "Can you reveal the pattern before inviting play?",
      verdict: "First, reveal the pattern. Then invite play.",
    },
    {
      member: councilMembers[3],
      position: "Demo (with a twist)",
      likes:
        "A polished demo lets you be clever once, precisely. A feature requires being clever every time — and that's where things break.",
      worries:
        "The internet will always find the dumbest way to use a thing.",
      question:
        "If it can be misunderstood, will you have designed for that?",
      verdict:
        "If it can be misunderstood, it will be. Design accordingly.",
    },
    {
      member: councilMembers[4],
      position: "Demo first, feature later — if earned",
      likes:
        'A live feature implies commitment, maintenance, and endorsement. A demo implies capability, not obligation. She\'s thinking positioning: Demo = "I can build this." Feature = "This defines me."',
      worries:
        "Don't let an experiment define your brand prematurely.",
      question: "Are you proving value or making a promise?",
      verdict: "Prove value before granting access.",
    },
  ];

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        {/* Back button */}
        <Button
          asChild
          variant="ghost"
          className="mb-8 hover:bg-primary/10"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
        </Button>

        {/* ─── Hero / Intro ─────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="mb-2">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              AI Exploration
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
          >
            The Council of{" "}
            <span className="text-gradient-sunset">Ideas</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl"
          >
            What if you could sit down with history's sharpest minds and bounce
            an idea off them? Not to get the "right answer" — but to see your
            blind spots, test your assumptions, and think more clearly under
            uncertainty?
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="glass-card rounded-xl p-6 md:p-8 border border-border/50"
          >
            <p className="text-foreground/90 leading-relaxed mb-4">
              LLMs have unlocked something genuinely new: the ability to have a
              structured dialogue with perspectives modeled after the greatest
              thinkers in history. Not because the AI <em>is</em> George
              Washington or Marcus Aurelius — but because it can adopt their{" "}
              <strong>lens</strong>, their priorities, their style of reasoning,
              and push back on your ideas the way they might have.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              You can take this further — assemble a{" "}
              <strong>council</strong>. Five or six minds with different
              frameworks. Give them a real decision you're facing. Watch where
              they agree, where they clash, and — most importantly — what
              questions they force you to answer that you hadn't considered.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              To showcase this concept, I did something a little meta: I asked
              the council whether I should add this very feature to my
              portfolio. Then I asked them <em>how</em> I should present it.
              What follows is that real exchange — unedited, tensions and all.
            </p>
          </motion.div>
        </motion.div>

        {/* ─── The Council Introduction ─────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-bold mb-3"
          >
            The Five Confidants
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground mb-8"
          >
            Each chosen not for agreement, but for the distinct lens they bring
            to a problem.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
          >
            {councilMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={staggerItem}
                className={`rounded-xl border ${member.borderColor} bg-gradient-to-br ${member.gradient} p-4 text-center backdrop-blur-sm`}
              >
                <div
                  className={`inline-flex p-2 rounded-lg bg-background/20 ${member.color} mb-2`}
                >
                  {member.icon}
                </div>
                <h4 className={`font-bold text-sm ${member.color}`}>
                  {member.name}
                </h4>
                <p className="text-xs text-muted-foreground italic">
                  {member.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ─── Divider ──────────────────────────────────────── */}
        <div className="flex items-center gap-4 my-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
            Session One
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* ─── Session 1: Should I Add This? ────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                "Should I add this to my portfolio?"
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The pitch: does the "Council of Ideas" belong on
              trevorbosetti.com? I convened all five and kept it disciplined —
              each voice has a lens, not cosplay.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4">
            {session1Responses.map((response) => (
              <CouncilResponse key={response.member.name} {...response} />
            ))}
          </motion.div>

          {/* Synthesis */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-primary">
                Council Synthesis
              </h3>
            </div>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Two clear tensions emerged:
            </p>
            <ol className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-foreground">
                    Clarity vs. Cleverness
                  </strong>
                  <p className="text-muted-foreground text-sm">
                    It must reinforce your narrative, not compete with it.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-foreground">
                    Playfulness vs. Authority
                  </strong>
                  <p className="text-muted-foreground text-sm">
                    It works only if it's unmistakably intentional, not
                    indulgent.
                  </p>
                </div>
              </li>
            </ol>

            <div className="border-t border-primary/20 pt-5">
              <div className="flex items-center gap-3 mb-3">
                <Compass className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-foreground">
                  The Council's Advice
                </h4>
              </div>
              <p className="text-foreground font-medium text-lg mb-3">
                Yes — add it. But only if you frame it correctly.
              </p>
              <div className="space-y-2 text-sm text-foreground/80">
                <p>
                  <strong>The condition:</strong> It lives as a feature, not a
                  centerpiece. It's labeled clearly as a thinking tool. It
                  reinforces your identity as someone who designs systems and
                  judgment frameworks.
                </p>
                <p>
                  <strong>What would break it:</strong> Positioning it as a
                  gimmick. Letting it sprawl. Pretending it's "AI wisdom"
                  instead of structured perspective.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Final Handback */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 rounded-xl border border-border/50 bg-card/50 p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="w-5 h-5 text-accent" />
              <h4 className="font-bold text-foreground">
                Final Handback
              </h4>
            </div>
            <p className="text-foreground/90 leading-relaxed mb-3">
              This idea belongs on your portfolio if your portfolio's thesis is:
            </p>
            <blockquote className="border-l-4 border-primary/50 pl-4 py-2 my-4 text-lg font-medium italic text-foreground/90">
              "I build systems that respect human agency."
            </blockquote>
            <p className="text-muted-foreground text-sm leading-relaxed">
              If your thesis were "I build cool tech," I'd say no. But that's
              not actually your lane. The council advises: include it — clean,
              restrained, and unapologetically thoughtful. Now you decide.
            </p>
          </motion.div>
        </motion.section>

        {/* ─── Divider ──────────────────────────────────────── */}
        <div className="flex items-center gap-4 my-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
            Session Two
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* ─── Session 2: Demo or Feature? ──────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                "Demo or live feature?"
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Council reconvened. Same five voices. New decision: Do you show
              the Idea Council as a crafted demo, or make it a live, usable
              feature visitors can try themselves? This is a real fork — and
              the council is not split down the middle.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4">
            {session2Responses.map((response) => (
              <CouncilResponse key={response.member.name} {...response} />
            ))}
          </motion.div>

          {/* Synthesis */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold text-primary">
                Council Synthesis
              </h3>
            </div>
            <p className="text-foreground/90 leading-relaxed mb-3">
              The council is aligned.
            </p>
            <div className="space-y-2 text-sm text-foreground/80 mb-6">
              <p>
                <strong>Primary tension:</strong> Clarity vs. Exploration.
                Authority vs. Accessibility. Signal vs. Surface-level
                engagement.
              </p>
              <p className="text-foreground font-medium text-base">
                They all agree on one thing: a live feature too early weakens
                the message.
              </p>
            </div>

            <div className="border-t border-primary/20 pt-5">
              <div className="flex items-center gap-3 mb-3">
                <Compass className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-foreground">
                  Final Recommendation
                </h4>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 text-green-400 font-bold">
                    ✓
                  </span>
                  <div>
                    <p className="text-foreground font-medium text-base mb-1">
                      Start with a crafted demo
                    </p>
                    <p className="text-muted-foreground">
                      A real scenario. A council you chose. A thoughtful
                      outcome. Strong framing and pacing. This lets you
                      demonstrate judgment, set expectations, show taste, and
                      control tone.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 text-yellow-400 font-bold">
                    ○
                  </span>
                  <div>
                    <p className="text-foreground font-medium text-base mb-1">
                      Optional upgrade — later
                    </p>
                    <p className="text-muted-foreground">
                      After the demo: "Curious how this would look for you?"
                      Then a limited, guided version with clear constraints and
                      an explicit reminder: the council advises, you decide. But
                      that's Phase 2 — not the foundation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final Bottom Line */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 rounded-xl border border-border/50 bg-card/50 p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="w-5 h-5 text-accent" />
              <h4 className="font-bold text-foreground">Bottom Line</h4>
            </div>
            <p className="text-foreground/90 leading-relaxed mb-3">
              If this lives on trevorbosetti.com, it should answer one question
              first:
            </p>
            <blockquote className="border-l-4 border-primary/50 pl-4 py-2 my-4 text-lg font-medium italic text-foreground/90">
              "Does this person think clearly under uncertainty?"
            </blockquote>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              A demo answers that immediately. A free-form feature does not.
            </p>
            <p className="text-foreground/80 text-sm leading-relaxed">
              The council advises:{" "}
              <strong>Demo first. Earn interaction later.</strong>
            </p>
          </motion.div>
        </motion.section>

        {/* ─── Divider ──────────────────────────────────────── */}
        <div className="flex items-center gap-4 my-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <span className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
            Reflection
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* ─── Closing Reflection ───────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div
            variants={fadeInUp}
            className="glass-card rounded-xl p-6 md:p-8 border border-border/50"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              So... what did I learn?
            </h2>

            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                The council didn't tell me what to do. It showed me what I
                hadn't considered.
              </p>
              <p>
                Washington made me ask whether this strengthens or fragments my
                narrative. Aurelius made me check my ego. Watts reminded me that
                the user stays sovereign. Adams warned me not to over-explain
                the magic. And Catherine made me think about who I'm actually
                building for.
              </p>
              <p>
                None of that is "AI wisdom." It's{" "}
                <strong>structured perspective</strong> — the kind of thinking
                framework that happens to be dramatically more accessible now
                that we can model different viewpoints on demand.
              </p>
              <p>
                That's the real capability here. Not replacing judgment, but{" "}
                <strong>pressure-testing it</strong> from multiple angles before
                you commit.
              </p>
              <p className="text-muted-foreground text-sm italic pt-4 border-t border-border/30">
                You tested the council earlier to see if it would lie to you. It
                didn't. But it also didn't pretend to have answers it couldn't
                have. That distinction matters.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* ─── CTA / Back ───────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center py-8"
        >
          <p className="text-muted-foreground mb-6">
            Curious about the other AI capabilities I'm building?
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/#ai-expertise">Explore AI Expertise</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CouncilOfIdeas;
