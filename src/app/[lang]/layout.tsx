import type { Metadata } from 'next';
import Script from 'next/script';
import '../globals.css';
import { cn } from '@/lib/utils';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/sidebar';
import { AppHeader } from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { i18n, type Locale } from '@/i18n-config';
import { getDictionary } from '@/dictionaries/get-dictionary';


export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const dictionary = await getDictionary(params.lang);
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dictionary = await getDictionary(params.lang);
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script
          id="adsbygoogle-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2279227107562302"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-REPLACE_WITH_YOUR_ID" && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={cn('font-body antialiased', 'min-h-screen bg-background')}>
        <SidebarProvider>
          <AppSidebar lang={params.lang} dictionary={dictionary} />
          <SidebarInset>
            <div className="flex min-h-screen flex-col">
              <AppHeader lang={params.lang} dictionary={dictionary} />
              <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
          </SidebarInset>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
