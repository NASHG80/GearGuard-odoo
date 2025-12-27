import { useState, useEffect, useRef } from 'react';
import { Bell, Search, Menu, Wrench, Package, Users, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import MaintenanceRequestForm from '../forms/MaintenanceRequestForm';

const Header = ({ title = "Dashboard" }) => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ equipment: [], requests: [], teams: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();

  // Fake notifications data
  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'Equipment Failure Predicted',
      message: 'HP-2000 Hydraulic Press showing anomalous vibration patterns',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Maintenance Completed',
      message: 'Scheduled maintenance for CNC-Machine-A finished successfully',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Critical Request Assigned',
      message: 'Urgent repair needed for Conveyor Belt #3',
      time: '2 hours ago',
      read: false
    },
    {
      id: 4,
      type: 'info',
      title: 'Team Update',
      message: 'Maintenance Team Alpha schedule updated for next week',
      time: '3 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'info',
      title: 'New Equipment Added',
      message: 'Industrial Robot ARM-500 added to inventory',
      time: '5 hours ago',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search function with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length >= 2) {
        performSearch(searchQuery);
      } else {
        setSearchResults({ equipment: [], requests: [], teams: [] });
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const performSearch = async (query) => {
    setIsSearching(true);
    setShowResults(true);
    
    try {
      const token = localStorage.getItem('gearguard_token');
      const headers = { 'Authorization': `Bearer ${token}` };

      // Fetch all data in parallel
      const [equipmentRes, requestsRes, teamsRes] = await Promise.all([
        fetch('/api/equipment', { headers }).catch(() => ({ ok: false })),
        fetch('/api/requests', { headers }).catch(() => ({ ok: false })),
        fetch('/api/teams', { headers }).catch(() => ({ ok: false }))
      ]);

      const equipment = equipmentRes.ok ? await equipmentRes.json() : { success: false };
      const requests = requestsRes.ok ? await requestsRes.json() : { success: false };
      const teams = teamsRes.ok ? await teamsRes.json() : { success: false };

      const queryLower = query.toLowerCase();

      // Filter equipment
      const filteredEquipment = equipment.success 
        ? equipment.equipment.filter(item => 
            item.name?.toLowerCase().includes(queryLower) ||
            item.serial_number?.toLowerCase().includes(queryLower) ||
            item.category?.toLowerCase().includes(queryLower)
          ).slice(0, 5)
        : [];

      // Filter requests
      const filteredRequests = requests.success
        ? requests.requests.filter(item =>
            item.subject?.toLowerCase().includes(queryLower) ||
            item.equipment?.toLowerCase().includes(queryLower) ||
            item.category?.toLowerCase().includes(queryLower)
          ).slice(0, 5)
        : [];

      // Filter teams
      const filteredTeams = teams.success
        ? teams.teams.filter(item =>
            item.name?.toLowerCase().includes(queryLower) ||
            item.team_lead?.toLowerCase().includes(queryLower)
          ).slice(0, 5)
        : [];

      setSearchResults({
        equipment: filteredEquipment,
        requests: filteredRequests,
        teams: filteredTeams
      });
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults({ equipment: [], requests: [], teams: [] });
    } finally {
      setIsSearching(false);
    }
  };

  const handleResultClick = (type, id) => {
    setShowResults(false);
    setSearchQuery('');
    
    switch(type) {
      case 'equipment':
        navigate(`/dashboard/equipment/${id}`);
        break;
      case 'request':
        navigate('/dashboard/requests');
        break;
      case 'team':
        navigate('/dashboard/teams');
        break;
      default:
        break;
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowResults(false);
    setSearchResults({ equipment: [], requests: [], teams: [] });
  };

  const hasResults = searchResults.equipment.length > 0 || 
                     searchResults.requests.length > 0 || 
                     searchResults.teams.length > 0;

  return (
    <>
      <header className="h-20 border-b border-white/5 bg-background-primary/30 backdrop-blur-xl sticky top-0 z-20 px-8 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 text-text-secondary hover:text-white transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Enhanced Search with Dropdown */}
          <div className="relative hidden md:block" ref={searchRef}>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent-primary transition-colors" />
              <input
                type="text"
                placeholder="Search equipment, requests, teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim().length >= 2 && setShowResults(true)}
                className="glass-input w-80 pl-10 pr-10 py-2.5 rounded-xl text-sm"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full mt-2 w-full bg-background-card border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden max-h-[500px] overflow-y-auto">
                {isSearching ? (
                  <div className="p-6 text-center text-text-secondary">
                    <div className="animate-spin w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                    Searching...
                  </div>
                ) : hasResults ? (
                  <div className="py-2">
                    {/* Equipment Results */}
                    {searchResults.equipment.length > 0 && (
                      <div className="mb-2">
                        <div className="px-4 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-2">
                          <Package className="w-3 h-3" />
                          Equipment
                        </div>
                        {searchResults.equipment.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleResultClick('equipment', item.id)}
                            className="w-full px-4 py-3 hover:bg-white/5 transition-colors text-left flex items-center gap-3 group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
                              <Package className="w-5 h-5 text-accent-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-white group-hover:text-accent-primary transition-colors">
                                {item.name}
                              </div>
                              <div className="text-xs text-text-muted">
                                {item.category} • {item.serial_number}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Request Results */}
                    {searchResults.requests.length > 0 && (
                      <div className="mb-2">
                        <div className="px-4 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-2">
                          <Wrench className="w-3 h-3" />
                          Requests
                        </div>
                        {searchResults.requests.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleResultClick('request', item.id)}
                            className="w-full px-4 py-3 hover:bg-white/5 transition-colors text-left flex items-center gap-3 group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                              <Wrench className="w-5 h-5 text-orange-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-white group-hover:text-accent-primary transition-colors">
                                {item.subject}
                              </div>
                              <div className="text-xs text-text-muted">
                                {item.category} • {item.equipment || 'N/A'}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Team Results */}
                    {searchResults.teams.length > 0 && (
                      <div>
                        <div className="px-4 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          Teams
                        </div>
                        {searchResults.teams.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => handleResultClick('team', item.id)}
                            className="w-full px-4 py-3 hover:bg-white/5 transition-colors text-left flex items-center gap-3 group"
                          >
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                              <Users className="w-5 h-5 text-green-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-white group-hover:text-accent-primary transition-colors">
                                {item.name}
                              </div>
                              <div className="text-xs text-text-muted">
                                Lead: {item.team_lead || 'Not assigned'} • {item.members?.length || 0} members
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 text-center text-text-secondary">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No results found for "{searchQuery}"</p>
                    <p className="text-xs mt-1 text-text-muted">Try searching for equipment, requests, or teams</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl text-text-secondary hover:text-white hover:bg-white/5 transition-all duration-300 group"
              >
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {unreadCount > 0 && (
                  <>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-accent-danger rounded-full shadow-[0_0_8px_#EF4444] animate-pulse"></span>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-danger text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  </>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-96 bg-background-card border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden max-h-[500px] overflow-y-auto">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="text-xs text-accent-primary font-semibold">
                        {unreadCount} unread
                      </span>
                    )}
                  </div>

                  <div className="divide-y divide-white/5">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-white/5 transition-colors cursor-pointer ${
                          !notification.read ? 'bg-accent-primary/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                            notification.type === 'alert' ? 'bg-red-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            notification.type === 'success' ? 'bg-green-500' :
                            'bg-blue-500'
                          }`}></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-sm font-semibold text-white">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <span className="w-2 h-2 bg-accent-primary rounded-full flex-shrink-0 mt-1"></span>
                              )}
                            </div>
                            <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <span className="text-xs text-text-muted mt-2 block">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 border-t border-white/5">
                    <button className="w-full text-center text-sm text-accent-primary hover:text-accent-secondary transition-colors font-medium">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-8 w-[1px] bg-white/10 mx-1"></div>

            {/* <Button size="sm" variant="primary" onClick={() => setIsRequestModalOpen(true)} className="shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 transition-shadow">
              + New Request
            </Button> */}
          </div>
        </div>
      </header>

      <Modal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        title="Create Maintenance Request"
      >
        <MaintenanceRequestForm
          onSubmit={() => {
            alert('Request Created!'); // Placeholder
            setIsRequestModalOpen(false);
          }}
          onCancel={() => setIsRequestModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default Header;
