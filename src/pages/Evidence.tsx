import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X, FileText, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { SAMPLE_CASES, XRayCase } from '../utils/sampleData';

type SortOption = 'weight' | 'similarity' | 'confidence' | 'disagreement';
type FilterLabel = 'all' | 'Normal' | 'Cardiomegaly' | 'Pneumonia' | 'Effusion' | 'Pneumothorax';

const labelColors: Record<string, string> = {
    Normal: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Cardiomegaly: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    Pneumonia: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Effusion: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Pneumothorax: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

function EvidenceCard({ caseData, index }: { caseData: XRayCase; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:border-indigo-500/30 transition-all group"
        >
            <div className="flex items-start gap-4">
                {/* Mock X-ray thumbnail */}
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-700/50 to-transparent flex items-center justify-center text-gray-600">
                        <FileText className="w-8 h-8" />
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-mono text-gray-500">#{caseData.id}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${labelColors[caseData.label] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                            {caseData.label}
                        </span>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Evidence Weight</span>
                            <span className="text-indigo-400 font-semibold">{(caseData.weight * 100).toFixed(0)}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${caseData.weight * 100}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-3">
                            <div className="bg-white/5 rounded-lg p-2 text-center">
                                <p className="text-xs text-gray-500">Similarity</p>
                                <p className="text-sm font-semibold text-white">{(caseData.similarity * 100).toFixed(0)}%</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-2 text-center">
                                <p className="text-xs text-gray-500">Confidence</p>
                                <p className="text-sm font-semibold text-white">{(caseData.confidence * 100).toFixed(0)}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expandable report snippet */}
            <motion.div layout className="mt-4">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
                >
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    {isExpanded ? 'Hide' : 'Show'} Report Snippet
                </button>
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <p className="mt-3 text-sm text-gray-300 bg-black/30 rounded-lg p-3 font-mono leading-relaxed">
                                "{caseData.reportSnippet}"
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}

export default function Evidence() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('weight');
    const [filterLabel, setFilterLabel] = useState<FilterLabel>('all');
    const [showFilters, setShowFilters] = useState(false);

    const filteredAndSorted = useMemo(() => {
        let cases = [...SAMPLE_CASES];

        // Filter by label
        if (filterLabel !== 'all') {
            cases = cases.filter(c => c.label === filterLabel);
        }

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            cases = cases.filter(c =>
                c.id.toLowerCase().includes(query) ||
                c.finding.toLowerCase().includes(query) ||
                c.reportSnippet.toLowerCase().includes(query)
            );
        }

        // Sort
        cases.sort((a, b) => {
            switch (sortBy) {
                case 'weight': return b.weight - a.weight;
                case 'similarity': return b.similarity - a.similarity;
                case 'confidence': return b.confidence - a.confidence;
                case 'disagreement': return a.disagreementScore - b.disagreementScore;
                default: return 0;
            }
        });

        return cases;
    }, [searchQuery, sortBy, filterLabel]);

    const labels: FilterLabel[] = ['all', 'Normal', 'Cardiomegaly', 'Pneumonia', 'Effusion', 'Pneumothorax'];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">Evidence Explorer</h2>
                <p className="text-gray-400 mt-1">Browse and analyze retrieved evidence cases with their computed weights.</p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by ID, finding, or report content..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all"
                    />
                </div>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${showFilters ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                </button>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                >
                    <option value="weight">Highest Weight</option>
                    <option value="similarity">Highest Similarity</option>
                    <option value="confidence">Highest Confidence</option>
                    <option value="disagreement">Lowest Disagreement</option>
                </select>
            </div>

            {/* Filter Pills */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="flex flex-wrap gap-2 p-4 bg-white/5 rounded-xl border border-white/10">
                            <span className="text-sm text-gray-400 mr-2">Filter by label:</span>
                            {labels.map(label => (
                                <button
                                    key={label}
                                    onClick={() => setFilterLabel(label)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${filterLabel === label ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/50' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}
                                >
                                    {label === 'all' ? 'All' : label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stats Bar */}
            <div className="flex items-center gap-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-indigo-400" />
                    <span className="text-sm text-gray-400">Showing <span className="text-white font-semibold">{filteredAndSorted.length}</span> cases</span>
                </div>
                {filterLabel !== 'all' && (
                    <button
                        onClick={() => setFilterLabel('all')}
                        className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300"
                    >
                        <X className="w-3 h-3" /> Clear filter
                    </button>
                )}
            </div>

            {/* Evidence Grid */}
            <LayoutGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredAndSorted.map((caseData, index) => (
                            <EvidenceCard key={caseData.id} caseData={caseData} index={index} />
                        ))}
                    </AnimatePresence>
                </div>
            </LayoutGroup>

            {filteredAndSorted.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No evidence cases match your criteria.</p>
                </div>
            )}
        </div>
    );
}
