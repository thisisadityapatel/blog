# Kepler: Benchmarking LLMs on macOS Metal GPUs
30th May, 2026

A couple of weeks back, while paying the monthly Claude bill, a question slowly intensified:

*How long before we can have some serious LLM inference that can be used for agentic tasks on my macOS locally?*

<br/>
Before you hit me with "Apple developer intelligence!", let's not go there—that's a different problem. My curiosity really came from not being able to efficiently know how my fine-tuned LLM benchmarked against other models, especially if I were running them locally on my macOS. On a side note, I need to connect with someone working in a bigger MLOps team to understand, from a first-principles perspective, how research teams do it.

[Ollama](https://ollama.com/) does a fantastic job of letting devs install and run local models. But "just working" is boring; I want inference running at sonic speed. Plus, the ecosystem is missing a definitive benchmarking tool to pit Model 1.1.0 against Model 1.1.1 (fine-tuned to any specific need).

Check out **[Kepler](https://github.com/thisisadityapatel/kepler)**.

Kepler is a lightweight tool designed for developers running LLMs on macOS Metal who need to see exactly how their inference stacks up. Choosing a model isn't just about size; it depends on the specific architecture, whether you're building multi-agent coding workflows, serving multiple users, or demanding strict structured JSON/Regex outputs. Kepler tests both **GGUF** and **MLX** formats across different inference engines so it can help guide the absolute best engine fit for macOS.
<br/>

### The Inference Engine Breakdown

Here is how the major engines shake out based on use case, speed, and hardware demands:

| Engine | Speed | Hardware | Best For |
| --- | --- | --- | --- |
| **MLX-LM** | Fast (Native on Apple Silicon) | Apple Silicon (M-series) | Apple-native development, local research, and fine-tuning (LoRA) |
| **vLLM-MLX** | Very Fast | High-end Apple Silicon (M2 Ultra / M4 Max / M5) | Multi-user serving on Mac Studio or Mac Pro hardware |
| **Ollama** | Fast (MLX-backed for Mac) | NVIDIA GPU or Apple Silicon (8GB+ RAM) | General consumer use and that seamless "it just works" simplicity |
| **llama.cpp** | Moderate | CPU / Any GPU | Local, personal use and universal compatibility |
| **ik_llama.cpp** | Moderate-Fast | CPU / Any GPU | Optimized local use and hybrid workflows |
| **SGLang** | Very Fast | High-end GPU | Structured outputs (JSON) and complex agentic workflows |
| **vLLM** | Very Fast | High-end GPU | Multi-user serving and enterprise-level throughput |
| **TensorRT-LLM** | Fastest | NVIDIA GPU (Strictly Required) | Hardcore production and squeezing maximum performance out of NVIDIA silicon |
<br/>

**NOTE:** Currently, some engines don't have Metal access and hence aren't available on Kepler. As new versions roll out, I will try to extend support here.
<br/>

### Interesting Quests

Initially, I engineered this project from the ground up using Docker, hoping it would keep every engine image cleanly decoupled and make the overall process of installing and managing LLMs easier. [Kepler python-docker-v1.0 branch](https://github.com/thisisadityapatel/kepler/tree/python-docker-v1.0)

However, halfway through I hit a wall: Docker containers cannot access the macOS Metal GPU because they run inside a virtualized Linux utility VM. Apple's Hypervisor framework does not currently support native hardware GPU pass-through to Linux guests. Consequently, traditional container workloads (like machine learning models running in standard Ubuntu containers) painfully fall back to CPU-only processing.

I was already too deep into the first prototype implementation before coming across [Docker Model Runner](https://www.docker.com/blog/docker-model-runner-vllm-metal-macos/). It addresses exactly this bottleneck and is definitely an interesting read for anyone hacking in this space.

Feel free to open PRs to the Kepler repository with ideas that can extend the scope. <u>I'm envisioning this project to not only benchmark but automatically select and serve the model through an API gateway, kind of like Ollama but using the most relevant inference engine.</u>
<br/>

– Aditya
