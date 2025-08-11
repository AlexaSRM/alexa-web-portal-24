"use client";

import React, { useEffect, useState } from "react";
import { HiMenu, HiX, HiCheck, HiXCircle, HiSparkles } from "react-icons/hi";
import { registerForVlogit, IndividualRegistration, ApiResponse } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const RegisterVlogit: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<IndividualRegistration>({
    name: "",
    registrationNumber: "",
    srmMailId: "",
    phoneNumber: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const response: ApiResponse = await registerForVlogit(formData);
      
      if (response.success) {
        toast({
          title: "🎉 Registration Successful!",
          description: "You've been successfully registered for VlogIt! Check your email for confirmation.",
          variant: "default",
        });
        
        // Reset form on success
        setFormData({
          name: "",
          registrationNumber: "",
          srmMailId: "",
          phoneNumber: ""
        });
      } else {
        toast({
          title: "❌ Registration Failed",
          description: response.message || 'Registration failed. Please try again.',
          variant: "destructive",
        });
        
        // Handle field-specific errors
        if (response.errors) {
          const fieldErrors: Record<string, string> = {};
          response.errors.forEach(error => {
            fieldErrors[error.field] = error.message;
          });
          setErrors(fieldErrors);
        }
      }
    } catch (error) {
      toast({
        title: "🚨 Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Navigation */}
      <nav
        className="absolute left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[1500px] px-6"
        style={{ top: "25px" }}
      >
        <div className="flex justify-between items-center h-[74px]">
          <img
            src="/alexaverse2.0/alexa-logo-navbar.svg"
            alt="Alexa Logo"
            className="h-10 sm:h-12 w-auto"
          />

          <div className="hidden md:flex gap-[32px] items-center">
            <a
              href="/alexaverse-v2"
              className="text-white font-audiowide text-[32px] hover:text-purple-300 transition-colors"
            >
              Home
            </a>
            <a
              href="/alexaverse-v2#events"
              className="text-white font-audiowide text-[32px] hover:text-purple-300 transition-colors"
            >
              Events
            </a>
            <a
              href="#contact"
              className="text-white font-audiowide text-[32px] hover:text-purple-300 transition-colors"
            >
              Contact Us
            </a>
          </div>

          <button
            className="md:hidden text-white text-4xl"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <HiMenu />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#511e5b] via-[#1A052A] to-[#030645] z-50 flex flex-col justify-between items-center animate-in fade-in duration-300">
          <button
            className="absolute top-6 right-6 text-white text-4xl hover:text-purple-300 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <HiX />
          </button>

          <div className="flex-grow flex flex-col items-center justify-center gap-10 mt-20">
            <a
              href="/alexaverse-v2"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white font-audiowide text-4xl hover:text-purple-300 transition-colors"
            >
              HOME
            </a>
            <a
              href="/alexaverse-v2#events"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white font-audiowide text-4xl hover:text-purple-300 transition-colors"
            >
              OUR EVENTS
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white font-audiowide text-4xl hover:text-purple-300 transition-colors"
            >
              CONTACT US
            </a>
          </div>

          <p className="text-center text-[14px] sm:text-xl font-nunito text-white font-semibold px-4 whitespace-nowrap mb-6">
            Designed and Developed by{" "}
            <span className="bg-gradient-to-r from-[#C5126C] via-[#7942FF] to-[#CAFB12] bg-clip-text text-transparent font-bold">
              Alexa Developers SRM.
            </span>
          </p>
        </div>
      )}

      <section
        id="register-vlogit"
        className="w-full min-h-screen text-white flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A052A] via-[#511e5b] to-[#030645] opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Event Display Section */}
        <div className="relative max-w-[85rem] w-[90vw] h-[40vw] min-h-[120px] mt-10 mb-10 animate-in slide-in-from-bottom-8 duration-1000" style={{ left: '-5vw' }}>
          <div
            className="absolute top-[7.2vw] left-[15.6vw] w-[68.4vw] h-[18vw] rounded-[2.1vw] border-[0.06vw] backdrop-blur-[5vw] bg-[linear-gradient(122.72deg,rgba(115,115,115,0.25)_1.74%,rgba(50,50,50,0.25)_1.75%,rgba(163,163,163,0.25)_33.05%,rgba(112,112,112,0.25)_97.16%)]"
            style={{
              borderImage: `radial-gradient(88.13% 63.48% at 26.09% 25.74%, #FFFFFF 0%, rgba(255, 255, 255, 0.905829) 8.52%, rgba(255, 255, 255, 0.801323) 40.45%, rgba(255, 255, 255, 0.595409) 40.46%, rgba(255, 255, 255, 0.29) 96.15%, rgba(255, 255, 255, 0) 100%, rgba(255, 255, 255, 0) 100%) linear-gradient(180deg, rgba(0, 0, 0, 0.2) 18.72%, rgba(255, 30, 0, 0.2) 43.64%, rgba(0, 0, 0, 0.2) 67.21%)`,
              borderImageSlice: 1,
            }}
          >
            <div className="absolute top-[1.2vw] left-[19.8vw] right-[6.4vw] flex justify-between text-white">
              <span className="text-[1.08vw] min-text-[12px] font-space">VENUE</span>
              <span className="text-[1.08vw] min-text-[12px] font-space">TIME</span>
              <span className="text-[1.08vw] min-text-[12px] font-space">DATE</span>
            </div>
            <div className="absolute top-[3vw] left-[19.8vw] right-[2.4vw] flex justify-between text-white">
              <div className="flex flex-col">
                <span className="text-[1.44vw] min-text-[16px] font-space font-bold">MINI HALL 2</span>
              </div>
              <div className="text-[1.44vw] min-text-[16px] font-space font-bold">8:00 AM - 5:00 PM</div>
              <div className="text-[1.44vw] min-text-[16px] font-space font-bold">03-09-2025 - 05-09-2025</div>
            </div>
          </div>
          <div
            className="absolute top-[15.6vw] left-[12vw] w-[76.8vw] h-[17.4vw] rounded-[2.1vw] border-[0.06vw] backdrop-blur-[5vw] bg-[linear-gradient(122.72deg,rgba(180,180,180,0.25)_1.74%,rgba(79,79,79,0.25)_1.75%,rgba(255,255,255,0.25)_33.05%,rgba(175,175,175,0.25)_97.16%)]"
            style={{
              borderImage: `radial-gradient(88.13% 63.48% at 26.09% 25.74%, #FFFFFF 0%, rgba(255, 255, 255, 0.905829) 8.52%, rgba(255, 255, 255, 0.801323) 40.45%, rgba(255, 255, 255, 0.595409) 40.46%, rgba(255, 255, 255, 0.29) 96.15%, rgba(255, 255, 255, 0) 100%, rgba(255, 255, 255, 0) 100%) linear-gradient(180deg, rgba(0, 0, 0, 0.2) 18.72%, rgba(255, 30, 0, 0.2) 43.64%, rgba(0, 0, 0, 0.2) 67.21%)`,
              borderImageSlice: 1,
            }}
          >
            <div className="absolute left-[25.2vw] top-[1.8vw]">
              <h1 className="text-white text-[1.08vw] min-text-[12px] font-space mb-[-0.6vw]">EVENT</h1>
              <h2 className="text-white text-[2.52vw] min-text-[24px] font-anton">VLOG IT</h2>
            </div>
            <div className="absolute right-[3.6vw] top-[3.6vw] text-right">
              <p className="text-white text-[1.32vw] min-text-[14px] font-inter">
                Record and Roll: Capture the Essence of Alexaverse!
              </p>
            </div>
          </div>
          <img
            src="/alexaverse2.0/vlogit-img.svg"
            alt="Vlogit Image"
            className="absolute top-[4.8vw] left-[-14.4vw] w-[76.8vw] h-[19.8vw] object-contain rounded-[2.1vw]"
          />
          <div
            className="relative top-[26.4vw] left-[15vw] w-[18.6vw] h-[4.32vw] rounded-[3.12vw] border-[0.06vw] border-white backdrop-blur-[5vw] bg-[linear-gradient(122.72deg,rgba(144,144,144,0.25)_1.74%,rgba(63,63,63,0.25)_1.75%,rgba(204,204,204,0.25)_33.05%,rgba(140,140,140,0.25)_97.16%)]"
          >
            <img
              src="/alexaverse2.0/rewind-button.png"
              alt="Rewind Button"
              className="absolute left-[0.96vw] top-1/2 -translate-y-1/2 w-[1.92vw] h-[2.52vw] object-contain invert"
            />
            <img
              src="/alexaverse2.0/fast-forward-button.png"
              alt="Fast Forward Button"
              className="absolute left-[15.96vw] top-1/2 -translate-y-1/2 w-[1.92vw] h-[2.52vw] object-contain invert"
            />
            <div
              className="absolute left-[9.36vw] top-[2.16vw] -translate-x-1/2 -translate-y-1/2 w-[9.36vw] h-[5.04vw] rounded-[3.12vw] border-[0.06vw] border-white backdrop-blur-[5vw] bg-white"
            >
              <img
                src="/alexaverse2.0/play-button.png"
                alt="Play Button"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[6.24vw] h-[1.92vw] object-contain"
              />
            </div>
          </div>
          <div
            className="absolute top-[22.2vw] left-[37.2vw] w-[48vw] h-[2.52vw] rounded-[3.12vw] border-[0.1vw] border-white backdrop-blur-[5vw]"
            style={{
              background: 'linear-gradient(to right, black 60%, transparent 20%)'
            }}
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 w-[5.04vw] h-[3.12vw] rounded-[3.12vw] border-[0.06vw] border-white backdrop-blur-[5vw] bg-white"
              style={{
                left: '60%',
                transform: 'translate(-50%, -50%)'
              }}
            ></div>
          </div>
          <div
            className="absolute top-[27vw] left-[37.2vw] w-[48vw] h-[5.04vw] rounded-[1.44vw] border-[0.1vw] border-white backdrop-blur-[5vw] flex items-center justify-center p-[1.2vw]"
            style={{
              background: 'black'
            }}
          >
            <p className="text-white text-center font-inter text-[1.08vw] min-text-[14px] leading-tight">
              Eager to flex your filmmaking skills? Capture the chaos, edit it clean, and deliver a masterpiece that makes us say &apos;Absolute Cinema&apos; to win big!
            </p>
          </div>
        </div>

        {/* Enhanced Registration Form */}
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          {/* Form Header */}
          <div className="text-center mb-12 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="inline-flex items-center gap-3 mb-4">
              <HiSparkles className="text-4xl text-purple-400 animate-pulse" />
              <h2 className="text-4xl sm:text-6xl font-audiowide bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Join VlogIt
              </h2>
              <HiSparkles className="text-4xl text-purple-400 animate-pulse" />
            </div>
            <p className="text-xl text-gray-300 font-inter max-w-2xl mx-auto">
              Ready to create cinematic magic? Register now and showcase your storytelling skills!
            </p>
          </div>

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-bottom-8 duration-1000 delay-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="group relative">
                <div className={`relative transition-all duration-300 ${
                  focusedField === 'name' || formData.name ? 'scale-105' : ''
                }`}>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    required
                    pattern="^[a-zA-Z\s]+$"
                    title="Only letters and spaces allowed"
                    placeholder=" "
                    className={`w-full px-6 py-6 bg-white/10 backdrop-blur-md border-2 rounded-2xl text-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all duration-300 font-inter text-lg ${
                      errors.name ? 'border-red-500' : focusedField === 'name' ? 'border-purple-400' : 'border-white/30'
                    }`}
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-6 transition-all duration-300 pointer-events-none font-moul ${
                      focusedField === 'name' || formData.name
                        ? 'text-sm text-purple-400 -translate-y-8'
                        : 'text-lg text-gray-300 top-6'
                    }`}
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  {formData.name && !errors.name && (
                    <HiCheck className="absolute right-4 top-6 text-green-400 text-xl" />
                  )}
                  {errors.name && (
                    <HiXCircle className="absolute right-4 top-6 text-red-400 text-xl" />
                  )}
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                    <HiXCircle className="text-sm" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Registration Number Field */}
              <div className="group relative">
                <div className={`relative transition-all duration-300 ${
                  focusedField === 'registrationNumber' || formData.registrationNumber ? 'scale-105' : ''
                }`}>
                  <input
                    type="text"
                    id="registrationNumber"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('registrationNumber')}
                    onBlur={handleBlur}
                    required
                    pattern="^(?i)RA\d{13}$"
                    placeholder=" "
                    title="Must start with RA followed by 13 digits"
                    className={`w-full px-6 py-6 bg-white/10 backdrop-blur-md border-2 rounded-2xl text-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all duration-300 font-inter text-lg ${
                      errors.registrationNumber ? 'border-red-500' : focusedField === 'registrationNumber' ? 'border-purple-400' : 'border-white/30'
                    }`}
                  />
                  <label
                    htmlFor="registrationNumber"
                    className={`absolute left-6 transition-all duration-300 pointer-events-none font-moul ${
                      focusedField === 'registrationNumber' || formData.registrationNumber
                        ? 'text-sm text-purple-400 -translate-y-8'
                        : 'text-lg text-gray-300 top-6'
                    }`}
                  >
                    Registration Number <span className="text-red-500">*</span>
                  </label>
                  {formData.registrationNumber && !errors.registrationNumber && (
                    <HiCheck className="absolute right-4 top-6 text-green-400 text-xl" />
                  )}
                  {errors.registrationNumber && (
                    <HiXCircle className="absolute right-4 top-6 text-red-400 text-xl" />
                  )}
                </div>
                {errors.registrationNumber && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                    <HiXCircle className="text-sm" />
                    {errors.registrationNumber}
                  </p>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="group relative">
                <div className={`relative transition-all duration-300 ${
                  focusedField === 'phoneNumber' || formData.phoneNumber ? 'scale-105' : ''
                }`}>
                  <div className={`w-full flex items-center bg-white/10 backdrop-blur-md border-2 rounded-2xl focus-within:ring-4 focus-within:ring-purple-500/50 transition-all duration-300 overflow-hidden ${
                    errors.phoneNumber ? 'border-red-500' : focusedField === 'phoneNumber' ? 'border-purple-400' : 'border-white/30'
                  }`}>
                    <span className="px-4 text-white text-lg font-inter border-r border-white/30">
                      +91
                    </span>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus('phoneNumber')}
                      onBlur={handleBlur}
                      required
                      pattern="^[0-9]{10}$"
                      placeholder=" "
                      title="Enter a valid 10-digit phone number"
                      className="flex-1 px-4 py-6 text-white placeholder-transparent bg-transparent focus:outline-none font-inter text-lg"
                    />
                    <label
                      htmlFor="phoneNumber"
                      className={`absolute left-20 transition-all duration-300 pointer-events-none font-moul ${
                        focusedField === 'phoneNumber' || formData.phoneNumber
                          ? 'text-sm text-purple-400 -translate-y-8'
                          : 'text-lg text-gray-300 top-6'
                      }`}
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {formData.phoneNumber && !errors.phoneNumber && (
                    <HiCheck className="absolute right-4 top-6 text-green-400 text-xl" />
                  )}
                  {errors.phoneNumber && (
                    <HiXCircle className="absolute right-4 top-6 text-red-400 text-xl" />
                  )}
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                    <HiXCircle className="text-sm" />
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="group relative">
                <div className={`relative transition-all duration-300 ${
                  focusedField === 'srmMailId' || formData.srmMailId ? 'scale-105' : ''
                }`}>
                  <input
                    type="email"
                    id="srmMailId"
                    name="srmMailId"
                    value={formData.srmMailId}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('srmMailId')}
                    onBlur={handleBlur}
                    required
                    pattern="^[a-zA-Z0-9._%+-]+@srmist\\.edu\\.in$"
                    placeholder=" "
                    title="Email must be an SRMIST ID ending with @srmist.edu.in"
                    className={`w-full px-6 py-6 bg-white/10 backdrop-blur-md border-2 rounded-2xl text-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all duration-300 font-inter text-lg ${
                      errors.srmMailId ? 'border-red-500' : focusedField === 'srmMailId' ? 'border-purple-400' : 'border-white/30'
                    }`}
                  />
                  <label
                    htmlFor="srmMailId"
                    className={`absolute left-6 transition-all duration-300 pointer-events-none font-moul ${
                      focusedField === 'srmMailId' || formData.srmMailId
                        ? 'text-sm text-purple-400 -translate-y-8'
                        : 'text-lg text-gray-300 top-6'
                    }`}
                  >
                    SRMIST Email <span className="text-red-500">*</span>
                  </label>
                  {formData.srmMailId && !errors.srmMailId && (
                    <HiCheck className="absolute right-4 top-6 text-green-400 text-xl" />
                  )}
                  {errors.srmMailId && (
                    <HiXCircle className="absolute right-4 top-6 text-red-400 text-xl" />
                  )}
                </div>
                {errors.srmMailId && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                    <HiXCircle className="text-sm" />
                    {errors.srmMailId}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative px-16 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full text-white font-monsterrat text-2xl font-bold overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  isSubmitting ? 'animate-pulse' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Registering...
                    </>
                  ) : (
                    <>
                      <HiSparkles className="text-2xl animate-pulse" />
                      Register for VlogIt
                      <img
                        src="/alexaverse2.0/right-arrow.png"
                        alt="Arrow"
                        className="w-6 h-6 object-contain filter invert transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterVlogit;