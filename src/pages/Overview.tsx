import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, FileCheck, Users, AlertCircle, ArrowRight, Clock } from 'lucide-react';

const MetricCard = ({ title, value, sub, icon: Icon, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-card/40 backdrop-blur-md border border-white/5 p-5 rounded-2xl hover:border-indigo-500/30 transition-all hover:bg-card/60 group"
    >
        <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-white/5 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-indigo-400" />
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                +12.5%
            </span>
        </div>
        <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
        </div>
    </motion.div>
);

export default function Overview() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Overview</h2>
                    <p className="text-muted-foreground mt-1">System performance and latest analysis metrics.</p>
                </div>
                <Link to="/upload" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center gap-2">
                    New Analysis <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard title="Total Reports" value="1,284" icon={FileCheck} delay={0.1} />
                <MetricCard title="Avg. Confidence" value="94.2%" icon={Activity} delay={0.2} />
                <MetricCard title="Disagreement Rate" value="3.1%" icon={AlertCircle} delay={0.3} />
                <MetricCard title="Evidence Cases" value="8,492" icon={Users} delay={0.4} />
            </div>

            {/* Recent Activity / Pipeline Viz Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="lg:col-span-2 bg-card/30 backdrop-blur-md border border-white/5 rounded-3xl p-6 min-h-[300px]"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">System Pipeline Activity</h3>
                        <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                    </div>

                    {/* Mock Pipeline Visual */}
                    <div className="relative pt-8 pb-4">
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
                        <div className="flex justify-between relative z-10">
                            {['Ingestion', 'Preprocessing', 'Inference', 'Retrieval', 'Weighting', 'Generation'].map((step, i) => (
                                <div key={step} className="flex flex-col items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-indigo-500 border-4 border-background shadow-[0_0_10px_#6366f1]"></div>
                                    <span className="text-xs text-muted-foreground font-medium">{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-card/30 backdrop-blur-md border border-white/5 rounded-3xl p-6"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Latest Report</h3>
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5 font-mono text-sm text-indigo-100/80 leading-relaxed">
                        <div className="flex items-center gap-2 mb-3 text-xs text-indigo-400">
                            <Clock className="w-3 h-3" /> 2 mins ago
                        </div>
                        <p>"Examination reveals cardiomegaly with mild pulmonary edema. No evidence of pneumothorax. Support device in stable position..."</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
