import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@shared/schema";
import { format } from "date-fns";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formattedDate = format(new Date(post.publishedDate), "MMMM d, yyyy");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-background rounded-xl overflow-hidden shadow-sm transition-transform hover:-translate-y-1"
    >
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{post.category}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-muted-foreground mb-4 text-sm">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary hover:text-secondary font-medium text-sm"
        >
          Read Article
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogCard;
