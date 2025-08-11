"use client";

import React, { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { registerForVlogit, IndividualRegistration, ApiResponse } from "@/lib/api";

const RegisterVlogit: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<IndividualRegistration>({
    name: "",
    registrationNumber: "",
    srmMailId: "",
    phoneNumber: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitSuccess(null);
    setErrors({});

    try {
      const response: ApiResponse = await registerForVlogit(formData);
      
      if (response.success) {
        setSubmitSuccess(true);
        setSubmitMessage(response.message || 'Registration successful!');
        
        // Show success toast
        toast({
          title: "🎉 Registration Successful!",
          description: "You have been successfully registered for VLOG IT!",
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
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src="/alexaverse2.0/alexa-logo-navbar.svg"
            alt="Alexa Logo"
            className="h-10 sm:h-12 w-auto"
          />

          <div className="hidden md:flex gap-[32px] items-center">
            <motion.a
              whileHover={{ scale: 1.05, color: "#a855f7" }}
              transition={{ type: "spring", stiffness: 300 }}
              href="/alexaverse-v2"
              className="text-white font-audiowide text-[32px] transition-colors"
            >
              Home
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: "#a855f7" }}
              transition={{ type: "spring", stiffness: 300 }}
              href="/alexaverse-v2#events"
              className="text-white font-audiowide text-[32px] transition-colors"
            >
              Events
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, color: "#a855f7" }}
              transition={{ type: "spring", stiffness: 300 }}
              href="#contact"
              className="text-white font-audiowide text-[32px] transition-colors"
            >
              Contact Us
            </motion.a>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
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
              whileHover={{ scale: 1.1 }}
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
                  whileHover={{ scale: 1.05, color: "#a855f7" }}
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
        id="register-vlogit"
        className="w-full min-h-screen text-white flex flex-col items-center justify-center px-4 py-16"
      >
        {/* Event display section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-[85rem] w-[90vw] h-[40vw] min-h-[120px] mt-10 mb-10" 
          style={{ left: '-5vw' }}
        >
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
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
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
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
          </motion.div>
          <motion.img
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            src="/alexaverse2.0/vlogit-img.svg"
            alt="Vlogit Image"
            className="absolute top-[4.8vw] left-[-14.4vw] w-[76.8vw] h-[19.8vw] object-contain rounded-[2.1vw]"
          />
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
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
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
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
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="absolute top-[27vw] left-[37.2vw] w-[48vw] h-[5.04vw] rounded-[1.44vw] border-[0.1vw] border-white backdrop-blur-[5vw] flex items-center justify-center p-[1.2vw]"
            style={{
              background: 'black'
            }}
          >
            <p className="text-white text-center font-inter text-[1.08vw] min-text-[14px] leading-tight">
              Eager to flex your filmmaking skills? Capture the chaos, edit it clean, and deliver a masterpiece that makes us say &apos;Absolute Cinema&apos; to win big!
            </p>
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl sm:text-4xl font-audiowide mb-10 text-center whitespace-nowrap bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
        >
          Registration Form
        </motion.h2>

        {/* Success/Error Message */}
        <AnimatePresence>
          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`mb-6 p-4 rounded-lg text-center max-w-2xl backdrop-blur-sm border ${
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
          className="w-full max-w-6xl space-y-8 font-moul"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <label
                htmlFor="name"
                className="block mb-2 font-moul text-white text-lg"
              >
                Name<span className="text-red-500">*</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                pattern="^[a-zA-Z\s]+$"
                title="Only letters and spaces allowed"
                placeholder="Enter your full name"
                className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-inter placeholder-gray-500 text-black bg-white/95 backdrop-blur-sm transition-all duration-300 ${
                  errors.name ? 'border-red-500 shadow-lg shadow-red-500/25' : 'border-gray-400 hover:border-purple-300'
                }`}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm mt-1 font-inter"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <label
                htmlFor="registrationNumber"
                className="block mb-2 font-moul text-white text-lg"
              >
                Register Number<span className="text-red-500">*</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                required
                pattern="^(?i)RA\d{13}$"
                placeholder="RAXXXXXXXXXXXXX"
                title="Must start with RA followed by 13 digits"
                className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-inter placeholder-gray-500 text-black bg-white/95 backdrop-blur-sm transition-all duration-300 ${
                  errors.registrationNumber ? 'border-red-500 shadow-lg shadow-red-500/25' : 'border-gray-400 hover:border-purple-300'
                }`}
              />
              <AnimatePresence>
                {errors.registrationNumber && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm mt-1 font-inter"
                  >
                    {errors.registrationNumber}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <label
                htmlFor="phoneNumber"
                className="block mb-2 font-moul text-white text-lg"
              >
                Phone Number<span className="text-red-500">*</span>
              </label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-full flex items-center border-2 rounded-lg bg-white/95 backdrop-blur-sm focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent overflow-hidden transition-all duration-300 ${
                  errors.phoneNumber ? 'border-red-500 shadow-lg shadow-red-500/25' : 'border-gray-400 hover:border-purple-300'
                }`}
              >
                <span className="px-3 text-black text-md font-inter border-r border-gray-400 bg-gray-100">
                  +91&nbsp;
                </span>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  pattern="^[0-9]{10}$"
                  placeholder="012 345 6789"
                  title="Enter a valid 10-digit phone number"
                  className="flex-1 px-3 py-4 text-black placeholder-gray-500 bg-transparent focus:outline-none font-inter"
                />
              </motion.div>
              <AnimatePresence>
                {errors.phoneNumber && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm mt-1 font-inter"
                  >
                    {errors.phoneNumber}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <label
                htmlFor="srmMailId"
                className="block mb-2 font-moul text-white text-lg"
              >
                SRMIST Email<span className="text-red-500">*</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                type="email"
                id="srmMailId"
                name="srmMailId"
                value={formData.srmMailId}
                onChange={handleInputChange}
                required
                pattern="^[a-zA-Z0-9._%+-]+@srmist\\.edu\\.in$"
                placeholder="xyz@srmist.edu.in"
                title="Email must be an SRMIST ID ending with @srmist.edu.in"
                className={`w-full px-4 py-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-inter placeholder-gray-500 text-black bg-white/95 backdrop-blur-sm transition-all duration-300 ${
                  errors.srmMailId ? 'border-red-500 shadow-lg shadow-red-500/25' : 'border-gray-400 hover:border-purple-300'
                }`}
              />
              <AnimatePresence>
                {errors.srmMailId && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm mt-1 font-inter"
                  >
                    {errors.srmMailId}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className={`mx-auto mt-16 px-20 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 border-2 border-white rounded-[50px] text-white font-monsterrat text-2xl flex items-center justify-center gap-4 transition-all duration-300 backdrop-blur-sm ${
              isSubmitting 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-2xl hover:shadow-purple-500/25'
            }`}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
                Registering...
              </>
            ) : (
              <>
                Register
                <motion.img
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  src="/alexaverse2.0/right-arrow.png"
                  alt="Arrow"
                  className="w-6 h-6 object-contain filter invert ml-auto"
                />
              </>
            )}
          </motion.button>
        </motion.form>
      </motion.section>
    </>
  );
};

export default RegisterVlogit;