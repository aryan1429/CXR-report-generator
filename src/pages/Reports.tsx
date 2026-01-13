import { motion } from 'framer-motion';
import { useState } from 'react';
import { FileText, Download, Printer, ExternalLink, AlertCircle, CheckCircle, Info, ChevronRight } from 'lucide-react';

const sampleReport = {
    patientId: 'P-4921',
    studyDate: '2026-01-13',
    modality: 'Chest X-Ray (PA)',
    referringPhysician: 'Dr. R. Patel',
    findings: [
        { text: 'The cardiac silhouette is mildly enlarged', evidence: ['cxr-1024', 'cxr-2201'], confidence: 0.94 },
        { text: 'with cardiothoracic ratio greater than 0.5.', evidence: ['cxr-1024'], confidence: 0.92 },
        { text: 'The lungs are clear bilaterally', evidence: ['cxr-2201', 'cxr-0592'], confidence: 0.89 },
        { text: 'with no focal consolidation, pleural effusion, or pneumothorax.', evidence: ['cxr-2201'], confidence: 0.95 },
        { text: 'The mediastinal contours are within normal limits.', evidence: ['cxr-2201'], confidence: 0.91 },
        { text: 'Bony structures appear intact.', evidence: [], confidence: 0.88 },
    ],
    impression: 'Mild cardiomegaly. No acute cardiopulmonary process.',
    uncertaintyNote: 'A minority of retrieved cases (20%) suggested possible early pulmonary edema, which warrants clinical correlation.',
};

function EvidenceHighlight({ text, evidence, confidence }: { text: string; evidence: string[]; confidence: number }) {
    const [showTooltip, setShowTooltip] = useState(false);
    const hasEvidence = evidence.length > 0;

    return (
        <span className="relative inline">
            <span
                onMouseEnter={() => hasEvidence && setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className={`
          ${hasEvidence ? 'border-b-2 border-indigo-500/50 cursor-pointer hover:bg-indigo-500/10 transition-colors' : ''}
        `}
            >
                {text}{' '}
            </span>
            {showTooltip && hasEvidence && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 top-full mt-1 z-10 bg-gray-900 border border-white/20 rounded-lg p-3 shadow-xl min-w-[200px]"
                >
                    <p className="text-xs text-gray-400 mb-2">Grounded in evidence:</p>
                    <div className="space-y-1">
                        {evidence.map(id => (
                            <div key={id} className="flex items-center gap-2 text-xs">
                                <span className="font-mono text-indigo-400">#{id}</span>
                                <ChevronRight className="w-3 h-3 text-gray-500" />
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/10">
                        <span className="text-xs text-gray-400">Confidence: </span>
                        <span className="text-xs font-semibold text-emerald-400">{(confidence * 100).toFixed(0)}%</span>
                    </div>
                </motion.div>
            )}
        </span>
    );
}

export default function Reports() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Generated Report</h2>
                    <p className="text-gray-400 mt-1">Evidence-grounded radiology report with uncertainty awareness.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all">
                        <Printer className="w-4 h-4" />
                        Print
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all">
                        <Download className="w-4 h-4" />
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Report */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-white/10 p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-500/20 rounded-lg">
                                    <FileText className="w-6 h-6 text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Radiology Report</h3>
                                    <p className="text-sm text-gray-400">AI-Generated, Evidence-Grounded</p>
                                </div>
                            </div>
                            <span className="flex items-center gap-1 text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">
                                <CheckCircle className="w-3 h-3" /> Verified
                            </span>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-white/10 bg-black/20">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Patient ID</p>
                            <p className="text-sm font-medium text-white">{sampleReport.patientId}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Study Date</p>
                            <p className="text-sm font-medium text-white">{sampleReport.studyDate}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Modality</p>
                            <p className="text-sm font-medium text-white">{sampleReport.modality}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Referring</p>
                            <p className="text-sm font-medium text-white">{sampleReport.referringPhysician}</p>
                        </div>
                    </div>

                    {/* Report Body */}
                    <div className="p-6 space-y-6">
                        <div>
                            <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">Findings</h4>
                            <p className="text-gray-200 leading-relaxed">
                                {sampleReport.findings.map((f, i) => (
                                    <EvidenceHighlight key={i} text={f.text} evidence={f.evidence} confidence={f.confidence} />
                                ))}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">Impression</h4>
                            <p className="text-white font-medium text-lg">{sampleReport.impression}</p>
                        </div>

                        {/* Uncertainty Note */}
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-amber-300 mb-1">Uncertainty Note</h4>
                                    <p className="text-sm text-amber-200/70">{sampleReport.uncertaintyNote}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                >
                    {/* Evidence Summary */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                            <Info className="w-4 h-4 text-indigo-400" />
                            Evidence Grounding
                        </h4>
                        <p className="text-sm text-gray-400 mb-4">
                            Hover over <span className="border-b-2 border-indigo-500/50">underlined text</span> in the report to see
                            which evidence cases support each finding.
                        </p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Grounded statements</span>
                                <span className="text-white font-semibold">5/6</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Avg. confidence</span>
                                <span className="text-emerald-400 font-semibold">91.5%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Evidence cases used</span>
                                <span className="text-white font-semibold">3</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <h4 className="text-sm font-semibold text-white mb-4">Quick Actions</h4>
                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm text-gray-300">
                                <span>View Evidence Cases</span>
                                <ExternalLink className="w-4 h-4" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm text-gray-300">
                                <span>Compare with Similar</span>
                                <ExternalLink className="w-4 h-4" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-sm text-gray-300">
                                <span>Request Review</span>
                                <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
