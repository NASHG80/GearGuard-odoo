import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Package, FileText, ArrowLeft, DollarSign, Activity, Hash, Tag, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const CreateWorkCenterPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('notes');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        tag: 'Assembly',
        status: 'Active',
        costPerHour: '',
        capacity: '',
        efficiencyTarget: '',
        location: '',
        description: '',
        notes: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:5000/api/work-centers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('gearguard_token')}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Work Center created successfully!');
                navigate('/dashboard/work-centers');
            } else {
                toast.error(data.message || 'Failed to create work center');
            }
        } catch (error) {
            console.error('Submit error:', error);
            toast.error('Error creating work center');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-5xl mx-auto py-8 px-4">
            {/* Page Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-text-muted hover:text-text-primary"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white">Create Work Center</h1>
                    <p className="text-text-secondary text-sm mt-1">Set up a new manufacturing unit or assembly line.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Main Card */}
                <div className="bg-[#161B22] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">

                    {/* Header Status */}
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                        <span className="px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-bold border border-accent-primary/20">
                            New Work Center
                        </span>
                        <span className="text-text-muted text-sm flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-text-muted"></span>
                            Draft Entry
                        </span>
                    </div>

                    {/* Work Center Name - Prominent */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-text-secondary mb-2">Work Center Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="e.g. Assembly Line 1"
                            className="w-full bg-background-primary/30 text-xl font-semibold text-text-primary placeholder-text-muted/40 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-primary focus:outline-none focus:bg-background-primary/50 transition-all"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Code</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="code"
                                            required
                                            placeholder="AL-001"
                                            className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary pl-10"
                                            value={formData.code}
                                            onChange={handleChange}
                                        />
                                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Tag</label>
                                    <div className="relative">
                                        <select
                                            name="tag"
                                            value={formData.tag}
                                            onChange={handleChange}
                                            className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-3 text-text-primary appearance-none focus:outline-none focus:border-accent-primary text-sm"
                                        >
                                            <option value="Assembly">Assembly</option>
                                            <option value="Machining">Machining</option>
                                            <option value="Packaging">Packaging</option>
                                            <option value="Inspection">Inspection</option>
                                            <option value="Finishing">Finishing</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Status</label>
                                    <div className="relative">
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className={`w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-3 text-sm appearance-none focus:outline-none focus:border-accent-primary font-medium
                                                ${formData.status === 'Active' ? 'text-green-400' : 'text-text-muted'}
                                            `}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="Before Start">Before Start</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Cost / Hour</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="costPerHour"
                                            required
                                            min="0"
                                            step="0.01"
                                            placeholder="0.00"
                                            className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary pl-9"
                                            value={formData.costPerHour}
                                            onChange={handleChange}
                                        />
                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Location</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="e.g. Building A, Floor 1"
                                        className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary pl-10"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Capacity</label>
                                    <input
                                        type="number"
                                        name="capacity"
                                        required
                                        min="0"
                                        step="0.01"
                                        placeholder="1.00"
                                        className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Efficiency Target</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="efficiencyTarget"
                                            required
                                            min="0"
                                            max="100"
                                            step="0.1"
                                            placeholder="90.0"
                                            className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary pl-10"
                                            value={formData.efficiencyTarget}
                                            onChange={handleChange}
                                        />
                                        <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs / Textareas */}
                    <div className="flex flex-col min-h-[300px]">
                        <div className="flex gap-6 border-b border-white/10 mb-4">
                            <button
                                type="button"
                                onClick={() => setActiveTab('notes')}
                                className={`pb-2 text-sm font-medium transition-colors relative flex items-center gap-2 ${activeTab === 'notes' ? 'text-accent-primary' : 'text-text-muted hover:text-text-secondary'}`}
                            >
                                <FileText className="w-4 h-4" />
                                Description
                                {activeTab === 'notes' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />}
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('general_notes')}
                                className={`pb-2 text-sm font-medium transition-colors relative flex items-center gap-2 ${activeTab === 'general_notes' ? 'text-accent-primary' : 'text-text-muted hover:text-text-secondary'}`}
                            >
                                <Tag className="w-4 h-4" />
                                General Information
                                {activeTab === 'general_notes' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />}
                            </button>
                        </div>

                        <div className="flex-1 bg-background-primary/30 border border-white/10 rounded-xl p-1 relative">
                            {activeTab === 'notes' ? (
                                <textarea
                                    name="description"
                                    placeholder="Describe the work center, its function, and main responsibilities..."
                                    className="w-full h-full min-h-[200px] bg-transparent border-none p-4 text-text-primary placeholder-text-muted text-sm focus:outline-none resize-none"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            ) : (
                                <textarea
                                    name="notes"
                                    placeholder="Add any additional context, operational shifts, or specific requirements..."
                                    className="w-full h-full min-h-[200px] bg-transparent border-none p-4 text-text-primary placeholder-text-muted text-sm focus:outline-none resize-none"
                                    value={formData.notes}
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-8 mt-4 border-t border-white/10">
                        <div className="text-xs text-text-muted">
                            <span className="text-accent-primary">*</span> Required fields
                        </div>
                        <div className="flex gap-3">
                            <Button variant="ghost" onClick={() => navigate(-1)} type="button">
                                Discard
                            </Button>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Creating...' : 'Create Work Center'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateWorkCenterPage;
