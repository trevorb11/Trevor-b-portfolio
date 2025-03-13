import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { BlogPost as BlogPostType } from "@shared/schema";
import { format } from "date-fns";
import { motion } from "framer-motion";
import NotFound from "./not-found";

const BlogPost = () => {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPostType>({
    queryKey: [`/api/blog/${slug}`],
    enabled: !!slug,
  });

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-32">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return <NotFound />;
  }

  const formattedDate = format(new Date(post.publishedDate), "MMMM d, yyyy");

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          asChild
          variant="ghost"
          className="mb-6 hover:bg-gray-100"
        >
          <Link href="/#blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-8">
            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              <span>{post.category}</span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="lead text-xl mb-6">{post.excerpt}</p>
            
            <div className="mb-6 blog-content">
              {post.content.split('\n\n').map((paragraph, index) => {
                // For image placeholders in specific positions
                if (index === 2 && post.slug === "the-skill-ai-forces-us-to-master") {
                  return (
                    <div key={index} className="my-8">
                      <img 
                        src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                        alt="AI and human interaction" 
                        className="rounded-xl w-full h-auto mb-3"
                      />
                      <p className="text-sm text-center text-muted-foreground">
                        Natural language has become the new interface for AI interaction
                      </p>
                      <p className="mt-4">{paragraph}</p>
                    </div>
                  );
                }
                
                if (index === 6 && post.slug === "the-skill-ai-forces-us-to-master") {
                  return (
                    <div key={index} className="my-8">
                      <p>{paragraph}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                        <img 
                          src="https://images.unsplash.com/photo-1655720358399-55e6b836664a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                          alt="Prompt engineering visualization" 
                          className="rounded-xl w-full h-auto"
                        />
                        <img 
                          src="https://images.unsplash.com/photo-1693470928795-ba38169020be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                          alt="Data curation visualization" 
                          className="rounded-xl w-full h-auto"
                        />
                      </div>
                    </div>
                  );
                }
                
                // Regular paragraphs - create h2 elements for paragraphs that look like headings
                if (paragraph.length < 50 && !paragraph.endsWith('.')) {
                  return <h2 key={index} className="mt-8 mb-4">{paragraph}</h2>;
                }
                
                return <p key={index} className="mb-4">{paragraph}</p>;
              })}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background rounded-lg overflow-hidden shadow-sm">
                <div className="p-4">
                  <h4 className="font-medium mb-2">Modern Development Practices for Enterprise Systems</h4>
                  <Link href="#" className="text-primary text-sm">Read Article →</Link>
                </div>
              </div>
              <div className="bg-background rounded-lg overflow-hidden shadow-sm">
                <div className="p-4">
                  <h4 className="font-medium mb-2">Microservices vs. Monoliths: When to Choose What</h4>
                  <Link href="#" className="text-primary text-sm">Read Article →</Link>
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPost;
