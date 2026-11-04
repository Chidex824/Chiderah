import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  NOT_FOUND_METADATA,
  PAGE_METADATA,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE,
} from "../../utils/siteMetadata";

const setMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const PageMetadata = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = PAGE_METADATA[pathname] || NOT_FOUND_METADATA;
    const isNotFound = !PAGE_METADATA[pathname];
    const canonicalUrl = new URL(pathname, `${SITE_URL}/`).href;

    document.title = metadata.title;
    setMeta("name", "description", metadata.description);
    setMeta("name", "robots", isNotFound ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:image", SOCIAL_IMAGE);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    setMeta("name", "twitter:image", SOCIAL_IMAGE);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [pathname]);

  return null;
};

export default PageMetadata;
