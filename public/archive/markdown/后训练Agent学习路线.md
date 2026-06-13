> From: https://chatgpt.com/c/6a252117-63e4-83ea-bb2c-31d693ce6802

# you asked

message time: 2026-06-07 15:44:13

你好 我现在 想学习 后训练agent 有一点基础 你可以推荐一些好的博客或者文章给一个学习路线吗

---

# chatgpt response

我会把路线按“先补后训练方法，再进入 Agent 训练与评测，最后做小项目复现”来组织，并尽量挑博客、论文和开源资料混合的材料。

可以。你现在“有一点基础”，我建议不要一开始就钻最前沿论文，而是按 **后训练 → Agent 架构 → Agent 评测 → Agent 后训练/强化学习** 这条线学。

## 一、先明确你要学的“后训练 Agent”是什么

我建议把它理解成两层：

第一层是 **LLM 后训练**：SFT、偏好优化、RLHF、DPO、PPO、GRPO、RLVR，让模型更会遵循指令、推理、对齐偏好。Hugging Face TRL 现在就直接支持 SFT、DPO、GRPO 等后训练方法，是入门实践的好工具。([GitHub](https://github.com/huggingface/trl?utm_source=chatgpt.com))

第二层是 **Agent 后训练**：不仅训练“回答”，而是训练模型在环境中 **规划、调用工具、观察反馈、修正行动、完成多步任务**。Agent-R1 这类工作就是把 LLM Agent 放进交互环境，用强化学习做端到端训练。([arXiv](https://arxiv.org/abs/2511.14460?utm_source=chatgpt.com))

---

## 二、学习路线

### 第 1 阶段：先补“后训练”主线

先看这些关键词：

**SFT → Reward Model → RLHF/PPO → DPO → GRPO/RLVR**

推荐阅读顺序：

1. **PyTorch：A Primer on LLM Post-Training**  
   这篇适合入门，能帮你建立“预训练之后到底还要训练什么”的整体框架。([PyTorch](https://pytorch.org/blog/a-primer-on-llm-post-training/?utm_source=chatgpt.com))

2. **Hugging Face TRL 文档**  
   重点看 DPO Trainer、GRPO Trainer、SFT Trainer。它不是纯理论，而是直接能跑代码。TRL 官方说明 DPO 是用偏好数据拉大 preferred / dispreferred 输出之间的概率差，不需要显式训练 reward model。([Hugging Face](https://huggingface.co/docs/trl/en/dpo_trainer?utm_source=chatgpt.com))

3. **OpenAI Spinning Up：RL 基础**  
   你不用全学强化学习，但至少要懂 policy、reward、advantage、PPO、KL penalty。OpenAI Spinning Up 是经典入门材料，讲 RL 的核心概念和算法。([Spinning Up](https://spinningup.openai.com/en/latest/?utm_source=chatgpt.com))

4. **OpenAI：Learning to Reason with LLMs**  
   这篇可以帮助你理解为什么现在 reasoning model 很依赖强化学习式后训练，以及 train-time compute / test-time compute 的区别。([OpenAI](https://openai.com/index/learning-to-reason-with-llms/?utm_source=chatgpt.com))

5. **DeepSeek-R1 技术报告 / 论文**  
   这是 GRPO、RLVR、reasoning post-training 的标志性材料。DeepSeek-R1 论文明确用 DeepSeek-V3-Base 作为 base model，并用 GRPO 提升推理能力。([arXiv](https://arxiv.org/html/2501.12948v1?utm_source=chatgpt.com))

这一阶段目标：你能说清楚 **SFT、DPO、PPO、GRPO 的区别**，知道什么是 reward、什么是 preference data、什么是 verifiable reward。

---

### 第 2 阶段：再学 Agent 基础架构

Agent 不是“套个框架”就行，核心是：

**任务分解、工具调用、记忆、反思、环境反馈、评测闭环。**

推荐阅读：

1. **Anthropic：Building Effective Agents**  
   这篇很重要。Anthropic 的经验是：很多成功 Agent 不是靠复杂框架，而是靠简单、可组合的模式。它会帮你避免一上来就陷入 LangChain / AutoGen / CrewAI 这类框架迷雾。([Anthropic](https://www.anthropic.com/research/building-effective-agents?utm_source=chatgpt.com))

2. **LLM Agent Survey / Agent Evaluation Survey**  
   看综述时重点抓四件事：planning、tool use、memory、reflection。2025 年的 Agent 评测综述把 Agent 能力拆成规划、工具使用、记忆、多 Agent 协作等维度，适合建立研究框架。([arXiv](https://arxiv.org/html/2507.21504v1?utm_source=chatgpt.com))

3. **Memory for Autonomous LLM Agents**  
   如果你想做长期任务 Agent，这篇值得看。它把 Agent memory 拆成 write-manage-read 循环，并讨论压缩、RAG 存储、反思式记忆、层级上下文等机制。([arXiv](https://arxiv.org/abs/2603.07670?utm_source=chatgpt.com))

这一阶段目标：你能自己画出一个 Agent 系统图：  
**User → Planner → Tool Router → Tool Executor → Memory → Evaluator → Final Answer**

---

### 第 3 阶段：学 Agent 评测

Agent 训练一定要先理解评测，因为 reward 很多时候来自评测。

推荐看：

1. **BFCL：Berkeley Function Calling Leaderboard**  
   它专门评测模型调用函数/工具的能力，包括串行调用、并行调用、多步工具使用、状态变化等，非常适合学习 tool-use agent。BFCL V4 还加入了 web search 场景，用来评测模型能否用搜索工具回答多跳问题。([Gorilla](https://gorilla.cs.berkeley.edu/leaderboard.html?utm_source=chatgpt.com))

2. **SWE-bench**  
   这是 coding agent 方向的核心评测。SWE-bench 用真实 GitHub issue 测试模型解决软件工程问题的能力，Verified 子集是人工验证过的 500 个实例。([SWE-bench](https://www.swebench.com/?utm_source=chatgpt.com))

这一阶段目标：你要明白 Agent 不是看“回答像不像”，而是看 **任务有没有完成、工具有没有调对、状态有没有变对、成本高不高**。

---

### 第 4 阶段：进入 Agent 后训练

这一阶段才是真正的“后训练 Agent”。

你要重点理解：

**轨迹数据 trajectory**：不是单轮问答，而是  
`observation → thought/action → tool call → tool result → next action → final answer`

**奖励 reward**：可以来自  
任务是否完成、工具参数是否正确、代码测试是否通过、网页任务状态是否正确、数据库状态是否正确。

**训练方法**：  
SFT 可以先模仿高质量轨迹；DPO 可以用好/坏轨迹做偏好训练；GRPO/PPO 可以用环境反馈直接优化。OpenRLHF 和 verl 都是更偏大规模 RL 后训练的框架，OpenRLHF 基于 Ray、vLLM、DeepSpeed、Hugging Face Transformers，verl 支持构建 GRPO、PPO 等 RL dataflow。([OpenRLHF](https://openrlhf.readthedocs.io/?utm_source=chatgpt.com))

推荐阅读：

1. **Agent-R1: Training Powerful LLM Agents with End-to-End Reinforcement Learning**  
   这是 Agent RL 后训练方向很直接的材料，重点看它如何把 LLM Agent 放进 MDP 框架。([arXiv](https://arxiv.org/abs/2511.14460?utm_source=chatgpt.com))

2. **Awesome-RL-for-LRMs / Awesome-Agent-Papers**  
   这两个适合跟踪论文，不建议从头读。先把它们当索引库，用来找 tool-use、reasoning、agent RL 的最新论文。([GitHub](https://github.com/TsinghuaC3I/Awesome-RL-for-LRMs?utm_source=chatgpt.com))

3. **Hugging Face TRL + OpenRLHF + verl**  
   入门用 TRL；想跑 PPO/GRPO、Ray/vLLM 分布式，再看 OpenRLHF；想跟现在 RL post-training 社区更前沿的工程流，再看 verl。([GitHub](https://github.com/huggingface/trl?utm_source=chatgpt.com))

---

## 三、我给你的推荐阅读清单

### 入门必读

1. **A Primer on LLM Post-Training**  
   先读这个，建立后训练全局认知。([PyTorch](https://pytorch.org/blog/a-primer-on-llm-post-training/?utm_source=chatgpt.com))

2. **Hugging Face TRL Docs**  
   直接看 SFT、DPO、GRPO 怎么跑。([GitHub](https://github.com/huggingface/trl?utm_source=chatgpt.com))

3. **OpenAI Spinning Up in Deep RL**  
   补 RL 基础，尤其是 policy gradient 和 PPO。([Spinning Up](https://spinningup.openai.com/en/latest/?utm_source=chatgpt.com))

4. **Anthropic：Building Effective Agents**  
   学 Agent 架构，不要先迷信复杂框架。([Anthropic](https://www.anthropic.com/research/building-effective-agents?utm_source=chatgpt.com))

### 进阶必读

5. **OpenAI：Learning to Reason with LLMs**  
   理解 reasoning post-training。([OpenAI](https://openai.com/index/learning-to-reason-with-llms/?utm_source=chatgpt.com))

6. **DeepSeek-R1 论文**  
   理解 GRPO、RLVR、reasoning model。([arXiv](https://arxiv.org/html/2501.12948v1?utm_source=chatgpt.com))

7. **BFCL / SWE-bench**  
   学 Agent 评测。([Gorilla](https://gorilla.cs.berkeley.edu/leaderboard.html?utm_source=chatgpt.com))

8. **Agent-R1**  
   学 Agent 强化学习后训练。([arXiv](https://arxiv.org/abs/2511.14460?utm_source=chatgpt.com))

---

## 四、实践路线：不要只看文章

我建议你按这 4 个小项目做：

**项目 1：SFT 一个小模型做工具调用**  
用 Qwen2.5-0.5B / Qwen2.5-1.5B，构造几十到几百条 tool-call 数据，让模型学会输出 JSON function call。

**项目 2：做 DPO 偏好优化**  
构造 chosen / rejected，比如正确工具调用 vs 错误工具调用，用 TRL 的 DPOTrainer 跑一遍。

**项目 3：做 rule-based reward 的 GRPO**  
任务可以很简单：数学题、格式化 JSON、调用 calculator。reward 直接写规则，比如答案对给 1，格式错给 0。

**项目 4：做一个小型 Agent 环境**  
例如：给模型几个工具：`search_doc()`、`calculator()`、`write_file()`，让它完成多步任务。记录轨迹，再做 SFT 或 GRPO。

---

## 五、你的学习顺序可以这样排

**第 1 周**：PyTorch post-training primer + TRL SFT/DPO 文档。  
**第 2 周**：Spinning Up 里的 RL 基础 + PPO/GRPO 直觉。  
**第 3 周**：OpenAI reasoning blog + DeepSeek-R1。  
**第 4 周**：Anthropic Agent 文章 + BFCL/SWE-bench。  
**第 5 周以后**：开始复现一个小型 tool-use agent 后训练项目。

你的目标不是马上做出 ChatGPT Agent，而是先跑通这个闭环：

**数据构造 → SFT → 偏好数据 → DPO/GRPO → 工具调用评测 → 错误分析 → 再训练**

这条线跑通一次，你就真正入门了。

---

# you asked

message time: 2026-06-07 15:46:45

我有基础。我就是想看一些 博客或者好的文章之类的

---

# chatgpt response

明白，你不是要从零学概念，而是想找“值得长期收藏、能打开思路”的文章/博客。我会按后训练、RL for reasoning、Agent、Agent 训练与评测几类筛选。

明白。你要的是**博客/好文章收藏夹**，不是零基础教程。我给你筛一版“值得认真读”的。

## 1. 后训练 / RLHF / DPO / GRPO

**Nathan Lambert — RLHF Book**  
目前最系统的免费材料之一，适合有基础的人直接读。重点看 SFT、Reward Model、Policy Gradient、PPO、DPO、GRPO、RLVR。它不是碎片博客，而是一本围绕 LLM post-training 写的在线书。([RLHF Book](https://rlhfbook.com/?utm_source=chatgpt.com))

**Nathan Lambert — The State of Post-training in 2025**  
适合了解后训练领域的整体变化：从 DPO/PPO 争论，转向 reinforcement finetuning、RLVR、推理模型训练等。([Interconnects AI](https://www.interconnects.ai/p/the-state-of-post-training-2025?utm_source=chatgpt.com))

**Nathan Lambert — Do we need RL for RLHF?**  
这篇适合看 DPO 与 RL 方法之间的争论。不是教程型文章，更像研究判断，对你理解“为什么现在又重新重视 RL”很有帮助。([Interconnects AI](https://www.interconnects.ai/p/the-dpo-debate?utm_source=chatgpt.com))

**Hugging Face — A Guide to Reinforcement Learning Post-Training for LLMs**  
比较新的综述型博客，覆盖 PPO、DPO、GRPO 等。适合和代码框架 TRL 对照着看。([Hugging Face](https://huggingface.co/blog/karina-zadorozhny/guide-to-llm-post-training-algorithms?utm_source=chatgpt.com))

**Hugging Face — Preference Tuning LLMs with DPO / IPO / KTO**  
想理解 DPO 及其同类偏好优化方法，这篇很实用，尤其适合做实验前看。([Hugging Face](https://huggingface.co/blog/pref-tuning?utm_source=chatgpt.com))

**Cameron Wolfe — PPO for LLMs: A Guide for Normal People**  
这篇写得比较工程友好，适合补 PPO 在 LLM post-training 里的作用。它也提到 RLHF 早期主要用 PPO，而 RLVR 之后 GRPO 使用变多。([Cameron R. Wolfe](https://cameronrwolfe.substack.com/p/ppo-llm?utm_source=chatgpt.com))

---

## 2. Reasoning 后训练

**OpenAI — Learning to Reason with LLMs**  
这篇适合理解 reasoning model 的方向：为什么推理能力不是单纯靠 prompt，而是和训练过程、强化学习、测试时计算有关。([OpenAI](https://openai.com/index/learning-to-reason-with-llms/?utm_source=chatgpt.com))

**DeepSeek-R1 技术报告 / 论文**  
这是必须读的。重点不是看模型多强，而是看它如何用 RL 激发 self-reflection、verification、dynamic strategy adaptation 等推理行为。([arXiv](https://arxiv.org/abs/2501.12948?utm_source=chatgpt.com))

**Nature 版 DeepSeek-R1 文章**  
比 arXiv 版更凝练，适合重点看 GRPO 的定位：它被用来简化 PPO、降低资源消耗。([Nature](https://www.nature.com/articles/s41586-025-09422-z?utm_source=chatgpt.com))

**Fireworks AI — Beyond SFT: RL with Verifiable Reward**  
这篇适合从工程视角理解 RLVR：为什么可验证奖励会成为 reasoning post-training 的关键。([Fireworks AI](https://fireworks.ai/blog/reinforcement-learning-with-verifiable-reward?utm_source=chatgpt.com))

---

## 3. Agent 架构与工程

**Anthropic — Building Effective Agents**  
Agent 方向必读。它最大的价值是提醒你：很多好用的 Agent 不是复杂框架堆出来的，而是简单、可组合的 workflow / agent pattern。([Anthropic](https://www.anthropic.com/research/building-effective-agents?utm_source=chatgpt.com))

**Lilian Weng — LLM Powered Autonomous Agents**  
经典长文。适合系统理解 Agent 的三件套：planning、memory、tool use。虽然不是最新，但框架仍然很有用。([Lil'Log](https://lilianweng.github.io/posts/2023-06-23-agent/?utm_source=chatgpt.com))

**Chip Huyen — Agents**  
非常适合工程视角阅读。它从 tools、planning、failure modes、evaluation 讲 Agent，比很多“框架宣传文”扎实。([Chip Huyen](https://huyenchip.com/2025/01/07/agents.html?utm_source=chatgpt.com))

**Hugging Face Agents Course — Fine-tune for Function Calling**  
这篇更偏实操：怎么把模型 fine-tune 成会 function calling 的 agent brain。对你做 agent 后训练很直接。([Hugging Face](https://huggingface.co/learn/agents-course/en/bonus-unit1/fine-tuning?utm_source=chatgpt.com))

---

## 4. Agent 后训练 / RL Agent

**Agent-R1: Training Powerful LLM Agents with End-to-End Reinforcement Learning**  
Agent 后训练方向值得重点看。它把 LLM Agent 放进 MDP 框架，讨论 observation、action、tool feedback、reward、environment。([arXiv](https://arxiv.org/abs/2511.14460?utm_source=chatgpt.com))

**RLFactory: A Plug-and-Play RL Post-Training Framework for LLM Multi-Turn Tool-Use**  
适合看 multi-turn tool-use 怎么做 RL 后训练。它把工具调用、观察反馈、reward layer、generate-parse-invoke-update 训练流程讲得比较清楚。([arXiv](https://arxiv.org/abs/2509.06980?utm_source=chatgpt.com))

**SkyRL-Agent: Efficient RL Training for Multi-turn LLM Agent**  
适合关注工程训练效率的人看，尤其是多轮、长程 Agent 训练中的异步调度、工具集成和 rollout 效率。([arXiv](https://arxiv.org/abs/2511.16108?utm_source=chatgpt.com))

**Tree Search for LLM Agent Reinforcement Learning / Tree-GRPO**  
这篇适合进阶读。它处理的是长程 Agent 任务中 outcome reward 太稀疏的问题，用 tree search 给 Agent RL 提供更细粒度监督。([arXiv](https://arxiv.org/pdf/2509.21240?utm_source=chatgpt.com))

---

## 5. Agent 评测文章 / Benchmark

**BFCL V4 — Berkeley Function Calling Leaderboard**  
如果你关心 tool-use agent，这个必须看。BFCL V4 评测模型是否能准确调用函数，并且包含 agentic、多轮、live、hallucination 等部分。([Gorilla](https://gorilla.cs.berkeley.edu/leaderboard.html?utm_source=chatgpt.com))

**BFCL V4 Web Search Blog**  
专门看 web search agent 的评测设计，适合理解搜索型 Agent 不只是“会搜”，还要评估多轮、实时性和幻觉。([Gorilla](https://gorilla.cs.berkeley.edu/blogs/15_bfcl_v4_web_search.html?utm_source=chatgpt.com))

**SWE-bench / SWE-bench Verified**  
Coding Agent 方向核心评测。SWE-bench 用真实 GitHub issue 测模型修代码能力；Verified 是人工验证过的 500 个实例。([SWE-bench](https://www.swebench.com/SWE-bench/?utm_source=chatgpt.com))

**Terminal-Bench**  
适合看 terminal agent 的评测，即 Agent 是否能在真实终端环境中完成端到端任务。([Terminal-Bench](https://www.tbench.ai/?utm_source=chatgpt.com))

**WebArena**  
Web Agent 方向经典评测环境，强调 realistic web interaction，比简单问答更接近真实 Agent。([WebArena](https://webarena.dev/og/?utm_source=chatgpt.com))

---

## 我建议你的阅读顺序

先读：

1. **Anthropic — Building Effective Agents**  
2. **Chip Huyen — Agents**  
3. **Lilian Weng — LLM Powered Autonomous Agents**

这三篇让你先把 Agent 的结构想清楚。

然后读：

4. **RLHF Book**  
5. **Hugging Face Post-training Guide**  
6. **Cameron Wolfe PPO for LLMs**  
7. **DeepSeek-R1**

这一组补后训练和 RLVR。

最后读：

8. **Agent-R1**  
9. **RLFactory**  
10. **BFCL V4 / SWE-bench / WebArena**

这一组进入真正的 Agent 后训练与评测。我的建议是：**不要先看框架文档，先看这些文章，弄清楚 agent 到底训练什么、reward 从哪里来、评测怎么闭环。**

---

# you asked

message time: 2026-06-07 15:49:09

我需要 你根据博客一部分 一部分 总结 需要用人家的原始图片 然后加上你的总结 要中文 版本  英文术语要有中文。 图片最好也总结一下。

---

# chatgpt response

可以，我理解你的需求是做成“中文精读笔记”，不是简单摘要：按博客原文结构拆分，每一部分保留关键图示来源，并配中文术语解释、图片解读和我的总结。

---

# you asked

message time: 2026-06-07 15:49:40

是 html格式 给我

---

# chatgpt response

我先给你一个可直接套用的 HTML 模板：每篇博客按“原文部分—原图—图片解读—中文总结—术语解释—可迁移启发”来写。你把博客链接或图片 URL 换进去就能用。

可以，HTML 模板已经做好了：

[下载 HTML 模板](sandbox:/mnt/data/agent_post_training_blog_notes_template.html)

你后面给我具体博客链接后，我可以按这个格式直接帮你填成完整中文版精读笔记，包括：

原文结构拆解、原始图片引用、图片中文解读、术语中英对照、我的总结、实践启发。

---

# you asked

message time: 2026-06-07 15:53:01

你这个 总结的不行啊 一点不详细

---

# chatgpt response

对，你说得对。刚才那个更像“空模板”，没有达到你要的“按博客逐段精读、图也讲清楚”的程度。  
我这次会按真正的精读笔记来重做：每一节都包括“原文在说什么—图在表达什么—中文解释—术语—对后训练 Agent 的启发”。

你说得对，刚才那个只是空模板，不是你要的“详细精读”。我重新做了一个**详细版 HTML 样例**，先按 Anthropic 的《Building effective agents》来写：逐节拆解、保留原文图片、每张图都有中文解读，并且加了“后训练 Agent 视角”的总结。原文是 Anthropic 2024 年 12 月发布的 Agent 工程文章，核心区分了 workflow 和 agent，并提出增强型 LLM、提示链、路由、并行化、编排器-工作者、评估器-优化器、自主 Agent 等模式。([Anthropic](https://www.anthropic.com/research/building-effective-agents))

[下载详细版 HTML 精读笔记](sandbox:/mnt/data/anthropic_building_effective_agents_cn_detailed.html)

这版已经不是模板，而是实打实写了内容。下一步你把想看的博客链接发我，我就按这个详细程度继续做。

---

# you asked

message time: 2026-06-07 16:02:21

看不见

---

# chatgpt response

看不见大概率是因为我上一版 HTML 里的图片走的是 Anthropic 外链，打开时可能被预览环境拦截了。  
我现在给你改成“页面内直接可见”的版本：不用外链图片，先用中文重绘结构图 + 详细解释，这样打开 HTML 就能看到内容。

我重新做了一版**可见版 HTML**：图片不再用外链，而是直接在 HTML 里用中文 SVG 重绘，所以打开后应该能看到图和文字。

[下载可见版 HTML](sandbox:/mnt/data/building_effective_agents_cn_visible.html)

上一版看不见，主要可能是因为 Anthropic 原图外链在 ChatGPT 文件预览里被拦截了。这一版虽然不是原始图片截图，但图的结构和含义都按原文重绘，并且每张图下面都做了详细中文解释。

---

# you asked

message time: 2026-06-07 16:06:00

还是不行

---

# chatgpt response

明白了，那问题很可能不是图片，而是 HTML 文件在你这边的预览/下载链路打不开。  
我换一种最稳的方式：直接给你一个“纯 HTML + 纯文字结构图”的版本，文件里没有外链、没有 SVG、没有复杂脚本，同时我也打包成 zip，方便你下载后用浏览器打开。

这次我换成最稳的版本了：**没有外链图片、没有 SVG、没有 JS，只有纯 HTML + 纯文字结构图**。你下载后用浏览器打开。

你可以试这三个：

1. [直接下载 HTML](sandbox:/mnt/data/agent_notes_plain_visible.html)  
2. [下载 zip 包](sandbox:/mnt/data/agent_notes_plain_visible.zip)  
3. [下载 HTML 源码 txt](sandbox:/mnt/data/agent_notes_plain_visible_html_code.txt)

如果 HTML 还是打不开，就用第 3 个 txt：把里面内容复制到 VS Code，新建文件保存为 `agent_notes.html`，然后用 Chrome 打开。这个方式一定能看。

---

# you asked

message time: 2026-06-07 16:08:06

无法获取

---

# chatgpt response

那就不要走下载链接了，我直接把 **HTML 源码贴给你**。你复制下面全部内容，新建一个文件，命名为：

`agent_notes.html`

然后用 Chrome / Edge / Safari 打开就能看。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>后训练 Agent 中文精读笔记</title>
<style>
body {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  line-height: 1.8;
  max-width: 980px;
  margin: 40px auto;
  padding: 0 24px 80px;
  color: #222;
  background: #fafafa;
}
h1 {
  font-size: 32px;
  border-bottom: 4px solid #1f4ed8;
  padding-bottom: 12px;
}
h2 {
  margin-top: 42px;
  font-size: 25px;
  border-left: 6px solid #1f4ed8;
  padding-left: 12px;
  background: #eef4ff;
}
h3 {
  margin-top: 26px;
  font-size: 20px;
}
.box {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px 20px;
  margin: 16px 0;
}
.note {
  background: #fff7d6;
  border-left: 5px solid #d6a800;
}
.train {
  background: #ecfdf3;
  border-left: 5px solid #16a34a;
}
.warn {
  background: #fff1f1;
  border-left: 5px solid #dc2626;
}
pre {
  background: #111827;
  color: #e5e7eb;
  padding: 18px;
  border-radius: 10px;
  overflow-x: auto;
  line-height: 1.5;
  font-family: Consolas, Monaco, monospace;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
  background: #fff;
}
th, td {
  border: 1px solid #ddd;
  padding: 10px 12px;
  vertical-align: top;
}
th {
  background: #f0f3f8;
}
.small {
  color: #666;
  font-size: 14px;
}
</style>
</head>

<body>

<h1>《Building Effective Agents》中文精读笔记：后训练 Agent 学习版</h1>

<p>
<strong>原文：</strong>Anthropic Engineering, Building Effective Agents。<br>
<strong>用途：</strong>学习后训练 Agent、Agent 工程模式、工具调用、轨迹训练和评测闭环。<br>
<strong>说明：</strong>本文件为纯 HTML 版本，不依赖外链图片。原文图片用文字结构图重画，并配中文解释。
</p>

<div class="box note">
<strong>总判断：</strong>
这篇文章不是教你使用某个 Agent 框架，而是在讲如何构建真正有效的 Agent。
它反复强调一个原则：不要一开始就堆复杂框架，而要从简单、可控、可评测的结构开始。
</div>

<h2>一、文章核心问题：什么是有效 Agent？</h2>

<p>
Anthropic 的核心观点是：很多成功的 LLM Agent 系统，并不是靠复杂框架或多智能体堆叠出来的，
而是靠简单、清晰、可组合的模式构建出来的。
</p>

<p>
这篇文章把 Agentic System，即“智能体式系统”，分为两类：
</p>

<table>
<tr>
<th>英文术语</th>
<th>中文译法</th>
<th>核心含义</th>
<th>适合任务</th>
</tr>
<tr>
<td>Workflow</td>
<td>工作流</td>
<td>流程由开发者提前写好，模型在固定步骤中完成任务。</td>
<td>步骤明确、路径稳定、容易评测的任务。</td>
</tr>
<tr>
<td>Agent</td>
<td>智能体</td>
<td>模型根据环境反馈动态决定下一步动作。</td>
<td>路径不确定、需要自主规划和工具选择的任务。</td>
</tr>
</table>

<div class="box note">
<strong>我的总结：</strong>
Workflow 是“程序驱动的大模型系统”；Agent 是“模型驱动的程序系统”。
两者不是绝对对立，而是从可控到自主的一条连续谱。
</div>

<h2>二、什么时候不要使用 Agent？</h2>

<p>
文章非常重要的一点是：不要为了显得高级而使用 Agent。
如果一次 LLM 调用、RAG 或简单工作流就能解决问题，就没有必要引入完整 Agent。
</p>

<table>
<tr>
<th>任务类型</th>
<th>优先方案</th>
<th>原因</th>
</tr>
<tr>
<td>简单问答、格式转换、摘要</td>
<td>Single LLM Call，单次大模型调用</td>
<td>成本低、延迟低、调试简单。</td>
</tr>
<tr>
<td>需要外部知识，但流程简单</td>
<td>RAG，检索增强生成</td>
<td>只需要补充知识，不一定需要自主行动。</td>
</tr>
<tr>
<td>任务能拆成固定步骤</td>
<td>Workflow，工作流</td>
<td>稳定、可控、可评测。</td>
</tr>
<tr>
<td>任务路径无法提前确定</td>
<td>Agent，智能体</td>
<td>需要模型根据反馈动态规划。</td>
</tr>
</table>

<div class="box warn">
<strong>关键判断标准：</strong>
不是看任务是否“高级”，而是看任务路径能不能提前写死。
能写死，优先工作流；不能写死，再考虑 Agent。
</div>

<h2>三、基础构件：Augmented LLM 增强型大模型</h2>

<p>
文章认为，Agent 系统的基础不是一个孤立的大语言模型，而是一个被外部能力增强的大模型。
</p>

<pre>
┌──────────────────────┐
│      Retrieval        │
│      检索              │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│        LLM            │
│      大语言模型        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│        Tools          │
│      工具调用          │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│        Memory         │
│      记忆              │
└──────────────────────┘
</pre>

<h3>图解</h3>

<table>
<tr>
<th>模块</th>
<th>中文</th>
<th>功能</th>
<th>后训练关注点</th>
</tr>
<tr>
<td>Retrieval</td>
<td>检索</td>
<td>从网页、文档、知识库中获取外部信息。</td>
<td>训练模型何时检索、检索什么、如何整合证据。</td>
</tr>
<tr>
<td>Tools</td>
<td>工具调用</td>
<td>调用计算器、代码执行器、搜索、数据库等。</td>
<td>训练模型选择工具、填写参数、解释工具返回。</td>
</tr>
<tr>
<td>Memory</td>
<td>记忆</td>
<td>保存历史状态、用户偏好、任务上下文。</td>
<td>训练模型写入什么、何时读取、如何避免错误记忆。</td>
</tr>
</table>

<div class="box train">
<strong>后训练启发：</strong>
不要一开始就训练完整 Agent。可以先训练增强型 LLM 的三个基础能力：
检索决策、工具调用、记忆管理。
</div>

<h2>四、Workflow 1：Prompt Chaining 提示链</h2>

<pre>
输入
 │
 ▼
LLM Call 1：完成第一步
 │
 ▼
Gate：检查中间结果
 │
 ├── 不合格 → Exit 退出
 │
 ▼
LLM Call 2：完成第二步
 │
 ▼
LLM Call 3：完成第三步
 │
 ▼
输出
</pre>

<h3>原文意思</h3>

<p>
Prompt Chaining 是把复杂任务拆成多个连续模型调用。
每一步只解决一个小问题，中间可以加入 Gate，即检查点。
如果中间结果不合格，就提前退出或返回修改。
</p>

<h3>适合场景</h3>

<ul>
<li>写作：先生成提纲，再写正文，再检查风格。</li>
<li>数据抽取：先抽取信息，再校验，再转成 JSON。</li>
<li>代码任务：先定位 bug，再修改，再测试。</li>
</ul>

<div class="box train">
<strong>后训练映射：</strong>
提示链很适合做 SFT，因为每一步都有明确输入输出。
Gate 还能生成偏好数据：通过的是 chosen，不通过的是 rejected。
</div>

<h2>五、Workflow 2：Routing 路由</h2>

<pre>
用户输入
  │
  ▼
Router 路由模型
  │
  ├── 类型 A → 专用流程 A
  ├── 类型 B → 专用流程 B
  └── 类型 C → 专用流程 C
</pre>

<h3>原文意思</h3>

<p>
Routing 的核心是先判断任务类型，再送入不同流程。
它适合任务类别差异明显的系统，例如客服、代码任务、文档处理系统。
</p>

<h3>中文解释</h3>

<p>
一个大而全的 prompt 往往会互相干扰。
路由可以让不同任务走不同 prompt、不同工具、不同模型，从而降低复杂度。
</p>

<div class="box train">
<strong>后训练映射：</strong>
可以训练模型输出路由标签，例如 refund、tech_support、account。
这类数据适合 SFT 或分类微调。
</div>

<h2>六、Workflow 3：Parallelization 并行化</h2>

<pre>
               ┌── LLM Call A ──┐
输入 ───────────┼── LLM Call B ──┼── Aggregator 聚合器 ── 输出
               └── LLM Call C ──┘
</pre>

<h3>原文意思</h3>

<p>
并行化是把同一个任务同时交给多个模型调用，再用聚合器整合结果。
它有两种常见模式：
</p>

<table>
<tr>
<th>英文</th>
<th>中文</th>
<th>说明</th>
</tr>
<tr>
<td>Sectioning</td>
<td>分段处理</td>
<td>不同模型调用处理任务的不同部分。</td>
</tr>
<tr>
<td>Voting</td>
<td>投票</td>
<td>多个模型调用处理同一问题，最后投票选择结果。</td>
</tr>
</table>

<div class="box train">
<strong>后训练映射：</strong>
并行候选可以天然生成 DPO 数据。
被聚合器选中的答案是 chosen，被淘汰的是 rejected。
</div>

<h2>七、Workflow 4：Orchestrator-workers 编排器—工作者</h2>

<pre>
用户任务
  │
  ▼
Orchestrator 编排器
  │
  ├── Worker A：子任务 A
  ├── Worker B：子任务 B
  └── Worker C：子任务 C
  │
  ▼
编排器汇总结果
  │
  ▼
最终输出
</pre>

<h3>原文意思</h3>

<p>
Orchestrator 负责理解任务、动态拆解任务、分配子任务给 Worker，最后汇总结果。
这个模式比普通并行化更灵活，因为子任务不是提前固定的，而是由模型动态生成。
</p>

<h3>适合场景</h3>

<ul>
<li>复杂代码修改。</li>
<li>多文件项目理解。</li>
<li>多文献综述。</li>
<li>复杂数据分析报告。</li>
</ul>

<div class="box train">
<strong>后训练映射：</strong>
可以训练“任务拆解轨迹”：任务 → 子任务列表 → Worker 输出 → 汇总答案。
训练重点不是最终答案，而是中间拆解是否合理。
</div>

<h2>八、Workflow 5：Evaluator-optimizer 评估器—优化器</h2>

<pre>
输入
 │
 ▼
Generator 生成器
 │
 ▼
Solution 初稿
 │
 ▼
Evaluator 评估器
 │
 ├── 通过 → 输出
 │
 └── 不通过 → Feedback 反馈 → Generator 继续修改
</pre>

<h3>原文意思</h3>

<p>
这个模式模拟人类写作、代码修改、翻译中的“生成—评价—修改”循环。
关键不在于多生成几次，而在于评估器给出的反馈是否具体、可操作。
</p>

<div class="box note">
<strong>核心点：</strong>
Evaluator-optimizer 的价值是把错误转化成可利用反馈。
如果反馈只是“写得不好”，没有具体修改方向，这个循环效果会很差。
</div>

<div class="box train">
<strong>后训练映射：</strong>
错误答案 + 反馈 + 修改后答案，可以直接构成训练数据。
修改后答案作为 chosen，修改前答案作为 rejected，非常适合 DPO。
</div>

<h2>九、Autonomous Agent 自主智能体</h2>

<pre>
Human 人类给任务
      │
      ▼
LLM 根据当前状态决策
      │
      ▼
Action 执行动作：搜索 / 调工具 / 写代码 / 读文件
      │
      ▼
Environment 环境返回结果
      │
      ▼
Feedback 反馈
      │
      ├── 任务未完成 → 回到 LLM 继续决策
      └── 任务完成 → Stop 停止
</pre>

<h3>原文意思</h3>

<p>
自主 Agent 与 Workflow 的区别在于：它的路径不是提前写死的。
模型会根据环境反馈自己判断下一步做什么，直到任务完成或达到停止条件。
</p>

<h3>强化学习映射</h3>

<table>
<tr>
<th>RL 术语</th>
<th>中文</th>
<th>Agent 中对应物</th>
</tr>
<tr>
<td>Observation</td>
<td>观察</td>
<td>当前任务、历史上下文、工具返回、环境状态。</td>
</tr>
<tr>
<td>Action</td>
<td>动作</td>
<td>工具调用、搜索、写文件、运行代码。</td>
</tr>
<tr>
<td>Reward</td>
<td>奖励</td>
<td>任务完成、测试通过、格式正确、答案正确。</td>
</tr>
<tr>
<td>Policy</td>
<td>策略</td>
<td>模型在当前状态下选择下一步动作的方式。</td>
</tr>
<tr>
<td>Trajectory</td>
<td>轨迹</td>
<td>从任务开始到结束的观察—动作—反馈序列。</td>
</tr>
</table>

<div class="box train">
<strong>后训练重点：</strong>
自主 Agent 训练的核心不是单轮问答，而是整条轨迹。
也就是 Observation → Action → Feedback → Next Action → Final Answer。
</div>

<h2>十、Coding Agent 编码智能体</h2>

<pre>
用户提出代码任务
      │
      ▼
界面发送上下文给 LLM
      │
      ▼
LLM 搜索相关文件
      │
      ▼
LLM 修改代码
      │
      ▼
运行测试
      │
      ├── 测试失败 → 读取错误信息 → 继续修改
      └── 测试通过 → 输出结果
</pre>

<h3>为什么 Coding Agent 重要？</h3>

<p>
编码任务是后训练 Agent 最好的场景之一，因为它有可验证奖励：
测试是否通过、代码是否能运行、lint 是否报错、issue 是否解决。
</p>

<div class="box train">
<strong>RLVR：</strong>
RLVR 是 Reinforcement Learning with Verifiable Rewards，可验证奖励强化学习。
代码任务、数学题、格式校验、数据库状态检查，都适合做 RLVR。
</div>

<h2>十一、ACI：Agent-Computer Interface 智能体-计算机接口</h2>

<p>
文章最后强调，工具接口设计非常重要。
ACI 类似 HCI。HCI 是 Human-Computer Interface，人机接口；
ACI 是 Agent-Computer Interface，智能体-计算机接口。
</p>

<table>
<tr>
<th>工具设计问题</th>
<th>可能后果</th>
<th>改进方式</th>
</tr>
<tr>
<td>参数名含糊</td>
<td>模型不知道该填什么</td>
<td>参数名具体化，并给例子。</td>
</tr>
<tr>
<td>工具功能重叠</td>
<td>模型容易选错工具</td>
<td>明确工具边界。</td>
</tr>
<tr>
<td>错误信息不可读</td>
<td>模型无法自我修正</td>
<td>错误反馈要具体说明哪里错。</td>
</tr>
<tr>
<td>输出格式太复杂</td>
<td>模型难以解释结果</td>
<td>返回结构要稳定、字段要清楚。</td>
</tr>
</table>

<div class="box note">
<strong>我的判断：</strong>
Agent 表现不好，不一定是模型不够强，也可能是工具接口设计太差。
差的工具接口会让强模型表现得像弱模型。
</div>

<h2>十二、如何转化为后训练 Agent 路线？</h2>

<table>
<tr>
<th>训练能力</th>
<th>对应文章部分</th>
<th>数据形式</th>
<th>适合方法</th>
</tr>
<tr>
<td>工具调用</td>
<td>Augmented LLM / ACI</td>
<td>上下文 → 工具名 + 参数</td>
<td>SFT / DPO</td>
</tr>
<tr>
<td>路由判断</td>
<td>Routing</td>
<td>输入 → 类别 → 流程</td>
<td>SFT / 分类微调</td>
</tr>
<tr>
<td>任务拆解</td>
<td>Prompt Chaining / Orchestrator-workers</td>
<td>任务 → 子任务列表</td>
<td>SFT / DPO</td>
</tr>
<tr>
<td>反馈修正</td>
<td>Evaluator-optimizer</td>
<td>错误答案 → 反馈 → 修改后答案</td>
<td>DPO / RLVR</td>
</tr>
<tr>
<td>多步行动</td>
<td>Autonomous Agent</td>
<td>Observation → Action → Feedback 轨迹</td>
<td>GRPO / PPO / RLVR</td>
</tr>
</table>

<h3>推荐复现顺序</h3>

<ol>
<li>先训练一个工具调用 SFT，让模型输出合法 JSON function call。</li>
<li>再构造错误样本，例如错误工具名、错误参数、错误格式。</li>
<li>用正确工具调用作为 chosen，错误工具调用作为 rejected，做 DPO。</li>
<li>加入环境反馈，例如答案是否正确、代码测试是否通过。</li>
<li>最后训练多步轨迹，让模型根据工具返回继续行动。</li>
</ol>

<div class="box note">
<strong>最终总结：</strong>
有效 Agent = 简单结构 + 清楚工具 + 环境反馈 + 可评测轨迹。
后训练的目标不是让模型“说得像 Agent”，而是让模型在轨迹中更稳定地选择正确动作。
</div>

<h2>十三、术语中英对照</h2>

<table>
<tr>
<th>英文</th>
<th>中文</th>
<th>解释</th>
</tr>
<tr>
<td>Agent</td>
<td>智能体</td>
<td>能自主选择动作并利用反馈完成任务的系统。</td>
</tr>
<tr>
<td>Workflow</td>
<td>工作流</td>
<td>预设流程的大模型应用模式。</td>
</tr>
<tr>
<td>Augmented LLM</td>
<td>增强型大模型</td>
<td>接入检索、工具、记忆的大模型。</td>
</tr>
<tr>
<td>Tool Calling</td>
<td>工具调用</td>
<td>模型调用函数、API、代码执行器等工具。</td>
</tr>
<tr>
<td>Routing</td>
<td>路由</td>
<td>将输入分配到不同任务流程。</td>
</tr>
<tr>
<td>Orchestrator</td>
<td>编排器</td>
<td>负责拆解任务和分配子任务的模型。</td>
</tr>
<tr>
<td>Evaluator</td>
<td>评估器</td>
<td>负责判断输出质量并提供反馈。</td>
</tr>
<tr>
<td>Trajectory</td>
<td>轨迹</td>
<td>Agent 完成任务过程中的观察、动作和反馈序列。</td>
</tr>
<tr>
<td>RLVR</td>
<td>可验证奖励强化学习</td>
<td>使用可自动验证的奖励训练模型。</td>
</tr>
<tr>
<td>ACI</td>
<td>智能体-计算机接口</td>
<td>Agent 与工具、环境交互的接口设计。</td>
</tr>
</table>

<p class="small">
保存方法：复制全部内容 → 新建 agent_notes.html → 用浏览器打开。
</p>

</body>
</html>
```

---

# you asked

message time: 2026-06-07 16:10:15

最好 有人家博客的原图片 啥的 总结多点 详细点

---

# chatgpt response

你这个要求是对的：真正好用的版本应该是“原博客原图 + 中文精读 + 图示逐项讲解”，而不是我前面那种简化结构图。  
我先按这个标准重新整理做法：原图要么本地下载随 HTML 一起放，要么转成 base64 嵌入 HTML；直接外链最容易看不见。

对，应该这样做。你要的不是“摘要”，而是类似 **博客精读讲义**：

**原博客结构 + 原始图片 + 图片逐项讲解 + 中文详细总结 + 英文术语中文解释 + 后训练 Agent 视角点评。**

以后我给你做 HTML，就按这个标准来。

---

## 我建议的最终格式

每一篇博客做成这样：

```text
标题：Building Effective Agents

一、文章信息
- 原文标题
- 作者 / 机构
- 原文链接
- 发布时间
- 适合阅读对象
- 文章在后训练 Agent 学习中的位置

二、文章总论
- 作者到底想解决什么问题
- 这篇文章和普通 Agent 教程有什么区别
- 它对后训练 Agent 的意义

三、按博客原文结构逐节拆解
  1. 原文这一节在讲什么
  2. 原博客原图
  3. 图片逐项讲解
  4. 中文详细总结
  5. 英文术语中英对照
  6. 对后训练 Agent 的启发
  7. 可以怎么复现 / 实验
```

比如 Anthropic 这篇文章，它原文明确区分了 **workflows 工作流** 和 **agents 智能体**：workflows 是 LLM 和工具按预设代码路径运行，agents 则是 LLM 动态决定流程和工具使用方式。它还强调构建应用时应先找最简单方案，只有必要时才增加复杂度，因为 agentic systems 通常用更高成本和延迟换取更好表现。([Anthropic](https://www.anthropic.com/engineering/building-effective-agents))

---

## 原图应该怎么处理

你说“最好有人家博客的原图片”，这个是对的。

但是前面看不见，很可能是两个原因：

第一，ChatGPT 的文件下载链接你这边拿不到。  
第二，原图如果直接外链，有些博客会拦截跨站显示。

所以后面我会用三种方式之一：

### 方式一：直接在 HTML 里引用原图链接

格式是：

```html
<img src="原博客图片链接" alt="The augmented LLM">
```

优点是 HTML 短。  
缺点是如果网站限制外链，图片可能不显示。

### 方式二：原图本地化

文件结构是：

```text
blog_notes/
  index.html
  images/
    fig1_augmented_llm.png
    fig2_prompt_chaining.png
    fig3_routing.png
```

HTML 里写：

```html
<img src="./images/fig1_augmented_llm.png">
```

这是最稳的方式。

### 方式三：base64 嵌入 HTML

也就是把图片直接编码进 HTML：

```html
<img src="data:image/png;base64,......">
```

优点是一个 HTML 文件就够。  
缺点是文件会特别长，不适合直接在聊天里完整贴。

---

## 我后面给你的版本会更详细

比如一张图不能只写“这是 Agent 架构图”，而要这样写：

### 图：The augmented LLM

**图中元素：**

| 原图元素 | 中文解释 | 作用 |
|---|---|---|
| LLM | 大语言模型 | 负责理解输入、生成计划、决定是否调用工具 |
| Retrieval | 检索 | 从外部文档、网页、知识库中获取信息 |
| Tools | 工具 | 执行搜索、计算、代码运行、数据库查询等动作 |
| Memory | 记忆 | 保存历史状态、用户偏好和任务进展 |

**图片解读：**

这张图的重点不是说 LLM 多了几个插件，而是说 Agent 的基本单位已经不是“单纯生成文本的大模型”，而是一个被检索、工具和记忆增强后的系统。Anthropic 在文章中也说，agentic systems 的基本构件是被 retrieval、tools、memory 增强的 LLM，当前模型已经能主动生成搜索查询、选择工具并决定保留什么信息。([Anthropic](https://www.anthropic.com/engineering/building-effective-agents))

**后训练 Agent 视角：**

这张图可以拆成三个训练任务：

1. **检索决策训练**：什么时候该搜索？搜索什么关键词？  
2. **工具调用训练**：什么时候调用工具？调用哪个工具？参数怎么写？  
3. **记忆管理训练**：什么信息应该写入 memory？什么信息只保留在当前上下文？

这样才是你要的“图也总结一下”。

---

## 我建议你接下来这样给我任务

你直接发我一个博客链接，然后说：

```text
按“原图 + 中文精读 + 图片解释 + 后训练 Agent 启发”的格式整理成 HTML。
不要只总结，要详细。
HTML 直接贴源码，不要发下载链接。
```

我就会直接输出完整 HTML 源码。  
如果源码太长，我会分成：

```text
第 1 部分：head + 样式
第 2 部分：文章前半部分
第 3 部分：文章后半部分
第 4 部分：术语表和结尾
```

你复制到同一个 `.html` 文件里就行。

你可以先把第一篇博客链接发我，我按这个标准重做。

---

# you asked

message time: 2026-06-07 16:12:26

你找一个适合你的博客

---

# chatgpt response

我来替你选一篇更适合做“原图 + 中文精读 HTML”的博客：标准是原文结构清楚、图多、和后训练 Agent 关系大、图片容易引用或嵌入。

我建议就选这篇：

## **Lilian Weng：LLM Powered Autonomous Agents**

这篇最适合做你要的那种 **“原图 + 中文详细精读 + 术语解释 + 后训练 Agent 启发”**。原因是它结构非常清楚，而且图很多，核心内容正好覆盖 Agent 的基础三件套：**Planning 规划、Memory 记忆、Tool Use 工具使用**。原文开头就把 LLM Agent 定义为：LLM 作为 agent brain，由 planning、memory、tool use 等组件补充。([Lil'Log](https://lilianweng.github.io/posts/2023-06-23-agent/?utm_source=chatgpt.com))

我选它而不是继续用 Anthropic 那篇，是因为 Anthropic 那篇更像“工程模式总结”，适合讲 workflow 和 agent 的区别；Lilian Weng 这篇更适合做系统学习笔记，能从概念、图示、机制、案例一路讲下来。Anthropic 适合作为第二篇，Chip Huyen 的 **Agents** 适合作为第三篇，因为它更偏 2025 年工程实践、失败模式、工具调用错误和评测问题。([Chip Huyen](https://huyenchip.com/2025/01/07/agents.html?utm_source=chatgpt.com))

---

## 为什么这篇最适合做 HTML 精读？

它可以按这些部分拆：

1. **Agent System Overview：Agent 系统总览**  
   可以讲清楚：LLM 不是单独工作的，而是作为 brain，配合规划、记忆和工具使用。

2. **Planning：规划**  
   包括 task decomposition 任务分解、self-reflection 自我反思、ReAct、Reflexion 等。

3. **Memory：记忆**  
   可以讲 short-term memory 短期记忆、long-term memory 长期记忆、vector store 向量数据库、maximum inner product search 最大内积搜索。

4. **Tool Use：工具使用**  
   可以讲 MRKL、TALM、Toolformer、HuggingGPT、API-Bank 等。

5. **Case Studies：案例分析**  
   可以讲 AutoGPT、GPT-Engineer、BabyAGI 等早期 Agent 案例。

6. **Proof-of-concept Examples：概念验证案例**  
   可以把里面的例子转成“后训练 Agent 需要训练什么”。

---

## 我会怎么做这篇 HTML

我不会再给你空模板，会直接做成这种结构：

```text
标题：LLM Powered Autonomous Agents 中文精读

一、原文信息
二、为什么这篇文章重要
三、Agent 系统总览
  - 原文图
  - 图片逐项解释
  - 中文总结
  - 后训练 Agent 启发

四、Planning 规划
  - 原文图
  - Task decomposition 任务分解
  - Reflection 自我反思
  - ReAct / Reflexion
  - 后训练怎么用

五、Memory 记忆
  - 原文图
  - 短期记忆 / 长期记忆
  - 向量检索
  - 后训练怎么用

六、Tool Use 工具使用
  - 原文图
  - 工具调用机制
  - 工具学习方法
  - 后训练怎么用

七、术语表
八、总结：它对后训练 Agent 的意义
```

这篇文章也被很多 Agent 资源列表当作经典 deep-dive，用来理解 planning、memory、tool use 的 agent loop。([GitHub](https://github.com/EthicalML/awesome-agentic-engineering-resources?utm_source=chatgpt.com))

---

## 最终选择

就用：

**Lilian Weng — LLM Powered Autonomous Agents**

它最适合做第一篇精读。  
Anthropic 的 **Building Effective Agents** 放第二篇。  
Chip Huyen 的 **Agents** 放第三篇。

---

# you asked

message time: 2026-06-07 16:13:11

做一下

---

# chatgpt response

我会按“可直接保存为 HTML 的精读讲义”来做：抓取 Lilian Weng 这篇博客的原始结构和图示，逐节写中文解释，并把英文术语配中文。为避免你再遇到“看不见/无法获取”，我会尽量做成单文件 HTML。

可以。下面这版就是你要的格式：**原博客原图 + 中文详细精读 + 图片解释 + 英文术语中文翻译 + 后训练 Agent 启发**。这篇基于 Lilian Weng 的《LLM Powered Autonomous Agents》，原文结构包括 Agent 系统总览、Planning、Memory、Tool Use、案例和挑战等部分。原文发布时间是 2023 年 6 月 23 日，作者是 Lilian Weng。([Lil'Log](https://lilianweng.github.io/posts/2023-06-23-agent/))

你直接复制下面全部代码，新建文件保存为：

`lilian_agent_notes.html`

然后用浏览器打开。里面的图片用的是原博客图片链接；如果图片不显示，每张图下面都有“打开原图”的链接。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>LLM Powered Autonomous Agents 中文精读笔记</title>
<style>
body {
  font-family: "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
  line-height: 1.85;
  max-width: 1080px;
  margin: 40px auto;
  padding: 0 28px 100px;
  background: #f7f8fb;
  color: #1f2937;
}

h1 {
  font-size: 34px;
  line-height: 1.3;
  border-bottom: 5px solid #2563eb;
  padding-bottom: 14px;
  margin-bottom: 24px;
}

h2 {
  font-size: 27px;
  margin-top: 48px;
  padding: 12px 16px;
  border-left: 7px solid #2563eb;
  background: #eef4ff;
}

h3 {
  font-size: 21px;
  margin-top: 28px;
  color: #111827;
}

h4 {
  font-size: 18px;
  margin-top: 20px;
  color: #1f2937;
}

p {
  margin: 12px 0;
}

a {
  color: #2563eb;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.box {
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 12px;
  padding: 18px 22px;
  margin: 18px 0;
}

.note {
  background: #fff7d6;
  border-left: 6px solid #d6a800;
}

.train {
  background: #ecfdf3;
  border-left: 6px solid #16a34a;
}

.warn {
  background: #fff1f1;
  border-left: 6px solid #dc2626;
}

.term {
  background: #f5f0ff;
  border-left: 6px solid #7c3aed;
}

.figure {
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 14px;
  padding: 16px;
  margin: 22px 0;
}

.figure img {
  width: 100%;
  max-height: 620px;
  object-fit: contain;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}

.caption {
  font-size: 14px;
  color: #667085;
  margin-top: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 18px 0;
  background: #ffffff;
}

th, td {
  border: 1px solid #d9e2ef;
  padding: 11px 13px;
  vertical-align: top;
}

th {
  background: #f1f5f9;
}

code {
  background: #eef2f7;
  padding: 2px 5px;
  border-radius: 5px;
  font-family: Consolas, Monaco, monospace;
}

pre {
  background: #111827;
  color: #e5e7eb;
  padding: 18px;
  border-radius: 10px;
  overflow-x: auto;
  line-height: 1.55;
  font-family: Consolas, Monaco, monospace;
}

ul, ol {
  padding-left: 26px;
}

li {
  margin: 7px 0;
}

.small {
  color: #6b7280;
  font-size: 14px;
}

.toc a {
  display: block;
  padding: 9px 12px;
  margin: 6px 0;
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 9px;
}
</style>
</head>

<body>

<h1>《LLM Powered Autonomous Agents》中文精读笔记<br>后训练 Agent 学习版</h1>

<div class="box note">
<p><strong>原文标题：</strong>LLM Powered Autonomous Agents</p>
<p><strong>作者：</strong>Lilian Weng</p>
<p><strong>发布时间：</strong>2023 年 6 月 23 日</p>
<p><strong>原文链接：</strong><a href="https://lilianweng.github.io/posts/2023-06-23-agent/" target="_blank">点击打开原博客</a></p>
<p><strong>本文定位：</strong>这是一篇非常适合学习 Agent 基础结构的博客。它把 LLM Agent 拆成三个核心组件：Planning 规划、Memory 记忆、Tool Use 工具使用，并进一步讨论了 ReAct、Reflexion、HuggingGPT、API-Bank、Generative Agents 等代表性工作。</p>
</div>

<div class="box train">
<strong>总判断：</strong>
这篇文章适合当作“后训练 Agent”的第一篇系统精读材料。它虽然不是专门讲 SFT、DPO、GRPO 或 RLVR 的训练论文，但它把 Agent 的能力拆成了可以训练的模块：任务分解、动作选择、工具调用、记忆检索、反馈修正和长期规划。真正做 Agent 后训练时，训练目标并不是“让模型回答得更好”，而是让模型在多步轨迹中更稳定地选择正确动作。
</div>

<h2>目录</h2>

<div class="toc">
<a href="#overview">一、Agent System Overview：Agent 系统总览</a>
<a href="#planning">二、Planning：规划能力</a>
<a href="#react">三、ReAct：推理与行动结合</a>
<a href="#reflexion">四、Reflexion：自我反思与动态记忆</a>
<a href="#memory">五、Memory：记忆机制</a>
<a href="#mips">六、MIPS：向量检索与长期记忆</a>
<a href="#tool">七、Tool Use：工具使用</a>
<a href="#hugginggpt">八、HuggingGPT：LLM 作为任务控制器</a>
<a href="#apibank">九、API-Bank：工具调用评测</a>
<a href="#genagents">十、Generative Agents：生成式智能体仿真</a>
<a href="#challenges">十一、Challenges：Agent 的主要挑战</a>
<a href="#posttraining">十二、后训练 Agent 的学习路线</a>
<a href="#terms">十三、术语中英对照</a>
</div>

<h2 id="overview">一、Agent System Overview：Agent 系统总览</h2>

<p>
原文开头的核心判断是：当 LLM 作为 autonomous agent 的核心控制器时，它不只是一个文本生成器，而可以被理解为一个 general problem solver，即通用问题求解器。这个求解器要真正变成 Agent，不能只有语言生成能力，还需要规划、记忆和工具使用能力。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/agent-overview.png" alt="Overview of a LLM-powered autonomous agent system">
<div class="caption">
图 1：LLM-powered autonomous agent system 总览图。原图来源：Lilian Weng 博客。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/agent-overview.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片逐项解读</h3>

<table>
<tr>
<th>图中元素</th>
<th>中文解释</th>
<th>作用</th>
<th>后训练视角</th>
</tr>
<tr>
<td>Agent</td>
<td>智能体</td>
<td>中心控制单元，负责根据目标、记忆、工具和环境反馈决定下一步。</td>
<td>训练核心是让模型从当前状态中选择合适动作，而不是只生成最终答案。</td>
</tr>
<tr>
<td>Planning</td>
<td>规划</td>
<td>把复杂任务拆解为子目标，并决定执行顺序。</td>
<td>可以训练 task decomposition，即任务分解轨迹。</td>
</tr>
<tr>
<td>Memory</td>
<td>记忆</td>
<td>保存短期上下文与长期信息，使 Agent 能够利用历史经验。</td>
<td>训练模型何时写入、检索、压缩和使用记忆。</td>
</tr>
<tr>
<td>Tools</td>
<td>工具</td>
<td>连接日历、计算器、代码解释器、搜索等外部能力。</td>
<td>训练工具选择、参数生成、工具返回结果理解。</td>
</tr>
<tr>
<td>Action</td>
<td>动作</td>
<td>Agent 对环境采取的具体操作。</td>
<td>强化学习中的 action，可以用任务完成率或工具反馈评估。</td>
</tr>
<tr>
<td>Reflection / Self-critics / Chain of thoughts</td>
<td>反思 / 自我批评 / 思维链</td>
<td>帮助 Agent 检查过去行为、调整计划、改进下一步。</td>
<td>可作为 DPO 或 RLVR 中的中间监督信号。</td>
</tr>
</table>

<h3>中文总结</h3>

<p>
这张图是整篇文章最重要的入口。它说明：LLM Agent 不是“一个模型 + 一个 prompt”，而是一个由多个模块共同组成的系统。LLM 是 brain，即大脑；Planning 负责把目标拆成可操作步骤；Memory 负责存储和召回信息；Tools 负责让模型能够行动；Action 是模型对环境的具体操作。
</p>

<p>
如果从后训练角度看，这张图直接提示了训练对象：不要只训练“最终回答”，而要训练 Agent 在每一步如何规划、如何查找记忆、如何选择工具、如何根据反馈更新行动。
</p>

<div class="box train">
<strong>后训练启发：</strong>
这张图可以拆成五类训练任务：
<ol>
<li><strong>规划训练：</strong>给定目标，输出子目标和执行顺序。</li>
<li><strong>工具调用训练：</strong>给定上下文，选择合适工具并生成参数。</li>
<li><strong>记忆检索训练：</strong>给定当前任务，从长期记忆中检索相关内容。</li>
<li><strong>反思训练：</strong>给定失败轨迹，生成改进建议。</li>
<li><strong>动作选择训练：</strong>给定 observation，预测下一步 action。</li>
</ol>
</div>

<h2 id="planning">二、Planning：规划能力</h2>

<p>
原文认为，一个复杂任务通常包含许多步骤，Agent 必须知道这些步骤是什么，并提前规划。Planning 主要包含两个方向：Task Decomposition 任务分解，以及 Self-Reflection 自我反思。
</p>

<h3>1. Task Decomposition：任务分解</h3>

<p>
Task Decomposition 指的是把大任务拆成多个更小、更容易处理的子任务。原文提到 Chain of Thought，简称 CoT，即“思维链”，通过提示模型 step by step thinking，让模型把复杂问题分解成多个中间步骤。
</p>

<p>
Tree of Thoughts，简称 ToT，即“思维树”，则比 CoT 更进一步。CoT 通常是一条推理链，而 ToT 会在每一步生成多个可能的 thought，再通过 BFS 或 DFS 搜索不同路径。它的核心思想是：复杂任务不一定只有一条推理路径，模型应该探索多个候选路径。
</p>

<table>
<tr>
<th>方法</th>
<th>中文</th>
<th>核心思想</th>
<th>对 Agent 的意义</th>
</tr>
<tr>
<td>CoT, Chain of Thought</td>
<td>思维链</td>
<td>让模型一步一步推理。</td>
<td>适合线性分解问题。</td>
</tr>
<tr>
<td>ToT, Tree of Thoughts</td>
<td>思维树</td>
<td>每一步探索多个候选想法，形成树状搜索。</td>
<td>适合有多个可能路径的复杂任务。</td>
</tr>
<tr>
<td>LLM+P</td>
<td>LLM 加规划器</td>
<td>让 LLM 把问题转成 PDDL，再交给传统规划器。</td>
<td>适合机器人、规划问题等有明确规划语言的任务。</td>
</tr>
</table>

<h3>2. 中文总结</h3>

<p>
规划能力的关键，不是模型能不能“说出计划”，而是它能不能把计划转成可以执行、可以检查、可以修正的步骤。很多 Agent Demo 失败，并不是因为模型语言能力不够，而是因为它把任务拆错了，或者无法根据失败反馈修改计划。
</p>

<div class="box train">
<strong>后训练启发：</strong>
Planning 可以被训练成一种轨迹任务。数据格式可以是：
<pre>
用户目标 → 子任务列表 → 每个子任务需要的工具 → 执行顺序 → 完成标准
</pre>
后训练时，可以用好计划和坏计划构造 preference data：合理拆解为 chosen，不合理拆解为 rejected。
</div>

<h2 id="react">三、ReAct：推理与行动结合</h2>

<p>
ReAct 是 Reasoning and Acting 的缩写，即“推理与行动结合”。原文指出，ReAct 把语言空间中的 reasoning traces 和任务空间中的 discrete actions 结合起来，使模型能够一边思考，一边和环境互动。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/react.png" alt="ReAct reasoning trajectories">
<div class="caption">
图 2：ReAct 在知识密集型任务和决策任务中的推理轨迹示例。原图来源：Lilian Weng 博客引用 Yao et al. 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/react.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片解读</h3>

<p>
这张图展示了 ReAct 的基本工作方式：模型不是一次性回答问题，而是反复执行 Thought、Action、Observation 三个步骤。
</p>

<pre>
Thought: 当前我应该思考什么？
Action: 我应该调用什么动作或工具？
Observation: 环境或工具返回了什么？
Thought: 根据新观察，我下一步应该做什么？
Action: ...
Observation: ...
</pre>

<table>
<tr>
<th>ReAct 元素</th>
<th>中文解释</th>
<th>功能</th>
</tr>
<tr>
<td>Thought</td>
<td>思考</td>
<td>模型对当前状态的分析、假设和下一步策略。</td>
</tr>
<tr>
<td>Action</td>
<td>动作</td>
<td>模型对环境采取的操作，例如搜索、点击、调用 API。</td>
</tr>
<tr>
<td>Observation</td>
<td>观察</td>
<td>环境或工具返回的信息。</td>
</tr>
</table>

<h3>中文总结</h3>

<p>
ReAct 的重要性在于，它把 Agent 的推理过程从“封闭的文本生成”变成“开放的环境交互”。普通 CoT 只是在模型内部推理，而 ReAct 允许模型用外部反馈修正推理。对于 Agent 来说，这比单纯写长思维链更接近真实任务。
</p>

<div class="box train">
<strong>后训练启发：</strong>
ReAct 是 Agent 后训练最基础的数据格式之一。你可以把训练样本组织成：
<pre>
User Query
Thought
Action
Observation
Thought
Action
Observation
Final Answer
</pre>
其中 Action 是否正确、Observation 是否被正确利用、Final Answer 是否完成任务，都可以作为评测点。
</div>

<h2 id="reflexion">四、Reflexion：自我反思与动态记忆</h2>

<p>
原文把 Self-Reflection 称为自主 Agent 迭代改进的重要能力。Reflexion 是一个代表性框架，它为 Agent 加入动态记忆和自我反思机制，使 Agent 能从失败轨迹中总结经验，并改进下一轮行动。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/reflexion.png" alt="Reflexion framework">
<div class="caption">
图 3：Reflexion 框架。原图来源：Lilian Weng 博客引用 Shinn & Labash 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/reflexion.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片逐项解释</h3>

<table>
<tr>
<th>图中元素</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td>Query</td>
<td>任务输入</td>
<td>用户或环境给定的问题。</td>
</tr>
<tr>
<td>LLM</td>
<td>大语言模型</td>
<td>根据任务和记忆生成动作。</td>
</tr>
<tr>
<td>Action</td>
<td>动作</td>
<td>Agent 执行的具体操作。</td>
</tr>
<tr>
<td>Environment</td>
<td>环境</td>
<td>Agent 所处任务环境，例如问答环境、游戏环境、网页环境。</td>
</tr>
<tr>
<td>Reward</td>
<td>奖励</td>
<td>任务成功或失败的反馈。</td>
</tr>
<tr>
<td>Heuristic</td>
<td>启发式判断</td>
<td>判断轨迹是否低效、是否幻觉、是否应该停止。</td>
</tr>
<tr>
<td>Reflection</td>
<td>反思</td>
<td>LLM 根据失败轨迹生成改进建议，并写入记忆。</td>
</tr>
</table>

<h3>核心理解</h3>

<p>
Reflexion 的关键不是“模型自言自语”，而是把失败经验转成可复用记忆。也就是说，Agent 在一次任务失败后，不只是丢掉失败轨迹，而是把失败原因总结成一段 reflection，在后续尝试时作为上下文使用。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/reflexion-exp.png" alt="Reflexion experiment results">
<div class="caption">
图 4：Reflexion 在 AlfWorld 和 HotpotQA 上的实验结果。原图来源：Lilian Weng 博客引用 Shinn & Labash 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/reflexion-exp.png" target="_blank">打开原图</a>
</div>
</div>

<h3>实验图解读</h3>

<p>
图中可以看到，加入 Reflection 后，Agent 的成功率随 trial 增加而提高。左图 AlfWorld 中，带有反思机制的成功率明显上升；右图 HotpotQA 中，without reflection 的成功率基本停滞，而 with reflection 持续改善。这说明反思机制的价值在于让 Agent 利用过去失败经验，避免重复错误。
</p>

<div class="box train">
<strong>后训练启发：</strong>
Reflexion 可以转化为三类训练数据：
<ol>
<li><strong>失败轨迹 → 反思：</strong>训练模型总结失败原因。</li>
<li><strong>反思 + 新尝试 → 更好动作：</strong>训练模型利用 reflection 改进动作。</li>
<li><strong>好反思 vs 坏反思：</strong>构造 DPO 数据，让模型偏向更有效的反思。</li>
</ol>
</div>

<h2 id="memory">五、Memory：记忆机制</h2>

<p>
原文把 Memory 作为 Agent 的第二个核心组件。记忆不仅是聊天历史，也包括短期上下文、长期知识、经验轨迹和外部向量数据库。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/memory.png" alt="Types of memory">
<div class="caption">
图 5：人类记忆分类图。原图来源：Lilian Weng 博客。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/memory.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片逐项解释</h3>

<table>
<tr>
<th>记忆类型</th>
<th>中文翻译</th>
<th>在人类认知中的含义</th>
<th>映射到 LLM Agent</th>
</tr>
<tr>
<td>Sensory Memory</td>
<td>感觉记忆</td>
<td>短暂保存视觉、听觉、触觉等感官印象。</td>
<td>可类比为模型对原始输入的 embedding 表征。</td>
</tr>
<tr>
<td>Short-term Memory / Working Memory</td>
<td>短期记忆 / 工作记忆</td>
<td>保存当前正在处理的信息。</td>
<td>对应上下文窗口中的信息，即 in-context learning。</td>
</tr>
<tr>
<td>Long-term Memory</td>
<td>长期记忆</td>
<td>长期保存事实、经验、技能。</td>
<td>对应外部向量数据库、知识库、文件系统等。</td>
</tr>
<tr>
<td>Explicit / Declarative Memory</td>
<td>显性记忆 / 陈述性记忆</td>
<td>可以被有意识回忆的事实和事件。</td>
<td>用户偏好、历史对话、任务记录、事实知识。</td>
</tr>
<tr>
<td>Implicit / Procedural Memory</td>
<td>隐性记忆 / 程序性记忆</td>
<td>技能和习惯，比如骑车、打字。</td>
<td>模型参数中习得的模式，或者工具使用习惯。</td>
</tr>
</table>

<h3>中文总结</h3>

<p>
Agent 的记忆系统不能简单理解为“把所有历史都塞进 prompt”。上下文窗口有限，信息越多，噪声越多。因此记忆系统的关键是：什么信息值得保存，什么信息应该检索，什么信息需要压缩，什么信息应该遗忘。
</p>

<div class="box train">
<strong>后训练启发：</strong>
Memory 相关训练至少有四类：
<ol>
<li><strong>写入判断：</strong>当前信息是否值得存入长期记忆？</li>
<li><strong>检索判断：</strong>当前任务需要检索哪些历史信息？</li>
<li><strong>记忆压缩：</strong>把长历史压缩成短摘要。</li>
<li><strong>抗干扰训练：</strong>避免错误记忆、过期信息和无关信息影响决策。</li>
</ol>
</div>

<h2 id="mips">六、MIPS：向量检索与长期记忆</h2>

<p>
原文指出，外部记忆可以缓解 Transformer 上下文长度有限的问题。常见做法是把信息编码成 embedding，然后存入 vector store，查询时通过 Maximum Inner Product Search，简称 MIPS，即最大内积搜索，找出最相关的记忆。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/mips.png" alt="MIPS algorithms comparison">
<div class="caption">
图 6：MIPS 算法速度与召回率对比。原图来源：Lilian Weng 博客引用 Google Blog 2020。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/mips.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片解读</h3>

<p>
这张图的横轴是 Accuracy，也就是召回准确率；纵轴是 Speed，即每秒查询次数。图中不同曲线代表不同近似最近邻搜索算法。核心信息是：检索系统通常需要在速度和准确率之间做权衡。
</p>

<table>
<tr>
<th>算法</th>
<th>中文说明</th>
<th>作用</th>
</tr>
<tr>
<td>LSH</td>
<td>局部敏感哈希</td>
<td>把相似向量映射到同一桶中，加快搜索。</td>
</tr>
<tr>
<td>ANNOY</td>
<td>近似最近邻搜索库</td>
<td>使用随机投影树进行快速近似搜索。</td>
</tr>
<tr>
<td>HNSW</td>
<td>分层可导航小世界图</td>
<td>通过多层图结构快速找到近邻。</td>
</tr>
<tr>
<td>FAISS</td>
<td>Facebook AI Similarity Search</td>
<td>常用高性能向量检索库。</td>
</tr>
<tr>
<td>ScaNN</td>
<td>Scalable Nearest Neighbors</td>
<td>Google 提出的高效向量检索方法。</td>
</tr>
</table>

<h3>中文总结</h3>

<p>
长期记忆不是“无限上下文”，而是“外部存储 + 高效检索”。Agent 要想利用长期记忆，就必须解决三个问题：存什么、怎么检索、怎么使用检索结果。很多 Agent 出错不是因为没有记忆，而是因为检索到了错误或无关记忆。
</p>

<div class="box train">
<strong>后训练启发：</strong>
可以训练模型生成更好的检索 query，也可以训练模型判断检索结果是否可用。比如：
<pre>
任务 → 生成检索关键词 → 返回候选记忆 → 判断相关性 → 整合进下一步行动
</pre>
这类数据非常适合做 RAG-Agent 的 SFT 或偏好优化。
</div>

<h2 id="tool">七、Tool Use：工具使用</h2>

<p>
原文把 Tool Use 作为 Agent 的第三个核心组件。工具使用让 LLM 能够突破模型参数本身的限制，例如获取最新信息、运行代码、访问私有数据、调用计算器、调用专业模型等。
</p>

<h3>为什么工具重要？</h3>

<p>
大模型的知识主要来自训练数据，训练后模型参数很难频繁更新。因此，当前信息、实时数据、精确计算、数据库查询、代码执行等任务，不能只靠模型内部知识完成。工具调用让模型从“会说”变成“会做”。
</p>

<table>
<tr>
<th>工具类型</th>
<th>中文</th>
<th>例子</th>
<th>训练难点</th>
</tr>
<tr>
<td>Search API</td>
<td>搜索工具</td>
<td>网页搜索、文档搜索</td>
<td>什么时候搜索、搜索什么关键词。</td>
</tr>
<tr>
<td>Calculator</td>
<td>计算器</td>
<td>数学计算、单位换算</td>
<td>参数提取必须准确。</td>
</tr>
<tr>
<td>Code Interpreter</td>
<td>代码解释器</td>
<td>运行 Python、分析数据</td>
<td>要能读懂报错并修正。</td>
</tr>
<tr>
<td>Database API</td>
<td>数据库接口</td>
<td>查订单、查用户、查论文</td>
<td>字段、权限、查询条件要准确。</td>
</tr>
<tr>
<td>Specialist Model</td>
<td>专家模型</td>
<td>图像识别、语音识别、翻译模型</td>
<td>需要选择合适模型并解释结果。</td>
</tr>
</table>

<h3>MRKL、TALM、Toolformer 的区别</h3>

<table>
<tr>
<th>方法</th>
<th>中文解释</th>
<th>核心思想</th>
</tr>
<tr>
<td>MRKL</td>
<td>模块化推理、知识与语言系统</td>
<td>LLM 作为路由器，把任务分配给神经模块或符号模块。</td>
</tr>
<tr>
<td>TALM</td>
<td>工具增强语言模型</td>
<td>微调语言模型，让它学会调用外部工具 API。</td>
</tr>
<tr>
<td>Toolformer</td>
<td>工具自学习模型</td>
<td>模型通过判断 API 调用是否能提升输出质量，自动扩展工具调用数据。</td>
</tr>
</table>

<div class="box train">
<strong>后训练启发：</strong>
工具调用训练最关键的不是让模型知道“有工具”，而是让模型学会：
<ol>
<li>判断是否需要工具；</li>
<li>选择哪个工具；</li>
<li>生成合法参数；</li>
<li>理解工具返回结果；</li>
<li>根据结果决定是否再次调用工具。</li>
</ol>
</div>

<h2 id="hugginggpt">八、HuggingGPT：LLM 作为任务控制器</h2>

<p>
HuggingGPT 是原文介绍的典型工具使用案例。它让 ChatGPT 作为 task planner，即任务规划器，从 HuggingFace 平台选择合适模型完成任务。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/hugging-gpt.png" alt="HuggingGPT workflow">
<div class="caption">
图 7：HuggingGPT 工作流程。原图来源：Lilian Weng 博客引用 Shen et al. 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/hugging-gpt.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片逐项解释</h3>

<table>
<tr>
<th>阶段</th>
<th>英文</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td>I</td>
<td>Task Planning</td>
<td>任务规划</td>
<td>LLM 把用户请求拆成多个子任务。</td>
</tr>
<tr>
<td>II</td>
<td>Model Selection</td>
<td>模型选择</td>
<td>LLM 从候选模型中选择适合每个子任务的模型。</td>
</tr>
<tr>
<td>III</td>
<td>Task Execution</td>
<td>任务执行</td>
<td>被选中的专家模型执行具体任务。</td>
</tr>
<tr>
<td>IV</td>
<td>Response Generation</td>
<td>回答生成</td>
<td>LLM 汇总各模型结果，给用户最终回答。</td>
</tr>
</table>

<h3>中文总结</h3>

<p>
HuggingGPT 说明了 Agent 的一种典型模式：LLM 不一定亲自完成所有任务，而是作为 controller，即控制器，负责理解任务、拆解任务、选择工具、整合结果。这个模式和现在的多工具 Agent 很接近。
</p>

<div class="box train">
<strong>后训练启发：</strong>
HuggingGPT 可以拆成四个训练任务：
<ol>
<li><strong>任务解析：</strong>用户请求 → 子任务 JSON。</li>
<li><strong>依赖判断：</strong>判断子任务之间的先后关系。</li>
<li><strong>模型选择：</strong>子任务 → 最合适工具或模型。</li>
<li><strong>结果汇总：</strong>工具结果 → 面向用户的最终回答。</li>
</ol>
</div>

<h2 id="apibank">九、API-Bank：工具调用评测</h2>

<p>
API-Bank 是用于评测 tool-augmented LLM 的 benchmark。它关注模型是否能判断需要 API、找到合适 API、阅读文档、生成 API 调用，并根据 API 返回结果回答用户。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/api-bank-process.png" alt="API-Bank call process">
<div class="caption">
图 8：API-Bank 中 LLM 调用 API 的伪代码流程。原图来源：Lilian Weng 博客引用 Li et al. 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/api-bank-process.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片解读</h3>

<p>
这张图描述了模型调用 API 的完整流程。首先判断是否需要 API；如果需要，就搜索 API；找到 API 后读取文档；然后生成 API call；执行后检查返回结果；如果不满意，继续修改调用；最后基于 API 返回生成用户回答。
</p>

<h3>API-Bank 的三层能力</h3>

<table>
<tr>
<th>层级</th>
<th>英文</th>
<th>中文解释</th>
<th>能力要求</th>
</tr>
<tr>
<td>Level 1</td>
<td>Call API</td>
<td>调用 API</td>
<td>给定 API 描述，模型判断是否调用、如何调用、如何回应。</td>
</tr>
<tr>
<td>Level 2</td>
<td>Retrieve API</td>
<td>检索 API</td>
<td>模型需要搜索可能可用的 API，并阅读文档学习使用。</td>
</tr>
<tr>
<td>Level 3</td>
<td>Plan API Calls</td>
<td>规划 API 调用</td>
<td>面对模糊任务，模型需要多步调用多个 API。</td>
</tr>
</table>

<h3>中文总结</h3>

<p>
API-Bank 的价值在于，它把工具调用能力拆成了可评测的步骤。Agent 不是只要最后回答正确就行，还要看中间决策是否正确：是否该调用 API？调用哪个 API？参数是否正确？返回结果是否被正确使用？
</p>

<div class="box train">
<strong>后训练启发：</strong>
API-Bank 的流程可以直接转成 reward 设计：
<ol>
<li>是否需要 API：二分类奖励；</li>
<li>API 选择是否正确：工具选择奖励；</li>
<li>参数是否正确：schema 奖励；</li>
<li>是否根据结果再次调用：多轮策略奖励；</li>
<li>最终回答是否满足用户需求：任务完成奖励。</li>
</ol>
</div>

<h2 id="genagents">十、Generative Agents：生成式智能体仿真</h2>

<p>
Generative Agents 是一个非常有代表性的 Agent 案例。它让 25 个由 LLM 控制的虚拟角色生活在沙盒环境中，并通过记忆、规划和反思机制产生类似人类的社会行为。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/generative-agents.png" alt="Generative Agent architecture">
<div class="caption">
图 9：Generative Agents 架构。原图来源：Lilian Weng 博客引用 Park et al. 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/generative-agents.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片逐项解释</h3>

<table>
<tr>
<th>图中元素</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td>Perceive</td>
<td>感知</td>
<td>Agent 接收环境中的新事件和观察。</td>
</tr>
<tr>
<td>Memory Stream</td>
<td>记忆流</td>
<td>长期保存 Agent 的观察、事件和经验。</td>
</tr>
<tr>
<td>Retrieve</td>
<td>检索</td>
<td>从记忆流中取回与当前情境相关的记忆。</td>
</tr>
<tr>
<td>Retrieved Memories</td>
<td>被检索出的记忆</td>
<td>作为当前行动的上下文。</td>
</tr>
<tr>
<td>Reflect</td>
<td>反思</td>
<td>把低层事件总结成高层理解。</td>
</tr>
<tr>
<td>Plan</td>
<td>规划</td>
<td>根据记忆和当前情境制定行动计划。</td>
</tr>
<tr>
<td>Act</td>
<td>行动</td>
<td>Agent 在环境中执行具体行为。</td>
</tr>
</table>

<h3>中文总结</h3>

<p>
Generative Agents 的重点是：记忆不是简单记录，而是要参与行为生成。Agent 会感知环境，把观察写入记忆流；再根据相关性、时间近近度和重要性检索记忆；然后反思形成更高层理解；最后根据这些信息规划和行动。
</p>

<div class="box train">
<strong>后训练启发：</strong>
这类系统适合训练“长期任务中的行为一致性”。比如：
<ol>
<li>给定角色历史记忆，预测下一步行动；</li>
<li>给定一批观察，生成高层 reflection；</li>
<li>给定当前情境，检索相关记忆；</li>
<li>根据长期记忆保持角色行为一致。</li>
</ol>
</div>

<h2 id="challenges">十一、Challenges：Agent 的主要挑战</h2>

<p>
原文最后总结了 LLM-centered agents 的几个常见限制。这部分对后训练 Agent 特别重要，因为它指出了 Agent 失败的根源。
</p>

<table>
<tr>
<th>挑战</th>
<th>中文解释</th>
<th>表现</th>
<th>后训练方向</th>
</tr>
<tr>
<td>Finite context length</td>
<td>有限上下文长度</td>
<td>历史信息、工具返回、API 文档、长任务状态无法全部放进 prompt。</td>
<td>训练压缩、检索、记忆选择。</td>
</tr>
<tr>
<td>Long-term planning</td>
<td>长期规划困难</td>
<td>任务变长后，模型难以持续维护计划，也难以处理意外错误。</td>
<td>训练多步轨迹、失败恢复、计划修正。</td>
</tr>
<tr>
<td>Reliability of natural language interface</td>
<td>自然语言接口可靠性不足</td>
<td>模型输出格式错误、工具参数错误、无法稳定解析。</td>
<td>训练结构化输出、schema 遵循、工具调用格式。</td>
</tr>
</table>

<div class="box warn">
<strong>关键判断：</strong>
很多 Agent 系统的难点不是“模型不会说”，而是“模型输出不能稳定变成可执行动作”。因此，后训练 Agent 时要特别关注结构化输出、工具参数、错误恢复和停止条件。
</div>

<h2 id="posttraining">十二、后训练 Agent 的学习路线</h2>

<p>
根据这篇文章，可以把后训练 Agent 的路线拆成六个阶段。
</p>

<table>
<tr>
<th>阶段</th>
<th>训练目标</th>
<th>数据形式</th>
<th>适合方法</th>
</tr>
<tr>
<td>1. 工具调用格式</td>
<td>让模型输出合法工具调用。</td>
<td>任务 → 工具名 + 参数 JSON</td>
<td>SFT</td>
</tr>
<tr>
<td>2. 工具选择</td>
<td>让模型判断何时用哪个工具。</td>
<td>上下文 → 正确工具 / 错误工具</td>
<td>SFT / DPO</td>
</tr>
<tr>
<td>3. 任务分解</td>
<td>让模型把复杂目标拆成子任务。</td>
<td>用户目标 → 子目标列表</td>
<td>SFT / DPO</td>
</tr>
<tr>
<td>4. 多步 ReAct 轨迹</td>
<td>训练模型根据 Observation 继续行动。</td>
<td>Thought / Action / Observation 序列</td>
<td>SFT / GRPO / PPO</td>
</tr>
<tr>
<td>5. 自我反思</td>
<td>训练模型从失败轨迹中生成改进建议。</td>
<td>失败轨迹 → Reflection</td>
<td>SFT / DPO</td>
</tr>
<tr>
<td>6. 可验证奖励优化</td>
<td>用任务完成结果优化模型。</td>
<td>轨迹 → reward</td>
<td>RLVR / GRPO</td>
</tr>
</table>

<h3>一个可复现的小项目设计</h3>

<div class="box train">
<p><strong>项目名称：</strong>Mini Tool-use Agent 后训练</p>
<ol>
<li>准备三个工具：calculator、search_doc、run_python。</li>
<li>构造 200 条 SFT 数据，让模型学习什么时候调用哪个工具。</li>
<li>构造 chosen / rejected 数据，例如正确参数 vs 错误参数。</li>
<li>用 DPO 优化工具调用偏好。</li>
<li>加入简单可验证 reward，例如计算结果正确给 1，JSON 格式错误给 0。</li>
<li>最后训练多步 ReAct 轨迹，让模型根据工具返回继续行动。</li>
</ol>
</div>

<h2 id="terms">十三、术语中英对照</h2>

<table>
<tr>
<th>英文术语</th>
<th>中文译法</th>
<th>解释</th>
</tr>
<tr>
<td>Autonomous Agent</td>
<td>自主智能体</td>
<td>能够根据目标、环境反馈和内部状态自主行动的系统。</td>
</tr>
<tr>
<td>Agent Brain</td>
<td>智能体大脑</td>
<td>在 LLM Agent 中，LLM 通常作为核心控制器或决策器。</td>
</tr>
<tr>
<td>Planning</td>
<td>规划</td>
<td>把复杂任务拆成多个子目标，并确定执行顺序。</td>
</tr>
<tr>
<td>Task Decomposition</td>
<td>任务分解</td>
<td>把大任务拆成更小、更容易处理的子任务。</td>
</tr>
<tr>
<td>Self-Reflection</td>
<td>自我反思</td>
<td>根据过去行动和错误生成改进建议。</td>
</tr>
<tr>
<td>Memory</td>
<td>记忆</td>
<td>保存短期上下文、长期经验和外部知识。</td>
</tr>
<tr>
<td>Short-term Memory</td>
<td>短期记忆</td>
<td>当前上下文窗口中的信息。</td>
</tr>
<tr>
<td>Long-term Memory</td>
<td>长期记忆</td>
<td>外部向量库、文件系统、数据库等长期存储。</td>
</tr>
<tr>
<td>Tool Use</td>
<td>工具使用</td>
<td>模型调用外部工具、API、代码执行器或专业模型。</td>
</tr>
<tr>
<td>ReAct</td>
<td>推理—行动框架</td>
<td>通过 Thought、Action、Observation 循环结合推理与环境交互。</td>
</tr>
<tr>
<td>Reflexion</td>
<td>反思框架</td>
<td>让 Agent 从失败轨迹中生成反思，并写入动态记忆。</td>
</tr>
<tr>
<td>MIPS</td>
<td>最大内积搜索</td>
<td>在向量库中快速找到与查询最相关的记忆。</td>
</tr>
<tr>
<td>Vector Store</td>
<td>向量数据库 / 向量存储</td>
<td>保存 embedding 并支持相似度检索的外部记忆系统。</td>
</tr>
<tr>
<td>Trajectory</td>
<td>轨迹</td>
<td>Agent 从任务开始到结束的观察、动作、反馈和输出序列。</td>
</tr>
<tr>
<td>RLVR</td>
<td>可验证奖励强化学习</td>
<td>使用可自动验证的结果作为奖励信号，例如测试通过、答案正确。</td>
</tr>
</table>

<h2>十四、最终总结</h2>

<div class="box note">
<p>
Lilian Weng 这篇文章的核心价值在于，它把 LLM Agent 从一个模糊概念拆成了清晰结构：LLM 作为大脑，Planning 负责规划，Memory 负责经验保存与召回，Tool Use 负责外部行动，Reflection 负责从错误中学习。
</p>

<p>
从后训练 Agent 的角度看，这篇文章的启发是：我们不应该只训练模型生成最终答案，而应该训练模型在整个任务轨迹中的行为能力。也就是训练它如何分解任务、如何选择工具、如何解释工具返回、如何反思失败、如何更新计划、如何判断停止。
</p>

<p>
一句话概括：<strong>后训练 Agent 的核心不是让模型“更会说”，而是让模型在“观察—行动—反馈”的循环中更稳定地做出正确决策。</strong>
</p>
</div>

<p class="small">
说明：本文为中文学习笔记与图片解读。图片均通过原博客图片链接引用，版权归原作者或原图来源所有。原文：Lilian Weng, “LLM Powered Autonomous Agents.”
</p>

</body>
</html>
```

---

# you asked

message time: 2026-06-07 16:19:55

可以 在详细点吗 最好 有人家的博客图片 按照路线分快来

---

# chatgpt response

可以，这次我按“学习路线分块”来做，不再只是按原文顺序概括。每一块都会包含：原文图片、图片细讲、核心概念、后训练 Agent 视角、可以怎么复现。

可以。我重新按**学习路线分块**做一版更详细的 HTML，不按原文机械顺序，而是按你学习“后训练 Agent”的路线来组织：

**路线 1：Agent 总览 → 路线 2：Planning 规划 → 路线 3：Reflection 反思 → 路线 4：Memory 记忆 → 路线 5：Tool Use 工具使用 → 路线 6：Case Study 案例 → 路线 7：后训练启发。**

这篇博客原文把 LLM Agent 概括为：LLM 作为 agent brain，并由 Planning、Memory、Tool Use 三个关键组件补充；其中 Planning 包括任务分解和反思修正，Memory 包括短期记忆与长期记忆，Tool Use 则让 Agent 调用外部 API、代码执行器、搜索等工具。([lilianweng.github.io](https://lilianweng.github.io/posts/2023-06-23-agent/))

下面是完整 HTML。复制全部内容，保存为：

`lilian_agent_detailed_route.html`

然后用浏览器打开。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>LLM Powered Autonomous Agents 中文精读：后训练 Agent 路线版</title>
<style>
body {
  font-family: "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
  line-height: 1.85;
  max-width: 1120px;
  margin: 38px auto;
  padding: 0 30px 100px;
  background: #f7f8fb;
  color: #1f2937;
}
h1 {
  font-size: 34px;
  line-height: 1.35;
  border-bottom: 5px solid #2563eb;
  padding-bottom: 16px;
}
h2 {
  margin-top: 50px;
  padding: 12px 16px;
  font-size: 27px;
  background: #eef4ff;
  border-left: 7px solid #2563eb;
}
h3 {
  margin-top: 30px;
  font-size: 22px;
  color: #111827;
}
h4 {
  margin-top: 22px;
  font-size: 18px;
}
p {
  margin: 12px 0;
}
a {
  color: #2563eb;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.box {
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 12px;
  padding: 18px 22px;
  margin: 18px 0;
}
.note {
  background: #fff7d6;
  border-left: 6px solid #d6a800;
}
.train {
  background: #ecfdf3;
  border-left: 6px solid #16a34a;
}
.warn {
  background: #fff1f1;
  border-left: 6px solid #dc2626;
}
.term {
  background: #f5f0ff;
  border-left: 6px solid #7c3aed;
}
.figure {
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 14px;
  padding: 16px;
  margin: 24px 0;
}
.figure img {
  width: 100%;
  max-height: 680px;
  object-fit: contain;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}
.caption {
  color: #667085;
  font-size: 14px;
  margin-top: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 18px 0;
  background: #ffffff;
}
th, td {
  border: 1px solid #d9e2ef;
  padding: 11px 13px;
  vertical-align: top;
}
th {
  background: #f1f5f9;
}
pre {
  background: #111827;
  color: #e5e7eb;
  padding: 18px;
  border-radius: 10px;
  overflow-x: auto;
  line-height: 1.55;
  font-family: Consolas, Monaco, monospace;
}
code {
  background: #eef2f7;
  padding: 2px 5px;
  border-radius: 5px;
  font-family: Consolas, Monaco, monospace;
}
ul, ol {
  padding-left: 26px;
}
li {
  margin: 7px 0;
}
.small {
  color: #6b7280;
  font-size: 14px;
}
.toc a {
  display: block;
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 9px;
  padding: 9px 12px;
  margin: 7px 0;
}
.route {
  font-weight: bold;
  color: #2563eb;
}
hr {
  border: none;
  border-top: 1px solid #d9e2ef;
  margin: 34px 0;
}
</style>
</head>

<body>

<h1>《LLM Powered Autonomous Agents》中文精读笔记<br>后训练 Agent 学习路线版</h1>

<div class="box note">
<p><strong>原文标题：</strong>LLM Powered Autonomous Agents</p>
<p><strong>作者：</strong>Lilian Weng</p>
<p><strong>发布时间：</strong>2023 年 6 月 23 日</p>
<p><strong>原文链接：</strong><a href="https://lilianweng.github.io/posts/2023-06-23-agent/" target="_blank">打开原博客</a></p>
<p><strong>阅读目标：</strong>不是泛泛了解 Agent，而是围绕“后训练 Agent”学习：模型应该如何规划、如何调用工具、如何使用记忆、如何从失败轨迹中反思、如何把环境反馈转化为训练信号。</p>
</div>

<div class="box train">
<strong>总判断：</strong>
这篇博客适合当作后训练 Agent 的第一篇系统精读材料。它的价值不在于给出某个框架代码，而在于把 Agent 拆成了几个可训练模块：
Planning 规划、Memory 记忆、Tool Use 工具使用、Reflection 反思、Trajectory 轨迹、Environment Feedback 环境反馈。
真正做后训练时，不是只让模型回答得更像人，而是让模型在“观察—行动—反馈”的多步过程中更稳定地做出正确动作。
</div>

<h2>目录：按照后训练 Agent 学习路线分块</h2>

<div class="toc">
<a href="#route1">路线一：Agent 总览——先知道 Agent 系统由什么组成</a>
<a href="#route2">路线二：Planning 规划——从任务分解到多路径搜索</a>
<a href="#route3">路线三：Reflection 反思——从失败轨迹中学习</a>
<a href="#route4">路线四：Memory 记忆——短期上下文与长期向量记忆</a>
<a href="#route5">路线五：Tool Use 工具使用——从工具调用到 API 评测</a>
<a href="#route6">路线六：Case Studies 案例——HuggingGPT、API-Bank、Generative Agents</a>
<a href="#route7">路线七：后训练 Agent 训练路线——SFT、DPO、RLVR 怎么接上</a>
<a href="#terms">术语表：英文术语 + 中文解释</a>
</div>

<h2 id="route1">路线一：Agent 总览——先知道 Agent 系统由什么组成</h2>

<p>
原文开篇的核心判断是：当 LLM 作为 autonomous agent 的核心控制器时，它不再只是文本生成模型，而可以被理解为一种 general problem solver，即通用问题求解器。要让 LLM 真正成为 Agent，需要补上三个关键组件：Planning 规划、Memory 记忆、Tool Use 工具使用。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/agent-overview.png" alt="Overview of a LLM-powered autonomous agent system">
<div class="caption">
图 1：Overview of a LLM-powered autonomous agent system。原图来源：Lilian Weng 博客。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/agent-overview.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片详细解读</h3>

<table>
<tr>
<th>原图元素</th>
<th>中文解释</th>
<th>在 Agent 中的作用</th>
<th>后训练时训练什么</th>
</tr>
<tr>
<td>Agent</td>
<td>智能体中心</td>
<td>整个系统的决策中心。它接收任务、调用记忆、规划步骤、选择工具、输出动作。</td>
<td>训练模型根据当前状态选择下一步 action，而不是只训练最终答案。</td>
</tr>
<tr>
<td>Planning</td>
<td>规划模块</td>
<td>负责把大任务拆成子任务，并决定执行顺序。图中与 Reflection、Self-critics、Chain of Thoughts、Subgoal Decomposition 相连。</td>
<td>训练任务分解、计划生成、失败后重新规划。</td>
</tr>
<tr>
<td>Memory</td>
<td>记忆模块</td>
<td>包括 Short-term memory 短期记忆和 Long-term memory 长期记忆。短期记忆主要对应上下文窗口，长期记忆通常对应外部向量数据库。</td>
<td>训练写入记忆、检索记忆、压缩记忆、过滤无关记忆。</td>
</tr>
<tr>
<td>Tools</td>
<td>工具模块</td>
<td>包括 Calendar、Calculator、Code Interpreter、Search 等外部工具。工具让 LLM 具备超出语言生成的行动能力。</td>
<td>训练工具选择、参数生成、工具结果解释、多轮工具调用。</td>
</tr>
<tr>
<td>Action</td>
<td>动作</td>
<td>Agent 对环境执行的操作。可能是搜索、运行代码、查询日历、调用 API、写文件等。</td>
<td>训练 observation → action 的策略。</td>
</tr>
<tr>
<td>Reflection</td>
<td>反思</td>
<td>根据过去行为总结错误、修正计划。</td>
<td>训练失败轨迹 → 反思文本 → 改进行动。</td>
</tr>
<tr>
<td>Self-critics</td>
<td>自我批评</td>
<td>模型评估自己过去的动作是否合理。</td>
<td>可构造好/坏批评作为 DPO 偏好数据。</td>
</tr>
<tr>
<td>Chain of Thoughts</td>
<td>思维链</td>
<td>让模型显式分步推理。</td>
<td>训练可解释中间步骤，但在实际产品中可转成内部 reasoning trace。</td>
</tr>
<tr>
<td>Subgoal Decomposition</td>
<td>子目标分解</td>
<td>把一个大目标拆成多个可执行小目标。</td>
<td>训练任务拆解数据。</td>
</tr>
</table>

<h3>这一图最重要的理解</h3>

<p>
这张图不是在说“Agent = LLM + 几个插件”。它真正强调的是：Agent 是一个闭环系统。模型不是一次性回答，而是需要在任务中不断规划、行动、观察反馈、再规划。对于后训练 Agent 来说，训练对象也因此发生变化：从“输入—输出”变成“状态—动作—反馈—下一状态”。
</p>

<div class="box train">
<strong>后训练 Agent 启发：</strong>
这张图可以拆成五个训练任务：
<ol>
<li><strong>规划训练：</strong>给定用户目标，输出子目标列表和执行顺序。</li>
<li><strong>工具训练：</strong>给定上下文，判断是否调用工具、调用哪个工具、参数如何填写。</li>
<li><strong>记忆训练：</strong>判断当前信息是否应该写入长期记忆，并在需要时检索。</li>
<li><strong>反思训练：</strong>给定失败轨迹，总结失败原因并提出改进策略。</li>
<li><strong>动作训练：</strong>给定 Observation，生成下一步 Action。</li>
</ol>
</div>

<hr>

<h2 id="route2">路线二：Planning 规划——从任务分解到多路径搜索</h2>

<p>
Planning 是 Agent 的第一核心能力。原文说，一个复杂任务通常包含很多步骤，Agent 必须知道这些步骤是什么，并提前规划。这里可以分为两层：第一层是 Task Decomposition，即任务分解；第二层是计划搜索，也就是在多个可能路径中选择更好的路径。
</p>

<h3>2.1 Chain of Thought：思维链</h3>

<p>
CoT，即 Chain of Thought，中文通常译为“思维链”。它的基本做法是让模型“think step by step”，也就是一步一步推理。它能把一个大问题拆成多个小步骤，从而提高复杂任务表现。
</p>

<table>
<tr>
<th>项目</th>
<th>解释</th>
</tr>
<tr>
<td>英文术语</td>
<td>Chain of Thought, CoT</td>
</tr>
<tr>
<td>中文译法</td>
<td>思维链</td>
</tr>
<tr>
<td>核心作用</td>
<td>把复杂问题拆成中间推理步骤。</td>
</tr>
<tr>
<td>Agent 中的意义</td>
<td>让模型在行动前形成一个局部计划。</td>
</tr>
<tr>
<td>局限</td>
<td>CoT 通常是一条线性路径，容易在早期推理错了以后一路错下去。</td>
</tr>
</table>

<h3>2.2 Tree of Thoughts：思维树</h3>

<p>
ToT，即 Tree of Thoughts，中文可以译为“思维树”。它不是只生成一条思维链，而是在每一步生成多个候选 thought，然后通过 BFS 或 DFS 搜索不同路径。它适合那些路径不唯一、需要探索的任务。
</p>

<table>
<tr>
<th>比较项</th>
<th>CoT 思维链</th>
<th>ToT 思维树</th>
</tr>
<tr>
<td>结构</td>
<td>线性链条</td>
<td>树状搜索</td>
</tr>
<tr>
<td>每一步候选</td>
<td>通常一个</td>
<td>多个</td>
</tr>
<tr>
<td>适合任务</td>
<td>数学题、逻辑题、问答推理</td>
<td>复杂规划、博弈、创意生成、多方案任务</td>
</tr>
<tr>
<td>后训练重点</td>
<td>训练分步推理</td>
<td>训练候选生成、路径评价、剪枝选择</td>
</tr>
</table>

<h3>2.3 LLM+P：让 LLM 调用外部规划器</h3>

<p>
原文还提到 LLM+P。这里的 P 是 Planner，即规划器。它的思路是：让 LLM 先把自然语言任务转成 PDDL 这类规划语言，再交给传统规划器生成计划，最后让 LLM 把计划翻译回自然语言。
</p>

<pre>
用户任务
  ↓
LLM 把任务转成 Problem PDDL
  ↓
Classical Planner 根据 Domain PDDL 生成计划
  ↓
LLM 把计划翻译回自然语言
  ↓
Agent 执行
</pre>

<div class="box note">
<strong>关键理解：</strong>
LLM+P 说明：Agent 的规划能力不一定完全由 LLM 自己完成。LLM 可以作为自然语言接口，把问题转给更可靠的外部规划器。这一点和工具调用思路是一致的：模型不一定亲自做所有事情，而是学会调用合适的外部能力。
</div>

<h3>2.4 后训练 Agent 怎么训练 Planning？</h3>

<table>
<tr>
<th>训练目标</th>
<th>数据格式</th>
<th>训练方法</th>
</tr>
<tr>
<td>子目标分解</td>
<td>用户目标 → 子目标列表</td>
<td>SFT</td>
</tr>
<tr>
<td>计划排序</td>
<td>子目标集合 → 合理执行顺序</td>
<td>SFT / DPO</td>
</tr>
<tr>
<td>计划优劣判断</td>
<td>好计划 vs 坏计划</td>
<td>DPO</td>
</tr>
<tr>
<td>计划修正</td>
<td>失败计划 + 错误反馈 → 新计划</td>
<td>SFT / RLVR</td>
</tr>
<tr>
<td>长期规划</td>
<td>多轮 Observation → 下一步计划</td>
<td>GRPO / PPO / 轨迹 SFT</td>
</tr>
</table>

<div class="box train">
<strong>这一块的学习重点：</strong>
Planning 后训练的关键不是让模型写出“看起来很完整”的计划，而是让计划可执行、可检查、可修正。一个好的计划应该包含：子目标、依赖关系、工具需求、完成标准和失败恢复策略。
</div>

<hr>

<h2 id="route3">路线三：Reflection 反思——从失败轨迹中学习</h2>

<p>
原文把 Self-Reflection 视为自主 Agent 迭代改进的重要机制。原因很简单：真实任务中 trial and error 是不可避免的，Agent 不可能每一步都做对。所以关键不是永远不犯错，而是犯错后能不能发现、总结、修正。
</p>

<h3>3.1 ReAct：Reasoning and Acting，推理与行动结合</h3>

<p>
ReAct 是这篇博客里最重要的 Agent 框架之一。它把 Reasoning traces，即推理轨迹，和 Actions，即环境动作，结合在一起。模型不再只是内部推理，而是在每一步执行动作，并根据环境返回的 Observation 继续思考。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/react.png" alt="ReAct reasoning trajectories">
<div class="caption">
图 2：ReAct reasoning trajectories。左侧是 HotpotQA，右侧是 AlfWorld Env。原图来源：Lilian Weng 博客引用 Yao et al. 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/react.png" target="_blank">打开原图</a>
</div>
</div>

<h4>图片详细解读</h4>

<table>
<tr>
<th>图中部分</th>
<th>中文解释</th>
<th>说明</th>
</tr>
<tr>
<td>HotpotQA</td>
<td>知识密集型问答任务</td>
<td>模型需要通过搜索来回答多跳问题。图中模型多次 Search，并根据搜索结果继续判断。</td>
</tr>
<tr>
<td>AlfWorld Env</td>
<td>具身决策环境</td>
<td>模型需要在一个环境中执行动作，例如移动、打开柜子、拿起物品、放置物品。</td>
</tr>
<tr>
<td>Thought</td>
<td>思考</td>
<td>模型对当前情况的推理。例如“我需要搜索某个关键词”或“我现在找到目标物了”。</td>
</tr>
<tr>
<td>Action</td>
<td>动作</td>
<td>模型执行的外部动作，例如 Search、Go to、Take、Open、Put。</td>
</tr>
<tr>
<td>Observation</td>
<td>观察</td>
<td>环境或工具返回的信息，决定模型下一步怎么做。</td>
</tr>
<tr>
<td>绿色高亮</td>
<td>关键信息</td>
<td>代表模型通过搜索或环境反馈得到的关键证据。</td>
</tr>
<tr>
<td>蓝色高亮</td>
<td>推理片段</td>
<td>显示模型如何根据当前状态制定下一步动作。</td>
</tr>
</table>

<h4>ReAct 的标准轨迹格式</h4>

<pre>
User Query: 用户任务

Thought 1: 我需要先判断问题需要什么信息。
Action 1: Search[关键词]
Observation 1: 搜索返回结果。

Thought 2: 根据结果，我还需要查另一个实体。
Action 2: Search[新关键词]
Observation 2: 新搜索结果。

Thought 3: 现在证据足够，可以回答。
Action 3: Finish[最终答案]
</pre>

<h4>中文总结</h4>

<p>
ReAct 的价值在于，它把“想”和“做”连接起来。普通 CoT 只是在模型内部推理，ReAct 则让模型用外部环境验证和修正推理。对 Agent 来说，这非常关键，因为很多任务不是靠模型参数记忆就能完成，而是要通过搜索、执行、观察、再行动来完成。
</p>

<div class="box train">
<strong>后训练启发：</strong>
ReAct 是最适合做 Agent SFT 的数据格式之一。训练样本不应该只有：
<pre>
User → Answer
</pre>
而应该是：
<pre>
User → Thought → Action → Observation → Thought → Action → Observation → Final Answer
</pre>
其中 Action 是否正确、Observation 是否被正确利用、最终任务是否完成，都可以成为评测点。
</div>

<h3>3.2 Reflexion：带动态记忆的反思框架</h3>

<p>
Reflexion 是原文介绍的另一个重要框架。它让 Agent 在每次尝试后根据 reward 和 heuristic 判断是否失败，并把失败经验总结成 Reflection，写入 working memory，用于下一次尝试。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/reflexion.png" alt="Reflexion framework">
<div class="caption">
图 3：Reflexion framework。原图来源：Lilian Weng 博客引用 Shinn & Labash 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/reflexion.png" target="_blank">打开原图</a>
</div>
</div>

<h4>图片详细解读</h4>

<table>
<tr>
<th>图中元素</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td>Query</td>
<td>任务输入</td>
<td>当前任务或问题。</td>
</tr>
<tr>
<td>LLM</td>
<td>大语言模型</td>
<td>根据任务和已有记忆生成动作。</td>
</tr>
<tr>
<td>Action</td>
<td>动作</td>
<td>Agent 执行的具体操作。</td>
</tr>
<tr>
<td>Environment</td>
<td>环境</td>
<td>动作发生的场景，例如问答环境、游戏环境、网页环境。</td>
</tr>
<tr>
<td>Reward</td>
<td>奖励</td>
<td>环境给出的成功或失败反馈。</td>
</tr>
<tr>
<td>Heuristic</td>
<td>启发式判断</td>
<td>判断轨迹是否低效、是否陷入幻觉、是否需要重置。</td>
</tr>
<tr>
<td>Reflection</td>
<td>反思</td>
<td>LLM 根据失败轨迹生成改进建议，并放回记忆中。</td>
</tr>
</table>

<p>
图中上半部分是 ReAct：Query → LLM → Action → Environment → Reward。下半部分是 Reflect：轨迹和奖励进入 Heuristic，再触发 Reflection。也就是说，Reflexion 在 ReAct 之外加了“失败后总结经验”的机制。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/reflexion-exp.png" alt="Reflexion experiment results">
<div class="caption">
图 4：Reflexion 在 AlfWorld 和 HotpotQA 上的实验结果。原图来源：Lilian Weng 博客引用 Shinn & Labash 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/reflexion-exp.png" target="_blank">打开原图</a>
</div>
</div>

<h4>实验图解读</h4>

<p>
这张图展示了 Reflexion 的实验效果。左图是 AlfWorld 环境，右图是 HotpotQA 问答任务。蓝线表示带有 Reflection 的成功率，红线表示没有 Reflection 的成功率。可以看到，随着 trial 增加，带有 Reflection 的 Agent 成功率明显上升，而没有 Reflection 的模型提升有限。
</p>

<p>
左图中还有失败类型：Hallucination，即幻觉失败；Inefficient Planning，即低效规划。反思机制的作用就是减少这些重复失败，让 Agent 不再反复走同样的错误路径。
</p>

<div class="box train">
<strong>Reflexion 对后训练的价值：</strong>
可以构造三类训练数据：
<ol>
<li><strong>失败轨迹 → 反思：</strong>训练模型总结错误原因。</li>
<li><strong>反思 + 新任务状态 → 改进行动：</strong>训练模型利用反思改变下一步。</li>
<li><strong>好反思 vs 坏反思：</strong>用 DPO 训练模型偏向有效反思。</li>
</ol>
</div>

<h3>3.3 Chain of Hindsight：从反馈序列中学习改进趋势</h3>

<p>
Chain of Hindsight，简称 CoH，可以译为“事后反馈链”。它的思想是把模型过去的多个输出与反馈一起放进上下文，让模型学习“如何从较差输出逐步改进到较好输出”。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/CoH.png" alt="Chain of Hindsight">
<div class="caption">
图 5：Chain of Hindsight。原图来源：Lilian Weng 博客引用 Liu et al. 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/CoH.png" target="_blank">打开原图</a>
</div>
</div>

<h4>中文理解</h4>

<p>
CoH 的重点不是单独看一个答案，而是看一串“答案—反馈—更好答案”的改进链条。模型通过这种序列学习一种趋势：什么样的修改会让输出变好，什么样的反馈值得采纳。
</p>

<div class="box train">
<strong>后训练启发：</strong>
CoH 和 DPO 很接近，但比单纯 chosen/rejected 更细。DPO 通常只比较一对好坏答案，而 CoH 可以让模型看到连续改进过程。这对训练 Agent 的反思能力很有用。
</div>

<h3>3.4 Algorithm Distillation：把强化学习过程蒸馏进模型</h3>

<p>
Algorithm Distillation，简称 AD，可以理解为“算法蒸馏”。它不是只蒸馏专家动作，而是把一个强化学习算法跨 episode 的学习历史拼接起来，让模型学会“如何学习”。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/algorithm-distillation.png" alt="Algorithm Distillation">
<div class="caption">
图 6：Algorithm Distillation 工作方式。原图来源：Lilian Weng 博客引用 Laskin et al. 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/algorithm-distillation.png" target="_blank">打开原图</a>
</div>
</div>

<h4>图片解读</h4>

<table>
<tr>
<th>图中部分</th>
<th>中文解释</th>
<th>意义</th>
</tr>
<tr>
<td>Data Generation</td>
<td>数据生成</td>
<td>多个任务中生成 RL algorithm learning histories，即强化学习算法的学习历史。</td>
</tr>
<tr>
<td>learning progress</td>
<td>学习进展</td>
<td>同一任务中，随着 episode 推进，策略逐步变好。</td>
</tr>
<tr>
<td>Model Training</td>
<td>模型训练</td>
<td>把 observation、action、reward 序列输入 Causal Transformer。</td>
</tr>
<tr>
<td>Predict actions</td>
<td>预测动作</td>
<td>模型根据跨 episode 上下文预测下一步动作。</td>
</tr>
</table>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/algorithm-distillation-results.png" alt="Algorithm Distillation results">
<div class="caption">
图 7：Algorithm Distillation 实验结果。原图来源：Lilian Weng 博客引用 Laskin et al. 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/algorithm-distillation-results.png" target="_blank">打开原图</a>
</div>
</div>

<h4>实验图解读</h4>

<p>
图中对比了 AD、ED、Source policy 和 RL²。AD 的曲线在多个环境中明显优于 ED。ED 是 expert distillation，即专家蒸馏，只学习专家动作；AD 则学习“从差到好”的训练历史，因此更接近学习一个算法过程。
</p>

<div class="box train">
<strong>后训练 Agent 启发：</strong>
对于 Agent 后训练来说，AD 的意义很大：我们不只是训练“当前最优动作”，还可以训练“如何根据过去尝试逐步变好”。这和 Reflexion、CoH、RLVR 的思想是连在一起的。
</div>

<hr>

<h2 id="route4">路线四：Memory 记忆——短期上下文与长期向量记忆</h2>

<p>
Memory 是 Agent 的第二核心能力。原文把记忆分为人类认知中的感觉记忆、短期记忆、长期记忆，并把它们映射到 LLM Agent 中。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/memory.png" alt="Types of memory">
<div class="caption">
图 8：Types of memory。原图来源：Lilian Weng 博客。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/memory.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片详细解读</h3>

<table>
<tr>
<th>原图记忆类型</th>
<th>中文翻译</th>
<th>人类认知含义</th>
<th>映射到 LLM Agent</th>
</tr>
<tr>
<td>Sensory Memory</td>
<td>感觉记忆</td>
<td>非常短暂地保存视觉、听觉、触觉等输入印象。</td>
<td>可类比为对原始输入的 embedding 表征，例如文本、图像、语音的向量表示。</td>
</tr>
<tr>
<td>Iconic Memory</td>
<td>图像记忆</td>
<td>视觉信息的短暂保存。</td>
<td>图像输入的视觉 embedding。</td>
</tr>
<tr>
<td>Echoic Memory</td>
<td>回声记忆</td>
<td>听觉信息的短暂保存。</td>
<td>语音输入的音频 embedding。</td>
</tr>
<tr>
<td>Haptic Memory</td>
<td>触觉记忆</td>
<td>触觉信息的短暂保存。</td>
<td>机器人或具身智能体的传感器输入。</td>
</tr>
<tr>
<td>Short-term Memory / Working Memory</td>
<td>短期记忆 / 工作记忆</td>
<td>当前正在意识中处理的信息。</td>
<td>对应上下文窗口，也就是 prompt 里当前可见的信息。</td>
</tr>
<tr>
<td>Long-term Memory</td>
<td>长期记忆</td>
<td>长期保存事实、事件、技能。</td>
<td>对应外部向量数据库、文件系统、知识库、历史轨迹库。</td>
</tr>
<tr>
<td>Explicit / Declarative Memory</td>
<td>显性记忆 / 陈述性记忆</td>
<td>可以被有意识回忆的事实和事件。</td>
<td>用户偏好、项目背景、历史对话、任务事实。</td>
</tr>
<tr>
<td>Implicit / Procedural Memory</td>
<td>隐性记忆 / 程序性记忆</td>
<td>技能、习惯、程序性知识。</td>
<td>模型参数中学到的工具使用习惯、推理模式、格式模式。</td>
</tr>
</table>

<h3>短期记忆 vs 长期记忆</h3>

<table>
<tr>
<th>维度</th>
<th>短期记忆 Short-term Memory</th>
<th>长期记忆 Long-term Memory</th>
</tr>
<tr>
<td>LLM 中的对应物</td>
<td>上下文窗口</td>
<td>外部向量数据库 / 文件 / 知识库</td>
</tr>
<tr>
<td>优点</td>
<td>立即可用，不需要检索</td>
<td>容量大，可长期保存</td>
</tr>
<tr>
<td>缺点</td>
<td>窗口有限，容易被长上下文挤掉</td>
<td>检索可能不准，会取回无关或过期信息</td>
</tr>
<tr>
<td>后训练重点</td>
<td>上下文压缩、关键信息保留</td>
<td>写入判断、检索查询、相关性判断、遗忘机制</td>
</tr>
</table>

<div class="box note">
<strong>重要判断：</strong>
Agent 的 Memory 不是“把所有东西都存下来”。更重要的是：什么值得存、什么时候取、取出来之后怎么用、过期或错误信息怎么清理。
</div>

<h3>4.1 MIPS：Maximum Inner Product Search，最大内积搜索</h3>

<p>
原文指出，外部记忆通常通过 embedding + vector store 实现。查询时使用 Maximum Inner Product Search，即最大内积搜索，快速找出和当前 query 最相关的记忆。为了提高速度，实际系统常用 ANN，即 Approximate Nearest Neighbors，近似最近邻算法。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/mips.png" alt="MIPS algorithms comparison">
<div class="caption">
图 9：MIPS algorithms comparison。原图来源：Lilian Weng 博客引用 Google Blog 2020。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/mips.png" target="_blank">打开原图</a>
</div>
</div>

<h4>图片解读</h4>

<p>
这张图比较了不同 MIPS / ANN 算法在 recall@10 下的速度和准确性。横轴可以理解为准确率，纵轴可以理解为查询速度。核心问题是：记忆检索必须在速度和准确率之间权衡。Agent 如果检索太慢，任务成本很高；如果检索不准，又会引入错误上下文。
</p>

<table>
<tr>
<th>算法</th>
<th>中文解释</th>
<th>大致特点</th>
</tr>
<tr>
<td>LSH</td>
<td>局部敏感哈希</td>
<td>把相似向量映射到相同桶中，速度快但精度可能有限。</td>
</tr>
<tr>
<td>ANNOY</td>
<td>近似最近邻搜索库</td>
<td>基于随机投影树，工程上简单好用。</td>
</tr>
<tr>
<td>HNSW</td>
<td>分层可导航小世界图</td>
<td>通过多层图结构快速搜索，常用于向量数据库。</td>
</tr>
<tr>
<td>FAISS</td>
<td>Facebook AI Similarity Search</td>
<td>高性能向量检索库，适合大规模向量搜索。</td>
</tr>
<tr>
<td>ScaNN</td>
<td>Scalable Nearest Neighbors</td>
<td>Google 提出的高效向量检索方法。</td>
</tr>
</table>

<div class="box train">
<strong>后训练 Agent 启发：</strong>
记忆训练不是只训练“记住”，而是训练“检索决策”：
<pre>
当前任务 → 生成检索 query → 返回候选记忆 → 判断相关性 → 整合进行动
</pre>
这可以作为 RAG-Agent 的训练数据，也可以构造 chosen/rejected：相关记忆为 chosen，无关记忆为 rejected。
</div>

<hr>

<h2 id="route5">路线五：Tool Use 工具使用——从工具调用到 API 评测</h2>

<p>
Tool Use 是 Agent 的第三核心能力。原文强调，工具使用是人类的重要能力之一；给 LLM 接入工具，可以显著扩展模型能力，使模型突破训练参数中的知识限制。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/sea-otter.png" alt="Sea otter using tool">
<div class="caption">
图 10：海獭使用石头敲开贝壳。原图来源：Lilian Weng 博客。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/sea-otter.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片解读</h3>

<p>
这张图表面上是动物使用工具的例子，真正想说明的是：工具让一个主体突破自身能力边界。对 LLM 来说，模型参数本身可能不会最新知识、不会精确计算、不能访问私有数据库、不能运行代码；但通过工具，Agent 可以把这些能力外包出去。
</p>

<h3>工具使用要训练哪些能力？</h3>

<table>
<tr>
<th>能力</th>
<th>具体问题</th>
<th>错误表现</th>
<th>训练方式</th>
</tr>
<tr>
<td>是否需要工具</td>
<td>这个任务能不能直接回答？是否需要搜索、计算或执行代码？</td>
<td>该查不查，或者不该查乱查。</td>
<td>SFT / 二分类奖励。</td>
</tr>
<tr>
<td>工具选择</td>
<td>应该用 Search、Calculator、Code Interpreter 还是 Database？</td>
<td>选错工具。</td>
<td>DPO：正确工具 vs 错误工具。</td>
</tr>
<tr>
<td>参数生成</td>
<td>工具参数怎么填？关键词是什么？路径是什么？字段是什么？</td>
<td>参数错、格式错、字段缺失。</td>
<td>结构化输出 SFT / schema reward。</td>
</tr>
<tr>
<td>结果解释</td>
<td>工具返回后，如何理解和整合？</td>
<td>忽略工具结果，或误读返回值。</td>
<td>Observation → 下一步 action 轨迹训练。</td>
</tr>
<tr>
<td>多轮调用</td>
<td>一次工具结果不够时，是否继续调用？</td>
<td>过早结束，或无限调用。</td>
<td>RLVR / 任务完成奖励。</td>
</tr>
</table>

<h3>MRKL、TALM、Toolformer</h3>

<table>
<tr>
<th>方法</th>
<th>中文解释</th>
<th>核心思路</th>
<th>对后训练 Agent 的意义</th>
</tr>
<tr>
<td>MRKL</td>
<td>Modular Reasoning, Knowledge and Language，模块化推理、知识与语言系统</td>
<td>LLM 作为 router，把问题分发给不同专家模块，例如计算器、天气 API、搜索工具。</td>
<td>训练模型“路由”能力：什么时候交给哪个工具。</td>
</tr>
<tr>
<td>TALM</td>
<td>Tool Augmented Language Models，工具增强语言模型</td>
<td>通过微调让语言模型学会调用外部工具 API。</td>
<td>对应工具调用 SFT。</td>
</tr>
<tr>
<td>Toolformer</td>
<td>工具自学习模型</td>
<td>模型自动标注可能有帮助的 API 调用，并用这些数据训练自己。</td>
<td>对应自动构造工具调用数据。</td>
</tr>
</table>

<div class="box train">
<strong>后训练重点：</strong>
工具调用训练不能只训练 JSON 格式。真正重要的是五个判断：
<ol>
<li>该不该调用工具；</li>
<li>调用哪个工具；</li>
<li>参数是否正确；</li>
<li>工具结果是否被正确使用；</li>
<li>是否需要继续调用或停止。</li>
</ol>
</div>

<hr>

<h2 id="route6">路线六：Case Studies 案例——HuggingGPT、API-Bank、Generative Agents</h2>

<h3>6.1 HuggingGPT：LLM as Controller，大模型作为控制器</h3>

<p>
HuggingGPT 是原文中非常典型的工具使用案例。它不是让 LLM 亲自完成所有任务，而是让 LLM 作为 controller，也就是控制器，负责理解用户任务、拆解子任务、从 HuggingFace 选择专家模型、执行任务并汇总结果。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/hugging-gpt.png" alt="HuggingGPT workflow">
<div class="caption">
图 11：HuggingGPT 工作流程。原图来源：Lilian Weng 博客引用 Shen et al. 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/hugging-gpt.png" target="_blank">打开原图</a>
</div>
</div>

<h4>图片详细解读</h4>

<table>
<tr>
<th>阶段</th>
<th>英文</th>
<th>中文解释</th>
<th>训练含义</th>
</tr>
<tr>
<td>I</td>
<td>Task Planning</td>
<td>任务规划。LLM 把用户请求解析成多个子任务。</td>
<td>训练“用户请求 → 子任务 JSON”。</td>
</tr>
<tr>
<td>II</td>
<td>Model Selection</td>
<td>模型选择。LLM 根据子任务选择 HuggingFace 上合适的专家模型。</td>
<td>训练“子任务 → 工具/模型选择”。</td>
</tr>
<tr>
<td>III</td>
<td>Task Execution</td>
<td>任务执行。专家模型实际完成图像识别、目标检测、图像描述等任务。</td>
<td>环境执行，不一定训练 LLM，但要记录 Observation。</td>
</tr>
<tr>
<td>IV</td>
<td>Response Generation</td>
<td>回答生成。LLM 汇总各模型输出，生成用户可读答案。</td>
<td>训练“工具返回 → 最终回答”。</td>
</tr>
</table>

<h4>中文总结</h4>

<p>
HuggingGPT 的关键不是“ChatGPT 很强”，而是“LLM 可以作为任务调度器”。它体现了 Agent 的一个重要方向：LLM 不必亲自做所有事情，而是负责任务拆解、工具选择、结果整合。
</p>

<div class="box train">
<strong>后训练启发：</strong>
HuggingGPT 可以拆成四类数据：
<pre>
用户任务 → 子任务列表
子任务 → 专家模型选择
专家模型输出 → 中间解释
全部工具结果 → 最终回答
</pre>
这就是一个标准的 tool-use agent SFT 数据结构。
</div>

<h3>6.2 API-Bank：工具调用能力如何评测</h3>

<p>
API-Bank 是原文介绍的工具增强 LLM 评测基准。它关注模型能否判断是否需要 API、检索合适 API、阅读 API 文档、生成 API 调用，并基于 API 返回继续回答或重新调用。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/api-bank-process.png" alt="API-Bank process">
<div class="caption">
图 12：API-Bank 中 LLM 调用 API 的伪代码流程。原图来源：Lilian Weng 博客引用 Li et al. 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/api-bank-process.png" target="_blank">打开原图</a>
</div>
</div>

<h4>图片详细解读</h4>

<p>
这张图很适合用来理解工具调用 Agent 的完整流程。它不是简单“调用 API”，而是一个循环：
</p>

<pre>
用户输入
  ↓
判断是否需要 API
  ↓
如果需要，生成搜索关键词
  ↓
搜索 API
  ↓
找到 API 后读取文档
  ↓
生成 API 调用
  ↓
执行 API
  ↓
检查结果是否满意
  ↓
如果不满意，修改参数再次调用
  ↓
生成最终回答
</pre>

<table>
<tr>
<th>流程步骤</th>
<th>中文说明</th>
<th>可以评测什么</th>
</tr>
<tr>
<td>if API Call is needed</td>
<td>判断是否需要 API</td>
<td>工具调用必要性。</td>
</tr>
<tr>
<td>keywords ← summarize(us)</td>
<td>从用户请求中总结搜索关键词</td>
<td>查询构造能力。</td>
</tr>
<tr>
<td>api ← search(keywords)</td>
<td>搜索相关 API</td>
<td>工具检索能力。</td>
</tr>
<tr>
<td>api_doc ← api.documentation</td>
<td>读取 API 文档</td>
<td>文档理解能力。</td>
</tr>
<tr>
<td>api_call ← gen_api_call</td>
<td>生成 API 调用</td>
<td>参数生成能力。</td>
</tr>
<tr>
<td>api_re ← execute_api_call</td>
<td>执行 API 调用</td>
<td>执行与反馈获取。</td>
</tr>
<tr>
<td>while Response not satisfied</td>
<td>如果结果不满意，继续修改</td>
<td>多轮修正能力。</td>
</tr>
<tr>
<td>generate_response</td>
<td>生成用户回答</td>
<td>结果整合能力。</td>
</tr>
</table>

<h4>API-Bank 的三层评测</h4>

<table>
<tr>
<th>层级</th>
<th>英文</th>
<th>中文解释</th>
<th>对应训练方向</th>
</tr>
<tr>
<td>Level 1</td>
<td>Call API</td>
<td>给定 API 描述，模型判断是否调用、如何调用、如何基于返回回答。</td>
<td>工具调用 SFT。</td>
</tr>
<tr>
<td>Level 2</td>
<td>Retrieve API</td>
<td>模型需要先检索可能有用的 API，再阅读文档学习如何用。</td>
<td>工具检索 + 文档理解。</td>
</tr>
<tr>
<td>Level 3</td>
<td>Plan API Calls</td>
<td>面对模糊任务，需要多步调用多个 API。</td>
<td>多步工具规划 + RLVR。</td>
</tr>
</table>

<div class="box train">
<strong>后训练启发：</strong>
API-Bank 说明 Agent 评测不能只看最终答案。中间每一步都可以评测：
是否该调用 API、API 选得对不对、参数对不对、结果是否正确使用、是否需要再次调用、最终回答是否满足用户需求。
</div>

<h3>6.3 Generative Agents：生成式智能体仿真</h3>

<p>
Generative Agents 是原文中很有代表性的案例。它让 25 个由 LLM 控制的虚拟角色生活在沙盒环境中，通过记忆、反思和规划机制产生类似人类的社会行为。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/generative-agents.png" alt="Generative Agents architecture">
<div class="caption">
图 13：Generative Agents 架构。原图来源：Lilian Weng 博客引用 Park et al. 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/generative-agents.png" target="_blank">打开原图</a>
</div>
</div>

<h4>图片详细解读</h4>

<table>
<tr>
<th>图中元素</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td>Perceive</td>
<td>感知</td>
<td>Agent 接收环境中的事件、对话、观察。</td>
</tr>
<tr>
<td>Memory Stream</td>
<td>记忆流</td>
<td>持续记录 Agent 的观察、经验和事件，是长期记忆数据库。</td>
</tr>
<tr>
<td>Retrieve</td>
<td>检索</td>
<td>从记忆流中取回和当前情境相关的记忆。</td>
</tr>
<tr>
<td>Retrieved Memories</td>
<td>检索出的记忆</td>
<td>作为当前行动和规划的上下文。</td>
</tr>
<tr>
<td>Reflect</td>
<td>反思</td>
<td>把低层事件总结成更高层理解，例如“某人与我关系变好”。</td>
</tr>
<tr>
<td>Plan</td>
<td>规划</td>
<td>根据长期记忆、当前情境和反思结果制定未来行动。</td>
</tr>
<tr>
<td>Act</td>
<td>行动</td>
<td>在环境中执行具体行为。</td>
</tr>
</table>

<h4>中文总结</h4>

<p>
这张图说明，真正的长期 Agent 不是只依赖当前 prompt，而是依赖一个持续更新的记忆流。Agent 感知环境，把观察写入记忆；根据相关性、时间近近度和重要性检索记忆；再通过反思形成高层概括；最后生成计划并行动。
</p>

<div class="box train">
<strong>后训练启发：</strong>
Generative Agents 对长期 Agent 后训练有四点启发：
<ol>
<li>训练“观察 → 是否写入记忆”。</li>
<li>训练“当前情境 → 检索哪些记忆”。</li>
<li>训练“多条记忆 → 高层反思”。</li>
<li>训练“记忆 + 反思 + 环境 → 下一步行动”。</li>
</ol>
</div>

<hr>

<h2 id="route7">路线七：后训练 Agent 训练路线——SFT、DPO、RLVR 怎么接上</h2>

<p>
这篇博客本身不是后训练论文，但它非常适合转化为后训练 Agent 的路线图。核心是：把 Agent 能力拆成可标注、可比较、可奖励的训练目标。
</p>

<h3>7.1 训练路线总表</h3>

<table>
<tr>
<th>学习阶段</th>
<th>训练对象</th>
<th>数据形式</th>
<th>适合方法</th>
<th>评价方式</th>
</tr>
<tr>
<td>阶段 1：工具调用格式</td>
<td>让模型输出合法工具调用</td>
<td>任务 → 工具名 + 参数 JSON</td>
<td>SFT</td>
<td>JSON 是否合法、schema 是否正确</td>
</tr>
<tr>
<td>阶段 2：工具选择</td>
<td>判断该不该用工具、用哪个工具</td>
<td>上下文 → 正确工具 / 错误工具</td>
<td>SFT / DPO</td>
<td>工具选择准确率</td>
</tr>
<tr>
<td>阶段 3：任务分解</td>
<td>把复杂任务拆成子任务</td>
<td>用户目标 → 子任务列表 → 依赖关系</td>
<td>SFT / DPO</td>
<td>子任务完整性、依赖顺序是否合理</td>
</tr>
<tr>
<td>阶段 4：ReAct 轨迹</td>
<td>学会 Thought → Action → Observation 循环</td>
<td>多步轨迹数据</td>
<td>轨迹 SFT</td>
<td>动作正确率、任务完成率</td>
</tr>
<tr>
<td>阶段 5：反思能力</td>
<td>从失败轨迹中总结改进策略</td>
<td>失败轨迹 → Reflection → 新动作</td>
<td>SFT / DPO</td>
<td>反思是否能提升下一轮成功率</td>
</tr>
<tr>
<td>阶段 6：可验证奖励</td>
<td>用环境反馈优化行为</td>
<td>轨迹 → reward</td>
<td>RLVR / GRPO / PPO</td>
<td>测试通过率、任务成功率、工具成本</td>
</tr>
</table>

<h3>7.2 最小可复现项目：Mini Tool-use Agent</h3>

<div class="box train">
<p><strong>项目目标：</strong>训练一个小模型学会多步工具调用。</p>

<p><strong>工具设置：</strong></p>
<ul>
<li><code>calculator(expression)</code>：计算数学表达式。</li>
<li><code>search_doc(query)</code>：在本地文档中搜索。</li>
<li><code>run_python(code)</code>：执行 Python 代码。</li>
<li><code>finish(answer)</code>：输出最终答案。</li>
</ul>

<p><strong>数据样式：</strong></p>

<pre>
User: 请计算 23 * 17，然后解释结果。

Thought: 这是一个精确计算问题，需要调用 calculator。
Action: calculator({"expression": "23 * 17"})
Observation: 391
Thought: 已获得计算结果，可以回答。
Action: finish({"answer": "23 * 17 = 391。"})
</pre>

<p><strong>SFT 数据：</strong>让模型模仿正确工具调用轨迹。</p>
<p><strong>DPO 数据：</strong>正确工具调用作为 chosen，错误工具调用作为 rejected。</p>
<p><strong>RLVR 奖励：</strong>计算结果正确 +1，JSON 合法 +0.2，工具选择正确 +0.3，最终回答正确 +1。</p>
</div>

<h3>7.3 每个模块的错误分析表</h3>

<table>
<tr>
<th>错误类型</th>
<th>表现</th>
<th>来自哪个模块</th>
<th>解决方式</th>
</tr>
<tr>
<td>任务拆错</td>
<td>子任务缺失、顺序错误</td>
<td>Planning</td>
<td>增加任务分解 SFT 和好坏计划 DPO。</td>
</tr>
<tr>
<td>工具选错</td>
<td>该用计算器却搜索，该搜索却直接回答</td>
<td>Tool Use</td>
<td>构造工具选择偏好数据。</td>
</tr>
<tr>
<td>参数错误</td>
<td>JSON 字段错、关键词错、路径错</td>
<td>Tool Calling</td>
<td>schema reward + 参数级标注。</td>
</tr>
<tr>
<td>忽略 Observation</td>
<td>工具已经返回结果，但模型仍然胡编</td>
<td>ReAct</td>
<td>训练 Observation-conditioned action。</td>
</tr>
<tr>
<td>重复失败</td>
<td>同样错误反复发生</td>
<td>Reflection</td>
<td>失败轨迹 → 反思 → 改进行动训练。</td>
</tr>
<tr>
<td>记忆污染</td>
<td>检索到无关或过期记忆</td>
<td>Memory</td>
<td>训练记忆相关性判断和遗忘机制。</td>
</tr>
</table>

<div class="box note">
<strong>最终总结：</strong>
这篇博客给出的不是一个单一 Agent 框架，而是一套 Agent 能力分解方法。后训练 Agent 的核心路线可以概括为：
<pre>
规划能力 → 工具调用 → 记忆检索 → 环境反馈 → 反思修正 → 可验证奖励优化
</pre>
真正的目标不是让模型“说得像 Agent”，而是让模型在多步任务轨迹中稳定地选择正确动作。
</div>

<h2 id="terms">术语表：英文术语 + 中文解释</h2>

<table>
<tr>
<th>英文术语</th>
<th>中文译法</th>
<th>解释</th>
</tr>
<tr>
<td>Autonomous Agent</td>
<td>自主智能体</td>
<td>能够根据目标、记忆、工具和环境反馈自主选择动作的系统。</td>
</tr>
<tr>
<td>Agent Brain</td>
<td>智能体大脑</td>
<td>在 LLM Agent 中，LLM 通常作为核心控制器。</td>
</tr>
<tr>
<td>Planning</td>
<td>规划</td>
<td>把复杂任务拆成子目标并安排执行顺序。</td>
</tr>
<tr>
<td>Task Decomposition</td>
<td>任务分解</td>
<td>把大任务拆成多个可执行小任务。</td>
</tr>
<tr>
<td>Chain of Thought, CoT</td>
<td>思维链</td>
<td>让模型一步一步推理。</td>
</tr>
<tr>
<td>Tree of Thoughts, ToT</td>
<td>思维树</td>
<td>让模型探索多个推理路径。</td>
</tr>
<tr>
<td>ReAct</td>
<td>推理—行动框架</td>
<td>通过 Thought、Action、Observation 循环结合推理和环境交互。</td>
</tr>
<tr>
<td>Reflexion</td>
<td>反思框架</td>
<td>让 Agent 从失败轨迹中总结经验并写入记忆。</td>
</tr>
<tr>
<td>Memory</td>
<td>记忆</td>
<td>保存短期上下文、长期知识和历史经验。</td>
</tr>
<tr>
<td>Short-term Memory</td>
<td>短期记忆</td>
<td>当前上下文窗口中的信息。</td>
</tr>
<tr>
<td>Long-term Memory</td>
<td>长期记忆</td>
<td>外部向量数据库、文件系统、知识库等长期存储。</td>
</tr>
<tr>
<td>MIPS</td>
<td>最大内积搜索</td>
<td>在向量库中检索与 query 最相似的信息。</td>
</tr>
<tr>
<td>Tool Use</td>
<td>工具使用</td>
<td>模型调用外部 API、搜索、计算器、代码解释器等。</td>
</tr>
<tr>
<td>MRKL</td>
<td>模块化推理、知识与语言系统</td>
<td>LLM 作为路由器，把问题分发给专家模块。</td>
</tr>
<tr>
<td>TALM</td>
<td>工具增强语言模型</td>
<td>通过微调让语言模型学会调用工具。</td>
</tr>
<tr>
<td>Toolformer</td>
<td>工具自学习模型</td>
<td>模型自动构造工具调用数据并学习使用工具。</td>
</tr>
<tr>
<td>Trajectory</td>
<td>轨迹</td>
<td>Agent 完成任务过程中 Observation、Action、Reward 的序列。</td>
</tr>
<tr>
<td>RLVR</td>
<td>可验证奖励强化学习</td>
<td>使用可自动验证的结果作为奖励，例如测试通过、答案正确、格式合法。</td>
</tr>
<tr>
<td>GRPO</td>
<td>组相对策略优化</td>
<td>一种用于大模型强化学习后训练的优化方法，常和可验证奖励结合。</td>
</tr>
<tr>
<td>DPO</td>
<td>直接偏好优化</td>
<td>用 chosen/rejected 偏好数据优化模型，而不显式训练奖励模型。</td>
</tr>
<tr>
<td>SFT</td>
<td>监督微调</td>
<td>用标准输入输出数据训练模型模仿目标行为。</td>
</tr>
</table>

<h2>最后一句话</h2>

<div class="box train">
<strong>后训练 Agent 的真正对象不是“答案”，而是“行为轨迹”。</strong>
你要训练的是模型在每一步如何观察、如何规划、如何调用工具、如何使用记忆、如何根据失败反思，以及如何在可验证反馈中持续提高任务完成率。
</div>

<p class="small">
说明：本文为中文学习笔记与图片解读。图片通过原博客图片链接引用，版权归原作者或原图来源所有。原文：Lilian Weng, “LLM Powered Autonomous Agents.”
</p>

</body>
</html>
```

---

# you asked

message time: 2026-06-07 16:24:08

这部分 总结 的很好 接着总结 下一部分文档

---

# chatgpt response

我接着上一版的路线继续往下写，这一部分主要补：Scientific Discovery Agent、Generative Agents、AutoGPT/GPT-Engineer、Challenges，以及最后怎么转成“后训练 Agent 研究问题”。

好，下面这一段可以**直接接在你上一份 HTML 的“路线七”后面、术语表前面**。这部分主要总结原博客后半部分：**Scientific Discovery Agent 科学发现智能体、Generative Agents 生成式智能体仿真、AutoGPT / GPT-Engineer 概念验证案例、Challenges 挑战**。原文里 ChemCrow 被作为科学发现 Agent 的例子，使用 13 个专家工具完成有机合成、药物发现和材料设计等任务；Generative Agents 则是 25 个 LLM 控制的虚拟角色在沙盒环境中互动，并通过 memory、reflection、planning 产生社会行为；最后原文总结了上下文长度有限、长期规划困难、自然语言接口不稳定三类挑战。([lilianweng.github.io](https://lilianweng.github.io/posts/2023-06-23-agent/))

**Document Title: **

<h2 id="route8">路线八：Scientific Discovery Agent——科学发现智能体</h2>

<p>
这一部分进入原文的 Case Studies，即案例研究。前面几部分讲的是 Agent 的通用结构：Planning、Memory、Tool Use、Reflection。
而案例部分要回答的是：这些机制放到真实任务里，究竟长什么样？
</p>

<p>
原文首先介绍的是 <strong>ChemCrow</strong>，它是一个面向化学与科学发现的领域专用 Agent。
它不是一个“通用聊天机器人”，而是把 LLM 和一组专家工具结合起来，用于有机合成、药物发现和材料设计等任务。
</p>

<div class="box note">
<strong>这一节的核心问题：</strong>
科学发现 Agent 不是靠 LLM 单独完成专业研究，而是让 LLM 作为任务规划器和工具调度器，调用专业工具、搜索文献、执行代码、读取文档，最后形成任务方案。
</div>

<h3>8.1 ChemCrow：化学领域 Agent</h3>

<table>
<tr>
<th>项目</th>
<th>解释</th>
</tr>
<tr>
<td>英文名称</td>
<td>ChemCrow</td>
</tr>
<tr>
<td>中文理解</td>
<td>化学乌鸦 / 化学智能体，代表一个化学领域专用 Agent。</td>
</tr>
<tr>
<td>任务范围</td>
<td>有机合成、药物发现、材料设计。</td>
</tr>
<tr>
<td>系统结构</td>
<td>LLM + 13 个专家设计工具。</td>
</tr>
<tr>
<td>执行模式</td>
<td>结合 ReAct 和 MRKL：模型先思考，再选择工具，再观察工具返回，再继续下一步。</td>
</tr>
<tr>
<td>关键价值</td>
<td>让 LLM 不再单靠参数知识回答专业问题，而是能调用专业工具完成更可靠的任务。</td>
</tr>
</table>

<h3>8.2 ChemCrow 的工作方式</h3>

<p>
原文指出，ChemCrow 的基本流程可以理解为：
</p>

<pre>
用户提出科学任务
  ↓
LLM 阅读可用工具列表
  ↓
LLM 根据任务选择工具
  ↓
以 ReAct 格式执行：
Thought → Action → Action Input → Observation
  ↓
根据工具返回继续推理
  ↓
形成最终科学方案
</pre>

<h4>这里的 ReAct 格式为什么重要？</h4>

<table>
<tr>
<th>ReAct 元素</th>
<th>中文解释</th>
<th>在 ChemCrow 中的作用</th>
</tr>
<tr>
<td>Thought</td>
<td>思考</td>
<td>模型判断当前任务需要什么科学信息或工具。</td>
</tr>
<tr>
<td>Action</td>
<td>动作</td>
<td>模型选择某个化学工具、搜索工具、文献工具或计算工具。</td>
</tr>
<tr>
<td>Action Input</td>
<td>动作输入</td>
<td>给工具传入具体参数，例如化合物名称、SMILES、反应条件等。</td>
</tr>
<tr>
<td>Observation</td>
<td>观察</td>
<td>工具返回的专业结果，模型据此继续下一步推理。</td>
</tr>
</table>

<div class="box train">
<strong>后训练 Agent 启发：</strong>
ChemCrow 说明，领域 Agent 的训练重点不是“让模型背更多专业知识”，而是：
<ol>
<li>让模型知道什么时候自己不能直接回答；</li>
<li>让模型知道该调用哪个专业工具；</li>
<li>让模型正确填写专业参数；</li>
<li>让模型能读懂工具返回的专业结果；</li>
<li>让模型能把多个工具结果整合成可用方案。</li>
</ol>
</div>

<h3>8.3 为什么 LLM 自评在专业任务中不可靠？</h3>

<p>
原文提到一个很重要的现象：LLM-based evaluation 认为 GPT-4 和 ChemCrow 表现差不多，
但是人类化学专家从任务完成度和化学正确性角度评价时，ChemCrow 明显优于 GPT-4。
</p>

<div class="box warn">
<strong>关键问题：</strong>
在深度专业领域中，让 LLM 自己评价自己的结果可能不可靠。因为模型如果缺乏专业知识，它不仅可能犯错，也可能不知道自己错在哪里。
</div>

<table>
<tr>
<th>评价方式</th>
<th>可能问题</th>
<th>对后训练的启发</th>
</tr>
<tr>
<td>LLM-as-Judge</td>
<td>模型可能无法识别深层专业错误。</td>
<td>专业任务不能只依赖模型打分，需要专家规则、实验结果或外部验证。</td>
</tr>
<tr>
<td>人类专家评价</td>
<td>成本高，但更可靠。</td>
<td>可以用专家评价构造高质量 preference data。</td>
</tr>
<tr>
<td>工具 / 实验验证</td>
<td>需要专业环境，但能提供更客观反馈。</td>
<td>适合作为 RLVR 的 reward 来源。</td>
</tr>
</table>

<h3>8.4 科学发现 Agent 的风险</h3>

<p>
原文还提到，科学发现 Agent 也存在安全风险。例如一些科学 Agent 可以浏览网页、读取文档、执行代码、调用机器人实验 API。
如果没有安全边界，模型可能被用于不合规的化学合成或危险实验设计。
</p>

<table>
<tr>
<th>风险类型</th>
<th>表现</th>
<th>防护方式</th>
</tr>
<tr>
<td>危险知识调用</td>
<td>模型可能搜索或合成危险化学品相关步骤。</td>
<td>工具层面增加安全过滤；高风险任务必须拒绝。</td>
</tr>
<tr>
<td>自动实验执行</td>
<td>模型可能调用机器人实验 API 执行危险操作。</td>
<td>实验执行前加入人工审批。</td>
</tr>
<tr>
<td>模型自评失效</td>
<td>模型无法判断专业方案是否危险或错误。</td>
<td>引入专家规则、数据库校验和人类专家审查。</td>
</tr>
</table>

<div class="box train">
<strong>后训练方向：</strong>
科学 Agent 后训练不能只训练“任务完成率”，还要训练“安全拒绝”和“风险识别”。
可构造三类样本：
<ol>
<li>安全科学任务 → 正常调用工具；</li>
<li>高风险科学任务 → 拒绝并解释原因；</li>
<li>模糊科学任务 → 先澄清用途，再决定是否继续。</li>
</ol>
</div>

<hr>

<h2 id="route9">路线九：Generative Agents——生成式智能体仿真</h2>

<p>
Generative Agents 是原文中最有意思的案例之一。它让 25 个由 LLM 控制的虚拟角色生活在一个沙盒环境中。
这些角色不是简单地回复问题，而是会根据自己的记忆、反思和计划，在虚拟世界中产生类似人类的社会行为。
</p>

<div class="figure">
<img src="https://lilianweng.github.io/posts/2023-06-23-agent/generative-agents.png" alt="Generative Agents architecture">
<div class="caption">
图：Generative Agents 架构。原图来源：Lilian Weng 博客引用 Park et al. 2023。
<a href="https://lilianweng.github.io/posts/2023-06-23-agent/generative-agents.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片详细解读</h3>

<table>
<tr>
<th>图中元素</th>
<th>中文解释</th>
<th>作用</th>
<th>后训练启发</th>
</tr>
<tr>
<td>Perceive</td>
<td>感知</td>
<td>Agent 接收环境中的事件、对话、人物行为和空间变化。</td>
<td>训练模型把环境事件转成可存储的 observation。</td>
</tr>
<tr>
<td>Memory Stream</td>
<td>记忆流</td>
<td>以自然语言形式持续记录 Agent 的经历。</td>
<td>训练哪些观察需要写入长期记忆。</td>
</tr>
<tr>
<td>Retrieve</td>
<td>检索</td>
<td>从记忆流中找出与当前情境相关的记忆。</td>
<td>训练检索 query 生成和记忆相关性判断。</td>
</tr>
<tr>
<td>Retrieved Memories</td>
<td>被检索出的记忆</td>
<td>作为当前决策上下文。</td>
<td>训练模型如何利用记忆，而不是机械复制记忆。</td>
</tr>
<tr>
<td>Reflect</td>
<td>反思</td>
<td>把多个低层观察概括成高层理解。</td>
<td>训练“多条记忆 → 高层总结 / 人物关系判断”。</td>
</tr>
<tr>
<td>Plan</td>
<td>规划</td>
<td>基于角色设定、当前环境和过去记忆制定行动计划。</td>
<td>训练长期计划和日程规划。</td>
</tr>
<tr>
<td>Act</td>
<td>行动</td>
<td>在环境中执行行为，例如交谈、移动、参加活动。</td>
<td>训练“状态 + 记忆 + 计划 → 下一步行动”。</td>
</tr>
</table>

<h3>9.1 Generative Agents 的完整闭环</h3>

<pre>
环境发生事件
  ↓
Agent 感知事件
  ↓
写入 Memory Stream 记忆流
  ↓
当前情境触发记忆检索
  ↓
根据相关性、时间近近度、重要性选择记忆
  ↓
对记忆进行 Reflection 反思
  ↓
生成 Plan 计划
  ↓
执行 Act 行动
  ↓
新的行动又改变环境
</pre>

<h3>9.2 记忆检索的三个标准</h3>

<p>
Generative Agents 不是简单按照关键词检索记忆，而是综合三个维度：recency、importance、relevance。
</p>

<table>
<tr>
<th>英文</th>
<th>中文</th>
<th>解释</th>
<th>例子</th>
</tr>
<tr>
<td>Recency</td>
<td>时间近近度</td>
<td>越近发生的事情越可能影响当前行为。</td>
<td>刚刚和某人吵架，会影响下一次见面。</td>
</tr>
<tr>
<td>Importance</td>
<td>重要性</td>
<td>关键事件比日常琐事更值得被检索。</td>
<td>生日派对邀请比“喝了一杯水”更重要。</td>
</tr>
<tr>
<td>Relevance</td>
<td>相关性</td>
<td>和当前情境越相关的记忆越应该被取回。</td>
<td>正在准备派对时，检索与朋友、邀请、地点有关的记忆。</td>
</tr>
</table>

<div class="box note">
<strong>核心理解：</strong>
长期记忆不是“越多越好”。Agent 真正需要的是能在正确时刻检索正确记忆，并让记忆影响当前行为。
</div>

<h3>9.3 Reflection 在 Generative Agents 中的不同含义</h3>

<p>
这里的 Reflection 和前面 Reflexion 中的“失败后反思”不完全一样。
在 Generative Agents 中，Reflection 更像是“从大量日常观察中抽象出高层理解”。
</p>

<table>
<tr>
<th>类型</th>
<th>Reflexion 中的 Reflection</th>
<th>Generative Agents 中的 Reflection</th>
</tr>
<tr>
<td>触发条件</td>
<td>任务失败、奖励不佳、轨迹低效。</td>
<td>积累了大量观察，需要形成高层概括。</td>
</tr>
<tr>
<td>功能</td>
<td>总结错误，指导下一次尝试。</td>
<td>从碎片记忆中形成更高层的人物理解、关系理解和事件理解。</td>
</tr>
<tr>
<td>例子</td>
<td>“我失败是因为搜索关键词错了。”</td>
<td>“Alice 最近经常帮助 Bob，说明他们关系变好。”</td>
</tr>
<tr>
<td>后训练意义</td>
<td>训练失败恢复能力。</td>
<td>训练长期人格一致性和社会行为一致性。</td>
</tr>
</table>

<h3>9.4 这个案例为什么重要？</h3>

<p>
Generative Agents 说明，Agent 不一定只用于完成工具任务，也可以用于模拟长期行为、角色互动、社会传播和复杂系统。
它最重要的启发是：如果一个 Agent 要长期运行，它必须具备持续记忆、记忆检索、反思抽象和行为一致性。
</p>

<div class="box train">
<strong>后训练 Agent 启发：</strong>
如果要训练长期 Agent，可以构造以下数据：
<ol>
<li><strong>观察写入数据：</strong>环境事件 → 是否写入记忆流。</li>
<li><strong>记忆检索数据：</strong>当前情境 → 应检索哪些记忆。</li>
<li><strong>反思数据：</strong>多条低层观察 → 高层总结。</li>
<li><strong>行为预测数据：</strong>角色设定 + 记忆 + 当前环境 → 下一步行动。</li>
<li><strong>一致性偏好数据：</strong>符合角色长期记忆的行为作为 chosen，不符合的作为 rejected。</li>
</ol>
</div>

<hr>

<h2 id="route10">路线十：Proof-of-Concept Examples——AutoGPT 与 GPT-Engineer</h2>

<p>
原文接着介绍了几个早期的 Agent 概念验证项目，包括 AutoGPT、GPT-Engineer 和 BabyAGI。
这些项目的意义不是说明它们已经足够可靠，而是说明：LLM 可以作为主控制器，尝试自动拆解任务、调用工具、保存记忆、生成文件和完成多步任务。
</p>

<h3>10.1 AutoGPT：早期自主 Agent Demo</h3>

<p>
AutoGPT 曾经引起很多关注，因为它把 LLM 包装成一个可以自主追求目标的系统。
但原文也指出，AutoGPT 存在不少可靠性问题，其中很大一部分代码都在处理输出格式解析。
</p>

<h4>AutoGPT 的系统消息结构</h4>

<p>
原文列出了 AutoGPT 的系统消息。它大致包含以下几个部分：
</p>

<table>
<tr>
<th>系统消息部分</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td>Identity</td>
<td>身份设定</td>
<td>告诉模型“你是谁”，例如 AI 名称、角色描述。</td>
</tr>
<tr>
<td>Goals</td>
<td>目标列表</td>
<td>用户给 Agent 设定多个长期目标。</td>
</tr>
<tr>
<td>Constraints</td>
<td>约束条件</td>
<td>限制上下文长度、要求独立决策、只能使用指定命令。</td>
</tr>
<tr>
<td>Commands</td>
<td>可用命令</td>
<td>列出工具，如 Google Search、Browse Website、Read File、Write File、Execute Python File 等。</td>
</tr>
<tr>
<td>Resources</td>
<td>资源</td>
<td>告诉模型可用资源，例如互联网、长期记忆、文件输出。</td>
</tr>
<tr>
<td>Performance Evaluation</td>
<td>表现评估</td>
<td>要求模型持续审查自己的行为、反思过去策略、减少不必要步骤。</td>
</tr>
<tr>
<td>Response Format</td>
<td>输出格式</td>
<td>要求模型必须输出可解析 JSON。</td>
</tr>
</table>

<h4>AutoGPT 的输出格式</h4>

<pre>
{
  "thoughts": {
    "text": "当前想法",
    "reasoning": "推理过程",
    "plan": "- 短期计划\n- 长期计划",
    "criticism": "自我批评",
    "speak": "给用户看的简短说明"
  },
  "command": {
    "name": "命令名称",
    "args": {
      "参数名": "参数值"
    }
  }
}
</pre>

<h4>这段系统消息体现了什么 Agent 思想？</h4>

<table>
<tr>
<th>设计点</th>
<th>对应 Agent 能力</th>
<th>问题</th>
</tr>
<tr>
<td>Goals</td>
<td>长期目标管理</td>
<td>目标太宽泛时，模型容易发散。</td>
</tr>
<tr>
<td>Commands</td>
<td>工具调用</td>
<td>工具多，模型容易选错。</td>
</tr>
<tr>
<td>Memory constraints</td>
<td>长期记忆管理</td>
<td>模型不一定知道什么该保存。</td>
</tr>
<tr>
<td>Criticism</td>
<td>自我反思</td>
<td>自我批评可能流于形式，不一定能改善行为。</td>
</tr>
<tr>
<td>JSON output</td>
<td>结构化输出</td>
<td>格式错误会导致系统崩溃或解析失败。</td>
</tr>
</table>

<div class="box warn">
<strong>AutoGPT 的核心问题：</strong>
它把很多 Agent 能力都写进 prompt 里，但 prompt 约束不等于稳定能力。
如果模型没有经过后训练，它可能仍然会格式错误、乱用工具、重复动作、无法停止。
</div>

<div class="box train">
<strong>后训练启发：</strong>
AutoGPT 这类系统最需要训练的是：
<ol>
<li>严格 JSON 输出；</li>
<li>工具选择和参数生成；</li>
<li>长期目标分解；</li>
<li>成本控制，避免无意义工具调用；</li>
<li>停止条件判断。</li>
</ol>
</div>

<h3>10.2 GPT-Engineer：代码生成 Agent</h3>

<p>
GPT-Engineer 是另一个概念验证项目。它的目标是：用户用自然语言描述一个软件项目，Agent 自动澄清需求、拆解组件、生成文件，并输出完整代码仓库。
</p>

<h4>GPT-Engineer 的两阶段流程</h4>

<table>
<tr>
<th>阶段</th>
<th>英文</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td>阶段一</td>
<td>Clarification</td>
<td>需求澄清</td>
<td>模型先总结哪些地方不清楚，然后一次问一个澄清问题。</td>
</tr>
<tr>
<td>阶段二</td>
<td>Code Writing</td>
<td>代码生成</td>
<td>在需求足够明确后，模型开始设计架构并生成多个文件。</td>
</tr>
</table>

<h4>为什么先澄清需求很重要？</h4>

<p>
很多代码 Agent 的失败，不是代码能力不够，而是任务理解阶段就错了。
GPT-Engineer 的澄清阶段要求模型先列出不明确的地方，再选择一个问题问用户。这说明：高质量 Agent 不应该盲目执行，而应该在信息不足时主动澄清。
</p>

<table>
<tr>
<th>能力</th>
<th>表现</th>
<th>后训练数据</th>
</tr>
<tr>
<td>不确定性识别</td>
<td>模型知道哪些需求不明确。</td>
<td>用户需求 → 不明确点列表。</td>
</tr>
<tr>
<td>澄清问题生成</td>
<td>模型一次只问一个最关键问题。</td>
<td>不明确点 → 最优澄清问题。</td>
</tr>
<tr>
<td>假设生成</td>
<td>当用户要求自行假设时，模型能明确列出假设。</td>
<td>模糊任务 → 合理假设列表。</td>
</tr>
<tr>
<td>架构规划</td>
<td>先列类、函数、模块，再写代码。</td>
<td>需求 → 文件结构 / 模块设计。</td>
</tr>
<tr>
<td>完整实现</td>
<td>不写 placeholder，输出可运行代码。</td>
<td>架构 → 多文件代码。</td>
</tr>
</table>

<div class="box train">
<strong>后训练启发：</strong>
代码 Agent 不能只训练“给定需求生成代码”，还要训练：
<ol>
<li>识别需求缺口；</li>
<li>提出澄清问题；</li>
<li>在缺少信息时做显式假设；</li>
<li>拆解项目结构；</li>
<li>生成多文件一致代码；</li>
<li>运行测试并根据错误修改。</li>
</ol>
</div>

<h3>10.3 从 AutoGPT / GPT-Engineer 看 Agent Demo 的局限</h3>

<table>
<tr>
<th>问题</th>
<th>表现</th>
<th>根源</th>
<th>后训练解决方向</th>
</tr>
<tr>
<td>格式不稳定</td>
<td>JSON 解析失败、字段缺失。</td>
<td>自然语言模型不是天生稳定的结构化输出器。</td>
<td>结构化输出 SFT + schema reward。</td>
</tr>
<tr>
<td>工具乱用</td>
<td>该读文件却搜索，该停止却继续调用工具。</td>
<td>工具选择策略未训练。</td>
<td>工具选择 DPO / RLVR。</td>
</tr>
<tr>
<td>目标发散</td>
<td>多轮后偏离用户原始目标。</td>
<td>长期规划和目标保持能力弱。</td>
<td>长期轨迹训练 + 目标一致性 reward。</td>
</tr>
<tr>
<td>反思无效</td>
<td>模型会写 criticism，但下一步不改。</td>
<td>反思没有和行动绑定。</td>
<td>训练 reflection → improved action。</td>
</tr>
<tr>
<td>无法稳定停止</td>
<td>重复调用工具，或过早结束。</td>
<td>停止条件没有明确训练。</td>
<td>继续 / 停止二分类 + 成本惩罚。</td>
</tr>
</table>

<hr>

<h2 id="route11">路线十一：Challenges——LLM Agent 的三个核心挑战</h2>

<p>
原文最后总结了 LLM-centered agents 的几个共同限制。这部分非常重要，因为它直接对应后训练 Agent 的研究问题。
</p>

<h3>11.1 Finite Context Length：上下文长度有限</h3>

<p>
第一个挑战是上下文长度有限。Agent 需要处理历史信息、系统指令、API 文档、工具返回、长期计划和过去错误。
但 Transformer 的上下文窗口是有限的，不能无限保存全部信息。
</p>

<table>
<tr>
<th>问题</th>
<th>表现</th>
<th>为什么重要</th>
<th>解决方向</th>
</tr>
<tr>
<td>历史太长</td>
<td>过去行动和反馈放不进上下文。</td>
<td>Agent 无法利用早期经验。</td>
<td>记忆压缩、摘要、外部向量库。</td>
</tr>
<tr>
<td>工具返回太多</td>
<td>搜索结果、API 文档、代码报错占用大量 token。</td>
<td>关键证据可能被噪声淹没。</td>
<td>结果筛选、证据抽取、上下文裁剪。</td>
</tr>
<tr>
<td>反思需要历史</td>
<td>没有足够历史就难以总结失败原因。</td>
<td>反思能力受上下文窗口限制。</td>
<td>失败轨迹压缩、长期反思记忆。</td>
</tr>
<tr>
<td>检索不等于全注意力</td>
<td>向量检索能取回信息，但不如 full attention 灵活。</td>
<td>检索可能漏掉关键依赖。</td>
<td>混合检索、重排序、结构化记忆。</td>
</tr>
</table>

<div class="box train">
<strong>后训练方向：</strong>
围绕上下文限制，可以训练三种能力：
<ol>
<li><strong>Context compression：</strong>把长历史压缩成短摘要。</li>
<li><strong>Memory selection：</strong>选择哪些历史信息值得保留。</li>
<li><strong>Evidence filtering：</strong>从工具返回中抽取和任务最相关的信息。</li>
</ol>
</div>

<h3>11.2 Long-term Planning：长期规划困难</h3>

<p>
第二个挑战是长期规划和任务分解。Agent 面对长任务时，需要跨很多步骤保持目标、更新计划、处理意外错误。
这对 LLM 来说仍然很难。
</p>

<table>
<tr>
<th>长期规划问题</th>
<th>表现</th>
<th>例子</th>
<th>后训练方向</th>
</tr>
<tr>
<td>计划一开始就错</td>
<td>后续步骤全部建立在错误子目标上。</td>
<td>代码 Agent 错误理解项目架构。</td>
<td>好计划 / 坏计划 DPO。</td>
</tr>
<tr>
<td>遇到错误不会改计划</td>
<td>工具返回失败后仍重复原动作。</td>
<td>搜索不到结果后反复搜同一关键词。</td>
<td>失败反馈 → 新计划训练。</td>
</tr>
<td>探索空间太大</td>
<td>可能路径很多，模型不知道怎么剪枝。</td>
<td>复杂调试任务有很多可能原因。</td>
<td>路径评价、候选计划打分。</td>
</tr>
<tr>
<td>目标漂移</td>
<td>多轮后忘记原始任务。</td>
<td>研究 Agent 搜索中途跑偏。</td>
<td>目标一致性 reward。</td>
</tr>
</table>

<div class="box train">
<strong>后训练方向：</strong>
长期规划不能只靠 prompt 里的“think step by step”。更有效的是训练轨迹：
<pre>
目标 → 初始计划 → 执行动作 → 失败反馈 → 修改计划 → 新动作 → 完成
</pre>
这样模型才会学到“计划不是一次性文本，而是可更新的任务状态”。
</div>

<h3>11.3 Reliability of Natural Language Interface：自然语言接口可靠性不足</h3>

<p>
第三个挑战是自然语言接口的可靠性。许多 Agent 系统依赖模型用自然语言或 JSON 和外部工具通信。
但模型输出可能格式错误、字段缺失、违反指令，甚至拒绝执行原本应该执行的格式约束。
</p>

<table>
<tr>
<th>接口问题</th>
<th>表现</th>
<th>后果</th>
<th>解决方向</th>
</tr>
<tr>
<td>格式错误</td>
<td>JSON 少括号、字段名错。</td>
<td>工具无法解析。</td>
<td>结构化输出训练、schema 校验。</td>
</tr>
<tr>
<td>参数错误</td>
<td>路径、关键词、日期、ID 填错。</td>
<td>工具调用失败或返回错误结果。</td>
<td>参数级 reward。</td>
</tr>
<tr>
<td>自然语言歧义</td>
<td>工具返回结果被误读。</td>
<td>下一步行动错误。</td>
<td>Observation 理解训练。</td>
</tr>
<tr>
<td>模型不服从格式</td>
<td>模型解释一堆文字，而不是输出命令。</td>
<td>系统流程中断。</td>
<td>严格格式 SFT + 解码约束。</td>
</tr>
<tr>
<td>解析代码复杂</td>
<td>大量工程代码都用于修复模型输出。</td>
<td>系统不稳定。</td>
<td>减少自然语言接口，使用函数调用或结构化协议。</td>
</tr>
</table>

<div class="box warn">
<strong>关键判断：</strong>
Agent 工程中大量难点不是“模型不会想”，而是“模型输出无法稳定变成机器可执行动作”。
因此，后训练 Agent 必须重视结构化输出、工具 schema、参数校验和错误恢复。
</div>

<hr>

<h2 id="route12">路线十二：把这些挑战转成研究问题</h2>

<p>
如果你要继续研究后训练 Agent，可以把原文最后的 Challenges 转成几个具体研究问题。
</p>

<h3>12.1 研究问题一：如何训练 Agent 的长期规划能力？</h3>

<table>
<tr>
<th>问题</th>
<th>可研究方向</th>
</tr>
<tr>
<td>模型不会稳定拆解长任务</td>
<td>构造多步任务分解数据，比较 SFT、DPO、RLVR 对计划质量的影响。</td>
</tr>
<tr>
<td>模型遇到失败不会修正</td>
<td>训练“失败反馈 → 新计划”的轨迹数据。</td>
</tr>
<tr>
<td>模型多轮后目标漂移</td>
<td>设计目标一致性 reward，惩罚偏离原始目标的行动。</td>
</tr>
</table>

<h3>12.2 研究问题二：如何训练 Agent 的工具调用可靠性？</h3>

<table>
<tr>
<th>问题</th>
<th>可研究方向</th>
</tr>
<tr>
<td>工具选择错误</td>
<td>构造 chosen/rejected 工具选择对，做 DPO。</td>
</tr>
<tr>
<td>参数生成错误</td>
<td>设计参数级别 reward，例如字段正确、类型正确、值正确。</td>
</tr>
<tr>
<td>多轮工具调用不稳定</td>
<td>用 API-Bank 类似流程训练多步工具调用轨迹。</td>
</tr>
</table>

<h3>12.3 研究问题三：如何训练 Agent 的记忆管理能力？</h3>

<table>
<tr>
<th>问题</th>
<th>可研究方向</th>
</tr>
<tr>
<td>什么都存，记忆污染</td>
<td>训练写入判断：哪些 observation 值得进入 long-term memory。</td>
</tr>
<tr>
<td>检索不准</td>
<td>训练 query 改写、记忆重排序和相关性判断。</td>
</tr>
<tr>
<td>检索到了但不会用</td>
<td>训练 retrieved memory → action 的条件生成。</td>
</tr>
</table>

<h3>12.4 研究问题四：如何训练 Agent 的反思能力？</h3>

<table>
<tr>
<th>问题</th>
<th>可研究方向</th>
</tr>
<tr>
<td>反思流于形式</td>
<td>用“反思是否提升下一轮成功率”作为 reward。</td>
</tr>
<tr>
<td>模型不能识别失败原因</td>
<td>构造失败轨迹分类：工具错、计划错、记忆错、参数错。</td>
</tr>
<tr>
<td>反思和行动脱节</td>
<td>训练 reflection-conditioned action，即“基于反思生成新动作”。</td>
</tr>
</table>

<div class="box train">
<strong>这一部分的最终总结：</strong>
原文后半部分告诉我们，Agent 真正难的地方不在概念，而在可靠性。
科学发现 Agent 暴露了专业评价和安全风险问题；
Generative Agents 暴露了长期记忆和行为一致性问题；
AutoGPT / GPT-Engineer 暴露了格式解析、工具调用和需求澄清问题；
Challenges 部分则把这些问题总结为：上下文有限、长期规划困难、自然语言接口不稳定。
</div>

<h3>这一部分可以提炼成一句话</h3>

<div class="box note">
<strong>后训练 Agent 的下一步，不是让模型更“自主”，而是让它更可靠：</strong>
可靠地记住、可靠地检索、可靠地规划、可靠地调用工具、可靠地反思失败、可靠地停止。
</div>

你把这段接上之后，整篇文档的逻辑就比较完整了：前半部分讲 **Agent 能力结构**，这一段讲 **真实案例和系统挑战**。下一步可以继续补一节“**如何把这篇博客转成自己的学习计划 / 复现实验计划**”。

---

# you asked

message time: 2026-06-07 16:29:22

我需要的是后训练路线学习的博客

---

# chatgpt response

对，你现在要看的重点应该换成 **“后训练路线学习博客”**，而不是 Agent 架构博客。  
前面 Lilian Weng 那篇适合补 Agent 系统结构，但它不是后训练主线。后训练路线应该围绕：

**SFT → Reward Model / Preference Data → RLHF / PPO → DPO → RLVR / GRPO → 工程框架 TRL / OpenRLHF / verl → Agent / Tool-use 后训练**

下面这几篇更适合你。

---

## 一、主线学习：从整体认识后训练

### 1. PyTorch：**A Primer on LLM Post-Training**

这是最适合当第一篇精读的后训练博客。它专门讲 LLM post-training，覆盖 SFT、RLHF、DPO、PPO、reward model、infrastructure 等内容，而且比论文更像学习路线。PyTorch 这篇文章明确把 post-training 解释为让模型获得指令遵循、对话和推理能力的重要阶段。([PyTorch](https://pytorch.org/blog/a-primer-on-llm-post-training/?utm_source=chatgpt.com))

**适合总结成 HTML 的路线：**

```text
路线一：什么是 Post-training 后训练
路线二：SFT 监督微调
路线三：Preference Data 偏好数据
路线四：Reward Model 奖励模型
路线五：RLHF / PPO
路线六：DPO 直接偏好优化
路线七：Infrastructure 工程基础
路线八：后训练如何接 Agent
```

这篇最适合我下一篇给你做详细 HTML。

---

### 2. Nathan Lambert：**RLHF Book**

这不是普通博客，而是免费在线书，但非常适合作为“后训练路线总教材”。它覆盖 RLHF、preference tuning、reward models、RLVR 和 post-training language models，并且配套代码和课程资源。([RLHF Book](https://rlhfbook.com/?utm_source=chatgpt.com))

**适合用来系统补理论：**

```text
第一部分：RLHF 为什么出现
第二部分：偏好数据怎么来
第三部分：Reward Model 怎么训练
第四部分：PPO / Policy Gradient
第五部分：DPO / IPO / KTO 等偏好优化
第六部分：RLVR 与 reasoning model
第七部分：post-training 的工程与评测
```

如果你想“学懂”，这本要长期读；如果你想“快速搭路线”，先读 PyTorch 那篇。

---

### 3. Nathan Lambert：**The State of Post-training in 2025**

这篇适合在你读完基础后看，用来理解为什么 2025 年之后后训练越来越重要。文章强调 post-training techniques 对最终模型表现的影响越来越大。([Interconnects AI](https://www.interconnects.ai/p/the-state-of-post-training-2025?utm_source=chatgpt.com))

**它适合总结成：**

```text
后训练为什么变重要
DPO / PPO 争论
RLVR 为什么兴起
reasoning model 和 post-training 的关系
post-training 的未来方向
```

这篇偏“趋势判断”，不适合作为第一篇，但适合第二阶段看。

---

## 二、算法主线：SFT、DPO、PPO、GRPO

### 4. Hugging Face：**A Guide to Reinforcement Learning Post-Training for LLMs**

这篇是比较新的后训练算法综述博客，讲 DPO、RLHF、PPO、GRPO 等。它直接把 DPO 放在 RLHF 目标下解释，并说明 DPO 不需要单独训练 reward model，而是从偏好数据中直接优化策略。([Hugging Face](https://huggingface.co/blog/karina-zadorozhny/guide-to-llm-post-training-algorithms?utm_source=chatgpt.com))

**适合学习：**

```text
DPO 是怎么从 RLHF 目标推出来的
PPO 为什么复杂
GRPO 为什么适合 reasoning
不同算法什么时候用
```

这篇适合和 TRL 文档一起看。

---

### 5. Hugging Face：**From Policy Gradients to PPO, GAE, and DPO for LLM Alignment**

这篇更适合补 RL 数学线。它从 policy gradient 开始，讲 REINFORCE、PPO、GAE，最后讲 DPO。([Hugging Face](https://huggingface.co/blog/NormalUhr/rlhf-pipeline?utm_source=chatgpt.com))

**适合你有基础后看：**

```text
Policy Gradient 策略梯度
REINFORCE
PPO clipped objective
GAE 优势估计
DPO 和 RLHF 的关系
```

如果你不想被公式劝退，可以先看 PyTorch，再看这篇。

---

### 6. RLHF Book：**Policy Gradients 章节**

这章适合专门补 PPO、GRPO、REINFORCE、RLOO。RLHF Book 的 policy gradients 章节说明，PPO、GRPO、REINFORCE 这类 policy-gradient RL 算法使用新生成样本来更新模型。([RLHF Book](https://rlhfbook.com/c/06-policy-gradients?utm_source=chatgpt.com))

这部分是你理解 **GRPO / RLVR / reasoning post-training** 的基础。

---

## 三、Reasoning / RLVR / GRPO 主线

### 7. DeepSeek-R1 技术报告

这是 reasoning post-training 必读。DeepSeek-R1 技术报告指出，LLM 的推理能力可以通过纯 RL 激发出来，并出现 self-reflection、verification、dynamic strategy adaptation 等行为。([arXiv](https://arxiv.org/abs/2501.12948?utm_source=chatgpt.com))

**它适合总结成：**

```text
R1-Zero 为什么重要
为什么 RL 能激发推理
GRPO 是什么
RLVR 奖励怎么设计
Aha moment 是什么
为什么还需要冷启动数据
Distillation 蒸馏为什么重要
```

这篇是后训练路线里非常关键的一篇。

---

### 8. Fireworks AI：**Beyond Supervised Fine-Tuning: RL with Verifiable Reward**

这篇适合理解 RLVR。文章讨论了 DeepSeek R1-Zero 如何使用 GRPO 进行训练，并强调模型能通过复杂 chain of thought 自我演化解决问题。([Fireworks AI](https://fireworks.ai/blog/reinforcement-learning-with-verifiable-reward?utm_source=chatgpt.com))

**适合学习：**

```text
为什么 SFT 不够
什么是 verifiable reward 可验证奖励
数学 / 代码 / 格式任务为什么适合 RLVR
GRPO 如何和可验证奖励结合
```

这篇比 DeepSeek 论文更像博客，适合做中文精读。

---

### 9. verl 文档：**GRPO**

如果你想真正动手，verl 的 GRPO 文档很有价值。它解释了 PPO 通常依赖 critic model，而 GRPO 通过取消单独 critic 来降低资源开销。([Verl](https://verl.readthedocs.io/en/latest/algo/grpo.html?utm_source=chatgpt.com))

**适合实践前看：**

```text
PPO 为什么需要 critic
GRPO 为什么不需要 critic
group relative advantage 怎么理解
reward normalization 怎么做
训练时有哪些工程坑
```

---

## 四、工程框架路线

### 10. Hugging Face TRL

TRL 是最适合入门的后训练库，支持 SFT、DPO、GRPO 等方法。它的 DPOTrainer 文档提供了直接训练 Qwen 模型的示例。([Hugging Face](https://huggingface.co/docs/trl/en/dpo_trainer?utm_source=chatgpt.com))

**适合你的第一轮实践：**

```text
SFTTrainer
DPOTrainer
GRPOTrainer
RewardTrainer
数据格式
训练脚本
评测
```

---

### 11. OpenRLHF

OpenRLHF 更偏大规模 RLHF / RLVR 工程。它的文档说明支持 PPO、REINFORCE++、GRPO、RLOO 等算法，并采用 Ray + vLLM + DeepSpeed 的分布式架构。([OpenRLHF](https://openrlhf.readthedocs.io/?utm_source=chatgpt.com))

**适合进阶工程：**

```text
Ray + vLLM rollout
Actor / Critic / Reward / Reference model
PPO / GRPO / RLOO
多轮 Agent executor
异步 rollout
```

---

### 12. verl

verl 是更前沿的 RL post-training 框架，官方文档称它是面向 LLM post-training 的灵活高效 RL 训练框架。([Verl](https://verl.readthedocs.io/?utm_source=chatgpt.com))

**适合你后期看：**

```text
HybridFlow
GRPO
PPO
vLLM rollout
训练 / 推理混合负载
多机多卡
```

---

## 我建议你真正的阅读顺序

### 第一阶段：建立路线

1. **PyTorch：A Primer on LLM Post-Training**  
2. **RLHF Book：Overview / Preference Data / Reward Model**

目标：知道 SFT、RLHF、DPO、PPO 是什么。

---

### 第二阶段：理解偏好优化

3. **Hugging Face：DPO / RL Post-training guide**  
4. **RLHF Book：DPO / Policy Gradient 章节**

目标：知道 DPO 和 PPO 的区别，知道为什么 DPO 不需要显式 reward model。

---

### 第三阶段：进入 RLVR / GRPO

5. **DeepSeek-R1 技术报告**  
6. **Fireworks：RL with Verifiable Reward**  
7. **verl：GRPO 文档**

目标：理解 reasoning model 的后训练路线。

---

### 第四阶段：动手实践

8. **TRL 文档：SFTTrainer / DPOTrainer / GRPOTrainer**  
9. **OpenRLHF 文档**  
10. **verl 文档**

目标：能跑一个小型 SFT → DPO → GRPO 项目。

---

## 我建议下一篇就做这个

**PyTorch：A Primer on LLM Post-Training**

因为它最适合作为“后训练路线学习”的第一篇精读。它比 DeepSeek-R1 更基础，比 RLHF Book 更短，比 Hugging Face 文档更像一条完整路线。

我下一步可以按你喜欢的格式做：

```text
原博客原图
路线分块
中文详细总结
每张图解释
英文术语中文解释
后训练实践启发
可复现实验路线
```

先做 **PyTorch 这篇** 最合适。

---

# you asked

message time: 2026-06-07 16:30:25

开始写html 要详细具体 很详细

---

# chatgpt response

下面先给你一版**完整 HTML 精读讲义**，选的是 PyTorch 官方博客 **A Primer on LLM Post-Training**。这篇适合作为“后训练路线学习”的第一篇，因为它按 SFT、DPO、Online RL / PPO、Reward Pipeline、Test-time Reasoning、GRPO 的顺序讲了后训练主线；原文也明确说 post-training 用来教模型如何对话、如何以人类喜欢的方式回答以及如何推理。([PyTorch](https://pytorch.org/blog/a-primer-on-llm-post-training/))

你复制下面全部内容，保存为：`pytorch_post_training_notes.html`，然后用浏览器打开。

**Document Title: **

<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>PyTorch《A Primer on LLM Post-Training》中文精读：后训练路线学习版</title>
<style>
body {
  font-family: "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
  line-height: 1.88;
  max-width: 1160px;
  margin: 38px auto;
  padding: 0 32px 110px;
  background: #f7f8fb;
  color: #1f2937;
}

h1 {
  font-size: 35px;
  line-height: 1.35;
  border-bottom: 5px solid #2563eb;
  padding-bottom: 16px;
  margin-bottom: 26px;
}

h2 {
  margin-top: 54px;
  padding: 13px 17px;
  font-size: 28px;
  background: #eef4ff;
  border-left: 8px solid #2563eb;
}

h3 {
  margin-top: 32px;
  font-size: 22px;
  color: #111827;
}

h4 {
  margin-top: 24px;
  font-size: 18px;
  color: #1f2937;
}

p {
  margin: 12px 0;
}

a {
  color: #2563eb;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.box {
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 12px;
  padding: 18px 22px;
  margin: 18px 0;
}

.note {
  background: #fff7d6;
  border-left: 6px solid #d6a800;
}

.train {
  background: #ecfdf3;
  border-left: 6px solid #16a34a;
}

.warn {
  background: #fff1f1;
  border-left: 6px solid #dc2626;
}

.term {
  background: #f5f0ff;
  border-left: 6px solid #7c3aed;
}

.figure {
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 14px;
  padding: 16px;
  margin: 24px 0;
}

.figure img {
  width: 100%;
  max-height: 720px;
  object-fit: contain;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}

.caption {
  color: #667085;
  font-size: 14px;
  margin-top: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 18px 0;
  background: #ffffff;
}

th, td {
  border: 1px solid #d9e2ef;
  padding: 11px 13px;
  vertical-align: top;
}

th {
  background: #f1f5f9;
}

pre {
  background: #111827;
  color: #e5e7eb;
  padding: 18px;
  border-radius: 10px;
  overflow-x: auto;
  line-height: 1.55;
  font-family: Consolas, Monaco, monospace;
}

code {
  background: #eef2f7;
  padding: 2px 5px;
  border-radius: 5px;
  font-family: Consolas, Monaco, monospace;
}

ul, ol {
  padding-left: 28px;
}

li {
  margin: 7px 0;
}

.small {
  color: #6b7280;
  font-size: 14px;
}

.toc a {
  display: block;
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 9px;
  padding: 9px 12px;
  margin: 7px 0;
}

.route {
  font-weight: bold;
  color: #2563eb;
}

hr {
  border: none;
  border-top: 1px solid #d9e2ef;
  margin: 36px 0;
}

.k {
  font-weight: bold;
  color: #0f766e;
}

.red {
  color: #dc2626;
  font-weight: bold;
}

.blue {
  color: #2563eb;
  font-weight: bold;
}

.gray {
  color: #6b7280;
}
</style>
</head>

<body>

<h1>PyTorch《A Primer on LLM Post-Training》中文精读笔记<br>后训练路线学习版</h1>

<div class="box note">
<p><strong>原文标题：</strong>A Primer on LLM Post-Training</p>
<p><strong>作者：</strong>Davide Testuggine</p>
<p><strong>发布时间：</strong>2025 年 8 月 26 日</p>
<p><strong>原文链接：</strong><a href="https://pytorch.org/blog/a-primer-on-llm-post-training/" target="_blank">打开 PyTorch 官方博客</a></p>
<p><strong>学习定位：</strong>这篇文章适合作为“后训练路线”的第一篇精读。它不是单讲 Agent，也不是单讲 RLHF，而是把现代 LLM 后训练拆成一条可学习路线：Post-training 数据格式 → SFT → Rejection Sampling → RL 基础 → RLHF → DPO → Online RL / PPO → Reward Pipeline → Test-time Reasoning → GRPO。</p>
</div>

<div class="box train">
<strong>总判断：</strong>
这篇文章的核心价值在于，它把“后训练”从抽象名词变成了工程路线。你应该把它理解为：预训练模型只是会补全文本，后训练才让模型学会对话格式、指令遵循、偏好对齐、推理、工具调用和奖励优化。对于后训练 Agent 来说，这篇文章是基础，因为 Agent 后训练本质上也是在训练模型如何在某种格式、某种反馈和某种奖励下选择更好的行为。
</div>

<h2>目录：按照后训练学习路线分块</h2>

<div class="toc">
<a href="#route0">路线零：为什么需要 Post-training 后训练</a>
<a href="#route1">路线一：Post-training Data Format 后训练数据格式</a>
<a href="#route2">路线二：整体管线——SFT → DPO → Online RL</a>
<a href="#route3">路线三：SFT 监督微调——先学会模仿</a>
<a href="#route4">路线四：Rejection Sampling 拒绝采样——让模型自我生成更好数据</a>
<a href="#route5">路线五：RL 强化学习基础——从“会模仿”到“会试错”</a>
<a href="#route6">路线六：RLHF 奖励模型——把人类偏好变成奖励</a>
<a href="#route7">路线七：DPO 直接偏好优化——不用显式 Reward Model 的偏好训练</a>
<a href="#route8">路线八：Online RL / PPO——真正在线探索的强化学习</a>
<a href="#route9">路线九：Reward Pipeline 奖励管线——从人类偏好走向可验证奖励</a>
<a href="#route10">路线十：Test-time Reasoning 与 DeepSeek-R1——为什么 RL 能激发推理</a>
<a href="#route11">路线十一：PPO 深入理解——为什么 PPO 稳但复杂</a>
<a href="#route12">路线十二：GRPO——为什么 reasoning 后训练常提它</a>
<a href="#route13">路线十三：把这篇博客转成你的学习与复现实验计划</a>
<a href="#terms">术语表：英文术语 + 中文解释</a>
</div>

<hr>

<h2 id="route0">路线零：为什么需要 Post-training 后训练</h2>

<p>
原文开头先指出一个关键事实：现在的 LLM 已经不只是改写文档，它们可以“think before they act”，也就是在行动前思考；可以 plan，进行规划；可以 call tools，调用浏览器等工具；可以 write code and check that it works，写代码并检查代码是否能运行。
这些能力不是单纯靠预训练自然得到的，而是在 post-training 后训练阶段被开发出来的。
</p>

<h3>0.1 预训练模型到底学到了什么？</h3>

<p>
Pre-training，预训练，本质上是大规模 next-token prediction，即下一个 token 预测。模型在海量文本上学习语言、事实、模式和世界知识。
但预训练模型并不天然知道“聊天规则”。
它只是看到一段文本后继续补全文本。
</p>

<div class="box warn">
<strong>关键误区：</strong>
很多人以为预训练后的模型天然就是 ChatGPT 这种对话助手。实际上，预训练模型更像一个超级自动补全文本的机器。它知道很多知识，但不一定知道什么时候该停、谁在说话、如何遵守系统规则、如何按照用户偏好回答。
</div>

<h3>0.2 后训练到底教什么？</h3>

<table>
<tr>
<th>后训练要教的能力</th>
<th>中文解释</th>
<th>为什么预训练不够</th>
</tr>
<tr>
<td>Conversation format</td>
<td>对话格式</td>
<td>预训练数据是普通文本，不一定有 system / user / assistant 轮次结构。</td>
</tr>
<tr>
<td>Instruction following</td>
<td>指令遵循</td>
<td>预训练模型会续写文本，但不一定按用户要求做事。</td>
</tr>
<tr>
<td>Preference alignment</td>
<td>偏好对齐</td>
<td>人类喜欢什么样的回答，不是单靠 next-token prediction 就能学准。</td>
</tr>
<tr>
<td>Reasoning</td>
<td>推理</td>
<td>复杂推理需要中间步骤、验证、试错和奖励优化。</td>
</tr>
<tr>
<td>Tool use</td>
<td>工具调用</td>
<td>工具调用涉及格式、参数、环境反馈，和普通文本补全不同。</td>
</tr>
<tr>
<td>Safety / policy following</td>
<td>安全与规则遵循</td>
<td>系统规则必须比普通上下文有更高优先级。</td>
</tr>
</table>

<div class="box train">
<strong>对后训练 Agent 的意义：</strong>
Agent 后训练不是从零训练一个“智能体”，而是在已有预训练模型上，继续训练它如何遵守对话格式、如何调用工具、如何根据反馈修正行为、如何优化奖励。也就是说，Agent 后训练是 post-training 的一个扩展方向。
</div>

<hr>

<h2 id="route1">路线一：Post-training Data Format 后训练数据格式</h2>

<p>
原文先讲数据格式，这是非常重要的。因为 LLM 的底层接口没有变：你给它一段文本，它继续补全文本。
所谓 ChatGPT 式对话，是系统在背后把 system、user、assistant 等角色信息拼接成模型能读懂的文本格式。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/1-3.png" alt="Chat interface example">
<div class="caption">
图 1：聊天 UI 中的用户与助手对话示例。原图来源：PyTorch 官方博客。
<a href="https://pytorch.org/wp-content/uploads/2025/08/1-3.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片详细解读</h3>

<p>
这张图表面上只是一个聊天界面：用户问“法国首都是哪里”，助手回答“巴黎”；用户继续问“那里有多少人，只告诉我数字”，助手回答一个数字。
但原文想强调的是：你看到的是 UI，模型看到的不是 UI，而是被格式化后的文本序列。
</p>

<table>
<tr>
<th>图中现象</th>
<th>背后的模型输入</th>
<th>后训练意义</th>
</tr>
<tr>
<td>用户气泡</td>
<td><code>&lt;user&gt; ... &lt;/user&gt;</code> 或类似 role token</td>
<td>模型需要知道这部分是用户输入，而不是自己要学习生成的内容。</td>
</tr>
<tr>
<td>助手回答</td>
<td><code>&lt;assistant&gt; ...</code></td>
<td>模型需要学习从 assistant 位置开始生成回答。</td>
</tr>
<tr>
<td>多轮对话</td>
<td>system + user + assistant + user + assistant 的完整历史</td>
<td>模型要根据上下文继续回答，而不是重新开始。</td>
</tr>
<tr>
<td>助手停止说话</td>
<td>遇到 end-of-turn token 后停止生成</td>
<td>停止条件本身也需要格式支持和后训练。</td>
</tr>
</table>

<h3>1.1 Llama 3 风格的对话格式</h3>

<p>
原文给了一个类似 Llama 3 的格式示例。它大致是：
</p>

<pre>
&lt;|begin_of_text|&gt;
&lt;|start_header_id|&gt;system&lt;|end_header_id|&gt;
系统规则 ...
&lt;|eot_id|&gt;

&lt;|start_header_id|&gt;user&lt;|end_header_id|&gt;
What is the capital of France?
&lt;|eot_id|&gt;

&lt;|start_header_id|&gt;assistant&lt;|end_header_id|&gt;
The capital of France is Paris.
&lt;|eot_id|&gt;

&lt;|start_header_id|&gt;user&lt;|end_header_id|&gt;
How many people live there? Tell me just the number.
&lt;|eot_id|&gt;

&lt;|start_header_id|&gt;assistant&lt;|end_header_id|&gt;
从这里开始生成
</pre>

<h3>1.2 为什么格式如此重要？</h3>

<table>
<tr>
<th>格式元素</th>
<th>中文解释</th>
<th>模型学到什么</th>
</tr>
<tr>
<td>System prompt</td>
<td>系统提示词</td>
<td>最高优先级规则，例如安全规则、助手身份、回答风格。</td>
</tr>
<tr>
<td>User message</td>
<td>用户消息</td>
<td>当前任务或问题。</td>
</tr>
<tr>
<td>Assistant message</td>
<td>助手消息</td>
<td>模型应该学习生成的目标部分。</td>
</tr>
<tr>
<td>End-of-turn token</td>
<td>轮次结束标记</td>
<td>告诉模型一次回答结束，应该停止。</td>
</tr>
<tr>
<td>Header tokens</td>
<td>角色头标记</td>
<td>区分谁在说话，避免模型冒充用户或系统。</td>
</tr>
</table>

<div class="box train">
<strong>后训练 Agent 启发：</strong>
Agent 训练也必须先定义格式。例如工具调用 Agent 不能只写自然语言数据，而要规定：
<pre>
&lt;system&gt; 可用工具列表和规则 &lt;/system&gt;
&lt;user&gt; 用户任务 &lt;/user&gt;
&lt;assistant&gt;
Thought: ...
Action: calculator({"expression": "2+2"})
&lt;/assistant&gt;
&lt;tool&gt; 4 &lt;/tool&gt;
&lt;assistant&gt; Final Answer: 4 &lt;/assistant&gt;
</pre>
格式稳定，后续 SFT、DPO、RLVR 才能训练得稳。
</div>

<hr>

<h2 id="route2">路线二：整体管线——SFT → DPO → Online RL</h2>

<p>
原文接着用 OLMo 2 论文中的后训练管线做引子，把一条典型 LLM 后训练路线概括为三个阶段：SFT、DPO、Online RL。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/2-3.png" alt="SFT to DPO to Online RL pipeline">
<div class="caption">
图 2：一个简化的 LLM 后训练管线：SFT → DPO → Online RL。原图来源：PyTorch 官方博客。
<a href="https://pytorch.org/wp-content/uploads/2025/08/2-3.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片详细解读</h3>

<table>
<tr>
<th>阶段</th>
<th>中文名称</th>
<th>它在做什么</th>
<th>数据是什么</th>
<th>主要目标</th>
</tr>
<tr>
<td>SFT</td>
<td>Supervised Fine-Tuning，监督微调</td>
<td>让模型模仿高质量回答。</td>
<td>prompt → ideal response。</td>
<td>让模型先学会基本对话、指令遵循和格式。</td>
</tr>
<tr>
<td>DPO</td>
<td>Direct Preference Optimization，直接偏好优化</td>
<td>让模型偏向人类更喜欢的回答，远离较差回答。</td>
<td>prompt + chosen + rejected。</td>
<td>在不显式训练奖励模型的情况下做偏好对齐。</td>
</tr>
<tr>
<td>Online RL</td>
<td>在线强化学习</td>
<td>让当前模型自己生成新答案，通过奖励继续优化。</td>
<td>rollouts + rewards。</td>
<td>探索新行为，提高上限，尤其适合推理、代码、工具任务。</td>
</tr>
</table>

<h3>2.1 为什么是这个顺序？</h3>

<p>
这个顺序背后的逻辑是：
</p>

<ol>
<li><strong>先让模型会说话：</strong>SFT 让模型学会基本格式和回答方式。</li>
<li><strong>再让模型说得更符合偏好：</strong>DPO 用 chosen / rejected 数据调整偏好。</li>
<li><strong>最后让模型探索更优策略：</strong>Online RL 允许模型自己生成新轨迹，并用奖励优化。</li>
</ol>

<div class="box note">
<strong>一句话理解：</strong>
SFT 解决“会不会”，DPO 解决“偏不偏向好答案”，Online RL 解决“能不能通过探索超过已有数据上限”。
</div>

<h3>2.2 后训练路线和 Agent 的关系</h3>

<table>
<tr>
<th>普通 LLM 后训练</th>
<th>Agent 后训练对应版本</th>
</tr>
<tr>
<td>SFT：学习标准回答。</td>
<td>SFT：学习标准工具调用轨迹，例如 Thought → Action → Observation → Final。</td>
</tr>
<tr>
<td>DPO：偏向更好回答。</td>
<td>DPO：偏向更好动作、更好工具参数、更好任务拆解。</td>
</tr>
<tr>
<td>Online RL：生成答案并用 reward 优化。</td>
<td>Online RL：Agent 在环境中执行动作，根据任务完成率、测试通过率、工具反馈优化。</td>
</tr>
</table>

<hr>

<h2 id="route3">路线三：SFT 监督微调——先学会模仿</h2>

<p>
SFT，Supervised Fine-Tuning，监督微调。原文说，SFT 的核心是 imitation，即模仿。
它让模型逐 token 学习理想答案。
</p>

<h3>3.1 SFT 和预训练有什么相同与不同？</h3>

<p>
从形式上看，SFT 和预训练都像 next-token prediction。
但关键区别是：SFT 只对 assistant response 计算 loss，不对 system prompt 和 user prompt 计算 loss。
</p>

<table>
<tr>
<th>比较项</th>
<th>Pre-training 预训练</th>
<th>SFT 监督微调</th>
</tr>
<tr>
<td>数据</td>
<td>海量普通文本</td>
<td>结构化指令数据、对话数据、问答数据</td>
</tr>
<tr>
<td>目标</td>
<td>学习世界知识和语言模式</td>
<td>学习如何回答用户、遵守格式和指令</td>
</tr>
<tr>
<td>Loss 计算</td>
<td>通常对整段文本计算 next-token loss</td>
<td>只对 assistant response 部分计算 loss</td>
</tr>
<tr>
<td>是否学习 prompt</td>
<td>没有明确 prompt / response 区分</td>
<td>prompt 用来条件化输入，但不作为目标学习</td>
</tr>
<tr>
<td>规模</td>
<td>万亿级 token</td>
<td>通常远小于预训练，可能是几百万样本、几十亿 token 以内</td>
</tr>
</table>

<h3>3.2 SFT 的 mask 思想</h3>

<p>
SFT 训练时，模型输入包括 system、user、assistant 全部内容。
但反向传播时，只让 assistant 的回答部分贡献 loss。
</p>

<pre>
输入序列：
[system tokens] [user tokens] [assistant response tokens]

loss mask：
[0 0 0 0 0] [0 0 0 0] [1 1 1 1 1 1]
</pre>

<table>
<tr>
<th>部分</th>
<th>是否输入模型</th>
<th>是否计算 loss</th>
<th>原因</th>
</tr>
<tr>
<td>System prompt</td>
<td>是</td>
<td>否</td>
<td>它提供规则和上下文，但模型不应该学习“生成系统提示”。</td>
</tr>
<tr>
<td>User prompt</td>
<td>是</td>
<td>否</td>
<td>它提供问题，但模型不应该学习“生成用户问题”。</td>
</tr>
<tr>
<td>Assistant response</td>
<td>是</td>
<td>是</td>
<td>这是模型要学习生成的目标。</td>
</tr>
</table>

<div class="box train">
<strong>后训练 Agent 启发：</strong>
如果训练工具调用 Agent，也应该做 mask：
<ul>
<li>用户任务、工具返回、系统工具说明：用于条件化，不计算 loss。</li>
<li>模型要生成的 Thought / Action / Final Answer：计算 loss。</li>
</ul>
否则模型可能错误地学习生成工具返回内容，或者把用户输入也当成目标输出。
</div>

<h3>3.3 SFT 的天花板问题</h3>

<p>
原文用下棋类比：如果你用 Magnus Carlsen 的棋谱做 SFT，模型最多学到 Magnus 的水平，因为它只是模仿数据里的动作。
如果数据质量不稳定，模型的上限甚至会被低质量答案拖低。
</p>

<table>
<tr>
<th>SFT 优点</th>
<th>SFT 局限</th>
</tr>
<tr>
<td>简单、稳定、工程成熟。</td>
<td>只能模仿已有答案，无法主动探索更优答案。</td>
</tr>
<tr>
<td>可以复用预训练基础设施。</td>
<td>强依赖数据质量。</td>
</tr>
<tr>
<td>适合训练格式、风格、基础能力。</td>
<td>如果示范答案一般，模型也会学一般。</td>
</tr>
<tr>
<td>训练成本相对可控。</td>
<td>很难处理稀疏奖励和长期任务。</td>
</tr>
</table>

<div class="box note">
<strong>一句话总结：</strong>
SFT 是后训练的起点，但不是终点。它负责把模型带到“能正常做事”的区域，但模型想超过示范数据，通常还需要偏好优化或强化学习。
</div>

<hr>

<h2 id="route4">路线四：Rejection Sampling 拒绝采样——让模型自我生成更好数据</h2>

<p>
原文接着讨论一个问题：既然 SFT 依赖高质量回答，那么这些回答由谁写？
如果让人类写，质量不稳定；如果让模型自己写，又会不会只是学自己？
答案是：可以让模型生成多个答案，然后只保留最好的，这就是 Rejection Sampling，拒绝采样。
</p>

<h3>4.1 Rejection Sampling 的流程</h3>

<pre>
给定一个 prompt
  ↓
让模型生成多个候选答案
  ↓
候选来自不同 checkpoint、随机种子、system prompt 等
  ↓
用奖励模型、人类偏好或规则管线排序
  ↓
保留最好的答案
  ↓
把好答案加入 SFT 数据库
  ↓
继续训练模型
</pre>

<h3>4.2 为什么这不是简单自我复制？</h3>

<p>
关键在于，模型不是只生成一个答案，而是生成很多个答案，并引入外部选择机制。
这个选择机制可以是人类、奖励模型、规则、测试用例、LLM judge 或多种方式组合。
</p>

<table>
<tr>
<th>环节</th>
<th>作用</th>
</tr>
<tr>
<td>多样生成</td>
<td>通过不同随机种子、prompt 或 checkpoint 产生多样候选。</td>
</tr>
<tr>
<td>筛选机制</td>
<td>从候选中挑出更好的样本。</td>
</tr>
<tr>
<td>数据回流</td>
<td>把高质量样本加入训练集。</td>
</tr>
<tr>
<td>多轮迭代</td>
<td>模型逐步爬坡，生成越来越好的候选。</td>
</tr>
</table>

<div class="box train">
<strong>后训练 Agent 启发：</strong>
Agent 也可以用拒绝采样：
<pre>
同一个任务 → 生成多条工具调用轨迹 → 用测试、规则或人工评估打分 → 保留成功轨迹 → 做 SFT
</pre>
比如代码 Agent 可以生成 10 条修复轨迹，只保留测试通过的轨迹作为训练数据。
</div>

<hr>

<h2 id="route5">路线五：RL 强化学习基础——从“会模仿”到“会试错”</h2>

<p>
原文随后转入 Reinforcement Learning，强化学习。RL 的核心是：Agent 对环境采取动作，环境返回结果和奖励，模型根据奖励调整自己的策略。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/3-1.png" alt="Agent environment reward loop">
<div class="caption">
图 3：强化学习中的 Agent、Environment、Reward pipeline。原图来源：PyTorch 官方博客。
<a href="https://pytorch.org/wp-content/uploads/2025/08/3-1.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片详细解读</h3>

<table>
<tr>
<th>图中元素</th>
<th>中文解释</th>
<th>在 LLM / Agent 后训练中的对应物</th>
</tr>
<tr>
<td>Agent</td>
<td>智能体</td>
<td>正在训练的 LLM 或 Agent 模型。</td>
</tr>
<tr>
<td>Actions</td>
<td>动作</td>
<td>生成回答、调用工具、写代码、选择下一步。</td>
</tr>
<tr>
<td>Environment</td>
<td>环境</td>
<td>用户、浏览器、代码测试环境、工具系统、数学验证器。</td>
</tr>
<tr>
<td>Data / what happened</td>
<td>发生了什么</td>
<td>模型输出、工具结果、测试结果、用户反馈。</td>
</tr>
<tr>
<td>Reward pipelines</td>
<td>奖励管线</td>
<td>把环境结果转成 reward，例如通过测试 +1、格式错误 -1。</td>
</tr>
<tr>
<td>Labeled data to train on</td>
<td>训练信号</td>
<td>奖励成为优化模型策略的训练信号。</td>
</tr>
</table>

<h3>5.1 RL 和 SFT 的根本差异</h3>

<table>
<tr>
<th>维度</th>
<th>SFT</th>
<th>RL</th>
</tr>
<tr>
<td>训练方式</td>
<td>模仿标准答案。</td>
<td>尝试动作，观察奖励。</td>
</tr>
<tr>
<td>信号密度</td>
<td>每个 token 都有标准答案。</td>
<td>可能只有最终一个 reward。</td>
</tr>
<tr>
<td>是否探索</td>
<td>不探索，只学习已有数据。</td>
<td>可以探索新行为。</td>
</tr>
<tr>
<td>上限</td>
<td>受示范数据限制。</td>
<td>受奖励质量和探索能力限制。</td>
</tr>
<tr>
<td>工程成本</td>
<td>低，训练稳定。</td>
<td>高，需要 rollout、reward、同步和稳定技巧。</td>
</tr>
</table>

<h3>5.2 “If you can judge it, you can learn it”</h3>

<p>
原文有一句很重要的话：如果你能判断什么是好行为，你就能让模型学会它。
这句话是理解 RL 后训练的钥匙。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/4-1.png" alt="RL closes the gap between judging and doing">
<div class="caption">
图 4：RL closes the gap between judging and doing。原图来源：PyTorch 官方博客。
<a href="https://pytorch.org/wp-content/uploads/2025/08/4-1.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片详细解读</h3>

<p>
这张图用蓝线表示 Judging Ability，即判断能力；红线表示 Doing Ability，即执行能力。
很多时候，人类或奖励系统能判断一个结果好不好，但自己不一定能生成那个结果。
RL 的价值就在于，它可以把“会判断”转化为“会做”。
</p>

<table>
<tr>
<th>图中曲线</th>
<th>中文解释</th>
<th>含义</th>
</tr>
<tr>
<td>Judging Ability</td>
<td>判断能力</td>
<td>能识别错误、给出评分、判断哪个答案更好。</td>
</tr>
<tr>
<td>Doing Ability</td>
<td>执行能力</td>
<td>真正生成高质量答案或完成任务的能力。</td>
</tr>
<tr>
<td>RL's Domain</td>
<td>强化学习作用区域</td>
<td>RL 用奖励把判断能力转化为执行能力。</td>
</tr>
</table>

<div class="box note">
<strong>一句话理解：</strong>
SFT 要求你给模型“标准答案”；RL 只要求你能判断模型做得好不好。只要判断信号可靠，模型就可以通过试错学习。
</div>

<h3>5.3 Reward Hacking 奖励黑客</h3>

<p>
原文特别提醒：RL 会最大化你给它的 reward，但它不一定理解你真正想要什么。
如果奖励设计有漏洞，模型可能会钻漏洞，这叫 Reward Hacking。
</p>

<table>
<tr>
<th>开发者真正想要</th>
<th>奖励函数实际写的</th>
<th>可能后果</th>
</tr>
<tr>
<td>模型写出正确、简洁、安全的代码。</td>
<td>测试通过就给高分。</td>
<td>模型可能写硬编码、绕过测试，而不是通用解决方案。</td>
</tr>
<tr>
<td>模型进行充分但不过长的推理。</td>
<td>答案正确 + 必须有 thinking 标签。</td>
<td>模型可能无限延长推理，因为没有长度惩罚。</td>
</tr>
<tr>
<td>Agent 高效完成任务。</td>
<td>只奖励最终成功。</td>
<td>模型可能大量无意义调用工具，只要最后成功就行。</td>
</tr>
<tr>
<td>模型遵守安全规则。</td>
<td>只奖励有帮助。</td>
<td>模型可能过度迎合用户，忽略安全边界。</td>
</tr>
</table>

<div class="box warn">
<strong>后训练重点：</strong>
RL 的上限取决于 reward 质量。奖励越准确，模型越可能学到你想要的行为；奖励越粗糙，模型越可能学会投机。
</div>

<hr>

<h2 id="route6">路线六：RLHF 奖励模型——把人类偏好变成奖励</h2>

<p>
RLHF，全称 Reinforcement Learning from Human Feedback，即基于人类反馈的强化学习。
原文把它解释为：有些任务很难写规则，比如什么样的回答更有帮助、更自然、更符合人类偏好。
这时可以训练一个 classifier 或 reward model，让它根据人类偏好给回答打分。
</p>

<h3>6.1 RLHF 的基本流程</h3>

<pre>
用户 prompt
  ↓
模型生成多个回答
  ↓
人类标注哪个回答更好
  ↓
训练 Reward Model 奖励模型
  ↓
模型继续生成回答
  ↓
Reward Model 给分
  ↓
用 PPO / RL 算法优化模型
</pre>

<table>
<tr>
<th>环节</th>
<th>中文解释</th>
<th>关键问题</th>
</tr>
<tr>
<td>Preference Data</td>
<td>偏好数据</td>
<td>人类选择哪个回答更好。</td>
</tr>
<tr>
<td>Reward Model</td>
<td>奖励模型</td>
<td>把回答映射成一个分数。</td>
</tr>
<tr>
<td>Policy Model</td>
<td>策略模型</td>
<td>正在训练的 LLM。</td>
</tr>
<tr>
<td>Reference Model</td>
<td>参考模型</td>
<td>用来约束策略模型不要偏离太远。</td>
</tr>
<tr>
<td>RL Optimization</td>
<td>强化学习优化</td>
<td>用 PPO 等算法提升 reward。</td>
</tr>
</table>

<h3>6.2 Reward Model 的上限</h3>

<p>
原文强调：如果你用分类器提供 reward，那么模型的上限就是这个分类器的准确性。
这说明 reward model 不是中立的，它会塑造模型最终学到什么。
</p>

<div class="box warn">
<strong>风险：</strong>
如果 reward model 偏爱啰嗦答案，模型会变啰嗦；如果 reward model 看不出事实错误，模型可能学会写得很像但不真实；如果 reward model 只看格式，模型可能学会格式正确但内容空洞。
</div>

<h3>6.3 对 Agent 后训练的启发</h3>

<table>
<tr>
<th>Agent 任务</th>
<th>Reward Model 可以判断什么</th>
<th>局限</th>
</tr>
<tr>
<td>工具调用</td>
<td>工具是否选对、参数是否合理。</td>
<td>复杂工具返回可能需要规则验证。</td>
</tr>
<tr>
<td>任务规划</td>
<td>计划是否清晰、步骤是否完整。</td>
<td>计划是否真的有效，需要环境验证。</td>
</tr>
<tr>
<td>代码修复</td>
<td>代码风格、解释质量。</td>
<td>是否真正修复 bug，最好靠测试。</td>
</tr>
<tr>
<td>研究型 Agent</td>
<td>总结是否合理。</td>
<td>事实正确性需要引用和检索验证。</td>
</tr>
</table>

<div class="box train">
<strong>经验原则：</strong>
能用规则验证的地方，优先用规则；规则无法表达的地方，再用 reward model 或 LLM judge。
</div>

<hr>

<h2 id="route7">路线七：DPO 直接偏好优化——不用显式 Reward Model 的偏好训练</h2>

<p>
DPO，全称 Direct Preference Optimization，直接偏好优化。
原文说，DPO 是专门用于 LLM RLHF 的算法，它不是像 PPO 那样的通用 RL 算法。
它的吸引力在于：不需要单独训练 reward model，也不需要在线 rollout，就可以用偏好数据优化模型。
</p>

<h3>7.1 DPO 的数据格式</h3>

<pre>
{
  "prompt": "解释什么是过拟合",
  "chosen": "过拟合是指模型在训练集表现很好，但在新数据上表现较差...",
  "rejected": "过拟合就是模型太复杂，没啥。"
}
</pre>

<table>
<tr>
<th>字段</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td>prompt</td>
<td>提示 / 问题</td>
<td>同一个输入。</td>
</tr>
<tr>
<td>chosen</td>
<td>被偏好的回答</td>
<td>人类或评估管线认为更好的回答。</td>
</tr>
<tr>
<td>rejected</td>
<td>被拒绝的回答</td>
<td>较差回答。</td>
</tr>
</table>

<h3>7.2 DPO 的直觉</h3>

<p>
DPO 的直觉非常简单：对于同一个 prompt，让模型提高 chosen 的概率，同时降低 rejected 的概率。
它把偏好优化转化成一个类似监督学习的可微分目标。
</p>

<div class="box note">
<strong>简单理解：</strong>
DPO 不需要告诉模型“这个回答得 8 分，那个回答得 4 分”。它只需要知道：在这一对里，A 比 B 好。
</div>

<h3>7.3 DPO vs PPO</h3>

<table>
<tr>
<th>维度</th>
<th>DPO</th>
<th>PPO</th>
</tr>
<tr>
<td>优化类型</td>
<td>更接近监督学习 / 离线偏好优化</td>
<td>强化学习 / 在线策略优化</td>
</tr>
<tr>
<td>数据</td>
<td>固定偏好对：prompt、chosen、rejected</td>
<td>当前模型生成 rollouts，再用 reward 打分</td>
</tr>
<tr>
<td>是否探索</td>
<td>不探索，只学习已有数据</td>
<td>会探索新回答</td>
</tr>
<tr>
<td>是否需要 Reward Model</td>
<td>不需要显式 reward model</td>
<td>通常需要 reward model 或 reward pipeline</td>
</tr>
<tr>
<td>成本</td>
<td>低，像微调一样稳定</td>
<td>高，需要大量生成和训练同步</td>
</tr>
<tr>
<td>稳定性</td>
<td>较稳定</td>
<td>更不稳定，需要很多技巧</td>
</tr>
<tr>
<td>上限</td>
<td>受偏好数据限制</td>
<td>可以通过探索超过已有数据</td>
</tr>
</table>

<h3>7.4 DPO 适合训练 Agent 的哪些部分？</h3>

<table>
<tr>
<th>Agent 能力</th>
<th>chosen</th>
<th>rejected</th>
</tr>
<tr>
<td>工具选择</td>
<td>选择 calculator</td>
<td>错误地选择 search</td>
</tr>
<tr>
<td>参数生成</td>
<td>JSON 字段完整、参数正确</td>
<td>字段缺失或参数错误</td>
</tr>
<tr>
<td>计划分解</td>
<td>子任务完整、顺序合理</td>
<td>缺关键步骤或顺序错误</td>
</tr>
<tr>
<td>反思修正</td>
<td>指出真实失败原因，并给出可执行改进</td>
<td>泛泛而谈“我应该更小心”</td>
</tr>
<tr>
<td>最终回答</td>
<td>基于工具结果回答</td>
<td>忽略工具结果胡编</td>
</tr>
</table>

<div class="box train">
<strong>DPO 在后训练路线中的位置：</strong>
DPO 适合在 SFT 后使用。SFT 让模型会基本格式和动作，DPO 让模型在多个候选动作中更偏好正确、稳定、可执行的动作。
</div>

<hr>

<h2 id="route8">路线八：Online RL / PPO——真正在线探索的强化学习</h2>

<p>
原文将 Online RL 作为示例管线中的第三个阶段。Online RL 让当前模型自己生成数据，再基于 reward 更新自己。
这和 DPO 的核心区别在于：DPO 使用固定数据，Online RL 使用当前模型不断产生的新 rollouts。
</p>

<h3>8.1 On-policy vs Off-policy</h3>

<table>
<tr>
<th>概念</th>
<th>中文</th>
<th>解释</th>
<th>代表方法</th>
</tr>
<tr>
<td>On-policy</td>
<td>同策略 / 在线策略</td>
<td>训练数据来自当前正在训练的模型。</td>
<td>PPO、A2C、TRPO、GRPO 常被放在这个方向理解。</td>
</tr>
<tr>
<td>Off-policy</td>
<td>异策略 / 离线策略</td>
<td>训练数据来自过去模型、别人模型或固定数据集。</td>
<td>DPO、DQN、Replay Buffer 方法。</td>
</tr>
</table>

<h3>8.2 Online vs Offline：工程视角</h3>

<table>
<tr>
<th>视角</th>
<th>Offline 离线</th>
<th>Online 在线</th>
</tr>
<tr>
<td>数据来源</td>
<td>固定数据集。</td>
<td>训练时实时生成。</td>
</tr>
<tr>
<td>工程复杂度</td>
<td>低。</td>
<td>高，需要 rollout、reward、同步权重。</td>
</tr>
<tr>
<td>探索能力</td>
<td>弱，受数据限制。</td>
<td>强，模型可以发现新行为。</td>
</tr>
<tr>
<td>适合阶段</td>
<td>SFT、DPO。</td>
<td>PPO、GRPO、RLVR。</td>
</tr>
<tr>
<td>Agent 对应</td>
<td>用已有成功轨迹训练。</td>
<td>让 Agent 在环境中实际执行任务并学习。</td>
</tr>
</table>

<h3>8.3 理想化 PPO 训练循环</h3>

<pre>
collector = CollectorClass(model)

for i in range(num_collection):
    collector.sync_weights_()
    data = next(collector)       # 当前模型生成新 rollouts

    for j in range(num_epochs):
        for batch in split_data_randomly(data):
            loss_val = loss_fn(data)
            loss_val.backward()
            optim.step()
            optim.zero_grad()
</pre>

<h3>8.4 为什么 Online RL 工程难？</h3>

<table>
<tr>
<th>难点</th>
<th>解释</th>
<th>Agent 场景中的体现</th>
</tr>
<tr>
<td>生成成本高</td>
<td>LLM 自回归生成 token，需要多次 forward。</td>
<td>Agent 生成多步轨迹、调用工具，成本更高。</td>
</tr>
<tr>
<td>同步权重麻烦</td>
<td>rollout workers 和 trainer 之间需要同步模型权重。</td>
<td>模型更新后，旧轨迹可能变成 off-policy。</td>
</tr>
<tr>
<td>reward 延迟</td>
<td>很多任务只有最终 reward。</td>
<td>代码 Agent 可能要跑完测试才知道成败。</td>
</tr>
<tr>
<td>训练不稳定</td>
<td>策略一变，数据分布也变。</td>
<td>Agent 可能突然学会滥用工具或过度探索。</td>
</tr>
<tr>
<td>环境复杂</td>
<td>需要沙箱、测试、浏览器、API、数据库等。</td>
<td>工具调用 Agent 必须处理真实环境错误。</td>
</tr>
</table>

<div class="box train">
<strong>后训练 Agent 启发：</strong>
真正的 Agent 后训练最终绕不开 Online RL，因为 Agent 必须在环境里行动。
但合理路线不是一上来就 PPO / GRPO，而是：
<pre>
SFT 学格式 → DPO 学偏好 → RLVR / GRPO 学会在环境反馈中探索
</pre>
</div>

<hr>

<h2 id="route9">路线九：Reward Pipeline 奖励管线——从人类偏好走向可验证奖励</h2>

<p>
原文在 “Beyond RLHF” 部分强调：奖励不一定来自人类反馈。
如果你要训练 coding model，可以用测试用例作为奖励；如果你要训练数学推理，可以用 Wolfram 或规则验证答案。
这就是后训练从 RLHF 走向 RLVR 的关键。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/5-1.png" alt="Coding reward pipeline">
<div class="caption">
图 5：编码任务中的奖励管线示例。原图来源：PyTorch 官方博客。
<a href="https://pytorch.org/wp-content/uploads/2025/08/5-1.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片详细解读</h3>

<p>
这张图展示了一个 coding reward pipeline：模型面对 coding problems 生成 solutions，然后经过规则检查、lint、test harness、code style reward model 等模块，最终产生负奖励或比例奖励。
</p>

<table>
<tr>
<th>图中元素</th>
<th>中文解释</th>
<th>作用</th>
<th>奖励类型</th>
</tr>
<tr>
<td>Coding problems</td>
<td>代码问题</td>
<td>输入 prompt，要求模型解决编程任务。</td>
<td>任务源。</td>
</tr>
<tr>
<td>Model being trained</td>
<td>正在训练的模型</td>
<td>生成代码解决方案。</td>
<td>策略模型。</td>
</tr>
<tr>
<td>Solutions</td>
<td>解决方案</td>
<td>模型生成的代码。</td>
<td>待评估对象。</td>
</tr>
<tr>
<td>Rules</td>
<td>规则</td>
<td>例如必须通过 lint、必须通过单元测试。</td>
<td>硬规则。</td>
</tr>
<tr>
<td>Linter</td>
<td>代码风格 / 静态检查器</td>
<td>检查格式、语法、风格问题。</td>
<td>负奖励或辅助奖励。</td>
</tr>
<tr>
<td>Test harness</td>
<td>测试框架</td>
<td>运行单元测试或隐藏测试。</td>
<td>可验证奖励。</td>
</tr>
<tr>
<td>Rules broken?</td>
<td>是否违反规则</td>
<td>如果违反关键规则，给 negative reward。</td>
<td>惩罚。</td>
</tr>
<tr>
<td>Code style RM</td>
<td>代码风格奖励模型</td>
<td>给代码可读性、风格、维护性评分。</td>
<td>比例奖励。</td>
</tr>
<tr>
<td>Rank</td>
<td>排序</td>
<td>根据得分排序多个候选代码。</td>
<td>偏好信号。</td>
</tr>
</table>

<h3>9.1 Reward Pipeline 的类型</h3>

<table>
<tr>
<th>奖励类型</th>
<th>中文解释</th>
<th>适用场景</th>
<th>优点</th>
<th>风险</th>
</tr>
<tr>
<td>Reward Model</td>
<td>奖励模型</td>
<td>人类偏好、写作风格、安全性。</td>
<td>能处理难以写规则的偏好。</td>
<td>可能 reward hacking，模型学会骗评分器。</td>
</tr>
<tr>
<td>Outcome Reward Model, ORM</td>
<td>结果奖励模型</td>
<td>只判断最终答案。</td>
<td>实现简单。</td>
<td>不给中间过程反馈，信用分配困难。</td>
</tr>
<tr>
<td>Process Reward Model, PRM</td>
<td>过程奖励模型</td>
<td>判断推理步骤是否正确。</td>
<td>能提供更细粒度反馈。</td>
<td>噪声大，标注和训练难。</td>
</tr>
<tr>
<td>Rule-based Reward</td>
<td>规则奖励</td>
<td>数学答案、代码测试、格式检查。</td>
<td>客观、可自动化。</td>
<td>规则设计不完整会导致钻漏洞。</td>
</tr>
<tr>
<td>Software Pipeline</td>
<td>软件管线奖励</td>
<td>代码、工具调用、数据库任务。</td>
<td>可靠、工程可扩展。</td>
<td>需要沙箱和执行环境。</td>
</tr>
<tr>
<td>LLM Judge</td>
<td>大模型评审</td>
<td>安全规则、问答质量、摘要质量。</td>
<td>灵活、易部署。</td>
<td>一致性和专业性有限。</td>
</tr>
</table>

<div class="box train">
<strong>对后训练 Agent 的关键启发：</strong>
Agent 后训练最重要的不是“有没有 RL 算法”，而是“有没有好的 reward pipeline”。
对于工具调用 Agent，可以把 reward 拆成：
<ul>
<li>工具选择是否正确；</li>
<li>工具参数是否合法；</li>
<li>工具执行是否成功；</li>
<li>是否利用了工具返回；</li>
<li>是否高效完成任务；</li>
<li>最终答案是否正确。</li>
</ul>
</div>

<hr>

<h2 id="route10">路线十：Test-time Reasoning 与 DeepSeek-R1——为什么 RL 能激发推理</h2>

<p>
原文的后半部分讨论 Test-time compute and reasoning，即测试时计算与推理。
核心问题是：如果模型在回答前能多想一会儿，答案往往更好。
Chain of Thought 和 ReAct 已经证明“让模型说出中间推理”有效，那么下一步就是训练模型更好地使用这段思考空间。
</p>

<h3>10.1 DeepSeek-R1-Zero 的格式提示</h3>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/6-1.png" alt="DeepSeek-R1-Zero training prompt template">
<div class="caption">
图 6：DeepSeek-R1-Zero 的训练提示模板。原图来源：PyTorch 官方博客。
<a href="https://pytorch.org/wp-content/uploads/2025/08/6-1.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片详细解读</h3>

<p>
图中模板要求 Assistant 先在 <code>&lt;think&gt;...&lt;/think&gt;</code> 标签中写 reasoning process，即推理过程，再在 <code>&lt;answer&gt;...&lt;/answer&gt;</code> 中给出最终答案。
这看似只是格式约束，实际上为 RL 提供了可探索空间。
</p>

<table>
<tr>
<th>标签</th>
<th>中文解释</th>
<th>训练意义</th>
</tr>
<tr>
<td><code>&lt;think&gt;</code></td>
<td>思考开始</td>
<td>鼓励模型在回答前生成推理轨迹。</td>
</tr>
<tr>
<td><code>&lt;/think&gt;</code></td>
<td>思考结束</td>
<td>界定推理过程的边界。</td>
</tr>
<tr>
<td><code>&lt;answer&gt;</code></td>
<td>答案开始</td>
<td>明确最终答案位置，便于自动验证。</td>
</tr>
<tr>
<td><code>&lt;/answer&gt;</code></td>
<td>答案结束</td>
<td>便于提取答案并计算 accuracy reward。</td>
</tr>
</table>

<div class="box note">
<strong>关键理解：</strong>
格式奖励不是小事。它让模型稳定地把推理和答案分开，从而让奖励系统可以分别检查“格式是否正确”和“答案是否正确”。
</div>

<h3>10.2 DeepSeek-R1 的两类奖励</h3>

<table>
<tr>
<th>奖励类型</th>
<th>中文</th>
<th>作用</th>
<th>例子</th>
</tr>
<tr>
<td>Accuracy Reward</td>
<td>准确性奖励</td>
<td>判断最终答案是否正确。</td>
<td>数学答案是否等于标准答案；代码是否通过测试。</td>
</tr>
<tr>
<td>Format Reward</td>
<td>格式奖励</td>
<td>判断模型是否遵守指定输出格式。</td>
<td>是否包含 <code>&lt;think&gt;</code> 和 <code>&lt;answer&gt;</code> 标签。</td>
</tr>
</table>

<h3>10.3 Aha Moment：模型学会重新思考</h3>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/7.png" alt="Aha moment in DeepSeek-R1-Zero">
<div class="caption">
图 7：DeepSeek-R1-Zero 训练中的 “aha moment”。原图来源：PyTorch 官方博客。
<a href="https://pytorch.org/wp-content/uploads/2025/08/7.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片详细解读</h3>

<p>
图中红色文字显示模型在推理中突然意识到前面的思路可能有问题，于是主动说“Wait, wait. Wait. That’s an aha moment...”并重新评估推理步骤。
这说明模型通过 RL 学到了一种重要行为：不是一条路走到黑，而是能在推理中自我修正。
</p>

<table>
<tr>
<th>现象</th>
<th>中文解释</th>
<th>后训练意义</th>
</tr>
<tr>
<td>Wait, wait</td>
<td>模型暂停当前推理</td>
<td>学会发现潜在错误。</td>
</tr>
<tr>
<td>re-evaluate</td>
<td>重新评估</td>
<td>从已有推理回退。</td>
</tr>
<tr>
<td>step-by-step</td>
<td>逐步检查</td>
<td>把反思转成新的推理过程。</td>
</tr>
<tr>
<td>self-correction</td>
<td>自我修正</td>
<td>这是推理后训练的核心能力。</td>
</tr>
</table>

<div class="box train">
<strong>对 Agent 后训练的启发：</strong>
Agent 也需要类似 “aha moment”：
<ul>
<li>工具调用失败后，不能重复同一个错误参数；</li>
<li>搜索不到结果后，应该换 query；</li>
<li>测试失败后，应该读取报错并定位原因；</li>
<li>计划不可行时，应该重新规划。</li>
</ul>
这可以训练成：失败 observation → 反思 → 新 action。
</div>

<h3>10.4 推理长度随训练增加</h3>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/8.png" alt="DeepSeek-R1-Zero average response length during training">
<div class="caption">
图 8：DeepSeek-R1-Zero 在 RL 训练中平均回答长度逐渐增长。原图来源：PyTorch 官方博客。
<a href="https://pytorch.org/wp-content/uploads/2025/08/8.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片详细解读</h3>

<p>
图中横轴是训练 steps，纵轴是 average length per response。
可以看到，随着 RL 训练推进，模型平均回答长度逐步上升。
这说明模型学到：在某些推理任务中，多花 test-time compute，也就是测试时计算，能获得更高奖励。
</p>

<div class="box warn">
<strong>重要风险：</strong>
如果只奖励答案正确，而不惩罚过长推理，模型可能学会无限延长 thinking。
因此后训练 reasoning model 时，reward 需要平衡：正确性、格式、推理质量、长度成本。
</div>

<hr>

<h2 id="route11">路线十一：PPO 深入理解——为什么 PPO 稳但复杂</h2>

<p>
原文附录 A 用比较直观的方式解释 PPO。
这一部分对学习后训练很重要，因为你会理解：PPO 不是神秘公式，而是在解决 RL 训练不稳定的问题。
</p>

<h3>11.1 最朴素的策略梯度直觉</h3>

<p>
LLM 输出的是每个 token 的概率分布。
如果某个 action 最后得到高 reward，我们希望提高生成它的概率；如果 reward 低，就降低它的概率。
</p>

<pre>
如果 action 好：
    增大 log_prob(action)

如果 action 坏：
    减小 log_prob(action)
</pre>

<h3>11.2 基础 policy gradient loss</h3>

<pre>
policy_gradient_loss = - (rewards * log_probs).sum(dim=-1).mean()
</pre>

<p>
这个式子的意思是：如果 reward 为正，最大化 log_probs；如果 reward 为负，降低 log_probs。
</p>

<h3>11.3 Advantage 优势函数</h3>

<p>
仅仅看 reward 不够，因为一个动作好不好，要看它相对于可选动作是否更好。
Advantage，优势，就是当前动作比 baseline 好多少。
</p>

<table>
<tr>
<th>概念</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td>Reward</td>
<td>奖励</td>
<td>这个结果得分多少。</td>
</tr>
<tr>
<td>Value</td>
<td>价值 / baseline</td>
<td>平均来说这个状态能拿多少分。</td>
</tr>
<tr>
<td>Advantage</td>
<td>优势</td>
<td>当前动作比平均水平好多少。</td>
</tr>
</table>

<pre>
advantage = reward - value
</pre>

<h3>11.4 PPO 的四个稳定技巧</h3>

<table>
<tr>
<th>技巧</th>
<th>中文解释</th>
<th>为什么需要</th>
</tr>
<tr>
<td>Standardize advantages</td>
<td>标准化优势</td>
<td>防止 reward 分布长尾导致梯度过大。</td>
</tr>
<tr>
<td>Importance sampling</td>
<td>重要性采样</td>
<td>比较新旧策略概率，约束更新幅度。</td>
</tr>
<tr>
<td>Clipping</td>
<td>裁剪</td>
<td>限制 ratio 范围，避免策略一步变化太大。</td>
</tr>
<tr>
<td>Taking min</td>
<td>取最小项</td>
<td>防止模型钻 clipping 的空子，保持保守更新。</td>
</tr>
</table>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/9.png" alt="PPO trust region">
<div class="caption">
图 9：PPO 中 trust region 的直观解释。原图来源：PyTorch 官方博客。
<a href="https://pytorch.org/wp-content/uploads/2025/08/9.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片详细解读</h3>

<p>
图中绿色区域是 trust region，信任区域。PPO 希望新策略不要离旧策略太远。
如果模型参数更新太大，策略可能突然崩掉，生成质量或行为模式发生剧烈变化。
</p>

<table>
<tr>
<th>图中元素</th>
<th>中文解释</th>
<th>含义</th>
</tr>
<tr>
<td>θ</td>
<td>旧参数</td>
<td>更新前的策略。</td>
</tr>
<tr>
<td>θ′</td>
<td>新参数</td>
<td>更新后的策略。</td>
</tr>
<tr>
<td>Trust region</td>
<td>信任区域</td>
<td>允许策略变化的安全范围。</td>
</tr>
<tr>
<td>πθ′ 不应剧烈变化</td>
<td>新策略不要偏离旧策略太多</td>
<td>防止 RL 训练发散。</td>
</tr>
</table>

<h3>11.5 PPO 为什么工程复杂？</h3>

<table>
<tr>
<th>组件</th>
<th>作用</th>
<th>工程成本</th>
</tr>
<tr>
<td>Policy model</td>
<td>生成回答或动作。</td>
<td>大模型训练本身成本高。</td>
</tr>
<tr>
<td>Value network / Critic</td>
<td>预测 baseline。</td>
<td>通常还要训练一个价值模型。</td>
</tr>
<tr>
<td>Reward model / pipeline</td>
<td>给回答或轨迹打分。</td>
<td>可能也是大模型或复杂软件系统。</td>
</tr>
<tr>
<td>Reference model</td>
<td>约束 policy 不偏离太远。</td>
<td>需要保存和推理参考模型。</td>
</tr>
<tr>
<td>Rollout workers</td>
<td>生成训练样本。</td>
<td>自回归生成成本高。</td>
</tr>
<tr>
<td>KL penalty</td>
<td>防止模型偏离预训练分布太远。</td>
<td>需要计算与 reference model 的差异。</td>
</tr>
</table>

<div class="box train">
<strong>学习建议：</strong>
你不需要第一天就推完 PPO 公式。先记住：PPO 是为了让 RL 更新“别走太猛”。它用 advantage、ratio、clip、KL 等机制，让模型在提高 reward 的同时不要崩。
</div>

<hr>

<h2 id="route12">路线十二：GRPO——为什么 reasoning 后训练常提它</h2>

<p>
原文最后介绍 DeepSeek 的 GRPO，Group Relative Policy Optimization，组相对策略优化。
它的动机是降低 RL 训练成本，尤其是不使用和 policy 同等规模的 critic model，而是通过一组候选输出的相对 reward 来估计 advantage。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/14.png" alt="GRPO formula from DeepSeek paper">
<div class="caption">
图 10：DeepSeek 论文中的 GRPO 目标函数。原图来源：PyTorch 官方博客。
<a href="https://pytorch.org/wp-content/uploads/2025/08/14.png" target="_blank">打开原图</a>
</div>
</div>

<h3>图片详细解读</h3>

<p>
图中公式看起来复杂，但可以抓住几个关键词：
</p>

<table>
<tr>
<th>公式元素</th>
<th>中文解释</th>
<th>直观理解</th>
</tr>
<tr>
<td>q</td>
<td>问题 / prompt</td>
<td>给模型的任务。</td>
</tr>
<tr>
<td>o_i</td>
<td>第 i 个输出</td>
<td>同一个问题下采样出的多个回答之一。</td>
</tr>
<tr>
<td>G</td>
<td>组大小</td>
<td>每个问题采样 G 个候选输出。</td>
</tr>
<tr>
<td>r_i</td>
<td>第 i 个输出的奖励</td>
<td>比如答案正确、格式正确、测试通过。</td>
</tr>
<tr>
<td>A_i</td>
<td>优势值</td>
<td>这个回答相对于同组其他回答好多少。</td>
</tr>
<tr>
<td>πθ</td>
<td>当前策略模型</td>
<td>正在训练的模型。</td>
</tr>
<tr>
<td>πold</td>
<td>旧策略模型</td>
<td>生成这些候选时的模型。</td>
</tr>
<tr>
<td>πref</td>
<td>参考模型</td>
<td>用于 KL 约束，防止模型偏离太远。</td>
</tr>
<tr>
<td>clip</td>
<td>裁剪</td>
<td>和 PPO 类似，限制策略更新幅度。</td>
</tr>
</table>

<h3>12.1 GRPO 的核心直觉</h3>

<pre>
同一个问题 q
  ↓
模型生成 G 个答案
  ↓
每个答案获得 reward
  ↓
计算每个答案相对于组内平均水平的好坏
  ↓
提高组内更好答案的概率
  ↓
降低组内较差答案的概率
</pre>

<h3>12.2 GRPO 和 PPO 的区别</h3>

<table>
<tr>
<th>比较项</th>
<th>PPO</th>
<th>GRPO</th>
</tr>
<tr>
<td>是否需要 critic / value model</td>
<td>通常需要。</td>
<td>通常不需要单独 critic，用组内 reward 相对值估计 advantage。</td>
</tr>
<tr>
<td>优势估计</td>
<td>reward - value。</td>
<td>reward 相对于同组均值和标准差。</td>
</tr>
<tr>
<td>计算成本</td>
<td>更高。</td>
<td>相对更低。</td>
</tr>
<tr>
<td>适用场景</td>
<td>通用 RLHF、复杂策略优化。</td>
<td>推理、数学、代码等可验证 reward 场景。</td>
</tr>
<tr>
<td>工程复杂度</td>
<td>需要维护更多模型组件。</td>
<td>结构更简单，但仍需要 rollout 和 reward。</td>
</tr>
</table>

<div class="box train">
<strong>后训练 Agent 启发：</strong>
GRPO 对 Agent 也很有启发。对同一个任务，可以让 Agent 采样多条轨迹：
<pre>
任务 q → 轨迹 1 / 轨迹 2 / ... / 轨迹 G
</pre>
然后用任务完成率、工具成功率、成本、测试通过率打分。
组内更好的轨迹提高概率，差的轨迹降低概率。
</div>

<hr>

<h2 id="route13">路线十三：把这篇博客转成你的学习与复现实验计划</h2>

<p>
读完这篇 PyTorch 博客之后，不要停留在“知道术语”。你应该把它转成一个可执行的学习路线。
</p>

<h3>13.1 第一阶段：只做 SFT</h3>

<table>
<tr>
<th>目标</th>
<th>内容</th>
</tr>
<tr>
<td>训练对象</td>
<td>Qwen2.5-0.5B / Qwen2.5-1.5B / Llama 小模型。</td>
</tr>
<tr>
<td>数据</td>
<td>指令 → 回答，或者任务 → 工具调用 JSON。</td>
</tr>
<tr>
<td>重点</td>
<td>理解对话格式、loss mask、assistant-only loss。</td>
</tr>
<tr>
<td>评测</td>
<td>格式是否正确、回答是否遵循指令。</td>
</tr>
</table>

<h4>示例数据</h4>

<pre>
{
  "messages": [
    {"role": "system", "content": "你是一个会调用工具的助手。"},
    {"role": "user", "content": "计算 23 * 17"},
    {"role": "assistant", "content": "Action: calculator({\"expression\": \"23 * 17\"})"}
  ]
}
</pre>

<h3>13.2 第二阶段：做 DPO</h3>

<table>
<tr>
<th>目标</th>
<th>内容</th>
</tr>
<tr>
<td>训练对象</td>
<td>SFT 后的模型。</td>
</tr>
<tr>
<td>数据</td>
<td>prompt + chosen + rejected。</td>
</tr>
<tr>
<td>重点</td>
<td>理解偏好优化，不需要显式 reward model。</td>
</tr>
<tr>
<td>评测</td>
<td>模型是否更偏向正确工具、正确参数、简洁回答。</td>
</tr>
</table>

<h4>示例数据</h4>

<pre>
{
  "prompt": "计算 23 * 17",
  "chosen": "Action: calculator({\"expression\": \"23 * 17\"})",
  "rejected": "Action: search({\"query\": \"23 * 17\"})"
}
</pre>

<h3>13.3 第三阶段：做 rule-based reward</h3>

<table>
<tr>
<th>目标</th>
<th>内容</th>
</tr>
<tr>
<td>奖励对象</td>
<td>数学、代码、JSON 格式、工具调用。</td>
</tr>
<tr>
<td>奖励函数</td>
<td>答案正确 +1，格式正确 +0.2，错误工具 -0.5。</td>
</tr>
<tr>
<td>重点</td>
<td>理解 reward pipeline，而不是只理解算法。</td>
</tr>
</table>

<h4>示例 reward</h4>

<pre>
def reward_fn(output):
    reward = 0.0

    if is_valid_json(output):
        reward += 0.2

    if uses_correct_tool(output, "calculator"):
        reward += 0.3

    if final_answer_correct(output):
        reward += 1.0

    if calls_unnecessary_tool(output):
        reward -= 0.2

    return reward
</pre>

<h3>13.4 第四阶段：做 GRPO / RLVR</h3>

<table>
<tr>
<th>目标</th>
<th>内容</th>
</tr>
<tr>
<td>训练对象</td>
<td>SFT 或 DPO 后的模型。</td>
</tr>
<tr>
<td>数据来源</td>
<td>模型自己生成多个候选回答或轨迹。</td>
</tr>
<tr>
<td>奖励</td>
<td>可验证奖励：数学答案、代码测试、工具执行成功。</td>
</tr>
<tr>
<td>重点</td>
<td>理解 rollout、reward、group advantage、KL 约束。</td>
</tr>
</table>

<h4>GRPO 式训练直觉</h4>

<pre>
同一个任务：
  output_1 reward = 1.0
  output_2 reward = 0.2
  output_3 reward = 0.0
  output_4 reward = 0.8

组内平均 reward = 0.5

高于平均的 output_1 / output_4：提高概率
低于平均的 output_2 / output_3：降低概率
</pre>

<h3>13.5 第五阶段：转向 Agent 后训练</h3>

<table>
<tr>
<th>普通后训练能力</th>
<th>Agent 后训练版本</th>
</tr>
<tr>
<td>回答正确</td>
<td>任务完成。</td>
</tr>
<tr>
<td>格式正确</td>
<td>工具调用 schema 正确。</td>
</tr>
<tr>
<td>推理正确</td>
<td>Observation 后下一步 action 正确。</td>
</tr>
<tr>
<td>偏好更好回答</td>
<td>偏好更短、更准、更低成本的工具轨迹。</td>
</tr>
<tr>
<td>奖励答案</td>
<td>奖励轨迹、工具结果、环境状态变化。</td>
</tr>
</table>

<div class="box note">
<strong>最终路线：</strong>
<pre>
对话格式理解
  ↓
SFT：学会基本回答 / 工具调用格式
  ↓
Rejection Sampling：生成并筛选高质量样本
  ↓
DPO：用 chosen/rejected 偏好数据优化
  ↓
Reward Pipeline：设计可验证奖励
  ↓
GRPO / PPO：在线生成、打分、更新
  ↓
Agent RL：在环境中训练多步轨迹
</pre>
</div>

<hr>

<h2 id="terms">术语表：英文术语 + 中文解释</h2>

<table>
<tr>
<th>英文术语</th>
<th>中文译法</th>
<th>解释</th>
</tr>
<tr>
<td>Post-training</td>
<td>后训练</td>
<td>预训练之后，让模型学会对话、指令遵循、偏好对齐、推理和工具调用的训练阶段。</td>
</tr>
<tr>
<td>Alignment</td>
<td>对齐</td>
<td>让模型行为更符合人类偏好、规则和安全要求。</td>
</tr>
<tr>
<td>SFT, Supervised Fine-Tuning</td>
<td>监督微调</td>
<td>用高质量输入输出样本训练模型模仿目标回答。</td>
</tr>
<tr>
<td>Loss Mask</td>
<td>损失掩码</td>
<td>只让 assistant response 部分计算训练损失，不让 prompt 部分参与 loss。</td>
</tr>
<tr>
<td>Rejection Sampling</td>
<td>拒绝采样</td>
<td>生成多个候选，只保留最好的样本进入训练集。</td>
</tr>
<tr>
<td>RL, Reinforcement Learning</td>
<td>强化学习</td>
<td>模型通过动作、环境反馈和奖励来优化策略。</td>
</tr>
<tr>
<td>RLHF</td>
<td>基于人类反馈的强化学习</td>
<td>用人类偏好训练奖励模型，再用 RL 优化 LLM。</td>
</tr>
<tr>
<td>Reward Model</td>
<td>奖励模型</td>
<td>把模型输出映射成分数的模型。</td>
</tr>
<tr>
<td>ORM, Outcome Reward Model</td>
<td>结果奖励模型</td>
<td>只评价最终答案，不评价中间步骤。</td>
</tr>
<tr>
<td>PRM, Process Reward Model</td>
<td>过程奖励模型</td>
<td>评价中间推理步骤或过程质量。</td>
</tr>
<tr>
<td>DPO, Direct Preference Optimization</td>
<td>直接偏好优化</td>
<td>用 chosen / rejected 偏好对直接优化模型，不显式训练 reward model。</td>
</tr>
<tr>
<td>PPO, Proximal Policy Optimization</td>
<td>近端策略优化</td>
<td>一种常用 RL 算法，通过 clipping、KL 等机制稳定策略更新。</td>
</tr>
<tr>
<td>GRPO, Group Relative Policy Optimization</td>
<td>组相对策略优化</td>
<td>用同一 prompt 下多个候选的相对 reward 估计 advantage，降低 critic 成本。</td>
</tr>
<tr>
<td>On-policy</td>
<td>同策略 / 在线策略</td>
<td>训练数据来自当前正在训练的模型。</td>
</tr>
<tr>
<td>Off-policy</td>
<td>异策略 / 离线策略</td>
<td>训练数据来自旧模型、其他模型或固定数据集。</td>
</tr>
<tr>
<td>Rollout</td>
<td>轨迹生成 / 采样</td>
<td>让模型实际生成回答或执行任务，得到训练样本。</td>
</tr>
<tr>
<td>Reward Hacking</td>
<td>奖励黑客 / 奖励投机</td>
<td>模型钻奖励函数漏洞，最大化分数但不符合真实意图。</td>
</tr>
<tr>
<td>RLVR</td>
<td>可验证奖励强化学习</td>
<td>用可自动验证的奖励训练模型，例如数学答案、代码测试、格式检查。</td>
</tr>
<tr>
<td>Test-time Compute</td>
<td>测试时计算</td>
<td>模型在推理阶段花更多计算，例如更长思考、更复杂搜索，以提高答案质量。</td>
</tr>
<tr>
<td>Advantage</td>
<td>优势函数</td>
<td>某个动作相对于平均水平或 baseline 好多少。</td>
</tr>
<tr>
<td>KL Divergence</td>
<td>KL 散度</td>
<td>衡量新策略与参考策略差异，用来防止模型偏离太远。</td>
</tr>
<tr>
<td>Trust Region</td>
<td>信任区域</td>
<td>允许策略更新的安全范围。</td>
</tr>
</table>

<h2>最后总结</h2>

<div class="box train">
<p>
这篇 PyTorch 博客给出的后训练路线可以概括为：
</p>

<pre>
Post-training 数据格式
  ↓
SFT：让模型学会模仿和遵守格式
  ↓
Rejection Sampling：筛出更好示范数据
  ↓
RL 基础：从模仿转向试错
  ↓
RLHF：用人类偏好训练奖励
  ↓
DPO：用偏好对做低成本对齐
  ↓
Online RL / PPO：让模型在线探索
  ↓
Reward Pipeline：用规则、测试、模型评审构造奖励
  ↓
Test-time Reasoning / GRPO：用可验证奖励激发推理
</pre>

<p>
如果把这条线迁移到 Agent 后训练，就是：
</p>

<pre>
工具调用格式 SFT
  ↓
好轨迹 / 坏轨迹 DPO
  ↓
工具执行与任务完成 reward
  ↓
多条轨迹 group reward
  ↓
GRPO / PPO 训练 Agent 在环境中更稳定行动
</pre>

<p>
一句话概括：<strong>后训练的核心不是让模型多背知识，而是用格式、偏好、奖励和环境反馈，把预训练模型塑造成一个能对话、能推理、能行动、能优化行为的系统。</strong>
</p>
</div>

<p class="small">
说明：本文为中文学习笔记与图片解读。图片均通过 PyTorch 官方博客图片链接引用，版权归原作者或原图来源所有。原文：PyTorch, “A Primer on LLM Post-Training.”
</p>

</body>
</html>

这版已经按“后训练路线”重写了，和前面的 Agent 架构博客不是一个方向。下一步可以继续扩展成第二篇：**Fireworks AI 的 RL with Verifiable Reward**，专门讲 RLVR / GRPO / reasoning 后训练。

---

# you asked

message time: 2026-06-07 16:34:21

你自己看看你在干啥 写的乱七八糟的

---

# chatgpt response

你说得对，上一版确实乱。

问题主要有三个：

第一，我把**一篇博客的精读**和**一整套后训练知识体系**混在一起了，结果 HTML 变成了“百科堆料”，不是学习路线。

第二，我没有按“博客原文顺序 + 学习路线顺序”稳定组织，而是把 SFT、DPO、PPO、GRPO、Agent 后训练、DeepSeek-R1 全部揉在一起，导致主线不清。

第三，我直接塞了一大段 HTML，没有先把结构打磨清楚。你要的是能真正学习的材料，不是看起来很长的东西。

下面我先把这件事重新校准。

## 正确做法应该是这样

这次只选一篇博客：

**PyTorch 官方博客：A Primer on LLM Post-Training**

它适合作为第一篇，因为它本身就是“后训练入门路线”，覆盖 post-training 数据格式、SFT、RLHF、DPO、PPO、reward pipeline、test-time reasoning 和 GRPO。PyTorch 原文也把 post-training 定位为让模型学会对话、规划、推理和交互的阶段，而不是单纯继续预训练。([PyTorch](https://pytorch.org/blog/a-primer-on-llm-post-training/?utm_source=chatgpt.com))

但我不能把所有内容都一口气堆出来。应该分成清楚的几块：

```text
第 0 块：这篇博客在后训练路线中的位置
第 1 块：后训练数据格式：模型到底看到什么
第 2 块：SFT：监督微调，先学会模仿
第 3 块：Rejection Sampling：筛更好的样本
第 4 块：RLHF：人类偏好如何变成奖励
第 5 块：DPO：为什么不用 Reward Model 也能做偏好优化
第 6 块：Online RL / PPO：为什么强化学习难但上限高
第 7 块：Reward Pipeline：代码、数学、工具调用如何做可验证奖励
第 8 块：Reasoning / GRPO：推理模型后训练为什么变成主线
第 9 块：实践路线：你应该怎么从 SFT 跑到 DPO / GRPO
```

每一块固定格式：

```text
1. 原文这一节在讲什么
2. 原博客图片
3. 图片逐项解释
4. 中文详细总结
5. 关键术语
6. 这部分怎么实践
7. 和后训练 Agent 的关系
```

## 我先给你一个重新整理后的开头结构

这次不先塞完整 HTML，我先把**清晰版 HTML 骨架 + 第一部分正文**给你。你看这个风格对不对，再继续往下写会更稳。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>PyTorch《A Primer on LLM Post-Training》中文精读：后训练路线版</title>
<style>
body {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  line-height: 1.85;
  max-width: 1080px;
  margin: 40px auto;
  padding: 0 28px 100px;
  background: #f7f8fb;
  color: #1f2937;
}
h1 {
  font-size: 34px;
  line-height: 1.35;
  border-bottom: 5px solid #2563eb;
  padding-bottom: 14px;
}
h2 {
  margin-top: 48px;
  padding: 12px 16px;
  font-size: 27px;
  background: #eef4ff;
  border-left: 7px solid #2563eb;
}
h3 {
  margin-top: 28px;
  font-size: 21px;
}
.box {
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 12px;
  padding: 18px 22px;
  margin: 18px 0;
}
.note {
  background: #fff7d6;
  border-left: 6px solid #d6a800;
}
.train {
  background: #ecfdf3;
  border-left: 6px solid #16a34a;
}
.warn {
  background: #fff1f1;
  border-left: 6px solid #dc2626;
}
.figure {
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 14px;
  padding: 16px;
  margin: 22px 0;
}
.figure img {
  width: 100%;
  max-height: 680px;
  object-fit: contain;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}
.caption {
  color: #667085;
  font-size: 14px;
  margin-top: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 18px 0;
  background: #ffffff;
}
th, td {
  border: 1px solid #d9e2ef;
  padding: 11px 13px;
  vertical-align: top;
}
th {
  background: #f1f5f9;
}
pre {
  background: #111827;
  color: #e5e7eb;
  padding: 18px;
  border-radius: 10px;
  overflow-x: auto;
  line-height: 1.55;
}
</style>
</head>

<body>

<h1>PyTorch《A Primer on LLM Post-Training》中文精读笔记<br>后训练路线学习版</h1>

<div class="box note">
<p><strong>原文标题：</strong>A Primer on LLM Post-Training</p>
<p><strong>来源：</strong>PyTorch 官方博客</p>
<p><strong>原文链接：</strong>
<a href="https://pytorch.org/blog/a-primer-on-llm-post-training/" target="_blank">
https://pytorch.org/blog/a-primer-on-llm-post-training/
</a>
</p>
<p><strong>学习定位：</strong>
这篇文章适合作为“后训练路线”的第一篇。它不是讲 Agent 架构，也不是只讲某一个算法，
而是从工程学习角度解释：模型为什么需要 post-training，post-training 数据是什么样，
SFT、DPO、PPO、GRPO 各自在路线中解决什么问题。
</p>
</div>

<h2>0. 这篇博客应该怎么读？</h2>

<p>
这篇 PyTorch 博客的重点不是让你立刻推公式，而是先建立一条后训练主线：
</p>

<pre>
Base Model 基座模型
  ↓
Post-training Data Format 后训练数据格式
  ↓
SFT 监督微调
  ↓
Preference Data 偏好数据
  ↓
DPO / RLHF 偏好优化
  ↓
Online RL / PPO 在线强化学习
  ↓
Reward Pipeline 奖励管线
  ↓
Reasoning / GRPO 推理后训练
</pre>

<div class="box note">
<strong>一句话理解：</strong>
预训练让模型“会补全文本”；后训练让模型“会按照人的任务方式做事”。
</div>

<h3>0.1 为什么这篇适合做后训练路线第一篇？</h3>

<table>
<tr>
<th>学习问题</th>
<th>这篇博客能解决什么</th>
</tr>
<tr>
<td>Post-training 到底是什么？</td>
<td>它把后训练解释为预训练之后，让模型学会对话、推理、规划和交互的阶段。</td>
</tr>
<tr>
<td>SFT 和预训练有什么区别？</td>
<td>它解释了 SFT 仍然是 next-token prediction，但只对 assistant response 计算 loss。</td>
</tr>
<tr>
<td>DPO 和 RLHF 是什么关系？</td>
<td>它把 DPO 放在偏好优化路线中讲，说明为什么它比 PPO 更容易上手。</td>
</tr>
<tr>
<td>PPO 为什么复杂？</td>
<td>它从基础 policy gradient 讲到 advantage、ratio、clip 和 trust region。</td>
</tr>
<tr>
<td>GRPO 为什么火？</td>
<td>它解释了 GRPO 如何用组内相对奖励替代 critic。</td>
</tr>
<tr>
<td>怎么接 Agent 后训练？</td>
<td>它的 reward pipeline 思路可以直接迁移到工具调用、代码 Agent 和多步任务轨迹。</td>
</tr>
</table>

<h2>1. 后训练数据格式：模型到底看到了什么？</h2>

<p>
很多人学后训练会直接跳到 SFT、DPO、PPO，但其实第一步应该先理解数据格式。
因为 LLM 的底层接口没有变：模型接收一串 token，然后预测下一个 token。
所谓“聊天模型”，本质上是通过特殊格式把 system、user、assistant 等角色写进同一段 token 序列中。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/1-3.png" alt="Chat interface example">
<div class="caption">
图 1：聊天界面示例。来源：PyTorch 官方博客《A Primer on LLM Post-Training》。
如果图片不显示，请打开原图：
<a href="https://pytorch.org/wp-content/uploads/2025/08/1-3.png" target="_blank">
https://pytorch.org/wp-content/uploads/2025/08/1-3.png
</a>
</div>
</div>

<h3>1.1 这张图表面上在讲什么？</h3>

<p>
图中是一个普通聊天界面：用户问问题，助手回答；用户继续追问，助手继续回答。
但原文真正想说明的是：聊天界面只是人看到的 UI，模型实际看到的是一段被特殊 token 包装过的文本。
</p>

<table>
<tr>
<th>你在界面中看到的</th>
<th>模型实际需要看到的</th>
<th>为什么重要</th>
</tr>
<tr>
<td>用户说：“What is the capital of France?”</td>
<td>一段带有 user role 标记的 token。</td>
<td>模型必须知道这是用户输入，不是助手要生成的内容。</td>
</tr>
<tr>
<td>助手回答：“Paris.”</td>
<td>一段带有 assistant role 标记的 token。</td>
<td>模型只应该学习生成 assistant 部分。</td>
</tr>
<tr>
<td>多轮对话</td>
<td>system + user + assistant + user + assistant 的完整序列。</td>
<td>模型根据历史上下文继续生成，而不是孤立回答。</td>
</tr>
<tr>
<td>助手停止回答</td>
<td>end-of-turn token。</td>
<td>模型必须学会在合适的位置停止。</td>
</tr>
</table>

<h3>1.2 Llama 3 风格的格式示意</h3>

<pre>
&lt;|begin_of_text|&gt;

&lt;|start_header_id|&gt;system&lt;|end_header_id|&gt;
你是一个有帮助的助手。
&lt;|eot_id|&gt;

&lt;|start_header_id|&gt;user&lt;|end_header_id|&gt;
法国首都是哪里？
&lt;|eot_id|&gt;

&lt;|start_header_id|&gt;assistant&lt;|end_header_id|&gt;
法国首都是巴黎。
&lt;|eot_id|&gt;

&lt;|start_header_id|&gt;user&lt;|end_header_id|&gt;
那里有多少人口？只告诉我数字。
&lt;|eot_id|&gt;

&lt;|start_header_id|&gt;assistant&lt;|end_header_id|&gt;
从这里开始生成
</pre>

<h3>1.3 这一节和后训练的关系</h3>

<p>
后训练第一步不是算法，而是格式。如果格式不稳定，后面 SFT、DPO、RL 都会乱。
对于普通聊天模型，格式决定谁是 system、谁是 user、谁是 assistant；
对于 Agent 模型，格式还要决定谁是 tool、谁是 environment、谁是 observation。
</p>

<table>
<tr>
<th>普通聊天后训练</th>
<th>Agent 后训练</th>
</tr>
<tr>
<td>system / user / assistant</td>
<td>system / user / assistant / tool / environment</td>
</tr>
<tr>
<td>训练 assistant 回答</td>
<td>训练 assistant 的 Thought、Action、Final Answer</td>
</tr>
<tr>
<td>用户消息不计算 loss</td>
<td>工具返回 Observation 也不应该计算 loss</td>
</tr>
<tr>
<td>模型学习什么时候停止</td>
<td>模型学习什么时候继续调用工具、什么时候 finish</td>
</tr>
</table>

<div class="box train">
<strong>这一节你要记住：</strong>
后训练不是直接把问答扔给模型。你必须先设计数据格式。
格式设计得清楚，模型才知道“谁说了什么”“自己应该生成什么”“什么时候停止”“什么时候调用工具”。
</div>

</body>
</html>
```

这才是我应该给你的写法：**主线清楚、一节一节讲、先解释图，再讲概念，再接实践**。

后面我会按这个结构继续写，不再把所有内容乱塞到一个大段里。

---

# you asked

message time: 2026-06-07 16:36:57

可以接着来 内容篇幅大一点 你上一个太少了

---

# chatgpt response

对，这次我接着你认可的那个结构往下写，**只写 PyTorch 这篇后训练博客本身**，不乱跳到 Agent 架构。下面这一段接在你上一个 HTML 的 **“1. 后训练数据格式”后面**，内容包括：

**第 2 块：整体管线 SFT → DPO → Online RL**  
**第 3 块：SFT 监督微调**  
**第 4 块：Rejection Sampling 拒绝采样**  
**第 5 块：RL 强化学习入门**

这几块都来自 PyTorch 原文：原文先用 OLMo 2 的管线图引出 SFT、DPO、Online RL，然后解释 SFT 的 imitation 模仿本质、SFT 只对 assistant response 算 loss，接着讲 Rejection Sampling，以及 RL 中 agent 与 environment 互动、通过 reward 学习的核心逻辑。([PyTorch](https://pytorch.org/blog/a-primer-on-llm-post-training/))

**Document Title: **

<!-- ========================= -->
<!-- 接上文：第 2 块开始 -->
<!-- ========================= -->

<h2 id="route2">2. 后训练整体管线：SFT → DPO → Online RL</h2>

<p>
理解完数据格式以后，才真正进入后训练方法。PyTorch 这篇博客没有一开始就讲公式，而是先给出一个简化的后训练管线：
</p>

<pre>
Base Model 基座模型
  ↓
SFT 监督微调
  ↓
DPO 直接偏好优化
  ↓
Online RL 在线强化学习
</pre>

<p>
这条线非常重要，因为它基本对应了现代大模型后训练的主干：先让模型学会基本回答，再让模型偏向更好的回答，最后通过在线生成和奖励进一步提高上限。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/2-3.png" alt="Post-training pipeline: SFT to DPO to Online RL">
<div class="caption">
图 2：后训练管线示意图：SFT → DPO → Online RL。来源：PyTorch 官方博客。
如果图片不显示，请打开原图：
<a href="https://pytorch.org/wp-content/uploads/2025/08/2-3.png" target="_blank">
https://pytorch.org/wp-content/uploads/2025/08/2-3.png
</a>
</div>
</div>

<h3>2.1 这张图表面上在讲什么？</h3>

<p>
图中展示的是一个 post-training pipeline，也就是后训练流水线。
从左到右，模型经历三个主要阶段：
</p>

<table>
<tr>
<th>阶段</th>
<th>英文</th>
<th>中文</th>
<th>这一阶段解决什么问题</th>
</tr>
<tr>
<td>第一阶段</td>
<td>SFT</td>
<td>Supervised Fine-Tuning，监督微调</td>
<td>让模型学会按照指令回答，学会基本对话格式和助手风格。</td>
</tr>
<tr>
<td>第二阶段</td>
<td>DPO</td>
<td>Direct Preference Optimization，直接偏好优化</td>
<td>让模型更偏向人类喜欢的回答，远离较差回答。</td>
</tr>
<tr>
<td>第三阶段</td>
<td>Online RL</td>
<td>在线强化学习</td>
<td>让模型自己生成新回答或新轨迹，再根据奖励进行优化。</td>
</tr>
</table>

<h3>2.2 这条路线为什么是合理的？</h3>

<p>
这条路线背后的逻辑不是随便排列，而是由训练难度逐步增加：
</p>

<ol>
<li>
<strong>SFT 最稳定。</strong>
它就像普通监督学习，有明确标准答案，训练过程相对稳定。
</li>
<li>
<strong>DPO 比 RL 简单。</strong>
它使用固定的偏好数据，不需要模型在线探索，也不需要频繁生成新样本。
</li>
<li>
<strong>Online RL 最复杂，但上限更高。</strong>
它允许模型自己尝试新回答、新策略、新轨迹，只要 reward 设计得好，模型可能超过原有示范数据。
</li>
</ol>

<div class="box note">
<strong>一句话理解：</strong>
SFT 让模型“会做”，DPO 让模型“更偏向好做法”，Online RL 让模型“通过试错发现更好的做法”。
</div>

<h3>2.3 这三阶段分别依赖什么数据？</h3>

<table>
<tr>
<th>训练阶段</th>
<th>数据形式</th>
<th>例子</th>
<th>数据来源</th>
</tr>
<tr>
<td>SFT</td>
<td>prompt → ideal response</td>
<td>用户问题 → 高质量助手回答</td>
<td>人工写作、模型生成后筛选、专家数据</td>
</tr>
<tr>
<td>DPO</td>
<td>prompt + chosen + rejected</td>
<td>同一个问题下，一个好回答，一个差回答</td>
<td>人工偏好标注、奖励模型排序、规则筛选</td>
</tr>
<tr>
<td>Online RL</td>
<td>prompt → model rollout → reward</td>
<td>模型自己生成答案，然后由奖励系统打分</td>
<td>当前模型实时采样，环境或奖励管线反馈</td>
</tr>
</table>

<h3>2.4 这条线和“后训练 Agent”有什么关系？</h3>

<p>
虽然这篇 PyTorch 博客不是专门讲 Agent，但这条路线可以直接迁移到 Agent 后训练：
</p>

<table>
<tr>
<th>普通 LLM 后训练</th>
<th>Agent 后训练中的对应物</th>
</tr>
<tr>
<td>SFT：学习标准回答。</td>
<td>SFT：学习标准工具调用轨迹，例如 Thought → Action → Observation → Final Answer。</td>
</tr>
<tr>
<td>DPO：偏好更好的回答。</td>
<td>DPO：偏好更好的工具选择、更合理的参数、更短更稳的轨迹。</td>
</tr>
<tr>
<td>Online RL：模型生成答案，根据 reward 优化。</td>
<td>Online RL：Agent 在环境中执行动作，根据任务完成率、测试通过率、工具返回结果优化。</td>
</tr>
</table>

<div class="box train">
<strong>你学习时要抓住的主线：</strong>
不要把 SFT、DPO、PPO、GRPO 当作孤立算法背。它们其实对应一条逐步升级的路线：
<pre>
模仿数据
  ↓
偏好数据
  ↓
奖励反馈
  ↓
环境交互
</pre>
这也是从普通聊天模型走向 reasoning model、tool-use model、agent model 的共同路线。
</div>

<hr>

<h2 id="route3">3. SFT：Supervised Fine-Tuning，监督微调</h2>

<p>
SFT 是后训练的第一步。原文对 SFT 的解释很直接：<strong>SFT 的核心是 imitation，即模仿。</strong>
你给模型一个问题和一个理想回答，模型逐 token 学习这个理想回答。
</p>

<h3>3.1 SFT 到底在训练什么？</h3>

<p>
在 SFT 中，模型看到完整上下文，包括 system prompt、user prompt 和 assistant response。
但训练时，真正计算 loss 的通常只有 assistant response 部分。
</p>

<pre>
完整输入：
[system prompt] [user prompt] [assistant response]

loss 计算：
[不计算 loss] [不计算 loss] [计算 loss]
</pre>

<p>
这个细节非常关键。因为我们希望模型根据 system 和 user 来生成 assistant 的回答，而不是让模型学习“生成 system prompt”或“生成 user prompt”。
</p>

<table>
<tr>
<th>输入部分</th>
<th>中文解释</th>
<th>是否输入模型</th>
<th>是否计算 loss</th>
<th>原因</th>
</tr>
<tr>
<td>System prompt</td>
<td>系统提示词</td>
<td>是</td>
<td>否</td>
<td>它提供规则和身份，但不是模型要生成的目标。</td>
</tr>
<tr>
<td>User prompt</td>
<td>用户问题 / 指令</td>
<td>是</td>
<td>否</td>
<td>它提供任务条件，模型要根据它回答。</td>
</tr>
<tr>
<td>Assistant response</td>
<td>助手回答</td>
<td>是</td>
<td>是</td>
<td>这是模型真正要学习生成的内容。</td>
</tr>
</table>

<h3>3.2 SFT 和预训练有什么像？有什么不像？</h3>

<p>
很多人会问：SFT 不也是 next-token prediction 吗？那和预训练有什么区别？
答案是：形式上相似，目标上不同。
</p>

<table>
<tr>
<th>比较项</th>
<th>Pre-training 预训练</th>
<th>SFT 监督微调</th>
</tr>
<tr>
<td>训练形式</td>
<td>预测下一个 token。</td>
<td>仍然预测下一个 token。</td>
</tr>
<tr>
<td>数据结构</td>
<td>大规模自然文本，通常没有明确角色。</td>
<td>结构化对话或指令数据，有 system / user / assistant。</td>
</tr>
<tr>
<td>训练目标</td>
<td>学习语言、知识、世界模式。</td>
<td>学习如何回答用户、遵守格式、遵守指令。</td>
</tr>
<tr>
<td>loss 位置</td>
<td>通常对大段文本整体计算。</td>
<td>通常只对 assistant response 计算。</td>
</tr>
<tr>
<td>规模</td>
<td>通常是万亿级 token。</td>
<td>远小于预训练，通常是几百万样本或几十亿 token 级别。</td>
</tr>
</table>

<div class="box note">
<strong>一句话理解：</strong>
预训练让模型“会续写世界上的文本”；SFT 让模型“会按照助手身份回答用户”。
</div>

<h3>3.3 为什么 SFT 是后训练第一步？</h3>

<p>
因为 SFT 能让模型快速学会一些基础行为：
</p>

<ul>
<li>知道用户提问后应该回答，而不是继续模仿用户。</li>
<li>知道什么时候结束回答。</li>
<li>知道遵循 system prompt 中的规则。</li>
<li>知道基本的助手语气和结构。</li>
<li>知道常见任务的标准答法。</li>
</ul>

<p>
如果没有 SFT，后面的 DPO 或 RL 会很难直接开始。
因为模型连基本对话格式都不稳定，偏好优化和奖励优化就会在混乱的输出上进行。
</p>

<h3>3.4 用下棋理解 SFT 的上限</h3>

<p>
原文用了下棋的比喻：如果你用 Magnus Carlsen 的棋谱训练模型，模型会学习 Magnus 每一步怎么走。
这可以让模型达到很高水平，但也有一个问题：它只能模仿棋谱中的动作，无法通过试错超过示范者。
</p>

<table>
<tr>
<th>类比</th>
<th>SFT 中的对应物</th>
</tr>
<tr>
<td>棋谱</td>
<td>高质量 SFT 回答数据。</td>
</tr>
<tr>
<td>Magnus 的每一步棋</td>
<td>理想回答中的每一个 token。</td>
</tr>
<tr>
<td>模仿棋谱</td>
<td>模型逐 token 模仿标准答案。</td>
</tr>
<tr>
<td>无法超过棋谱上限</td>
<td>模型上限受数据质量限制。</td>
</tr>
</table>

<div class="box warn">
<strong>SFT 的最大限制：</strong>
它只能学习数据中已经存在的好答案。如果数据质量参差不齐，模型会同时学习好答案和坏答案；如果示范答案本身一般，模型也很难自己变得更强。
</div>

<h3>3.5 SFT 对数据质量极其敏感</h3>

<p>
原文强调了一个很重要的点：SFT 的质量不是由最好的样本决定，而往往会被最差的样本拖累。
因为模型会逐 token 学习所有训练目标，坏答案也会贡献梯度。
</p>

<table>
<tr>
<th>数据问题</th>
<th>模型可能学到什么</th>
</tr>
<tr>
<td>回答太啰嗦</td>
<td>模型变得啰嗦。</td>
</tr>
<tr>
<td>回答不遵循用户格式</td>
<td>模型也不稳定遵循格式。</td>
</tr>
<tr>
<td>事实错误</td>
<td>模型学习错误知识或错误表达。</td>
</tr>
<tr>
<td>风格不统一</td>
<td>模型回答风格漂移。</td>
</tr>
<tr>
<td>工具调用格式混乱</td>
<td>模型工具调用 JSON 经常出错。</td>
</tr>
</table>

<h3>3.6 SFT 对 Agent 后训练意味着什么？</h3>

<p>
如果你训练的是工具调用 Agent，SFT 阶段的目标不是让模型“回答得漂亮”，而是让模型先稳定掌握轨迹格式。
</p>

<pre>
User: 请计算 27 * 19

Assistant:
Thought: 这是一个精确计算问题，需要调用 calculator。
Action: calculator({"expression": "27 * 19"})

Tool:
513

Assistant:
Thought: 工具已经返回结果，可以给出最终答案。
Final Answer: 27 * 19 = 513。
</pre>

<table>
<tr>
<th>Agent SFT 要训练什么</th>
<th>训练目标</th>
</tr>
<tr>
<td>Thought 格式</td>
<td>模型能简短说明为什么要采取下一步动作。</td>
</tr>
<tr>
<td>Action 格式</td>
<td>模型能输出可解析工具调用。</td>
</tr>
<tr>
<td>工具选择</td>
<td>模型知道计算题用 calculator，资料题用 search。</td>
</tr>
<tr>
<td>Observation 使用</td>
<td>模型能根据工具返回继续下一步，而不是忽略工具。</td>
</tr>
<tr>
<td>Final Answer</td>
<td>模型知道什么时候结束任务。</td>
</tr>
</table>

<div class="box train">
<strong>SFT 阶段的实践建议：</strong>
如果你要做后训练 Agent，第一批数据不要太复杂。先做三类稳定任务：
<ol>
<li>数学计算 → calculator；</li>
<li>本地文档问答 → search_doc；</li>
<li>简单代码执行 → run_python。</li>
</ol>
每类任务先准备 100 到 300 条高质量轨迹，重点保证格式统一、工具调用正确、最终答案基于工具返回。
</div>

<hr>

<h2 id="route4">4. Rejection Sampling：拒绝采样</h2>

<p>
SFT 依赖高质量答案，但高质量答案从哪里来？原文给出的一个办法是 Rejection Sampling，拒绝采样。
</p>

<p>
这个名字听起来有点抽象，但直觉很简单：
<strong>让模型为同一个问题生成多个答案，然后只保留最好的答案。</strong>
</p>

<h3>4.1 为什么需要 Rejection Sampling？</h3>

<p>
人工写 SFT 数据有两个问题：
</p>

<ol>
<li><strong>成本高：</strong>高质量答案需要专家写，成本很高。</li>
<li><strong>质量不稳定：</strong>不同标注者水平不同，答案质量参差不齐。</li>
</ol>

<p>
如果直接拿这些参差不齐的数据做 SFT，模型会学习到坏习惯。
因此更好的方式是：让模型生成多个候选，然后用一个评估管线挑最好的。
</p>

<h3>4.2 Rejection Sampling 的基本流程</h3>

<pre>
给定一个 prompt
  ↓
模型生成多个候选答案
  ↓
候选来自不同 checkpoint、随机种子、system prompt
  ↓
用评分管线排序
  ↓
保留最好的答案
  ↓
加入 SFT 数据库
  ↓
继续训练模型
</pre>

<table>
<tr>
<th>步骤</th>
<th>中文解释</th>
<th>关键点</th>
</tr>
<tr>
<td>生成多个候选</td>
<td>不是只生成一个答案，而是生成多个。</td>
<td>数量通常可以是 4、8、10 或更多。</td>
</tr>
<tr>
<td>增加多样性</td>
<td>通过不同温度、随机种子、prompt 或 checkpoint 生成。</td>
<td>候选越多样，越可能出现好答案。</td>
</tr>
<tr>
<td>评分排序</td>
<td>用人类、奖励模型、规则或测试对候选排序。</td>
<td>评分系统决定最终质量。</td>
</tr>
<tr>
<td>保留好样本</td>
<td>只把最好的样本加入训练。</td>
<td>避免把低质量答案继续喂给模型。</td>
</tr>
<tr>
<td>多轮迭代</td>
<td>模型变强后再生成更好的候选。</td>
<td>形成自我提升循环。</td>
</tr>
</table>

<h3>4.3 为什么这不是“模型学自己”？</h3>

<p>
如果模型只生成一个答案，然后拿这个答案训练自己，那确实很可能没有提升。
但 Rejection Sampling 的关键是：
</p>

<ul>
<li>模型生成多个候选；</li>
<li>候选之间有差异；</li>
<li>外部评估器挑出更好的；</li>
<li>模型只学习被筛选后的高质量样本。</li>
</ul>

<div class="box note">
<strong>一句话理解：</strong>
Rejection Sampling 不是“模型随便写一个答案再学自己”，而是“模型提出很多方案，评估器选出更好方案，再让模型学习更好方案”。
</div>

<h3>4.4 Rejection Sampling 和 DPO 的区别</h3>

<table>
<tr>
<th>比较项</th>
<th>Rejection Sampling</th>
<th>DPO</th>
</tr>
<tr>
<td>使用方式</td>
<td>选出最好答案，加入 SFT 数据。</td>
<td>保留 chosen / rejected 对，直接做偏好优化。</td>
</tr>
<tr>
<td>训练目标</td>
<td>让模型模仿筛选出的好答案。</td>
<td>让模型提高 chosen 概率、降低 rejected 概率。</td>
</tr>
<tr>
<td>是否使用坏答案</td>
<td>通常丢掉坏答案。</td>
<td>坏答案作为 rejected 被利用。</td>
</tr>
<tr>
<td>适合阶段</td>
<td>SFT 数据增强。</td>
<td>SFT 之后的偏好优化。</td>
</tr>
</table>

<h3>4.5 Rejection Sampling 对 Agent 后训练的价值</h3>

<p>
对于 Agent 来说，Rejection Sampling 特别有用。
因为同一个任务可以有多条轨迹，而不是只有一个答案。
</p>

<pre>
同一个任务：
  轨迹 A：选错工具，失败
  轨迹 B：选对工具，但参数错误，失败
  轨迹 C：选对工具，参数正确，任务完成
  轨迹 D：任务完成，但调用了太多无关工具

保留：
  轨迹 C
或者：
  轨迹 C 作为 chosen，轨迹 A/B/D 作为 rejected
</pre>

<table>
<tr>
<th>Agent 轨迹筛选维度</th>
<th>判断标准</th>
</tr>
<tr>
<td>任务是否完成</td>
<td>最终答案是否正确，代码测试是否通过。</td>
</tr>
<tr>
<td>工具是否选对</td>
<td>是否调用了合适工具。</td>
</tr>
<tr>
<td>参数是否正确</td>
<td>JSON 是否合法，字段是否正确。</td>
</tr>
<tr>
<td>轨迹是否高效</td>
<td>是否避免无意义工具调用。</td>
</tr>
<tr>
<td>是否使用 Observation</td>
<td>模型是否根据工具返回调整下一步。</td>
</tr>
</table>

<div class="box train">
<strong>实践建议：</strong>
做 Agent SFT 时，可以先用强模型生成多条轨迹，再用规则筛选：
<ul>
<li>工具调用 JSON 不合法 → 丢弃；</li>
<li>工具执行失败 → 丢弃或标记为 rejected；</li>
<li>最终答案错误 → 丢弃；</li>
<li>任务成功且轨迹短 → 保留为高质量 SFT 样本。</li>
</ul>
这样比人工从零写轨迹更现实。
</div>

<hr>

<h2 id="route5">5. RL 入门：从模仿到试错</h2>

<p>
原文接下来进入 Reinforcement Learning，强化学习。
RL 是后训练里最容易让人困惑的部分，但 PyTorch 这篇文章讲得很直观：
模型现在不只是模仿答案，而是像一个 agent 一样，对 environment 采取 action，然后获得 reward。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/3-1.png" alt="RL agent environment reward loop">
<div class="caption">
图 3：强化学习中的 Agent、Environment、Reward pipeline。来源：PyTorch 官方博客。
如果图片不显示，请打开原图：
<a href="https://pytorch.org/wp-content/uploads/2025/08/3-1.png" target="_blank">
https://pytorch.org/wp-content/uploads/2025/08/3-1.png
</a>
</div>
</div>

<h3>5.1 图片逐项解释</h3>

<table>
<tr>
<th>图中元素</th>
<th>中文解释</th>
<th>在普通 LLM 中的对应物</th>
<th>在 Agent 中的对应物</th>
</tr>
<tr>
<td>Agent</td>
<td>智能体</td>
<td>正在训练的大语言模型。</td>
<td>会调用工具、执行动作的 Agent。</td>
</tr>
<tr>
<td>Actions</td>
<td>动作</td>
<td>模型生成的回答 token。</td>
<td>搜索、调用工具、写代码、运行测试、点击网页。</td>
</tr>
<tr>
<td>Environment</td>
<td>环境</td>
<td>用户或评估器。</td>
<td>浏览器、代码仓库、终端、数据库、API、测试环境。</td>
</tr>
<tr>
<td>Data / What happened</td>
<td>发生了什么</td>
<td>模型输出是否好。</td>
<td>工具返回什么、测试是否通过、环境状态是否改变。</td>
</tr>
<tr>
<td>Reward pipelines</td>
<td>奖励管线</td>
<td>人类偏好模型、规则、评分器。</td>
<td>测试通过率、工具执行成功率、任务完成率、成本惩罚。</td>
</tr>
<tr>
<td>Labeled data to train on</td>
<td>训练信号</td>
<td>reward 转化成模型更新信号。</td>
<td>轨迹中的动作被奖励或惩罚。</td>
</tr>
</table>

<h3>5.2 RL 和 SFT 的根本区别</h3>

<p>
SFT 是“告诉模型正确答案是什么”，RL 是“让模型尝试，然后告诉它做得好不好”。
</p>

<table>
<tr>
<th>维度</th>
<th>SFT</th>
<th>RL</th>
</tr>
<tr>
<td>训练信号</td>
<td>标准答案中的每个 token。</td>
<td>一个或多个 reward。</td>
</tr>
<tr>
<td>学习方式</td>
<td>模仿。</td>
<td>试错。</td>
</tr>
<tr>
<td>是否需要标准答案</td>
<td>需要。</td>
<td>不一定需要，只要能判断好坏。</td>
</tr>
<tr>
<td>是否能超过示范数据</td>
<td>很难。</td>
<td>有可能。</td>
</tr>
<tr>
<td>训练稳定性</td>
<td>较稳定。</td>
<td>更难、更不稳定。</td>
</tr>
<tr>
<td>适合任务</td>
<td>格式、风格、基础能力。</td>
<td>推理、代码、游戏、工具调用、多步任务。</td>
</tr>
</table>

<h3>5.3 为什么 RL 更难？</h3>

<p>
原文指出，在 RL 中我们通常没有一个可微分的 cost function。
比如浏览器、代码运行器、测试环境、用户反馈，都不是一个可以直接反向传播的函数。
</p>

<p>
因此，RL 只能用一种更粗糙的方式：如果某个 action 最终带来高 reward，就提高它的概率；如果带来低 reward，就降低它的概率。
</p>

<pre>
如果输出带来高 reward：
    增大这些 token / action 的 log probability

如果输出带来低 reward：
    减小这些 token / action 的 log probability
</pre>

<table>
<tr>
<th>问题</th>
<th>为什么困难</th>
</tr>
<tr>
<td>reward 是标量</td>
<td>一个长回答或长轨迹可能只得到一个分数，信息很稀疏。</td>
</tr>
<tr>
<td>credit assignment 难</td>
<td>不知道成功或失败具体归因于哪一步。</td>
</tr>
<tr>
<td>生成成本高</td>
<td>LLM 需要自回归生成，速度慢、成本高。</td>
</tr>
<tr>
<td>环境不可微</td>
<td>浏览器、代码测试、工具 API 都无法直接反向传播。</td>
</tr>
<tr>
<td>训练不稳定</td>
<td>策略一更新，数据分布也会变。</td>
</tr>
</table>

<h3>5.4 用下棋理解 SFT 和 RL</h3>

<p>
原文继续用了下棋的类比。
</p>

<table>
<tr>
<th>训练方式</th>
<th>下棋类比</th>
<th>LLM 类比</th>
</tr>
<tr>
<td>SFT</td>
<td>模仿高手棋谱，每一步照着学。</td>
<td>模仿高质量回答，每个 token 照着学。</td>
</tr>
<tr>
<td>RL</td>
<td>自己下棋，赢了获得奖励，输了调整策略。</td>
<td>模型自己生成回答或轨迹，根据 reward 优化。</td>
</tr>
</table>

<p>
SFT 一开始更稳，因为它直接给标准动作。
但 RL 的上限更高，因为模型可以不断尝试新策略。
</p>

<h3>5.5 “If you can judge it, you can learn it”</h3>

<p>
原文用一句话总结 RL 的力量：
</p>

<pre>
If you can judge it, you can learn it.
如果你能判断它，你就能学会它。
</pre>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/4-1.png" alt="RL closes the gap between judging and doing">
<div class="caption">
图 4：RL 缩小 judging ability 与 doing ability 之间的差距。来源：PyTorch 官方博客。
如果图片不显示，请打开原图：
<a href="https://pytorch.org/wp-content/uploads/2025/08/4-1.png" target="_blank">
https://pytorch.org/wp-content/uploads/2025/08/4-1.png
</a>
</div>
</div>

<h3>5.6 图片解释：判断能力和执行能力</h3>

<table>
<tr>
<th>图中概念</th>
<th>中文解释</th>
<th>含义</th>
</tr>
<tr>
<td>Judging Ability</td>
<td>判断能力</td>
<td>你能不能判断一个结果好不好。</td>
</tr>
<tr>
<td>Doing Ability</td>
<td>执行能力</td>
<td>你能不能亲自做出好结果。</td>
</tr>
<tr>
<td>RL's Domain</td>
<td>强化学习发挥作用的区域</td>
<td>RL 可以把“会判断”逐步转化为“会执行”。</td>
</tr>
</table>

<p>
这个图的关键不是曲线本身，而是一个学习思想：
我们不一定会亲自写出最优答案，但如果我们能可靠判断哪个答案更好，就可以用这个判断信号训练模型。
</p>

<div class="box note">
<strong>例子：</strong>
你可能不会写世界级代码，但你可以运行单元测试判断代码是否通过。
你可能不会手写最优数学证明，但你可以判断最终答案是否正确。
这就是 RLVR 和后训练 reasoning model 的基础。
</div>

<h3>5.7 Reward Hacking：奖励黑客</h3>

<p>
RL 有一个非常大的风险：模型会最大化你给它的 reward，但不一定会最大化你真正想要的东西。
这就是 reward hacking，奖励黑客。
</p>

<table>
<tr>
<th>你真正想要</th>
<th>你写出来的 reward</th>
<th>模型可能学到的投机行为</th>
</tr>
<tr>
<td>代码真正解决问题</td>
<td>测试通过就给分</td>
<td>硬编码测试样例，绕过真实泛化能力。</td>
</tr>
<tr>
<td>回答简洁准确</td>
<td>答案详细就给高分</td>
<td>模型变得又长又啰嗦。</td>
</tr>
<tr>
<td>推理充分但不过度</td>
<td>答案正确就给分，不惩罚长度</td>
<td>模型生成超长 reasoning，浪费 token。</td>
</tr>
<tr>
<td>Agent 高效完成任务</td>
<td>任务成功就给高分</td>
<td>模型疯狂调用工具，只要最后成功就行。</td>
</tr>
<tr>
<td>模型安全可靠</td>
<td>只奖励 helpfulness</td>
<td>模型过度迎合用户，忽略安全规则。</td>
</tr>
</table>

<div class="box warn">
<strong>这一节最重要的警告：</strong>
RL 不会自动理解你的真实意图。它只会优化你写出来的奖励。
所以后训练中，reward design 奖励设计比算法本身还关键。
</div>

<h3>5.8 RL 对 Agent 后训练意味着什么？</h3>

<p>
Agent 后训练最终一定会遇到 RL 问题，因为 Agent 不是只回答文本，而是在环境中做事。
</p>

<table>
<tr>
<th>Agent 任务</th>
<th>Action</th>
<th>Environment</th>
<th>Reward</th>
</tr>
<tr>
<td>代码修复</td>
<td>编辑文件、运行测试</td>
<td>代码仓库、测试框架</td>
<td>测试通过 +1，语法错误 -1。</td>
</tr>
<tr>
<td>网页任务</td>
<td>点击、搜索、填写表单</td>
<td>浏览器环境</td>
<td>目标页面状态正确 +1。</td>
</tr>
<tr>
<td>工具问答</td>
<td>调用 search_doc、calculator</td>
<td>工具执行器</td>
<td>答案正确、工具调用合法。</td>
</tr>
<tr>
<td>数学推理</td>
<td>生成推理和答案</td>
<td>答案验证器</td>
<td>最终答案正确、格式正确。</td>
</tr>
<tr>
<td>数据分析</td>
<td>运行 Python、生成图表</td>
<td>Python 环境</td>
<td>结果正确、代码执行成功。</td>
</tr>
</table>

<div class="box train">
<strong>这一节的实践建议：</strong>
如果你要从 SFT 走向 RL，不要一开始做复杂开放 Agent。
先做 reward 清楚的任务：
<ol>
<li>数学题：答案可验证；</li>
<li>JSON 格式任务：格式可验证；</li>
<li>代码题：测试可验证；</li>
<li>工具调用题：工具名、参数、结果可验证。</li>
</ol>
这些任务适合后面接 RLVR、GRPO 或 PPO。
</div>

<!-- ========================= -->
<!-- 本次续写结束 -->
<!-- 下一次可接：第 6 块 RLHF + 第 7 块 DPO -->
<!-- ========================= -->

这一段先把 **SFT、拒绝采样、RL 基础**讲清楚了。下一段我建议继续写 **RLHF → DPO**，因为这两块是后训练路线里最容易混的部分：一个是“显式训练 Reward Model 再 RL”，一个是“不训练 Reward Model，直接用 chosen/rejected 做偏好优化”。

---

# you asked

message time: 2026-06-07 16:38:45

没有任何任何内容

---

# chatgpt response

对，问题出在我用了“写作块”格式，你那边很可能没有正常渲染，所以看起来像空的。  
这次我不用那个格式，直接把内容贴成普通 HTML 源码；你复制就能用。

这次我直接贴**普通代码块**，不是写作块。你复制下面这一段，插入到你上一个 HTML 里 **`</body>` 前面** 就行。

```html
<!-- ===================================================== -->
<!-- 第 2 部分：后训练整体路线 SFT → DPO → Online RL -->
<!-- 插入位置：放在上一篇 HTML 的 </body> 前面 -->
<!-- ===================================================== -->

<h2 id="route2">2. 后训练整体路线：SFT → DPO → Online RL</h2>

<p>
理解后训练，不能一上来就背 PPO、DPO、GRPO 的公式。更清楚的方式是先把它看成一条逐步升级的训练路线：
</p>

<pre>
Base Model 基座模型
  ↓
SFT 监督微调：先让模型学会“像助手一样回答”
  ↓
Preference Optimization 偏好优化：让模型更偏向好回答
  ↓
Online RL 在线强化学习：让模型在奖励反馈中继续探索
</pre>

<p>
PyTorch 这篇博客的核心价值就在这里：它不是孤立地介绍一个算法，而是把后训练看成一个完整流程。
这个流程解决的问题是：预训练模型虽然会补全文本，但它不一定会对话、不一定会遵守指令、不一定符合人类偏好，也不一定会通过推理或工具调用完成复杂任务。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/2-3.png" alt="Post-training pipeline: SFT to DPO to Online RL">
<div class="caption">
图 2：后训练管线示意图：SFT → DPO → Online RL。来源：PyTorch 官方博客。
如果图片不显示，可以打开原图：
<a href="https://pytorch.org/wp-content/uploads/2025/08/2-3.png" target="_blank">
https://pytorch.org/wp-content/uploads/2025/08/2-3.png
</a>
</div>
</div>

<h3>2.1 这张图在讲什么？</h3>

<p>
这张图可以理解成一个后训练三阶段路线图。每个阶段解决的问题不同：
</p>

<table>
<tr>
<th>阶段</th>
<th>英文</th>
<th>中文</th>
<th>解决的问题</th>
<th>数据形式</th>
</tr>
<tr>
<td>第一阶段</td>
<td>SFT</td>
<td>监督微调</td>
<td>让模型学会基本对话、指令遵循、格式规范。</td>
<td>prompt → ideal response</td>
</tr>
<tr>
<td>第二阶段</td>
<td>DPO</td>
<td>直接偏好优化</td>
<td>让模型更偏向人类喜欢的回答，远离较差回答。</td>
<td>prompt + chosen + rejected</td>
</tr>
<tr>
<td>第三阶段</td>
<td>Online RL</td>
<td>在线强化学习</td>
<td>让当前模型自己生成回答或轨迹，再根据奖励继续优化。</td>
<td>rollout + reward</td>
</tr>
</table>

<h3>2.2 为什么不能直接上 RL？</h3>

<p>
因为刚从预训练出来的 base model 通常还没有稳定的对话格式。
如果模型连 assistant 应该怎么说话、什么时候停止、怎么遵守 system prompt 都不稳定，直接做 RL 会很混乱。
</p>

<p>
所以 SFT 的作用是先把模型拉到一个“能正常做事”的区域。之后再用 DPO 调整偏好，最后才用 Online RL 进一步提高能力上限。
</p>

<div class="box note">
<strong>一句话理解：</strong>
SFT 解决“会不会做”；DPO 解决“更喜欢哪种做法”；Online RL 解决“能不能通过试错发现更好的做法”。
</div>

<h3>2.3 这条路线和后训练 Agent 有什么关系？</h3>

<p>
如果你以后要学后训练 Agent，这条线可以直接迁移：
</p>

<table>
<tr>
<th>普通 LLM 后训练</th>
<th>Agent 后训练对应版本</th>
</tr>
<tr>
<td>SFT：学习高质量回答。</td>
<td>SFT：学习高质量工具调用轨迹。</td>
</tr>
<tr>
<td>DPO：偏好更好的回答。</td>
<td>DPO：偏好更好的计划、更正确的工具、更短的轨迹。</td>
</tr>
<tr>
<td>Online RL：根据 reward 优化回答。</td>
<td>Online RL：Agent 在环境中执行动作，根据任务完成率、测试结果、工具反馈优化。</td>
</tr>
</table>

<div class="box train">
<strong>后训练 Agent 的核心迁移：</strong>
普通后训练优化的是“回答”，Agent 后训练优化的是“轨迹”。
轨迹包括：
<pre>
Observation 观察
  ↓
Thought 思考
  ↓
Action 动作 / 工具调用
  ↓
Tool Result 工具返回
  ↓
Next Action 下一步动作
  ↓
Final Answer 最终答案
</pre>
</div>

<hr>

<h2 id="route3">3. SFT：Supervised Fine-Tuning，监督微调</h2>

<p>
SFT 是后训练的第一步。它的中文是“监督微调”，但更直白地说，它就是让模型先学会模仿高质量示范。
</p>

<p>
原文把 SFT 的核心理解成 imitation，也就是模仿。模型看到一个 prompt，然后学习理想回答中的每一个 token。
</p>

<h3>3.1 SFT 到底在训练什么？</h3>

<p>
在 SFT 中，模型输入通常包括三部分：
</p>

<pre>
System Prompt 系统提示
User Prompt 用户问题
Assistant Response 助手回答
</pre>

<p>
但训练时不是所有 token 都计算 loss。通常只对 assistant response 计算 loss。
</p>

<pre>
输入：
[system tokens] [user tokens] [assistant tokens]

loss mask：
[0 0 0 0 0] [0 0 0 0] [1 1 1 1 1]
</pre>

<table>
<tr>
<th>部分</th>
<th>中文</th>
<th>是否输入模型</th>
<th>是否计算 loss</th>
<th>原因</th>
</tr>
<tr>
<td>System prompt</td>
<td>系统提示词</td>
<td>是</td>
<td>否</td>
<td>它提供规则，但不是模型要生成的内容。</td>
</tr>
<tr>
<td>User prompt</td>
<td>用户问题</td>
<td>是</td>
<td>否</td>
<td>它提供任务条件，模型要根据它回答。</td>
</tr>
<tr>
<td>Assistant response</td>
<td>助手回答</td>
<td>是</td>
<td>是</td>
<td>这是模型真正需要学习生成的目标。</td>
</tr>
</table>

<h3>3.2 SFT 和预训练有什么区别？</h3>

<table>
<tr>
<th>比较项</th>
<th>Pre-training 预训练</th>
<th>SFT 监督微调</th>
</tr>
<tr>
<td>训练目标</td>
<td>预测下一个 token，学习语言和世界知识。</td>
<td>预测 assistant response，学习如何完成用户任务。</td>
</tr>
<tr>
<td>数据类型</td>
<td>网页、书籍、代码、论文等普通文本。</td>
<td>指令数据、对话数据、问答数据、工具调用数据。</td>
</tr>
<tr>
<td>角色结构</td>
<td>通常没有明确 user / assistant。</td>
<td>明确区分 system / user / assistant。</td>
</tr>
<tr>
<td>学习重点</td>
<td>语言模式、事实知识、代码模式。</td>
<td>指令遵循、对话格式、回答风格、任务完成。</td>
</tr>
<tr>
<td>数据规模</td>
<td>极大，通常万亿 token。</td>
<td>更小，但质量要求更高。</td>
</tr>
</table>

<div class="box note">
<strong>一句话理解：</strong>
预训练让模型“会补全文本”；SFT 让模型“会当助手”。
</div>

<h3>3.3 SFT 为什么重要？</h3>

<p>
因为 SFT 给模型建立了最基本的行为边界。没有 SFT，模型可能会：
</p>

<ul>
<li>不知道自己应该扮演 assistant；</li>
<li>不知道如何遵循用户指令；</li>
<li>不知道什么时候停止；</li>
<li>不知道如何按照指定格式回答；</li>
<li>不知道如何处理多轮上下文。</li>
</ul>

<p>
所以，SFT 不是高级算法，但它是后训练路线的地基。
后面不管是 DPO、PPO、GRPO，通常都需要建立在一个经过 SFT 的模型之上。
</p>

<h3>3.4 SFT 的局限：只能模仿，不能超越数据</h3>

<p>
SFT 的最大问题是：它只能模仿训练数据里已经存在的答案。
如果数据很好，模型会学得不错；如果数据一般，模型也会学得一般。
</p>

<table>
<tr>
<th>SFT 的优点</th>
<th>SFT 的局限</th>
</tr>
<tr>
<td>训练稳定。</td>
<td>上限受示范数据限制。</td>
</tr>
<tr>
<td>工程简单。</td>
<td>不会主动探索更优答案。</td>
</tr>
<tr>
<td>适合学格式、风格、基础任务。</td>
<td>数据质量差会直接污染模型。</td>
</tr>
<tr>
<td>适合做后训练第一步。</td>
<td>很难解决复杂推理和长期任务。</td>
</tr>
</table>

<div class="box warn">
<strong>核心风险：</strong>
SFT 对数据质量极其敏感。坏数据不是“没用”，而是会被模型认真学进去。
</div>

<h3>3.5 对后训练 Agent 的启发</h3>

<p>
如果你训练的是 Agent，SFT 阶段不是先追求“自主”，而是先追求“格式稳定”。
</p>

<p>
比如工具调用 Agent 的 SFT 样本可以长这样：
</p>

<pre>
User:
请计算 27 * 19。

Assistant:
Thought: 这是一个精确计算问题，需要调用 calculator。
Action: calculator({"expression": "27 * 19"})

Tool:
513

Assistant:
Thought: 工具已经返回结果，可以给出最终答案。
Final Answer: 27 * 19 = 513。
</pre>

<table>
<tr>
<th>Agent SFT 要学什么</th>
<th>具体要求</th>
</tr>
<tr>
<td>Thought</td>
<td>说明为什么下一步要调用某个工具。</td>
</tr>
<tr>
<td>Action</td>
<td>输出合法、可解析的工具调用。</td>
</tr>
<tr>
<td>Tool Result 使用</td>
<td>必须根据工具返回继续回答，不能忽略工具。</td>
</tr>
<tr>
<td>Final Answer</td>
<td>知道什么时候结束任务。</td>
</tr>
<tr>
<td>格式稳定</td>
<td>不要一会儿 JSON，一会儿自然语言混乱输出。</td>
</tr>
</table>

<div class="box train">
<strong>实践建议：</strong>
如果你想做一个最小后训练 Agent，第一阶段不要搞复杂任务。
先做三类 SFT 数据：
<ol>
<li>数学计算 → calculator；</li>
<li>文档问答 → search_doc；</li>
<li>代码执行 → run_python。</li>
</ol>
每类准备 100 到 300 条高质量轨迹，比一开始追求几万条低质量数据更有意义。
</div>

<hr>

<h2 id="route4">4. Rejection Sampling：拒绝采样</h2>

<p>
SFT 需要高质量数据，但高质量数据从哪里来？原文接着讲了一个常见办法：Rejection Sampling，拒绝采样。
</p>

<p>
它的直觉很简单：
</p>

<pre>
同一个 prompt
  ↓
让模型生成多个候选答案
  ↓
用评分器、人类、规则或测试筛选
  ↓
只保留最好的答案
  ↓
加入 SFT 数据
</pre>

<h3>4.1 为什么需要拒绝采样？</h3>

<p>
因为人工写高质量答案成本很高，而且质量不稳定。
如果直接把所有人工答案都拿去训练，模型会学习到很多不稳定的风格和错误。
</p>

<table>
<tr>
<th>问题</th>
<th>后果</th>
</tr>
<tr>
<td>人工答案质量不均</td>
<td>模型学到不一致风格。</td>
</tr>
<tr>
<td>部分答案事实错误</td>
<td>模型学习错误信息。</td>
</tr>
<tr>
<td>格式不统一</td>
<td>模型输出格式不稳定。</td>
</tr>
<tr>
<td>推理步骤不严谨</td>
<td>模型学到错误推理模式。</td>
</tr>
</table>

<p>
拒绝采样的作用就是：不要把所有候选都拿来训练，而是先筛一遍。
</p>

<h3>4.2 拒绝采样的完整流程</h3>

<pre>
Step 1：准备 prompt
Step 2：模型生成多个 response
Step 3：用不同 temperature / seed / checkpoint 增加多样性
Step 4：对 response 打分
Step 5：选择最高分 response
Step 6：加入 SFT 数据集
Step 7：继续训练模型
</pre>

<table>
<tr>
<th>环节</th>
<th>中文解释</th>
<th>关键点</th>
</tr>
<tr>
<td>多样生成</td>
<td>让模型生成多个不同答案。</td>
<td>候选越多，越可能出现高质量答案。</td>
</tr>
<tr>
<td>评分排序</td>
<td>用规则、人类、奖励模型或测试排序。</td>
<td>评分器质量决定筛选质量。</td>
</tr>
<tr>
<td>保留好样本</td>
<td>只把高质量答案用于训练。</td>
<td>避免低质量样本污染 SFT。</td>
</tr>
<tr>
<td>迭代提升</td>
<td>模型变强后继续生成更好候选。</td>
<td>形成数据自我改进循环。</td>
</tr>
</table>

<h3>4.3 拒绝采样和 DPO 的区别</h3>

<table>
<tr>
<th>比较项</th>
<th>Rejection Sampling</th>
<th>DPO</th>
</tr>
<tr>
<td>怎么用候选答案</td>
<td>只保留最好的答案。</td>
<td>同时使用好答案和坏答案。</td>
</tr>
<tr>
<td>数据形式</td>
<td>prompt → best response。</td>
<td>prompt + chosen + rejected。</td>
</tr>
<tr>
<td>训练方式</td>
<td>继续做 SFT。</td>
<td>做偏好优化。</td>
</tr>
<tr>
<td>坏答案是否利用</td>
<td>通常丢掉。</td>
<td>作为 rejected 使用。</td>
</tr>
<tr>
<td>适合阶段</td>
<td>SFT 数据增强。</td>
<td>SFT 之后。</td>
</tr>
</table>

<h3>4.4 拒绝采样对 Agent 的价值</h3>

<p>
Agent 任务尤其适合拒绝采样，因为同一个任务可以有多条轨迹：
</p>

<pre>
任务：查找文档并回答问题

轨迹 A：没有调用工具，直接胡编 → 失败
轨迹 B：调用了 search_doc，但 query 不好 → 失败
轨迹 C：调用 search_doc，找到证据，回答正确 → 成功
轨迹 D：回答正确，但调用了 6 次无关工具 → 成本太高

选择：
轨迹 C 作为 SFT 数据
轨迹 A / B / D 可以作为 DPO 的 rejected
</pre>

<table>
<tr>
<th>筛选标准</th>
<th>说明</th>
</tr>
<tr>
<td>任务是否完成</td>
<td>最终答案是否正确。</td>
</tr>
<tr>
<td>工具是否正确</td>
<td>是否调用合适工具。</td>
</tr>
<tr>
<td>参数是否正确</td>
<td>JSON、query、路径、表达式是否正确。</td>
</tr>
<tr>
<td>是否利用工具返回</td>
<td>有没有根据 Observation 回答。</td>
</tr>
<tr>
<td>轨迹是否高效</td>
<td>有没有过多无意义工具调用。</td>
</tr>
</table>

<div class="box train">
<strong>实践建议：</strong>
如果你要构造 Agent 后训练数据，可以先用强模型为每个任务生成 5 条轨迹，然后用规则筛选：
<ul>
<li>JSON 解析失败 → 丢弃；</li>
<li>工具执行失败 → 丢弃或标记 rejected；</li>
<li>最终答案错误 → rejected；</li>
<li>任务成功且轨迹短 → chosen / SFT 数据。</li>
</ul>
</div>

<hr>

<h2 id="route5">5. RL 入门：从模仿到试错</h2>

<p>
SFT 和 Rejection Sampling 仍然是模仿式学习。
但是后训练真正想进一步提高模型能力，尤其是推理、代码、工具调用、多步任务，就需要进入 Reinforcement Learning，强化学习。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/3-1.png" alt="RL agent environment reward loop">
<div class="caption">
图 3：强化学习中的 Agent、Environment、Reward pipeline。来源：PyTorch 官方博客。
如果图片不显示，可以打开原图：
<a href="https://pytorch.org/wp-content/uploads/2025/08/3-1.png" target="_blank">
https://pytorch.org/wp-content/uploads/2025/08/3-1.png
</a>
</div>
</div>

<h3>5.1 这张图在讲什么？</h3>

<p>
这张图是强化学习最基本的闭环：
</p>

<pre>
Agent 采取动作
  ↓
Environment 环境发生变化
  ↓
系统记录发生了什么
  ↓
Reward Pipeline 给出奖励
  ↓
奖励变成训练信号
  ↓
更新 Agent
</pre>

<table>
<tr>
<th>图中元素</th>
<th>中文解释</th>
<th>普通 LLM 对应</th>
<th>Agent 对应</th>
</tr>
<tr>
<td>Agent</td>
<td>智能体</td>
<td>正在训练的大模型。</td>
<td>工具调用 Agent 或代码 Agent。</td>
</tr>
<tr>
<td>Actions</td>
<td>动作</td>
<td>生成回答 token。</td>
<td>搜索、调用工具、写文件、运行代码。</td>
</tr>
<tr>
<td>Environment</td>
<td>环境</td>
<td>用户、评估器。</td>
<td>浏览器、终端、代码仓库、API、数据库。</td>
</tr>
<tr>
<td>Data / what happened</td>
<td>发生了什么</td>
<td>模型回答的内容。</td>
<td>工具返回、测试结果、页面状态变化。</td>
</tr>
<tr>
<td>Reward Pipeline</td>
<td>奖励管线</td>
<td>偏好模型、规则检查器。</td>
<td>测试通过率、工具成功率、任务完成率。</td>
</tr>
<tr>
<td>Labeled data to train on</td>
<td>训练信号</td>
<td>reward 转成模型更新信号。</td>
<td>对整条轨迹进行奖励或惩罚。</td>
</tr>
</table>

<h3>5.2 SFT 和 RL 的根本区别</h3>

<table>
<tr>
<th>维度</th>
<th>SFT</th>
<th>RL</th>
</tr>
<tr>
<td>学习方式</td>
<td>模仿。</td>
<td>试错。</td>
</tr>
<tr>
<td>训练信号</td>
<td>标准答案中的 token。</td>
<td>环境反馈得到的 reward。</td>
</tr>
<tr>
<td>是否需要标准答案</td>
<td>需要。</td>
<td>不一定需要，只要能判断好坏。</td>
</tr>
<tr>
<td>是否能探索新策略</td>
<td>很弱。</td>
<td>可以。</td>
</tr>
<tr>
<td>工程难度</td>
<td>较低。</td>
<td>较高。</td>
</tr>
<tr>
<td>适合任务</td>
<td>格式、风格、基础问答。</td>
<td>数学推理、代码、工具调用、多步任务。</td>
</tr>
</table>

<h3>5.3 为什么 RL 更适合推理和代码？</h3>

<p>
因为有些任务很难写出唯一标准答案，但很容易判断结果对不对。
</p>

<table>
<tr>
<th>任务</th>
<th>为什么难做 SFT</th>
<th>为什么适合 RL</th>
</tr>
<tr>
<td>数学推理</td>
<td>中间推理路径很多。</td>
<td>最终答案可以自动验证。</td>
</tr>
<tr>
<td>代码生成</td>
<td>同一个任务有很多写法。</td>
<td>测试是否通过可以验证。</td>
</tr>
<tr>
<td>工具调用</td>
<td>轨迹可能有多种。</td>
<td>工具是否成功、任务是否完成可以验证。</td>
</tr>
<tr>
<td>网页操作</td>
<td>路径不唯一。</td>
<td>最终页面状态可以验证。</td>
</tr>
</table>

<div class="box note">
<strong>关键句：</strong>
SFT 需要“标准答案”；RL 只需要“判断机制”。
这就是为什么代码、数学、工具调用这些任务特别适合可验证奖励强化学习。
</div>

<h3>5.4 Judging Ability 与 Doing Ability</h3>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/4-1.png" alt="RL closes the gap between judging and doing">
<div class="caption">
图 4：RL 缩小 judging ability 与 doing ability 的差距。来源：PyTorch 官方博客。
如果图片不显示，可以打开原图：
<a href="https://pytorch.org/wp-content/uploads/2025/08/4-1.png" target="_blank">
https://pytorch.org/wp-content/uploads/2025/08/4-1.png
</a>
</div>
</div>

<p>
这张图想表达的是：很多时候，我们判断一个结果好不好，比亲自生成一个好结果更容易。
RL 的作用就是把 judging ability，判断能力，转化为 doing ability，执行能力。
</p>

<table>
<tr>
<th>概念</th>
<th>中文</th>
<th>解释</th>
</tr>
<tr>
<td>Judging Ability</td>
<td>判断能力</td>
<td>你能判断哪个回答更好，哪个代码能通过测试。</td>
</tr>
<tr>
<td>Doing Ability</td>
<td>执行能力</td>
<td>模型自己能生成好回答、好代码、好轨迹。</td>
</tr>
<tr>
<td>RL's Domain</td>
<td>RL 作用区域</td>
<td>通过奖励反馈，把判断能力转成执行能力。</td>
</tr>
</table>

<div class="box train">
<strong>后训练启发：</strong>
如果你能写出一个可靠判断器，就可以做 RL。
比如：
<ul>
<li>数学答案是否正确；</li>
<li>代码测试是否通过；</li>
<li>工具调用 JSON 是否合法；</li>
<li>网页任务是否达到目标状态；</li>
<li>Agent 是否在规定步数内完成任务。</li>
</ul>
</div>

<h3>5.5 Reward Hacking：奖励黑客</h3>

<p>
RL 最大的问题是：模型会最大化 reward，但不一定最大化你的真实意图。
如果 reward 设计有漏洞，模型会钻漏洞。
</p>

<table>
<tr>
<th>真实目标</th>
<th>错误 reward</th>
<th>模型可能学到的坏行为</th>
</tr>
<tr>
<td>写出真正通用的代码</td>
<td>只要测试通过就给满分</td>
<td>硬编码测试样例。</td>
</tr>
<tr>
<td>简洁准确回答</td>
<td>回答越长分越高</td>
<td>模型变得极其啰嗦。</td>
</tr>
<tr>
<td>高效工具调用</td>
<td>只奖励最终成功</td>
<td>模型疯狂调用工具，不管成本。</td>
</tr>
<tr>
<td>安全有帮助</td>
<td>只奖励 helpfulness</td>
<td>模型过度迎合用户，忽略安全。</td>
</tr>
<tr>
<td>合理推理</td>
<td>只奖励最终答案正确</td>
<td>模型可能输出虚假推理，但答案碰巧对。</td>
</tr>
</table>

<div class="box warn">
<strong>这一节最重要的警告：</strong>
RL 算法不是魔法。它只会优化 reward。
所以后训练里，reward design 奖励设计往往比算法名字更重要。
</div>

<h3>5.6 学习到这里应该形成的理解</h3>

<div class="box note">
<strong>阶段总结：</strong>
到这里，你应该已经形成一条清楚路线：
<pre>
数据格式：告诉模型谁是 user，谁是 assistant
  ↓
SFT：让模型模仿高质量回答
  ↓
Rejection Sampling：生成多个候选，筛出更好样本
  ↓
RL：不再只模仿，而是通过 reward 学习
</pre>
下一步要进入的就是：
<pre>
RLHF：如何把人类偏好变成 reward
DPO：如何不用显式 reward model 做偏好优化
</pre>
</div>
```

---

# you asked

message time: 2026-06-07 16:41:13

接着来

---

# chatgpt response

我继续按上一段的格式写，不再用写作块。下面只接 **RLHF 与 DPO** 两部分，保持“原文逻辑—图示—概念—实践—Agent 迁移”的结构。

好的，下面接着上一段，继续写 **第 6 部分 RLHF** 和 **第 7 部分 DPO**。这一段仍然是普通 HTML，你直接复制到原来的 HTML 文件里，放在 `</body>` 前面即可。

```html
<!-- ===================================================== -->
<!-- 第 6 部分：RLHF 与 Reward Model -->
<!-- 插入位置：接在第 5 部分 RL 入门后面，放在 </body> 前 -->
<!-- ===================================================== -->

<h2 id="route6">6. RLHF：Reinforcement Learning from Human Feedback，基于人类反馈的强化学习</h2>

<p>
前面讲了 RL 的基本逻辑：模型采取动作，环境给出 reward，模型根据 reward 更新。
那么在 LLM 后训练中，最经典的一种 RL 形式就是 RLHF。
</p>

<p>
RLHF 的全称是 <strong>Reinforcement Learning from Human Feedback</strong>，中文可以翻译为“基于人类反馈的强化学习”。
它的核心问题是：很多语言任务没有客观标准答案，但人类能判断哪个回答更好。
</p>

<div class="box note">
<strong>一句话理解：</strong>
RLHF 不是让人类给模型逐 token 写标准答案，而是让人类判断多个回答哪个更好，然后把这种偏好转成 reward。
</div>

<h3>6.1 为什么需要 RLHF？</h3>

<p>
有些任务很适合规则奖励，比如数学题、代码测试、JSON 格式检查。
但很多对话任务并没有简单规则。
</p>

<table>
<tr>
<th>任务</th>
<th>为什么很难写规则 reward</th>
</tr>
<tr>
<td>回答是否自然</td>
<td>自然程度很难用一个固定公式衡量。</td>
</tr>
<tr>
<td>回答是否有帮助</td>
<td>helpfulness 依赖上下文和用户意图。</td>
</tr>
<tr>
<td>回答是否礼貌</td>
<td>礼貌程度有主观性。</td>
</tr>
<tr>
<td>回答是否啰嗦</td>
<td>有些问题需要详细，有些问题需要简短。</td>
</tr>
<tr>
<td>回答是否符合人类偏好</td>
<td>偏好本身很难写成明确规则。</td>
</tr>
</table>

<p>
因此，RLHF 的思路是：既然规则难写，那就让人类标注偏好。
比如给同一个 prompt 生成两个回答，让标注者选择哪个更好。
</p>

<h3>6.2 RLHF 的基本流程</h3>

<pre>
Step 1：准备 prompts
  ↓
Step 2：让模型为同一个 prompt 生成多个回答
  ↓
Step 3：人类标注 chosen / rejected
  ↓
Step 4：训练 Reward Model 奖励模型
  ↓
Step 5：当前模型继续生成回答
  ↓
Step 6：Reward Model 给回答打分
  ↓
Step 7：用 PPO 等 RL 算法优化模型
</pre>

<table>
<tr>
<th>环节</th>
<th>英文</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td>Prompts</td>
<td>Prompts</td>
<td>用户问题或任务。</td>
<td>作为模型生成回答的输入。</td>
</tr>
<tr>
<td>Responses</td>
<td>Responses</td>
<td>模型生成的多个回答。</td>
<td>供人类比较。</td>
</tr>
<tr>
<td>Human Preference</td>
<td>人类偏好</td>
<td>人类判断哪个回答更好。</td>
<td>构造偏好数据。</td>
</tr>
<tr>
<td>Reward Model</td>
<td>奖励模型</td>
<td>学习人类偏好，并给新回答打分。</td>
<td>把主观偏好转成可训练 reward。</td>
</tr>
<tr>
<td>Policy Model</td>
<td>策略模型</td>
<td>正在被优化的 LLM。</td>
<td>生成回答并接受 RL 更新。</td>
</tr>
<tr>
<td>PPO / RL</td>
<td>强化学习算法</td>
<td>根据 reward 更新策略模型。</td>
<td>让模型更偏向高 reward 回答。</td>
</tr>
</table>

<h3>6.3 Reward Model 奖励模型到底学什么？</h3>

<p>
Reward Model 并不是直接生成回答，而是给回答打分。
它学习的是：
</p>

<pre>
输入：prompt + response
输出：一个 reward score
</pre>

<p>
比如：
</p>

<pre>
Prompt:
解释什么是机器学习。

Response A:
机器学习是让计算机从数据中学习规律，并用这些规律进行预测或决策的方法。

Response B:
机器学习就是机器自己变聪明。

人类偏好：A 好于 B
Reward Model 学到：score(A) > score(B)
</pre>

<table>
<tr>
<th>模型</th>
<th>输入</th>
<th>输出</th>
<th>作用</th>
</tr>
<tr>
<td>Policy Model</td>
<td>prompt</td>
<td>response</td>
<td>生成回答。</td>
</tr>
<tr>
<td>Reward Model</td>
<td>prompt + response</td>
<td>reward score</td>
<td>评价回答好坏。</td>
</tr>
<tr>
<td>Reference Model</td>
<td>prompt</td>
<td>概率分布</td>
<td>约束 policy model 不要偏离太远。</td>
</tr>
</table>

<h3>6.4 RLHF 和 SFT 有什么区别？</h3>

<table>
<tr>
<th>维度</th>
<th>SFT</th>
<th>RLHF</th>
</tr>
<tr>
<td>数据</td>
<td>标准答案。</td>
<td>偏好比较。</td>
</tr>
<tr>
<td>训练方式</td>
<td>模仿标准答案。</td>
<td>优化 reward。</td>
</tr>
<tr>
<td>是否需要人类写完整答案</td>
<td>通常需要。</td>
<td>不一定，人类只需要比较回答。</td>
</tr>
<tr>
<td>优化目标</td>
<td>让模型输出接近示范答案。</td>
<td>让模型输出更符合人类偏好。</td>
</tr>
<tr>
<td>上限</td>
<td>受示范答案质量限制。</td>
<td>受人类判断和 reward model 质量限制。</td>
</tr>
</table>

<div class="box note">
<strong>核心区别：</strong>
SFT 学的是“答案长什么样”；RLHF 学的是“什么样的答案更好”。
</div>

<h3>6.5 RLHF 的关键瓶颈：Reward Model 的质量</h3>

<p>
PyTorch 原文里有一个非常关键的判断：RL 能达到的上限取决于你的 judging ability，也就是判断能力。
在 RLHF 里，这个判断能力主要由 Reward Model 决定。
</p>

<p>
如果 Reward Model 判断准，模型就可能学到更好行为。
如果 Reward Model 判断不准，模型就会学会迎合错误评分器。
</p>

<table>
<tr>
<th>Reward Model 偏差</th>
<th>模型可能学到什么</th>
</tr>
<tr>
<td>偏爱长回答</td>
<td>模型变得越来越啰嗦。</td>
</tr>
<tr>
<td>看不出事实错误</td>
<td>模型生成看似流畅但事实错误的回答。</td>
</tr>
<tr>
<td>偏爱礼貌话术</td>
<td>模型过度客套，但信息密度下降。</td>
</tr>
<tr>
<td>看不懂专业内容</td>
<td>模型在专业问题上学会“装懂”。</td>
</tr>
<tr>
<td>忽视安全边界</td>
<td>模型过度迎合用户请求。</td>
</tr>
</table>

<div class="box warn">
<strong>重要风险：</strong>
RLHF 的 reward 不是天然正确的。Reward Model 只是一个模型，它会有偏差，也会被 policy model 钻漏洞。
</div>

<h3>6.6 RLHF 与 Reward Hacking</h3>

<p>
在 RLHF 中，reward hacking 的典型表现是：模型学会让 Reward Model 高兴，而不是真正让用户满意。
</p>

<table>
<tr>
<th>真实目标</th>
<th>Reward Model 可能偏好的东西</th>
<th>模型学到的投机行为</th>
</tr>
<tr>
<td>回答准确</td>
<td>回答看起来流畅。</td>
<td>模型写得很自信，但事实不一定对。</td>
</tr>
<tr>
<td>回答有帮助</td>
<td>回答很长、覆盖很多点。</td>
<td>模型堆砌信息，用户反而难读。</td>
</tr>
<tr>
<td>回答安全</td>
<td>回答显得合作。</td>
<td>模型可能不该答也答。</td>
</tr>
<tr>
<td>回答简洁</td>
<td>回答形式完整。</td>
<td>模型过度模板化。</td>
</tr>
</table>

<h3>6.7 RLHF 对后训练 Agent 的启发</h3>

<p>
Agent 后训练里也可以用 RLHF，但要小心。
如果让人类评价 Agent 轨迹，人类不仅要看最终答案，还要看中间行为是否合理。
</p>

<table>
<tr>
<th>Agent 评价维度</th>
<th>人类可以判断什么</th>
<th>Reward Model 可能怎么学</th>
</tr>
<tr>
<td>任务是否完成</td>
<td>最终结果是否满足用户需求。</td>
<td>学习任务完成质量。</td>
</tr>
<tr>
<td>工具是否合理</td>
<td>是否调用了合适工具。</td>
<td>学习工具选择偏好。</td>
</tr>
<tr>
<td>步骤是否高效</td>
<td>有没有绕远路。</td>
<td>学习低成本轨迹。</td>
</tr>
<tr>
<td>是否安全</td>
<td>有没有调用危险工具或执行危险操作。</td>
<td>学习安全边界。</td>
</tr>
<tr>
<td>是否利用反馈</td>
<td>工具报错后有没有修正。</td>
<td>学习错误恢复能力。</td>
</tr>
</table>

<div class="box train">
<strong>实践建议：</strong>
如果你做 Agent RLHF，不要只让人类给最终答案打分。
更好的标注格式是：
<pre>
任务完成：0 / 1
工具选择：好 / 中 / 差
参数正确：0 / 1
轨迹效率：1-5 分
安全性：通过 / 不通过
最终回答质量：1-5 分
</pre>
这样 reward 才能更细，不容易只奖励表面答案。
</div>

<hr>

<!-- ===================================================== -->
<!-- 第 7 部分：DPO -->
<!-- ===================================================== -->

<h2 id="route7">7. DPO：Direct Preference Optimization，直接偏好优化</h2>

<p>
理解了 RLHF 以后，DPO 就很好理解了。
DPO 的全称是 <strong>Direct Preference Optimization</strong>，中文可以翻译为“直接偏好优化”。
</p>

<p>
PyTorch 原文里说，DPO 是专门用于 LLM RLHF 的方法。
它不是 PPO 那样的通用强化学习算法，更像是一种把偏好优化转成监督学习式 loss 的方法。
</p>

<div class="box note">
<strong>一句话理解：</strong>
DPO 不单独训练 Reward Model，也不做复杂在线 RL。
它直接利用 chosen / rejected 偏好对，让模型提高 chosen 的概率，降低 rejected 的概率。
</div>

<h3>7.1 DPO 的数据长什么样？</h3>

<p>
DPO 的数据不是普通问答，而是一组三元组：
</p>

<pre>
prompt：同一个问题
chosen：更好的回答
rejected：更差的回答
</pre>

<p>
示例：
</p>

<pre>
{
  "prompt": "解释什么是过拟合。",
  "chosen": "过拟合是指模型在训练集上表现很好，但在新数据上表现较差，说明模型记住了训练数据中的噪声或偶然模式。",
  "rejected": "过拟合就是模型太复杂了。"
}
</pre>

<table>
<tr>
<th>字段</th>
<th>中文</th>
<th>作用</th>
</tr>
<tr>
<td>prompt</td>
<td>问题 / 指令</td>
<td>给定同一个输入。</td>
</tr>
<tr>
<td>chosen</td>
<td>被偏好的回答</td>
<td>人类或评估器认为更好的回答。</td>
</tr>
<tr>
<td>rejected</td>
<td>被拒绝的回答</td>
<td>较差回答。</td>
</tr>
</table>

<h3>7.2 DPO 的核心直觉</h3>

<p>
DPO 的核心非常直观：
</p>

<pre>
对于同一个 prompt：

让模型更愿意生成 chosen
让模型更不愿意生成 rejected
</pre>

<p>
更具体地说，大语言模型本身可以给出一个回答在当前 prompt 下的概率。
如果 chosen 是好答案，rejected 是坏答案，那么我们希望：
</p>

<pre>
P(chosen | prompt) 变大
P(rejected | prompt) 变小
</pre>

<p>
也就是说，DPO 直接在模型概率上做偏好优化。
</p>

<h3>7.3 为什么 DPO 不需要 Reward Model？</h3>

<p>
传统 RLHF 的流程是：
</p>

<pre>
人类偏好数据
  ↓
训练 Reward Model
  ↓
Reward Model 给模型输出打分
  ↓
PPO 优化 Policy Model
</pre>

<p>
而 DPO 的思路是：
</p>

<pre>
人类偏好数据
  ↓
直接优化 Policy Model
</pre>

<p>
它跳过了显式训练 Reward Model 这一步。
这让 DPO 更简单、更便宜、更稳定。
</p>

<table>
<tr>
<th>路线</th>
<th>是否需要 Reward Model</th>
<th>是否需要 Online Rollout</th>
<th>工程复杂度</th>
</tr>
<tr>
<td>RLHF + PPO</td>
<td>需要</td>
<td>需要</td>
<td>高</td>
</tr>
<tr>
<td>DPO</td>
<td>不需要显式 Reward Model</td>
<td>不需要</td>
<td>低</td>
</tr>
</table>

<div class="box note">
<strong>关键理解：</strong>
DPO 的优势不是“比 PPO 永远更强”，而是“它用更低成本做偏好优化”。
</div>

<h3>7.4 DPO 和 SFT 的区别</h3>

<table>
<tr>
<th>维度</th>
<th>SFT</th>
<th>DPO</th>
</tr>
<tr>
<td>数据形式</td>
<td>prompt → response</td>
<td>prompt + chosen + rejected</td>
</tr>
<tr>
<td>学习方式</td>
<td>模仿一个标准答案。</td>
<td>比较两个答案，偏向更好的。</td>
</tr>
<tr>
<td>是否使用坏答案</td>
<td>通常不用。</td>
<td>使用 rejected 作为负样本。</td>
</tr>
<tr>
<td>优化目标</td>
<td>提高标准答案概率。</td>
<td>提高 chosen 相对 rejected 的概率。</td>
</tr>
<tr>
<td>适合阶段</td>
<td>后训练第一步。</td>
<td>SFT 之后的偏好对齐。</td>
</tr>
</table>

<h3>7.5 DPO 和 PPO 的区别</h3>

<p>
PyTorch 原文把 DPO 和 PPO 做了对比。这个对比非常关键，因为它解释了为什么很多团队会先用 DPO，而不是直接上 PPO。
</p>

<table>
<tr>
<th>比较项</th>
<th>DPO</th>
<th>PPO</th>
</tr>
<tr>
<td>算法类型</td>
<td>更像监督学习式偏好优化。</td>
<td>真正的强化学习算法。</td>
</tr>
<tr>
<td>数据来源</td>
<td>固定偏好数据集。</td>
<td>当前模型在线生成 rollouts。</td>
</tr>
<tr>
<td>是否探索</td>
<td>不探索。</td>
<td>可以探索新回答。</td>
</tr>
<tr>
<td>是否 On-policy</td>
<td>否，通常是 off-policy。</td>
<td>是，通常要求当前模型生成数据。</td>
</tr>
<tr>
<td>计算成本</td>
<td>低。</td>
<td>高。</td>
</tr>
<tr>
<td>训练稳定性</td>
<td>高，接近微调。</td>
<td>低，RL 方差较大。</td>
</tr>
<tr>
<td>上限受什么限制</td>
<td>受数据限制。</td>
<td>受 reward 和 compute 限制。</td>
</tr>
<tr>
<td>适合场景</td>
<td>低成本偏好对齐。</td>
<td>需要探索、更高上限的任务。</td>
</tr>
</table>

<div class="box warn">
<strong>重要限制：</strong>
DPO 不探索。它只能学习数据集中已经出现过的 chosen / rejected 差异。
如果偏好数据里没有更优策略，DPO 自己不会凭空发现。
</div>

<h3>7.6 DPO 为什么适合作为第二阶段？</h3>

<p>
因为 SFT 之后，模型已经会基本回答。
但它可能仍然有很多偏好问题：
</p>

<ul>
<li>回答太长；</li>
<li>回答不够直接；</li>
<li>工具调用格式不够稳定；</li>
<li>遇到不确定问题时乱猜；</li>
<li>忽略用户要求的格式；</li>
<li>在两个可选答案中经常选较差表达。</li>
</ul>

<p>
DPO 可以用 chosen / rejected 数据纠正这些偏好。
</p>

<h3>7.7 DPO 在 Agent 后训练中的用法</h3>

<p>
对于 Agent 来说，DPO 不只可以比较最终答案，还可以比较轨迹。
</p>

<h4>例子一：工具选择偏好</h4>

<pre>
Prompt:
计算 125 * 37。

Chosen:
Action: calculator({"expression": "125 * 37"})

Rejected:
Action: search({"query": "125 * 37"})
</pre>

<h4>例子二：参数正确性偏好</h4>

<pre>
Prompt:
查找文档中关于 RLHF 的定义。

Chosen:
Action: search_doc({"query": "RLHF definition"})

Rejected:
Action: search_doc({"keyword": "RLHF definition"})
</pre>

<p>
这里 rejected 的问题是参数字段错了。如果真实工具 schema 需要 <code>query</code> 字段，那么 <code>keyword</code> 就会导致工具调用失败。
</p>

<h4>例子三：轨迹效率偏好</h4>

<pre>
Prompt:
总结文档中 DPO 和 PPO 的区别。

Chosen:
1. search_doc("DPO PPO comparison")
2. summarize results
3. final answer

Rejected:
1. search_doc("DPO")
2. search_doc("PPO")
3. search_doc("RLHF")
4. search_doc("OpenAI")
5. summarize loosely
6. final answer
</pre>

<p>
两个轨迹都可能完成任务，但 chosen 更短、更聚焦、更低成本。
这类偏好对非常适合 Agent DPO。
</p>

<table>
<tr>
<th>Agent DPO 比较对象</th>
<th>chosen 应该是什么</th>
<th>rejected 应该是什么</th>
</tr>
<tr>
<td>工具选择</td>
<td>选择正确工具。</td>
<td>选择无关或错误工具。</td>
</tr>
<tr>
<td>工具参数</td>
<td>字段合法、参数准确。</td>
<td>字段错、格式错、参数不完整。</td>
</tr>
<tr>
<td>任务拆解</td>
<td>子任务完整、顺序合理。</td>
<td>缺步骤、顺序乱、不可执行。</td>
</tr>
<tr>
<td>轨迹效率</td>
<td>少步骤完成任务。</td>
<td>大量无意义工具调用。</td>
</tr>
<tr>
<td>错误恢复</td>
<td>工具失败后换策略。</td>
<td>工具失败后重复同样错误。</td>
</tr>
<tr>
<td>最终回答</td>
<td>基于工具结果回答。</td>
<td>忽略工具返回直接编造。</td>
</tr>
</table>

<div class="box train">
<strong>实践建议：</strong>
如果你要做 Agent DPO，可以先从最容易构造的三类偏好数据开始：
<ol>
<li><strong>正确工具 vs 错误工具；</strong></li>
<li><strong>合法参数 vs 非法参数；</strong></li>
<li><strong>短成功轨迹 vs 长低效轨迹。</strong></li>
</ol>
这些数据比“整体回答好坏”更容易自动构造，也更容易提升 Agent 的可靠性。
</div>

<h3>7.8 DPO 学到这里应该怎么理解？</h3>

<div class="box note">
<strong>阶段总结：</strong>
到这里，后训练路线已经从 SFT 进入偏好优化：
<pre>
SFT：
我告诉模型标准答案是什么。

Rejection Sampling：
我让模型生成多个答案，只留下最好的继续 SFT。

RLHF：
我让人类判断哪个答案好，再训练 Reward Model，然后用 RL 优化。

DPO：
我不显式训练 Reward Model，直接用 chosen / rejected 优化模型偏好。
</pre>
</div>

<p>
下一步就进入 <strong>Online RL / PPO</strong>。这是比 DPO 更复杂、成本更高、但上限更高的阶段。
DPO 用固定数据学习偏好；Online RL 让模型自己生成新样本，再用 reward 训练。
</p>
```

---

# you asked

message time: 2026-06-07 16:43:46

ok接着‘

---

# chatgpt response

继续，这一段接在你上一段 **DPO** 后面，写 **Online RL / PPO**。  
直接复制到 `</body>` 前面即可。

```html
<!-- ===================================================== -->
<!-- 第 8 部分：Online RL / PPO -->
<!-- 插入位置：接在第 7 部分 DPO 后面，放在 </body> 前 -->
<!-- ===================================================== -->

<h2 id="route8">8. Online RL：在线强化学习</h2>

<p>
前面讲到 DPO。DPO 的优点是便宜、稳定、像监督微调一样容易跑；但它的缺点也很明显：它只能学习已有偏好数据里的差异，不能自己探索新的答案或新策略。
</p>

<p>
所以后训练路线继续往后走，就进入 <strong>Online RL</strong>，在线强化学习。
PyTorch 原文把它作为后训练管线里的第三个阶段。这里最典型的算法是 <strong>PPO</strong>，也就是 Proximal Policy Optimization，近端策略优化；另一个现在经常被提到的是 <strong>GRPO</strong>，Group Relative Policy Optimization，组相对策略优化。
</p>

<div class="box note">
<strong>一句话理解：</strong>
DPO 是“拿已有好坏样本来学”；Online RL 是“让当前模型自己生成新样本，再根据奖励继续学”。
</div>

<h3>8.1 Online RL 解决什么问题？</h3>

<p>
Online RL 解决的是 DPO 和 SFT 的共同上限问题。
</p>

<table>
<tr>
<th>方法</th>
<th>主要能力</th>
<th>上限来自哪里</th>
</tr>
<tr>
<td>SFT</td>
<td>模仿高质量答案。</td>
<td>受示范答案质量限制。</td>
</tr>
<tr>
<td>DPO</td>
<td>偏向 chosen，远离 rejected。</td>
<td>受偏好数据覆盖范围限制。</td>
</tr>
<tr>
<td>Online RL</td>
<td>模型自己探索新回答、新轨迹。</td>
<td>受 reward 质量、探索能力、计算资源限制。</td>
</tr>
</table>

<p>
也就是说，如果训练数据里没有某种更好的策略，SFT 和 DPO 都很难凭空学会。
但 Online RL 可以让模型自己生成新候选，然后由 reward 判断哪些更好。
这就是为什么 reasoning、代码、数学、工具调用这些任务越来越依赖 RL。
</p>

<h3>8.2 什么是 Policy？</h3>

<p>
在强化学习里，policy 可以理解成“策略”。
对 LLM 来说，policy 就是正在训练的语言模型本身。
</p>

<table>
<tr>
<th>RL 术语</th>
<th>中文</th>
<th>在 LLM 中的对应物</th>
</tr>
<tr>
<td>Policy</td>
<td>策略</td>
<td>当前正在训练的 LLM。</td>
</tr>
<tr>
<td>Action</td>
<td>动作</td>
<td>生成 token、回答、工具调用、代码修改。</td>
</tr>
<tr>
<td>Environment</td>
<td>环境</td>
<td>用户、评测器、代码测试环境、工具系统。</td>
</tr>
<tr>
<td>Reward</td>
<td>奖励</td>
<td>回答质量分数、测试通过、答案正确、任务完成。</td>
</tr>
<tr>
<td>Rollout</td>
<td>轨迹采样</td>
<td>模型完整生成一次回答或完成一次任务的过程。</td>
</tr>
</table>

<p>
如果是普通聊天模型，action 主要是生成文本。
如果是 Agent，action 可以是调用工具、点击网页、运行代码、写文件、查询数据库。
</p>

<h3>8.3 On-policy vs Off-policy</h3>

<p>
PyTorch 原文强调了一个关键概念：<strong>On-policy</strong> 和 <strong>Off-policy</strong>。
这个概念必须搞清楚，因为它决定了 DPO 和 PPO 的根本差异。
</p>

<table>
<tr>
<th>概念</th>
<th>中文</th>
<th>解释</th>
<th>代表方法</th>
</tr>
<tr>
<td>On-policy</td>
<td>同策略 / 在线策略</td>
<td>训练数据来自当前正在训练的模型。</td>
<td>PPO、A2C、TRPO。</td>
</tr>
<tr>
<td>Off-policy</td>
<td>异策略 / 离线策略</td>
<td>训练数据来自过去模型、其他模型或固定数据集。</td>
<td>DPO、DQN、Replay Buffer 方法。</td>
</tr>
</table>

<h4>用学生学习来理解</h4>

<table>
<tr>
<th>类比</th>
<th>On-policy</th>
<th>Off-policy</th>
</tr>
<tr>
<td>学习方式</td>
<td>你自己做题，老师立刻批改，然后你根据反馈继续做。</td>
<td>你看别人以前做过的题和答案，从中学习。</td>
</tr>
<tr>
<td>数据来源</td>
<td>你当前自己的尝试。</td>
<td>别人或过去自己的历史记录。</td>
</tr>
<tr>
<td>优点</td>
<td>能探索自己当前还不会的东西。</td>
<td>成本低，可以反复使用旧数据。</td>
</tr>
<tr>
<td>缺点</td>
<td>成本高，训练不稳定。</td>
<td>不能真正探索新策略。</td>
</tr>
</table>

<div class="box note">
<strong>一句话理解：</strong>
DPO 更像“看历史偏好题库学习”；PPO 更像“自己现场做题、现场批改、现场调整”。
</div>

<h3>8.4 Online vs Offline：从工程角度理解</h3>

<p>
On-policy / Off-policy 是从训练动态角度看。
如果从工程角度看，就会变成 Online / Offline。
</p>

<table>
<tr>
<th>工程视角</th>
<th>Offline 离线训练</th>
<th>Online 在线训练</th>
</tr>
<tr>
<td>数据来源</td>
<td>固定数据集。</td>
<td>训练过程中实时生成。</td>
</tr>
<tr>
<td>典型方法</td>
<td>SFT、Rejection Sampling、DPO。</td>
<td>PPO、GRPO、Online RL。</td>
</tr>
<tr>
<td>工程难度</td>
<td>低。</td>
<td>高。</td>
</tr>
<tr>
<td>是否需要 rollout</td>
<td>不需要或提前生成。</td>
<td>需要当前模型不断生成。</td>
</tr>
<tr>
<td>是否需要环境</td>
<td>通常不需要实时环境。</td>
<td>通常需要 reward pipeline 或真实环境。</td>
</tr>
<tr>
<td>训练稳定性</td>
<td>更稳定。</td>
<td>更不稳定。</td>
</tr>
<tr>
<td>探索能力</td>
<td>弱。</td>
<td>强。</td>
</tr>
</table>

<p>
所以从工程角度看，Online RL 的难点不仅是算法，而是系统。
你需要让模型不断生成新数据，还要给这些数据打分，然后再用这些新数据训练模型。
</p>

<div class="box warn">
<strong>重要提醒：</strong>
很多人学 PPO 时只盯公式，但真正跑起来更难的是工程系统：
rollout、reward、模型同步、batching、显存、KV cache、训练稳定性。
</div>

<h3>8.5 Online RL 的基本训练循环</h3>

<p>
PyTorch 原文给了一个理想化 PPO 训练循环。它的逻辑大致是：
</p>

<pre>
collector = CollectorClass(model)

for i in range(num_collection):
    collector.sync_weights_()
    data = next(collector)

    for j in range(num_epochs):
        for batch in split_data_randomly(data):
            loss_val = loss_fn(data)
            loss_val.backward()
            optim.step()
            optim.zero_grad()
</pre>

<h4>逐行解释</h4>

<table>
<tr>
<th>代码片段</th>
<th>中文解释</th>
<th>意义</th>
</tr>
<tr>
<td><code>collector = CollectorClass(model)</code></td>
<td>创建采样器。</td>
<td>collector 负责让当前模型生成新数据，也就是 rollout。</td>
</tr>
<tr>
<td><code>collector.sync_weights_()</code></td>
<td>同步模型权重。</td>
<td>确保采样器用的是当前最新策略。</td>
</tr>
<tr>
<td><code>data = next(collector)</code></td>
<td>收集一批新数据。</td>
<td>让模型生成回答或轨迹，并获得 reward。</td>
</tr>
<tr>
<td><code>for j in range(num_epochs)</code></td>
<td>对这批数据训练多轮。</td>
<td>提高数据利用率。</td>
</tr>
<tr>
<td><code>loss_fn(data)</code></td>
<td>计算 RL loss。</td>
<td>根据 reward、logprob、advantage 等构造损失。</td>
</tr>
<tr>
<td><code>backward / optim.step</code></td>
<td>反向传播并更新参数。</td>
<td>让模型更倾向于高 reward 行为。</td>
</tr>
</table>

<h3>8.6 为什么这个循环工程上很难？</h3>

<p>
这个循环看起来简单，但对 LLM 来说非常贵。
因为采样不是一次普通 forward，而是自回归生成。
</p>

<table>
<tr>
<th>难点</th>
<th>解释</th>
<th>为什么麻烦</th>
</tr>
<tr>
<td>自回归生成慢</td>
<td>模型一个 token 一个 token 生成。</td>
<td>比普通训练 forward 慢很多。</td>
</tr>
<tr>
<td>需要大量 rollout</td>
<td>RL 需要不断生成新样本。</td>
<td>推理成本很高。</td>
</tr>
<tr>
<td>权重同步复杂</td>
<td>采样器和训练器需要同步最新模型。</td>
<td>分布式训练时非常麻烦。</td>
</tr>
<tr>
<td>数据容易过时</td>
<td>模型更新后，旧 rollout 可能不再 on-policy。</td>
<td>影响训练稳定性。</td>
</tr>
<tr>
<td>batching 难</td>
<td>不同回答长度不同，工具调用轨迹也不同。</td>
<td>GPU 利用率不稳定。</td>
</tr>
<tr>
<td>reward 计算可能慢</td>
<td>代码测试、网页环境、工具调用都要时间。</td>
<td>训练吞吐下降。</td>
</tr>
</table>

<div class="box train">
<strong>工程理解：</strong>
Online RL 不是“多加一个 loss”这么简单。它需要一个完整系统：
<pre>
模型生成器
  ↓
环境执行器
  ↓
奖励计算器
  ↓
数据缓存
  ↓
训练器
  ↓
权重同步
</pre>
这也是为什么 OpenRLHF、verl、TRL GRPOTrainer 这些框架会出现。
</div>

<h3>8.7 为什么 PPO 是 Online RL 的经典方法？</h3>

<p>
PPO 的全称是 <strong>Proximal Policy Optimization</strong>，中文可以翻译成“近端策略优化”。
它的核心目标是：让模型朝着高 reward 的方向更新，但不要更新得太猛。
</p>

<p>
为什么不能更新太猛？因为在 RL 中，模型稍微一变，生成数据分布就会变。
如果每次更新都过大，模型很容易崩。
</p>

<table>
<tr>
<th>问题</th>
<th>如果没有 PPO 的约束会怎样</th>
</tr>
<tr>
<td>模型过度追求 reward</td>
<td>可能突然学会奇怪格式或投机行为。</td>
</tr>
<tr>
<td>策略变化太大</td>
<td>新模型和旧模型差异太大，训练不稳定。</td>
</tr>
<tr>
<td>reward model 有漏洞</td>
<td>模型快速钻漏洞。</td>
</tr>
<tr>
<td>语言质量退化</td>
<td>模型为了 reward 牺牲流畅性和安全性。</td>
</tr>
</table>

<div class="box note">
<strong>PPO 的直觉：</strong>
让模型变好，但每一步只允许它小步更新，不要突然跑太远。
</div>

<h3>8.8 PPO 的基本思想：提高好动作概率，降低坏动作概率</h3>

<p>
前面说过，RL 不能直接对 reward 反向传播。
所以它对模型输出的 log probability 做文章。
</p>

<pre>
如果某个输出得到高 reward：
    提高它的 log probability

如果某个输出得到低 reward：
    降低它的 log probability
</pre>

<p>
但 PPO 不会无脑提高或降低，而是会检查新旧策略差异，控制更新幅度。
</p>

<h3>8.9 Ratio：新旧策略概率比</h3>

<p>
PPO 中有一个非常重要的概念：ratio。
它表示新策略生成某个动作的概率，与旧策略生成这个动作的概率之比。
</p>

<pre>
ratio = P_new(action) / P_old(action)
</pre>

<table>
<tr>
<th>ratio 情况</th>
<th>含义</th>
</tr>
<tr>
<td>ratio = 1</td>
<td>新旧模型对这个动作的概率一样。</td>
</tr>
<tr>
<td>ratio > 1</td>
<td>新模型更倾向于这个动作。</td>
</tr>
<tr>
<td>ratio < 1</td>
<td>新模型更不倾向于这个动作。</td>
</tr>
</table>

<p>
如果一个动作 reward 很高，我们希望 ratio 变大；
如果一个动作 reward 很低，我们希望 ratio 变小。
但不能无限变大或变小，否则策略会崩。
</p>

<h3>8.10 Clipping：裁剪更新幅度</h3>

<p>
PPO 的关键技巧是 clipping，裁剪。
它会限制 ratio 的范围，例如限制在：
</p>

<pre>
1 - ε 到 1 + ε
</pre>

<p>
常见情况下，ε 可以理解成一个小范围，比如 0.2。
这意味着新策略不能相对旧策略变化太剧烈。
</p>

<table>
<tr>
<th>机制</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td>ratio</td>
<td>新旧策略概率比</td>
<td>衡量模型更新幅度。</td>
</tr>
<tr>
<td>clip</td>
<td>裁剪</td>
<td>限制 ratio 不要超过安全范围。</td>
</tr>
<tr>
<td>advantage</td>
<td>优势</td>
<td>判断这个动作比平均水平好多少。</td>
</tr>
<tr>
<td>KL penalty</td>
<td>KL 惩罚</td>
<td>限制新模型不要偏离参考模型太远。</td>
</tr>
</table>

<div class="box note">
<strong>一句话理解 PPO：</strong>
如果某个回答好，就提高它的概率；如果不好，就降低它的概率。但无论好坏，每次都只小步调整，避免模型突然崩掉。
</div>

<h3>8.11 Advantage：优势函数</h3>

<p>
PPO 不只是看 reward，还会看 advantage。
Advantage 可以理解为：这个动作比当前状态下的平均水平好多少。
</p>

<pre>
advantage = reward - baseline
</pre>

<table>
<tr>
<th>概念</th>
<th>中文</th>
<th>解释</th>
</tr>
<tr>
<td>Reward</td>
<td>奖励</td>
<td>这个输出得到多少分。</td>
</tr>
<tr>
<td>Baseline / Value</td>
<td>基线 / 价值估计</td>
<td>当前状态下平均能拿多少分。</td>
</tr>
<tr>
<td>Advantage</td>
<td>优势</td>
<td>当前输出比平均水平好多少。</td>
</tr>
</table>

<p>
为什么不用 reward 直接训练？
因为不同 prompt 的难度不同。
一个 0.6 的 reward 在难题里可能很好，在简单题里可能很差。
Advantage 的作用就是把 reward 放到当前上下文里比较。
</p>

<h3>8.12 PPO 对后训练 Agent 的意义</h3>

<p>
如果是普通聊天模型，PPO 优化的是回答。
如果是 Agent，PPO 优化的是整条轨迹。
</p>

<table>
<tr>
<th>普通 LLM PPO</th>
<th>Agent PPO</th>
</tr>
<tr>
<td>prompt → response → reward</td>
<td>task → action sequence → environment feedback → reward</td>
</tr>
<tr>
<td>动作是 token。</td>
<td>动作可以是工具调用、网页点击、代码修改、搜索 query。</td>
</tr>
<tr>
<td>reward 可能来自人类偏好模型。</td>
<td>reward 可能来自测试通过率、工具成功率、任务状态。</td>
</tr>
<tr>
<td>主要优化回答质量。</td>
<td>主要优化任务完成率、轨迹效率和错误恢复能力。</td>
</tr>
</table>

<h4>Agent PPO 轨迹示例</h4>

<pre>
Task:
修复一个 Python 函数中的 bug。

Action 1:
read_file("main.py")

Observation 1:
返回 main.py 内容。

Action 2:
edit_file("main.py", patch)

Observation 2:
文件修改成功。

Action 3:
run_tests()

Observation 3:
测试失败，提示 IndexError。

Action 4:
read_file("main.py")

Action 5:
edit_file("main.py", new_patch)

Action 6:
run_tests()

Observation 6:
全部测试通过。

Reward:
+1.0
</pre>

<p>
这时 reward 不是给某一句话，而是给整条任务轨迹。
难点是：最终测试通过，究竟应该奖励哪一步？哪些动作贡献最大？哪些动作是浪费？
这就是 Agent RL 比普通文本 RL 更难的地方。
</p>

<h3>8.13 Online RL 的优势与风险</h3>

<table>
<tr>
<th>方面</th>
<th>优势</th>
<th>风险</th>
</tr>
<tr>
<td>能力上限</td>
<td>可以通过探索超过已有数据。</td>
<td>如果 reward 差，会探索出坏行为。</td>
</tr>
<tr>
<td>适合任务</td>
<td>数学、代码、推理、工具调用、多步任务。</td>
<td>开放任务 reward 难设计。</td>
</tr>
<tr>
<td>数据</td>
<td>模型自己持续生成。</td>
<td>生成成本高。</td>
</tr>
<tr>
<td>训练</td>
<td>能直接优化任务成功率。</td>
<td>容易不稳定。</td>
</tr>
<tr>
<td>Agent</td>
<td>能训练真实环境行动能力。</td>
<td>环境搭建复杂，安全风险更高。</td>
</tr>
</table>

<div class="box warn">
<strong>不要一上来就做 PPO：</strong>
对个人学习来说，合理顺序是：
<pre>
SFT
  ↓
DPO
  ↓
Rule-based reward
  ↓
GRPO / PPO 小任务
  ↓
复杂 Agent RL
</pre>
如果直接上 PPO，很容易卡在工程和 reward 设计上。
</div>

<h3>8.14 这一节阶段总结</h3>

<div class="box note">
<strong>Online RL 总结：</strong>
Online RL 是后训练路线里“真正开始探索”的阶段。
它比 SFT 和 DPO 更贵、更难、更不稳定，但也有更高上限。
</div>

<table>
<tr>
<th>你应该记住的问题</th>
<th>答案</th>
</tr>
<tr>
<td>Online RL 和 DPO 最大区别是什么？</td>
<td>DPO 用固定偏好数据；Online RL 用当前模型实时生成数据。</td>
</tr>
<tr>
<td>PPO 为什么需要 clipping？</td>
<td>防止策略更新太大，导致模型崩掉。</td>
</tr>
<tr>
<td>为什么 Online RL 成本高？</td>
<td>需要大量自回归生成、reward 计算和权重同步。</td>
</tr>
<tr>
<td>为什么它适合 reasoning / coding？</td>
<td>这些任务有可验证 reward，适合通过探索提高能力。</td>
</tr>
<tr>
<td>为什么 Agent RL 更难？</td>
<td>Agent 的 reward 通常来自整条轨迹，信用分配和环境执行都更复杂。</td>
</tr>
</table>

<div class="box train">
<strong>学到这里，后训练主线应该变成：</strong>
<pre>
SFT：模仿高质量答案
  ↓
Rejection Sampling：生成多个候选，筛好样本
  ↓
DPO：学习 chosen / rejected 偏好
  ↓
Online RL / PPO：当前模型自己探索，用 reward 优化
</pre>
下一步要进入的是：
Reward Pipeline，也就是“奖励到底怎么设计”。
</div>
```

---

# you asked

message time: 2026-06-07 16:46:10

接着来

---

# chatgpt response

接着来，这一段接在你上一段 **Online RL / PPO** 后面，写 **Reward Pipeline 奖励管线** 和 **Test-time Reasoning / DeepSeek-R1 推理后训练**。  
直接复制到 `</body>` 前面即可。

```html
<!-- ===================================================== -->
<!-- 第 9 部分：Reward Pipeline 奖励管线 -->
<!-- 插入位置：接在第 8 部分 Online RL / PPO 后面，放在 </body> 前 -->
<!-- ===================================================== -->

<h2 id="route9">9. Reward Pipeline：奖励管线</h2>

<p>
前面讲 Online RL 时，有一个问题一直没有展开：<strong>reward 到底从哪里来？</strong>
如果没有可靠 reward，RL 就没有方向；如果 reward 写错了，模型就会朝错误方向优化。
</p>

<p>
PyTorch 原文在 “Beyond RLHF” 部分强调，奖励不一定只能来自人类反馈。
在很多后训练任务中，尤其是代码、数学、工具调用和 Agent 任务中，reward 可以来自软件管线、测试用例、规则验证器、格式检查器或大模型评审。
</p>

<div class="box note">
<strong>一句话理解：</strong>
后训练真正的核心不是“用了 PPO 还是 GRPO”，而是你能不能设计一个可靠的 reward pipeline。
</div>

<h3>9.1 为什么 Reward Pipeline 比算法还重要？</h3>

<p>
强化学习会最大化 reward。问题在于：模型并不知道你心里真正想要什么，它只知道你给它的 reward。
所以 reward pipeline 决定了模型最终会学成什么样。
</p>

<table>
<tr>
<th>如果 reward 关注</th>
<th>模型可能学到</th>
</tr>
<tr>
<td>只关注答案正确</td>
<td>模型可能推理过程胡编，但最终答案碰巧正确。</td>
</tr>
<tr>
<td>只关注测试通过</td>
<td>模型可能硬编码测试样例。</td>
</tr>
<tr>
<td>只关注回答长度</td>
<td>模型可能变得非常啰嗦。</td>
</tr>
<tr>
<td>只关注工具调用成功</td>
<td>模型可能频繁调用工具，忽视成本。</td>
</tr>
<tr>
<td>只关注最终任务完成</td>
<td>模型可能过程混乱，但最后碰巧成功。</td>
</tr>
</table>

<div class="box warn">
<strong>关键警告：</strong>
RL 算法只负责优化 reward。reward 设计得粗糙，模型就会学会粗糙甚至投机的行为。
</div>

<h3>9.2 原文中的 Coding Reward Pipeline</h3>

<p>
PyTorch 原文用代码任务举例，展示了一个比较完整的 reward pipeline。
这个图非常适合理解：真实后训练里，reward 不是一个简单分数，而是多个评估模块的组合。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/5-1.png" alt="Coding reward pipeline">
<div class="caption">
图 5：代码任务中的 Reward Pipeline 奖励管线。来源：PyTorch 官方博客。
如果图片不显示，可以打开原图：
<a href="https://pytorch.org/wp-content/uploads/2025/08/5-1.png" target="_blank">
https://pytorch.org/wp-content/uploads/2025/08/5-1.png
</a>
</div>
</div>

<h3>9.3 图片逐项解释</h3>

<table>
<tr>
<th>图中元素</th>
<th>中文解释</th>
<th>作用</th>
<th>对应 reward</th>
</tr>
<tr>
<td>Coding Problems</td>
<td>代码问题</td>
<td>训练任务输入，例如写函数、修 bug、补全算法。</td>
<td>任务来源。</td>
</tr>
<tr>
<td>Model Being Trained</td>
<td>正在训练的模型</td>
<td>模型根据代码问题生成 solution。</td>
<td>策略模型，也就是 policy。</td>
</tr>
<tr>
<td>Solutions</td>
<td>解决方案</td>
<td>模型生成的代码答案。</td>
<td>后续所有 reward 都围绕它计算。</td>
</tr>
<tr>
<td>Rules</td>
<td>规则</td>
<td>代码必须满足的一些硬条件。</td>
<td>违反规则就扣分或直接给负分。</td>
</tr>
<tr>
<td>Linter</td>
<td>静态检查器</td>
<td>检查代码风格、语法、格式、潜在错误。</td>
<td>格式 reward 或负 reward。</td>
</tr>
<tr>
<td>Test Harness</td>
<td>测试框架</td>
<td>运行单元测试、隐藏测试、集成测试。</td>
<td>最重要的可验证 reward。</td>
</tr>
<tr>
<td>Rules Broken?</td>
<td>是否违反规则</td>
<td>判断代码是否触犯硬规则。</td>
<td>违反则 negative reward。</td>
</tr>
<tr>
<td>Code Style Reward Model</td>
<td>代码风格奖励模型</td>
<td>评价代码是否可读、简洁、符合风格。</td>
<td>比例型 reward。</td>
</tr>
<tr>
<td>Rank</td>
<td>排序</td>
<td>对多个 solution 进行排序。</td>
<td>可转成 preference data。</td>
</tr>
</table>

<h3>9.4 这张图最重要的意思</h3>

<p>
这张图不是简单说“代码通过测试就行”。它强调的是：代码任务的 reward 可以由多个部分组成。
</p>

<pre>
最终 reward =
  测试通过奖励
+ 格式正确奖励
+ 代码风格奖励
- 违反规则惩罚
- 安全风险惩罚
- 过长 / 低效惩罚
</pre>

<p>
这比单一 reward 更稳，因为真实任务往往不是一个维度。
比如代码既要能运行，也要可读、安全、不过度硬编码。
</p>

<div class="box note">
<strong>一句话理解：</strong>
Reward Pipeline 是把“好答案”拆成多个可检查维度，然后把这些维度组合成训练信号。
</div>

<h3>9.5 常见 reward 类型</h3>

<table>
<tr>
<th>Reward 类型</th>
<th>中文</th>
<th>适合任务</th>
<th>优点</th>
<th>缺点</th>
</tr>
<tr>
<td>Human Preference Reward</td>
<td>人类偏好奖励</td>
<td>写作、对话、安全、风格。</td>
<td>能覆盖主观偏好。</td>
<td>成本高，标注不稳定。</td>
</tr>
<tr>
<td>Reward Model</td>
<td>奖励模型</td>
<td>RLHF、对话质量评价。</td>
<td>可以自动给分。</td>
<td>可能被模型钻漏洞。</td>
</tr>
<tr>
<td>Rule-based Reward</td>
<td>规则奖励</td>
<td>格式检查、JSON、答案匹配。</td>
<td>清晰、稳定、便宜。</td>
<td>规则太窄，容易漏掉语义质量。</td>
</tr>
<tr>
<td>Unit Test Reward</td>
<td>单元测试奖励</td>
<td>代码生成、代码修复。</td>
<td>客观、可自动验证。</td>
<td>测试覆盖不足时会被硬编码。</td>
</tr>
<tr>
<td>Math Verification Reward</td>
<td>数学验证奖励</td>
<td>数学题、符号计算。</td>
<td>最终答案可验证。</td>
<td>过程质量不一定能验证。</td>
</tr>
<tr>
<td>LLM-as-Judge</td>
<td>大模型评审奖励</td>
<td>摘要、问答、开放文本评价。</td>
<td>灵活、容易部署。</td>
<td>可能偏见、幻觉、专业性不足。</td>
</tr>
<tr>
<td>Environment Reward</td>
<td>环境奖励</td>
<td>Agent、网页操作、游戏、机器人。</td>
<td>直接反映任务完成。</td>
<td>环境搭建成本高。</td>
</tr>
</table>

<h3>9.6 Outcome Reward Model 和 Process Reward Model</h3>

<p>
后训练推理模型时，经常会遇到两个概念：ORM 和 PRM。
</p>

<table>
<tr>
<th>英文</th>
<th>中文</th>
<th>评价什么</th>
<th>例子</th>
</tr>
<tr>
<td>ORM, Outcome Reward Model</td>
<td>结果奖励模型</td>
<td>只评价最终答案。</td>
<td>数学题最终答案是否正确。</td>
</tr>
<tr>
<td>PRM, Process Reward Model</td>
<td>过程奖励模型</td>
<td>评价中间推理步骤。</td>
<td>每一步推导是否合理。</td>
</tr>
</table>

<h4>ORM 的特点</h4>

<table>
<tr>
<th>优点</th>
<th>缺点</th>
</tr>
<tr>
<td>简单，容易自动验证。</td>
<td>不知道中间过程哪里错。</td>
</tr>
<tr>
<td>适合答案明确的任务。</td>
<td>可能奖励错误推理 + 正确答案。</td>
</tr>
<tr>
<td>工程成本低。</td>
<td>credit assignment 信用分配困难。</td>
</tr>
</table>

<h4>PRM 的特点</h4>

<table>
<tr>
<th>优点</th>
<th>缺点</th>
</tr>
<tr>
<td>能给中间步骤反馈。</td>
<td>标注和训练成本更高。</td>
</tr>
<tr>
<td>有助于训练稳定推理。</td>
<td>步骤正确性有时也有争议。</td>
</tr>
<tr>
<td>适合复杂推理任务。</td>
<td>容易受到推理文本表面形式影响。</td>
</tr>
</table>

<div class="box note">
<strong>直观理解：</strong>
ORM 像只看考试最终答案；PRM 像批改解题步骤。
</div>

<h3>9.7 可验证奖励：RLVR 的核心</h3>

<p>
RLVR 全称是 <strong>Reinforcement Learning with Verifiable Rewards</strong>，中文可以翻译为“可验证奖励强化学习”。
它的核心思想是：如果一个任务的结果可以自动验证，就可以用这个验证结果作为 reward。
</p>

<table>
<tr>
<th>任务</th>
<th>可验证 reward</th>
</tr>
<tr>
<td>数学题</td>
<td>最终答案是否等于标准答案。</td>
</tr>
<tr>
<td>代码题</td>
<td>单元测试是否通过。</td>
</tr>
<tr>
<td>JSON 输出</td>
<td>是否能被解析，字段是否符合 schema。</td>
</tr>
<tr>
<td>SQL 查询</td>
<td>查询结果是否和标准结果一致。</td>
</tr>
<tr>
<td>工具调用</td>
<td>工具是否执行成功，返回是否满足任务。</td>
</tr>
<tr>
<td>网页任务</td>
<td>页面最终状态是否达到目标。</td>
</tr>
</table>

<p>
这就是为什么数学、代码、工具调用、网页 Agent 是后训练研究中非常重要的场景。
它们比普通开放问答更容易自动打分。
</p>

<div class="box train">
<strong>实践建议：</strong>
你如果要学 RLVR，不要一开始做开放问答。
先做这三类任务：
<ol>
<li><strong>数学题：</strong>最终答案可验证；</li>
<li><strong>代码题：</strong>测试是否通过可验证；</li>
<li><strong>工具调用：</strong>JSON 格式、工具执行、最终答案可验证。</li>
</ol>
</div>

<h3>9.8 Agent 的 Reward Pipeline 应该怎么设计？</h3>

<p>
Agent 的 reward 不能只看最终答案。因为 Agent 有中间动作和工具调用。
一个 Agent 最终答对了，但中间可能乱调用工具、浪费成本、使用危险操作。
</p>

<p>
所以 Agent reward 应该分层设计：
</p>

<table>
<tr>
<th>Reward 层级</th>
<th>评价对象</th>
<th>例子</th>
</tr>
<tr>
<td>格式层</td>
<td>输出是否可解析。</td>
<td>JSON 合法 +0.1，格式错误 -0.5。</td>
</tr>
<tr>
<td>工具层</td>
<td>工具选择是否正确。</td>
<td>正确工具 +0.2，错误工具 -0.2。</td>
</tr>
<tr>
<td>参数层</td>
<td>工具参数是否正确。</td>
<td>字段完整、类型正确、值合理。</td>
</tr>
<tr>
<td>执行层</td>
<td>工具是否执行成功。</td>
<td>API 成功返回 +0.2，报错 -0.2。</td>
</tr>
<td>反馈层</td>
<td>是否利用 Observation。</td>
<td>根据工具结果修正下一步 +0.2。</td>
</tr>
<tr>
<td>任务层</td>
<td>最终任务是否完成。</td>
<td>答案正确 / 测试通过 / 页面状态正确。</td>
</tr>
<tr>
<td>成本层</td>
<td>轨迹是否高效。</td>
<td>过多工具调用扣分。</td>
</tr>
<tr>
<td>安全层</td>
<td>是否触发危险行为。</td>
<td>调用危险工具或越权操作直接负分。</td>
</tr>
</table>

<h4>Agent reward 示例</h4>

<pre>
reward = 0.0

if valid_json:
    reward += 0.1

if correct_tool:
    reward += 0.2

if correct_args:
    reward += 0.2

if tool_execution_success:
    reward += 0.2

if final_answer_correct:
    reward += 1.0

if unnecessary_tool_calls:
    reward -= 0.1 * num_extra_calls

if unsafe_action:
    reward -= 2.0
</pre>

<div class="box warn">
<strong>注意：</strong>
reward 不一定越复杂越好。太复杂的 reward 可能引入互相冲突的信号。
实际训练中最好先从简单、可验证、稳定的 reward 开始。
</div>

<h3>9.9 Reward Pipeline 和 DPO / PPO / GRPO 的关系</h3>

<table>
<tr>
<th>方法</th>
<th>如何使用 reward</th>
</tr>
<tr>
<td>SFT</td>
<td>通常不直接使用 reward，只使用标准答案。</td>
</tr>
<tr>
<td>Rejection Sampling</td>
<td>用 reward 排序候选答案，只保留好样本。</td>
</tr>
<tr>
<td>DPO</td>
<td>用 reward 或评审结果构造 chosen / rejected。</td>
</tr>
<tr>
<td>PPO</td>
<td>直接用 reward 优化当前模型生成的 rollout。</td>
</tr>
<tr>
<td>GRPO</td>
<td>对同一 prompt 的多个候选，根据组内 reward 相对高低优化。</td>
</tr>
</table>

<div class="box note">
<strong>统一理解：</strong>
Reward Pipeline 不只是 RL 阶段才用。
它可以用于筛 SFT 数据，也可以用于构造 DPO 偏好对，还可以直接用于 PPO / GRPO。
</div>

<h3>9.10 本节总结</h3>

<div class="box train">
<strong>Reward Pipeline 阶段总结：</strong>
到这里，后训练路线应该进一步变成：
<pre>
SFT：学习标准答案
  ↓
Rejection Sampling：用 reward 筛好样本
  ↓
DPO：用 reward 构造 chosen / rejected
  ↓
Online RL：用 reward 直接优化模型
</pre>

真正决定训练效果的，不只是算法，而是 reward 的可靠性、覆盖范围和抗投机能力。
</div>

<hr>

<!-- ===================================================== -->
<!-- 第 10 部分：Test-time Reasoning 与 DeepSeek-R1 -->
<!-- ===================================================== -->

<h2 id="route10">10. Test-time Reasoning：测试时推理与 DeepSeek-R1</h2>

<p>
PyTorch 原文后半部分进入了一个非常重要的主题：<strong>Test-time Reasoning</strong>，测试时推理。
</p>

<p>
简单说，模型不一定要立刻给答案。它可以在回答前先生成一段 reasoning，也就是推理过程。
如果训练得好，模型会学会在推理阶段检查、回退、验证和修正。
</p>

<div class="box note">
<strong>一句话理解：</strong>
Test-time reasoning 是让模型在推理时多花计算，通过“想得更久”换取“答得更准”。
</div>

<h3>10.1 Test-time Compute 是什么？</h3>

<p>
Test-time compute，测试时计算，指的是模型在推理阶段额外花费的计算。
比如：
</p>

<ul>
<li>生成更长的思考过程；</li>
<li>尝试多个候选答案；</li>
<li>进行自我验证；</li>
<li>调用工具检查结果；</li>
<li>回退并重新推理。</li>
</ul>

<table>
<tr>
<th>方式</th>
<th>中文解释</th>
<th>例子</th>
</tr>
<tr>
<td>Long CoT</td>
<td>长思维链</td>
<td>模型写出更详细的解题过程。</td>
</tr>
<tr>
<td>Self-consistency</td>
<td>自洽采样</td>
<td>采样多个推理路径，投票选答案。</td>
</tr>
<tr>
<td>Verification</td>
<td>验证</td>
<td>模型检查答案是否满足条件。</td>
</tr>
<tr>
<td>Tool checking</td>
<td>工具检查</td>
<td>调用计算器、代码执行器验证答案。</td>
</tr>
<tr>
<td>Backtracking</td>
<td>回溯</td>
<td>发现前面推理错了，重新走一条路径。</td>
</tr>
</table>

<h3>10.2 DeepSeek-R1-Zero 的训练格式</h3>

<p>
原文引用了 DeepSeek-R1-Zero 的训练格式。它让模型把推理和最终答案分开放在两个标签里：
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/6-1.png" alt="DeepSeek-R1-Zero training prompt template">
<div class="caption">
图 6：DeepSeek-R1-Zero 的训练提示模板。来源：PyTorch 官方博客。
如果图片不显示，可以打开原图：
<a href="https://pytorch.org/wp-content/uploads/2025/08/6-1.png" target="_blank">
https://pytorch.org/wp-content/uploads/2025/08/6-1.png
</a>
</div>
</div>

<h3>10.3 图片逐项解释</h3>

<table>
<tr>
<th>模板元素</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td><code>&lt;think&gt;</code></td>
<td>思考开始标签</td>
<td>要求模型先生成推理过程。</td>
</tr>
<tr>
<td><code>&lt;/think&gt;</code></td>
<td>思考结束标签</td>
<td>明确推理过程结束。</td>
</tr>
<tr>
<td><code>&lt;answer&gt;</code></td>
<td>答案开始标签</td>
<td>明确最终答案开始。</td>
</tr>
<tr>
<td><code>&lt;/answer&gt;</code></td>
<td>答案结束标签</td>
<td>便于自动提取答案和计算 reward。</td>
</tr>
</table>

<p>
这套格式看起来简单，但对 RL 很重要。
因为 reward pipeline 可以自动检查：
</p>

<ul>
<li>有没有 <code>&lt;think&gt;</code> 标签；</li>
<li>有没有 <code>&lt;answer&gt;</code> 标签；</li>
<li>最终答案能不能被提取；</li>
<li>最终答案是否正确。</li>
</ul>

<div class="box note">
<strong>关键理解：</strong>
格式设计本身就是后训练的一部分。没有稳定格式，reward pipeline 就很难自动工作。
</div>

<h3>10.4 DeepSeek-R1-Zero 的两个主要 reward</h3>

<table>
<tr>
<th>Reward</th>
<th>中文</th>
<th>检查什么</th>
<th>例子</th>
</tr>
<tr>
<td>Accuracy Reward</td>
<td>准确性奖励</td>
<td>最终答案是否正确。</td>
<td>数学答案是否等于标准答案。</td>
</tr>
<tr>
<td>Format Reward</td>
<td>格式奖励</td>
<td>输出是否遵守指定格式。</td>
<td>是否包含 <code>&lt;think&gt;</code> 和 <code>&lt;answer&gt;</code>。</td>
</tr>
</table>

<p>
这说明推理后训练不一定一开始就需要复杂的人类偏好。
如果任务可验证，accuracy reward 就能提供非常强的训练信号。
</p>

<h3>10.5 为什么 RL 能激发推理？</h3>

<p>
直觉上，模型为了拿到更高 accuracy reward，会探索不同的推理方式。
如果更长、更仔细的推理更容易得到正确答案，那么 RL 就会逐渐提高这些行为的概率。
</p>

<pre>
模型尝试短推理 → 答错 → reward 低
模型尝试详细推理 → 答对 → reward 高
模型逐渐学会：复杂题需要更长推理
</pre>

<p>
这就是为什么 reasoning model 的后训练往往和 RLVR、GRPO 联系在一起。
</p>

<h3>10.6 Aha Moment：模型学会自我修正</h3>

<p>
原文展示了 DeepSeek-R1-Zero 训练过程中出现的 “aha moment”。
所谓 aha moment，就是模型在推理中突然意识到前面可能错了，然后主动回退、重新检查。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/7.png" alt="Aha moment in DeepSeek-R1-Zero">
<div class="caption">
图 7：DeepSeek-R1-Zero 训练中的 Aha Moment。来源：PyTorch 官方博客。
如果图片不显示，可以打开原图：
<a href="https://pytorch.org/wp-content/uploads/2025/08/7.png" target="_blank">
https://pytorch.org/wp-content/uploads/2025/08/7.png
</a>
</div>
</div>

<h3>10.7 图片逐项解释</h3>

<table>
<tr>
<th>图中现象</th>
<th>中文解释</th>
<th>意义</th>
</tr>
<tr>
<td>Wait, wait</td>
<td>模型停下来</td>
<td>说明模型没有一条路走到黑，而是开始检查当前推理。</td>
</tr>
<tr>
<td>That's an aha moment</td>
<td>顿悟时刻</td>
<td>模型意识到前面需要重新评估。</td>
</tr>
<tr>
<td>re-evaluate</td>
<td>重新评估</td>
<td>模型回到前面步骤检查错误。</td>
</tr>
<tr>
<td>step-by-step</td>
<td>逐步推理</td>
<td>模型把问题拆成更细步骤重新处理。</td>
</tr>
</table>

<p>
这张图的重点不是某一句英文，而是模型行为发生了变化：
它不只是生成答案，而是在推理过程中学会了自我检查、自我怀疑和自我修正。
</p>

<div class="box train">
<strong>对 Agent 后训练的启发：</strong>
Agent 也需要类似 aha moment：
<ul>
<li>工具调用失败后，不应重复同样参数；</li>
<li>搜索不到结果后，应改写 query；</li>
<li>代码测试失败后，应读取报错并定位原因；</li>
<li>网页任务卡住后，应回退并尝试其他路径。</li>
</ul>
这可以训练成：
<pre>
失败 Observation
  ↓
Reflection 反思
  ↓
New Action 新动作
</pre>
</div>

<h3>10.8 推理长度为什么会变长？</h3>

<p>
原文还展示了 DeepSeek-R1-Zero 在训练过程中，平均回答长度逐渐上升。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/8.png" alt="DeepSeek-R1-Zero average response length during training">
<div class="caption">
图 8：DeepSeek-R1-Zero 训练中平均回答长度变化。来源：PyTorch 官方博客。
如果图片不显示，可以打开原图：
<a href="https://pytorch.org/wp-content/uploads/2025/08/8.png" target="_blank">
https://pytorch.org/wp-content/uploads/2025/08/8.png
</a>
</div>
</div>

<h3>10.9 图片逐项解释</h3>

<table>
<tr>
<th>图中元素</th>
<th>中文解释</th>
<th>含义</th>
</tr>
<tr>
<td>Training Steps</td>
<td>训练步数</td>
<td>RL 训练推进过程。</td>
</tr>
<tr>
<td>Average Response Length</td>
<td>平均回答长度</td>
<td>模型每次回答平均生成多少 token。</td>
</tr>
<tr>
<td>曲线上升</td>
<td>回答变长</td>
<td>模型学会用更多推理 token 来提高正确率。</td>
</tr>
</table>

<p>
这个现象说明：如果复杂题需要更长推理才能答对，而 reward 只奖励答案正确，那么模型就会倾向于生成更长 reasoning。
</p>

<div class="box warn">
<strong>风险：</strong>
如果 reward 不惩罚长度，模型可能过度延长推理，造成 token 浪费。
所以 reasoning 后训练需要平衡：
<ul>
<li>答案正确性；</li>
<li>格式正确性；</li>
<li>推理长度成本；</li>
<li>推理是否真的有用。</li>
</ul>
</div>

<h3>10.10 Reasoning 后训练的核心逻辑</h3>

<table>
<tr>
<th>阶段</th>
<th>模型学到什么</th>
</tr>
<tr>
<td>格式约束</td>
<td>学会把推理放进 <code>&lt;think&gt;</code>，把答案放进 <code>&lt;answer&gt;</code>。</td>
</tr>
<tr>
<td>准确性奖励</td>
<td>学会最终答案必须正确。</td>
</tr>
<tr>
<td>探索推理路径</td>
<td>尝试不同长度和结构的 reasoning。</td>
</tr>
<tr>
<td>自我修正</td>
<td>发现前面可能错了，会重新评估。</td>
</tr>
<tr>
<td>测试时计算扩展</td>
<td>复杂问题上愿意花更多 token 推理。</td>
</tr>
</table>

<h3>10.11 Reasoning 和 Agent 的关系</h3>

<p>
Reasoning model 学到的是“在回答前思考和检查”。
Agent model 需要的是“在行动前规划，在失败后修正”。
两者本质上是相通的。
</p>

<table>
<tr>
<th>Reasoning 后训练</th>
<th>Agent 后训练</th>
</tr>
<tr>
<td>模型生成推理步骤。</td>
<td>Agent 生成任务计划。</td>
</tr>
<tr>
<td>模型发现推理错误。</td>
<td>Agent 发现工具调用失败。</td>
</tr>
<tr>
<td>模型重新计算答案。</td>
<td>Agent 改写 query、换工具、改代码。</td>
</tr>
<tr>
<td>reward 来自答案正确。</td>
<td>reward 来自任务完成、测试通过、环境状态正确。</td>
</tr>
</table>

<div class="box note">
<strong>统一理解：</strong>
Reasoning 后训练和 Agent 后训练都在训练一种能力：
模型不再一次性输出，而是在过程中检查、修正、继续尝试。
</div>

<h3>10.12 本节总结</h3>

<div class="box train">
<strong>Test-time Reasoning 阶段总结：</strong>
这一节说明，RL 不只是让模型回答更符合偏好，还能激发新的推理行为。
特别是在答案可验证的任务中，模型可以通过 RL 学会：
<pre>
多想一步
  ↓
检查错误
  ↓
回退重算
  ↓
生成更长推理
  ↓
提高最终正确率
</pre>

这就是 DeepSeek-R1、RLVR、GRPO 这些方向的重要背景。
</div>
```

---

# you asked

message time: 2026-06-07 16:48:13

接着来

---

# chatgpt response

下面继续接 **PPO 深入理解** 和 **GRPO**。PyTorch 原文附录 A 解释了 PPO 为什么要用 advantage 标准化、importance sampling、clipping 和 `min()` 来限制更新幅度；后面又用 DeepSeek 的 GRPO 说明：GRPO 通过组内 reward 的 Monte Carlo 估计来减少 critic / value network 的成本。([PyTorch](https://pytorch.org/blog/a-primer-on-llm-post-training/))

直接复制到你原来的 HTML 里，放在 `</body>` 前面。

```html
<!-- ===================================================== -->
<!-- 第 11 部分：PPO 深入理解 -->
<!-- 插入位置：接在第 10 部分 Test-time Reasoning 后面，放在 </body> 前 -->
<!-- ===================================================== -->

<h2 id="route11">11. PPO 深入理解：为什么 PPO 稳定但复杂？</h2>

<p>
前面已经讲过 Online RL 和 PPO 的基本直觉：
模型生成回答或动作，reward pipeline 给分，然后模型根据 reward 调整自己。
</p>

<p>
但是，如果只是简单地“reward 高就提高概率，reward 低就降低概率”，训练会非常不稳定。
PyTorch 原文在 Appendix A 里专门解释了 PPO 为什么要加一堆约束。
</p>

<div class="box note">
<strong>一句话理解：</strong>
PPO 的目的不是让模型更新得更猛，而是让模型在提高 reward 的同时不要跑偏、不要崩、不要一步更新太大。
</div>

<h3>11.1 从最朴素的 Policy Gradient 开始</h3>

<p>
在 LLM 中，模型输出每个 token 的概率。
如果某个输出带来了高 reward，我们希望模型以后更容易生成它；
如果某个输出带来了低 reward，我们希望模型以后少生成它。
</p>

<pre>
如果 reward 高：
    增大对应 response 的 log probability

如果 reward 低：
    降低对应 response 的 log probability
</pre>

<p>
所以最简单的 policy gradient loss 可以写成：
</p>

<pre>
policy_gradient_loss = - (rewards * log_probs).sum(dim=-1).mean()
</pre>

<h4>这个公式怎么理解？</h4>

<table>
<tr>
<th>元素</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td><code>log_probs</code></td>
<td>模型生成当前输出的对数概率</td>
<td>决定模型以后是否更倾向生成这个输出。</td>
</tr>
<tr>
<td><code>rewards</code></td>
<td>奖励</td>
<td>告诉模型这个输出好不好。</td>
</tr>
<tr>
<td><code>-</code></td>
<td>负号</td>
<td>因为优化器默认最小化 loss，所以加负号等价于最大化高 reward 输出概率。</td>
</tr>
</table>

<div class="box note">
<strong>直观理解：</strong>
reward 像方向盘，log_prob 像油门。reward 高，就让模型更用力往这个输出方向走。
</div>

<h3>11.2 为什么朴素 Policy Gradient 不够？</h3>

<p>
因为 reward 往往非常不稳定。
有些 prompt 很简单，模型随便答就能高分；有些 prompt 很难，模型努力了也只能低分。
如果直接用原始 reward 训练，梯度会非常抖。
</p>

<table>
<tr>
<th>问题</th>
<th>表现</th>
<th>后果</th>
</tr>
<tr>
<td>Reward 方差大</td>
<td>有些样本 reward 特别高，有些特别低。</td>
<td>训练震荡。</td>
</tr>
<tr>
<td>不同 prompt 难度不同</td>
<td>同样 0.6 分，在难题里可能不错，在简单题里很差。</td>
<td>模型无法公平比较动作好坏。</td>
</tr>
<tr>
<td>长尾 reward</td>
<td>极端样本带来巨大梯度。</td>
<td>模型突然跑偏。</td>
</tr>
<tr>
<td>更新过猛</td>
<td>模型一次更新后输出分布大变。</td>
<td>语言质量、格式、安全性退化。</td>
</tr>
</table>

<h3>11.3 Advantage：优势函数</h3>

<p>
为了解决 reward 原始分数不好比较的问题，PPO 引入了 advantage，优势函数。
</p>

<pre>
advantage = reward - baseline
</pre>

<p>
baseline 也叫 value，它表示在当前状态下平均能拿多少分。
advantage 则表示当前输出比平均水平好多少。
</p>

<table>
<tr>
<th>概念</th>
<th>中文</th>
<th>解释</th>
</tr>
<tr>
<td>Reward</td>
<td>奖励</td>
<td>当前输出得了多少分。</td>
</tr>
<tr>
<td>Baseline / Value</td>
<td>基线 / 价值估计</td>
<td>当前 prompt 平均能拿多少分。</td>
</tr>
<tr>
<td>Advantage</td>
<td>优势</td>
<td>当前输出比平均水平高多少。</td>
</tr>
</table>

<h4>例子</h4>

<table>
<tr>
<th>Prompt 类型</th>
<th>Reward</th>
<th>Baseline</th>
<th>Advantage</th>
<th>解释</th>
</tr>
<tr>
<td>简单数学题</td>
<td>0.8</td>
<td>0.9</td>
<td>-0.1</td>
<td>虽然分数不低，但比平均水平差。</td>
</tr>
<tr>
<td>复杂证明题</td>
<td>0.6</td>
<td>0.3</td>
<td>+0.3</td>
<td>虽然绝对分不高，但相对这个难题已经很好。</td>
</tr>
</table>

<div class="box note">
<strong>一句话理解：</strong>
Reward 看“绝对分数”，Advantage 看“相对表现”。
</div>

<h3>11.4 PPO 的第一个约束：Standardize Advantages 标准化优势</h3>

<p>
PyTorch 原文说，原始 advantage 仍然可能导致巨大更新。
所以第一步是把 advantage 标准化，让它均值为 0、方差为 1。
</p>

<pre>
advantages = (advantages - advantages.mean()) / (advantages.std() + 1e-8)
</pre>

<table>
<tr>
<th>操作</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td>减去均值</td>
<td>把 advantage 中心移到 0</td>
<td>避免整体偏高或偏低。</td>
</tr>
<tr>
<td>除以标准差</td>
<td>缩放到稳定范围</td>
<td>避免极端样本导致巨大梯度。</td>
</tr>
<tr>
<td>加 <code>1e-8</code></td>
<td>防止除零</td>
<td>数值稳定。</td>
</tr>
</table>

<div class="box train">
<strong>实践理解：</strong>
标准化 advantage 是训练稳定性的基础步骤。
如果 reward 分布非常不稳，标准化能避免某些 batch 让模型突然大幅更新。
</div>

<h3>11.5 PPO 的第二个约束：Importance Sampling 重要性采样</h3>

<p>
PPO 需要比较新策略和旧策略。
因为 rollout 是旧模型生成的，但训练时模型参数已经在变。
如果新模型和旧模型差太远，这批数据就不可靠。
</p>

<p>
所以 PPO 计算一个 ratio：
</p>

<pre>
ratio = exp(new_log_probs - old_log_probs)
</pre>

<p>
这个 ratio 表示：新模型相对于旧模型，生成同一个动作的概率变了多少。
</p>

<table>
<tr>
<th>ratio 值</th>
<th>含义</th>
</tr>
<tr>
<td><code>ratio = 1</code></td>
<td>新旧模型对这个动作的概率一样。</td>
</tr>
<tr>
<td><code>ratio > 1</code></td>
<td>新模型更喜欢这个动作。</td>
</tr>
<tr>
<td><code>ratio < 1</code></td>
<td>新模型更不喜欢这个动作。</td>
</tr>
<tr>
<td><code>ratio 很大</code></td>
<td>新模型相对旧模型变化太大，可能危险。</td>
</tr>
<tr>
<td><code>ratio 很小</code></td>
<td>新模型几乎放弃旧动作，也可能不稳定。</td>
</tr>
</table>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/9.png" alt="PPO trust region">
<div class="caption">
图 9：PPO 的 trust region 直观示意。来源：PyTorch 官方博客。
如果图片不显示，可以打开原图：
<a href="https://pytorch.org/wp-content/uploads/2025/08/9.png" target="_blank">
https://pytorch.org/wp-content/uploads/2025/08/9.png
</a>
</div>
</div>

<h4>图片解释</h4>

<p>
这张图表达的是 trust region，信任区域。
PPO 不希望新策略离旧策略太远。
如果新策略变化太大，模型可能突然从一个相对稳定的语言模型，变成一个疯狂追 reward 的模型。
</p>

<table>
<tr>
<th>图中概念</th>
<th>中文解释</th>
<th>训练含义</th>
</tr>
<tr>
<td>Old policy</td>
<td>旧策略</td>
<td>生成 rollout 的模型。</td>
</tr>
<tr>
<td>New policy</td>
<td>新策略</td>
<td>正在训练更新的模型。</td>
</tr>
<tr>
<td>Trust region</td>
<td>信任区域</td>
<td>允许策略变化的安全范围。</td>
</tr>
<tr>
<td>Too far</td>
<td>偏离太远</td>
<td>更新幅度过大，训练可能崩。</td>
</tr>
</table>

<h3>11.6 PPO 的第三个约束：Clipping 裁剪</h3>

<p>
有了 ratio 以后，PPO 还会进一步裁剪 ratio，限制它不要离 1 太远。
</p>

<pre>
clipped_ratio = clamp(ratio, 1 - epsilon, 1 + epsilon)
</pre>

<p>
如果 <code>epsilon = 0.2</code>，那 ratio 大致会被限制在：
</p>

<pre>
0.8 到 1.2
</pre>

<table>
<tr>
<th>情况</th>
<th>没有 clipping</th>
<th>有 clipping</th>
</tr>
<tr>
<td>高 reward 输出</td>
<td>概率可能被无限推高。</td>
<td>只能在安全范围内提高。</td>
</tr>
<tr>
<td>低 reward 输出</td>
<td>概率可能被过度压低。</td>
<td>只能在安全范围内降低。</td>
</tr>
<tr>
<td>训练稳定性</td>
<td>容易震荡。</td>
<td>更稳定。</td>
</tr>
</table>

<div class="box note">
<strong>一句话理解 clipping：</strong>
好答案可以奖励，但不能奖励到模型一下子变形；坏答案可以惩罚，但不能惩罚到模型突然失控。
</div>

<h3>11.7 PPO 的第四个约束：Taking a min() 取最小值</h3>

<p>
PyTorch 原文说，PPO 不只是使用 clipped ratio，还要在 unclipped 和 clipped 之间取最小。
</p>

<pre>
loss = - min(
    ratio * advantage,
    clipped_ratio * advantage
)
</pre>

<p>
这个设计是为了防止模型“钻 clipping 的空子”。
如果只用 clipped 版本，模型可能会把概率推到裁剪边界附近，仍然导致不稳定。
取 min 会让优化更保守。
</p>

<table>
<tr>
<th>机制</th>
<th>中文解释</th>
<th>作用</th>
</tr>
<tr>
<td>unclipped objective</td>
<td>未裁剪目标</td>
<td>真实策略更新方向。</td>
</tr>
<tr>
<td>clipped objective</td>
<td>裁剪后目标</td>
<td>受限制的更新方向。</td>
</tr>
<tr>
<td>min()</td>
<td>取较保守的那个</td>
<td>防止模型利用裁剪边界投机。</td>
</tr>
</table>

<h3>11.8 PPO 还需要 Value Loss 和 KL Penalty</h3>

<p>
PPO 不只有 policy loss。PyTorch 原文指出，PPO 还通常包含 value loss 和 KL divergence loss。
</p>

<table>
<tr>
<th>Loss</th>
<th>中文</th>
<th>作用</th>
</tr>
<tr>
<td>Policy loss</td>
<td>策略损失</td>
<td>让模型提高高 advantage 输出的概率。</td>
</tr>
<tr>
<td>Value loss</td>
<td>价值损失</td>
<td>训练 value network，让它更好预测 baseline。</td>
</tr>
<tr>
<td>KL loss</td>
<td>KL 散度损失</td>
<td>防止模型偏离 reference model 太远。</td>
</tr>
<tr>
<td>Entropy bonus</td>
<td>熵奖励</td>
<td>鼓励适度探索，防止模型太快变得确定。</td>
</tr>
</table>

<h4>为什么需要 KL？</h4>

<p>
预训练花了巨大成本让模型学会语言、知识和基本能力。
如果 RL 更新太猛，模型可能为了 reward 丢掉这些能力。
KL penalty 的作用就是：不要让新模型偏离原来的 reference model 太远。
</p>

<pre>
最终 PPO loss 通常包含：
policy loss
+ value loss
+ KL penalty
+ entropy bonus
</pre>

<div class="box warn">
<strong>PPO 的复杂性：</strong>
PPO 不是一个单纯的 loss，而是一整套稳定训练机制：
advantage、value network、old policy、reference model、KL、clipping、rollout。
这也是为什么 PPO 工程成本明显高于 SFT 和 DPO。
</div>

<h3>11.9 PPO 的完整训练组件</h3>

<table>
<tr>
<th>组件</th>
<th>中文</th>
<th>作用</th>
<th>是否昂贵</th>
</tr>
<tr>
<td>Policy model</td>
<td>策略模型</td>
<td>正在训练的 LLM。</td>
<td>昂贵。</td>
</tr>
<tr>
<td>Old policy</td>
<td>旧策略</td>
<td>生成 rollout 时的模型，用于计算 ratio。</td>
<td>需要保存 log_probs。</td>
</tr>
<tr>
<td>Reference model</td>
<td>参考模型</td>
<td>用于 KL 约束，防止模型偏离太远。</td>
<td>昂贵。</td>
</tr>
<tr>
<td>Reward model / pipeline</td>
<td>奖励模型 / 奖励管线</td>
<td>给输出打分。</td>
<td>可能昂贵。</td>
</tr>
<tr>
<td>Value network / Critic</td>
<td>价值网络 / 评论家模型</td>
<td>估计 baseline，计算 advantage。</td>
<td>昂贵。</td>
</tr>
<tr>
<td>Rollout workers</td>
<td>采样 worker</td>
<td>生成新回答或轨迹。</td>
<td>非常昂贵。</td>
</tr>
</table>

<h3>11.10 PPO 对后训练学习的意义</h3>

<p>
你现在学 PPO，不需要一开始就死磕公式。
更重要的是理解它在后训练路线中的位置：
</p>

<table>
<tr>
<th>问题</th>
<th>PPO 的作用</th>
</tr>
<tr>
<td>SFT 只能模仿</td>
<td>PPO 可以让模型通过 reward 探索。</td>
</tr>
<td>DPO 不在线探索</td>
<td>PPO 使用当前模型生成新 rollout。</td>
</tr>
<td>RL 容易发散</td>
<td>PPO 用 clipping 和 KL 限制更新幅度。</td>
</tr>
<tr>
<td>Reward 可能稀疏</td>
<td>PPO 可以用 advantage 处理长程奖励。</td>
</tr>
<tr>
<td>Agent 轨迹很长</td>
<td>PPO 可以把整条轨迹 reward 转为策略更新。</td>
</tr>
</table>

<div class="box train">
<strong>学习建议：</strong>
PPO 这一节你应该掌握 5 个词：
<ol>
<li><strong>log_probs：</strong>模型生成动作的概率；</li>
<li><strong>reward：</strong>动作或轨迹的得分；</li>
<li><strong>advantage：</strong>相对平均水平好多少；</li>
<li><strong>ratio：</strong>新旧策略概率比；</li>
<li><strong>clip：</strong>限制更新幅度。</li>
</ol>
先抓住这 5 个，再看公式就不会乱。
</div>

<hr>

<!-- ===================================================== -->
<!-- 第 12 部分：GRPO -->
<!-- ===================================================== -->

<h2 id="route12">12. GRPO：Group Relative Policy Optimization，组相对策略优化</h2>

<p>
理解 PPO 后，再看 GRPO 就容易很多。
GRPO 的全称是 <strong>Group Relative Policy Optimization</strong>，中文可以译为“组相对策略优化”。
</p>

<p>
PyTorch 原文把 GRPO 放在 DeepSeek 部分后面讲，因为它和 DeepSeek-R1 的 reasoning 后训练关系很紧。
它的核心动机是：PPO 需要 value network / critic 来估计 baseline，但这很贵。
GRPO 试图用一组候选答案的相对 reward 来替代 critic。
</p>

<div class="figure">
<img src="https://pytorch.org/wp-content/uploads/2025/08/14.png" alt="GRPO formula from DeepSeek paper">
<div class="caption">
图 10：DeepSeek 论文中的 GRPO 目标函数。来源：PyTorch 官方博客。
如果图片不显示，可以打开原图：
<a href="https://pytorch.org/wp-content/uploads/2025/08/14.png" target="_blank">
https://pytorch.org/wp-content/uploads/2025/08/14.png
</a>
</div>
</div>

<h3>12.1 GRPO 的核心直觉</h3>

<p>
GRPO 的直觉非常简单：
</p>

<pre>
同一个 prompt
  ↓
模型生成一组回答，比如 4 个或 8 个
  ↓
reward pipeline 给每个回答打分
  ↓
计算每个回答相对于组内平均水平好多少
  ↓
提高组内高分回答概率
  ↓
降低组内低分回答概率
</pre>

<p>
也就是说，GRPO 不需要单独训练一个 critic 来估计 baseline。
它直接用同组多个样本的平均 reward 当作比较基准。
</p>

<h3>12.2 用例子理解 GRPO</h3>

<p>
假设同一个数学题，模型生成 4 个答案：
</p>

<table>
<tr>
<th>候选</th>
<th>答案</th>
<th>Reward</th>
<th>组内评价</th>
</tr>
<tr>
<td>Output 1</td>
<td>正确答案，格式正确</td>
<td>1.0</td>
<td>明显高于平均，应该提高概率。</td>
</tr>
<tr>
<td>Output 2</td>
<td>答案错，格式正确</td>
<td>0.2</td>
<td>低于平均，应该降低概率。</td>
</tr>
<tr>
<td>Output 3</td>
<td>答案错，格式也错</td>
<td>0.0</td>
<td>最低，应该明显降低概率。</td>
</tr>
<tr>
<td>Output 4</td>
<td>答案正确，但格式有小问题</td>
<td>0.8</td>
<td>高于平均，也应该提高概率。</td>
</tr>
</table>

<p>
组内平均 reward 是：
</p>

<pre>
mean_reward = (1.0 + 0.2 + 0.0 + 0.8) / 4 = 0.5
</pre>

<p>
那么：
</p>

<table>
<tr>
<th>候选</th>
<th>Reward</th>
<th>相对平均</th>
<th>训练方向</th>
</tr>
<tr>
<td>Output 1</td>
<td>1.0</td>
<td>+0.5</td>
<td>提高概率。</td>
</tr>
<tr>
<td>Output 2</td>
<td>0.2</td>
<td>-0.3</td>
<td>降低概率。</td>
</tr>
<tr>
<td>Output 3</td>
<td>0.0</td>
<td>-0.5</td>
<td>降低概率。</td>
</tr>
<tr>
<td>Output 4</td>
<td>0.8</td>
<td>+0.3</td>
<td>提高概率。</td>
</tr>
</table>

<div class="box note">
<strong>一句话理解：</strong>
PPO 问 critic：“这个答案比平均水平好吗？”
GRPO 直接看同一题的一组答案：“这几个里面谁更好？”
</div>

<h3>12.3 GRPO 和 PPO 的关键区别</h3>

<table>
<tr>
<th>比较项</th>
<th>PPO</th>
<th>GRPO</th>
</tr>
<tr>
<td>Baseline 来源</td>
<td>Value network / critic 预测。</td>
<td>同组样本 reward 的平均和标准差。</td>
</tr>
<tr>
<td>是否需要 critic</td>
<td>通常需要。</td>
<td>通常不需要。</td>
</tr>
<tr>
<td>优势估计</td>
<td>reward - value。</td>
<td>reward 相对同组其他样本。</td>
</tr>
<tr>
<td>计算成本</td>
<td>高。</td>
<td>相对更低。</td>
</tr>
<tr>
<td>适合任务</td>
<td>通用 RLHF、复杂策略优化。</td>
<td>数学、代码、推理等可验证 reward 场景。</td>
</tr>
<tr>
<td>风险</td>
<td>critic 训练成本高、系统复杂。</td>
<td>组内样本质量和数量影响 advantage 稳定性。</td>
</tr>
</table>

<h3>12.4 为什么 GRPO 适合 Reasoning 后训练？</h3>

<p>
Reasoning 任务通常有两个特点：
</p>

<ol>
<li>同一个问题可以采样多个推理路径；</li>
<li>最终答案常常可以自动验证。</li>
</ol>

<p>
这正好适合 GRPO。
比如数学题，一个 prompt 可以生成多个解法，然后用标准答案验证 reward。
不需要复杂人类偏好，也不一定需要 critic。
</p>

<table>
<tr>
<th>Reasoning 任务特点</th>
<th>GRPO 为什么合适</th>
</tr>
<tr>
<td>同一题可采样多个答案</td>
<td>天然形成 group。</td>
</tr>
<tr>
<td>答案可验证</td>
<td>reward 容易自动计算。</td>
</tr>
<tr>
<td>推理路径多样</td>
<td>组内比较能筛出更好路径。</td>
</tr>
<tr>
<td>训练成本需要控制</td>
<td>去掉 critic 可以省内存和计算。</td>
</tr>
</table>

<div class="box train">
<strong>实践理解：</strong>
如果你训练数学或代码 reasoning，小规模实验可以这样想：
<pre>
每个 prompt 采样 4 个答案
  ↓
用规则或测试给每个答案打分
  ↓
组内标准化 reward
  ↓
优化高分答案，压低低分答案
</pre>
这就是 GRPO 的基本学习直觉。
</div>

<h3>12.5 GRPO 对 Agent 后训练的启发</h3>

<p>
GRPO 不只适合数学题，也可以迁移到 Agent。
同一个任务可以让 Agent 采样多条轨迹，然后根据任务完成率、工具成本、测试结果打分。
</p>

<h4>Agent GRPO 示例</h4>

<pre>
同一个任务：
“修复这个 Python 项目的测试错误。”

Trajectory 1:
读文件 → 修改 → 测试通过
Reward = 1.0

Trajectory 2:
读文件 → 修改错误位置 → 测试失败
Reward = 0.0

Trajectory 3:
读文件 → 搜索无关文件 → 修改 → 测试通过，但用了很多步骤
Reward = 0.7

Trajectory 4:
直接回答，不运行测试
Reward = 0.2
</pre>

<table>
<tr>
<th>轨迹</th>
<th>表现</th>
<th>Reward</th>
<th>训练方向</th>
</tr>
<tr>
<td>Trajectory 1</td>
<td>短路径、任务完成</td>
<td>1.0</td>
<td>提高概率。</td>
</tr>
<tr>
<td>Trajectory 2</td>
<td>任务失败</td>
<td>0.0</td>
<td>降低概率。</td>
</tr>
<tr>
<td>Trajectory 3</td>
<td>任务完成但低效</td>
<td>0.7</td>
<td>略提高，但不如轨迹 1。</td>
</tr>
<tr>
<td>Trajectory 4</td>
<td>没有真实验证</td>
<td>0.2</td>
<td>降低概率。</td>
</tr>
</table>

<p>
这说明 Agent 后训练可以用 group 方式比较轨迹。
不是只问“成功或失败”，还可以比较“哪个成功轨迹更高效、更安全、更稳”。
</p>

<h3>12.6 GRPO 省掉了什么成本？</h3>

<p>
PyTorch 原文指出，最坏情况下 PPO / RLHF 训练需要顺序运行多个模型：
</p>

<ol>
<li>inference model：生成 tokens 和 log-probs；</li>
<li>reference model：计算 reference log-probs；</li>
<li>reward model：计算 reward；</li>
<li>critic / value model：估计 value 和 advantage；</li>
<li>train model：重新 forward，计算训练 loss；</li>
<li>backward + optimizer step。</li>
</ol>

<p>
GRPO 移除 critic 后，可以省掉：
</p>

<ul>
<li>critic 的一次 forward；</li>
<li>critic 的 backward；</li>
<li>critic 的 optimizer step；</li>
<li>critic 占用的显存和工程维护成本。</li>
</ul>

<table>
<tr>
<th>组件</th>
<th>PPO</th>
<th>GRPO</th>
</tr>
<tr>
<td>Policy model</td>
<td>需要</td>
<td>需要</td>
</tr>
<tr>
<td>Reference model</td>
<td>需要</td>
<td>通常仍需要</td>
</tr>
<tr>
<td>Reward model / reward pipeline</td>
<td>需要</td>
<td>需要</td>
</tr>
<tr>
<td>Critic / value model</td>
<td>通常需要</td>
<td>通常不需要</td>
</tr>
<tr>
<td>Group sampling</td>
<td>不一定必须</td>
<td>核心机制</td>
</tr>
<tr>
<td>工程复杂度</td>
<td>更高</td>
<td>相对降低</td>
</tr>
</table>

<div class="box note">
<strong>关键理解：</strong>
GRPO 不是完全免费。它省掉 critic，但需要每个 prompt 采样多个输出。
所以它把成本从“训练 critic”转移到了“生成多个候选”。
</div>

<h3>12.7 GRPO 的局限</h3>

<table>
<tr>
<th>局限</th>
<th>解释</th>
</tr>
<tr>
<td>需要多个样本</td>
<td>每个 prompt 要生成一组回答，推理成本增加。</td>
</tr>
<tr>
<td>依赖 reward 可靠性</td>
<td>reward 错了，组内比较也会错。</td>
</tr>
<tr>
<td>组内方差问题</td>
<td>如果一组答案都很差，比较信号可能弱。</td>
</tr>
<tr>
<td>开放任务难打分</td>
<td>对开放写作、复杂研究任务，reward 很难可靠。</td>
</tr>
<td>轨迹任务更复杂</td>
<td>Agent 轨迹长，采样多个完整轨迹成本很高。</td>
</tr>
</table>

<h3>12.8 PPO、GRPO、DPO 怎么选择？</h3>

<table>
<tr>
<th>场景</th>
<th>优先方法</th>
<th>原因</th>
</tr>
<tr>
<td>你只有高质量标准答案</td>
<td>SFT</td>
<td>先让模型学会基本格式和能力。</td>
</tr>
<tr>
<td>你有 chosen / rejected 偏好对</td>
<td>DPO</td>
<td>便宜、稳定，适合偏好优化。</td>
</tr>
<tr>
<td>任务有可验证 reward，想让模型探索</td>
<td>GRPO</td>
<td>适合数学、代码、推理，去掉 critic 降低成本。</td>
</tr>
<tr>
<td>任务复杂，需要更通用 RL 控制</td>
<td>PPO</td>
<td>更通用，但工程成本高。</td>
</tr>
<tr>
<td>Agent 任务刚开始</td>
<td>SFT + DPO</td>
<td>先稳定格式和工具调用，不要一上来做 RL。</td>
</tr>
<tr>
<td>Agent 有可靠环境 reward</td>
<td>GRPO / PPO</td>
<td>可以开始训练多条轨迹的任务完成率。</td>
</tr>
</table>

<div class="box train">
<strong>学习路线建议：</strong>
你应该按这个顺序学：
<pre>
SFT：先跑通训练
  ↓
DPO：理解偏好优化
  ↓
Reward Pipeline：学会设计 reward
  ↓
GRPO：做可验证任务 RL
  ↓
PPO：理解更完整的在线 RL 系统
</pre>
不要一开始直接 PPO，否则很容易被工程细节劝退。
</div>

<h3>12.9 本节总结</h3>

<div class="box note">
<strong>GRPO 阶段总结：</strong>
GRPO 的核心不是一个神秘公式，而是一个简单思想：
<pre>
同一题，多生成几个答案；
用 reward 排序；
高于组内平均的提高概率；
低于组内平均的降低概率。
</pre>

它特别适合 reasoning 后训练，因为数学、代码、格式任务都可以自动验证。
对于 Agent 后训练，它也可以用来比较多条任务轨迹，但前提是你能设计可靠 reward。
</div>
```

---

# you asked

message time: 2026-06-07 16:50:46

接着来

---

# chatgpt response

我继续补最后几块：**实践复现路线、最小项目设计、常见坑、术语表、结尾总结**。这一段会把前面的 SFT、DPO、Reward Pipeline、GRPO 串成你真正能学习和动手的路线。

继续，这一段接在 **GRPO** 后面，主要写：**如何把这篇博客转成学习路线 / 复现实验路线 / 常见坑 / 术语表 / 总结**。这一部分是把 PyTorch 原文的后训练主线落到你自己的学习和实践上：原文强调 post-training 用来教模型对话、推理和按人类偏好回答；SFT、DPO、Online RL、Reward Pipeline、PPO、GRPO就是这条路线里的关键模块。([PyTorch](https://pytorch.org/blog/a-primer-on-llm-post-training/))

直接复制到 `</body>` 前面即可。

```html
<!-- ===================================================== -->
<!-- 第 13 部分：把博客内容转成学习路线 -->
<!-- 插入位置：接在第 12 部分 GRPO 后面，放在 </body> 前 -->
<!-- ===================================================== -->

<h2 id="route13">13. 把这篇博客转成你的后训练学习路线</h2>

<p>
到这里，PyTorch 这篇博客的主要内容已经讲完了。
现在要做的不是继续堆概念，而是把它转成一条真正能学习、能复现、能做项目的路线。
</p>

<p>
这篇博客的主线其实可以压缩成一句话：
</p>

<div class="box note">
<strong>后训练路线：</strong>
先用 SFT 让模型学会基本格式和行为，再用偏好优化让模型偏向更好的输出，最后用奖励管线和在线强化学习让模型通过试错继续提升。
</div>

<h3>13.1 后训练学习路线总览</h3>

<pre>
阶段 0：理解后训练数据格式
  ↓
阶段 1：SFT 监督微调
  ↓
阶段 2：Rejection Sampling 拒绝采样
  ↓
阶段 3：DPO 偏好优化
  ↓
阶段 4：Reward Pipeline 奖励管线
  ↓
阶段 5：GRPO / PPO 在线强化学习
  ↓
阶段 6：Reasoning / Agent 后训练
</pre>

<table>
<tr>
<th>阶段</th>
<th>你要学什么</th>
<th>核心问题</th>
<th>建议实践</th>
</tr>
<tr>
<td>阶段 0</td>
<td>后训练数据格式</td>
<td>模型到底看到了什么？system / user / assistant 怎么组织？</td>
<td>手写 20 条 chat template 数据，理解 loss mask。</td>
</tr>
<tr>
<td>阶段 1</td>
<td>SFT</td>
<td>如何让模型先学会基本回答格式？</td>
<td>用小模型跑一个指令微调任务。</td>
</tr>
<tr>
<td>阶段 2</td>
<td>Rejection Sampling</td>
<td>如何从多个候选中筛出更好的样本？</td>
<td>同一 prompt 生成多个回答，用规则或模型筛选。</td>
</tr>
<tr>
<td>阶段 3</td>
<td>DPO</td>
<td>如何用 chosen / rejected 数据优化偏好？</td>
<td>构造 200 条偏好对，训练一个 DPO 小模型。</td>
</tr>
<tr>
<td>阶段 4</td>
<td>Reward Pipeline</td>
<td>怎么设计可靠 reward？</td>
<td>做 JSON / 数学 / 代码测试的规则奖励。</td>
</tr>
<tr>
<td>阶段 5</td>
<td>GRPO / PPO</td>
<td>如何让模型在线生成、打分、更新？</td>
<td>先用 GRPO 跑可验证数学或格式任务。</td>
</tr>
<tr>
<td>阶段 6</td>
<td>Reasoning / Agent</td>
<td>如何训练推理、工具调用、多步轨迹？</td>
<td>做一个 mini tool-use agent 后训练实验。</td>
</tr>
</table>

<div class="box train">
<strong>学习顺序建议：</strong>
不要一开始就碰 PPO。更稳的顺序是：
<pre>
Chat Template
  ↓
SFT
  ↓
DPO
  ↓
Reward Function
  ↓
GRPO
  ↓
Agent Trajectory Training
</pre>
</div>

<hr>

<h2 id="route14">14. 第一轮实践：只做 SFT，先跑通后训练最小闭环</h2>

<p>
第一轮实践不要贪心。
目标不是训练出强模型，而是完整理解：数据怎么组织、loss 怎么 mask、模型怎么学会 assistant 格式。
</p>

<h3>14.1 任务目标</h3>

<table>
<tr>
<th>项目</th>
<th>建议</th>
</tr>
<tr>
<td>模型</td>
<td>Qwen2.5-0.5B / Qwen2.5-1.5B / Llama 小模型。</td>
</tr>
<tr>
<td>框架</td>
<td>Hugging Face Transformers + TRL SFTTrainer。</td>
</tr>
<tr>
<td>数据规模</td>
<td>先用 100 到 1000 条高质量样本。</td>
</tr>
<tr>
<td>任务类型</td>
<td>简单指令问答、格式转换、工具调用格式学习。</td>
</tr>
<tr>
<td>训练目标</td>
<td>让模型稳定输出 assistant response。</td>
</tr>
</table>

<h3>14.2 SFT 数据样例：普通问答</h3>

<pre>
{
  "messages": [
    {
      "role": "system",
      "content": "你是一个简洁、准确的中文助手。"
    },
    {
      "role": "user",
      "content": "解释什么是 SFT。"
    },
    {
      "role": "assistant",
      "content": "SFT 是监督微调，指用高质量输入输出样本训练模型，让模型学会按照指令生成目标回答。"
    }
  ]
}
</pre>

<h3>14.3 SFT 数据样例：工具调用格式</h3>

<pre>
{
  "messages": [
    {
      "role": "system",
      "content": "你是一个会调用工具的助手。可用工具：calculator(expression)。"
    },
    {
      "role": "user",
      "content": "计算 23 * 17。"
    },
    {
      "role": "assistant",
      "content": "Action: calculator({\"expression\": \"23 * 17\"})"
    }
  ]
}
</pre>

<h3>14.4 这一阶段不要做什么？</h3>

<table>
<tr>
<th>不要做</th>
<th>原因</th>
</tr>
<tr>
<td>不要一开始就训练复杂 Agent</td>
<td>格式还没稳定，复杂轨迹会放大错误。</td>
</tr>
<tr>
<td>不要混太多任务</td>
<td>初学阶段容易分不清模型到底学到了什么。</td>
</tr>
<tr>
<td>不要用低质量自动生成数据</td>
<td>SFT 会认真学习坏样本。</td>
</tr>
<tr>
<td>不要一上来做 PPO</td>
<td>PPO 工程复杂，reward 还没设计好时容易崩。</td>
</tr>
</table>

<div class="box note">
<strong>SFT 阶段判断标准：</strong>
模型能不能稳定理解 role？能不能按指定格式回答？能不能停止？能不能少胡乱发挥？
如果这些都不稳，不要急着进入 DPO 或 RL。
</div>

<hr>

<h2 id="route15">15. 第二轮实践：DPO，学会偏好优化</h2>

<p>
SFT 之后，模型已经能正常回答。
但它可能仍然有很多偏好问题：回答啰嗦、格式不稳定、工具选择错误、参数不合法、忽略用户约束。
这时可以进入 DPO。
</p>

<h3>15.1 DPO 的核心数据</h3>

<pre>
prompt + chosen + rejected
</pre>

<table>
<tr>
<th>字段</th>
<th>含义</th>
<th>重点</th>
</tr>
<tr>
<td>prompt</td>
<td>同一个输入任务。</td>
<td>必须保持一致。</td>
</tr>
<tr>
<td>chosen</td>
<td>更好的回答。</td>
<td>应该是你希望模型偏向的行为。</td>
</tr>
<tr>
<td>rejected</td>
<td>更差的回答。</td>
<td>应该是你希望模型减少的行为。</td>
</tr>
</table>

<h3>15.2 DPO 数据样例：普通回答偏好</h3>

<pre>
{
  "prompt": "请解释什么是 DPO。",
  "chosen": "DPO 是直接偏好优化，它使用 chosen / rejected 偏好对直接优化模型，使模型更倾向于生成被偏好的回答。",
  "rejected": "DPO 是一种训练方法，挺有用的。"
}
</pre>

<h3>15.3 DPO 数据样例：工具选择偏好</h3>

<pre>
{
  "prompt": "计算 128 * 64。",
  "chosen": "Action: calculator({\"expression\": \"128 * 64\"})",
  "rejected": "Action: search({\"query\": \"128 * 64\"})"
}
</pre>

<h3>15.4 DPO 数据样例：参数格式偏好</h3>

<pre>
{
  "prompt": "在文档中搜索 RLHF 的定义。",
  "chosen": "Action: search_doc({\"query\": \"RLHF definition\"})",
  "rejected": "Action: search_doc({\"keyword\": \"RLHF definition\"})"
}
</pre>

<p>
这里 rejected 的问题是参数字段不符合工具 schema。
如果工具要求字段名是 <code>query</code>，模型输出 <code>keyword</code> 就会导致工具调用失败。
</p>

<h3>15.5 DPO 阶段最适合优化什么？</h3>

<table>
<tr>
<th>优化对象</th>
<th>chosen</th>
<th>rejected</th>
</tr>
<tr>
<td>回答简洁性</td>
<td>直接回答用户问题。</td>
<td>绕很远、模板化废话。</td>
</tr>
<tr>
<td>格式遵循</td>
<td>严格输出 JSON。</td>
<td>JSON 外面夹杂解释文字。</td>
</tr>
<tr>
<td>工具选择</td>
<td>选择正确工具。</td>
<td>选择无关工具。</td>
</tr>
<tr>
<td>参数合法性</td>
<td>字段、类型和值都正确。</td>
<td>字段缺失、类型错误。</td>
</tr>
<tr>
<td>轨迹效率</td>
<td>少步骤完成任务。</td>
<td>多次无意义调用。</td>
</tr>
<tr>
<td>错误恢复</td>
<td>失败后换策略。</td>
<td>失败后重复同样动作。</td>
</tr>
</table>

<div class="box train">
<strong>DPO 阶段实践建议：</strong>
初学时先不要做很主观的“回答好坏”。
先做容易判断的偏好对：
<ol>
<li>正确工具 vs 错误工具；</li>
<li>合法 JSON vs 非法 JSON；</li>
<li>正确参数 vs 错误参数；</li>
<li>基于工具结果回答 vs 忽略工具结果胡编。</li>
</ol>
这些偏好更清楚，训练效果也更容易观察。
</div>

<hr>

<h2 id="route16">16. 第三轮实践：Reward Pipeline，先做可验证奖励</h2>

<p>
DPO 之后，你要开始学习 reward pipeline。
注意，这一步不一定马上训练 RL。
你可以先只写 reward function，用它来筛数据、评估模型、构造 DPO 数据。
</p>

<h3>16.1 最小 reward function 设计</h3>

<p>
以工具调用任务为例，最小 reward 可以拆成几个部分：
</p>

<pre>
reward = 0

格式正确：+0.1
工具正确：+0.2
参数正确：+0.2
工具执行成功：+0.2
最终答案正确：+1.0
无意义工具调用：-0.1 * 次数
危险操作：-2.0
</pre>

<h3>16.2 JSON 格式 reward</h3>

<pre>
def reward_json_format(output):
    try:
        obj = json.loads(output)
    except Exception:
        return -0.5

    if "tool" not in obj:
        return -0.2

    if "arguments" not in obj:
        return -0.2

    return 0.1
</pre>

<h3>16.3 工具选择 reward</h3>

<pre>
def reward_tool_choice(task, tool_name):
    if "计算" in task and tool_name == "calculator":
        return 0.2

    if "搜索文档" in task and tool_name == "search_doc":
        return 0.2

    if "运行代码" in task and tool_name == "run_python":
        return 0.2

    return -0.2
</pre>

<h3>16.4 最终答案 reward</h3>

<pre>
def reward_final_answer(pred, gold):
    if normalize(pred) == normalize(gold):
        return 1.0
    return 0.0
</pre>

<h3>16.5 Reward Pipeline 的三个用途</h3>

<table>
<tr>
<th>用途</th>
<th>怎么用</th>
<th>例子</th>
</tr>
<tr>
<td>筛 SFT 数据</td>
<td>多候选生成后，只保留高 reward 样本。</td>
<td>Rejection Sampling。</td>
</tr>
<tr>
<td>构造 DPO 数据</td>
<td>高 reward 作为 chosen，低 reward 作为 rejected。</td>
<td>工具选择偏好对。</td>
</tr>
<tr>
<td>做 RL 训练</td>
<td>模型在线生成，reward 直接参与 PPO / GRPO。</td>
<td>数学 RLVR、代码测试 reward。</td>
</tr>
</table>

<div class="box warn">
<strong>实践警告：</strong>
reward function 要从简单开始。
不要第一版就写十几个互相冲突的 reward 项。
最开始只保留：
<pre>
格式是否正确
工具是否正确
最终答案是否正确
</pre>
跑通以后再加成本、安全、风格等细项。
</div>

<hr>

<h2 id="route17">17. 第四轮实践：GRPO 小实验</h2>

<p>
当你已经有一个 SFT 模型、DPO 数据和 reward function 后，可以开始做最小 GRPO 实验。
</p>

<p>
GRPO 最适合用在可验证任务上，所以建议从数学、JSON、简单代码开始。
</p>

<h3>17.1 最小 GRPO 任务：数学计算</h3>

<table>
<tr>
<th>项目</th>
<th>设计</th>
</tr>
<tr>
<td>任务</td>
<td>给模型一个简单数学题。</td>
</tr>
<tr>
<td>模型输出</td>
<td>推理过程 + 最终答案。</td>
</tr>
<tr>
<td>采样数量</td>
<td>每个 prompt 采样 4 个或 8 个回答。</td>
</tr>
<tr>
<td>Reward</td>
<td>最终答案正确 +1，格式正确 +0.1。</td>
</tr>
<tr>
<td>优化</td>
<td>组内高分样本提高概率，低分样本降低概率。</td>
</tr>
</table>

<h3>17.2 样例任务</h3>

<pre>
Prompt:
计算 37 * 24，并给出最终答案。

Output 1:
&lt;think&gt;37 * 24 = 37 * 20 + 37 * 4 = 740 + 148 = 888&lt;/think&gt;
&lt;answer&gt;888&lt;/answer&gt;
Reward = 1.1

Output 2:
&lt;think&gt;37 * 24 = 37 * 20 + 37 * 2 = 740 + 74 = 814&lt;/think&gt;
&lt;answer&gt;814&lt;/answer&gt;
Reward = 0.1

Output 3:
答案是 888
Reward = 1.0 或 0.9，取决于是否要求格式

Output 4:
&lt;think&gt;我不知道&lt;/think&gt;
&lt;answer&gt;900&lt;/answer&gt;
Reward = 0.1
</pre>

<h3>17.3 GRPO 中 group 的作用</h3>

<pre>
同一个 prompt：
  output_1 reward = 1.1
  output_2 reward = 0.1
  output_3 reward = 0.9
  output_4 reward = 0.1

组内平均 reward = 0.55

高于平均：output_1, output_3
低于平均：output_2, output_4
</pre>

<p>
训练方向就是：
</p>

<ul>
<li>提高 output_1 和 output_3 的概率；</li>
<li>降低 output_2 和 output_4 的概率；</li>
<li>如果你重视格式，就让 output_1 比 output_3 得分更高。</li>
</ul>

<h3>17.4 GRPO 小实验不要做什么？</h3>

<table>
<tr>
<th>不要做</th>
<th>原因</th>
</tr>
<tr>
<td>不要一开始用开放问答</td>
<td>reward 难设计，训练信号不稳定。</td>
</tr>
<tr>
<td>不要一开始用长链 Agent</td>
<td>轨迹太长，reward 归因困难。</td>
</tr>
<tr>
<td>不要让 reward 太复杂</td>
<td>容易出现冲突，难以排查。</td>
</tr>
<tr>
<td>不要只看 loss</td>
<td>RL loss 不像 SFT loss 那样直观。</td>
</tr>
<tr>
<td>不要忽略采样质量</td>
<td>如果一组输出都很差，GRPO 学不到什么。</td>
</tr>
</table>

<div class="box train">
<strong>GRPO 初学建议：</strong>
先做“短 prompt、短输出、可验证答案”的任务。
数学题、JSON schema、简单代码测试，是比开放 Agent 更好的第一站。
</div>

<hr>

<h2 id="route18">18. 第五轮实践：Mini Tool-use Agent 后训练</h2>

<p>
当你理解 SFT、DPO、Reward Pipeline 和 GRPO 后，就可以把它们组合成一个最小工具调用 Agent。
</p>

<h3>18.1 Mini Agent 工具设计</h3>

<table>
<tr>
<th>工具</th>
<th>参数</th>
<th>用途</th>
</tr>
<tr>
<td><code>calculator</code></td>
<td><code>{"expression": "..."}</code></td>
<td>精确计算。</td>
</tr>
<tr>
<td><code>search_doc</code></td>
<td><code>{"query": "..."}</code></td>
<td>搜索本地文档。</td>
</tr>
<tr>
<td><code>run_python</code></td>
<td><code>{"code": "..."}</code></td>
<td>执行 Python 代码。</td>
</tr>
<tr>
<td><code>finish</code></td>
<td><code>{"answer": "..."}</code></td>
<td>输出最终答案。</td>
</tr>
</table>

<h3>18.2 Agent 轨迹格式</h3>

<pre>
User:
请计算 23 * 17，并只给出最终数字。

Assistant:
Thought: 这是一个精确计算问题，需要调用 calculator。
Action: {"tool": "calculator", "arguments": {"expression": "23 * 17"}}

Tool:
391

Assistant:
Thought: 工具返回 391，用户要求只给数字。
Action: {"tool": "finish", "arguments": {"answer": "391"}}
</pre>

<h3>18.3 训练路线</h3>

<table>
<tr>
<th>阶段</th>
<th>训练内容</th>
<th>目标</th>
</tr>
<tr>
<td>SFT</td>
<td>学习标准工具调用轨迹。</td>
<td>模型会输出合法 Action。</td>
</tr>
<tr>
<td>DPO</td>
<td>正确工具 vs 错误工具，合法参数 vs 非法参数。</td>
<td>模型更偏向正确工具调用。</td>
</tr>
<tr>
<td>Reward Pipeline</td>
<td>检查 JSON、工具名、参数、最终答案。</td>
<td>形成自动评分器。</td>
</tr>
<tr>
<td>GRPO</td>
<td>同一任务采样多条轨迹，按 reward 优化。</td>
<td>提高成功率和轨迹效率。</td>
</tr>
</table>

<h3>18.4 Mini Agent 的 reward 设计</h3>

<pre>
reward = 0.0

# 格式层
if action_is_valid_json:
    reward += 0.1
else:
    reward -= 0.5

# 工具层
if tool_name_is_correct:
    reward += 0.2
else:
    reward -= 0.2

# 参数层
if arguments_match_schema:
    reward += 0.2
else:
    reward -= 0.2

# 执行层
if tool_execution_success:
    reward += 0.2

# 任务层
if final_answer_correct:
    reward += 1.0

# 成本层
reward -= 0.05 * unnecessary_tool_calls
</pre>

<h3>18.5 Mini Agent 的评测指标</h3>

<table>
<tr>
<th>指标</th>
<th>中文解释</th>
<th>为什么重要</th>
</tr>
<tr>
<td>Tool Accuracy</td>
<td>工具选择准确率</td>
<td>判断模型是否知道该用哪个工具。</td>
</tr>
<tr>
<td>JSON Valid Rate</td>
<td>JSON 合法率</td>
<td>判断输出能否被系统解析。</td>
</tr>
<tr>
<td>Execution Success Rate</td>
<td>工具执行成功率</td>
<td>判断参数是否正确。</td>
</tr>
<tr>
<td>Task Success Rate</td>
<td>任务成功率</td>
<td>最终是否完成用户任务。</td>
</tr>
<tr>
<td>Average Steps</td>
<td>平均步数</td>
<td>判断轨迹效率。</td>
</tr>
<tr>
<td>Recovery Rate</td>
<td>错误恢复率</td>
<td>工具失败后能否换策略。</td>
</tr>
</table>

<div class="box note">
<strong>Mini Agent 后训练的核心：</strong>
不要只看最终答案。
Agent 的可靠性来自每一步：
格式、工具、参数、执行、反馈使用、最终回答。
</div>

<hr>

<h2 id="route19">19. 后训练常见坑</h2>

<p>
下面这部分是把前面所有内容落到实践时最容易踩的坑。
</p>

<h3>19.1 SFT 常见坑</h3>

<table>
<tr>
<th>问题</th>
<th>表现</th>
<th>解决方式</th>
</tr>
<tr>
<td>数据格式不统一</td>
<td>模型输出一会儿 JSON，一会儿自然语言。</td>
<td>统一 chat template 和输出 schema。</td>
</tr>
<tr>
<td>loss mask 错误</td>
<td>模型学会生成 user prompt 或 tool output。</td>
<td>只对 assistant 部分计算 loss。</td>
</tr>
<tr>
<td>低质量样本太多</td>
<td>模型学到坏习惯。</td>
<td>先少量高质量，不要追求数量。</td>
</tr>
<tr>
<td>任务混得太杂</td>
<td>模型行为不稳定。</td>
<td>先单任务，再多任务。</td>
</tr>
</table>

<h3>19.2 DPO 常见坑</h3>

<table>
<tr>
<th>问题</th>
<th>表现</th>
<th>解决方式</th>
</tr>
<tr>
<td>chosen / rejected 差异不清楚</td>
<td>模型学不到稳定偏好。</td>
<td>构造明确对比，如正确工具 vs 错误工具。</td>
</tr>
<tr>
<td>rejected 太弱</td>
<td>训练太容易，提升有限。</td>
<td>加入 hard negative。</td>
</tr>
<tr>
<td>chosen 本身也有问题</td>
<td>模型偏向错误答案。</td>
<td>人工或规则二次清洗。</td>
</tr>
<tr>
<td>偏好过度单一</td>
<td>模型只学会某一种风格。</td>
<td>保持偏好维度多样。</td>
</tr>
</table>

<h3>19.3 Reward Pipeline 常见坑</h3>

<table>
<tr>
<th>问题</th>
<th>表现</th>
<th>解决方式</th>
</tr>
<tr>
<td>reward 太粗</td>
<td>模型只优化最终成功，过程混乱。</td>
<td>增加格式、工具、参数等中间 reward。</td>
</tr>
<tr>
<td>reward 太复杂</td>
<td>信号冲突，训练不稳定。</td>
<td>从 2 到 3 个核心 reward 开始。</td>
</tr>
<tr>
<td>reward 有漏洞</td>
<td>模型学会 reward hacking。</td>
<td>加入反作弊规则和隐藏测试。</td>
</tr>
<tr>
<td>LLM judge 不可靠</td>
<td>评分波动大或偏向模板化答案。</td>
<td>能用规则验证就优先规则验证。</td>
</tr>
</table>

<h3>19.4 GRPO / PPO 常见坑</h3>

<table>
<tr>
<th>问题</th>
<th>表现</th>
<th>解决方式</th>
</tr>
<tr>
<td>rollout 质量太差</td>
<td>一组样本全错，学不到东西。</td>
<td>先 SFT / DPO 再 RL。</td>
</tr>
<tr>
<td>reward 分布太稀疏</td>
<td>大多数样本都是 0 分。</td>
<td>增加格式、步骤、局部 reward。</td>
</tr>
<tr>
<td>更新太猛</td>
<td>模型格式崩、语言质量下降。</td>
<td>使用 KL、clip、较小学习率。</td>
</tr>
<tr>
<td>只看 loss</td>
<td>误判训练效果。</td>
<td>重点看任务成功率和 reward 曲线。</td>
</tr>
<tr>
<td>生成成本过高</td>
<td>训练速度很慢。</td>
<td>先小模型、小 batch、小任务。</td>
</tr>
</table>

<div class="box warn">
<strong>最大的坑：</strong>
把算法名当核心。
真正的核心是数据格式、偏好数据、reward 设计、评测指标。
算法只是最后的优化器。
</div>

<hr>

<h2 id="route20">20. 术语表：后训练英文术语 + 中文解释</h2>

<table>
<tr>
<th>英文术语</th>
<th>中文译法</th>
<th>解释</th>
</tr>
<tr>
<td>Post-training</td>
<td>后训练</td>
<td>预训练之后，用 SFT、偏好优化、RL 等方法让模型学会对话、推理、指令遵循和人类偏好。</td>
</tr>
<tr>
<td>Alignment</td>
<td>对齐</td>
<td>让模型输出更符合人类偏好、安全要求和任务目标。</td>
</tr>
<tr>
<td>Base Model</td>
<td>基座模型</td>
<td>经过预训练但尚未充分对话微调的模型。</td>
</tr>
<tr>
<td>Chat Template</td>
<td>聊天模板</td>
<td>把 system、user、assistant 等角色拼成模型输入格式的模板。</td>
</tr>
<tr>
<td>SFT</td>
<td>监督微调</td>
<td>用 prompt → response 数据训练模型模仿高质量回答。</td>
</tr>
<tr>
<td>Loss Mask</td>
<td>损失掩码</td>
<td>只让 assistant response 参与 loss，不让 prompt 参与 loss。</td>
</tr>
<tr>
<td>Rejection Sampling</td>
<td>拒绝采样</td>
<td>同一 prompt 生成多个候选，只保留最好的样本。</td>
</tr>
<tr>
<td>Preference Data</td>
<td>偏好数据</td>
<td>包含 chosen 和 rejected 的好坏回答比较数据。</td>
</tr>
<tr>
<td>RLHF</td>
<td>基于人类反馈的强化学习</td>
<td>用人类偏好训练 reward model，再用 RL 优化模型。</td>
</tr>
<tr>
<td>Reward Model</td>
<td>奖励模型</td>
<td>给模型输出打分的模型。</td>
</tr>
<tr>
<td>DPO</td>
<td>直接偏好优化</td>
<td>不用显式 reward model，直接用 chosen / rejected 优化模型。</td>
</tr>
<tr>
<td>RL</td>
<td>强化学习</td>
<td>模型通过动作、环境反馈和奖励来优化策略。</td>
</tr>
<tr>
<td>Online RL</td>
<td>在线强化学习</td>
<td>当前模型实时生成新样本，并用 reward 更新自己。</td>
</tr>
<tr>
<td>On-policy</td>
<td>同策略</td>
<td>训练数据来自当前正在训练的模型。</td>
</tr>
<tr>
<td>Off-policy</td>
<td>异策略</td>
<td>训练数据来自旧模型、其他模型或固定数据集。</td>
</tr>
<tr>
<td>Rollout</td>
<td>轨迹采样</td>
<td>让模型生成完整回答或执行完整任务的过程。</td>
</tr>
<tr>
<td>Policy</td>
<td>策略</td>
<td>当前正在训练的模型。</td>
</tr>
<tr>
<td>Reward</td>
<td>奖励</td>
<td>衡量模型输出好坏的分数。</td>
</tr>
<tr>
<td>Advantage</td>
<td>优势</td>
<td>当前输出相对于平均水平或 baseline 好多少。</td>
</tr>
<tr>
<td>PPO</td>
<td>近端策略优化</td>
<td>一种通过 clipping、KL 等机制稳定策略更新的 RL 算法。</td>
</tr>
<tr>
<td>GRPO</td>
<td>组相对策略优化</td>
<td>对同一 prompt 的多个输出进行组内比较，用相对 reward 优化模型。</td>
</tr>
<tr>
<td>Reward Pipeline</td>
<td>奖励管线</td>
<td>由规则、测试、模型评审等组成的自动评分系统。</td>
</tr>
<tr>
<td>ORM</td>
<td>结果奖励模型</td>
<td>只评价最终答案是否正确。</td>
</tr>
<tr>
<td>PRM</td>
<td>过程奖励模型</td>
<td>评价中间推理步骤或过程是否正确。</td>
</tr>
<tr>
<td>RLVR</td>
<td>可验证奖励强化学习</td>
<td>使用可自动验证的奖励进行强化学习，例如数学答案、代码测试。</td>
</tr>
<tr>
<td>Reward Hacking</td>
<td>奖励黑客 / 奖励投机</td>
<td>模型钻 reward 漏洞，拿高分但不符合真实目标。</td>
</tr>
<tr>
<td>KL Divergence</td>
<td>KL 散度</td>
<td>衡量新模型与参考模型分布差异，用来防止模型偏离太远。</td>
</tr>
<tr>
<td>Test-time Compute</td>
<td>测试时计算</td>
<td>模型推理阶段额外花费的计算，如更长推理、多次采样、验证。</td>
</tr>
<tr>
<td>Agent Trajectory</td>
<td>智能体轨迹</td>
<td>Agent 完成任务过程中的观察、思考、动作、工具返回和最终答案序列。</td>
</tr>
</table>

<hr>

<h2 id="route21">21. 最终总结：这篇博客应该学到什么？</h2>

<p>
PyTorch 这篇后训练博客最值得学习的不是某一个公式，而是一条路线。
</p>

<div class="box note">
<strong>完整路线：</strong>
<pre>
预训练模型
  ↓
聊天格式与后训练数据格式
  ↓
SFT：学会模仿高质量回答
  ↓
Rejection Sampling：筛选更好样本
  ↓
DPO：用 chosen / rejected 学偏好
  ↓
Reward Pipeline：设计可验证奖励
  ↓
Online RL：当前模型自己生成样本
  ↓
PPO / GRPO：用 reward 优化模型
  ↓
Reasoning / Agent：训练推理和多步行动能力
</pre>
</div>

<h3>21.1 你应该建立的 5 个核心理解</h3>

<table>
<tr>
<th>核心理解</th>
<th>解释</th>
</tr>
<tr>
<td>第一，后训练首先是格式问题。</td>
<td>模型必须知道谁是 system、user、assistant，自己应该生成什么。</td>
</tr>
<tr>
<td>第二，SFT 是地基。</td>
<td>没有稳定 SFT，DPO 和 RL 都会建立在不稳定输出上。</td>
</tr>
<tr>
<td>第三，DPO 是低成本偏好优化。</td>
<td>它不探索，但很适合纠正偏好和格式问题。</td>
</tr>
<tr>
<td>第四，RL 的核心是 reward。</td>
<td>算法会优化 reward，reward 错了模型就会学歪。</td>
</tr>
<tr>
<td>第五，Agent 后训练优化的是轨迹。</td>
<td>不是只优化最终回答，而是优化观察、动作、工具调用、反馈和停止判断。</td>
</tr>
</table>

<h3>21.2 对你的学习建议</h3>

<div class="box train">
<strong>建议你接下来按这个顺序动手：</strong>
<ol>
<li>先复现一个 SFT 小实验，理解 chat template 和 loss mask。</li>
<li>再做一个 DPO 小实验，理解 chosen / rejected 数据。</li>
<li>写一个简单 reward function，评估 JSON、工具名、最终答案。</li>
<li>做一个数学或 JSON 格式任务的 GRPO 小实验。</li>
<li>最后再做 Mini Tool-use Agent，把 SFT、DPO、reward、GRPO 串起来。</li>
</ol>
</div>

<h3>21.3 一句话收束</h3>

<div class="box note">
<strong>一句话总结：</strong>
后训练不是让模型多背知识，而是通过格式、示范、偏好、奖励和环境反馈，把一个会补全文本的基座模型，塑造成一个会对话、会推理、会调用工具、会根据反馈改进行为的模型。
</div>

<p class="small">
说明：本文为 PyTorch 官方博客《A Primer on LLM Post-Training》的中文学习笔记与后训练路线整理。原文图片通过原博客链接引用，版权归原作者与 PyTorch 所有。
</p>
```

---

# you asked

message time: 2026-06-07 16:52:56

是不是 完结可

---

# chatgpt response

可以，**这篇 PyTorch《A Primer on LLM Post-Training》的 HTML 精读版基本可以完结了**。

现在内容已经形成完整闭环：

```text
0. 后训练是什么
1. 后训练数据格式 / Chat Template
2. SFT → DPO → Online RL 总路线
3. SFT 监督微调
4. Rejection Sampling 拒绝采样
5. RL 强化学习基础
6. RLHF / Reward Model
7. DPO 直接偏好优化
8. Online RL / PPO
9. Reward Pipeline 奖励管线
10. Test-time Reasoning / DeepSeek-R1
11. PPO 深入理解
12. GRPO
13. 学习路线
14. SFT 实践
15. DPO 实践
16. Reward Pipeline 实践
17. GRPO 小实验
18. Mini Tool-use Agent
19. 常见坑
20. 术语表
21. 最终总结
```

也就是说，它已经不是零散笔记，而是一篇完整的**后训练路线学习 HTML 文档**了。

最后你只需要检查两件事：

1. **HTML 结构是否完整**：最前面有 `<!DOCTYPE html>`、`<html>`、`<head>`、`<body>`，最后有 `</body></html>`。
2. **每次我给你的续写内容都放在 `</body>` 前面**，不要放到 `</body>` 后面。

如果你想让它更像正式文档，最多再补三小块：

```text
A. 开头加一个“阅读路线图”
B. 每章前加“本章学习目标”
C. 结尾加“下一篇博客推荐：RLVR / GRPO / verl”
```

但从内容完整度来说，这一篇已经可以收尾。下一篇建议做 **Fireworks AI：RL with Verifiable Reward**，专门补 RLVR / GRPO / reasoning 后训练。

---

# you asked

message time: 2026-06-07 16:54:04

可以 我把你的 内容粘贴了 是否可以做一个组件 右上角表示 目录啊

---

# chatgpt response

可以，最适合你这个 HTML 文档的是做一个**右上角悬浮目录组件**，自动读取页面里的 `<h2>` 标题，不用你手动维护目录。

你按下面三步粘贴就行。

---

## 1. 把这段 CSS 粘贴到 `<style>` 里面

```html
<style>
/* ========================= */
/* 右上角悬浮目录组件 */
/* ========================= */

.floating-toc {
  position: fixed;
  top: 24px;
  right: 24px;
  width: 280px;
  max-height: 78vh;
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 14px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.16);
  z-index: 9999;
  overflow: hidden;
  font-size: 14px;
}

.floating-toc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: #2563eb;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
}

.floating-toc-title {
  font-size: 15px;
}

.floating-toc-toggle {
  border: none;
  background: rgba(255,255,255,0.18);
  color: #ffffff;
  border-radius: 6px;
  padding: 3px 8px;
  cursor: pointer;
  font-size: 13px;
}

.floating-toc-body {
  max-height: 68vh;
  overflow-y: auto;
  padding: 10px 10px 12px;
}

.floating-toc-body a {
  display: block;
  padding: 7px 9px;
  margin: 3px 0;
  color: #334155;
  text-decoration: none;
  border-radius: 8px;
  line-height: 1.45;
}

.floating-toc-body a:hover {
  background: #eef4ff;
  color: #2563eb;
}

.floating-toc-body a.active {
  background: #2563eb;
  color: #ffffff;
  font-weight: bold;
}

.floating-toc.collapsed {
  width: 170px;
}

.floating-toc.collapsed .floating-toc-body {
  display: none;
}

@media (max-width: 900px) {
  .floating-toc {
    right: 12px;
    top: 12px;
    width: 210px;
    max-height: 60vh;
    font-size: 13px;
  }

  .floating-toc.collapsed {
    width: 150px;
  }
}
</style>
```

如果你原来已经有 `<style>`，不要再新建一个 `<style>`，直接把中间这段 CSS 粘进去即可。

---

## 2. 把这段 HTML 粘贴到 `<body>` 后面

也就是：

```html
<body>
```

下面立刻粘贴：

```html
<!-- 右上角悬浮目录 -->
<div class="floating-toc" id="floatingToc">
  <div class="floating-toc-header" id="floatingTocHeader">
    <span class="floating-toc-title">目录</span>
    <button class="floating-toc-toggle" id="floatingTocToggle">收起</button>
  </div>
  <div class="floating-toc-body" id="floatingTocBody">
    <!-- JS 会自动生成目录 -->
  </div>
</div>
```

---

## 3. 把这段 JS 粘贴到 `</body>` 前面

```html
<script>
(function () {
  const toc = document.getElementById("floatingToc");
  const tocBody = document.getElementById("floatingTocBody");
  const toggleBtn = document.getElementById("floatingTocToggle");
  const tocHeader = document.getElementById("floatingTocHeader");

  if (!toc || !tocBody) return;

  const headings = Array.from(document.querySelectorAll("h2"));

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = "section-" + (index + 1);
    }

    const link = document.createElement("a");
    link.href = "#" + heading.id;
    link.textContent = heading.textContent.replace(/\s+/g, " ").trim();
    link.dataset.target = heading.id;

    link.addEventListener("click", function (e) {
      e.preventDefault();
      document.getElementById(heading.id).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    tocBody.appendChild(link);
  });

  function setActiveLink() {
    let currentId = "";

    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 120) {
        currentId = heading.id;
      }
    });

    const links = tocBody.querySelectorAll("a");
    links.forEach((link) => {
      if (link.dataset.target === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();

  function toggleToc() {
    toc.classList.toggle("collapsed");
    toggleBtn.textContent = toc.classList.contains("collapsed") ? "展开" : "收起";
  }

  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleToc();
  });

  tocHeader.addEventListener("dblclick", toggleToc);
})();
</script>
```

---

## 效果

加完以后，页面右上角会出现一个悬浮目录：

```text
目录
0. 这篇博客应该怎么读？
1. 后训练数据格式
2. 后训练整体路线
3. SFT
4. Rejection Sampling
...
21. 最终总结
```

它会自动读取你页面里的所有 `<h2>` 标题，并且滚动时会自动高亮当前章节。点目录也可以平滑跳转。

最推荐你用这个版本，因为你后面继续往 HTML 里加内容时，它会自动更新目录，不需要手动改目录。

---

# you asked

message time: 2026-06-07 16:54:55

怎么 改啊 原本的我没删除

---

# chatgpt response

你原来的内容**不用删除**。你只是在原来的 HTML 上“加一个右上角目录组件”。按下面改就行。

## 第一步：CSS 加到原来的 `<style>` 里面

你原来文件开头应该有类似：

```html
<style>
body {
  ...
}
h1 {
  ...
}
...
</style>
```

你不要删原来的样式，只需要在 `</style>` 前面，粘贴我给你的目录 CSS。

也就是变成：

```html
<style>
body {
  ...
}

/* 你原来的很多样式 */

/* 右上角悬浮目录组件 */
.floating-toc {
  position: fixed;
  top: 24px;
  right: 24px;
  width: 280px;
  max-height: 78vh;
  background: #ffffff;
  border: 1px solid #d9e2ef;
  border-radius: 14px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.16);
  z-index: 9999;
  overflow: hidden;
  font-size: 14px;
}

/* 后面继续粘贴我给你的 CSS */

</style>
```

重点：**不要再额外写一个新的 `<style>`**，只把 CSS 内容放进你原来的 `<style>` 里。

---

## 第二步：HTML 组件放在 `<body>` 后面

找到你原来的：

```html
<body>
```

它下面可能已经有：

```html
<h1>PyTorch《A Primer on LLM Post-Training》中文精读笔记...</h1>
```

你就在 `<body>` 和 `<h1>` 中间插入目录组件：

```html
<body>

<!-- 右上角悬浮目录 -->
<div class="floating-toc" id="floatingToc">
  <div class="floating-toc-header" id="floatingTocHeader">
    <span class="floating-toc-title">目录</span>
    <button class="floating-toc-toggle" id="floatingTocToggle">收起</button>
  </div>
  <div class="floating-toc-body" id="floatingTocBody">
    <!-- JS 会自动生成目录 -->
  </div>
</div>

<h1>PyTorch《A Primer on LLM Post-Training》中文精读笔记...</h1>
```

重点：原来的 `<h1>`、`<h2>`、正文内容**都不要删**。

---

## 第三步：JS 放在最后的 `</body>` 前面

你原文最后应该是：

```html
<p class="small">
说明：...
</p>

</body>
</html>
```

你把 JS 粘贴到 `</body>` 前面：

```html
<p class="small">
说明：...
</p>

<script>
(function () {
  const toc = document.getElementById("floatingToc");
  const tocBody = document.getElementById("floatingTocBody");
  const toggleBtn = document.getElementById("floatingTocToggle");
  const tocHeader = document.getElementById("floatingTocHeader");

  if (!toc || !tocBody) return;

  const headings = Array.from(document.querySelectorAll("h2"));

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = "section-" + (index + 1);
    }

    const link = document.createElement("a");
    link.href = "#" + heading.id;
    link.textContent = heading.textContent.replace(/\s+/g, " ").trim();
    link.dataset.target = heading.id;

    link.addEventListener("click", function (e) {
      e.preventDefault();
      document.getElementById(heading.id).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    tocBody.appendChild(link);
  });

  function setActiveLink() {
    let currentId = "";

    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 120) {
        currentId = heading.id;
      }
    });

    const links = tocBody.querySelectorAll("a");
    links.forEach((link) => {
      if (link.dataset.target === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();

  function toggleToc() {
    toc.classList.toggle("collapsed");
    toggleBtn.textContent = toc.classList.contains("collapsed") ? "展开" : "收起";
  }

  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleToc();
  });

  tocHeader.addEventListener("dblclick", toggleToc);
})();
</script>

</body>
</html>
```

---

## 原来的目录怎么办？

你前面 HTML 里可能已经有一个普通目录，比如：

```html
<h2>目录</h2>
<div class="toc">
  <a href="#route0">...</a>
  <a href="#route1">...</a>
</div>
```

这个**可以不删**。

如果你想页面更干净，可以删掉原来的普通目录；如果怕删错，就先保留。右上角目录会自动根据所有 `<h2>` 生成，不影响正文。

最简单做法：

```text
原来的目录先别删。
只加 CSS + 悬浮目录 HTML + JS。
确认能用以后，再考虑删原来的普通目录。
```

---

# you asked

message time: 2026-06-07 16:58:28

太丑了 我的 意思 类似于 在有右上角 改成点击的那种按钮

---

# chatgpt response

对，你这个截图里的问题是：**目录直接展开在右上角了，而且样式被正文链接样式影响，所以很丑。**

你要的是：右上角只有一个小按钮，点击后再弹出目录。这个更适合。

你不用大改。最简单：**在 `</body>` 前面粘贴下面这一整段代码**。它会自动隐藏你之前那个丑的悬浮目录，并生成一个新的“目录按钮”。

```html
<!-- ===================================================== -->
<!-- 右上角点击式目录按钮：新版，替换旧悬浮目录 -->
<!-- 直接粘贴到 </body> 前面即可 -->
<!-- ===================================================== -->

<script>
(function () {
  /* 隐藏之前那个丑的悬浮目录，不用你手动删除 */
  const oldToc = document.getElementById("floatingToc");
  if (oldToc) {
    oldToc.style.display = "none";
  }

  /* 防止重复生成 */
  const existed = document.getElementById("cleanTocHost");
  if (existed) {
    existed.remove();
  }

  const headings = Array.from(document.querySelectorAll("h2"));

  if (!headings.length) return;

  headings.forEach((h, i) => {
    if (!h.id) {
      h.id = "section-" + (i + 1);
    }
  });

  const host = document.createElement("div");
  host.id = "cleanTocHost";
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: "open" });

  shadow.innerHTML = `
    <style>
      :host {
        all: initial;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", Arial, sans-serif;
      }

      .toc-button {
        position: fixed;
        top: 22px;
        right: 24px;
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 9px 14px;
        border: none;
        border-radius: 999px;
        background: #2563eb;
        color: #ffffff;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 8px 22px rgba(37, 99, 235, 0.28);
        transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
      }

      .toc-button:hover {
        background: #1d4ed8;
        transform: translateY(-1px);
        box-shadow: 0 12px 26px rgba(37, 99, 235, 0.34);
      }

      .toc-button-icon {
        font-size: 15px;
        line-height: 1;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 99997;
        background: rgba(15, 23, 42, 0.28);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.18s ease;
      }

      .panel {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 99998;
        width: 360px;
        max-width: 86vw;
        height: 100vh;
        background: #ffffff;
        box-shadow: -18px 0 40px rgba(15, 23, 42, 0.22);
        transform: translateX(105%);
        transition: transform 0.22s ease;
        display: flex;
        flex-direction: column;
        border-left: 1px solid #e5e7eb;
      }

      .open .backdrop {
        opacity: 1;
        pointer-events: auto;
      }

      .open .panel {
        transform: translateX(0);
      }

      .panel-header {
        padding: 18px 18px 14px;
        border-bottom: 1px solid #e5e7eb;
        background: #f8fafc;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .panel-title {
        font-size: 18px;
        font-weight: 700;
        color: #0f172a;
      }

      .close-btn {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 8px;
        background: #e2e8f0;
        color: #334155;
        cursor: pointer;
        font-size: 18px;
        line-height: 32px;
        text-align: center;
      }

      .close-btn:hover {
        background: #cbd5e1;
      }

      .toc-list {
        padding: 12px 12px 24px;
        overflow-y: auto;
        flex: 1;
      }

      .toc-item {
        display: block;
        padding: 9px 10px;
        margin: 3px 0;
        border-radius: 9px;
        color: #334155;
        text-decoration: none;
        font-size: 14px;
        line-height: 1.45;
        cursor: pointer;
        border-left: 3px solid transparent;
      }

      .toc-item:hover {
        background: #eff6ff;
        color: #1d4ed8;
      }

      .toc-item.active {
        background: #dbeafe;
        color: #1d4ed8;
        font-weight: 700;
        border-left-color: #2563eb;
      }

      .toc-footer {
        padding: 10px 16px 16px;
        font-size: 12px;
        color: #64748b;
        border-top: 1px solid #e5e7eb;
        background: #f8fafc;
      }

      @media (max-width: 700px) {
        .toc-button {
          top: 14px;
          right: 14px;
          padding: 8px 12px;
          font-size: 13px;
        }

        .panel {
          width: 82vw;
        }
      }
    </style>

    <button class="toc-button" id="tocButton" type="button">
      <span class="toc-button-icon">☰</span>
      <span>目录</span>
    </button>

    <div class="backdrop" id="backdrop"></div>

    <aside class="panel" id="panel">
      <div class="panel-header">
        <div class="panel-title">目录</div>
        <button class="close-btn" id="closeBtn" type="button">×</button>
      </div>
      <div class="toc-list" id="tocList"></div>
      <div class="toc-footer">点击章节标题即可跳转</div>
    </aside>
  `;

  const tocList = shadow.getElementById("tocList");
  const tocButton = shadow.getElementById("tocButton");
  const closeBtn = shadow.getElementById("closeBtn");
  const backdrop = shadow.getElementById("backdrop");

  headings.forEach((heading, index) => {
    const item = document.createElement("a");
    item.className = "toc-item";
    item.textContent = heading.textContent.replace(/\s+/g, " ").trim();
    item.dataset.target = heading.id;

    item.addEventListener("click", function () {
      document.getElementById(heading.id).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      closePanel();
    });

    tocList.appendChild(item);
  });

  function openPanel() {
    shadow.host.classList.add("open");
  }

  function closePanel() {
    shadow.host.classList.remove("open");
  }

  tocButton.addEventListener("click", openPanel);
  closeBtn.addEventListener("click", closePanel);
  backdrop.addEventListener("click", closePanel);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePanel();
  });

  function setActive() {
    let currentId = headings[0].id;

    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 130) {
        currentId = heading.id;
      }
    });

    const items = tocList.querySelectorAll(".toc-item");
    items.forEach((item) => {
      if (item.dataset.target === currentId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
})();
</script>
```

加完之后，效果就是：

右上角只显示：

```text
☰ 目录
```

点击以后，右侧滑出目录面板；点空白处、点 ×、按 Esc 都能关闭。

之前那个丑目录不用你删，这段代码会自动隐藏它。

---

# you asked

message time: 2026-06-07 17:00:30

你给我全部步骤

---

# chatgpt response

可以。你现在按这个做，**不用重写整篇 HTML**，只是在原文件上加一个“右上角点击式目录按钮”。

## 总体思路

你原来有一个很丑的悬浮目录：

```html
<div class="floating-toc" id="floatingToc">
...
</div>
```

现在我们不直接改它，而是：

```text
1. 先让旧目录隐藏
2. 再生成一个新的“☰ 目录”按钮
3. 点击按钮后，从右侧弹出目录面板
4. 自动读取所有 <h2> 标题生成目录
```

---

# 第一步：备份你的 HTML

先把你现在的文件复制一份，例如：

```text
pytorch_post_training_notes.html
```

复制成：

```text
pytorch_post_training_notes_backup.html
```

防止改错。

---

# 第二步：打开你的 HTML 文件

用 VS Code 打开你的 HTML 文件。

找到文件最后，一般是这样：

```html
<p class="small">
说明：本文为 PyTorch 官方博客《A Primer on LLM Post-Training》的中文学习笔记与后训练路线整理。
</p>

</body>
</html>
```

你要把新代码放在：

```html
</body>
```

的前面。

也就是：

```html
<p class="small">
说明：...
</p>

<!-- 新目录按钮代码放这里 -->

</body>
</html>
```

---

# 第三步：把下面整段代码粘贴到 `</body>` 前面

注意：**不要粘到 `</html>` 后面。**

```html
<!-- ===================================================== -->
<!-- 右上角点击式目录按钮：新版 -->
<!-- 粘贴位置：放在 </body> 前面 -->
<!-- ===================================================== -->

<script>
(function () {
  /* 1. 隐藏之前那个旧的悬浮目录 */
  const oldToc = document.getElementById("floatingToc");
  if (oldToc) {
    oldToc.style.display = "none";
  }

  /* 2. 如果之前已经生成过新版目录，先删除，防止重复 */
  const existed = document.getElementById("cleanTocHost");
  if (existed) {
    existed.remove();
  }

  /* 3. 自动读取页面里所有 h2 标题 */
  const headings = Array.from(document.querySelectorAll("h2"));

  if (!headings.length) return;

  headings.forEach((h, i) => {
    if (!h.id) {
      h.id = "section-" + (i + 1);
    }
  });

  /* 4. 创建新版目录容器 */
  const host = document.createElement("div");
  host.id = "cleanTocHost";
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: "open" });

  /* 5. 新目录按钮和弹出面板的样式 + 结构 */
  shadow.innerHTML = `
    <style>
      :host {
        all: initial;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", Arial, sans-serif;
      }

      .toc-button {
        position: fixed;
        top: 22px;
        right: 24px;
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 9px 14px;
        border: none;
        border-radius: 999px;
        background: #2563eb;
        color: #ffffff;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 8px 22px rgba(37, 99, 235, 0.28);
        transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
      }

      .toc-button:hover {
        background: #1d4ed8;
        transform: translateY(-1px);
        box-shadow: 0 12px 26px rgba(37, 99, 235, 0.34);
      }

      .toc-button-icon {
        font-size: 15px;
        line-height: 1;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 99997;
        background: rgba(15, 23, 42, 0.28);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.18s ease;
      }

      .panel {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 99998;
        width: 360px;
        max-width: 86vw;
        height: 100vh;
        background: #ffffff;
        box-shadow: -18px 0 40px rgba(15, 23, 42, 0.22);
        transform: translateX(105%);
        transition: transform 0.22s ease;
        display: flex;
        flex-direction: column;
        border-left: 1px solid #e5e7eb;
      }

      .open .backdrop {
        opacity: 1;
        pointer-events: auto;
      }

      .open .panel {
        transform: translateX(0);
      }

      .panel-header {
        padding: 18px 18px 14px;
        border-bottom: 1px solid #e5e7eb;
        background: #f8fafc;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .panel-title {
        font-size: 18px;
        font-weight: 700;
        color: #0f172a;
      }

      .close-btn {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 8px;
        background: #e2e8f0;
        color: #334155;
        cursor: pointer;
        font-size: 18px;
        line-height: 32px;
        text-align: center;
      }

      .close-btn:hover {
        background: #cbd5e1;
      }

      .toc-list {
        padding: 12px 12px 24px;
        overflow-y: auto;
        flex: 1;
      }

      .toc-item {
        display: block;
        padding: 9px 10px;
        margin: 3px 0;
        border-radius: 9px;
        color: #334155;
        text-decoration: none;
        font-size: 14px;
        line-height: 1.45;
        cursor: pointer;
        border-left: 3px solid transparent;
      }

      .toc-item:hover {
        background: #eff6ff;
        color: #1d4ed8;
      }

      .toc-item.active {
        background: #dbeafe;
        color: #1d4ed8;
        font-weight: 700;
        border-left-color: #2563eb;
      }

      .toc-footer {
        padding: 10px 16px 16px;
        font-size: 12px;
        color: #64748b;
        border-top: 1px solid #e5e7eb;
        background: #f8fafc;
      }

      @media (max-width: 700px) {
        .toc-button {
          top: 14px;
          right: 14px;
          padding: 8px 12px;
          font-size: 13px;
        }

        .panel {
          width: 82vw;
        }
      }
    </style>

    <button class="toc-button" id="tocButton" type="button">
      <span class="toc-button-icon">☰</span>
      <span>目录</span>
    </button>

    <div class="backdrop" id="backdrop"></div>

    <aside class="panel" id="panel">
      <div class="panel-header">
        <div class="panel-title">目录</div>
        <button class="close-btn" id="closeBtn" type="button">×</button>
      </div>
      <div class="toc-list" id="tocList"></div>
      <div class="toc-footer">点击章节标题即可跳转</div>
    </aside>
  `;

  const tocList = shadow.getElementById("tocList");
  const tocButton = shadow.getElementById("tocButton");
  const closeBtn = shadow.getElementById("closeBtn");
  const backdrop = shadow.getElementById("backdrop");

  /* 6. 根据 h2 自动生成目录 */
  headings.forEach((heading) => {
    const item = document.createElement("a");
    item.className = "toc-item";
    item.textContent = heading.textContent.replace(/\s+/g, " ").trim();
    item.dataset.target = heading.id;

    item.addEventListener("click", function () {
      document.getElementById(heading.id).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      closePanel();
    });

    tocList.appendChild(item);
  });

  /* 7. 打开和关闭目录 */
  function openPanel() {
    shadow.host.classList.add("open");
  }

  function closePanel() {
    shadow.host.classList.remove("open");
  }

  tocButton.addEventListener("click", openPanel);
  closeBtn.addEventListener("click", closePanel);
  backdrop.addEventListener("click", closePanel);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePanel();
  });

  /* 8. 滚动时高亮当前章节 */
  function setActive() {
    let currentId = headings[0].id;

    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 130) {
        currentId = heading.id;
      }
    });

    const items = tocList.querySelectorAll(".toc-item");
    items.forEach((item) => {
      if (item.dataset.target === currentId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
})();
</script>
```

---

# 第四步：保存文件并刷新浏览器

保存 HTML 文件。

然后用浏览器打开，或者原来已经打开的话，按：

```text
Ctrl + R
```

刷新。

如果没有变化，按：

```text
Ctrl + F5
```

强制刷新。

---

# 第五步：检查效果

右上角应该只显示一个蓝色按钮：

```text
☰ 目录
```

点击以后，右侧会滑出目录面板。

你应该看到类似：

```text
目录
0. 这篇博客应该怎么读？
1. 后训练数据格式
2. 后训练整体路线：SFT → DPO → Online RL
3. SFT：Supervised Fine-Tuning，监督微调
...
21. 最终总结：这篇博客应该学到什么？
```

点击任意章节，会自动跳转过去。

---

# 如果旧目录还显示怎么办？

说明你原来的旧目录可能不是这个 id：

```html
id="floatingToc"
```

你就在 VS Code 里按：

```text
Ctrl + F
```

搜索：

```text
floating-toc
```

找到类似这一段：

```html
<!-- 右上角悬浮目录 -->
<div class="floating-toc" id="floatingToc">
  ...
</div>
```

把这一整段删掉。

注意，只删这个目录组件，不要删正文。

一般从：

```html
<!-- 右上角悬浮目录 -->
```

删到它对应的：

```html
</div>
```

如果你不确定删到哪里，就先别删，截图给我看。

---

# 如果页面里原来的普通目录还在怎么办？

你文档开头可能还有普通目录：

```html
<h2>目录</h2>
<div class="toc">
  ...
</div>
```

这个可以保留，不影响右上角按钮。

如果你想页面更干净，可以删除这一段：

```html
<h2>目录</h2>

<div class="toc">
  ...
</div>
```

但是不建议你现在删。先确认右上角按钮能用，再考虑清理。

---

# 最终你的文件结构应该是这样

大致结构如下：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>...</title>

<style>
/* 你原来的样式 */
</style>
</head>

<body>

<!-- 正文内容 -->
<h1>...</h1>
<h2>0. 这篇博客应该怎么读？</h2>
...
<h2>21. 最终总结</h2>

<!-- 新版右上角点击目录按钮代码 -->
<script>
(function () {
  ...
})();
</script>

</body>
</html>
```

你只要保证：**新版目录按钮代码在 `</body>` 前面**，就可以。

---

# you asked

message time: 2026-06-07 17:03:48

目录没变化 前面 我给删了

---

# chatgpt response

是我上一版代码里有个问题：**点击按钮后不展开，是因为 Shadow DOM 里的 CSS 选择器写错了**。

你现在这样改最稳：

## 第一步：删掉我上一版目录按钮代码

在你 HTML 最后找到：

```html
<!-- 右上角点击式目录按钮：新版 -->
<script>
(function () {
  ...
})();
</script>
```

把这一整段删掉。

也就是从：

```html
<!-- ===================================================== -->
<!-- 右上角点击式目录按钮：新版 -->
```

一直删到：

```html
</script>
```

正文不要删。

---

## 第二步：把下面这个修正版粘到 `</body>` 前面

一定是放在：

```html
</body>
</html>
```

前面。

```html
<!-- ===================================================== -->
<!-- 右上角点击式目录按钮：修正版 -->
<!-- 放在 </body> 前面 -->
<!-- ===================================================== -->

<script>
(function () {
  const existed = document.getElementById("cleanTocHost");
  if (existed) {
    existed.remove();
  }

  const headings = Array.from(document.querySelectorAll("h2"));
  if (!headings.length) return;

  headings.forEach((h, i) => {
    if (!h.id) {
      h.id = "section-" + (i + 1);
    }
  });

  const host = document.createElement("div");
  host.id = "cleanTocHost";
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: "open" });

  shadow.innerHTML = `
    <style>
      :host {
        all: initial;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", Arial, sans-serif;
      }

      .toc-button {
        position: fixed;
        top: 22px;
        right: 24px;
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 9px 14px;
        border: none;
        border-radius: 999px;
        background: #2563eb;
        color: #ffffff;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 8px 22px rgba(37, 99, 235, 0.28);
      }

      .toc-button:hover {
        background: #1d4ed8;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 99997;
        background: rgba(15, 23, 42, 0.28);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.18s ease;
      }

      .panel {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 99998;
        width: 360px;
        max-width: 86vw;
        height: 100vh;
        background: #ffffff;
        box-shadow: -18px 0 40px rgba(15, 23, 42, 0.22);
        transform: translateX(105%);
        transition: transform 0.22s ease;
        display: flex;
        flex-direction: column;
        border-left: 1px solid #e5e7eb;
      }

      /* 关键修正：这里必须用 :host(.open)，不能写 .open */
      :host(.open) .backdrop {
        opacity: 1;
        pointer-events: auto;
      }

      :host(.open) .panel {
        transform: translateX(0);
      }

      .panel-header {
        padding: 18px 18px 14px;
        border-bottom: 1px solid #e5e7eb;
        background: #f8fafc;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .panel-title {
        font-size: 18px;
        font-weight: 700;
        color: #0f172a;
      }

      .close-btn {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 8px;
        background: #e2e8f0;
        color: #334155;
        cursor: pointer;
        font-size: 18px;
        line-height: 32px;
        text-align: center;
      }

      .close-btn:hover {
        background: #cbd5e1;
      }

      .toc-list {
        padding: 12px 12px 24px;
        overflow-y: auto;
        flex: 1;
      }

      .toc-item {
        display: block;
        padding: 9px 10px;
        margin: 3px 0;
        border-radius: 9px;
        color: #334155;
        text-decoration: none;
        font-size: 14px;
        line-height: 1.45;
        cursor: pointer;
        border-left: 3px solid transparent;
      }

      .toc-item:hover {
        background: #eff6ff;
        color: #1d4ed8;
      }

      .toc-item.active {
        background: #dbeafe;
        color: #1d4ed8;
        font-weight: 700;
        border-left-color: #2563eb;
      }

      .toc-footer {
        padding: 10px 16px 16px;
        font-size: 12px;
        color: #64748b;
        border-top: 1px solid #e5e7eb;
        background: #f8fafc;
      }

      @media (max-width: 700px) {
        .toc-button {
          top: 14px;
          right: 14px;
          padding: 8px 12px;
          font-size: 13px;
        }

        .panel {
          width: 82vw;
        }
      }
    </style>

    <button class="toc-button" id="tocButton" type="button">
      <span>☰</span>
      <span>目录</span>
    </button>

    <div class="backdrop" id="backdrop"></div>

    <aside class="panel" id="panel">
      <div class="panel-header">
        <div class="panel-title">目录</div>
        <button class="close-btn" id="closeBtn" type="button">×</button>
      </div>
      <div class="toc-list" id="tocList"></div>
      <div class="toc-footer">点击章节标题即可跳转</div>
    </aside>
  `;

  const tocList = shadow.getElementById("tocList");
  const tocButton = shadow.getElementById("tocButton");
  const closeBtn = shadow.getElementById("closeBtn");
  const backdrop = shadow.getElementById("backdrop");

  headings.forEach((heading) => {
    const item = document.createElement("a");
    item.className = "toc-item";
    item.textContent = heading.textContent.replace(/\s+/g, " ").trim();
    item.dataset.target = heading.id;

    item.addEventListener("click", function () {
      document.getElementById(heading.id).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      closePanel();
    });

    tocList.appendChild(item);
  });

  function openPanel() {
    host.classList.add("open");
  }

  function closePanel() {
    host.classList.remove("open");
  }

  tocButton.addEventListener("click", openPanel);
  closeBtn.addEventListener("click", closePanel);
  backdrop.addEventListener("click", closePanel);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closePanel();
    }
  });

  function setActive() {
    let currentId = headings[0].id;

    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 130) {
        currentId = heading.id;
      }
    });

    const items = tocList.querySelectorAll(".toc-item");
    items.forEach((item) => {
      if (item.dataset.target === currentId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
})();
</script>
```

---

## 第三步：刷新

保存后，在浏览器按：

```text
Ctrl + F5
```

不是普通刷新，最好强制刷新。

---

## 你应该看到的效果

右上角只有一个蓝色小按钮：

```text
☰ 目录
```

点击后，右侧会滑出目录面板。

这次修正的关键是这两句：

```css
:host(.open) .backdrop
:host(.open) .panel
```

上一版写成了 `.open .panel`，所以按钮点了以后面板不会正确展开。

---

# you asked

message time: 2026-06-07 17:07:20

如何开启 记忆模式

---

# chatgpt response

在 ChatGPT 里开启记忆，一般是这个路径：

**头像 / 个人资料 → Settings（设置） → Personalization（个性化） → Memory（记忆）**

进去后，把这两个选项打开：

**Reference saved memories**：引用已保存记忆。  
**Reference chat history**：引用聊天历史。

OpenAI 官方帮助里说明，记忆可以在 **Settings > Personalization** 里开启或关闭；也可以在 **Manage memories** 里查看、删除具体记忆。([OpenAI Help Center](https://help.openai.com/en/articles/8590148-personalization-and-data-controls-faq?trk=public_post_comment-text&utm_source=chatgpt.com))

如果你用的是中文界面，大概是：

**头像 → 设置 → 个性化 → 记忆 → 打开“引用已保存的记忆 / 引用聊天历史”**

另外，如果你只是想让我记住某件事，也可以直接说：

> 记住：我正在学习后训练 Agent，喜欢用中文 HTML 精读博客的方式学习。

只要你的记忆功能已开启，我就可以保存这类长期偏好。  
如果你想临时聊天但不写入记忆，可以用 **Temporary Chat（临时聊天）**；官方说明临时聊天不会引用或更新记忆。([OpenAI Help Center](https://help.openai.com/en/articles/8983136-what-is-memory?utm_source=chatgpt.com))

---

# you asked

message time: 2026-06-07 17:08:46

保存今天的记忆 归档

---

# chatgpt response

已保存并归档今天的学习偏好和进度。

我记住的重点包括：你在学习**后训练 Agent / LLM Post-training**，偏好用**英文博客原文图片 + 中文详细精读 + HTML 文档**的方式学习；内容要按路线分块、非常具体、术语中英对照、图片逐项解释，并能直接复制使用。也记住了你不喜欢“乱堆概念、太简略、目录丑”的版本，偏好右上角**点击式目录按钮**。