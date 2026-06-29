export const siteMeta = {
  title: "Research Route",
  description: "A personal knowledge site built around LLM Agents, Reinforcement Learning, and Recommendation Systems."
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Directions", href: "/notes" },
  { label: "Archive", href: "/archive" }
];

export const directions = [
  {
    title: "LLM Agents",
    slug: "agent",
    href: "/notes/agent",
    eyebrow: "Direction 01",
    summary: "Tool use, multi-step environments, agent architecture, planning, and execution feedback.",
    count: "3 core resources",
    tags: ["Tool Use", "Planner", "Environment"]
  },
  {
    title: "Reinforcement Learning",
    slug: "reinforcement-learning",
    href: "/notes/reinforcement-learning",
    eyebrow: "Direction 02",
    summary: "Math foundations, PPO, DPO, GRPO, RLVR, RLHF, and post-training engineering.",
    count: "10+ resources",
    tags: ["PPO", "DPO", "GRPO", "RLHF"]
  },
  {
    title: "Recommendation Systems",
    slug: "recommendation",
    href: "/notes/recommendation",
    eyebrow: "Direction 03",
    summary: "Reading notes, interview review, and practice material for recommendation systems.",
    count: "10 resources",
    tags: ["Recall", "Ranking", "Multi-task"]
  }
];

export const resources = [
  {
    title: "LLM Powered Autonomous Agents",
    type: "HTML",
    direction: "LLM Agents",
    href: "/archive/html/llm-powered-autonomous-agents.html",
    summary: "An entry point for agent structure, memory, planning, and reflection.",
    updated: "2026-06-07"
  },
  {
    title: "Agent RLVR to Tool-use Agent",
    type: "HTML",
    direction: "LLM Agents",
    href: "/archive/html/tool-use-agent-post-training.html",
    summary: "From function picking to multi-step tool-use reinforcement learning.",
    updated: "2026-06-07"
  },
  {
    title: "Claude Tooling Architecture",
    type: "HTML",
    direction: "LLM Agents",
    href: "/archive/html/claude-tooling-architecture.html",
    summary: "A source-level view of the execution layer behind tool-using systems.",
    updated: "2026-06-07"
  },
  {
    title: "PyTorch LLM Post-Training Primer",
    type: "HTML",
    direction: "Reinforcement Learning",
    href: "/archive/html/pytorch-llm-post-training.html",
    summary: "A broad post-training entry point that works well as the RL top-level index.",
    updated: "2026-06-07"
  },
  {
    title: "Fireworks RLVR / GRPO Reading",
    type: "HTML",
    direction: "Reinforcement Learning",
    href: "/archive/html/fireworks-rlvr.html",
    summary: "A focused reading on verifiable reward and GRPO.",
    updated: "2026-06-07"
  },
  {
    title: "DeepSeek-R1 Technical Report",
    type: "HTML",
    direction: "Reinforcement Learning",
    href: "/archive/html/deepseek-r1-report.html",
    summary: "The reasoning post-training route from R1-Zero to R1.",
    updated: "2026-06-07"
  },
  {
    title: "TRL / OpenRLHF / verl Engineering Route",
    type: "HTML",
    direction: "Reinforcement Learning",
    href: "/archive/html/post-training-engineering.html",
    summary: "Connect trainers, rollouts, reward wiring, and framework differences.",
    updated: "2026-06-07"
  },
  {
    title: "RL Stage 1: Math Derivation",
    type: "HTML",
    direction: "Reinforcement Learning",
    href: "/archive/html/rl-stage-1-math-derivation.html",
    summary: "Foundational math setup and reinforcement learning intuition.",
    updated: "2026-06-13"
  },
  {
    title: "RL Stage 2: Policy Gradient / PPO",
    type: "HTML",
    direction: "Reinforcement Learning",
    href: "/archive/html/rl-stage-2-policy-gradient-ppo.html",
    summary: "Policy Gradient, Actor-Critic, GAE, and PPO.",
    updated: "2026-06-13"
  },
  {
    title: "RL Stage 3: LLM Post-training / RLHF",
    type: "HTML",
    direction: "Reinforcement Learning",
    href: "/archive/html/rl-stage-3-llm-post-training-rlhf.html",
    summary: "Place SFT, reward models, and PPO back into LLM post-training.",
    updated: "2026-06-13"
  },
  {
    title: "RL Stage 4: DPO",
    type: "HTML",
    direction: "Reinforcement Learning",
    href: "/archive/html/rl-stage-4-dpo-derivation.html",
    summary: "Direct preference optimization and its mathematical intuition.",
    updated: "2026-06-13"
  },
  {
    title: "RL Stage 5: GRPO / RLVR",
    type: "HTML",
    direction: "Reinforcement Learning",
    href: "/archive/html/rl-stage-5-grpo-rlvr.html",
    summary: "Core ideas around group advantage and verifiable reward.",
    updated: "2026-06-13"
  },
  {
    title: "RL Stage 6: Agent RL / Tool-use RL",
    type: "HTML",
    direction: "Reinforcement Learning",
    href: "/archive/html/rl-stage-6-agent-rl-tool-use.html",
    summary: "Multi-step environments, tool calls, and state feedback.",
    updated: "2026-06-13"
  },
  {
    title: "Agent Post-training Source Notes",
    type: "Markdown",
    direction: "Reinforcement Learning",
    href: "/archive/markdown/agent-post-training-roadmap.md",
    summary: "Raw Markdown source that preserves the full study context.",
    updated: "2026-06-07"
  },
  {
    title: "New Chat Notes",
    type: "Markdown",
    direction: "Reinforcement Learning",
    href: "/archive/markdown/new-chat.md",
    summary: "A quick draft for next-step study directions.",
    updated: "2026-06-07"
  },
  {
    title: "CodeTop顺序",
    type: "Markdown",
    direction: "Recommendation Systems",
    href: "/archive/markdown/CodeTop顺序.md",
    summary: "A structured CodeTop practice order for recommendation interview prep.",
    updated: "2026-06-29"
  },
  {
    title: "刷题",
    type: "Markdown",
    direction: "Recommendation Systems",
    href: "/archive/markdown/刷题.md",
    summary: "Expanded recommendation practice notes and problem-solving drills.",
    updated: "2026-06-29"
  }
];
