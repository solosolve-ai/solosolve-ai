
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Users, BarChart3, Shield, Brain, Zap, ArrowRight, Bot, Database, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Compact Gemma 3-270M model classifies complaints with high accuracy",
    color: "bg-purple-500"
  },
  {
    icon: MessageSquare,
    title: "Intelligent Chat",
    description: "Natural conversations with context-aware responses",
    color: "bg-blue-500"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Comprehensive dashboards for all stakeholders",
    color: "bg-green-500"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with role-based access control",
    color: "bg-orange-500"
  }
];

const technicalFeatures = [
  {
    icon: Bot,
    title: "Gemma 3-270M Foundation",
    description: "Fine-tuned compact Google Gemma 3-270M model with specialized complaint classification",
    details: "Multi-task learning architecture trained on 4.5K silver standard labels judged by Gemini 2.5 Pro"
  },
  {
    icon: Database,
    title: "Amazon Reviews 2023 Dataset",
    description: "Trained on curated Amazon Fashion reviews with Gemini 2.5 Pro supervision",
    details: "4.5K high-quality labeled complaints from Amazon Reviews 2023 dataset with precise resolution recommendations"
  },
  {
    icon: Cpu,
    title: "Hybrid AI Architecture",
    description: "Gemma for classification + Gemini for orchestration and response generation",
    details: "Vector embeddings with ChromaDB for semantic search and retrieval-augmented generation"
  }
];

const userTypes = [
  {
    type: "Customer",
    description: "Submit and track complaints, get instant AI assistance",
    features: ["AI Chat Support", "Complaint Tracking", "Status Updates", "File Uploads"]
  },
  {
    type: "Manager",
    description: "Oversee complaint resolution and team performance",
    features: ["Team Analytics", "Performance Metrics", "Workflow Management", "Reports"]
  },
  {
    type: "Admin",
    description: "Full system control and advanced analytics",
    features: ["System Control", "AI Monitoring", "User Management", "Advanced Analytics"]
  }
];

const Navbar = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <img
            src="/lovable-uploads/704cd890-e36f-4688-8aa1-a02ffa01eb64.png"
            alt="SoloSolve AI"
            className="h-8"
          />
        </motion.div>
        <div className="hidden md:flex items-center space-x-8">
          <motion.a 
            href="#features" 
            className="text-white/80 hover:text-white transition-colors"
            whileHover={{ y: -2 }}
          >
            Features
          </motion.a>
          <motion.a 
            href="#technology" 
            className="text-white/80 hover:text-white transition-colors"
            whileHover={{ y: -2 }}
          >
            Technology
          </motion.a>
          <motion.a 
            href="#users" 
            className="text-white/80 hover:text-white transition-colors"
            whileHover={{ y: -2 }}
          >
            User Types
          </motion.a>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={onGetStarted}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Try SoloSolver Chat
          </Button>
        </motion.div>
      </div>
    </motion.nav>
  );
};

const HeroSection = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            The Future of
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {" "}Complaint{" "}
            </motion.span>
            Management
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Powered by cutting-edge AI, SoloSolver revolutionizes customer service with intelligent 
            complaint classification, automated responses, and real-time analytics.
          </motion.p>
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-6 text-xl font-semibold"
              >
                Try SoloSolver Chat Now
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-3 h-6 w-6" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powered by Advanced AI
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Our system combines compact Gemma 3-270M for classification and Gemini for orchestration, 
            delivering efficient and intelligent complaint resolution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <motion.div 
                    className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/70">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TechnologySection = () => {
  return (
    <section id="technology" className="py-20 px-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Advanced AI Technology
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Built on efficient machine learning with 4.5K silver standard labels from Amazon Reviews 2023, 
            judged and supervised by Gemini 2.5 Pro for high-quality complaint classification.
          </p>
        </motion.div>

        <div className="space-y-8">
          {technicalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <motion.div 
                      className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-white/80 mb-4">
                        {feature.description}
                      </p>
                      <p className="text-white/60 text-sm">
                        {feature.details}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UserTypesSection = () => {
  return (
    <section id="users" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Built for Every User
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Role-based interfaces designed for customers, managers, and administrators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{user.type}</h3>
                  <p className="text-white/70 mb-6">{user.description}</p>
                  <ul className="space-y-3">
                    {user.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-center text-white/80"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (index * 0.2) + (featureIndex * 0.1) }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className="w-2 h-2 bg-purple-400 rounded-full mr-3"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: featureIndex * 0.2 }}
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Customer Service?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Experience the power of AI-driven complaint management. Try our intelligent chat system with simulated users.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="bg-white text-purple-900 hover:bg-gray-100 px-12 py-4 text-lg font-semibold"
            >
              Start SoloSolver Chat Now
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="ml-3 h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 -left-40 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute -bottom-40 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      <Navbar onGetStarted={onGetStarted} />
      <HeroSection onGetStarted={onGetStarted} />
      <FeaturesSection />
      <TechnologySection />
      <UserTypesSection />
      <CTASection onGetStarted={onGetStarted} />
    </div>
  );
};
