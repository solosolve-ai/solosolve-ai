import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ComplaintCard } from "@/components/ComplaintCard";
import { FilterBar } from "@/components/FilterBar";
import DashboardStats from "@/components/DashboardStats";
import DashboardAnalytics from "@/components/DashboardAnalytics";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Users, Shield, Database, Settings } from "lucide-react";

// Real complaint data from labeled_complaints_500.csv
const realComplaintsData = [
  {
    text: "These have fallen apart in less than 2 months, seriously horrible quality.",
    product_title: "NELEUS Women's 3 Pack Compression Base Layer Dry Fit Tank Top",
    price: 21.96,
    rating: 2.0,
    complaint_category: "Damaged or Defective",
    resolution_recommendation: "Replacement"
  },
  {
    text: "So flat like an ass",
    product_title: "Jeanewpole1 Womens Down Puffer Short Jacket Quilted Lightweight Coats Outerwear",
    price: 54.99,
    rating: 1.0,
    complaint_category: "Item Not as Described",
    resolution_recommendation: "Full Refund"
  },
  {
    text: "Way too large, material also stretches out. Order DOWN!",
    product_title: "U.S. Polo Assn. Womens Jogger Lounge Pants  Pajama Pants for Women",
    price: 14.95,
    rating: 2.0,
    complaint_category: "Incorrect Size / Fit",
    resolution_recommendation: "Replacement"
  },
  {
    text: "The frames were already bent when taken out of the package.",
    product_title: "Womens Elegant Rimless Shield Warp Luxury Designer Sunglasses",
    price: 12.95,
    rating: 1.0,
    complaint_category: "Damaged or Defective",
    resolution_recommendation: "Replacement"
  },
  {
    text: "The only thing that saw the same as what was pictured was the colors! The fabric for the top was thin and flimsy.",
    product_title: "Adult Sexy Birthday Cake Costume",
    price: 49.99,
    rating: 1.0,
    complaint_category: "Item Not as Described",
    resolution_recommendation: "Full Refund"
  }
];

const complaints = realComplaintsData.map((item, index) => ({
  id: `COM-${String(index + 1).padStart(3, '0')}`,
  title: item.product_title,
  description: item.text,
  status: item.rating >= 2 ? 'in-progress' as const : 'new' as const,
  date: new Date(Date.now() - index * 86400000).toISOString().split('T')[0],
  category: item.complaint_category,
  priority: item.rating <= 1 ? 'high' as const : 'medium' as const,
  customerName: `Customer ${index + 1}`,
  orderNumber: `ORD-${String(12345 + index).padStart(5, '0')}`,
}));

const systemMetrics = {
  totalUsers: 1250,
  activeUsers: 890,
  systemUptime: "99.9%",
  averageResponseTime: "1.2s",
  storageUsed: "45%",
  apiRequests: "25K/day",
};

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter;
    const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-navy">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 mt-2">System Administration and Analytics</p>
            </header>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-navy-light">
                <TabsTrigger value="overview">System Overview</TabsTrigger>
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">System Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="p-6 bg-navy-light text-white">
                    <Users className="h-8 w-8 mb-4 text-primary" />
                    <h3 className="text-lg font-semibold">Total Users</h3>
                    <p className="text-3xl font-bold mt-2">{systemMetrics.totalUsers}</p>
                    <p className="text-sm text-gray-400 mt-1">Active: {systemMetrics.activeUsers}</p>
                  </Card>
                  <Card className="p-6 bg-navy-light text-white">
                    <Shield className="h-8 w-8 mb-4 text-green-500" />
                    <h3 className="text-lg font-semibold">System Health</h3>
                    <p className="text-3xl font-bold mt-2">{systemMetrics.systemUptime}</p>
                    <p className="text-sm text-gray-400 mt-1">Uptime</p>
                  </Card>
                  <Card className="p-6 bg-navy-light text-white">
                    <Database className="h-8 w-8 mb-4 text-yellow-500" />
                    <h3 className="text-lg font-semibold">System Usage</h3>
                    <p className="text-3xl font-bold mt-2">{systemMetrics.apiRequests}</p>
                    <p className="text-sm text-gray-400 mt-1">API Requests</p>
                  </Card>
                </div>
                <Card className="p-6 bg-navy-light text-white mb-6">
                  <h2 className="text-xl font-semibold mb-4">System Performance</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg mb-2">Response Time</h3>
                      <p className="text-3xl font-bold">{systemMetrics.averageResponseTime}</p>
                      <p className="text-sm text-gray-400">Average response time</p>
                    </div>
                    <div>
                      <h3 className="text-lg mb-2">Storage Usage</h3>
                      <p className="text-3xl font-bold">{systemMetrics.storageUsed}</p>
                      <p className="text-sm text-gray-400">Of total capacity</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="users">
                <Card className="p-6 bg-navy-light text-white">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">User Management</h2>
                    <div className="flex gap-4">
                      <span className="px-3 py-1 bg-primary rounded-full text-sm">
                        Total: {systemMetrics.totalUsers}
                      </span>
                      <span className="px-3 py-1 bg-green-500 rounded-full text-sm">
                        Active: {systemMetrics.activeUsers}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">Role Management</h3>
                      <p className="text-gray-400">Configure user roles and permissions</p>
                    </div>
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">Access Control</h3>
                      <p className="text-gray-400">Manage user access and restrictions</p>
                    </div>
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">User Analytics</h3>
                      <p className="text-gray-400">View detailed user activity and metrics</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <DashboardStats complaints={complaints} />
                <DashboardAnalytics complaints={complaints} />
                <Card className="p-6 bg-navy-light text-white mt-6">
                  <h2 className="text-xl font-semibold mb-4">Advanced Analytics</h2>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">Trend Analysis</h3>
                      <p className="text-gray-400">View long-term complaint patterns and trends</p>
                    </div>
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">Performance Metrics</h3>
                      <p className="text-gray-400">System-wide performance indicators</p>
                    </div>
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">Custom Reports</h3>
                      <p className="text-gray-400">Generate detailed custom analytics reports</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="p-6 bg-navy-light text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <Settings className="h-6 w-6" />
                    <h2 className="text-xl font-semibold">System Settings</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">General Configuration</h3>
                      <p className="text-gray-400">Basic system settings and preferences</p>
                    </div>
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">Security Settings</h3>
                      <p className="text-gray-400">Configure system security and access controls</p>
                    </div>
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">Integration Management</h3>
                      <p className="text-gray-400">Manage third-party integrations and APIs</p>
                    </div>
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">Backup & Maintenance</h3>
                      <p className="text-gray-400">System backup and maintenance settings</p>
                    </div>
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">Notification Settings</h3>
                      <p className="text-gray-400">Configure system-wide notification rules</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;