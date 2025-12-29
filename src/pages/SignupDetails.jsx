import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const SignupDetails = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        companyName: '',
        industry: '',
        timeZone: '',
        email: '',
        newsletter: false
    });

    const [openDropdown, setOpenDropdown] = useState(null); // 'industry' or 'timeZone' or null

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const handleSelect = (name, value) => {
        setFormData({ ...formData, [name]: value });
        setOpenDropdown(null);
    };

    // Close dropdowns when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.custom-dropdown-container')) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // We can add state handlers here later if needed
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted", formData);
        navigate('/team-invite');
    };

    return (
        <div className="min-h-screen bg-[#f3f4f6] relative font-sans">
            {/* Logo - Top Left */}
            <div className="absolute top-8 left-8 sm:top-12 sm:left-12">
                <img 
                    src="/src/assets/manovate.svg" 
                    alt="Manovate Technologies" 
                    className="h-12 w-auto object-contain"
                />
            </div>

            <div className="flex items-center justify-center min-h-screen px-4 py-8 sm:px-6 lg:px-8">
                <div className="w-full max-w-[800px] bg-white p-6 sm:p-12 shadow-sm rounded-md mt-16 sm:mt-0">
                    {/* Header */}
                    <div className="mb-10 text-center">
                        <h2 className="mb-3 text-2xl font-bold text-[#1e293b]">Let's Personalize Your CRM</h2>
                        <p className="text-[#64748b] text-[15px]">
                            Customize your CRM experience by adding your company details and preferences.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Company Name */}
                        <div className="space-y-2">
                            <label className="block text-[15px] font-normal text-gray-500">Company Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Enter your company name"
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-gray-900 placeholder-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200"
                                />
                                {/* Chevron */}
                                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>

                        {/* Industry */}
                        <div className="space-y-2 custom-dropdown-container">
                            <label className="block text-[15px] font-normal text-gray-500">What Type Of Products or Services Do You Plan?</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); toggleDropdown('industry'); }}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-left flex items-center justify-between text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200"
                                >
                                    <span className={formData.industry ? 'text-gray-900' : 'text-gray-900'}>
                                        {formData.industry || 'Select an industry'}
                                    </span>
                                    <svg className={`w-4 h-4 text-gray-700 transition-transform ${openDropdown === 'industry' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                
                                {openDropdown === 'industry' && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-20 animate-fade-in-up overflow-hidden">
                                        {['Technology', 'Finance', 'Retail', 'Healthcare', 'Other'].map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => handleSelect('industry', option)}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-900 transition-colors"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Time Zone */}
                        <div className="space-y-2 custom-dropdown-container">
                            <label className="block text-[15px] font-normal text-gray-500">Time Zone & Currency</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); toggleDropdown('timeZone'); }}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-left flex items-center justify-between text-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200"
                                >
                                    <span className={formData.timeZone ? 'text-gray-900' : 'text-gray-900'}>
                                        {formData.timeZone || 'Select your time zone'}
                                    </span>
                                    <svg className={`w-4 h-4 text-gray-700 transition-transform ${openDropdown === 'timeZone' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>

                                {openDropdown === 'timeZone' && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-20 animate-fade-in-up overflow-hidden">
                                        {['UTC', 'EST', 'PST', 'IST'].map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => handleSelect('timeZone', option)}
                                                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-900 transition-colors"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Company Email */}
                        <div className="space-y-2">
                            <label className="block text-[15px] font-normal text-gray-500">Your Company Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email id"
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded text-gray-900 placeholder-gray-900 focus:outline-none focus:border-blue-500 transition-all duration-200"
                            />
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-start gap-3 pt-2">
                            <div className="flex items-center h-5">
                                <input
                                    type="checkbox"
                                    id="newsletter"
                                    name="newsletter"
                                    checked={formData.newsletter}
                                    onChange={handleChange}
                                    className="w-4 h-4 border-gray-300 rounded text-blue-900 focus:ring-blue-900 cursor-pointer"
                                />
                            </div>
                            <label htmlFor="newsletter" className="text-[15px] text-gray-800 cursor-pointer select-none">
                                I'd like to receive helpful CRM tips, new feature alerts, and occasional product news
                            </label>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 space-y-5">
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#344873] hover:bg-[#253860] text-white font-medium rounded text-[15px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#344873]"
                            >
                                Continue
                            </button>
                            <div className="text-center">
                                <Link to="/team-invite" className="text-gray-900 text-[15px] font-medium hover:underline">
                                    Skip for now
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupDetails;
