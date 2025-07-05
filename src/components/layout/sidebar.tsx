'use client';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Search,
  FileText,
  Megaphone,
  Users,
  LineChart,
  DollarSign,
  Youtube,
  Settings,
  LifeBuoy,
} from 'lucide-react';
import { Separator } from '../ui/separator';
import { Locale } from '@/i18n-config';

export function AppSidebar({ lang, dictionary }: { lang: Locale, dictionary: any }) {
  const pathname = usePathname();
  const t = dictionary?.sidebar;

  if (!t) {
    return null; // Don't render sidebar if dictionary is not available
  }

  const mainNavItems = [
    { href: '/', label: t.dashboard, icon: LayoutDashboard },
    { href: '/keyword-analyzer', label: t.aiKeywordTool, icon: Search },
    { href: '/content-optimizer', label: t.aiContentOptimizer, icon: FileText },
    { href: '/social-media-generator', label: t.aiPostGenerator, icon: Megaphone },
  ];

  const secondaryNavItems = [
    { href: '/competitor-analyzer', label: t.competitorAnalyzer, icon: Users },
    { href: '/google-analytics', label: t.googleAnalytics, icon: LineChart },
    { href: '/google-adsense', label: t.googleAdsense, icon: DollarSign },
    { href: '/youtube-optimization', label: t.youtubeOptimization, icon: Youtube },
  ];

  const renderNavItems = (items: typeof mainNavItems) =>
    items.map((item) => {
      const href = `/${lang}${item.href === '/' ? '' : item.href}`;
      const isActive = item.href === '/' ? pathname === `/${lang}` : pathname.startsWith(href);
      return (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
            <Link href={href}>
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });

  return (
    <Sidebar variant="sidebar" className="border-sidebar-border/50" dictionary={t}>
      <SidebarHeader>
        <Link href={`/${lang}`} className="flex items-center gap-2.5">
          <Icons.logo className="h-7 w-7 text-primary" />
          <span className="truncate text-lg font-semibold tracking-tight text-sidebar-foreground">
            {t.title}
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>{renderNavItems(mainNavItems)}</SidebarMenu>
        <Separator className="my-4" />
        <SidebarMenu>{renderNavItems(secondaryNavItems)}</SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={t.settings}>
              <Link href={`/${lang}#settings`}>
                <Settings className="h-4 w-4" />
                <span>{t.settings}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={t.support}>
              <Link href={`/${lang}#support`}>
                <LifeBuoy className="h-4 w-4" />
                <span>{t.support}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
