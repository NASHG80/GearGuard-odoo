import React, { useState } from 'react';
import { Calendar, ChevronDown, Star, Clock, User, Briefcase, FileText, Info } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { motion } from 'framer-motion'; // Added this import for motion.div

const CreateRequestModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('notes');
    const [formData, setFormData] = useState({
        subject: '',
        maintenanceFor: 'equipment', // equipment or work_center
        equipment: 'HP-2000 Hydraulic Press',
        category: 'Mechanical',
        requestDate: new Date().toISOString().split('T')[0],
        maintenanceType: 'corrective',
        team: 'Internal Maintenance',
        technician: 'Ann Foster',
        scheduledDate: '',
        duration: '00:00',
        priority: '0', // 0-3 stars
        description: '',
        instructions: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const renderStars = (currentPriority) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, priority: star.toString() }))}
                        className={`focus:outline-none transition-colors ${parseInt(formData.priority) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-text-muted hover:text-text-secondary'
                            }`}
                    >
                        <Star className="w-5 h-5" />
                    </button>
                ))}
            </div>
        );
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create Maintenance Request" maxWidth="max-w-5xl">
            <form onSubmit={handleSubmit} className="flex flex-col h-full">
                {/* Header / Status Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-white/10 pb-4">
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-accent-primary border-accent-primary/30 bg-accent-primary/10">New Request</Button>
                        <div className="hidden md:flex items-center text-text-muted text-sm gap-2">
                            <span>&gt;</span>
                            <span>In Progress</span>
                            <span>&gt;</span>
                            <span>Repaired</span>
                            <span>&gt;</span>
                            <span>Scrap</span>
                        </div>
                    </div>
                </div>

                {/* Subject Input */}
                <div className="mb-8">
                    <input
                        type="text"
                        name="subject"
                        placeholder="e.g. Hydraulic Press Leak"
                        className="w-full bg-transparent text-3xl font-bold text-text-primary placeholder-text-muted/50 border-b border-white/10 focus:border-accent-primary focus:outline-none px-0 py-2 transition-colors"
                        value={formData.subject}
                        onChange={handleChange}
                    />
                </div>

                {/* Main Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label className="text-sm font-medium text-text-secondary">Created By</label>
                            <div className="col-span-2 text-text-primary">Mitchell Admin</div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                            <label className="text-sm font-medium text-text-secondary">Maintenance For</label>
                            <div className="col-span-2 flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="maintenanceFor" value="equipment" checked={formData.maintenanceFor === 'equipment'} onChange={handleChange} className="accent-accent-primary" />
                                    <span className="text-text-primary text-sm">Equipment</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="maintenanceFor" value="work_center" checked={formData.maintenanceFor === 'work_center'} onChange={handleChange} className="accent-accent-primary" />
                                    <span className="text-text-primary text-sm">Work Center</span>
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                            <label className="text-sm font-medium text-text-secondary">Equipment</label>
                            <div className="col-span-2 relative">
                                <select name="equipment" value={formData.equipment} onChange={handleChange} className="w-full bg-background-secondary/50 border border-white/10 rounded-lg px-3 py-2 text-text-primary appearance-none focus:outline-none focus:border-accent-primary">
                                    <option>HP-2000 Hydraulic Press</option>
                                    <option>CNC Milling M1</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                            <label className="text-sm font-medium text-text-secondary">Category</label>
                            <div className="col-span-2 text-text-primary">{formData.category}</div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                            <label className="text-sm font-medium text-text-secondary">Request Date</label>
                            <div className="col-span-2 text-text-primary">{formData.requestDate}</div>
                        </div>

                        <div className="grid grid-cols-3 items-start gap-4 pt-2">
                            <label className="text-sm font-medium text-text-secondary pt-1">Maintenance Type</label>
                            <div className="col-span-2 space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="maintenanceType" value="corrective" checked={formData.maintenanceType === 'corrective'} onChange={handleChange} className="accent-accent-primary" />
                                    <span className="text-text-primary text-sm">Corrective</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="maintenanceType" value="preventive" checked={formData.maintenanceType === 'preventive'} onChange={handleChange} className="accent-accent-primary" />
                                    <span className="text-text-primary text-sm">Preventive</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <label className="text-sm font-medium text-text-secondary">Team</label>
                            <div className="col-span-2 relative">
                                <select name="team" value={formData.team} onChange={handleChange} className="w-full bg-background-secondary/50 border border-white/10 rounded-lg px-3 py-2 text-text-primary appearance-none focus:outline-none focus:border-accent-primary">
                                    <option>Internal Maintenance</option>
                                    <option>External Contractor</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                            <label className="text-sm font-medium text-text-secondary">Technician</label>
                            <div className="col-span-2 relative">
                                <select name="technician" value={formData.technician} onChange={handleChange} className="w-full bg-background-secondary/50 border border-white/10 rounded-lg px-3 py-2 text-text-primary appearance-none focus:outline-none focus:border-accent-primary">
                                    <option>Ann Foster</option>
                                    <option>John Doe</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                            <label className="text-sm font-medium text-text-secondary">Scheduled Date</label>
                            <div className="col-span-2 relative">
                                <input type="datetime-local" name="scheduledDate" value={formData.scheduledDate} onChange={handleChange} className="w-full bg-background-secondary/50 border border-white/10 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-accent-primary [&::-webkit-calendar-picker-indicator]:invert" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                            <label className="text-sm font-medium text-text-secondary">Duration</label>
                            <div className="col-span-2 flex items-center gap-2">
                                <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-24 bg-background-secondary/50 border border-white/10 rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-accent-primary" />
                                <span className="text-text-muted text-sm">hours</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                            <label className="text-sm font-medium text-text-secondary">Priority</label>
                            <div className="col-span-2">
                                {renderStars(formData.priority)}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 items-center gap-4">
                            <label className="text-sm font-medium text-text-secondary">Company</label>
                            <div className="col-span-2 text-text-primary">GearGuard Industries</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex-1 flex flex-col">
                    <div className="flex gap-6 border-b border-white/10 mb-4">
                        <button
                            type="button"
                            onClick={() => setActiveTab('notes')}
                            className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'notes' ? 'text-accent-primary' : 'text-text-muted hover:text-text-secondary'}`}
                        >
                            Notes
                            {activeTab === 'notes' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />}
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('instructions')}
                            className={`pb-2 text-sm font-medium transition-colors relative ${activeTab === 'instructions' ? 'text-accent-primary' : 'text-text-muted hover:text-text-secondary'}`}
                        >
                            Instructions
                            {activeTab === 'instructions' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />}
                        </button>
                    </div>

                    <div className="flex-1 min-h-[100px]">
                        {activeTab === 'notes' ? (
                            <textarea
                                name="description"
                                placeholder="Add internal notes..."
                                className="w-full h-full bg-background-secondary/30 border border-white/10 rounded-xl p-4 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary resize-none"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        ) : (
                            <textarea
                                name="instructions"
                                placeholder="Add maintenance instructions..."
                                className="w-full h-full bg-background-secondary/30 border border-white/10 rounded-xl p-4 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary resize-none"
                                value={formData.instructions}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-white/10">
                    <Button variant="ghost" onClick={onClose} type="button" className="text-text-muted hover:text-text-primary">
                        Discard
                    </Button>
                    <Button variant="primary" type="submit" className="shadow-lg shadow-accent-primary/20">
                        Save Request
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateRequestModal;
