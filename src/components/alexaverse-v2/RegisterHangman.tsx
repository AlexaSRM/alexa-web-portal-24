"use client";

import React, { useEffect, useState } from "react";
import { HiMenu, HiX, HiCheck, HiXCircle, HiSparkles, HiUserGroup } from "react-icons/hi";
import { registerForHangman, TeamRegistration, TeamMember, ApiResponse } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const RegisterHangman: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TeamRegistration>({
    teamName: "",
    teamMembers: [
      { name: "", registrationNumber: "", srmMailId: "", phoneNumber: "" },
      { name: "", registrationNumber: "", srmMailId: "", phoneNumber: "" },
      { name: "", registrationNumber: "", srmMailId: "", phoneNumber: "" },
      { name: "", registrationNumber: "", srmMailId: "", phoneNumber: "" }
    ]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      teamName: value
    }));
    
    // Clear error when user starts typing
    if (errors.teamName) {
      setErrors(prev => ({
        ...prev,
        teamName: ""
      }));
    }
  };

  const handleMemberChange = (memberIndex: number, field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, index) => 
        index === memberIndex ? { ...member, [field]: value } : member
      )
    }));
    
    // Clear error when user starts typing
    const errorKey = `teamMembers.${memberIndex}.${field}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ""
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

    // Filter out empty team members (only include members with at least a name)
    const validMembers = formData.teamMembers.filter(member => member.name.trim() !== "");
    
    // Validate team size (3-4 members for Hangman)
    if (validMembers.length < 3) {
      toast({
        title: "❌ Team Size Error",
        description: "Team must have at least 3 members.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    if (validMembers.length > 4) {
      toast({
        title: "❌ Team Size Error",
        description: "Team can have maximum 4 members.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const submissionData: TeamRegistration = {
      teamName: formData.teamName,
      teamMembers: validMembers
    };

    try {
      const response: ApiResponse = await registerForHangman(submissionData);
      
      if (response.success) {
        toast({
          title: "🎉 Team Registration Successful!",
          description: "Your team has been successfully registered for Hangman! Check your email for confirmation.",
          variant: "default",
        });
        
        // Reset form on success
        setFormData({
          teamName: "",
          teamMembers: [
            { name: "", registrationNumber: "", srmMailId: "", phoneNumber: "" },
            { name: "", registrationNumber: "", srmMailId: "", phoneNumber: "" },
            { name: "", registrationNumber: "", srmMailId: "", phoneNumber: "" },
            { name: "", registrationNumber: "", srmMailId: "", phoneNumber: "" }
          ]
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
              href="/"
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
              href="/"
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
        id="register-hangman"
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
              className="absolute w-2 h-2 bg-red-400 rounded-full animate-pulse"
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
            <div className="absolute top-[1.2vw] left-[19.8vw] right-[2.4vw] flex justify-between text-white">
              <span className="text-[1.08vw] min-text-[12px] font-space">VENUE</span>
              <span className="text-[1.08vw] min-text-[12px] font-space">TIME</span>
              <span className="text-[1.08vw] min-text-[12px] font-space">DATE</span>
            </div>
            <div className="absolute top-[3vw] left-[19.8vw] right-[2.4vw] flex justify-between text-white">
              <div className="flex flex-col">
                <span className="text-[1.44vw] min-text-[16px] font-space font-bold">MINI HALL 2</span>
              </div>
              <div className="text-[1.44vw] min-text-[16px] font-space font-bold">8:00 AM - 5:00 PM</div>
              <div className="text-[1.44vw] min-text-[16px] font-space font-bold">05-09-2025</div>
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
              <h2 className="text-white text-[2.52vw] min-text-[24px] font-anton">HANGMAN</h2>
            </div>
            <div className="absolute right-[3.6vw] top-[3.6vw] text-right">
              <p className="text-white text-[1.32vw] min-text-[14px] font-inter">
                Create or Cremate? Your life is on the line…
              </p>
            </div>
          </div>
          <img
            src="/alexaverse2.0/hangman-img.svg"
            alt="Hangman Image"
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
              background: 'linear-gradient(to right, black 100%, transparent 0%)'
            }}
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 w-[5.04vw] h-[3.12vw] rounded-[3.12vw] border-[0.06vw] border-white backdrop-blur-[5vw] bg-white"
              style={{
                left: '95%',
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
              Unleash your brilliance across 3 creative challenges along with your team. Do you have it in you to make it till the end? We hope so.
            </p>
          </div>
        </div>

        {/* Enhanced Registration Form */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          {/* Form Header */}
          <div className="text-center mb-12 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="inline-flex items-center gap-3 mb-4">
              <HiSparkles className="text-4xl text-red-400 animate-pulse" />
              <h2 className="text-4xl sm:text-6xl font-audiowide bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Join Hangman
              </h2>
              <HiSparkles className="text-4xl text-red-400 animate-pulse" />
            </div>
            <p className="text-xl text-gray-300 font-inter max-w-2xl mx-auto">
              Ready to test your creativity and teamwork? Register your team now and face the ultimate challenge!
            </p>
          </div>

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="space-y-12 animate-in slide-in-from-bottom-8 duration-1000 delay-500">
            {/* Team Information Section */}
            <div className="space-y-8">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                  <HiUserGroup className="text-3xl text-red-400" />
                  <h3 className="text-2xl sm:text-4xl font-audiowide text-red-400">
                    Team Information
                  </h3>
                  <HiUserGroup className="text-3xl text-red-400" />
                </div>
              </div>
              
              {/* Team Name Field */}
              <div className="max-w-md mx-auto">
                <div className={`relative transition-all duration-300 ${
                  focusedField === 'teamName' || formData.teamName ? 'scale-105' : ''
                }`}>
                  <input
                    type="text"
                    id="teamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleTeamNameChange}
                    onFocus={() => handleFocus('teamName')}
                    onBlur={handleBlur}
                    required
                    pattern="^[a-zA-Z0-9\s]+$"
                    title="Only letters, numbers, and spaces allowed (minimum 3 characters)"
                    placeholder=" "
                    className={`w-full px-6 py-6 bg-white/10 backdrop-blur-md border-2 rounded-2xl text-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 font-inter text-lg ${
                      errors.teamName ? 'border-red-500' : focusedField === 'teamName' ? 'border-red-400' : 'border-white/30'
                    }`}
                  />
                  <label
                    htmlFor="teamName"
                    className={`absolute left-6 transition-all duration-300 pointer-events-none font-moul ${
                      focusedField === 'teamName' || formData.teamName
                        ? 'text-sm text-red-400 -translate-y-8'
                        : 'text-lg text-gray-300 top-6'
                    }`}
                  >
                    Team Name <span className="text-red-500">*</span>
                  </label>
                  {formData.teamName && !errors.teamName && (
                    <HiCheck className="absolute right-4 top-6 text-green-400 text-xl" />
                  )}
                  {errors.teamName && (
                    <HiXCircle className="absolute right-4 top-6 text-red-400 text-xl" />
                  )}
                </div>
                {errors.teamName && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                    <HiXCircle className="text-sm" />
                    {errors.teamName}
                  </p>
                )}
              </div>
            </div>

            {/* Team Members Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl sm:text-4xl font-audiowide text-red-400 mb-4">
                  Team Members
                </h3>
                <p className="text-gray-300 font-inter">
                  Team Size: 3-4 members (First 3 members are required, 4th member is optional)
                </p>
              </div>

              {/* Team Members Grid */}
              {[1, 2, 3, 4].map((studentNum) => (
                <div key={studentNum} className="space-y-6 animate-in slide-in-from-bottom-8 duration-1000 delay-700">
                  <div className="text-center">
                    <h4 className="text-xl sm:text-2xl font-audiowide text-red-300">
                      Student {studentNum} {studentNum <= 3 ? <span className="text-red-500">*</span> : "(Optional)"}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Name Field */}
                    <div className="group relative">
                      <div className={`relative transition-all duration-300 ${
                        focusedField === `name-${studentNum}` || formData.teamMembers[studentNum - 1].name ? 'scale-105' : ''
                      }`}>
                        <input
                          type="text"
                          id={`name-${studentNum}`}
                          value={formData.teamMembers[studentNum - 1].name}
                          onChange={(e) => handleMemberChange(studentNum - 1, 'name', e.target.value)}
                          onFocus={() => handleFocus(`name-${studentNum}`)}
                          onBlur={handleBlur}
                          required={studentNum <= 3}
                          pattern="^[a-zA-Z\s]+$"
                          title="Only letters and spaces allowed"
                          placeholder=" "
                          className={`w-full px-6 py-6 bg-white/10 backdrop-blur-md border-2 rounded-2xl text-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 font-inter text-lg ${
                            errors[`teamMembers.${studentNum - 1}.name`] ? 'border-red-500' : focusedField === `name-${studentNum}` ? 'border-red-400' : 'border-white/30'
                          }`}
                        />
                        <label
                          htmlFor={`name-${studentNum}`}
                          className={`absolute left-6 transition-all duration-300 pointer-events-none font-moul ${
                            focusedField === `name-${studentNum}` || formData.teamMembers[studentNum - 1].name
                              ? 'text-sm text-red-400 -translate-y-8'
                              : 'text-lg text-gray-300 top-6'
                          }`}
                        >
                          Full Name {studentNum <= 3 ? <span className="text-red-500">*</span> : null}
                        </label>
                        {formData.teamMembers[studentNum - 1].name && !errors[`teamMembers.${studentNum - 1}.name`] && (
                          <HiCheck className="absolute right-4 top-6 text-green-400 text-xl" />
                        )}
                        {errors[`teamMembers.${studentNum - 1}.name`] && (
                          <HiXCircle className="absolute right-4 top-6 text-red-400 text-xl" />
                        )}
                      </div>
                      {errors[`teamMembers.${studentNum - 1}.name`] && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                          <HiXCircle className="text-sm" />
                          {errors[`teamMembers.${studentNum - 1}.name`]}
                        </p>
                      )}
                    </div>

                    {/* Registration Number Field */}
                    <div className="group relative">
                      <div className={`relative transition-all duration-300 ${
                        focusedField === `registrationNumber-${studentNum}` || formData.teamMembers[studentNum - 1].registrationNumber ? 'scale-105' : ''
                      }`}>
                        <input
                          type="text"
                          id={`registrationNumber-${studentNum}`}
                          value={formData.teamMembers[studentNum - 1].registrationNumber}
                          onChange={(e) => handleMemberChange(studentNum - 1, 'registrationNumber', e.target.value)}
                          onFocus={() => handleFocus(`registrationNumber-${studentNum}`)}
                          onBlur={handleBlur}
                          required={studentNum <= 3}
                          pattern="^RA\\d{13}$"
                          placeholder=" "
                          title="Must start with RA followed by 13 digits"
                          className={`w-full px-6 py-6 bg-white/10 backdrop-blur-md border-2 rounded-2xl text-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 font-inter text-lg ${
                            errors[`teamMembers.${studentNum - 1}.registrationNumber`] ? 'border-red-500' : focusedField === `registrationNumber-${studentNum}` ? 'border-red-400' : 'border-white/30'
                          }`}
                        />
                        <label
                          htmlFor={`registrationNumber-${studentNum}`}
                          className={`absolute left-6 transition-all duration-300 pointer-events-none font-moul ${
                            focusedField === `registrationNumber-${studentNum}` || formData.teamMembers[studentNum - 1].registrationNumber
                              ? 'text-sm text-red-400 -translate-y-8'
                              : 'text-lg text-gray-300 top-6'
                          }`}
                        >
                          Registration Number {studentNum <= 3 ? <span className="text-red-500">*</span> : null}
                        </label>
                        {formData.teamMembers[studentNum - 1].registrationNumber && !errors[`teamMembers.${studentNum - 1}.registrationNumber`] && (
                          <HiCheck className="absolute right-4 top-6 text-green-400 text-xl" />
                        )}
                        {errors[`teamMembers.${studentNum - 1}.registrationNumber`] && (
                          <HiXCircle className="absolute right-4 top-6 text-red-400 text-xl" />
                        )}
                      </div>
                      {errors[`teamMembers.${studentNum - 1}.registrationNumber`] && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                          <HiXCircle className="text-sm" />
                          {errors[`teamMembers.${studentNum - 1}.registrationNumber`]}
                        </p>
                      )}
                    </div>

                    {/* Phone Number Field */}
                    <div className="group relative">
                      <div className={`relative transition-all duration-300 ${
                        focusedField === `phoneNumber-${studentNum}` || formData.teamMembers[studentNum - 1].phoneNumber ? 'scale-105' : ''
                      }`}>
                        <div className={`w-full flex items-center bg-white/10 backdrop-blur-md border-2 rounded-2xl focus-within:ring-4 focus-within:ring-red-500/50 transition-all duration-300 overflow-hidden ${
                          errors[`teamMembers.${studentNum - 1}.phoneNumber`] ? 'border-red-500' : focusedField === `phoneNumber-${studentNum}` ? 'border-red-400' : 'border-white/30'
                        }`}>
                          <span className="px-4 text-white text-lg font-inter border-r border-white/30">
                            +91
                          </span>
                          <input
                            type="tel"
                            id={`phoneNumber-${studentNum}`}
                            value={formData.teamMembers[studentNum - 1].phoneNumber}
                            onChange={(e) => handleMemberChange(studentNum - 1, 'phoneNumber', e.target.value)}
                            onFocus={() => handleFocus(`phoneNumber-${studentNum}`)}
                            onBlur={handleBlur}
                            required={studentNum <= 3}
                            pattern="^[0-9]{10}$"
                            placeholder=" "
                            title="Enter a valid 10-digit phone number"
                            className="flex-1 px-4 py-6 text-white placeholder-transparent bg-transparent focus:outline-none font-inter text-lg"
                          />
                          <label
                            htmlFor={`phoneNumber-${studentNum}`}
                            className={`absolute left-20 transition-all duration-300 pointer-events-none font-moul ${
                              focusedField === `phoneNumber-${studentNum}` || formData.teamMembers[studentNum - 1].phoneNumber
                                ? 'text-sm text-red-400 -translate-y-8'
                                : 'text-lg text-gray-300 top-6'
                            }`}
                          >
                            Phone Number {studentNum <= 3 ? <span className="text-red-500">*</span> : null}
                          </label>
                        </div>
                        {formData.teamMembers[studentNum - 1].phoneNumber && !errors[`teamMembers.${studentNum - 1}.phoneNumber`] && (
                          <HiCheck className="absolute right-4 top-6 text-green-400 text-xl" />
                        )}
                        {errors[`teamMembers.${studentNum - 1}.phoneNumber`] && (
                          <HiXCircle className="absolute right-4 top-6 text-red-400 text-xl" />
                        )}
                      </div>
                      {errors[`teamMembers.${studentNum - 1}.phoneNumber`] && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                          <HiXCircle className="text-sm" />
                          {errors[`teamMembers.${studentNum - 1}.phoneNumber`]}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="group relative">
                      <div className={`relative transition-all duration-300 ${
                        focusedField === `srmMailId-${studentNum}` || formData.teamMembers[studentNum - 1].srmMailId ? 'scale-105' : ''
                      }`}>
                        <input
                          type="email"
                          id={`srmMailId-${studentNum}`}
                          value={formData.teamMembers[studentNum - 1].srmMailId}
                          onChange={(e) => handleMemberChange(studentNum - 1, 'srmMailId', e.target.value)}
                          onFocus={() => handleFocus(`srmMailId-${studentNum}`)}
                          onBlur={handleBlur}
                          required={studentNum <= 3}
                          pattern="^[a-zA-Z0-9._%+-]+@srmist\\.edu\\.in$"
                          placeholder=" "
                          title="Email must be an SRMIST ID ending with @srmist.edu.in"
                          className={`w-full px-6 py-6 bg-white/10 backdrop-blur-md border-2 rounded-2xl text-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-red-500/50 transition-all duration-300 font-inter text-lg ${
                            errors[`teamMembers.${studentNum - 1}.srmMailId`] ? 'border-red-500' : focusedField === `srmMailId-${studentNum}` ? 'border-red-400' : 'border-white/30'
                          }`}
                        />
                        <label
                          htmlFor={`srmMailId-${studentNum}`}
                          className={`absolute left-6 transition-all duration-300 pointer-events-none font-moul ${
                            focusedField === `srmMailId-${studentNum}` || formData.teamMembers[studentNum - 1].srmMailId
                              ? 'text-sm text-red-400 -translate-y-8'
                              : 'text-lg text-gray-300 top-6'
                          }`}
                        >
                          SRMIST Email {studentNum <= 3 ? <span className="text-red-500">*</span> : null}
                        </label>
                        {formData.teamMembers[studentNum - 1].srmMailId && !errors[`teamMembers.${studentNum - 1}.srmMailId`] && (
                          <HiCheck className="absolute right-4 top-6 text-green-400 text-xl" />
                        )}
                        {errors[`teamMembers.${studentNum - 1}.srmMailId`] && (
                          <HiXCircle className="absolute right-4 top-6 text-red-400 text-xl" />
                        )}
                      </div>
                      {errors[`teamMembers.${studentNum - 1}.srmMailId`] && (
                        <p className="text-red-400 text-sm mt-2 flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                          <HiXCircle className="text-sm" />
                          {errors[`teamMembers.${studentNum - 1}.srmMailId`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative px-16 py-6 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-full text-white font-monsterrat text-2xl font-bold overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  isSubmitting ? 'animate-pulse' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Registering Team...
                    </>
                  ) : (
                    <>
                      <HiSparkles className="text-2xl animate-pulse" />
                      Register Team for Hangman
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

export default RegisterHangman;