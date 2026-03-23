import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProjectDetail from "@/pages/ProjectDetail";
import CaseStudy from "@/pages/CaseStudy";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Admin from "@/pages/Admin";
import AdminDashboard from "@/pages/AdminDashboard";
import CouncilOfIdeas from "@/pages/CouncilOfIdeas";
import WorkflowDemo from "@/pages/WorkflowDemo";
import YoutubeRedirect from "@/pages/YoutubeRedirect";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

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
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  // For admin routes, we don't want to show the regular header and footer
  if (isAdminRoute) {
    return (
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  // Regular site routes with header and footer
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects/:id" component={ProjectDetail} />
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
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CursorGlow />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
