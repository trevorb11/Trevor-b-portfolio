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
      featured: project.featured ?? false
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
    const newPost: BlogPost = { ...post, id };
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
        title: "ERP System for Manufacturing",
        description: "A comprehensive enterprise resource planning system designed for mid-sized manufacturing companies to streamline operations.",
        category: "business-systems",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
        link: "/projects/1",
        featured: true
      },
      {
        title: "Luxury Boutique E-commerce",
        description: "A high-end e-commerce platform with advanced filtering, personalization, and seamless checkout experience.",
        category: "websites",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["Next.js", "Tailwind CSS", "Stripe", "Vercel"],
        link: "/projects/2",
        featured: true
      },
      {
        title: "Predictive Analytics Tool",
        description: "An advanced data analysis application that uses machine learning to provide predictive insights for business decision-making.",
        category: "software",
        image: "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["Python", "TensorFlow", "Flask", "D3.js"],
        link: "/projects/3",
        featured: true
      },
      {
        title: "Inventory Management System",
        description: "A real-time inventory tracking system with barcode scanning, automated reordering, and advanced reporting capabilities.",
        category: "business-systems",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["Vue.js", "Express", "MongoDB", "Socket.io"],
        link: "/projects/4",
        featured: true
      },
      {
        title: "Tech Insights Blog",
        description: "A technical blog featuring in-depth articles, tutorials, and industry insights on modern web development and system architecture.",
        category: "blog",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["Gatsby", "MDX", "Netlify CMS"],
        link: "/blog",
        featured: true
      },
      {
        title: "Corporate Website Redesign",
        description: "Complete redesign of a Fortune 500 company's web presence with focus on accessibility, performance, and user experience.",
        category: "websites",
        image: "https://images.unsplash.com/photo-1571715268998-d6e1bca94881?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        technologies: ["React", "Styled Components", "GraphQL"],
        link: "/projects/6",
        featured: true
      }
    ];
    
    // Sample blog posts
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "Modern Development Practices for Enterprise Systems",
        excerpt: "Exploring the latest methodologies and tools that are transforming how we build robust enterprise applications.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl sit amet nisl.",
        category: "Development",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        publishedDate: new Date("2023-05-15"),
        slug: "modern-development-practices"
      },
      {
        title: "Microservices vs. Monoliths: When to Choose What",
        excerpt: "A detailed analysis of different architectural approaches and how to select the right one for your specific business needs.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl sit amet nisl.",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        publishedDate: new Date("2023-04-22"),
        slug: "microservices-vs-monoliths"
      },
      {
        title: "Integrating Legacy Systems with Modern Workflows",
        excerpt: "Strategies for seamlessly connecting older business systems with new technologies for improved efficiency.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, nec ultricies nisl nisl sit amet nisl.",
        category: "Business Systems",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        publishedDate: new Date("2023-03-10"),
        slug: "integrating-legacy-systems"
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
