import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Project } from "@shared/schema";
import { motion } from "framer-motion";
import NotFound from "./not-found";

const ProjectDetail = () => {
  const [match, params] = useRoute("/projects/:id");
  const projectId = params?.id ? parseInt(params.id) : undefined;

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["/api/projects", projectId],
    enabled: !!projectId,
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
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return <NotFound />;
  }

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          asChild
          variant="ghost"
          className="mb-6 hover:bg-gray-100"
        >
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mt-2 md:mt-0">
              {project.category === "business-systems" ? "Business System" : 
               project.category === "websites" ? "Website" : 
               project.category === "software" ? "Software" : 
               project.category === "blog" ? "Blog" : "Project"}
            </span>
          </div>

          <div className="rounded-xl overflow-hidden mb-8">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
              <p className="text-muted-foreground mb-6">
                {project.description}
                {/* Extended description would go here in a real app */}
                <br /><br />
                This project demonstrates my ability to create robust, scalable solutions that address 
                real business needs. The development process involved thorough requirements gathering, 
                iterative design, and continuous testing to ensure the final product exceeded expectations.
              </p>
              
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Intuitive user interface with responsive design</li>
                <li>Secure authentication and authorization system</li>
                <li>Real-time data processing and visualization</li>
                <li>Comprehensive reporting and analytics dashboard</li>
                <li>Seamless integration with existing business systems</li>
              </ul>
            </div>

            <div>
              <div className="bg-background p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Project Type</h4>
                  <p className="text-sm">
                    {project.category === "business-systems" ? "Business System" : 
                     project.category === "websites" ? "Website" : 
                     project.category === "software" ? "Software" : 
                     project.category === "blog" ? "Blog" : "Project"}
                  </p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Client</h4>
                  <p className="text-sm">Enterprise Client</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Year</h4>
                  <p className="text-sm">2023</p>
                </div>
                
                <div className="flex flex-col space-y-2 mt-6">
                  <Button className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Project
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    View Source Code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
