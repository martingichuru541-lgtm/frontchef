import React from 'react';
import { Bell, Check, Trash2, X, Sparkles, ChefHat, MapPin, Tag } from 'lucide-react';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'chef' | 'price' | 'county' | 'order';
  actionTab?: string;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  onNavigateTab: (tab: any) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onClearAll,
  onNavigateTab,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'chef':
        return <ChefHat className="w-4 h-4 text-emerald-400" />;
      case 'county':
        return <MapPin className="w-4 h-4 text-teal-400" />;
      case 'price':
        return <Tag className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="absolute right-4 top-12 z-50 w-80 sm:w-96 rounded-2xl bg-stone-900/95 border border-white/15 backdrop-blur-2xl shadow-2xl p-4 text-stone-100 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <Bell className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-sm text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {notifications.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-[11px] text-stone-400 hover:text-stone-200 flex items-center gap-1 cursor-pointer"
              title="Clear all notifications"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
        {notifications.length > 0 ? (
          notifications.map(n => (
            <div
              key={n.id}
              onClick={() => {
                onMarkAsRead(n.id);
                if (n.actionTab) {
                  onNavigateTab(n.actionTab);
                  onClose();
                }
              }}
              className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                n.isRead
                  ? 'bg-stone-950/60 border-white/5 text-stone-400'
                  : 'bg-white/[0.04] border-emerald-500/30 text-stone-200 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-stone-800 flex items-center justify-center flex-shrink-0">
                    {getIcon(n.type)}
                  </div>
                  <h4 className="font-semibold text-xs text-white leading-tight">{n.title}</h4>
                </div>
                <span className="text-[10px] font-mono text-stone-500 flex-shrink-0">
                  {n.timestamp}
                </span>
              </div>

              <p className="text-[11px] text-stone-300 mt-1.5 pl-8 line-clamp-2 leading-relaxed">
                {n.message}
              </p>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-xs text-stone-500">
            No notifications right now.
          </div>
        )}
      </div>
    </div>
  );
};
