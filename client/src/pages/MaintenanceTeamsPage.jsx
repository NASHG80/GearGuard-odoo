import { Users, Wrench, Plus } from 'lucide-react';
import Button from '../components/ui/Button';

// Mock Data
const MOCK_TEAMS = [
  { id: 'TM-01', name: 'Alpha Squad', specialty: 'Mechanical', members: 4, activeRequests: 2 },
  { id: 'TM-02', name: 'Beta Techs', specialty: 'Electrical', members: 3, activeRequests: 1 },
  { id: 'TM-03', name: 'Gamma Crew', specialty: 'HVAC', members: 2, activeRequests: 0 },
];

const MaintenanceTeamsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-text-primary">Maintenance Teams</h2>
           <p className="text-text-secondary">Manage technical squads and assignments</p>
        </div>
        <Button variant="primary" size="md">
            <Plus className="w-4 h-4 mr-2" />
            Add Team
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TEAMS.map((team) => (
            <div key={team.id} className="bg-background-card border border-border rounded-xl p-5 hover:border-accent-primary transition-all">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-accent-primary/10 rounded-lg text-accent-primary">
                        <Users className="w-6 h-6" />
                    </div>
                    {team.activeRequests > 0 && (
                        <span className="bg-accent-warning/10 text-accent-warning text-xs px-2 py-1 rounded-full">
                            {team.activeRequests} Active Jobs
                        </span>
                    )}
                </div>
                
                <h3 className="text-lg font-semibold text-text-primary mb-1">{team.name}</h3>
                <div className="flex items-center gap-2 text-sm text-text-secondary mb-4">
                    <Wrench className="w-4 h-4" />
                    <span>{team.specialty} Specialist</span>
                </div>

                <div className="border-t border-border pt-4 mt-auto flex justify-between items-center text-sm">
                    <span className="text-text-muted">{team.members} Members</span>
                    <button className="text-accent-primary hover:underline">View Details</button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceTeamsPage;
