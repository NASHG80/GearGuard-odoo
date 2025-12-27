import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronDown, MapPin, Package, FileText, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const CreateEquipmentPage = () => {
    const navigate = useNavigate();
    const acquisitionDateRef = useRef(null);
    const warrantyExpiryRef = useRef(null);
    const [activeTab, setActiveTab] = useState('notes');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        serialNumber: '',
        category: 'Mechanical',
        location: '',
        status: 'Active',
        acquisitionDate: new Date().toISOString().split('T')[0],
        warrantyExpiry: '',
        manufacturer: '',
        model: '',
        description: '',
        specifications: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:5000/api/equipment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('gearguard_token')}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Equipment added successfully!');
                navigate('/dashboard/equipment');
            } else {
                toast.error(data.message || 'Failed to add equipment');
            }
        } catch (error) {
            console.error('Submit error:', error);
            toast.error('Error adding equipment');
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
                    <h1 className="text-2xl font-bold text-white">Add New Equipment</h1>
                    <p className="text-text-secondary text-sm mt-1">Register a new asset to the inventory system.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Main Card */}
                <div className="bg-[#161B22] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">

                    {/* Header Status */}
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                        <span className="px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-bold border border-accent-primary/20">
                            New Asset
                        </span>
                        <span className="text-text-muted text-sm flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-text-muted"></span>
                            Draft Entry
                        </span>
                    </div>

                    {/* Equipment Name - Prominent */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-text-secondary mb-2">Equipment Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="e.g. HP-2000 Hydraulic Press"
                            className="w-full bg-background-primary/30 text-xl font-semibold text-text-primary placeholder-text-muted/40 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-primary focus:outline-none focus:bg-background-primary/50 transition-all"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Serial Number</label>
                                <input
                                    type="text"
                                    name="serialNumber"
                                    required
                                    placeholder="SN-998877"
                                    className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary"
                                    value={formData.serialNumber}
                                    onChange={handleChange}
                                />
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
                                            <option value="IT">IT</option>
                                            <option value="Vehicle">Vehicle</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Status</label>
                                    <div className="relative">
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className={`w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-3 text-sm appearance-none focus:outline-none focus:border-accent-primary font-medium
                                                ${formData.status === 'Active' ? 'text-green-400' : formData.status === 'Maintenance' ? 'text-yellow-400' : 'text-red-400'}
                                            `}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Maintenance">Maintenance</option>
                                            <option value="Retired">Retired</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Location</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="location"
                                        required
                                        placeholder="e.g. Floor A, Warehouse"
                                        className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Acquisition Date</label>
                                    <div className="relative group">
                                        <input
                                            ref={acquisitionDateRef}
                                            type="date"
                                            name="acquisitionDate"
                                            value={formData.acquisitionDate}
                                            onChange={handleChange}
                                            className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent-primary [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                            onClick={() => acquisitionDateRef.current.showPicker()}
                                        />
                                        <Calendar
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none group-hover:text-accent-primary transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Warranty Expiry</label>
                                    <div className="relative group">
                                        <input
                                            ref={warrantyExpiryRef}
                                            type="date"
                                            name="warrantyExpiry"
                                            value={formData.warrantyExpiry}
                                            onChange={handleChange}
                                            className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-3 py-2.5 text-text-primary text-sm focus:outline-none focus:border-accent-primary [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                            onClick={() => warrantyExpiryRef.current.showPicker()}
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
                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Manufacturer</label>
                                <input
                                    type="text"
                                    name="manufacturer"
                                    placeholder="e.g. Bosch, Siemens"
                                    className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary"
                                    value={formData.manufacturer}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Model Number</label>
                                <input
                                    type="text"
                                    name="model"
                                    placeholder="e.g. XYZ-2000"
                                    className="w-full bg-background-primary/30 border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-accent-primary"
                                    value={formData.model}
                                    onChange={handleChange}
                                />
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
                                onClick={() => setActiveTab('specifications')}
                                className={`pb-2 text-sm font-medium transition-colors relative flex items-center gap-2 ${activeTab === 'specifications' ? 'text-accent-primary' : 'text-text-muted hover:text-text-secondary'}`}
                            >
                                <Package className="w-4 h-4" />
                                Technical Specifications
                                {activeTab === 'specifications' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />}
                            </button>
                        </div>

                        <div className="flex-1 bg-background-primary/30 border border-white/10 rounded-xl p-1 relative">
                            {activeTab === 'notes' ? (
                                <textarea
                                    name="description"
                                    placeholder="Describe the equipment, its purpose, operational details, or any relevant information..."
                                    className="w-full h-full min-h-[200px] bg-transparent border-none p-4 text-text-primary placeholder-text-muted text-sm focus:outline-none resize-none"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            ) : (
                                <textarea
                                    name="specifications"
                                    placeholder="Add technical specifications: power rating, dimensions, capacity, operating conditions..."
                                    className="w-full h-full min-h-[200px] bg-transparent border-none p-4 text-text-primary placeholder-text-muted text-sm focus:outline-none resize-none"
                                    value={formData.specifications}
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
                                {isSubmitting ? 'Adding...' : 'Add Equipment'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateEquipmentPage;
