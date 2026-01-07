import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Filter, 
  ClipboardList, 
  Calendar, 
  Bell, 
  Settings, 
  Search, 
  Info,
  ChevronsLeft,
  Menu,
  X
} from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col justify-between z-30 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Area */}
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-900 leading-tight">MANOVATE</span>
                <span className="text-[10px] tracking-widest text-slate-500 font-semibold">TECHNOLOGIES</span>
              </div>
            </div>
             <button onClick={closeSidebar} className="text-gray-400 hover:text-gray-600 rounded-md border border-gray-300 p-1 md:hidden">
                <X size={16} />
             </button>
             <button className="text-gray-400 hover:text-gray-600 rounded-md border border-gray-300 p-1 hidden md:block">
                <ChevronsLeft size={16} />
             </button>
          </div>

          {/* Navigation */}
          <nav className="px-4 space-y-1 mt-4">
            <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" onClick={closeSidebar} />
            <div className="my-4"></div> {/* Spacer */}
            <NavItem to="/leads" icon={<Users size={20} />} label="Leads" onClick={closeSidebar} />
            <NavItem to="/deals" icon={<Filter size={20} />} label="Deals / Pipeline" onClick={closeSidebar} />
            <NavItem to="/tasks" icon={<ClipboardList size={20} />} label="Tasks" onClick={closeSidebar} />
            <NavItem to="/calendar" icon={<Calendar size={20} />} label="Calendar" onClick={closeSidebar} />
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 space-y-1">
          <NavItem to="/notifications" icon={<Bell size={20} />} label="Notification" onClick={closeSidebar} />
          <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" onClick={closeSidebar} />
          
          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3 px-3 pb-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
            <span className="font-medium text-sm text-gray-700">Manovates</span>
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-4 md:px-8 shrink-0">
          
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Mobile Logo (simplified) */}
            <div className="md:hidden font-bold text-blue-900 text-lg">MANOVATE</div>

            {/* Search */}
            <div className="relative w-full max-w-xs hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border-none rounded-lg leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                placeholder="Search..."
              />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 md:gap-4">
             <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full bg-gray-50">
                <Search size={18} />
             </button>
             <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full bg-gray-50">
                <Bell size={18} />
             </button>
             <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full bg-gray-50 hidden md:block">
                <Info size={18} />
             </button>
             <div className="hidden md:block h-8 w-px bg-gray-200 mx-1"></div>
             <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Profile" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">Manovates</span>
             </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Helper Component for Navigation Items
const NavItem = ({ to, icon, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? 'bg-blue-900 text-white'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default DashboardLayout;
