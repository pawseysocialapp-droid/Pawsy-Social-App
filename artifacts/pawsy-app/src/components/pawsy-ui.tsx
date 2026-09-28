import { Link, useLocation } from 'wouter';
import {
  Bell,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Compass,
  Edit3,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  PawPrint,
  Plus,
  Search,
  Send,
  Settings2,
  Sparkles,
  UserRound,
  WalletCards,
  X,
} from 'lucide-react';
import type { ReactNode } from 'react';

export const animalColors: Record<string, string> = {
  Bunny: 'bg-rose-100 text-rose-700',
  Fox: 'bg-orange-100 text-orange-700',
  Owl: 'bg-violet-100 text-violet-700',
  Wolf: 'bg-slate-200 text-slate-700',
  Bear: 'bg-amber-100 text-amber-800',
  Cat: 'bg-lime-100 text-lime-800',
  Deer: 'bg-yellow-100 text-yellow-800',
  Panda: 'bg-stone-200 text-stone-800',
  Frog: 'bg-emerald-100 text-emerald-800',
  Koala: 'bg-teal-100 text-teal-800',
};

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className={`flex items-center gap-1 ${light ? 'text-white' : 'text-[#e84272]'}`} data-testid="brand-pawsy">
      <span className="font-serif text-[2rem] font-bold leading-none tracking-[-.08em]">Pawsy</span>
      <PawPrint size={21} strokeWidth={2.8} className="rotate-12" />
    </div>
  );
}

export function IconButton({
  label,
  children,
  onClick,
  testId,
  className = '',
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  testId: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      data-testid={testId}
      onClick={onClick}
      className={`grid h-11 w-11 place-items-center rounded-full border border-[#eedbd0] bg-[#fffaf4]/85 text-[#4a4657] shadow-sm transition hover:-translate-y-0.5 hover:bg-white active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}

export function Avatar({
  name,
  animal,
  photoUrl,
  size = 'md',
}: {
  name?: string;
  animal?: string;
  photoUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizes = { sm: 'h-10 w-10 text-sm', md: 'h-14 w-14 text-lg', lg: 'h-24 w-24 text-3xl' };
  const initials = (name ?? animal ?? 'P').slice(0, 1).toUpperCase();
  return photoUrl ? (
    <img src={photoUrl} alt={`${name ?? animal ?? 'Pawsy'} avatar`} className={`${sizes[size]} rounded-full object-cover ring-2 ring-white`} data-testid={`img-avatar-${name ?? animal}`} />
  ) : (
    <div className={`${sizes[size]} ${animalColors[animal ?? 'Bunny'] ?? 'bg-rose-100 text-rose-700'} grid shrink-0 place-items-center rounded-full font-serif font-bold ring-2 ring-white`} data-testid={`avatar-${name ?? animal}`}>
      {initials}
    </div>
  );
}

export function Pill({ children, tone = 'cream' }: { children: ReactNode; tone?: 'cream' | 'pink' | 'green' }) {
  const tones = {
    cream: 'bg-[#f8eadf] text-[#6d5b60]',
    pink: 'bg-[#ffe0e8] text-[#b7345e]',
    green: 'bg-[#dfeee6] text-[#39765f]',
  };
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

export function SectionHeader({
  icon,
  title,
  subtitle,
  action,
  onAction,
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          {icon && <span className="text-[#e84272]">{icon}</span>}
          <h2 className="font-serif text-[1.45rem] font-bold leading-tight text-[#2d2940]" data-testid={`heading-${title.toLowerCase().replaceAll(' ', '-')}`}>{title}</h2>
        </div>
        {subtitle && <p className="mt-1 text-sm text-[#80717b]">{subtitle}</p>}
      </div>
      {action && (
        <button type="button" onClick={onAction} data-testid={`button-${action.toLowerCase().replaceAll(' ', '-')}`} className="text-sm font-bold text-[#d83c69] hover:underline">
          {action}
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  body,
  action,
  onAction,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="story-shadow rounded-[1.65rem] border border-[#efdcd0] bg-[#fffaf5] px-6 py-10 text-center" data-testid="empty-state">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#ffe1e9] text-[#df3d6d]">{icon}</div>
      <h3 className="font-serif text-xl font-bold text-[#2d2940]" data-testid="text-empty-title">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#80717b]" data-testid="text-empty-body">{body}</p>
      {action && <button type="button" onClick={onAction} data-testid="button-empty-action" className="mt-5 rounded-full bg-[#e84272] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#d83867] active:scale-95">{action}</button>}
    </div>
  );
}

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/plans', label: 'Plans', icon: CalendarDays },
  { href: '/messages', label: 'Messages', icon: MessageCircle },
  { href: '/profile', label: 'Profile', icon: UserRound },
];

export function BottomNav({ unread = 0 }: { unread?: number }) {
  const [location] = useLocation();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-w-2xl justify-around border-t border-[#ecd8cd] bg-[#fff8f2]/95 px-2 py-2 shadow-[0_-8px_25px_rgba(105,59,46,.08)] backdrop-blur-md safe-bottom md:max-w-none md:justify-center md:gap-12" data-testid="navigation-bottom">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = location === href;
        return (
          <Link key={href} href={href} data-testid={`link-nav-${label.toLowerCase()}`} className={`relative flex min-w-14 flex-col items-center gap-1 rounded-2xl px-2 py-1 text-[11px] font-semibold transition ${active ? 'text-[#df3d6d]' : 'text-[#867680] hover:text-[#d63e6a]'}`}>
            <span className={`grid h-8 w-10 place-items-center rounded-2xl ${active ? 'bg-[#ffe0e8]' : ''}`}><Icon size={20} strokeWidth={active ? 2.5 : 1.8} /></span>
            {label}
            {label === 'Messages' && unread > 0 && <span className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-[#e84272] px-1 text-[9px] text-white">{unread}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children, title, subtitle, unread = 0 }: { children: ReactNode; title?: string; subtitle?: string; unread?: number }) {
  return (
    <div className="pawsy-grain min-h-[100dvh] bg-[radial-gradient(circle_at_75%_0%,#ffe6df_0%,transparent_30%),#f8eee6] pb-24">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 pb-2 pt-6 md:px-10 md:pt-8">
        <Logo />
        <div className="flex items-center gap-2">
          <IconButton label="Search Pawsy" testId="button-search"><Search size={19} /></IconButton>
          <IconButton label="Notifications" testId="button-notifications"><Bell size={19} /></IconButton>
          <Link href="/wallet" data-testid="link-wallet" className="hidden items-center gap-2 rounded-full bg-[#ffe1a5] px-3 py-2 text-xs font-bold text-[#6f5017] sm:flex"><WalletCards size={16} /> Paw Store</Link>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 md:px-10">
        {(title || subtitle) && <div className="mb-6 mt-4"><h1 className="font-serif text-3xl font-bold text-[#2d2940] md:text-4xl">{title}</h1>{subtitle && <p className="mt-1 text-[#80717b]">{subtitle}</p>}</div>}
        {children}
      </main>
      <BottomNav unread={unread} />
    </div>
  );
}

export function BackLink({ href = '/', label = 'Back' }: { href?: string; label?: string }) {
  return <Link href={href} data-testid="link-back" className="inline-flex items-center gap-1 text-sm font-semibold text-[#6b5c68]"><ChevronLeft size={17} /> {label}</Link>;
}

export function LoadingCards({ count = 3 }: { count?: number }) {
  return <div className="grid gap-4 sm:grid-cols-2">{Array.from({ length: count }).map((_, i) => <div key={i} className="h-44 animate-pulse rounded-[1.5rem] bg-[#f0dfd7]" data-testid={`skeleton-card-${i}`} />)}</div>;
}

export function TinyAction({ label, children, onClick, testId }: { label: string; children: ReactNode; onClick: () => void; testId: string }) {
  return <button type="button" aria-label={label} onClick={onClick} data-testid={testId} className="grid h-12 w-12 place-items-center rounded-full border border-[#efdad7] bg-[#fffaf5] text-[#e84272] shadow-sm transition hover:-translate-y-1 hover:bg-[#ffe1e9] active:scale-90">{children}</button>;
}

export function Notice({ children, tone = 'pink' }: { children: ReactNode; tone?: 'pink' | 'gold' }) {
  return <div className={`flex items-start gap-3 rounded-2xl px-4 py-3 text-sm ${tone === 'pink' ? 'bg-[#ffe6ec] text-[#963a58]' : 'bg-[#fff0c9] text-[#775516]'}`} data-testid="status-notice"><Sparkles size={17} className="mt-0.5 shrink-0" /> <span>{children}</span></div>;
}

export { BookOpen, ChevronRight, Edit3, Heart, MapPin, Plus, Send, Settings2, UserRound, X };