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

const mainNavItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/keyword-analyzer', label: 'AI Keyword Tool', icon: Search },
  { href: '/content-optimizer', label: 'AI Content Optimizer', icon: FileText },
  { href: '/social-media-generator', label: 'AI Post Generator', icon: Megaphone },
];

const secondaryNavItems = [
  { href: '/competitor-analyzer', label: 'Competitor Analyzer', icon: Users },
  { href: '/google-analytics', label: 'Google Analytics', icon: LineChart },
  { href: '/google-adsense', label: 'Google Adsense', icon: DollarSign },
  { href: '/youtube-optimization', label: 'YouTube Optimization', icon: Youtube },
];

export function AppSidebar() {
  const pathname = usePathname();

  const renderNavItems = (items: typeof mainNavItems) =>
    items.map((item) => (
      <SidebarMenuItem key={item.href}>
        <Link href={item.href} passHref legacyBehavior>
          <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
            <a>
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </a>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    ));

  return (
    <Sidebar variant="sidebar" className="border-sidebar-border/50">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2.5">
          <Icons.logo className="h-7 w-7 text-primary" />
          <span className="truncate text-lg font-semibold tracking-tight text-sidebar-foreground">
            DigiMedia Optimizer
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
            <Link href="#" passHref legacyBehavior>
              <SidebarMenuButton asChild tooltip="Settings">
                <a>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="#" passHref legacyBehavior>
              <SidebarMenuButton asChild tooltip="Support">
                <a>
                  <LifeBuoy className="h-4 w-4" />
                  <span>Support</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
