import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import mailIcon from '../assets/mail.svg';
import googleIcon from '../assets/google.svg';
import appleIcon from '../assets/apple.svg';
import linkedinIcon from '../assets/linkedin.svg';
import microsoftIcon from '../assets/microsoft.svg';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await authAPI.signup({ name, email, password });
      navigate('/signup-details');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';
    const redirectUri = `${window.location.origin}/auth/google/callback`;
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email%20profile&response_type=code`;
  };

  const handleAppleLogin = () => {
    const clientId = import.meta.env.VITE_APPLE_CLIENT_ID || 'YOUR_APPLE_CLIENT_ID';
    const redirectUri = `${window.location.origin}/auth/apple/callback`;
    window.location.href = `https://appleid.apple.com/auth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20name`;
  };

  const handleLinkedInLogin = () => {
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID || 'YOUR_LINKEDIN_CLIENT_ID';
    const redirectUri = `${window.location.origin}/auth/linkedin/callback`;
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?client_id=${clientId}&redirect_uri=${redirectUri}&scope=r_liteprofile%20r_emailaddress&response_type=code`;
  };

  const handleMicrosoftLogin = () => {
    const clientId = import.meta.env.VITE_MICROSOFT_CLIENT_ID || 'YOUR_MICROSOFT_CLIENT_ID';
    const redirectUri = `${window.location.origin}/auth/microsoft/callback`;
    window.location.href = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user.read&response_type=code`;
  };

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in-up">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">Create Account</h2>
        <p className="text-sm text-gray-500">Enter your details to create your account</p>
        {error && <p className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>}
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
            <label className="block pl-1 text-sm font-medium text-gray-500">Full Name</label>
            <input
            type="text"
            name="name"
            required
            placeholder="Enter your full name"
            className="w-full px-4 py-3 transition-all duration-200 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
        </div>

        <div className="space-y-1.5">
          <label className="block pl-1 text-sm font-medium text-gray-500">Email</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 pr-10 transition-all duration-200 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <img 
              src={mailIcon}
              alt="Email" 
              className="absolute w-5 h-5 -translate-y-1/2 right-3 top-1/2 opacity-60"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block pl-1 text-sm font-medium text-gray-500">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              placeholder="Create a password"
              className="w-full px-4 py-3 pr-10 transition-all duration-200 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute -translate-y-1/2 right-3 top-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 text-white transition-colors duration-200 bg-[#344054] rounded-xl font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-lg shadow-gray-900/20 disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <div className="flex items-center gap-4 py-2 relative">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <div className="flex justify-center gap-4">
            <button type="button" onClick={handleGoogleLogin} className="flex items-center justify-center w-12 h-12 transition-colors duration-200 border border-gray-200 rounded-xl hover:bg-gray-50">
                <img src={googleIcon} alt="Google" className="w-6 h-6" />
            </button>

            <button type="button" onClick={handleAppleLogin} className="flex items-center justify-center w-12 h-12 text-gray-900 transition-colors duration-200 border border-gray-200 rounded-xl hover:bg-gray-50">
                <img src={appleIcon} alt="Apple" className="w-6 h-6" />
            </button>

            <button type="button" onClick={handleLinkedInLogin} className="flex items-center justify-center w-12 h-12 text-[#0077b5] transition-colors duration-200 border border-gray-200 rounded-xl hover:bg-gray-50">
                <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6" />
            </button>

            <button type="button" onClick={handleMicrosoftLogin} className="flex items-center justify-center w-12 h-12 transition-colors duration-200 border border-gray-200 rounded-xl hover:bg-gray-50">
               <img src={microsoftIcon} alt="Microsoft" className="w-6 h-6" />
            </button>
        </div>
      </form>

      <p className="mt-8 text-sm text-center text-gray-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-blue-500 hover:text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Signup;
