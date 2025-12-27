import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronDown, Clock, User, FileText, Info, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';

const CreateRequestPage = () => {
    const navigate = useNavigate();
    const dateInputRef = useRef(null);
    const [activeTab, setActiveTab] = useState('notes');
    const [formData, setFormData] = useState({
        subject: '',
        maintenanceFor: 'equipment',
        equipment: 'HP-2000 Hydraulic Press',
        category: 'Mechanical',
        requestDate: new Date().toISOString().split('T')[0],
        maintenanceType: 'corrective',
        team: 'Internal Maintenance',
        technician: 'Ann Foster',
        scheduledDate: '',
        duration: '00:00',
        priority: 'low',
        description: '',
        instructions: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        navigate('/dashboard/requests');
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
                    <h1 className="text-2xl font-bold text-white">Create Maintenance Request</h1>
                    <p className="text-text-secondary text-sm mt-1">Submit a new work order for equipment or facilities.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Main Card */}
                <div className="bg-[#161B22] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
                    
                    {/* Header Status */}
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                        <span className="px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-bold border border-accent-primary/20">
                            New Request
                        </span>
                        <span className="text-text-muted text-sm flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-text-muted"></span>
                            Draft Application
                        </span>
                    </div>

                    {/* Subject Input - Prominent */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-text-secondary mb-2">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            required
                            placeholder="e.g. Hydraulic Press Oil Leak detected"
                            className="w-full bg-background-primary/30 text-xl font-semibold text-text-primary placeholder-text-muted/40 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-primary focus:outline-none focus:bg-background-primary/50 transition-all"
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Maintenance For</label>
                                    <div className="flex bg-background-primary/30 p-1 rounded-lg border border-white/5">
                                        <label className={`flex-1 text-center text-sm py-2 rounded-md cursor-pointer transition-colors ${formData.maintenanceFor === 'equipment' ? 'bg-accent-primary text-white shadow-sm' : 'text-text-muted hover:text-text-primary'}`}>
                                            <input type="radio" name="maintenanceFor" value="equipment" checked={formData.maintenanceFor === 'equipment'} onChange={handleChange} className="hidden" />
                                            Equipment
                                        </label>
                                        <label className={`flex-1 text-center text-sm py-2 rounded-md cursor-pointer transition-colors ${formData.maintenanceFor === 'work_center' ? 'bg-accent-primary text-white shadow-sm' : 'text-text-muted hover:text-text-primary'}`}>
                                            <input type="radio" name="maintenanceFor" value="work_center" checked={formData.maintenanceFor === 'work_center'} onChange={handleChange} className="hidden" />
                                            Work Center
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Type</label>
                                    <div className="relative">
                                        <select name="maintenanceType" value={formData.maintenanceType} onChange={handleChange} className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-2.5 text-text-primary text-sm appearance-none focus:outline-none focus:border-accent-primary">
                                            <option value="corrective">Corrective</option>
                                            <option value="preventive">Preventive</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Equipment / Asset</label>
                                <div className="relative">
                                    <select name="equipment" value={formData.equipment} onChange={handleChange} className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-4 py-3 text-text-primary appearance-none focus:outline-none focus:border-accent-primary">
                                        <option>HP-2000 Hydraulic Press</option>
                                        <option>CNC Milling M1</option>
                                        <option>Conveyor Belt System</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Category</label>
                                    <div className="relative">
                                        <select 
                                            name="category" 
                                            value={formData.category} 
                                            onChange={handleChange} 
                                            className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-3 text-text-primary appearance-none focus:outline-none focus:border-accent-primary text-sm"
                                        >
                                            <option value="Mechanical">Mechanical</option>
                                            <option value="Electrical">Electrical</option>
                                            <option value="Hydraulic">Hydraulic</option>
                                            <option value="Pneumatic">Pneumatic</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Request Date</label>
                                    <div className="relative group">
                                        <input
                                            ref={dateInputRef}
                                            type="date"
                                            name="requestDate"
                                            value={formData.requestDate}
                                            onChange={handleChange}
                                            className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent-primary [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                            onClick={() => dateInputRef.current.showPicker()}
                                        />
                                        <Calendar 
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none group-hover:text-accent-primary transition-colors" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Priority</label>
                                    <div className="relative">
                                        <select 
                                            name="priority" 
                                            value={formData.priority} 
                                            onChange={handleChange} 
                                            className={`w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-2.5 text-sm appearance-none focus:outline-none focus:border-accent-primary font-medium
                                                ${formData.priority === 'high' ? 'text-red-400' : formData.priority === 'medium' ? 'text-yellow-400' : 'text-blue-400'}
                                            `}
                                        >
                                            <option value="low">Low Priority</option>
                                            <option value="medium">Medium Priority</option>
                                            <option value="high">High Priority</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Duration (Hrs)</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            name="duration" 
                                            value={formData.duration} 
                                            onChange={handleChange} 
                                            className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent-primary" 
                                        />
                                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Assigned Team</label>
                                <div className="relative">
                                    <select name="team" value={formData.team} onChange={handleChange} className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-4 py-3 text-text-primary appearance-none focus:outline-none focus:border-accent-primary text-sm">
                                        <option>Internal Maintenance</option>
                                        <option>External Contractor</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Lead Technician</label>
                                <div className="relative">
                                    <select name="technician" value={formData.technician} onChange={handleChange} className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-4 py-3 text-text-primary appearance-none focus:outline-none focus:border-accent-primary text-sm">
                                        <option>Kalp</option>
                                        <option>Nash</option>
                                        <option>Arnav</option>
                                        <option>Neel</option>
                                        <option>Unassigned</option>
                                    </select>
                                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
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
                                Description & Notes
                                {activeTab === 'notes' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />}
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('instructions')}
                                className={`pb-2 text-sm font-medium transition-colors relative flex items-center gap-2 ${activeTab === 'instructions' ? 'text-accent-primary' : 'text-text-muted hover:text-text-secondary'}`}
                            >
                                <Info className="w-4 h-4" />
                                Instructions
                                {activeTab === 'instructions' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />}
                            </button>
                        </div>

                        <div className="flex-1 bg-background-primary/30 border border-white/10 rounded-xl p-1 relative">
                            {activeTab === 'notes' ? (
                                <textarea
                                    name="description"
                                    placeholder="Describe the issue, observed symptoms, or any relevant details..."
                                    className="w-full h-full min-h-[200px] bg-transparent border-none p-4 text-text-primary placeholder-text-muted text-sm focus:outline-none resize-none"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            ) : (
                                <textarea
                                    name="instructions"
                                    placeholder="Add specific maintenance instructions or safety warnings..."
                                    className="w-full h-full min-h-[200px] bg-transparent border-none p-4 text-text-primary placeholder-text-muted text-sm focus:outline-none resize-none"
                                    value={formData.instructions}
                                    onChange={handleChange}
                                />
                            )}
                        </div>
                    </div>

                    {/* Footer - Moved outside/below or inside? Let's keep it inside for card feel */}
                    <div className="flex justify-between items-center pt-8 mt-4 border-t border-white/10">
                        <div className="text-xs text-text-muted">
                            <span className="text-accent-primary">*</span> Required fields
                        </div>
                        <div className="flex gap-3">
                            <Button variant="ghost" onClick={() => navigate(-1)} type="button">
                                Discard
                            </Button>
                            <Button variant="primary" type="submit">
                                Save Request
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateRequestPage;
