'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { User, Bell } from 'lucide-react';
import LanguageSwitcher from '../language-switcher';
import { Locale } from '@/i18n-config';

export function AppHeader({ lang, dictionary }: { lang: Locale, dictionary: any }) {
  const t = dictionary.header;
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" srText={t.toggleSidebar} />
      </div>
      <div className="flex items-center gap-2">
        <LanguageSwitcher lang={lang} dictionary={dictionary} />
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">{t.notifications}</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">{t.userProfile}</span>
        </Button>
      </div>
    </header>
  );
}
