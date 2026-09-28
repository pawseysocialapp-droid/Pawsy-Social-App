import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import {
  CreatePlanBody,
  GetConversationParams,
  JoinPlanParams,
  LikeProfileParams,
  ListDiscoverProfilesQueryParams,
  PassProfileParams,
  SendMessageBody,
  SendMessageParams,
  StartCreditCheckoutBody,
  StartSubscriptionCheckoutBody,
  UpdateMeBody,
} from "@workspace/api-zod";
import { db } from "@workspace/db";
import { pawsyStateTable } from "@workspace/db/schema";

type Profile = {
  id: string;
  displayName: string;
  age: number | null;
  animal: string;
  personality: string;
  city: string;
  interests: string[];
  lookingFor: string[];
  bio: string;
  socialEnergy: string | null;
  photoUrl: string | null;
  isCurrentUser: boolean;
};

type Plan = {
  id: string;
  title: string;
  activity: string;
  city: string;
  dateLabel: string;
  capacity: number;
  participantCount: number;
  creatorName: string;
  joined: boolean;
};

type Message = {
  id: string;
  body: string;
  sentAt: string;
  fromCurrentUser: boolean;
};

type Conversation = {
  id: string;
  title: string;
  participantName: string;
  participantAnimal: string;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
};

type PawsyState = {
  profile: Profile;
  discover: Profile[];
  plans: Plan[];
  conversations: Conversation[];
  wallet: {
    balance: number;
    packages: Array<{
      id: string;
      credits: number;
      price: number;
      currency: string;
      label: string;
    }>;
  };
  subscription: {
    status: string;
    planName: string;
    monthlyPrice: number;
    currency: string;
    nextBillingDate: string | null;
  };
};

const stateId = "preview-user";

const defaultState: PawsyState = {
  profile: {
    id: stateId,
    displayName: "Your name",
    age: null,
    animal: "Bunny",
    personality: "Cozy, curious and soft-hearted",
    city: "",
    interests: [],
    lookingFor: [],
    bio: "",
    socialEnergy: null,
    photoUrl: null,
    isCurrentUser: true,
  },
  discover: [],
  plans: [],
  conversations: [],
  wallet: {
    balance: 0,
    packages: [
      { id: "starter", credits: 100, price: 1.99, currency: "USD", label: "A little hello" },
      { id: "bundle", credits: 500, price: 6.99, currency: "USD", label: "Make it cozy" },
      { id: "big-bundle", credits: 1200, price: 14.99, currency: "USD", label: "Bring the whole burrow" },
    ],
  },
  subscription: {
    status: "inactive",
    planName: "Pawsy Plus",
    monthlyPrice: 7.99,
    currency: "USD",
    nextBillingDate: null,
  },
};

async function loadState(): Promise<PawsyState> {
  const rows = await db
    .select()
    .from(pawsyStateTable)
    .where(eq(pawsyStateTable.id, stateId))
    .limit(1);
  if (rows[0]) return rows[0].state as PawsyState;
  await db.insert(pawsyStateTable).values({ id: stateId, state: defaultState });
  return defaultState;
}

async function saveState(state: PawsyState) {
  await db
    .update(pawsyStateTable)
    .set({ state, updatedAt: new Date() })
    .where(eq(pawsyStateTable.id, stateId));
  return state;
}

const router: IRouter = Router();

router.get("/me", async (_req, res) => {
  res.json((await loadState()).profile);
});

router.patch("/me", async (req, res) => {
  const body = UpdateMeBody.parse(req.body);
  const state = await loadState();
  state.profile = {
    ...state.profile,
    ...body,
    personality: body.animal
      ? state.profile.personality
      : state.profile.personality,
  };
  await saveState(state);
  res.json(state.profile);
});

router.get("/discover", async (req, res) => {
  const query = ListDiscoverProfilesQueryParams.parse(req.query);
  const state = await loadState();
  const profiles = state.discover.filter((profile) => {
    if (query.city && profile.city.toLowerCase() !== query.city.toLowerCase()) return false;
    if (query.animal && profile.animal.toLowerCase() !== query.animal.toLowerCase()) return false;
    if (query.interest && !profile.interests.includes(query.interest)) return false;
    return true;
  });
  res.json(profiles);
});

router.post("/discover/:profileId/like", async (req, res) => {
  const { profileId } = LikeProfileParams.parse(req.params);
  const state = await loadState();
  const exists = state.discover.some((profile) => profile.id === profileId);
  res.json({ status: exists ? "liked" : "not_found", conversationId: null });
});

router.post("/discover/:profileId/pass", async (req, res) => {
  const { profileId } = PassProfileParams.parse(req.params);
  const state = await loadState();
  const exists = state.discover.some((profile) => profile.id === profileId);
  res.json({ status: exists ? "passed" : "not_found", conversationId: null });
});

router.get("/plans", async (_req, res) => {
  res.json((await loadState()).plans);
});

router.post("/plans", async (req, res) => {
  const body = CreatePlanBody.parse(req.body);
  const state = await loadState();
  const plan: Plan = {
    id: `plan-${Date.now()}`,
    ...body,
    participantCount: 1,
    creatorName: state.profile.displayName,
    joined: true,
  };
  state.plans = [plan, ...state.plans];
  await saveState(state);
  res.status(201).json(plan);
});

router.post("/plans/:planId/join", async (req, res) => {
  const { planId } = JoinPlanParams.parse(req.params);
  const state = await loadState();
  const plan = state.plans.find((item) => item.id === planId);
  if (!plan) {
    res.status(404).json({ error: "Plan not found" });
    return;
  }
  if (!plan.joined && plan.participantCount < plan.capacity) {
    plan.joined = true;
    plan.participantCount += 1;
    await saveState(state);
  }
  res.json(plan);
});

router.get("/messages", async (_req, res) => {
  res.json((await loadState()).conversations);
});

router.get("/messages/:conversationId", async (req, res) => {
  const { conversationId } = GetConversationParams.parse(req.params);
  const conversation = (await loadState()).conversations.find((item) => item.id === conversationId);
  if (!conversation) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  res.json(conversation);
});

router.post("/messages/:conversationId", async (req, res) => {
  const { conversationId } = SendMessageParams.parse(req.params);
  const body = SendMessageBody.parse(req.body);
  const state = await loadState();
  const conversation = state.conversations.find((item) => item.id === conversationId);
  if (!conversation) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  const message: Message = {
    id: `message-${Date.now()}`,
    body: body.body,
    sentAt: new Date().toISOString(),
    fromCurrentUser: true,
  };
  conversation.messages.push(message);
  conversation.lastMessage = body.body;
  await saveState(state);
  res.status(201).json(message);
});

router.get("/wallet", async (_req, res) => {
  res.json((await loadState()).wallet);
});

router.post("/wallet/checkout", async (req, res) => {
  StartCreditCheckoutBody.parse(req.body);
  res.json({
    status: "provider_required",
    message: "Connect a payment provider to open secure Paw Credits checkout.",
    checkoutUrl: null,
  });
});

router.get("/subscriptions", async (_req, res) => {
  res.json((await loadState()).subscription);
});

router.post("/subscriptions/checkout", async (req, res) => {
  StartSubscriptionCheckoutBody.parse(req.body);
  res.json({
    status: "provider_required",
    message: "Connect a payment provider to start Pawsy Plus.",
    checkoutUrl: null,
  });
});

export default router;