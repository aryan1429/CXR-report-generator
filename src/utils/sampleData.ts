export interface XRayCase {
    id: string;
    patientId: string;
    modality: string;
    finding: string;
    confidence: number;
    similarity: number;
    weight: number;
    disagreementScore: number;
    reportSnippet: string;
    label: string;
    imageUrl: string;
}

export const SAMPLE_CASES: XRayCase[] = [
    {
        id: "cxr-1024",
        patientId: "P-4921",
        modality: "CXR",
        finding: "Cardiomegaly",
        confidence: 0.94,
        similarity: 0.88,
        weight: 0.82,
        disagreementScore: 0.1,
        reportSnippet: "Cardiac silhouette is enlarged with CTR > 0.5. No obvious pulmonary edema.",
        label: "Cardiomegaly",
        imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        id: "cxr-0592",
        patientId: "P-3810",
        modality: "CXR",
        finding: "Pneumonia",
        confidence: 0.89,
        similarity: 0.76,
        weight: 0.67,
        disagreementScore: 0.3,
        reportSnippet: "Opacification seen in the right lower lobe consistent with consolidation.",
        label: "Pneumonia",
        imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        id: "cxr-2201",
        patientId: "P-9002",
        modality: "CXR",
        finding: "No Finding",
        confidence: 0.98,
        similarity: 0.92,
        weight: 0.90,
        disagreementScore: 0.05,
        reportSnippet: "Lungs are clear. Heart size is normal. No pleural effusion.",
        label: "Normal",
        imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=300&h=300" // using placeholder duplicate for now
    },
    {
        id: "cxr-3312",
        patientId: "P-1123",
        modality: "CXR",
        finding: "Effusion",
        confidence: 0.72,
        similarity: 0.65,
        weight: 0.46,
        disagreementScore: 0.6,
        reportSnippet: "Blunting of the costophrenic angles suggests small pleural effusion.",
        label: "Effusion",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
        id: "cxr-9921",
        patientId: "P-7721",
        modality: "CXR",
        finding: "Pneumothorax",
        confidence: 0.81,
        similarity: 0.55,
        weight: 0.44,
        disagreementScore: 0.4,
        reportSnippet: "Small visualization of visceral pleural line in right apex.",
        label: "Pneumothorax",
        imageUrl: "https://images.unsplash.com/photo-1584036561566-b93a901e3ae3?auto=format&fit=crop&q=80&w=300&h=300"
    }
];

export const PIPELINE_STEPS = [
    { id: 'upload', label: 'Image Upload', duration: 1000 },
    { id: 'cnn', label: 'CNN Inference', duration: 2500 },
    { id: 'retrieval', label: 'FAISS Retrieval', duration: 2000 },
    { id: 'weighting', label: 'Evidence Weighting', duration: 1500 },
    { id: 'disagreement', label: 'Disagreement Check', duration: 1500 },
    { id: 'generation', label: 'Report Generation', duration: 2000 },
];
