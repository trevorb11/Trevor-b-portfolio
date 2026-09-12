import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-28">
      <div className="max-w-md text-center">
        <p className="text-primary font-medium mb-3">404</p>
        <h1 className="text-3xl font-bold mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">This page may have moved, or the link may be out of date. Explore my portfolio to find what you need.</p>
        <Button asChild className="rounded-full"><Link href="/">Back to the portfolio</Link></Button>
      </div>
    </main>
  );
}
