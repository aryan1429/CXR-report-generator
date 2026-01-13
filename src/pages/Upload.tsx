import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { UploadCloud, Loader2, CheckCircle2, Brain, Database, Scale, AlertTriangle, FileText } from 'lucide-react';
import { PIPELINE_STEPS } from '../utils/sampleData';

type AnalysisState = 'idle' | 'uploading' | 'analyzing' | 'complete';

const pipelineIcons: Record<string, React.ElementType> = {
    upload: UploadCloud,
    cnn: Brain,
    retrieval: Database,
    weighting: Scale,
    disagreement: AlertTriangle,
    generation: FileText,
};

export default function Upload() {
    const [state, setState] = useState<AnalysisState>('idle');
    const [currentStep, setCurrentStep] = useState(0);
    const [isDragOver, setIsDragOver] = useState(false);

    const runAnalysis = useCallback(() => {
        setState('uploading');
        setCurrentStep(0);

        let stepIndex = 0;
        const runNextStep = () => {
            if (stepIndex < PIPELINE_STEPS.length) {
                setCurrentStep(stepIndex);
                setTimeout(() => {
                    stepIndex++;
                    runNextStep();
                }, PIPELINE_STEPS[stepIndex].duration);
            } else {
                setState('complete');
            }
        };

        setTimeout(() => {
            setState('analyzing');
            runNextStep();
        }, 1000);
    }, []);

    const resetAnalysis = () => {
        setState('idle');
        setCurrentStep(0);
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Upload & Analysis</h2>
                <p className="text-gray-400 mt-1">Upload a chest X-ray image to generate an evidence-grounded report.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Zone */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); runAnalysis(); }}
                        className={`
              relative overflow-hidden rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-300
              ${isDragOver ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}
              ${state !== 'idle' ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            `}
                        onClick={() => state === 'idle' && runAnalysis()}
                    >
                        <AnimatePresence mode="wait">
                            {state === 'idle' && (
                                <motion.div
                                    key="idle"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="space-y-4"
                                >
                                    <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                                        <UploadCloud className="w-8 h-8 text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-medium text-white">Drop your X-ray image here</p>
                                        <p className="text-sm text-gray-500 mt-1">or click to select a file (DICOM, PNG, JPG)</p>
                                    </div>
                                </motion.div>
                            )}
                            {(state === 'uploading' || state === 'analyzing') && (
                                <motion.div
                                    key="processing"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-4"
                                >
                                    <Loader2 className="w-12 h-12 text-indigo-400 mx-auto animate-spin" />
                                    <p className="text-white font-medium">
                                        {state === 'uploading' ? 'Uploading image...' : `Running: ${PIPELINE_STEPS[currentStep]?.label || 'Processing...'}`}
                                    </p>
                                </motion.div>
                            )}
                            {state === 'complete' && (
                                <motion.div
                                    key="complete"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="space-y-4"
                                >
                                    <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <p className="text-lg font-medium text-emerald-400">Analysis Complete!</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {state === 'complete' && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={resetAnalysis}
                            className="mt-4 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
                        >
                            Run New Analysis
                        </motion.button>
                    )}
                </motion.div>

                {/* Pipeline Visualization */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6"
                >
                    <h3 className="text-lg font-semibold text-white mb-6">Analysis Pipeline</h3>
                    <div className="space-y-4">
                        {PIPELINE_STEPS.map((step, index) => {
                            const Icon = pipelineIcons[step.id] || Brain;
                            const isActive = state === 'analyzing' && currentStep === index;
                            const isComplete = state === 'analyzing' ? currentStep > index : state === 'complete';

                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`
                    flex items-center gap-4 p-4 rounded-xl border transition-all duration-300
                    ${isActive ? 'bg-indigo-500/20 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.2)]' : ''}
                    ${isComplete ? 'bg-emerald-500/10 border-emerald-500/30' : ''}
                    ${!isActive && !isComplete ? 'bg-white/5 border-white/10' : ''}
                  `}
                                >
                                    <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                    ${isActive ? 'bg-indigo-500/30' : ''}
                    ${isComplete ? 'bg-emerald-500/30' : ''}
                    ${!isActive && !isComplete ? 'bg-white/10' : ''}
                  `}>
                                        {isActive ? (
                                            <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                                        ) : isComplete ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                        ) : (
                                            <Icon className="w-5 h-5 text-gray-500" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-medium ${isActive ? 'text-indigo-300' : isComplete ? 'text-emerald-300' : 'text-gray-400'}`}>
                                            {step.label}
                                        </p>
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            transition={{ duration: step.duration / 1000, ease: 'linear' }}
                                            className="absolute bottom-0 left-0 h-0.5 bg-indigo-500 rounded-full"
                                        />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Results Preview (shown on complete) */}
            <AnimatePresence>
                {state === 'complete' && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6"
                    >
                        <h3 className="text-lg font-semibold text-white mb-4">Generated Report Preview</h3>
                        <div className="bg-black/30 rounded-xl p-6 font-mono text-sm text-indigo-100/80 leading-relaxed">
                            <p className="mb-4">
                                <strong className="text-indigo-400">FINDINGS:</strong> The cardiac silhouette is mildly enlarged.
                                The lungs are clear bilaterally with no focal consolidation, pleural effusion, or pneumothorax.
                                The mediastinal contours are within normal limits.
                            </p>
                            <p>
                                <strong className="text-indigo-400">IMPRESSION:</strong> Mild cardiomegaly. No acute cardiopulmonary process.
                            </p>
                        </div>
                        <div className="mt-4 flex gap-3">
                            <button className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-all">
                                View Full Report
                            </button>
                            <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium text-sm transition-all">
                                View Evidence
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
