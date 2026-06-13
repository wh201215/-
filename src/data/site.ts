export const siteMeta = {
  title: "Jada Knowledge Garden",
  description:
    "A personal knowledge site for post-training, agents, paper reading, and experiment logs."
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Notes", href: "/notes" },
  { label: "Archive", href: "/archive" }
];

export const featuredTracks = [
  {
    title: "Post-training Roadmap",
    summary: "Turn RLHF, DPO, GRPO, RLVR, and agent post-training into one continuous route.",
    href: "/notes/agent-roadmap",
    accent: "sun",
    stats: "Concepts to engineering"
  },
  {
    title: "RL Stage Map",
    summary: "Collect Stage 1 to Stage 6 into one reading entry for math, PPO, DPO, GRPO, and tool-use RL.",
    href: "/notes/rl-stage-map",
    accent: "sea",
    stats: "6 stage pages"
  },
  {
    title: "Tool-use Agent RL",
    summary: "Focus on multi-step environments, tool calls, state feedback, and reward design.",
    href: "/notes/tool-use-agent",
    accent: "ink",
    stats: "Guide plus source links"
  }
];

export const notes = [
  {
    title: "Agent Post-training Roadmap",
    href: "/notes/agent-roadmap",
    date: "2026-06-13",
    summary: "Turn the current study path into a durable index instead of a pile of isolated notes.",
    tags: ["RLHF", "DPO", "GRPO", "Agent"]
  },
  {
    title: "RL Stage Map",
    href: "/notes/rl-stage-map",
    date: "2026-06-13",
    summary: "Collect the Stage 1-6 HTML resources into one place for phone and desktop reading.",
    tags: ["Math", "PPO", "DPO", "RLVR"]
  },
  {
    title: "Tool-use Agent Reading List",
    href: "/notes/tool-use-agent",
    date: "2026-06-13",
    summary: "Keep tool-use agent material in a focused page for continued reading and expansion.",
    tags: ["Tool Use", "Environment", "Reward"]
  }
];

export const resources = [
  {
    title: "PyTorch LLM Post-Training Primer",
    type: "HTML",
    category: "Paper Reading",
    href: "/archive/html/pytorch-llm-post-training.html",
    summary: "A broad post-training entry point that works well as a top-level index.",
    updated: "2026-06-07"
  },
  {
    title: "Fireworks RLVR / GRPO Reading",
    type: "HTML",
    category: "Paper Reading",
    href: "/archive/html/fireworks-rlvr.html",
    summary: "A focused reading on verifiable reward and GRPO.",
    updated: "2026-06-07"
  },
  {
    title: "DeepSeek-R1 Technical Report",
    type: "HTML",
    category: "Paper Reading",
    href: "/archive/html/deepseek-r1-report.html",
    summary: "The reasoning post-training route from R1-Zero to R1.",
    updated: "2026-06-07"
  },
  {
    title: "LLM Powered Autonomous Agents",
    type: "HTML",
    category: "Agent Systems",
    href: "/archive/html/llm-powered-autonomous-agents.html",
    summary: "An entry point for agent structure and common capability modules.",
    updated: "2026-06-07"
  },
  {
    title: "Agent RLVR to Tool-use Agent",
    type: "HTML",
    category: "Agent Systems",
    href: "/archive/html/tool-use-agent-post-training.html",
    summary: "From function picking to multi-step tool-use reinforcement learning.",
    updated: "2026-06-07"
  },
  {
    title: "TRL / OpenRLHF / verl Engineering Route",
    type: "HTML",
    category: "Engineering",
    href: "/archive/html/post-training-engineering.html",
    summary: "Connect trainers, configs, rollouts, and reward wiring.",
    updated: "2026-06-07"
  },
  {
    title: "Claude Tooling Architecture",
    type: "HTML",
    category: "Engineering",
    href: "/archive/html/claude-tooling-architecture.html",
    summary: "A source-oriented breakdown of tooling internals for engineering reference.",
    updated: "2026-06-07"
  },
  {
    title: "RL Stage 1: Math Derivation",
    type: "HTML",
    category: "RL Stage Series",
    href: "/archive/html/rl-stage-1-math-derivation.html",
    summary: "Foundational math setup and reinforcement learning intuition.",
    updated: "2026-06-13"
  },
  {
    title: "RL Stage 2: Policy Gradient / PPO",
    type: "HTML",
    category: "RL Stage Series",
    href: "/archive/html/rl-stage-2-policy-gradient-ppo.html",
    summary: "Policy Gradient, Actor-Critic, GAE, and PPO.",
    updated: "2026-06-13"
  },
  {
    title: "RL Stage 3: LLM Post-training / RLHF",
    type: "HTML",
    category: "RL Stage Series",
    href: "/archive/html/rl-stage-3-llm-post-training-rlhf.html",
    summary: "Place SFT, reward modeling, and PPO back into LLM post-training.",
    updated: "2026-06-13"
  },
  {
    title: "RL Stage 4: DPO",
    type: "HTML",
    category: "RL Stage Series",
    href: "/archive/html/rl-stage-4-dpo-derivation.html",
    summary: "The objective and derivation ideas behind direct preference optimization.",
    updated: "2026-06-13"
  },
  {
    title: "RL Stage 5: GRPO / RLVR",
    type: "HTML",
    category: "RL Stage Series",
    href: "/archive/html/rl-stage-5-grpo-rlvr.html",
    summary: "Core ideas around group advantage and verifiable reward.",
    updated: "2026-06-13"
  },
  {
    title: "RL Stage 6: Agent RL / Tool-use RL",
    type: "HTML",
    category: "RL Stage Series",
    href: "/archive/html/rl-stage-6-agent-rl-tool-use.html",
    summary: "Multi-step environments, tool calls, and state feedback.",
    updated: "2026-06-13"
  },
  {
    title: "Agent Post-training Source Notes",
    type: "Markdown",
    category: "Source Files",
    href: "/archive/markdown/agent-post-training-roadmap.md",
    summary: "Raw Markdown source that preserves the original context.",
    updated: "2026-06-07"
  },
  {
    title: "New Chat Notes",
    type: "Markdown",
    category: "Source Files",
    href: "/archive/markdown/new-chat.md",
    summary: "A quick note about next-step study directions.",
    updated: "2026-06-07"
  }
];
