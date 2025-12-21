import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingPageTemplate } from "@/components/marketing/page-template";
import { getMarketingPage, marketingStaticParams } from "@/data/marketing-pages";

type PageParams = {
  slug?: string[];
};

function buildKeywords(page: { primaryKeyword?: string; secondaryKeywords?: string[] }) {
  const keywords = [page.primaryKeyword, ...(page.secondaryKeywords || [])].filter((keyword): keyword is string => Boolean(keyword));
  return keywords.length > 0 ? keywords : undefined;
}

export function generateStaticParams() {
  return marketingStaticParams();
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const resolved = await params;
  const slug = (resolved.slug || []).join("/");
  const page = getMarketingPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: buildKeywords(page),
  };
}

export default async function MarketingDynamicPage({ params }: { params: Promise<PageParams> }) {
  const resolved = await params;
  const slug = (resolved.slug || []).join("/");
  const page = getMarketingPage(slug);

  if (!page) {
    return notFound();
  }

  return (
    <MarketingPageTemplate
      title={page.title}
      description={page.description}
      features={page.features}
      cta={page.cta}
      sections={page.sections}
      internalLinks={page.internalLinks}
      body={page.body}
    />
  );
}
