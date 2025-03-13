import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  blogPosts, type BlogPost, type InsertBlogPost,
  contacts, type Contact, type InsertContact,
  cmsContents, type CmsContent, type InsertCmsContent, type UpdateCmsContent,
  adminLoginSchema
} from "@shared/schema";

export interface IStorage {
  // User methods (from original code)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validateAdminCredentials(username: string, password: string): Promise<User | null>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | null>;
  deleteProject(id: number): Promise<boolean>;
  
  // Blog methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | null>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // CMS Content methods
  getCmsContents(): Promise<CmsContent[]>;
  getCmsContentsBySection(section: string): Promise<CmsContent[]>;
  getCmsContent(id: number): Promise<CmsContent | undefined>;
  getCmsContentBySectionAndKey(section: string, key: string): Promise<CmsContent | undefined>;
  createCmsContent(content: InsertCmsContent): Promise<CmsContent>;
  updateCmsContent(id: number, value: string): Promise<CmsContent | null>;
  deleteCmsContent(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private blogPosts: Map<number, BlogPost>;
  private contacts: Map<number, Contact>;
  private cmsContents: Map<number, CmsContent>;
  
  private userCurrentId: number;
  private projectCurrentId: number;
  private blogPostCurrentId: number;
  private contactCurrentId: number;
  private cmsContentCurrentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.blogPosts = new Map();
    this.contacts = new Map();
    this.cmsContents = new Map();
    
    this.userCurrentId = 1;
    this.projectCurrentId = 1;
    this.blogPostCurrentId = 1;
    this.contactCurrentId = 1;
    this.cmsContentCurrentId = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  // User methods (from original code)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { 
      ...insertUser, 
      id,
      isAdmin: insertUser.isAdmin !== undefined ? insertUser.isAdmin : false 
    };
    this.users.set(id, user);
    return user;
  }
  
  async validateAdminCredentials(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (user && user.password === password && user.isAdmin) {
      return user;
    }
    return null;
  }
  
  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }
  
  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async getProjectsByCategory(category: string): Promise<Project[]> {
    if (category === "all") {
      return this.getProjects();
    }
    
    return Array.from(this.projects.values()).filter(
      (project) => project.category === category
    );
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const id = this.projectCurrentId++;
    // Ensure link and featured fields are properly set with defaults if not provided
    const newProject: Project = { 
      ...project, 
      id,
      link: project.link ?? null,
      featured: project.featured ?? 0
    };
    this.projects.set(id, newProject);
    return newProject;
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | null> {
    const existingProject = this.projects.get(id);
    if (!existingProject) {
      return null;
    }
    
    const updatedProject: Project = {
      ...existingProject,
      ...project,
      id, // Ensure ID doesn't change
    };
    
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }
  
  // Blog methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug
    );
  }
  
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostCurrentId++;
    const newPost: BlogPost = { 
      ...post, 
      id,
      publishedDate: post.publishedDate || new Date()
    };
    this.blogPosts.set(id, newPost);
    return newPost;
  }
  
  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | null> {
    const existingPost = this.blogPosts.get(id);
    if (!existingPost) {
      return null;
    }
    
    const updatedPost: BlogPost = {
      ...existingPost,
      ...post,
      id, // Ensure ID doesn't change
    };
    
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
  
  // Contact methods
  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const newContact: Contact = { 
      ...contact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, newContact);
    return newContact;
  }
  
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
  
  // CMS Content methods
  async getCmsContents(): Promise<CmsContent[]> {
    return Array.from(this.cmsContents.values());
  }
  
  async getCmsContentsBySection(section: string): Promise<CmsContent[]> {
    return Array.from(this.cmsContents.values()).filter(
      (content) => content.section === section
    );
  }
  
  async getCmsContent(id: number): Promise<CmsContent | undefined> {
    return this.cmsContents.get(id);
  }
  
  async getCmsContentBySectionAndKey(section: string, key: string): Promise<CmsContent | undefined> {
    return Array.from(this.cmsContents.values()).find(
      (content) => content.section === section && content.key === key
    );
  }
  
  async createCmsContent(content: InsertCmsContent): Promise<CmsContent> {
    const id = this.cmsContentCurrentId++;
    const newContent: CmsContent = { 
      ...content, 
      id,
      updatedAt: new Date()
    };
    this.cmsContents.set(id, newContent);
    return newContent;
  }
  
  async updateCmsContent(id: number, value: string): Promise<CmsContent | null> {
    const existingContent = this.cmsContents.get(id);
    if (!existingContent) {
      return null;
    }
    
    const updatedContent: CmsContent = {
      ...existingContent,
      value,
      updatedAt: new Date()
    };
    
    this.cmsContents.set(id, updatedContent);
    return updatedContent;
  }
  
  async deleteCmsContent(id: number): Promise<boolean> {
    return this.cmsContents.delete(id);
  }
  
  // Initialize with sample data
  private initSampleData() {
    // Create admin user
    const adminUser: InsertUser = {
      username: "admin",
      password: "password123", // This should be hashed in a real application
      isAdmin: true
    };
    this.createUser(adminUser);

    // Sample CMS content
    const sampleCmsContents: InsertCmsContent[] = [
      {
        section: "hero",
        key: "title",
        value: "Trevor Bosetti",
        type: "text",
      },
      {
        section: "hero",
        key: "subtitle",
        value: "MarTech Expert & System Integrator",
        type: "text",
      },
      {
        section: "hero",
        key: "description",
        value: "Specializing in marketing technology solutions that bridge the gap between powerful tools and exceptional customer experiences.",
        type: "text",
      },
      {
        section: "about",
        key: "title",
        value: "About Me",
        type: "text",
      },
      {
        section: "about",
        key: "content",
        value: "With over a decade of experience in the marketing technology space, I've helped businesses of all sizes implement effective digital solutions. I specialize in CRM integrations, marketing automation, and building custom applications that solve unique business challenges. My approach combines technical expertise with a deep understanding of marketing principles to deliver systems that drive real results.",
        type: "richtext",
      },
      {
        section: "projects",
        key: "title",
        value: "Featured Projects",
        type: "text",
      },
      {
        section: "projects",
        key: "description",
        value: "A selection of my most impactful work across marketing automation, CRM integration, and custom applications.",
        type: "text",
      },
      {
        section: "blog",
        key: "title",
        value: "Latest Insights",
        type: "text",
      },
      {
        section: "blog",
        key: "description",
        value: "Thoughts, strategies, and discoveries from my work in the marketing technology field.",
        type: "text",
      },
      {
        section: "contact",
        key: "title",
        value: "Get In Touch",
        type: "text",
      },
      {
        section: "contact",
        key: "description",
        value: "Interested in working together? Have questions about marketing technology? I'd love to hear from you.",
        type: "text",
      }
    ];
    
    for (const content of sampleCmsContents) {
      this.createCmsContent(content);
    }
    
    // Sample projects
    const sampleProjects: InsertProject[] = [
      {
        title: "Impact Wrapped for Community Food Share",
        description: "An interactive Spotify-inspired 'Year in Review' experience for nonprofit donors, showcasing their impact through personalized data visualizations of their contributions.",
        category: "crm-integration",
        image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["React", "Chart.js", "Node.js", "HubSpot Integration"],
        link: "https://cfs-impact.replit.app/",
        featured: 1
      },
      {
        title: "RankZone - Marketing Performance Tracker",
        description: "A comprehensive analytics dashboard for marketing teams to track KPIs, SEO rankings, and competitor analysis with AI-powered recommendations.",
        category: "ai-marketing",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["Vue.js", "D3.js", "Express", "Google Analytics API", "SEMrush API"],
        link: "https://league-ranker.replit.app/auth",
        featured: 1
      },
      {
        title: "Double the Donation Integration",
        description: "A custom donation matching platform that integrates with nonprofit CRMs to automatically identify matching gift opportunities and maximize fundraising potential.",
        category: "crm-integration",
        image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["React", "Blackbaud Integration", "Stripe", "Double the Donation API"],
        link: "https://double-the-donation-cfs.replit.app/",
        featured: 1
      },
      {
        title: "Marketing Content Calendar System",
        description: "An AI-powered content planning and scheduling platform that synchronizes across multiple marketing channels and integrates with major marketing automation systems.",
        category: "automation",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["React", "Node.js", "Google Calendar API", "HubSpot", "Mailchimp", "OpenAI"],
        link: "https://marketing-calendar.replit.app/",
        featured: 1
      },
      {
        title: "Asana Task Dashboard",
        description: "A specialized dashboard for marketing teams to visualize, prioritize and manage Asana tasks across campaigns, with custom reporting and automation capabilities.",
        category: "automation",
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["React", "TypeScript", "Asana API", "Chart.js"],
        link: "https://asana-tasks.replit.app/",
        featured: 1
      },
      {
        title: "Lindy Chat - AI Customer Engagement",
        description: "A real-time chat solution enhanced with AI for marketing and sales teams to better engage with prospects, featuring smart response suggestions and lead scoring.",
        category: "ai-marketing",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["React", "Socket.io", "Node.js", "OpenAI", "Salesforce Integration"],
        link: "https://web-chat-test.replit.app/",
        featured: 1
      },
      {
        title: "AI Trivia Generator",
        description: "An engagement tool for marketers to create customized, industry-specific trivia games for lead generation and brand awareness campaigns.",
        category: "lead-generation",
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["React", "TypeScript", "OpenAI", "Firebase"],
        link: "https://trivia-forge.replit.app/",
        featured: 1
      },
      {
        title: "Corporate Challenge Campaign Platform",
        description: "A gamified corporate fundraising platform for nonprofit organizations to engage corporate partners in friendly competition while tracking donations and impact.",
        category: "lead-generation",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Blackbaud Integration"],
        link: "https://corporate-challenge.replit.app/",
        featured: 1
      },
      {
        title: "Community Food Share - 14 Tons",
        description: "A specialized campaign microsite for Community Food Share's 14 Tons fundraising initiative, highlighting donor impact and facilitating online donations.",
        category: "lead-generation",
        image: "https://images.unsplash.com/photo-1590507621108-433608c97823?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["WordPress", "Blackbaud Integration", "Custom Donation Forms", "Impact Visualization"],
        link: "https://communityfoodshare.org/14-tons",
        featured: 1
      }
    ];
    
    // Sample blog posts
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "The Skill AI is Forcing Us to Get Better At (And the One We've Been Ignoring)",
        excerpt: "As AI becomes more integrated into marketing workflows, the skills of clear communication and data curation are becoming essential for achieving optimal results.",
        content: "Let's take a moment to appreciate the geniuses behind large language models (LLMs). Thanks to people much smarter than me—and the creation of transformers (machines that somehow manage to be cool without turning into sports cars)—they've handed the average person powers that used to be locked behind years of computer science education.\n\nThink about it: we've gone from direct-to-the-source 1s and 0s, to layered programming languages, to where we are now—natural language. You don't need to know how to code or string together an algorithm. You can now access the full depth and breadth of machine intelligence by simply doing the most natural thing there is: communicating.\n\nAnd yet, here's the catch: your ability to describe what you want—to articulate your vision with clarity and precision—is now a non-negotiable skill. The better you are at it, the better your results. Whether you're designing a campaign, building a product, or trying to generate content that doesn't feel like it came from a robot, this skill has quickly shifted from a \"nice-to-have\" to an absolute must.\n\nThis is where prompt engineering comes in. The term sounds intimidating—like some hyper-technical field for AI wizards. But let me demystify it for you: prompt engineering is just the art of description. It's learning how to ask AI for what you want in a way that gets you closer to the results you're after. Sure, there's some finesse involved, like figuring out which phrases work best for different tools, but it's really just about crafting thoughtful, intentional inputs.\n\nStill, there's a second piece to this puzzle that's just as important: curation.\n\nIf description is how you talk to AI, curation is how you prepare for the conversation. It's the data, the context, the fuel you feed into the system. What you give it matters. AI can only do so much with bad or incomplete inputs.\n\nHere's where it gets exciting (or overwhelming): it's not just about text anymore. We're already at a point where you can feed AI almost any type of content—images, PDFs, videos, entire websites. And while AI isn't perfect at understanding all of it (yet), it's getting closer every day.\n\nThink bigger. Images, for example, aren't just pictures—they can be photos of whiteboard brainstorms, scanned handwritten notes, or pages from a book. A single PDF might hold the exact context the AI needs to give you better results. The key isn't just throwing more data at it but asking yourself:\n\nWhat's relevant to what I'm trying to achieve?\nHow can I organize this so it makes sense?\nWhat unique data do I have that could make the outputs better?\n\nAnd this is where I make my plea: we all need to work on our communication skills. How much better would the pre-AI world already be if we'd taken the time to get this right? Fewer misunderstandings. Clearer collaboration. Maybe even fewer wars. But now, with AI here to stay, this isn't just about being nice or thoughtful—it's about bending reality to your will.\n\nBecause that's what this technology gives us: the ability to shape what we see, build what we imagine, and create what we want. All through communication. Every person with access to the internet and a browser has this power, but the results you get depend entirely on how you use it.\n\nOne day, we may not even need this skill anymore. Either Skynet will have taken over (in which case, we'll have bigger problems), or AI will evolve to the point where it reads neural brain signals and knows what we want before we can think it. But for now, as long as the majority of the world stays intact and our relationship with machines depends on words, this ability to describe and curate will be the key to getting the most out of this technology.\n\nSo, sharpen your words. Practice describing the world you want to see. Curate the data you feed these systems thoughtfully and intentionally. The tools are here. The potential is limitless. But it's on us to show AI the way.",
        category: "AI Marketing",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad0f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        publishedDate: new Date("2025-03-10"),
        slug: "the-skill-ai-forces-us-to-master"
      },
      {
        title: "Synergizing HubSpot and Salesforce: The Ultimate MarTech Stack",
        excerpt: "Discover actionable strategies to maximize the integration between two of the most powerful marketing platforms for unprecedented campaign effectiveness.",
        content: "In today's competitive digital landscape, having disconnected marketing systems is a liability that modern businesses can't afford. This comprehensive guide explores the nuanced approaches to creating a seamless data flow between HubSpot's marketing automation capabilities and Salesforce's robust CRM features. By implementing the advanced integration techniques outlined in this article, marketing teams can eliminate data silos, provide sales teams with high-quality insights about prospect engagement, and create closed-loop reporting that demonstrates clear ROI from marketing activities. I'll share real-world examples from my client implementations, including custom field mappings, workflow automation triggers, and reporting dashboards that have transformed marketing operations for mid-size B2B companies.",
        category: "MarTech Integration",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        publishedDate: new Date("2023-12-15"),
        slug: "synergizing-hubspot-salesforce-martech-stack"
      },
      {
        title: "Beyond Basic Automation: AI-Powered Marketing Workflows That Convert",
        excerpt: "Learn how to implement sophisticated AI-driven marketing workflows that dramatically improve conversion rates while reducing team workload.",
        content: "Marketing automation has evolved far beyond simple drip campaigns and basic lead scoring. In this article, I explore the cutting-edge applications of artificial intelligence in creating dynamic, responsive marketing workflows that adapt in real-time to prospect behavior. From predictive lead scoring models that identify high-value prospects with unprecedented accuracy to content recommendation engines that serve the perfect assets at each stage of the buyer's journey, these advanced techniques represent the future of marketing automation. I'll provide step-by-step implementation guides for setting up these systems in major platforms like HubSpot, Marketo, and Pardot, along with the measurable results my clients have achieved through these approaches, including a 78% increase in SQL conversion rates and 45% reduction in sales cycle length.",
        category: "Marketing Automation",
        image: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        publishedDate: new Date("2023-10-22"),
        slug: "ai-powered-marketing-workflows"
      },
      {
        title: "Nonprofit Technology Transformation: Maximizing Impact with Limited Resources",
        excerpt: "Strategic approaches for nonprofit organizations to leverage affordable MarTech solutions to amplify their mission and donor engagement.",
        content: "Nonprofit organizations face unique challenges in the digital marketing landscape—working with limited budgets while competing for donor attention in increasingly crowded channels. This comprehensive guide draws from my experience implementing cost-effective MarTech solutions for nonprofits of all sizes, with a special focus on Blackbaud integration and donor journey optimization. I'll cover practical strategies for implementing segmentation that increases donor retention, automation workflows that nurture first-time donors into recurring supporters, and impact visualization tools that make abstract statistics emotionally compelling. The article includes specific tool recommendations at various price points, implementation roadmaps that account for limited technical resources, and case studies from organizations that have achieved transformative results without enterprise-level budgets.",
        category: "Nonprofit MarTech",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        publishedDate: new Date("2023-08-10"),
        slug: "nonprofit-technology-transformation"
      },
      {
        title: "Data-Driven Lead Generation: Building Marketing Systems That Scale",
        excerpt: "A practical framework for constructing integrated lead generation systems that leverage data at every touchpoint for predictable growth.",
        content: "The most sophisticated marketing campaigns will fail without a robust lead generation foundation to fuel them. This in-depth analysis examines the architecture of scalable lead generation systems that use data intelligence to identify, attract, and convert ideal prospects. I'll outline the essential components of modern lead generation infrastructure, from enrichment services that enhance lead quality to progressive profiling techniques that build comprehensive prospect profiles without creating friction. The article features technical implementation guides for connecting disparate tools into a unified system, advice on building custom scoring models based on behavioral data, and strategies for continuous optimization through multivariate testing. Throughout, I'll emphasize the importance of alignment between marketing technology choices and overall business strategy to ensure lead generation efforts drive meaningful business outcomes.",
        category: "Lead Generation",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        publishedDate: new Date("2023-06-05"),
        slug: "data-driven-lead-generation-systems"
      }
    ];
    
    // Add sample projects
    sampleProjects.forEach(project => {
      this.createProject(project);
    });
    
    // Add sample blog posts
    sampleBlogPosts.forEach(post => {
      this.createBlogPost(post);
    });
  }
}

export const storage = new MemStorage();
