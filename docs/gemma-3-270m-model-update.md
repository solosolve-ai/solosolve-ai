# Gemma 3-270m Model Update

## Overview

We have updated our AI complaint classification system to use the new Gemma 3-270m model with multi-task fine-tuning. This provides more accurate and efficient complaint processing.

## Model Architecture

### Base Model
- **Model**: `google/gemma-3-270m`
- **Architecture**: Transformer-based language model with 270M parameters
- **Fine-tuning Method**: QLoRA (Quantized Low-Rank Adaptation)

### Multi-Task Classification Heads

The model performs simultaneous classification on four tasks:

1. **is_actionable** (Binary)
   - `0`: Not actionable (general inquiries, greetings)
   - `1`: Actionable (specific complaints requiring resolution)

2. **info_complete** (Binary)
   - `0`: Information incomplete (needs more details)
   - `1`: Information complete (sufficient details provided)

3. **complaint_category** (5 classes)
   - "Damaged or Defective"
   - "Item Not as Described"
   - "Incorrect Size / Fit"
   - "Wrong or Incomplete Order"
   - "N/A" (for non-complaints)

4. **resolution_recommendation** (4 classes)
   - "Full Refund"
   - "Replacement"
   - "Resend"
   - "N/A" (for non-actionable items)

## Training Data Format

The model expects training data in the following CSV format:

```csv
text,product_title,price,rating,info_complete,is_actionable,complaint_category,resolution_recommendation
"The dress I received was damaged","Evening Dress",89.99,1,1,1,"Damaged or Defective","Full Refund"
```

## Prompt Format

The model uses a specific prompt format during inference:

```
<start_of_turn>user
Analyze the following customer complaint about an Amazon Fashion product.

### Product Information ###
Title: {product_title}
Price: ${price}
Customer's Rating: {rating}/5

### Customer Complaint ###
Text: "{complaint_text}"
<end_of_turn>
<start_of_turn>model
```

## Expected Output

The model generates structured JSON output:

```json
{
  "complaint_category": "Damaged or Defective",
  "resolution_recommendation": "Full Refund", 
  "is_actionable": true,
  "info_complete": true
}
```

## Integration

### Edge Function Update

The Supabase edge function has been updated to:
1. Use the new Gemma 3-270m model endpoint
2. Format prompts according to the training template
3. Parse multi-task classification outputs
4. Provide enhanced fallback classification

### Model Deployment

Once trained, the model should be uploaded to Hugging Face Hub and the edge function updated with the new model ID:

```typescript
const huggingFaceResponse = await fetch(
  'https://api-inference.huggingface.co/models/YOUR_USERNAME/gemma-3-270m-fashion-multitask',
  // ... rest of the configuration
);
```

## Performance Benefits

- **Smaller Model**: 270M parameters vs 4B (previous model)
- **Multi-Task Learning**: Single model handles all classification tasks
- **Better Accuracy**: Fine-tuned specifically on fashion complaint data
- **Faster Inference**: Smaller model size enables quicker responses
- **Cost Efficiency**: Lower computational requirements

## Training Configuration

Key hyperparameters used:
- LoRA rank: 16
- Learning rate: 1e-4
- Batch size: 1 (with gradient accumulation)
- Epochs: 1
- Quantization: 4-bit with NF4
- Target modules: All attention and MLP layers

## Usage Instructions

1. Train the model using the provided notebook
2. Upload trained model to Hugging Face Hub  
3. Update the edge function with new model ID
4. Test with sample complaints
5. Monitor performance metrics

## Data Requirements

For optimal performance, training data should include:
- Diverse complaint types across all categories
- Balanced representation of actionable vs non-actionable items
- Complete product information (title, price, rating)
- Clear resolution labels

## Monitoring & Evaluation

The system tracks:
- Classification accuracy per task
- Response time metrics
- Model confidence scores
- User feedback on resolutions
