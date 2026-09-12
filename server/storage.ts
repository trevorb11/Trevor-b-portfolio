import { projects, blogPosts, contacts, cmsContents,
  type Project, type InsertProject,
  type BlogPost, type InsertBlogPost, type Contact, type InsertContact,
  type CmsContent, type InsertCmsContent } from "@shared/schema";
import { and, asc, desc, eq } from "drizzle-orm";
import { createDatabase, type Database } from "./db";

export interface IStorage {
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

export class DatabaseStorage implements IStorage {
  constructor(private connection?: Database) {}
  private get db() { return this.connection ??= createDatabase(); }
  async getProjects() { return this.db.select().from(projects).orderBy(asc(projects.id)); }
  async getProjectById(id: number) { return (await this.db.select().from(projects).where(eq(projects.id, id)))[0]; }
  async getProjectsByCategory(category: string) {
    return category === "all" ? this.getProjects() : this.db.select().from(projects).where(eq(projects.category, category)).orderBy(asc(projects.id));
  }
  async createProject(project: InsertProject) { return (await this.db.insert(projects).values(project).returning())[0]; }
  async updateProject(id: number, project: Partial<InsertProject>) { return (await this.db.update(projects).set(project).where(eq(projects.id, id)).returning())[0] ?? null; }
  async deleteProject(id: number) { return (await this.db.delete(projects).where(eq(projects.id, id)).returning({ id: projects.id })).length > 0; }
  async getBlogPosts() { return this.db.select().from(blogPosts).orderBy(desc(blogPosts.publishedDate), asc(blogPosts.id)); }
  async getBlogPostById(id: number) { return (await this.db.select().from(blogPosts).where(eq(blogPosts.id, id)))[0]; }
  async getBlogPostBySlug(slug: string) { return (await this.db.select().from(blogPosts).where(eq(blogPosts.slug, slug)))[0]; }
  async createBlogPost(post: InsertBlogPost) { return (await this.db.insert(blogPosts).values(post).returning())[0]; }
  async updateBlogPost(id: number, post: Partial<InsertBlogPost>) { return (await this.db.update(blogPosts).set(post).where(eq(blogPosts.id, id)).returning())[0] ?? null; }
  async deleteBlogPost(id: number) { return (await this.db.delete(blogPosts).where(eq(blogPosts.id, id)).returning({ id: blogPosts.id })).length > 0; }
  async createContact(contact: InsertContact) { return (await this.db.insert(contacts).values(contact).returning())[0]; }
  async getContacts() { return this.db.select().from(contacts).orderBy(desc(contacts.createdAt)); }
  async getCmsContents() { return this.db.select().from(cmsContents).orderBy(asc(cmsContents.id)); }
  async getCmsContentsBySection(section: string) { return this.db.select().from(cmsContents).where(eq(cmsContents.section, section)).orderBy(asc(cmsContents.id)); }
  async getCmsContent(id: number) { return (await this.db.select().from(cmsContents).where(eq(cmsContents.id, id)))[0]; }
  async getCmsContentBySectionAndKey(section: string, key: string) { return (await this.db.select().from(cmsContents).where(and(eq(cmsContents.section, section), eq(cmsContents.key, key))))[0]; }
  async createCmsContent(content: InsertCmsContent) { return (await this.db.insert(cmsContents).values(content).returning())[0]; }
  async updateCmsContent(id: number, value: string) { return (await this.db.update(cmsContents).set({ value, updatedAt: new Date() }).where(eq(cmsContents.id, id)).returning())[0] ?? null; }
  async deleteCmsContent(id: number) { return (await this.db.delete(cmsContents).where(eq(cmsContents.id, id)).returning({ id: cmsContents.id })).length > 0; }
}

export const storage = new DatabaseStorage();
