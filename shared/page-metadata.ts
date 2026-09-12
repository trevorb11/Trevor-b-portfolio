export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
}
const page = (path: string, title: string, description: string): PageMetadata => ({ path, title, description });
export const publicPages: PageMetadata[] = [
  page("/", "Trevor Bosetti | Marketing Technology & Storytelling", "Explore Trevor Bosetti’s work in marketing technology, connected systems, automation, and donor storytelling for businesses and mission-driven teams."),
  page("/case-study/impact-wrapped", "Impact Wrapped: Donor Data into Stories | Trevor Bosetti", "How Trevor Bosetti built personalized donor impact stories for Community Food Share, connecting donation data with an interactive year-in-review experience."),
  page("/case-study/community-food-share", "Community Food Share: Nonprofit Marketing | Trevor Bosetti", "Explore Trevor Bosetti’s marketing systems, donor engagement campaigns, and custom technology work for Community Food Share."),
  page("/case-study/home-builder-studio", "HomeBuilder Studio: CRM & Automation | Trevor Bosetti", "Explore HomeBuilder Studio, a CRM and automation concept designed around home builder lead management and the customer journey."),
  page("/case-study/financial-services-automation", "Financial Services Sales Infrastructure | Trevor Bosetti", "A case study in connected CRM architecture, lead routing, outreach tools, and sales workflows for a multi-lender business funding brokerage."),
  page("/case-study/nonprofit-tools", "Custom Nonprofit Tools & Workflows | Trevor Bosetti", "Purpose-built nonprofit tools for donor engagement, fundraising campaigns, video conversion, and event registration."),
  page("/case-study/fun-projects", "Side Projects & Creative Experiments | Trevor Bosetti", "Explore Trevor Bosetti’s experiments in competitive league tracking, AI-assisted travel planning, and interactive trivia."),
  page("/blog", "Marketing Technology & AI Insights | Trevor Bosetti", "Writing by Trevor Bosetti on marketing technology, AI, systems integration, nonprofit work, and clearer communication."),
  page("/council-of-ideas", "The Council of Ideas | Trevor Bosetti", "An exploration of using contrasting perspectives and AI-assisted discussion to develop and challenge ideas."),
  page("/workflow-demo", "Interactive Lead Routing Demo | Trevor Bosetti", "Explore a simulated lead-routing conversation and the role of connected marketing systems in turning inquiries into useful next steps."),
  page("/youtube-redirect", "YouTube Redirect Embed Generator | Trevor Bosetti", "Create a downloadable YouTube video embed that directs viewers to your chosen page after playback or at a specified point."),
  page("/privacy-policy", "Privacy Policy | Trevor Bosetti", "Privacy information for Trevor Bosetti’s portfolio, including contact methods and data handling."),
  page("/terms-and-conditions", "Terms & Conditions | Trevor Bosetti", "Terms and conditions for Trevor Bosetti’s portfolio and communication programs."),
];
export const missingPage = (path: string): PageMetadata => ({ path, title: "Page Not Found | Trevor Bosetti", description: "This page could not be found. Return to Trevor Bosetti’s portfolio to explore projects and writing.", noindex: true });
export const sectionRedirects: Record<string, string> = { "/about": "/#about", "/projects": "/#projects", "/contact": "/#contact" };
