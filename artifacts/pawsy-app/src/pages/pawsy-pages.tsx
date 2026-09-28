import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useLocation, useParams } from 'wouter';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Camera,
  Check,
  CircleHelp,
  Coffee,
  Compass,
  Heart,
  Image,
  Leaf,
  LockKeyhole,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  PawPrint,
  Plus,
  Send,
  SlidersHorizontal,
  Sparkles,
  Store,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from 'lucide-react';
import {
  getGetConversationQueryKey,
  getGetMeQueryKey,
  getGetSubscriptionQueryKey,
  getGetWalletQueryKey,
  getListConversationsQueryKey,
  getListDiscoverProfilesQueryKey,
  getListPlansQueryKey,
  useCreatePlan,
  useGetConversation,
  useGetMe,
  useGetSubscription,
  useGetWallet,
  useHealthCheck,
  useJoinPlan,
  useLikeProfile,
  useListConversations,
  useListDiscoverProfiles,
  useListPlans,
  usePassProfile,
  useSendMessage,
  useStartCreditCheckout,
  useStartSubscriptionCheckout,
  useUpdateMe,
  type Conversation,
  type Plan,
  type Profile,
} from '@workspace/api-client-react';
import {
  AppShell,
  Avatar,
  BackLink,
  BottomNav,
  EmptyState,
  IconButton,
  LoadingCards,
  Logo,
  Notice,
  Pill,
  SectionHeader,
  TinyAction,
  animalColors,
} from '@/components/pawsy-ui';
import welcomeWorld from '@/assets/welcome-world.png';
import onboardingWorld from '@/assets/onboarding-world.png';
import homeWorld from '@/assets/home-world.png';
import profileWorld from '@/assets/profile-world.png';
import messagesWorld from '@/assets/messages-world.png';

function QueryError({ retry }: { retry: () => void }) {
  return <div className="rounded-2xl border border-[#f0c9c7] bg-[#fff0ee] px-5 py-6 text-center text-sm text-[#9a4a4c]" data-testid="status-query-error"><CircleHelp className="mx-auto mb-2" size={23} /><p>We lost the trail for a moment.</p><button type="button" onClick={retry} data-testid="button-retry" className="mt-3 font-bold underline">Try again</button></div>;
}

function WelcomePage() {
  const [, setLocation] = useLocation();
  const [onboarding, setOnboarding] = useState(false);
  const [animal, setAnimal] = useState('Bunny');
  const animals = ['Bunny', 'Fox', 'Owl', 'Bear', 'Wolf'];
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#e6b6bf] text-[#2d2940]">
      <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${onboarding ? 'scale-110' : 'scale-100'}`} style={{ backgroundImage: `url(${onboarding ? onboardingWorld : welcomeWorld})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#38243d]/20 via-transparent to-[#35233a]/60" />
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-lg flex-col px-6 pb-8 pt-10">
        <div className="flex items-center justify-between"><Logo light /><span className="rounded-full bg-white/25 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm" data-testid="status-welcome">A kinder way to meet</span></div>
        {!onboarding ? (
          <div className="mt-auto">
            <div className="mb-7 rounded-[1.75rem] border border-white/40 bg-[#fff8ee]/88 p-6 text-center shadow-2xl backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#bd4d6c]">Find your people</p>
              <h1 className="mt-2 font-serif text-4xl font-bold leading-[1.02] text-[#30253d]">Follow your<br />instincts.</h1>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#6e5d68]">A soft place to find friends, activity partners, and communities that feel like home.</p>
              <button type="button" onClick={() => setOnboarding(true)} data-testid="button-explore-animals" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e84272] px-5 py-3.5 font-bold text-white shadow-lg transition hover:bg-[#d83766] active:scale-[.98]">Explore the animals <ArrowRight size={18} /></button>
            </div>
            <button type="button" onClick={() => setLocation('/home')} data-testid="button-login" className="mx-auto block rounded-full border border-white/70 bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm">Already have a Pawsy profile? <span className="underline">Enter here</span></button>
          </div>
        ) : (
          <div className="mt-auto">
            <div className="mb-5 text-center text-white drop-shadow-md"><p className="text-xs font-bold uppercase tracking-[.22em]">A small first step</p><h1 className="mt-2 font-serif text-4xl font-bold">Which creature<br />feels like you?</h1><p className="mt-2 text-sm text-white/85">There is no wrong answer. Just your kind of energy.</p></div>
            <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
              {animals.map((item) => <button type="button" key={item} onClick={() => setAnimal(item)} data-testid={`button-animal-${item.toLowerCase()}`} className={`shrink-0 rounded-2xl px-4 py-3 text-sm font-bold shadow-md transition ${animal === item ? 'bg-[#e84272] text-white -translate-y-1' : 'bg-[#fff8ee]/90 text-[#4e4050]'}`}>{item}</button>)}
            </div>
            <div className="rounded-[1.75rem] border border-white/60 bg-[#fff8ee]/92 p-5 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3"><div className={`grid h-12 w-12 place-items-center rounded-2xl text-xl ${animalColors[animal]}`}>{animal.slice(0, 1)}</div><div><p className="font-serif text-2xl font-bold">{animal}</p><p className="text-xs text-[#75636e]">Your social spirit</p></div><Check className="ml-auto text-[#e84272]" size={22} /></div>
              <p className="mt-3 text-sm leading-6 text-[#6e5d68]">We’ll use this as a gentle starting point. You can shape your profile whenever you’re ready.</p>
              <button type="button" onClick={() => setLocation('/home')} data-testid="button-enter-pawsy" className="mt-4 w-full rounded-full bg-[#e84272] py-3.5 font-bold text-white shadow-lg transition hover:bg-[#d83766] active:scale-[.98]">Enter Pawsy <ArrowRight className="ml-1 inline" size={18} /></button>
              <button type="button" onClick={() => setOnboarding(false)} data-testid="button-back-welcome" className="mt-3 w-full text-sm font-semibold text-[#896f7d]">Maybe later</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HomePage() {
  const [, setLocation] = useLocation();
  const me = useGetMe();
  const plans = useListPlans();
  const health = useHealthCheck();
  return (
    <AppShell unread={0}>
      <section className="relative mb-7 overflow-hidden rounded-[1.8rem] border border-[#efd5cd] bg-[#f6d4c8] shadow-[0_15px_35px_rgba(108,64,50,.16)]">
        <div className="absolute inset-0 bg-cover bg-[center_27%] opacity-90" style={{ backgroundImage: `url(${homeWorld})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fff8f1]/95 via-[#fff8f1]/72 to-transparent" />
        <div className="relative min-h-[228px] p-6 md:p-8">
          <div className="flex items-center justify-between"><Logo /><div className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-[#a24963]" data-testid="status-health">{health.isLoading ? 'Warming the meadow…' : health.isError ? 'Offline meadow' : 'Meadow is open'}</div></div>
          <div className="mt-9 max-w-xs"><p className="text-sm font-semibold text-[#b04b66]">Good morning{me.data?.displayName ? `, ${me.data.displayName}` : ''}</p><h1 className="mt-1 font-serif text-3xl font-bold leading-tight text-[#30253d]">Who are you going to meet today?</h1><button type="button" onClick={() => setLocation('/discover')} data-testid="button-home-discover" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#e84272] px-4 py-2.5 text-sm font-bold text-white shadow-md">Browse nearby <ArrowRight size={16} /></button></div>
        </div>
      </section>
      <div className="grid grid-cols-3 gap-2.5 md:grid-cols-3 md:gap-4">
        {[{ label: 'People', icon: UsersRound, href: '/discover' }, { label: 'Plans', icon: CalendarDays, href: '/plans' }, { label: 'Messages', icon: MessageCircle, href: '/messages' }].map(({ label, icon: Icon, href }) => <Link key={label} href={href} data-testid={`link-quick-${label.toLowerCase()}`} className="group rounded-[1.35rem] border border-[#efdbd0] bg-[#fffaf6] px-3 py-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"><Icon className="mx-auto mb-2 text-[#e84272] transition group-hover:scale-110" size={24} /><span className="text-sm font-bold text-[#3c3444]">{label}</span><span className="mt-1 block text-[11px] text-[#8b7880]">Explore</span></Link>)}
      </div>
      <section className="mt-9">
        <SectionHeader icon={<Compass size={21} />} title="Plans in the meadow" subtitle="Real invitations from your community" action="See all" onAction={() => setLocation('/plans')} />
        {plans.isLoading ? <LoadingCards count={2} /> : plans.isError ? <QueryError retry={() => plans.refetch()} /> : plans.data?.length ? <div className="grid gap-3 sm:grid-cols-2">{plans.data.slice(0, 4).map((plan) => <PlanCard key={plan.id} plan={plan} compact />)}</div> : <EmptyState icon={<CalendarDays size={28} />} title="The path is quiet for now" body="When someone makes a plan, it will appear here. You can be the first one to leave an invitation." action="Make a plan" onAction={() => setLocation('/plans')} />}
      </section>
      {!me.isLoading && !me.data && <div className="mt-6"><Notice>Complete your Pawsy profile to help the right people find you.</Notice></div>}
    </AppShell>
  );
}

function ProfileCard({ profile, onLike, onPass, pending }: { profile: Profile; onLike: () => void; onPass: () => void; pending: boolean }) {
  return (
    <article className="overflow-hidden rounded-[1.65rem] border border-[#efdcd2] bg-[#fffaf6] shadow-[0_12px_28px_rgba(105,59,46,.11)] transition hover:-translate-y-1" data-testid={`card-profile-${profile.id}`}>
      <div className="relative h-56 bg-[#f4ddd5]">{profile.photoUrl ? <img src={profile.photoUrl} alt={`${profile.displayName} profile`} className="h-full w-full object-cover" data-testid={`img-profile-${profile.id}`} /> : <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_50%_35%,#ffe5e2,#e9d7e1)]"><Avatar name={profile.displayName} animal={profile.animal} size="lg" /></div>}<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#332638]/75 to-transparent px-4 pb-3 pt-14 text-white"><p className="font-serif text-2xl font-bold" data-testid={`text-profile-name-${profile.id}`}>{profile.displayName}{profile.age ? `, ${profile.age}` : ''}</p><p className="flex items-center gap-1 text-xs"><MapPin size={12} /> {profile.city}</p></div></div>
      <div className="p-4"><div className="flex items-center justify-between"><Pill tone="pink">{profile.animal}</Pill>{profile.socialEnergy && <span className="text-xs font-semibold text-[#8b7880]">{profile.socialEnergy}</span>}</div><p className="mt-3 line-clamp-2 text-sm leading-5 text-[#625463]">{profile.bio || 'This Pawsy friend is still writing their story.'}</p><div className="mt-3 flex flex-wrap gap-1.5">{profile.interests.slice(0, 3).map((interest) => <Pill key={interest}>{interest}</Pill>)}</div><div className="mt-4 flex justify-center gap-4">{pending ? <div className="h-12 animate-pulse rounded-full bg-[#f0ded8] px-8" /> : <><TinyAction label="Pass" testId={`button-pass-${profile.id}`} onClick={onPass}><X size={23} /></TinyAction><TinyAction label="Like" testId={`button-like-${profile.id}`} onClick={onLike}><Heart size={23} fill="currentColor" /></TinyAction></>}</div></div>
    </article>
  );
}

function DiscoverPage() {
  const [city, setCity] = useState('');
  const [animal, setAnimal] = useState('');
  const [interest, setInterest] = useState('');
  const [dismissed, setDismissed] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const params = useMemo(() => ({ ...(city ? { city } : {}), ...(animal ? { animal } : {}), ...(interest ? { interest } : {}) }), [animal, city, interest]);
  const profiles = useListDiscoverProfiles(params);
  const like = useLikeProfile();
  const pass = usePassProfile();
  const visible = (profiles.data ?? []).filter((profile) => !dismissed.includes(profile.id));
  const interact = (id: string, action: 'like' | 'pass') => {
    setDismissed((items) => [...items, id]);
    const mutation = action === 'like' ? like : pass;
    mutation.mutate({ profileId: id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListDiscoverProfilesQueryKey(params) }) });
  };
  return <AppShell title="Discover" subtitle="Find the people who make ordinary days better">
    <div className="mb-5 flex flex-wrap gap-2 rounded-[1.3rem] border border-[#ecd8cd] bg-[#fffaf5] p-3 shadow-sm"><div className="flex min-w-[135px] flex-1 items-center gap-2 rounded-xl bg-[#f8eee8] px-3"><SlidersHorizontal size={16} className="text-[#d83c69]" /><input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" data-testid="input-filter-city" className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-[#9b8991]" /></div><input value={animal} onChange={(e) => setAnimal(e.target.value)} placeholder="Animal" data-testid="input-filter-animal" className="min-w-[100px] flex-1 rounded-xl bg-[#f8eee8] px-3 py-2 text-sm outline-none placeholder:text-[#9b8991]" /><input value={interest} onChange={(e) => setInterest(e.target.value)} placeholder="Interest" data-testid="input-filter-interest" className="min-w-[100px] flex-1 rounded-xl bg-[#f8eee8] px-3 py-2 text-sm outline-none placeholder:text-[#9b8991]" /></div>
    {profiles.isLoading ? <LoadingCards count={4} /> : profiles.isError ? <QueryError retry={() => profiles.refetch()} /> : visible.length ? <div className="grid gap-5 md:grid-cols-2">{visible.map((profile) => <ProfileCard key={profile.id} profile={profile} pending={like.isPending || pass.isPending} onLike={() => interact(profile.id, 'like')} onPass={() => interact(profile.id, 'pass')} />)}</div> : <EmptyState icon={<Compass size={29} />} title="No new trails yet" body="There are no profiles matching these filters right now. Try widening your search or come back after the meadow grows." action={city || animal || interest ? 'Clear filters' : undefined} onAction={() => { setCity(''); setAnimal(''); setInterest(''); }} />}
  </AppShell>;
}

function PlanCard({ plan, compact = false }: { plan: Plan; compact?: boolean }) {
  const queryClient = useQueryClient();
  const join = useJoinPlan();
  return <article className={`rounded-[1.45rem] border border-[#ecd8cc] bg-[#fffaf6] p-4 shadow-sm ${compact ? '' : 'md:p-5'}`} data-testid={`card-plan-${plan.id}`}><div className="flex items-start justify-between gap-3"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#dcefe6] text-[#39765f]"><Coffee size={22} /></div><Pill tone={plan.joined ? 'green' : 'pink'}>{plan.joined ? 'Joined' : `${plan.participantCount}/${plan.capacity} spots`}</Pill></div><h3 className="mt-4 font-serif text-xl font-bold text-[#332b40]" data-testid={`text-plan-title-${plan.id}`}>{plan.title}</h3><p className="mt-1 text-sm font-semibold text-[#5e5360]">{plan.activity}</p><div className="mt-3 space-y-1 text-xs text-[#81727b]"><p className="flex items-center gap-2"><MapPin size={14} />{plan.city}</p><p className="flex items-center gap-2"><CalendarDays size={14} />{plan.dateLabel}</p><p className="flex items-center gap-2"><UserRound size={14} />Hosted by {plan.creatorName}</p></div>{!plan.joined && <button type="button" disabled={join.isPending} onClick={() => join.mutate({ planId: plan.id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListPlansQueryKey() }) })} data-testid={`button-join-plan-${plan.id}`} className="mt-4 w-full rounded-full bg-[#e84272] py-2.5 text-sm font-bold text-white transition hover:bg-[#d83766] disabled:opacity-50">{join.isPending ? 'Joining…' : 'Join this plan'}</button>}</article>;
}

function CreatePlan({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const create = useCreatePlan();
  const [form, setForm] = useState({ title: '', activity: '', city: '', dateLabel: '', capacity: '4' });
  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: React.FormEvent) => { event.preventDefault(); create.mutate({ data: { ...form, capacity: Number(form.capacity) } }, { onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListPlansQueryKey() }); onClose(); } }); };
  return <div className="fixed inset-0 z-50 grid place-items-end bg-[#30253d]/35 p-3 backdrop-blur-sm sm:place-items-center" data-testid="dialog-create-plan"><form onSubmit={submit} className="w-full max-w-lg rounded-[1.8rem] bg-[#fffaf6] p-6 shadow-2xl"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#c04569]">Leave an invitation</p><h2 className="mt-1 font-serif text-2xl font-bold">Create a plan</h2></div><IconButton label="Close" testId="button-close-create-plan" onClick={onClose}><X size={19} /></IconButton></div><div className="mt-5 space-y-3">{[['title','Plan title','e.g. Coffee and a slow walk'],['activity','Activity','e.g. Pottery, park walk, board games'],['city','City','Where will it happen?'],['dateLabel','Date and time','e.g. Saturday afternoon']].map(([key,label,placeholder]) => <label key={key} className="block text-sm font-semibold text-[#5f5160]">{label}<input required value={form[key as keyof typeof form]} onChange={(e) => update(key as keyof typeof form, e.target.value)} placeholder={placeholder} data-testid={`input-plan-${key}`} className="mt-1 w-full rounded-xl border border-[#ead7cd] bg-[#fffdf9] px-3 py-2.5 text-sm outline-none ring-[#e84272] focus:ring-2" /></label>)}<label className="block text-sm font-semibold text-[#5f5160]">Capacity<input required min="2" max="20" type="number" value={form.capacity} onChange={(e) => update('capacity', e.target.value)} data-testid="input-plan-capacity" className="mt-1 w-full rounded-xl border border-[#ead7cd] bg-[#fffdf9] px-3 py-2.5 text-sm outline-none ring-[#e84272] focus:ring-2" /></label></div>{create.isError && <p className="mt-3 text-sm text-[#b34f4f]">We couldn't leave that invitation. Try again.</p>}<button disabled={create.isPending} type="submit" data-testid="button-submit-plan" className="mt-5 w-full rounded-full bg-[#e84272] py-3.5 font-bold text-white disabled:opacity-60">{create.isPending ? 'Saving the plan…' : 'Publish plan'}</button></form></div>;
}

function PlansPage() {
  const [showCreate, setShowCreate] = useState(false);
  const plans = useListPlans();
  return <AppShell title="Plans" subtitle="A good day is easier to start together"><div className="mb-6 flex items-center justify-between rounded-[1.5rem] border border-[#ecd7c9] bg-[#e6f1e9] p-4"><div><p className="font-serif text-lg font-bold text-[#315d4f]">Make room for a maybe</p><p className="mt-1 text-sm text-[#547568]">Invite people into something simple.</p></div><button type="button" onClick={() => setShowCreate(true)} data-testid="button-create-plan" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#e84272] text-white shadow-md"><Plus size={23} /></button></div>{plans.isLoading ? <LoadingCards count={3} /> : plans.isError ? <QueryError retry={() => plans.refetch()} /> : plans.data?.length ? <div className="grid gap-4 md:grid-cols-2">{plans.data.map((plan) => <PlanCard key={plan.id} plan={plan} />)}</div> : <EmptyState icon={<CalendarDays size={28} />} title="No plans have been made yet" body="Start with something you already love doing. Your invitation will be the first footprint." action="Create the first plan" onAction={() => setShowCreate(true)} />}{showCreate && <CreatePlan onClose={() => setShowCreate(false)} />}</AppShell>;
}

function ConversationDetail({ conversationId, onBack }: { conversationId: string; onBack: () => void }) {
  const queryClient = useQueryClient();
  const conversation = useGetConversation(conversationId, { query: { queryKey: getGetConversationQueryKey(conversationId) } });
  const send = useSendMessage();
  const [body, setBody] = useState('');
  const sendMessage = (event: React.FormEvent) => { event.preventDefault(); if (!body.trim()) return; send.mutate({ conversationId, data: { body: body.trim() } }, { onSuccess: () => { setBody(''); queryClient.invalidateQueries({ queryKey: getGetConversationQueryKey(conversationId) }); queryClient.invalidateQueries({ queryKey: getListConversationsQueryKey() }); } }); };
  return <div className="fixed inset-0 z-40 flex min-h-[100dvh] flex-col bg-[#f8eee6]"><header className="flex items-center gap-3 border-b border-[#ecd8ce] bg-[#fffaf5] px-5 py-4"><IconButton label="Back to messages" testId="button-back-messages" onClick={onBack}><ArrowRight className="rotate-180" size={19} /></IconButton><Avatar name={conversation.data?.participantName} animal={conversation.data?.participantAnimal} size="sm" /><div><p className="font-bold text-[#332b40]">{conversation.data?.participantName ?? 'Conversation'}</p><p className="text-xs text-[#81717b]">{conversation.data?.title ?? 'Pawsy thread'}</p></div><MoreHorizontal className="ml-auto text-[#8c7c84]" size={21} /></header><div className="flex-1 overflow-y-auto px-5 py-6">{conversation.isLoading ? <LoadingCards count={3} /> : conversation.isError ? <QueryError retry={() => conversation.refetch()} /> : conversation.data?.messages.length ? <div className="mx-auto flex max-w-2xl flex-col gap-3">{conversation.data.messages.map((message) => <div key={message.id} className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-5 ${message.fromCurrentUser ? 'ml-auto rounded-br-sm bg-[#ffc4d3] text-[#573143]' : 'rounded-bl-sm bg-[#fffaf6] text-[#594b59]'}`} data-testid={`message-${message.id}`}><p>{message.body}</p><time className="mt-1 block text-[10px] opacity-60">{new Date(message.sentAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</time></div>)}</div> : <EmptyState icon={<MessageCircle size={27} />} title="This story hasn't started" body="Say hello when you are ready. Keep it simple." />}</div><form onSubmit={sendMessage} className="flex gap-2 border-t border-[#ecd8ce] bg-[#fffaf5] p-4 safe-bottom"><input value={body} onChange={(event) => setBody(event.target.value)} placeholder="Write a kind hello…" data-testid="input-message" className="min-w-0 flex-1 rounded-full border border-[#ead7cd] bg-[#f8eee6] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#e84272]" /><button type="submit" disabled={!body.trim() || send.isPending} data-testid="button-send-message" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#e84272] text-white disabled:opacity-50"><Send size={18} /></button></form></div>;
}

function MessagesPage() {
  const [selected, setSelected] = useState<string>();
  const [, setLocation] = useLocation();
  const conversations = useListConversations();
  if (selected) return <ConversationDetail conversationId={selected} onBack={() => setSelected(undefined)} />;
  return <AppShell title="Messages" subtitle="Conversations begin with curiosity"><div className="mb-5 flex items-center justify-between"><div className="flex gap-2"><Pill tone="pink">All</Pill><Pill>Unread</Pill></div><IconButton label="Compose a message" testId="button-compose-message"><Plus size={19} /></IconButton></div>{conversations.isLoading ? <LoadingCards count={4} /> : conversations.isError ? <QueryError retry={() => conversations.refetch()} /> : conversations.data?.length ? <div className="divide-y divide-[#ecdcd2] overflow-hidden rounded-[1.5rem] border border-[#ecdcd2] bg-[#fffaf6]">{conversations.data.map((conversation) => <button type="button" key={conversation.id} onClick={() => setSelected(conversation.id)} data-testid={`row-conversation-${conversation.id}`} className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-[#fff1ee]"><Avatar name={conversation.participantName} animal={conversation.participantAnimal} /><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><p className="font-bold text-[#332b40]">{conversation.participantName}</p>{conversation.unreadCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#e84272] px-1 text-[10px] text-white">{conversation.unreadCount}</span>}</div><p className="truncate text-sm text-[#81717b]">{conversation.lastMessage}</p></div><ArrowRight size={16} className="text-[#ac9aa0]" /></button>)}</div> : <div className="overflow-hidden rounded-[1.6rem] border border-[#ecd8cd] bg-[#fffaf6]"><div className="h-28 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${messagesWorld})` }} /><div className="p-4"><EmptyState icon={<MessageCircle size={27} />} title="Your inbox is a quiet meadow" body="When a new connection becomes a conversation, it will show up here. No pressure, no noisy notifications." action="Discover people" onAction={() => setLocation('/discover')} /></div></div>}</AppShell>;
}

function CheckoutNotice({ status, message }: { status?: string; message?: string }) {
  return <div className="mt-5 rounded-2xl border border-[#edd8b5] bg-[#fff3d6] p-4 text-sm text-[#75591f]" data-testid="status-checkout"><div className="flex items-start gap-3"><LockKeyhole size={19} className="mt-0.5 shrink-0" /><div><p className="font-bold">{status === 'ready' ? 'Checkout is ready' : 'Checkout required'}</p><p className="mt-1">{message ?? 'A secure payment provider still needs to be connected before any purchase can complete.'}</p></div></div></div>;
}

function WalletPage() {
  const queryClient = useQueryClient();
  const wallet = useGetWallet();
  const subscription = useGetSubscription();
  const creditCheckout = useStartCreditCheckout();
  const subscriptionCheckout = useStartSubscriptionCheckout();
  const [checkout, setCheckout] = useState<{ status?: string; message?: string }>();
  const packages = wallet.data?.packages ?? [];
  return <AppShell title="Paw Store" subtitle="Little boosts for your Pawsy journey"><section className="relative overflow-hidden rounded-[1.8rem] bg-[#49374f] p-6 text-[#fff8f1] shadow-xl"><div className="absolute -right-5 -top-8 h-36 w-36 rounded-full bg-[#ed6c8c]/30 blur-2xl" /><div className="relative flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#f9c8a5]">Your paw credits</p><p className="mt-2 font-serif text-5xl font-bold" data-testid="text-wallet-balance">{wallet.data?.balance ?? '—'}</p><p className="mt-1 text-sm text-[#e7cbd0]">{wallet.isError ? 'Wallet data is not available yet' : 'Available credits'}</p></div><WalletCards className="text-[#ffc9d7]" size={34} /></div></section><section className="mt-8"><SectionHeader icon={<Store size={21} />} title="Credit bundles" subtitle="Use them when you want a little more room to be seen" />{wallet.isLoading ? <LoadingCards count={2} /> : wallet.isError ? <Notice tone="gold">Wallet packages will appear once the store is connected to your account.</Notice> : packages.length ? <div className="grid gap-3 sm:grid-cols-2">{packages.map((item) => <div key={item.id} className="rounded-[1.4rem] border border-[#ecd8cc] bg-[#fffaf6] p-4 shadow-sm" data-testid={`card-credit-package-${item.id}`}><div className="flex items-center justify-between"><PawPrint className="text-[#e84272]" size={24} /><Pill tone="pink">{item.label}</Pill></div><p className="mt-4 font-serif text-2xl font-bold">{item.credits} credits</p><p className="mt-1 text-sm text-[#81717b]">{item.currency} {item.price.toFixed(2)}</p><button type="button" disabled={creditCheckout.isPending} onClick={() => creditCheckout.mutate({ data: { packageId: item.id } }, { onSuccess: (result) => { setCheckout(result); queryClient.invalidateQueries({ queryKey: getGetWalletQueryKey() }); } })} data-testid={`button-buy-credits-${item.id}`} className="mt-4 w-full rounded-full bg-[#e84272] py-2.5 text-sm font-bold text-white disabled:opacity-50">{creditCheckout.isPending ? 'Preparing checkout…' : 'Continue to checkout'}</button></div>)}</div> : <EmptyState icon={<WalletCards size={28} />} title="The store is being stocked" body="Credit packages will appear here when the Paw Store is ready." />}</section><section className="mt-8 rounded-[1.6rem] border border-[#ecd8cc] bg-[#fffaf6] p-5 shadow-sm"><div className="flex items-start gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#ffe3a9] text-[#7c5a16]"><Sparkles size={22} /></div><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#be7b16]">Pawsy Plus</p><h2 className="mt-1 font-serif text-2xl font-bold text-[#332b40]">{subscription.data?.planName ?? 'More room for your story'}</h2><p className="mt-2 text-sm leading-6 text-[#81717b]">{subscription.data?.status === 'active' ? 'Your Plus membership is active.' : 'A gentle subscription for people who want to discover a little deeper.'}</p></div></div>{subscription.data?.status === 'active' ? <Pill tone="green">Active membership</Pill> : <button type="button" disabled={subscriptionCheckout.isPending} onClick={() => subscriptionCheckout.mutate({ data: { plan: 'pawsy-plus' } }, { onSuccess: (result) => { setCheckout(result); queryClient.invalidateQueries({ queryKey: getGetSubscriptionQueryKey() }); } })} data-testid="button-start-subscription" className="mt-5 w-full rounded-full bg-[#49374f] py-3 font-bold text-white disabled:opacity-50">{subscriptionCheckout.isPending ? 'Preparing checkout…' : 'Explore Pawsy Plus'}</button>}{subscription.isError && <p className="mt-3 text-xs text-[#8c7375]">Membership status is not available yet.</p>}</section>{checkout && <CheckoutNotice status={checkout.status} message={checkout.message} />}</AppShell>;
}

function ProfilePage() {
  const queryClient = useQueryClient();
  const me = useGetMe();
  const update = useUpdateMe();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<Profile>>({});
  const profile = me.data;
  const beginEdit = () => { setForm(profile ?? {}); setEditing(true); };
  const save = (event: React.FormEvent) => { event.preventDefault(); update.mutate({ data: { displayName: form.displayName ?? '', animal: form.animal, city: form.city, bio: form.bio, socialEnergy: form.socialEnergy ?? undefined, interests: form.interests ?? [], lookingFor: form.lookingFor ?? [] } }, { onSuccess: () => { queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() }); setEditing(false); } }); };
  if (me.isLoading) return <AppShell title="Profile"><LoadingCards count={2} /></AppShell>;
  if (me.isError || !profile) return <AppShell title="Profile"><EmptyState icon={<UserRound size={28} />} title="Your profile is still a blank page" body="Once your Pawsy profile is available, you can edit the details that help people find your kind of energy." action="Try again" onAction={() => me.refetch()} /></AppShell>;
  return <AppShell title="Your profile" subtitle="The little details help good people find you"><section className="relative overflow-hidden rounded-[1.7rem] border border-[#ecd8cd] bg-[#49374f] p-6 text-white shadow-xl"><div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${profileWorld})` }} /><div className="relative flex items-center gap-4"><Avatar name={profile.displayName} animal={profile.animal} photoUrl={profile.photoUrl} size="lg" /><div><p className="font-serif text-3xl font-bold" data-testid="text-profile-display-name">{profile.displayName}</p><p className="mt-1 flex items-center gap-1 text-sm text-[#f5d8dc]"><MapPin size={14} />{profile.city}</p><Pill tone="pink">{profile.animal}</Pill></div><IconButton label="Edit profile" testId="button-edit-profile" onClick={beginEdit} className="ml-auto border-white/20 bg-white/15 text-white" ><MoreHorizontal size={19} /></IconButton></div></section><div className="mt-5 grid gap-4 md:grid-cols-2"><section className="rounded-[1.4rem] border border-[#ecd8cd] bg-[#fffaf6] p-5"><SectionHeader title="About me" icon={<BookOpen size={19} />} /><p className="text-sm leading-6 text-[#625463]" data-testid="text-profile-bio">{profile.bio || 'Your story is waiting for a first sentence.'}</p></section><section className="rounded-[1.4rem] border border-[#ecd8cd] bg-[#fffaf6] p-5"><SectionHeader title="My energy" icon={<Sparkles size={19} />} /><p className="text-sm leading-6 text-[#625463]" data-testid="text-profile-energy">{profile.socialEnergy || 'Tell people how you like to spend your time.'}</p></section></div><section className="mt-4 rounded-[1.4rem] border border-[#ecd8cd] bg-[#fffaf6] p-5"><SectionHeader title="Interests" icon={<Leaf size={19} />} />{profile.interests.length ? <div className="flex flex-wrap gap-2">{profile.interests.map((item) => <Pill key={item}>{item}</Pill>)}</div> : <p className="text-sm text-[#81717b]">No interests added yet.</p>}</section>{editing && <div className="fixed inset-0 z-50 grid place-items-end bg-[#30253d]/35 p-3 backdrop-blur-sm sm:place-items-center"><form onSubmit={save} className="w-full max-w-lg rounded-[1.8rem] bg-[#fffaf6] p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="font-serif text-2xl font-bold">Edit your story</h2><IconButton label="Close" testId="button-close-edit-profile" onClick={() => setEditing(false)}><X size={19} /></IconButton></div><div className="mt-5 space-y-3"><label className="block text-sm font-semibold">Name<input value={form.displayName ?? ''} onChange={(e) => setForm({ ...form, displayName: e.target.value })} data-testid="input-profile-name" className="mt-1 w-full rounded-xl border border-[#ead7cd] bg-[#fffdf9] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#e84272]" /></label><label className="block text-sm font-semibold">Animal<input value={form.animal ?? ''} onChange={(e) => setForm({ ...form, animal: e.target.value })} data-testid="input-profile-animal" className="mt-1 w-full rounded-xl border border-[#ead7cd] bg-[#fffdf9] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#e84272]" /></label><label className="block text-sm font-semibold">City<input value={form.city ?? ''} onChange={(e) => setForm({ ...form, city: e.target.value })} data-testid="input-profile-city" className="mt-1 w-full rounded-xl border border-[#ead7cd] bg-[#fffdf9] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#e84272]" /></label><label className="block text-sm font-semibold">Bio<textarea value={form.bio ?? ''} onChange={(e) => setForm({ ...form, bio: e.target.value })} data-testid="input-profile-bio" rows={3} className="mt-1 w-full resize-none rounded-xl border border-[#ead7cd] bg-[#fffdf9] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#e84272]" /></label><label className="block text-sm font-semibold">Social energy<input value={form.socialEnergy ?? ''} onChange={(e) => setForm({ ...form, socialEnergy: e.target.value })} data-testid="input-profile-energy" placeholder="Quiet mornings, lively evenings…" className="mt-1 w-full rounded-xl border border-[#ead7cd] bg-[#fffdf9] px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#e84272]" /></label></div>{update.isError && <p className="mt-3 text-sm text-[#b34f4f]">Your story could not be saved.</p>}<button type="submit" disabled={update.isPending} data-testid="button-save-profile" className="mt-5 w-full rounded-full bg-[#e84272] py-3.5 font-bold text-white disabled:opacity-50">{update.isPending ? 'Saving…' : 'Save changes'}</button></form></div>}</AppShell>;
}

export { WelcomePage, HomePage, DiscoverPage, PlansPage, MessagesPage, WalletPage, ProfilePage };