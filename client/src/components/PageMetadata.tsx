import { useEffect } from "react";
import { useLocation } from "wouter";
import type { PageMetadata as Metadata } from "@shared/page-metadata";

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}
export default function PageMetadata() {
  const [path] = useLocation();
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/page-metadata?path=${encodeURIComponent(path)}`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error("Metadata unavailable"); return response.json(); })
      .then((data: Metadata & { origin: string }) => {
        if (controller.signal.aborted) return;
        document.title = data.title;
        setMeta("name", "description", data.description);
        setMeta("name", "robots", data.noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
        for (const [key, value] of Object.entries({ title: data.title, description: data.description, type: data.type || "website", url: new URL(data.path, data.origin).href })) setMeta("property", `og:${key}`, value);
        setMeta("name", "twitter:title", data.title);
        setMeta("name", "twitter:description", data.description);
        let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
        canonical.href = new URL(data.path, data.origin).href;
      }).catch(() => { /* Keep the server-rendered metadata on a transient failure. */ });
    return () => controller.abort();
  }, [path]);
  return null;
}
