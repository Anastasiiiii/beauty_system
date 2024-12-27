import Link from 'next/link';
import {
  Home,
  LineChart,
  NotebookText,
  Package,
  Package2,
  PanelLeft,
  ScissorsLineDashed,
  Settings,
  Mail,
  MessageSquareMore,
  Users2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Analytics } from '@vercel/analytics/react';
import { User } from './user';
import Providers from './providers';
import { NavItem } from './nav-item';
import { auth } from '@/lib/auth';

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userType = session?.user?.userType ?? 'guest';

  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav userType={userType} />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav userType={userType} />
            <User />
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}

function DesktopNav({ userType }: { userType: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <NavItem href="/" label="Домашня сторінка">
          <Home className="h-5 w-5" />
        </NavItem>

        <NavItem href="/salons" label="Салони">
          <ScissorsLineDashed className="h-5 w-5" />
        </NavItem>

        {['client', 'master'].includes(userType) && (<>
          <NavItem href="/complaints" label="Скарги">
            <MessageSquareMore className="h-5 w-5" />
          </NavItem>
        </>)
        }

        {userType !== 'guest' &&
          <NavItem href="/appointments" label="Записи">
            <NotebookText className="h-5 w-5" />
          </NavItem>
        }

        {['administrator', 'manager'].includes(userType) && (<>
          <NavItem href="/inventory" label="Інвентар">
            <Package className="h-5 w-5" />
          </NavItem>

          <NavItem href="/customers" label="Користувачі">
            <Users2 className="h-5 w-5" />
          </NavItem>

          <NavItem href="#" label="Аналітика">
            <LineChart className="h-5 w-5" />
          </NavItem>

          <NavItem href="/reports" label="Відгуки">
            <Mail className="h-5 w-5" />
          </NavItem>
        </>)}
      </nav>
    </aside>
  );
}

function MobileNav({ userType }: { userType: string }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Vercel</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Home className="h-5 w-5" />
            Домашня сторінка
          </Link>
          <Link
            href="/salons"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ScissorsLineDashed className="h-5 w-5" />
            Салони
          </Link>

          {!['administrator', 'manager'].includes(userType) && (<>
            <Link
              href="/complaints"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <MessageSquareMore className="h-5 w-5" />
              Скарги
            </Link>
          </>)
          }

          {userType !== 'guest' &&
            <Link
              href="/appointments"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <NotebookText className="h-5 w-5" />
              Записи
            </Link>
          }

          {['administrator', 'manager'].includes(userType) && (<>
            <Link
              href="/inventory"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Package className="h-5 w-5" />
              Інвентар
            </Link>
            <Link
              href="/customers"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <Users2 className="h-5 w-5" />
              Користувачі
            </Link>
            <Link
              href="#"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <LineChart className="h-5 w-5" />
              Аналітика
            </Link>
          </>)}
        </nav>
      </SheetContent>
    </Sheet >
  );
}
