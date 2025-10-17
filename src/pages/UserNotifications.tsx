import { Card, CardContent } from "@/components/ui/card";
import { Bell, CheckCircle, AlertCircle, Clock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const UserNotifications = () => {
  const navigate = useNavigate();

  // Fetch real notifications based on recent transaction updates
  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['user-notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transaction_history')
        .select('*')
        .order('timestamp_review_dt', { ascending: false })
        .limit(20);
      
      if (error) throw error;

      return data.map((transaction, index) => {
        const daysSince = Math.floor((Date.now() - new Date(transaction.timestamp_review_dt || Date.now()).getTime()) / (1000 * 60 * 60 * 24));
        const timestamp = daysSince === 0 ? "Today" : daysSince === 1 ? "1 day ago" : `${daysSince} days ago`;
        
        let type: 'status' | 'response' | 'resolution' | 'update' = 'status';
        let title = "Complaint Status Updated";
        let description = `Your complaint about ${transaction.product_title || 'product'} has been reviewed`;
        
        if (transaction.rating_review && transaction.rating_review > 3) {
          type = 'resolution';
          title = "Complaint Resolved";
          description = `Your complaint about ${transaction.product_title || 'product'} has been resolved`;
        } else if (transaction.rating_review && transaction.rating_review >= 2) {
          type = 'response';
          title = "Response Received";
          description = `Support team has responded to your complaint about ${transaction.product_title || 'product'}`;
        } else if (transaction.inferred_complaint_driver) {
          type = 'update';
          title = "Complaint Categorized";
          description = `Your complaint has been categorized as: ${transaction.inferred_complaint_driver}`;
        }

        return {
          id: index + 1,
          title,
          description,
          timestamp,
          type,
          isRead: index > 5,
        };
      });
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

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
            <Bell className="h-5 w-5" />
            <span>Home</span>
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">Notifications</h1>
          <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
            {notifications.filter(n => !n.isRead).length} unread
          </span>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`transition-all duration-200 ${
                !notification.isRead 
                  ? 'bg-white/15 backdrop-blur border-white/30' 
                  : 'bg-white/10 backdrop-blur border-white/20'
              } hover:bg-white/20`}
            >
              <CardContent className="flex items-start space-x-4 p-4">
                <div className="mt-1">
                  {notification.type === 'status' && <Clock className="h-5 w-5 text-blue-400" />}
                  {notification.type === 'response' && <Bell className="h-5 w-5 text-yellow-400" />}
                  {notification.type === 'resolution' && <CheckCircle className="h-5 w-5 text-green-400" />}
                  {notification.type === 'update' && <AlertCircle className="h-5 w-5 text-red-400" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-white">{notification.title}</h3>
                    <span className="text-sm text-white/70">{notification.timestamp}</span>
                  </div>
                  <p className="text-sm text-white/80 mt-1">
                    {notification.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
          {notifications.length === 0 && (
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-white/50 mx-auto mb-4" />
                <p className="text-white/70">No notifications yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNotifications;
