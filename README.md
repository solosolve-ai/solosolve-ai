# **SoloSolve AI: From Raw Data to Actionable Insight**

<p align="center">
  <img src="https://github.com/user-attachments/assets/18c2c4e3-7823-4107-8cc7-afda5ac0875d" width="600">
</p>

<p align="center">
  <a href="https://huggingface.co/ShovalBenjer/gemma-3-270m-fashion-multitask_v1" target="_blank">
    <img src="https://img.shields.io/badge/%F0%9F%A4%97%20Model-Hugging%20Face-yellow?style=for-the-badge"/>
  </a>
  <a href="https://github.com/solosolve-ai/solosolve-ai-demo" target="_blank">
    <img src="https://img.shields.io/badge/%F0%9F%92%BB%20GitHub%20Repo-Click%20Here-blue?style=for-the-badge"/>
  </a>
  <a href="https://solosolve-ai.lovable.app/" target="_blank">
    <img src="https://img.shields.io/badge/%F0%9F%9A%80%20Live%20Demo-Launch%20App-brightgreen?style=for-the-badge"/>
  </a>
</p>

A complete end-to-end MLOps project demonstrating how to transform raw customer complaints into precise, structured business insights.
This work showcases the journey from a complex 4B-parameter RAFT system to a **high-signal, low-noise, 270M multi-task classifier** that achieves **100% test accuracy** on all tasks for Amazon Fashion complaints.

---

# **1. Executive Summary**

### **Problem**

Automating complaint resolution requires interpreting noisy, unstructured text and converting it into structured business actions. Traditional approaches—retrieval pipelines, rule heuristics, and multi-step data synthesis—often inject noise and degrade downstream accuracy.

### **Solution**

We benchmarked two methodologies:

#### **Approach A: Retrieval-Augmented Fine-Tuning (RAFT) with Gemma 3-4B**

A complex multi-stage pipeline leveraging retrieval, policy grounding, and hierarchical prompts. Ultimately, retrieval noise led to unstable labels and poor task performance.

#### **Approach B: Direct Distillation with a Single Teacher Model**

A radically simpler and empirically superior pipeline:

1. **Gemini 2.5 Pro** generates a high-fidelity, 4.5k multi-task dataset via policy-guided prompting.
2. A compact **Gemma 3-270M** student model is fine-tuned using **QLoRA**.

### **Outcome**

The distilled 270M model reaches:

* **100% accuracy, precision, recall, and F1**
* Across **4 tasks:** actionability, info completeness, category, and resolution.

This demonstrates a key principle: **Data quality dominates model size and pipeline complexity** for narrow domains.

---

# **2. System Architecture**

<p align="center">
<img width="1024" alt="architecture" src="https://github.com/user-attachments/assets/dc410320-1372-4d1b-bc44-11ea9be05054">
</p>

The architecture includes:

### **Offline Pipeline**

* Data validation, filtering with DuckDB/Polars
* Synthetic dataset generation via Gemini 2.5 Pro
* QLoRA fine-tuning of Gemma 3-270M
* Artifact publishing to Hugging Face Hub

(See Mermaid diagrams in source README.)

### **Online Inference**

* Raw complaint → tokenizer → Gemma 270M
* Multi-head predictions → structured JSON output

---

# **3. Key Features**

* **Multi-task classification** (4 simultaneous predictions)
* **Tiny footprint (270M parameters)** → deployable on modest GPUs
* **Perfect test-set performance** across all tasks
* **Noise-resistant training pipeline**
* **Fully reproducible notebooks and training artifacts**

---

# **4. Repository Structure**

```
.
├── notebooks/
│   ├── 01_sft_data_generation.ipynb
│   └── 02_gemma3_multitask_finetune.ipynb
├── data/
│   └── raw/
├── models/
│   └── gemma-3-270m-fashion-multitask_v1/
├── scripts/
└── README.md
```

---

# **5. Technical Deep Dive**

### **5.1 Information Bottleneck Data Design**

Gemini transforms unstructured text into compact JSON labels that retain all task-relevant information while minimizing noise.
This mirrors **Information Bottleneck (IB)** dynamics: maximize (I(Z;Y)), minimize (I(X;Z)).

### **5.2 QLoRA**

Key components:

* **Low-Rank Adapters** ((r=16)): assume low intrinsic task dimensionality
* **NF4 Quantization**: optimal 4-bit representation for Gaussian-distributed weights

Together, they enable efficient, high-quality fine-tuning of compact models.

### **5.3 ADR: Pivot from RAFT to Direct Distillation**

* RAFT produced inconsistent labels due to retrieval noise.
* Direct distillation yielded a perfectly clean dataset.
* This allowed the small model to outperform the large one.

---

# **6. Installation**

1. Clone repo
2. Install dependencies inside notebooks
3. Set environment variables (`GOOGLE_API_KEY`, `HF_TOKEN`)
4. Run `01_...` then `02_...` notebooks sequentially

---

# **7. Model API**

`GemmaComplaintResolver` exposes:

* Multi-head outputs
* Loss computation
* JSON-structured inference output

Example output:

```json
{
  "is_actionable": true,
  "info_complete": true,
  "complaint_category": "Damaged or Defective",
  "resolution_recommendation": "Replacement"
}
```

---

# **8. Evaluation**

| Task                      | F1 (Fine-tuned) | F1 (Base) |
| ------------------------- | --------------- | --------- |
| is_actionable             | **1.00**        | 0.86      |
| info_complete             | **1.00**        | 0.96      |
| complaint_category        | **1.00**        | 0.12      |
| resolution_recommendation | **1.00**        | 0.19      |

Confusion matrices are perfect identity matrices.

---

# **9. Real-World Use Cases**

* Automated ticket triage
* First-response agent
* Product quality analytics
* Policy-aligned resolution engines

---

# **10. Roadmap (Paused Pending Funding)**

* **v1.1:** Cloud Run/Vertex AI microservice, monitoring & drift detection
* **v1.2:** Agentic resolution engine (LAM-like)
* **v2.0:** Continuous learning via RLAIF

---

# **11. Contribution Guidelines**

* Follow PEP 8
* PRs → `develop` branch
* Include tests for new features

---

# **12. License & Acknowledgements**

* **Apache 2.0**
* Thanks to Google (Gemma/Gemini), Hugging Face (Transformers, TRL, PEFT), McAuley Lab

---

# **SoloSolver Platform (Full System)**

<p align="center">
  <a href="https://solosolve-ai-demo.lovable.app/">
    <img src="https://img.shields.io/badge/%F0%9F%9A%80%20Live%20Demo-Online-green?style=for-the-badge"/>
  </a>
  <a href="https://github.com/solosolve-ai/solosolve-ai-demo">
    <img src="https://img.shields.io/badge/%F0%9F%92%BB%20GitHub%20Repo-Click%20Here-blue?style=for-the-badge"/>
  </a>
</p>

A modern, production-ready customer complaint resolution system with full-stack UI, RAG, UDP, multimodal inputs, and dual-model AI pipeline.

