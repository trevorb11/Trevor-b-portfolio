import { 
  users, type User, type InsertUser,
  projects, type Project, type InsertProject,
  blogPosts, type BlogPost, type InsertBlogPost,
  contacts, type Contact, type InsertContact
} from "@shared/schema";

export interface IStorage {
  // User methods (from original code)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Blog methods
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private blogPosts: Map<number, BlogPost>;
  private contacts: Map<number, Contact>;
  
  private userCurrentId: number;
  private projectCurrentId: number;
  private blogPostCurrentId: number;
  private contactCurrentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.blogPosts = new Map();
    this.contacts = new Map();
    
    this.userCurrentId = 1;
    this.projectCurrentId = 1;
    this.blogPostCurrentId = 1;
    this.contactCurrentId = 1;
    
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
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
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
  
  // Initialize with sample data
  private initSampleData() {
    // Sample projects
    const sampleProjects: InsertProject[] = [
      {
        title: "Impact Wrapped for Community Food Share",
        description: "An interactive Spotify-inspired 'Year in Review' experience for nonprofit donors, showcasing their impact through personalized data visualizations of their contributions.",
        category: "crm-integration",
        image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["React", "Chart.js", "Node.js", "HubSpot Integration"],
        link: "https://community-food-share-impact-wrapped.replit.app/",
        featured: 1
      },
      {
        title: "RankZone - Marketing Performance Tracker",
        description: "A comprehensive analytics dashboard for marketing teams to track KPIs, SEO rankings, and competitor analysis with AI-powered recommendations.",
        category: "ai-marketing",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["Vue.js", "D3.js", "Express", "Google Analytics API", "SEMrush API"],
        link: "https://rank-zone.replit.app/",
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
      }
    ];
    
    // Sample blog posts
    const sampleBlogPosts: InsertBlogPost[] = [
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
