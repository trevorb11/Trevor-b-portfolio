import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage as defaultStorage, type IStorage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
export async function registerRoutes(app: Express, storage: IStorage = defaultStorage): Promise<Server> {
  // Administration now uses the private Replit/SSH workspace. No public login,
  // session, or write endpoint is exposed by this portfolio.
  app.use("/api/admin", (_req, res) => res.status(410).set("Cache-Control", "no-store").json({ error: "Browser administration is no longer available." }));
  app.all("/api/cms/update", (_req, res) => res.status(410).json({ error: "Browser administration is no longer available." }));
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
      const id = Number(req.params.id);
      if (!/^[1-9]\d*$/.test(req.params.id) || !Number.isSafeInteger(id)) {
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
      contactFormSchema.parse(req.body);
      
      // Contact delivery is not configured. Do not acknowledge a message that
      // would only live in process memory and disappear on restart.
      return res.status(503).json({
        success: false,
        error: "Please email trevor@rankzone.studio directly. Online message delivery is not currently available."
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

  app.use("/api", (_req, res) => res.status(404).json({ error: "API route not found" }));

  const httpServer = createServer(app);
  return httpServer;
}
