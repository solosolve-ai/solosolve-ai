
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ComplaintCard } from "@/components/ComplaintCard";
import { FilterBar } from "@/components/FilterBar";
import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardStats from "@/components/DashboardStats";
import DashboardAnalytics from "@/components/DashboardAnalytics";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface SimulatedUser {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
}

interface UserDashboardProps {
  currentUser: SimulatedUser;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ currentUser }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");

  // Fetch actual user transaction data
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['user-transactions', currentUser.user_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transaction_history')
        .select('*')
        .eq('user_id', currentUser.user_id)
        .order('timestamp_review_dt', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Transform transaction data to complaint format
  const complaints = transactions.map((transaction, index) => ({
    id: `COM-${String(index + 1).padStart(3, '0')}`,
    title: transaction.complaint_title_text || transaction.product_title || 'Complaint',
    description: transaction.complaint_body_text || 'No description available',
    status: transaction.rating_review > 3 ? 'resolved' as const : 
            transaction.rating_review >= 2 ? 'in-progress' as const : 'new' as const,
    date: transaction.timestamp_review_dt ? new Date(transaction.timestamp_review_dt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    category: transaction.inferred_complaint_driver || 'General',
    priority: transaction.rating_review <= 2 ? 'high' as const : 'medium' as const,
    customerName: currentUser.name,
    orderNumber: transaction.asin_review || `ORD-${String(index + 1).padStart(5, '0')}`,
    channelOfComplaint: 'web' as const
  }));

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter;
    const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter;
    const matchesChannel = channelFilter === "all" || complaint.channelOfComplaint === channelFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesChannel;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DashboardHeader />
            </motion.div>
            
            <div className="grid gap-6 mb-8">
              <motion.div 
                className="bg-white/10 backdrop-blur border border-white/20 rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <DashboardStats complaints={complaints} />
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur border border-white/20 rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <DashboardAnalytics complaints={complaints} />
              </motion.div>
            </div>

            <motion.div 
              className="bg-white/10 backdrop-blur border border-white/20 rounded-xl shadow-lg p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FilterBar
                onSearchChange={setSearchQuery}
                onStatusChange={setStatusFilter}
                onPriorityChange={setPriorityFilter}
                onCategoryChange={setCategoryFilter}
                onUrgencyChange={setUrgencyFilter}
                onChannelChange={setChannelFilter}
              />
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {filteredComplaints.map((complaint, index) => (
                <motion.div
                  key={complaint.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ComplaintCard {...complaint} />
                </motion.div>
              ))}
              {filteredComplaints.length === 0 && (
                <motion.div 
                  className="col-span-full text-center py-12 text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  No complaints found matching your filters.
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default UserDashboard;
