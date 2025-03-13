import { pgTable, text, serial, integer, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (keeping original for reference)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Admin login schema
export const adminLoginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AdminLogin = z.infer<typeof adminLoginSchema>;

// Project schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  image: text("image").notNull(),
  technologies: text("technologies").array().notNull(),
  link: text("link"),
  featured: integer("featured").default(0),
});

export const insertProjectSchema = createInsertSchema(projects).omit({ 
  id: true 
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Blog post schema
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  image: text("image").notNull(),
  publishedDate: timestamp("published_date").notNull().defaultNow(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ 
  id: true 
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Contact schema
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({ 
  id: true,
  createdAt: true 
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Create a validator for contact form submissions
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(255),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// CMS Content schema for editable website content
export const cmsContents = pgTable("cms_contents", {
  id: serial("id").primaryKey(),
  section: varchar("section", { length: 100 }).notNull(), // e.g., "hero", "about", "blog"
  key: varchar("key", { length: 100 }).notNull(), // e.g., "title", "description", "image"
  value: text("value").notNull(),
  type: varchar("type", { length: 50 }).notNull(), // "text", "richtext", "image", "json"
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Create a composite unique constraint on section and key
// This ensures each section-key pair is unique
export const uniqueSectionKey = pgTable("unique_section_key", {
  sectionKey: varchar("section_key", { length: 210 }).primaryKey(),
});

export const insertCmsContentSchema = createInsertSchema(cmsContents).omit({ 
  id: true,
  updatedAt: true 
});

export type InsertCmsContent = z.infer<typeof insertCmsContentSchema>;
export type CmsContent = typeof cmsContents.$inferSelect;

// CMS content update schema
export const updateCmsContentSchema = z.object({
  id: z.number(),
  value: z.string(),
});

export type UpdateCmsContent = z.infer<typeof updateCmsContentSchema>;
