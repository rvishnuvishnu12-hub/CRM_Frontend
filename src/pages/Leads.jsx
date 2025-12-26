import React, { useState, useMemo } from 'react';
import { 
  Share2, 
  List, 
  Columns, 
  Search, 
  Filter, 
  Plus,
  Linkedin,
  Link as LinkIcon,
  ChevronsDown
} from 'lucide-react';

// Mock Data moved outside component to avoid ReferenceError
const leadsData = Array(10).fill({
    name: "Johnson",
    company: "Techno",
    jobTitle: "Sales Rep",
    email: "johnson@gmail.com",
    createdOn: "15/12/2025 - Mon",
    status: "Opened"
}).map((item, idx) => {
    const names = ['Johnson', 'Smith', 'Williams', 'Brown', 'Jones'];
    const companies = ['Techno', 'SoftSys', 'DataCorp', 'NetWorks', 'CloudNine'];
    const nameBase = names[idx % 5];
    
    return {
        ...item,
        name: `${nameBase} ${idx + 1}`,
        company: companies[idx % 5],
        email: `${nameBase.toLowerCase()}.${idx + 1}@example.com`,
        status: ['Opened', 'New', 'Interested', 'Rejected'][idx % 4]
    };
});

import { useNavigate } from 'react-router-dom';

const Leads = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter Logic
  const filteredLeads = useMemo(() => {
    return leadsData.filter(lead => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchLower) || 
        lead.company.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.jobTitle.toLowerCase().includes(searchLower) ||
        lead.status.toLowerCase().includes(searchLower);
      
      const matchesFilter = filterStatus === 'All' || lead.status === filterStatus;

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterStatus]);

  return (
    <div className="flex flex-col h-full" onClick={() => isFilterOpen && setIsFilterOpen(false)}>
      {/* Header */}
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
            <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                     <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center text-xs font-medium text-orange-800 border-2 border-white">N</div>
                     <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-xs font-medium text-green-800 border-2 border-white">M</div>
                     <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-xs font-medium text-blue-800 border-2 border-white">R</div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <Share2 size={16} /> Share
                </button>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200">
            <button 
                className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'all' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('all')}
            >
                <List size={18} /> All Leads
            </button>
            <button 
                className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'pipeline' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('pipeline')}
            >
                <Columns size={18} /> Pipeline
            </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 relative">
            <div className="flex items-center gap-3 flex-1">
                <div className="relative w-full max-w-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                        placeholder="Search by name, company..."
                    />
                </div>
                
                {/* Filter Dropdown */}
                <div className="relative">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFilterOpen(!isFilterOpen);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 ${filterStatus !== 'All' ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-gray-700'}`}
                    >
                        <Filter size={16} /> 
                        {filterStatus === 'All' ? 'Filter' : filterStatus}
                    </button>
                    
                    {isFilterOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20 animate-fade-in-up">
                            {['All', 'Opened', 'New', 'Interested', 'Rejected'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${filterStatus === status ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <button 
                onClick={() => navigate('/leads/new')}
                className="flex items-center gap-2 px-4 py-2 bg-[#344873] text-white rounded-lg text-sm font-medium hover:bg-[#253860]"
            >
                <Plus size={16} /> Add People
            </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Companies</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urls</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created on</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead Source</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center">
                                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead.name}`} alt="" className="w-6 h-6 rounded-full" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">{lead.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="flex items-center gap-2">
                                    <span className="text-green-600"><img src="/src/assets/manovate.svg" className="w-4 h-4 object-contain inline-block mr-1 grayscale opacity-50" /></span> 
                                    <span className="text-sm text-gray-700">{lead.company}</span>
                                 </div>
                            </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.jobTitle}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                <a href="#" className="flex items-center gap-1 hover:underline">
                                    https://loom.com
                                </a>
                            </td>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.createdOn}</td>
                             <td className="px-6 py-4 whitespace-nowrap">
                                 <div className="flex items-center gap-1 text-sm text-gray-700">
                                    <Linkedin size={14} className="text-blue-700" /> Linkedin
                                 </div>
                             </td>
                             <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                                    {lead.status}
                                </span>
                             </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                            No leads found matching your criteria.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Opened': return 'bg-yellow-100 text-yellow-800';
        case 'New': return 'bg-green-100 text-green-800';
        case 'Interested': return 'bg-purple-100 text-purple-800';
        case 'Rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

export default Leads;
