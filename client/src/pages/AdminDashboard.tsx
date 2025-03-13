import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CmsContent, UpdateCmsContent } from "@shared/schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiRequest("GET", "/api/admin/check-auth");
        const data = await response.json();
        if (!data.authenticated) {
          navigate("/admin");
        }
      } catch (error) {
        navigate("/admin");
      }
    };
    checkAuth();
  }, [navigate]);

  // Fetch CMS content
  const { data: cmsContents, isLoading, error } = useQuery({
    queryKey: ["/api/cms"],
    refetchOnWindowFocus: false,
  });

  // Group content by sections
  const contentBySection = React.useMemo(() => {
    if (!cmsContents || !Array.isArray(cmsContents)) return {} as Record<string, CmsContent[]>;
    
    return cmsContents.reduce((acc: Record<string, CmsContent[]>, content: CmsContent) => {
      if (!acc[content.section]) {
        acc[content.section] = [];
      }
      acc[content.section].push(content);
      return acc;
    }, {} as Record<string, CmsContent[]>);
  }, [cmsContents]);

  // Update CMS content mutation
  const updateMutation = useMutation({
    mutationFn: async (data: UpdateCmsContent) => {
      return await apiRequest("POST", "/api/cms/update", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cms"] });
      toast({
        title: "Content updated",
        description: "The content has been updated successfully.",
      });
      setIsEditing(null);
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message || "Failed to update content",
      });
    },
  });

  const startEditing = (content: CmsContent) => {
    setIsEditing(content.id);
    setEditValue(content.value);
  };

  const cancelEditing = () => {
    setIsEditing(null);
  };

  const saveEdit = (id: number) => {
    updateMutation.mutate({ id, value: editValue });
  };

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/admin/logout");
      navigate("/admin");
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Loading dashboard...</h2>
          <p className="text-gray-500 mt-2">Please wait while we fetch your content.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">Error loading dashboard</h2>
          <p className="text-gray-500 mt-2">There was a problem loading the dashboard. Please try again.</p>
          <Button onClick={() => navigate("/admin")} className="mt-4">
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">CMS Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View Website
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b mb-4">
            <TabsList className="h-12">
              <TabsTrigger value="content" className="text-base">Content</TabsTrigger>
              <TabsTrigger value="blog" className="text-base">Blog Posts</TabsTrigger>
              <TabsTrigger value="projects" className="text-base">Projects</TabsTrigger>
              <TabsTrigger value="contacts" className="text-base">Contacts</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="content" className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {Object.keys(contentBySection).map((section) => (
                <Card key={section} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 dark:bg-gray-800">
                    <CardTitle className="capitalize flex items-center">
                      {section} Section
                      <Badge variant="outline" className="ml-2 capitalize">
                        {contentBySection[section].length} items
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Edit the content for the {section} section of your website
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {contentBySection[section].map((content: CmsContent) => (
                        <div key={content.id} className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium capitalize">{content.key}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Type: {content.type}
                              </p>
                            </div>
                            {isEditing === content.id ? (
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  onClick={cancelEditing}
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  size="sm" 
                                  onClick={() => saveEdit(content.id)}
                                  disabled={updateMutation.isPending}
                                >
                                  Save
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => startEditing(content)}
                              >
                                Edit
                              </Button>
                            )}
                          </div>
                          
                          {isEditing === content.id ? (
                            content.type === "richtext" ? (
                              <Textarea
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-full mt-2"
                                rows={5}
                              />
                            ) : (
                              <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-full mt-2"
                              />
                            )
                          ) : (
                            <div className="mt-2 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded border">
                              {content.value}
                            </div>
                          )}
                          
                          <p className="text-xs text-gray-400 mt-2">
                            Last updated: {new Date(content.updatedAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Blog Posts Management</CardTitle>
                <CardDescription>Manage your blog posts here</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Blog post management coming soon</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" disabled>Add New Post</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Projects Management</CardTitle>
                <CardDescription>Manage your project portfolio here</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Project management coming soon</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" disabled>Add New Project</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Requests</CardTitle>
                <CardDescription>View messages from your contact form</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Contact management coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}