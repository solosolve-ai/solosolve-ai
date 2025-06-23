![image](https://github.com/user-attachments/assets/18c2c4e3-7823-4107-8cc7-afda5ac0875d)

![demo](https://github.com/solosolve-ai/solosolve-ai/blob/main/docs/solosolve_website-demo.gif)

<p align="center">
  <a href="https://solosolve-ai-demo.lovable.app/" target="_blank">
    <img src="https://img.shields.io/badge/%F0%9F%9A%80%20Live%20Demo-Online-green?style=for-the-badge" alt="Live Demo"/>
  </a>
  <a href="https://github.com/solosolve-ai/solosolve-ai-demo" target="_blank">
    <img src="https://img.shields.io/badge/%F0%9F%92%BB%20GitHub%20Repo-Click%20Here-blue?style=for-the-badge" alt="Dev Repo"/>
  </a>
</p>

# **Your SoloSolver**

![demo](https://github.com/solosolve-ai/solosolve-ai/blob/main/docs/solosolve-demo.gif)

An AI-powered customer complaint resolution system for Amazon Fashion, built with a modern full-stack architecture, state-of-the-art MLOps, advanced data engineering, and dual AI models for multi-task complaint analysis and response generation. The project, including the core AI component (Model v1) and a fully functional website, is complete and production-ready.

---
## 🌟 **Project Vision**

![image](https://github.com/user-attachments/assets/82da3298-4a29-444e-a45f-a74cc921a159)

SoloSolver delivers a highly accurate, scalable, and empathetic customer complaint resolution system for Amazon Fashion. It leverages multimodal inputs, deep contextual understanding via Retrieval-Augmented Generation (RAG), robust data engineering, and advanced AI models to provide fair, consistent, and personalized support, enhancing customer satisfaction and operational efficiency.
---
## 🚀 **Core Features**

SoloSolver is a comprehensive platform combining a sophisticated AI engine with a modern web interface for seamless complaint management.

### **1. Dual AI-Powered Resolution Engine**
- **Classification AI (Model v1, Gemma 3-4B)**: Fine-tuned google/gemma-3-4b-it using QLoRA for multi-task classification across eight tasks (is_actionable, complaint_category, decision_recommendation, info_complete, tone, refund_percentage, sentiment, aggression). Achieves high accuracy with optimized hyperparameters (3 epochs, 5e-5 learning rate, LoRA r=32/alpha=64).
- **Response Generation AI (Gemini 2.0 Flash)**: Generates context-aware, policy-grounded responses with a professional tone, using dynamic prompt engineering and RAG with transaction history.
- **Smart Fallback System: Keyword-based classification and pattern recognition for robust handling of edge cases.

### **2. Advanced RAG & Contextual Understanding**
- **Dynamic Policy Retrieval**: Semantic vector search using ChromaDB and Vertex AI on a chunked Policy Database for policy-aligned resolutions.
- **Dynamic User Profiling (UDP)**: Real-time user profile generation from historical interactions, purchase value, and complaint patterns for personalized resolutions.
- **RAFT Pipeline**: Retrieval-Augmented Fine-Tuning (RAFT) generates high-quality, multi-label synthetic datasets for training.nt patterns to provide personalized and fair resolutions.

### **3. Multimodal Complaint Analysis**
- **Conceptual Image Analysis:** Conceptual Image Analysis: Infers context from complaint text for user-submitted images (e.g., "item arrived damaged").
- **File Upload Support**: Secure handling of complaint evidence via the web interface.

### **4. Scalable Data Engineering Backbone**
- **Modern Data Stack:** Supabase PostgreSQL: Manages simulated_users, profiles, transaction_history, ai_interactions, chat_sessions, and chat_messages tables with Row Level Security (RLS), full-text search, and JSONB columns.
- **Automated SFT Data Curation:** Employs stratified sampling and SQL UDFs within BigQuery to programmatically curate a high-quality, balanced Supervised Fine-Tuning (SFT) dataset, ensuring model robustness.

### **5. Modern Frontend & User Experience**
- **Multi-Role Dashboards**: Customer portal for complaint submission/tracking, manager dashboard for analytics, and admin dashboard for system control.
- **Interactive Features**: Real-time AI chat with progress indicators, file uploads, star-based feedback (1-10), responsive design, and RTL (Hebrew) support.
- **Advanced Chat Interface**: Auto-expanding text areas, AI progress visualization, real-time typing indicators, and session persistence.
---

## 🛠️ **Tech Stack**

Our stack is optimized for scalability, performance, and maintainability across frontend, backend, AI, and infrastructure.

| Category                | Technologies & Tools                                                                                           |
|-------------------------|---------------------------------------------------------------------------------------------------------------|
| **Frontend**            | React 18.3.1, TypeScript, Vite, React Router DOM v6, Tailwind CSS, Shadcn/UI, Framer Motion, Lucide React, Next Themes, TanStack React Query v5, React Hook Form, Zod, Embla Carousel, Recharts, React Day Picker, React Resizable Panels, Sonner |
| **Backend & Database**  | Supabase PostgreSQL (RLS, full-text search, JSONB), Deno Edge Functions, FastAPI, Google Cloud Run (GPU)         |
| **Cloud & Data Platform** | Google Cloud Platform (GCP), Google Cloud Storage (GCS), BigQuery, Google Dataproc/Spark                       |
| **Data Engineering & ETL** | `dbt`, Pandas, Parquet                                                                                       |
| **Model & AI Frameworks** | PyTorch, Hugging Face `transformers`, `peft` (QLoRA), `trl` (SFT, DPO), `bitsandbytes` (4-bit Q), LangChain, LlamaIndex |
| **LLM & RAG**           | Google Gemma-3 (4B), Gemini 2.0 Flash, ChromaDB, Vertex AI Vector Search, HuggingFace Inference API            |
| **MLOps & Deployment**  | Docker, Vertex AI (Experiments, Model Registry, Pipelines), Google Cloud Run, Supabase Auth                    |
| **Evaluation & Analysis** | `evaluate` (ROUGE, BLEU, BERTScore), Scikit-learn, Matplotlib, Seaborn                                        |
| **Development Tools**   | ESLint, PostCSS, TypeScript ESLint, Lovable Tagger, Vite (HMR, optimized bundling)                            |

---

## 🗂️ **Data Sources**

The core datasets for training, analysis, and operation are sourced from:

- **Raw Amazon Fashion Reviews:** `McAuley-Lab/Amazon-Reviews-2023` (config: `raw_review_Amazon_Fashion`)
- **Raw Amazon Fashion Metadata:** `McAuley-Lab/Amazon-Reviews-2023` (config: `raw_meta_Amazon_Fashion`)
- **Synthetic SFT Dataset:** RAFT-generated JSONL dataset for fine-tuning Model v1
- **Transaction History:** Supabase PostgreSQL `transaction_history` table for RAG and analytics

---

## 📊 **Evaluation & Metrics**

The system is rigorously evaluated for AI performance and user experience.

- **Generation Quality:** Measured with **ROUGE-L, BLEU, BERTScore**, and **JSON Schema Adherence Rate** for Gemini 2.0 Flash responses.
- **Classification Accuracy (Model v1):** Measured with **F1-Score, Precision, Recall, ROC AUC** across eight tasks, achieving near-perfect performance on key tasks (see project report for details).
- **Performance:** Includes **inference latency** and **GPU memory usage** benchmarks for quantized models.
- **User Experience:** Measured via star-based feedback (1-10) and complaint resolution metrics.
- **Qualitative Analysis:** Model v1 significantly outperforms the base Gemma-3 model, validated through confusion matrices and minimal misclassification.

---

## 🗠️ **Project Status**

SoloSolver is fully completed, with all phases implemented, delivering a production-ready service.

| Phase                                     | Status  | Key Deliverables                                                                                                                                                            |
|-------------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Phase 1: SOTA Foundation & Core Model** | Completed | Fine-tuned Gemma Model (v1, `gemma-3-4b432625-abc`), RAFT pipeline, evaluation report, Docker environment |
| **Phase 2: Cloud Integration & Advanced RAG** | Completed | Vertex AI Pipeline for CI/CD/CT, Vertex AI Vector Search, HuggingFace API integration, SupabaseSQL, operational dashboards |
| **Phase 3: Agentic Capabilities & Continuous Learning** | Completed | LangChain-based agent with ReAct framework, DPO-tuned model from feedback, continuous learning loop, exploration of true multimodal |

**Model Availability:** Available at [HuggingFace Hub](https://huggingface.co/208432625/ab-c1).

---

## 👥 **Collaborators**

- **Shoval Benjer**
- **Adir Almar** 
- **Alon Berkov** 

---

## 🌍 **Get Involved**

We value collaboration! Explore our [GitHub Repository](https://github.com/solosolve-ai/solosolve-ai) to contribute, provide feedback or source code. If the repository is private, please contact one of our collaborators for access.

---

Join us in celebrating SoloSolver, a transformative AI-powered customer service platform for Amazon Fashion.
```

