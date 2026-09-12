import { Switch, Route, useLocation } from "wouter";
import { useEffect, lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
const NotFound = lazy(() => import("@/pages/not-found"));
import Home from "@/pages/Home";
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const CaseStudy = lazy(() => import("@/pages/CaseStudy"));
const BuilderStudioCaseStudy = lazy(() => import("@/pages/BuilderStudioCaseStudy"));
const CommunityFoodShareCaseStudy = lazy(() => import("@/pages/CommunityFoodShareCaseStudy"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const CouncilOfIdeas = lazy(() => import("@/pages/CouncilOfIdeas"));
const WorkflowDemo = lazy(() => import("@/pages/WorkflowDemo"));
const YoutubeRedirect = lazy(() => import("@/pages/YoutubeRedirect"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("@/pages/TermsAndConditions"));
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import PageMetadata from "@/components/PageMetadata";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

/** Redirects bare paths like /about to /#about so the home page scrolls to the right section */
function HashRedirect({ hash }: { hash: string }) {
  const [, setLocation] = useLocation();
  useEffect(() => {
    setLocation("/");
    setTimeout(() => {
      window.location.hash = hash;
    }, 50);
  }, [hash, setLocation]);
  return <Home />;
}

function Router() {
  // Regular site routes with header and footer
  return (
    <>
      <ScrollToTop />
      <PageMetadata />
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header />
      <div id="main-content" tabIndex={-1}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects/:id" component={ProjectDetail} />
        <Route path="/case-study/home-builder-studio" component={BuilderStudioCaseStudy} />
        <Route path="/case-study/community-food-share" component={CommunityFoodShareCaseStudy} />
        <Route path="/case-study/:id" component={CaseStudy} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/council-of-ideas" component={CouncilOfIdeas} />
        <Route path="/workflow-demo" component={WorkflowDemo} />
        <Route path="/youtube-redirect" component={YoutubeRedirect} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-and-conditions" component={TermsAndConditions} />
        <Route path="/about">{() => <HashRedirect hash="about" />}</Route>
        <Route path="/projects">{() => <HashRedirect hash="projects" />}</Route>
        <Route path="/contact">{() => <HashRedirect hash="contact" />}</Route>
        <Route component={NotFound} />
      </Switch>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <CursorGlow />
        <Suspense fallback={<div role="status" className="min-h-screen px-6 py-32 text-center">Loading page…</div>}>
          <Router />
        </Suspense>
      </MotionConfig>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
