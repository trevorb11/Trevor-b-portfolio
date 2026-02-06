import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
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
      className="premium-card group overflow-hidden"
    >
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center text-xs text-muted-foreground/60 mb-3">
          <span>{formattedDate}</span>
          <span className="mx-2">&middot;</span>
          <span>{post.category}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary/80 hover:text-primary font-medium text-sm transition-colors group/link"
        >
          Read Article
          <ArrowUpRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogCard;
