'use client'

import { usePathname, useRouter } from 'next/navigation'
import { type Locale } from '@/i18n-config'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher({ lang, dictionary }: { lang: Locale, dictionary: any }) {
  const router = useRouter()
  const pathname = usePathname()

  const redirectedPathName = (locale: Locale) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    return router.push(segments.join('/'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{dictionary.languageSwitcher.title}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => redirectedPathName('id')} disabled={lang === 'id'}>
          Indonesia
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => redirectedPathName('en')} disabled={lang === 'en'}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
