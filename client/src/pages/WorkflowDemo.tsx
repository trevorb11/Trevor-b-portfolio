import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Bot,
  Send,
  Sparkles,
  GitBranch,
  MessageSquare,
  Target,
  Zap,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: { label: string; value: string; emoji?: string }[];
}

interface WorkflowState {
  currentStep: number;
  activity: string | null;
  timing: string | null;
  motivation: string | null;
  completed: boolean;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const WorkflowDemo = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [usedOptions, setUsedOptions] = useState<Set<string>>(new Set());
  const [state, setState] = useState<WorkflowState>({
    currentStep: 0,
    activity: null,
    timing: null,
    motivation: null,
    completed: false,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    window.scrollTo(0, 0);
    startConversation();
  }, []);

  const addBotMessage = async (
    text: string,
    options?: { label: string; value: string; emoji?: string }[],
    delay = 500
  ) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, delay));
    setIsTyping(false);
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "bot",
      text,
      options,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const startConversation = async () => {
    await addBotMessage(
      "Hey there! 👋 Welcome to this **workflow demo**. I'm going to show you how a structured decision tree can hide behind a natural conversation.",
      undefined,
      800
    );
    await addBotMessage(
      "Let's pretend I'm qualifying you as a lead. I'll ask 3 simple questions, and behind the scenes, I'm navigating a **96-path decision tree** to match you with the perfect outcome.",
      undefined,
      1000
    );
    await addBotMessage("First up: what do you enjoy doing in your free time?", [
      { label: "Getting outdoors", value: "outdoors", emoji: "🏔️" },
      { label: "Entertainment", value: "entertainment", emoji: "🎮" },
      { label: "Socializing", value: "social", emoji: "🎉" },
      { label: "Music & experiences", value: "music", emoji: "🎵" },
      { label: "Family time", value: "family", emoji: "👨‍👩‍👧" },
      { label: "Peace & quiet", value: "peace", emoji: "🧘" },
    ], 800);
  };

  const handleActivityResponse = async (value: string, label: string) => {
    setState((prev) => ({ ...prev, currentStep: 1, activity: value }));
    
    const responses: Record<string, string> = {
      outdoors: "Nice! Nothing beats fresh air and adventure. 🏔️",
      entertainment: "A person of culture! Love it. 🎮",
      social: "The more the merrier! Great choice. 🎉",
      music: "Live experiences hit different. Great taste! 🎵",
      family: "Family first, I respect that. 👨‍👩‍👧",
      peace: "Sometimes you just need to recharge. 🧘",
    };

    await addBotMessage(responses[value] || "Great choice!", undefined, 600);
    await addBotMessage(
      "See that? One question down, and we've already narrowed from **96 paths to 16**. The tree is working.\n\nWhen do you usually enjoy this activity?",
      [
        { label: "Weekends", value: "weekends", emoji: "📅" },
        { label: "Early mornings", value: "mornings", emoji: "🌅" },
        { label: "Midday breaks", value: "midday", emoji: "☀️" },
        { label: "Evenings", value: "evenings", emoji: "🌙" },
      ],
      800
    );
  };

  const handleTimingResponse = async (value: string, label: string) => {
    setState((prev) => ({ ...prev, currentStep: 2, timing: value }));

    const responses: Record<string, string> = {
      weekends: "Weekend warrior! Gotta make those two days count. 💪",
      mornings: "Up with the sun! I respect the discipline. 🌅",
      midday: "A nice midday reset. Smart move. ☀️",
      evenings: "There's something special about evening hours. 🌙",
    };

    await addBotMessage(responses[value] || "Great timing!", undefined, 600);
    await addBotMessage(
      "We're down to **4 possible paths** now. One more question locks it in.\n\nWhat does this activity do for you? Is it more of...",
      [
        { label: "An escape", value: "escape", emoji: "🚀" },
        { label: "Gets me energized", value: "energize", emoji: "⚡" },
        { label: "Helps me learn", value: "learn", emoji: "📚" },
        { label: "Great for networking", value: "network", emoji: "🤝" },
      ],
      800
    );
  };

  const handleMotivationResponse = async (value: string, label: string) => {
    setState((prev) => ({ ...prev, currentStep: 3, motivation: value, completed: true }));

    const reps = [
      { name: "Alex Chen", title: "Solutions Architect", emoji: "🧗" },
      { name: "Sarah Park", title: "Sr. Account Executive", emoji: "🎯" },
      { name: "Marcus Lee", title: "Tech Lead", emoji: "🎮" },
      { name: "Priya Patel", title: "Customer Success", emoji: "🎬" },
    ];
    const rep = reps[Math.floor(Math.random() * reps.length)];

    await addBotMessage(
      `**Path locked!** 🎯\n\nBased on your answers, I've matched you with:\n\n**${rep.emoji} ${rep.name}**, ${rep.title}\n\nThey share similar interests and would be a great fit for a conversation.`,
      undefined,
      1000
    );
    await addBotMessage(
      "**That's the demo!** 🎬\n\nThree natural questions. 96 possible outcomes. One personalized match.\n\n**The takeaway:** Open-ended conversation on the surface. Structured workflow underneath. This is how AI-powered lead qualification can feel human while being systematically effective.",
      undefined,
      1200
    );
  };

  const handleOptionClick = async (value: string, label: string) => {
    if (usedOptions.has(value)) return;
    setUsedOptions((prev) => new Set(prev).add(value));
    addUserMessage(label);

    switch (state.currentStep) {
      case 0:
        await handleActivityResponse(value, label);
        break;
      case 1:
        await handleTimingResponse(value, label);
        break;
      case 2:
        await handleMotivationResponse(value, label);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const text = inputValue.trim();
    setInputValue("");
    addUserMessage(text);

    if (!state.completed) {
      await addBotMessage(
        "Great input! For this demo, please use the quick-select options above to navigate the decision tree. It helps illustrate how the structured workflow operates.",
        undefined,
        600
      );
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-background">
      <div className="container mx-auto max-w-5xl">
        <Button asChild variant="ghost" className="mb-8 hover:bg-primary/10">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
        </Button>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-12"
        >
          <motion.div variants={fadeInUp} className="mb-2">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Demo
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground"
          >
            Workflow <span className="text-primary">Demo</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground leading-relaxed max-w-3xl"
          >
            Experience how AI-powered conversational workflows can qualify leads naturally 
            while following a structured decision tree underneath.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="bg-primary/5 border-b border-border/50 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Workflow Bot</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Online - Demo Mode
                  </p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[0, 1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        state.currentStep > step
                          ? "bg-primary"
                          : state.currentStep === step
                          ? "bg-primary/50"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <CardContent className="p-0">
                <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${
                          message.sender === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-2"
                              : "space-y-3"
                          }`}
                        >
                          {message.sender === "bot" ? (
                            <>
                              <div className="bg-muted/50 border border-border/50 rounded-2xl rounded-bl-md px-4 py-3">
                                <p
                                  className="text-foreground text-sm leading-relaxed"
                                  dangerouslySetInnerHTML={{
                                    __html: message.text
                                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                      .replace(/\n/g, "<br />"),
                                  }}
                                />
                              </div>
                              {message.options && (
                                <div className="flex flex-wrap gap-2 pl-2">
                                  {message.options.map((option) => {
                                    const isUsed = usedOptions.has(option.value);
                                    return (
                                      <button
                                        key={option.value}
                                        onClick={() =>
                                          handleOptionClick(option.value, option.label)
                                        }
                                        disabled={isUsed || state.completed}
                                        className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                                          isUsed
                                            ? "bg-primary/20 border-primary text-primary"
                                            : state.completed
                                            ? "bg-muted/30 border-border/50 text-muted-foreground opacity-50"
                                            : "bg-card border-border hover:bg-primary/10 hover:border-primary text-foreground"
                                        }`}
                                      >
                                        {option.emoji && (
                                          <span className="mr-1">{option.emoji}</span>
                                        )}
                                        {option.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </>
                          ) : (
                            <p className="text-sm">{message.text}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted/50 border border-border/50 rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="border-t border-border/50 p-4 flex gap-2"
                >
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-muted/30 border-border/50"
                    disabled={isTyping}
                  />
                  <Button type="submit" size="icon" disabled={isTyping || !inputValue.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GitBranch className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Decision Tree Status</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Possible paths:</span>
                    <span className="font-mono text-foreground">
                      {state.currentStep === 0
                        ? "96"
                        : state.currentStep === 1
                        ? "16"
                        : state.currentStep === 2
                        ? "4"
                        : "1"}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{
                        width: `${
                          state.currentStep === 0
                            ? 0
                            : state.currentStep === 1
                            ? 33
                            : state.currentStep === 2
                            ? 66
                            : 100
                        }%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {state.currentStep === 0
                      ? "Answer the first question to start narrowing paths"
                      : state.currentStep === 1
                      ? "Great! We've eliminated 80 paths already"
                      : state.currentStep === 2
                      ? "Almost there, 12 more paths eliminated"
                      : "Path locked! Perfect match found."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Target className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">Your Selections</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Activity:</span>
                    <span className="text-foreground">
                      {state.activity || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timing:</span>
                    <span className="text-foreground">
                      {state.timing || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Motivation:</span>
                    <span className="text-foreground">
                      {state.motivation || "-"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-primary/20 bg-primary/5 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">The Concept</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This demo shows how conversational AI can hide complex decision logic 
                  behind natural dialogue. The user experiences a friendly chat, while 
                  the system systematically qualifies them through a structured funnel.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDemo;
