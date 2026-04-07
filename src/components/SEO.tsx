import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  type?: string;
}

export default function SEO({ title, description, type = "article" }: SEOProps) {
  return (
    <Helmet>
      {/* Título Standard */}
      <title>{title} | CMStocks Insights</title>
      <meta name="description" content={description} />

      {/* Facebook / Open Graph (Para quando compartilharem no WhatsApp/Telegram) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}