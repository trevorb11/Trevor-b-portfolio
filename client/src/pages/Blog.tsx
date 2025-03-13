import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";
import { motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <Button
          asChild
          variant="ghost"
          className="mb-6 hover:bg-gray-100"
        >
          <Link href="/#blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">The MarTech Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Insights, strategies and real-world applications of marketing technology for businesses of all sizes.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-background rounded-xl shadow-sm h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts?.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;