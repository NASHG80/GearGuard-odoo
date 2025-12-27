import { useState } from 'react';
import { Users, Wrench, Plus, Briefcase, ChevronRight, Shield, Award } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

// Initial Mock Data
const INITIAL_TEAMS = [
  { 
    id: 'TM-01', 
    name: 'Alpha Squad', 
    specialty: 'Mechanical', 
    members: 4, 
    activeRequests: 2,
    lead: 'Sarah Connor',
    description: 'Specializes in heavy machinery and hydraulic press maintenance.'
  },
  { 
    id: 'TM-02', 
    name: 'Beta Techs', 
    specialty: 'Electrical', 
    members: 3, 
    activeRequests: 1,
    lead: 'Geordi La Forge',
    description: 'Expertise in high-voltage systems, circuitry, and sensor calibration.'
  },
  { 
    id: 'TM-03', 
    name: 'Gamma Crew', 
    specialty: 'HVAC', 
    members: 2, 
    activeRequests: 0,
    lead: 'Leonard McCoy',
    description: 'Maintenance of heating, ventilation, and cooling systems for plant safety.'
  },
];

const specialtyColors = {
  'Mechanical': 'border-l-blue-500',
  'Electrical': 'border-l-yellow-500',
  'HVAC': 'border-l-cyan-500',
  'Software': 'border-l-purple-500',
  'General': 'border-l-gray-500'
};

const MaintenanceTeamsPage = () => {
  const [teams, setTeams] = useState(INITIAL_TEAMS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Form State
  const [newTeam, setNewTeam] = useState({
    name: '',
    specialty: 'General',
    lead: '',
    description: ''
  });

  const handleAddTeam = (e) => {
    e.preventDefault();
    const teamToAdd = {
      id: `TM-${String(teams.length + 1).padStart(2, '0')}`,
      ...newTeam,
      members: 0,
      activeRequests: 0
    };
    setTeams([...teams, teamToAdd]);
    setIsAddModalOpen(false);
    setNewTeam({ name: '', specialty: 'General', lead: '', description: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-text-primary">Maintenance Teams</h2>
           <p className="text-text-secondary">Manage technical squads and assignments</p>
        </div>
        <Button variant="primary" size="md" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Team
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
            <div 
                key={team.id} 
                onClick={() => setSelectedTeam(team)}
                className={`
                    group relative bg-background-card border border-border rounded-xl p-5 
                    hover:border-accent-primary hover:shadow-lg transition-all cursor-pointer overflow-hidden
                    border-l-4 ${specialtyColors[team.specialty] || 'border-l-gray-500'}
                `}
            >
                {/* Background Gradient Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-accent-primary/10 transition-all"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <span className="text-xs font-mono text-text-muted mb-1 block">{team.id}</span>
                        <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                            {team.name}
                        </h3>
                    </div>
                    {team.activeRequests > 0 ? (
                        <span className="bg-accent-warning/10 text-accent-warning text-xs font-bold px-2 py-1 rounded-full border border-accent-warning/20">
                            {team.activeRequests} Active Jobs
                        </span>
                    ) : (
                        <span className="bg-accent-success/10 text-accent-success text-xs font-bold px-2 py-1 rounded-full border border-accent-success/20">
                            Available
                        </span>
                    )}
                </div>
                
                <p className="text-sm text-text-secondary mb-6 line-clamp-2 h-10">
                    {team.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm text-text-muted relative z-10">
                    <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-accent-secondary" />
                        <span>{team.specialty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent-secondary" />
                        <span>{team.members} Members</span>
                    </div>
                </div>

                <div className="border-t border-border mt-4 pt-4 flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-text-muted" />
                        <span className="text-xs text-text-muted">Lead: {team.lead}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 transition-all" />
                </div>
            </div>
        ))}
      </div>

      {/* Add Team Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Team"
      >
        <form onSubmit={handleAddTeam} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Team Name</label>
                <input 
                    type="text" 
                    required
                    className="w-full bg-background-primary border border-white/10 rounded-lg p-2.5 text-text-primary focus:border-accent-primary outline-none"
                    placeholder="e.g., Delta Force"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Specialty</label>
                    <select 
                        className="w-full bg-background-primary border border-white/10 rounded-lg p-2.5 text-text-primary focus:border-accent-primary outline-none appearance-none"
                        value={newTeam.specialty}
                        onChange={(e) => setNewTeam({...newTeam, specialty: e.target.value})}
                    >
                        <option value="General">General</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Electrical">Electrical</option>
                        <option value="HVAC">HVAC</option>
                        <option value="Software">Software Control</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Team Lead</label>
                    <input 
                        type="text" 
                        required
                        className="w-full bg-background-primary border border-white/10 rounded-lg p-2.5 text-text-primary focus:border-accent-primary outline-none"
                        placeholder="Lead Name"
                        value={newTeam.lead}
                        onChange={(e) => setNewTeam({...newTeam, lead: e.target.value})}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                <textarea 
                    className="w-full bg-background-primary border border-white/10 rounded-lg p-2.5 text-text-primary focus:border-accent-primary outline-none"
                    rows="3"
                    placeholder="Brief description of the team's responsibilities..."
                    value={newTeam.description}
                    onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
                ></textarea>
            </div>

            <div className="pt-4 flex justify-end gap-3">
                <Button variant="ghost" type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button variant="primary" type="submit">Create Team</Button>
            </div>
        </form>
      </Modal>

      {/* Team Details Modal */}
      <Modal
        isOpen={!!selectedTeam}
        onClose={() => setSelectedTeam(null)}
        title={selectedTeam?.name || 'Team Details'}
      >
        {selectedTeam && (
            <div className="space-y-6">
                <div className="flex items-start justify-between">
                    <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
                            selectedTeam.specialty === 'Mechanical' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                            selectedTeam.specialty === 'Electrical' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                            'bg-gray-500/10 text-gray-400 border-gray-500/20'
                        }`}>
                            {selectedTeam.specialty} Division
                        </span>
                        <p className="text-text-secondary">{selectedTeam.description}</p>
                    </div>
                </div>

                <div className="bg-background-primary/50 rounded-xl p-4 border border-white/5 space-y-4">
                    <h4 className="font-semibold text-text-primary flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent-primary" />
                        Team Members
                    </h4>
                    
                    {selectedTeam.members > 0 ? (
                         <div className="space-y-3">
                            {/* Mock Render of Members based on count */}
                            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary font-bold text-xs">
                                        TL
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-text-primary">{selectedTeam.lead}</p>
                                        <p className="text-xs text-text-muted">Team Lead</p>
                                    </div>
                                </div>
                                <Award className="w-4 h-4 text-accent-warning" />
                            </div>
                            
                            {[...Array(Math.max(0, selectedTeam.members - 1))].map((_, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-background-secondary flex items-center justify-center text-text-secondary font-bold text-xs">
                                        M{i+1}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-text-primary">Technician {i + 1}</p>
                                        <p className="text-xs text-text-muted">Specialist</p>
                                    </div>
                                </div>
                            ))}
                         </div>
                    ) : (
                        <p className="text-sm text-text-muted italic">No members assigned yet.</p>
                    )}
                </div>

                <div className="flex justify-end pt-4">
                    <Button variant="secondary" onClick={() => setSelectedTeam(null)}>Close</Button>
                </div>
            </div>
        )}
      </Modal>
    </div>
  );
};

export default MaintenanceTeamsPage;
