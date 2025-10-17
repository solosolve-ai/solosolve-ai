
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, BarChart3, Settings, LogOut, User, ShieldCheck } from "lucide-react";

interface SimulatedUser {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
}

interface IndexProps {
  currentUser: SimulatedUser;
  onLogout: () => void;
}

const Index = ({ currentUser, onLogout }: IndexProps) => {
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <ShieldCheck className="h-4 w-4" />;
      case 'manager':
        return <Settings className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getRoleRoutes = (role: string) => {
    const baseRoutes = [
      {
        title: "SoloSolver Chat",
        description: "Talk to our AI complaint resolution assistant",
        icon: MessageSquare,
        href: "/chat",
        color: "bg-blue-500",
      },
    ];

    if (role === 'customer') {
      return [
        ...baseRoutes,
        {
          title: "My Dashboard",
          description: "View your complaint history and status",
          icon: BarChart3,
          href: "/user/dashboard",
          color: "bg-green-500",
        },
        {
          title: "My Profile",
          description: "Manage your account settings",
          icon: User,
          href: "/user/profile",
          color: "bg-purple-500",
        },
      ];
    }

    if (role === 'manager') {
      return [
        ...baseRoutes,
        {
          title: "Manager Dashboard",
          description: "Oversee complaint resolution processes",
          icon: BarChart3,
          href: "/manager/dashboard",
          color: "bg-orange-500",
        },
      ];
    }

    if (role === 'admin') {
      return [
        ...baseRoutes,
        {
          title: "Admin Dashboard",
          description: "Full system control and analytics",
          icon: Settings,
          href: "/admin/dashboard",
          color: "bg-red-500",
        },
      ];
    }

    return baseRoutes;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white">SoloSolver AI</h1>
              <p className="text-white/80 text-lg">Intelligent Complaint Management System</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardContent className="p-4 flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-white">{currentUser.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getRoleColor(currentUser.role)} flex items-center gap-1`}>
                        {getRoleIcon(currentUser.role)}
                        {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button 
                onClick={onLogout}
                variant="outline"
                className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getRoleRoutes(currentUser.role).map((route, index) => {
                const Icon = route.icon;
                return (
                  <Link key={index} to={route.href}>
                    <Card className="h-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-105">
                      <CardHeader>
                        <div className={`w-12 h-12 ${route.color} rounded-lg flex items-center justify-center mb-4`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-white">{route.title}</CardTitle>
                        <CardDescription className="text-white/80">
                          {route.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20">
                          Get Started
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
