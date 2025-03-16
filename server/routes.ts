import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, contactFormSchema, adminLoginSchema, updateCmsContentSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import session from "express-session";

// Extending express session with our user object
declare module "express-session" {
  interface SessionData {
    user?: {
      id: number;
      username: string;
      isAdmin: boolean;
    };
  }
}

// Middleware to check if user is authenticated
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ error: "Not authenticated" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const loginData = adminLoginSchema.parse(req.body);
      const user = await storage.validateAdminCredentials(loginData.username, loginData.password);
      
      if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      
      // Set user in session
      req.session.user = {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin
      };
      
      return res.json({ 
        success: true,
        message: "Login successful"
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      
      console.error("Login error:", error);
      return res.status(500).json({ error: "Login failed" });
    }
  });
  
  app.post("/api/admin/logout", (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: "Logout failed" });
        }
        return res.json({ success: true, message: "Logged out successfully" });
      });
    } else {
      return res.json({ success: true, message: "Already logged out" });
    }
  });
  
  app.get("/api/admin/check-auth", (req, res) => {
    if (req.session && req.session.user) {
      return res.json({ 
        authenticated: true, 
        user: {
          username: req.session.user.username,
          isAdmin: req.session.user.isAdmin
        }
      });
    }
    return res.json({ authenticated: false });
  });
  
  // CMS Content routes
  app.get("/api/cms", async (req, res) => {
    try {
      const contents = await storage.getCmsContents();
      return res.json(contents);
    } catch (error) {
      console.error("Error fetching CMS contents:", error);
      return res.status(500).json({ error: "Failed to fetch CMS contents" });
    }
  });
  
  app.get("/api/cms/section/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const contents = await storage.getCmsContentsBySection(section);
      return res.json(contents);
    } catch (error) {
      console.error(`Error fetching CMS contents for section ${req.params.section}:`, error);
      return res.status(500).json({ error: "Failed to fetch CMS contents by section" });
    }
  });
  
  app.post("/api/cms/update", isAuthenticated, async (req, res) => {
    try {
      const updateData = updateCmsContentSchema.parse(req.body);
      const updated = await storage.updateCmsContent(updateData.id, updateData.value);
      
      if (!updated) {
        return res.status(404).json({ error: "CMS content not found" });
      }
      
      return res.json({
        success: true,
        content: updated
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      
      console.error("Error updating CMS content:", error);
      return res.status(500).json({ error: "Failed to update content" });
    }
  });
  
  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      return res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ error: "Failed to fetch projects" });
    }
  });
  
  // Get projects by category
  app.get("/api/projects/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const projects = await storage.getProjectsByCategory(category);
      return res.json(projects);
    } catch (error) {
      console.error(`Error fetching projects for category ${req.params.category}:`, error);
      return res.status(500).json({ error: "Failed to fetch projects by category" });
    }
  });
  
  // Get project by ID
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }
      
      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      return res.json(project);
    } catch (error) {
      console.error(`Error fetching project ${req.params.id}:`, error);
      return res.status(500).json({ error: "Failed to fetch project" });
    }
  });
  
  // Get all blog posts
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      return res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });
  
  // Get blog post by slug
  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      return res.json(post);
    } catch (error) {
      console.error(`Error fetching blog post with slug ${req.params.slug}:`, error);
      return res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });
  
  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate form data
      const contactData = contactFormSchema.parse(req.body);
      
      // Create contact entry
      const contact = await storage.createContact(contactData);
      
      return res.status(201).json({ 
        success: true, 
        message: "Your message has been sent successfully!" 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          error: validationError.message 
        });
      }
      
      console.error("Error submitting contact form:", error);
      return res.status(500).json({ 
        success: false, 
        error: "Failed to submit your message. Please try again." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
