import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ComplaintCard } from "@/components/ComplaintCard";
import { FilterBar } from "@/components/FilterBar";
import DashboardStats from "@/components/DashboardStats";
import DashboardAnalytics from "@/components/DashboardAnalytics";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Users, UserCheck, UserX } from "lucide-react";

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

const teamMembers = [
  {
    id: 1,
    name: "John Smith",
    role: "Senior Agent",
    status: "active",
    assignedComplaints: 12,
    resolutionRate: "95%",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Customer Service Agent",
    status: "active",
    assignedComplaints: 8,
    resolutionRate: "88%",
  },
  {
    id: 3,
    name: "Mike Wilson",
    role: "Customer Service Agent",
    status: "away",
    assignedComplaints: 5,
    resolutionRate: "92%",
  },
];

const ManagerDashboard = () => {
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
              <h1 className="text-3xl font-bold text-white">Manager Dashboard</h1>
              <p className="text-gray-400 mt-2">Team and Complaint Management Overview</p>
            </header>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-navy-light">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="team">Team Management</TabsTrigger>
                <TabsTrigger value="complaints">Complaints</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="p-6 bg-navy-light text-white">
                    <Users className="h-8 w-8 mb-4 text-primary" />
                    <h3 className="text-lg font-semibold">Team Members</h3>
                    <p className="text-3xl font-bold mt-2">{teamMembers.length}</p>
                  </Card>
                  <Card className="p-6 bg-navy-light text-white">
                    <UserCheck className="h-8 w-8 mb-4 text-green-500" />
                    <h3 className="text-lg font-semibold">Active Agents</h3>
                    <p className="text-3xl font-bold mt-2">
                      {teamMembers.filter((m) => m.status === "active").length}
                    </p>
                  </Card>
                  <Card className="p-6 bg-navy-light text-white">
                    <UserX className="h-8 w-8 mb-4 text-yellow-500" />
                    <h3 className="text-lg font-semibold">Away Agents</h3>
                    <p className="text-3xl font-bold mt-2">
                      {teamMembers.filter((m) => m.status === "away").length}
                    </p>
                  </Card>
                </div>
                <DashboardStats complaints={complaints} />
                <DashboardAnalytics complaints={complaints} />
              </TabsContent>

              <TabsContent value="team">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers.map((member) => (
                    <Card key={member.id} className="p-6 bg-navy-light text-white">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          member.status === "active" ? "bg-green-500" : "bg-yellow-500"
                        }`}>
                          {member.status}
                        </span>
                      </div>
                      <p className="text-gray-400">{member.role}</p>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between">
                          <span>Assigned Complaints:</span>
                          <span>{member.assignedComplaints}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Resolution Rate:</span>
                          <span>{member.resolutionRate}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="complaints">
                <FilterBar
                  onSearchChange={setSearchQuery}
                  onStatusChange={setStatusFilter}
                  onPriorityChange={setPriorityFilter}
                  onCategoryChange={setCategoryFilter}
                  onUrgencyChange={setUrgencyFilter}
                  onChannelChange={setChannelFilter}
                  showPriorityFilter={true}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredComplaints.map((complaint) => (
                    <ComplaintCard 
                      key={complaint.id} 
                      {...complaint}
                      showPriority={true}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="p-6 bg-navy-light text-white">
                  <h2 className="text-xl font-semibold mb-4">Team Settings</h2>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">Complaint Assignment Rules</h3>
                      <p className="text-gray-400">Configure automatic complaint distribution among team members</p>
                    </div>
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">Performance Metrics</h3>
                      <p className="text-gray-400">Set KPIs and performance targets for the team</p>
                    </div>
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h3 className="font-medium mb-2">Notification Preferences</h3>
                      <p className="text-gray-400">Manage team notifications and alerts</p>
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

export default ManagerDashboard;