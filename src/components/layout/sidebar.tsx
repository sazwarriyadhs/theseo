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
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { Locale } from '@/i18n-config';

export function AppSidebar({ lang, dictionary }: { lang: Locale, dictionary: any }) {
  const pathname = usePathname();

  const mainNavItems = [
    { href: '/', label: dictionary.dashboard, icon: LayoutDashboard },
    { href: '/keyword-analyzer', label: dictionary.aiKeywordTool, icon: Search },
    { href: '/content-optimizer', label: dictionary.aiContentOptimizer, icon: FileText },
    { href: '/social-media-generator', label: dictionary.aiPostGenerator, icon: Megaphone },
  ];

  const secondaryNavItems = [
    { href: '/competitor-analyzer', label: dictionary.competitorAnalyzer, icon: Users },
    { href: '/google-analytics', label: dictionary.googleAnalytics, icon: LineChart },
    { href: '/google-adsense', label: dictionary.googleAdsense, icon: DollarSign },
    { href: '/youtube-optimization', label: dictionary.youtubeOptimization, icon: Youtube },
  ];

  const renderNavItems = (items: typeof mainNavItems) =>
    items.map((item) => {
      const href = `/${lang}${item.href === '/' ? '' : item.href}`;
      // A more robust check for active state
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
    <Sidebar variant="sidebar" className="border-sidebar-border/50">
      <SidebarHeader>
        <Link href={`/${lang}`} className="flex items-center gap-2.5">
          <Icons.logo className="h-7 w-7 text-primary" />
          <span className="truncate text-lg font-semibold tracking-tight text-sidebar-foreground">
            {dictionary.title}
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
            <SidebarMenuButton asChild tooltip={dictionary.settings}>
              <Link href="#">
                <Settings className="h-4 w-4" />
                <span>{dictionary.settings}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={dictionary.support}>
              <Link href="#">
                <LifeBuoy className="h-4 w-4" />
                <span>{dictionary.support}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
