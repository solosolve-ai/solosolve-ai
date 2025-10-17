
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SimulatedUser {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
}

interface UserProfileProps {
  currentUser: SimulatedUser;
}

const UserProfile: React.FC<UserProfileProps> = ({ currentUser }) => {
  const navigate = useNavigate();

  // Fetch user complaint statistics from actual data
  const { data: userStats } = useQuery({
    queryKey: ['user-stats', currentUser.user_id],
    queryFn: async () => {
      const { data: complaints, error } = await supabase
        .from('transaction_history')
        .select('*')
        .eq('user_id', currentUser.user_id);
      
      if (error) throw error;

      const totalComplaints = complaints?.length || 0;
      const resolvedCount = complaints?.filter(c => c.rating_review && c.rating_review > 3).length || 0;
      const inProgressCount = complaints?.filter(c => c.rating_review && c.rating_review <= 3 && c.rating_review >= 2).length || 0;
      const newCount = complaints?.filter(c => !c.rating_review || c.rating_review < 2).length || 0;

      return {
        totalComplaints,
        resolved: resolvedCount,
        inProgress: inProgressCount,
        new: newCount
      };
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6">
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => navigate('/user/dashboard')}
            className="p-2 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-colors inline-flex items-center gap-2 text-white"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-colors inline-flex items-center gap-2 text-white"
            aria-label="Back to home"
          >
            <Home className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-white">My Profile</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-24 w-24 border-4 border-white/20">
                  <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input id="name" value={currentUser.name} readOnly className="bg-white/5 border-white/20 text-white" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input id="email" value={currentUser.email || 'Not provided'} readOnly className="bg-white/5 border-white/20 text-white" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">Role</Label>
                <Input id="role" value={currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} readOnly className="bg-white/5 border-white/20 text-white" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Account Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur p-6 rounded-lg border border-white/10">
                  <h3 className="text-sm font-medium text-white/70">Total Complaints</h3>
                  <p className="text-4xl font-bold text-white mt-2">{userStats?.totalComplaints || 0}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur p-6 rounded-lg border border-white/10">
                  <h3 className="text-sm font-medium text-white/70">Resolved</h3>
                  <p className="text-4xl font-bold text-white mt-2">{userStats?.resolved || 0}</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur p-6 rounded-lg border border-white/10">
                  <h3 className="text-sm font-medium text-white/70">In Progress</h3>
                  <p className="text-4xl font-bold text-white mt-2">{userStats?.inProgress || 0}</p>
                </div>
                <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur p-6 rounded-lg border border-white/10">
                  <h3 className="text-sm font-medium text-white/70">New</h3>
                  <p className="text-4xl font-bold text-white mt-2">{userStats?.new || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
