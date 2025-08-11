"use client";

import React, { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { registerForHangman, TeamRegistration, TeamMember, ApiResponse } from "@/lib/api";

const RegisterHangman: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
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
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      teamName: e.target.value
    }));
    
    if (errors.teamName) {
      setErrors(prev => ({
        ...prev,
        teamName: ""
      }));
    }
  };

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => 
        i === index ? { ...member, [field]: value } : member
      )
    }));
    
    const errorKey = `member${index}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ""
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitSuccess(null);
    setErrors({});

    // Client-side validation
    const filledMembers = formData.teamMembers.filter(member => 
      member.name && member.registrationNumber && member.srmMailId && member.phoneNumber
    );

    if (filledMembers.length < 3) {
      toast({
        title: "❌ Team Size Error",
        description: "You need at least 3 team members to register.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (filledMembers.length > 4) {
      toast({
        title: "❌ Team Size Error",
        description: "You can have maximum 4 team members.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Create submission data with only filled members
    const submissionData: TeamRegistration = {
      teamName: formData.teamName,
      teamMembers: filledMembers
    };

    try {
      const response: ApiResponse = await registerForHangman(submissionData);
      
      if (response.success) {
        setSubmitSuccess(true);
        setSubmitMessage(response.message || 'Team registration successful!');
        
        // Show success toast
        toast({
          title: "🎉 Team Registration Successful!",
          description: "Your team has been successfully registered for HANGMAN!",
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
        setSubmitSuccess(false);
        setSubmitMessage(response.message || 'Registration failed');
        
        // Show error toast
        toast({
          title: "❌ Registration Failed",
          description: response.message || "Something went wrong. Please try again.",
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
      setSubmitSuccess(false);
      setSubmitMessage("An unexpected error occurred. Please try again.");
      
      // Show error toast
      toast({
        title: "❌ Network Error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          >
            <div className={`w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg transform rotate-45`} />
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute left-1/2 transform -translate-x-1/2 z-10 w-full max-w-[1500px] px-6"
        style={{ top: "25px" }}
      >
        <div className="flex justify-between items-center h-[74px]">
          
          <motion.img
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            src="/alexaverse2.0/alexa-logo-navbar.svg"
            alt="Alexa Logo"
            className="h-10 sm:h-12 w-auto drop-shadow-lg"
          />

          <div className="hidden md:flex gap-[32px] items-center">
            <motion.a
              whileHover={{ scale: 1.05, color: "#10b981" }}
              transition={{ type: "spring", stiffness: 300 }}
              href="/alexaverse-v2"
              className="text-white font-audiowide text-[32px] transition-colors relative group"
            >
              <span className="relative z-10">Home</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-20"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: "#10b981" }}
              transition={{ type: "spring", stiffness: 300 }}
              href="/alexaverse-v2#events"
              className="text-white font-audiowide text-[32px] transition-colors relative group"
            >
              <span className="relative z-10">Events</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-20"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: "#10b981" }}
              transition={{ type: "spring", stiffness: 300 }}
              href="#contact"
              className="text-white font-audiowide text-[32px] transition-colors relative group"
            >
              <span className="relative z-10">Contact Us</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-20"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.a>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-white text-4xl"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <HiMenu />
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-[#511e5b] via-[#1A052A] to-[#030645] z-50 flex flex-col justify-between items-center"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 text-white text-4xl"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <HiX />
            </motion.button>

            <div className="flex-grow flex flex-col items-center justify-center gap-10 mt-20">
              {[
                { href: "/alexaverse-v2", text: "HOME" },
                { href: "/alexaverse-v2#events", text: "OUR EVENTS" },
                { href: "#contact", text: "CONTACT US" }
              ].map((link, index) => (
                <motion.a
                  key={link.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, color: "#10b981" }}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white font-audiowide text-4xl transition-colors"
                >
                  {link.text}
                </motion.a>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center text-[14px] sm:text-xl font-nunito text-white font-semibold px-4 whitespace-nowrap mb-6"
            >
              Designed and Developed by{" "}
              <span className="bg-gradient-to-r from-[#C5126C] via-[#7942FF] to-[#CAFB12] bg-clip-text text-transparent font-bold">
                Alexa Developers SRM.
              </span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        id="register-hangman"
        className="relative w-full min-h-screen text-white flex flex-col items-center justify-center px-4 py-16 z-10"
      >
        {/* Animated Background Gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-blue-900/20 to-emerald-900/20"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(5, 150, 105, 0.2) 0%, transparent 50%),
              linear-gradient(to bottom right, rgba(6, 78, 59, 0.1), rgba(30, 58, 138, 0.1), rgba(6, 95, 70, 0.1))
            `
          }}
        />

        {/* Event display section */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-[85rem] w-[90vw] h-[40vw] min-h-[120px] mt-10 mb-10" 
          style={{ left: '-5vw' }}
        >
          
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute top-[7.2vw] left-[15.6vw] w-[68.4vw] h-[18vw] rounded-[2.1vw] border-[0.06vw] backdrop-blur-[5vw] bg-[linear-gradient(122.72deg,rgba(115,115,115,0.25)_1.74%,rgba(50,50,50,0.25)_1.75%,rgba(163,163,163,0.25)_33.05%,rgba(112,112,112,0.25)_97.16%)] shadow-2xl"
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
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute top-[15.6vw] left-[12vw] w-[76.8vw] h-[17.4vw] rounded-[2.1vw] border-[0.06vw] backdrop-blur-[5vw] bg-[linear-gradient(122.72deg,rgba(180,180,180,0.25)_1.74%,rgba(79,79,79,0.25)_1.75%,rgba(255,255,255,0.25)_33.05%,rgba(175,175,175,0.25)_97.16%)] shadow-2xl"
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
                Guess the Word: Test Your Vocabulary and Logic Skills!
              </p>
            </div>
          </motion.div>
          <motion.img
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            src="/alexaverse2.0/hangman-img.svg"
            alt="Hangman Image"
            className="absolute top-[4.8vw] left-[-14.4vw] w-[76.8vw] h-[19.8vw] object-contain rounded-[2.1vw] drop-shadow-2xl"
          />
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative top-[26.4vw] left-[15vw] w-[18.6vw] h-[4.32vw] rounded-[3.12vw] border-[0.06vw] border-white backdrop-blur-[5vw] bg-[linear-gradient(122.72deg,rgba(144,144,144,0.25)_1.74%,rgba(63,63,63,0.25)_1.75%,rgba(204,204,204,0.25)_33.05%,rgba(140,140,140,0.25)_97.16%)] shadow-lg"
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
              className="absolute left-[9.36vw] top-[2.16vw] -translate-x-1/2 -translate-y-1/2 w-[9.36vw] h-[5.04vw] rounded-[3.12vw] border-[0.06vw] border-white backdrop-blur-[5vw] bg-white shadow-lg"
            >
              <img
                src="/alexaverse2.0/play-button.png"
                alt="Play Button"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[6.24vw] h-[1.92vw] object-contain"
              />
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute top-[22.2vw] left-[37.2vw] w-[48vw] h-[2.52vw] rounded-[3.12vw] border-[0.1vw] border-white backdrop-blur-[5vw] shadow-lg"
            style={{
              background: 'linear-gradient(to right, black 60%, transparent 20%)'
            }}
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 w-[5.04vw] h-[3.12vw] rounded-[3.12vw] border-[0.06vw] border-white backdrop-blur-[5vw] bg-white shadow-lg"
              style={{
                left: '60%',
                transform: 'translate(-50%, -50%)'
              }}
            ></div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute top-[27vw] left-[37.2vw] w-[48vw] h-[5.04vw] rounded-[1.44vw] border-[0.1vw] border-white backdrop-blur-[5vw] flex items-center justify-center p-[1.2vw] shadow-lg"
            style={{
              background: 'black'
            }}
          >
            <p className="text-white text-center font-inter text-[1.08vw] min-text-[14px] leading-tight">
              Ready to put your word skills to the test? Form a team of 3-4 members and compete in this classic word-guessing game with a modern twist!
            </p>
          </motion.div>
        </motion.div>

        {/* Heading with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative mb-10"
        >
          <motion.h2
            className="text-2xl sm:text-4xl font-audiowide text-center whitespace-nowrap relative z-10"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: "linear-gradient(90deg, #10b981, #3b82f6, #059669, #10b981)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Team Registration Form
          </motion.h2>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-xl rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Success/Error Message */}
        <AnimatePresence>
          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`mb-6 p-4 rounded-lg text-center max-w-2xl backdrop-blur-sm border shadow-lg ${
                submitSuccess 
                  ? 'bg-green-500/20 border-green-400 text-green-300' 
                  : 'bg-red-500/20 border-red-400 text-red-300'
              }`}
            >
              {submitMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onSubmit={handleSubmit}
          className="relative w-full max-w-6xl space-y-8 font-moul"
        >
          {/* Form background glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Team Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative z-10"
          >
            <motion.h3
              className="text-xl sm:text-2xl font-audiowide mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
            >
              Team Information
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <label
                htmlFor="teamName"
                className="block mb-2 font-moul text-white text-lg relative z-10"
              >
                Team Name<span className="text-red-500">*</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)" }}
                transition={{ type: "spring", stiffness: 300 }}
                type="text"
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleTeamNameChange}
                required
                placeholder="Enter your team name"
                className={`relative z-10 w-full px-4 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-inter placeholder-gray-500 text-black bg-white/95 backdrop-blur-sm transition-all duration-300 shadow-lg ${
                  errors.teamName ? 'border-red-500 shadow-lg shadow-red-500/25' : 'border-gray-400 hover:border-green-300'
                }`}
              />
              <AnimatePresence>
                {errors.teamName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm mt-1 font-inter relative z-10"
                  >
                    {errors.teamName}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Team Members */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="relative z-10"
          >
            <motion.h3
              className="text-xl sm:text-2xl font-audiowide mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
            >
              Team Members (3-4 members required)
            </motion.h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {formData.teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                  className="relative group bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-lg"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5,
                    }}
                  />
                  
                  <motion.h4
                    className="text-lg font-audiowide mb-4 text-center relative z-10"
                    style={{
                      background: "linear-gradient(90deg, #10b981, #3b82f6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Student {index + 1}
                  </motion.h4>
                  
                  <div className="space-y-4 relative z-10">
                    <div>
                      <label className="block mb-2 font-moul text-white text-sm">
                        Name<span className="text-red-500">*</span>
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        type="text"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        required
                        pattern="^[a-zA-Z\s]+$"
                        placeholder="Enter full name"
                        className="w-full px-3 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-inter placeholder-gray-500 text-black bg-white/95 backdrop-blur-sm transition-all duration-300 shadow-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-moul text-white text-sm">
                        Registration Number<span className="text-red-500">*</span>
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        type="text"
                        value={member.registrationNumber}
                        onChange={(e) => handleMemberChange(index, 'registrationNumber', e.target.value)}
                        required
                        pattern="^(?i)RA\d{13}$"
                        placeholder="RAXXXXXXXXXXXXX"
                        className="w-full px-3 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-inter placeholder-gray-500 text-black bg-white/95 backdrop-blur-sm transition-all duration-300 shadow-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-moul text-white text-sm">
                        SRMIST Email<span className="text-red-500">*</span>
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        type="email"
                        value={member.srmMailId}
                        onChange={(e) => handleMemberChange(index, 'srmMailId', e.target.value)}
                        required
                        pattern="^[a-zA-Z0-9._%+-]+@srmist\\.edu\\.in$"
                        placeholder="xyz@srmist.edu.in"
                        className="w-full px-3 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-inter placeholder-gray-500 text-black bg-white/95 backdrop-blur-sm transition-all duration-300 shadow-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-moul text-white text-sm">
                        Phone Number<span className="text-red-500">*</span>
                      </label>
                      <motion.div
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-full flex items-center border-2 rounded-lg bg-white/95 backdrop-blur-sm focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent overflow-hidden transition-all duration-300 shadow-md"
                      >
                        <span className="px-3 text-black text-sm font-inter border-r border-gray-400 bg-gray-100">
                          +91&nbsp;
                        </span>
                        <input
                          type="tel"
                          value={member.phoneNumber}
                          onChange={(e) => handleMemberChange(index, 'phoneNumber', e.target.value)}
                          required
                          pattern="^[0-9]{10}$"
                          placeholder="012 345 6789"
                          className="flex-1 px-3 py-3 text-black placeholder-gray-500 bg-transparent focus:outline-none font-inter"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className={`relative z-10 mx-auto mt-16 px-20 py-6 bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 border-2 border-white rounded-[50px] text-white font-monsterrat text-2xl flex items-center justify-center gap-4 transition-all duration-300 backdrop-blur-sm shadow-2xl ${
              isSubmitting 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-2xl hover:shadow-green-500/25'
            }`}
          >
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-[50px] blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full relative z-10"
                />
                <span className="relative z-10">Registering Team...</span>
              </>
            ) : (
              <>
                <span className="relative z-10">Register Team</span>
                <motion.img
                  whileHover={{ x: 5, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  src="/alexaverse2.0/right-arrow.png"
                  alt="Arrow"
                  className="w-6 h-6 object-contain filter invert ml-auto relative z-10"
                />
              </>
            )}
          </motion.button>
        </motion.form>
      </motion.section>
    </>
  );
};

export default RegisterHangman;