# Gemma 3-270m Fine-Tuning Notebook

## Files in this directory

### Training Notebooks
- `Gemini_SFT_Generation (2).ipynb` - Data generation and preprocessing
- `Gemma3FineTune_(5)_(4).ipynb` - Main training notebook
- `Apify_Scraping_Attempt_WOLT_GOOGLEMAPS.ipynb` - Data collection attempts

### Data Files  
- `../cleaned_csv_sample.csv` - Cleaned training data in the correct format

## Training Process

### 1. Data Preparation
The training data should be in CSV format with these columns:
- `text`: The customer complaint text
- `product_title`: Name of the product
- `price`: Product price
- `rating`: Customer rating (1-5)
- `info_complete`: Binary label (0/1)
- `is_actionable`: Binary label (0/1) 
- `complaint_category`: One of ["Damaged or Defective", "Item Not as Described", "Incorrect Size / Fit", "Wrong or Incomplete Order", "N/A"]
- `resolution_recommendation`: One of ["Full Refund", "Replacement", "Resend", "N/A"]

### 2. Model Training
The notebook includes:
- **Data Loading**: Reads CSV and processes labels
- **Model Setup**: Loads Gemma 3-270m with custom classification heads
- **QLoRA Configuration**: 4-bit quantization with LoRA adapters
- **Multi-Task Training**: Simultaneous training on all classification tasks
- **Evaluation**: Comprehensive metrics and visualizations

### 3. Model Architecture
```
GemmaComplaintResolver
├── Base Model: google/gemma-3-270m (QLoRA)
├── Classification Head: is_actionable (2 classes)
├── Classification Head: info_complete (2 classes) 
├── Classification Head: complaint_category (5 classes)
└── Classification Head: resolution_recommendation (4 classes)
```

### 4. Training Configuration
- **Base Model**: google/gemma-3-270m
- **Fine-tuning**: QLoRA with 4-bit quantization
- **LoRA Rank**: 16
- **Learning Rate**: 1e-4
- **Batch Size**: 1 (8 gradient accumulation steps)
- **Epochs**: 1
- **Sequence Length**: 2048 tokens

### 5. Output Artifacts
After training, the following files are created:
- `lora_adapter/`: LoRA adapter weights
- `classification_heads.pth`: Classification head weights
- `tokenizer/`: Tokenizer files
- `evaluation_results/`: Performance metrics and plots

### 6. Deployment
Once trained:
1. Push model to Hugging Face Hub
2. Update edge function with new model ID
3. Test integration with sample complaints
4. Monitor performance in production

## Usage Example

```python
# Load trained model for inference
model = load_inference_model(is_finetuned=True)
predictions, ground_truths = get_all_predictions(model, eval_dataset, tokenizer)
```

## Performance Metrics
The training process generates:
- Accuracy scores for each classification task
- Confusion matrices
- F1-score comparisons
- Training loss curves
- Radar charts showing performance improvements

## Integration with SoloSolver
The trained model integrates with the SoloSolver complaint management system through:
- Supabase Edge Functions for inference
- Real-time classification of incoming complaints  
- Structured JSON responses for downstream processing
- Fallback mechanisms for robustness