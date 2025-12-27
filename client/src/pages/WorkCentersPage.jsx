import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Search, Filter, Plus, MoreHorizontal } from 'lucide-react';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const WorkCentersPage = () => {
    const navigate = useNavigate();
    const [workCenters, setWorkCenters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWorkCenters();
    }, []);

    const fetchWorkCenters = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/work-centers', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('gearguard_token')}`
                }
            });
            const data = await response.json();

            if (data.success) {
                // Transform data to match table display format
                const transformed = data.workCenters.map(wc => ({
                    id: wc.id,
                    name: wc.name,
                    code: wc.code,
                    tag: wc.tag,
                    alternativeWorkcenters: [], // This field doesn't exist yet in DB
                    costPerHour: parseFloat(wc.cost_per_hour) || 0,
                    capacity: parseFloat(wc.capacity) || 0,
                    oeeTarget: parseFloat(wc.efficiency_target) || 0
                }));
                setWorkCenters(transformed);
            } else {
                toast.error('Failed to load work centers');
            }
        } catch (error) {
            console.error('Fetch work centers error:', error);
            toast.error('Error loading work centers');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center py-10 text-text-secondary">Loading work centers...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Work Centers</h1>
                    <p className="text-text-secondary text-sm">Manage manufacturing units and assembly lines.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>
                    <Button variant="primary" className="gap-2" onClick={() => navigate('/dashboard/create-work-center')}>
                        <Plus className="w-4 h-4" />
                        Create
                    </Button>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-[#161B22] border border-white/10 rounded-xl overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-white/10 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Search work centers..."
                            className="w-full bg-background-primary/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-primary focus:bg-background-primary transition-all"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-text-secondary font-medium">
                                <th className="px-6 py-4">Work Center</th>
                                <th className="px-6 py-4">Code</th>
                                <th className="px-6 py-4">Tag</th>
                                <th className="px-6 py-4">Alt. Centers</th>
                                <th className="px-6 py-4 text-right">Cost/Hr</th>
                                <th className="px-6 py-4 text-right">Capacity</th>
                                <th className="px-6 py-4 text-right">Eff. Target</th>
                                <th className="px-6 py-4 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {workCenters.map((wc) => (
                                <tr key={wc.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4 font-medium text-text-primary">{wc.name}</td>
                                    <td className="px-6 py-4 text-text-muted font-mono text-xs">{wc.code}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-text-secondary">
                                            {wc.tag}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-text-muted">
                                        {wc.alternativeWorkcenters.length > 0 ? (
                                            <span className="truncate max-w-[150px] block" title={wc.alternativeWorkcenters.join(', ')}>
                                                {wc.alternativeWorkcenters.length} defined
                                            </span>
                                        ) : (
                                            <span className="text-text-muted/40">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right text-text-primary">${wc.costPerHour.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right text-text-muted">{wc.capacity.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right text-accent-primary font-medium">{wc.oeeTarget.toFixed(2)}%</td>
                                    <td className="px-6 py-4">
                                        <button className="p-1 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination Stub */}
                <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-text-muted">
                    <span>Showing {workCenters.length} of {workCenters.length} entries</span>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" disabled>Previous</Button>
                        <Button variant="ghost" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkCentersPage;
