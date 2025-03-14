import React, { useState } from 'react';
import { Shield, AlertTriangle, Ban, Trash2, Crown } from 'lucide-react';
import { User, AdminAction, Visibility } from '../types';

interface AdminPanelProps {
  currentUser: User;
  onAction: (action: AdminAction) => void;
}

function AdminPanel({ currentUser, onAction }: AdminPanelProps) {
  const [selectedUser, setSelectedUser] = useState('');
  const [actionType, setActionType] = useState<'warn' | 'ban' | 'delete' | 'subscription'>('warn');
  const [duration, setDuration] = useState('3d');
  const [reason, setReason] = useState('');
  const [newRole, setNewRole] = useState<Visibility>('free');

  const handleAction = () => {
    const action: AdminAction = {
      type: actionType,
      targetUser: selectedUser,
      performedBy: currentUser.username,
      timestamp: new Date().toISOString(),
      details: {
        duration: actionType === 'ban' ? duration : undefined,
        reason,
        newRole: actionType === 'subscription' ? newRole : undefined,
        warningText: actionType === 'warn' ? reason : undefined
      }
    };
    onAction(action);
  };

  return (
    <div className="bg-[rgba(0,0,0,0.4)] backdrop-blur-sm rounded-xl p-8 text-white">
      <div className="flex items-center gap-3 mb-6">
        {currentUser.visibility === 'owner' ? (
          <Crown className="w-6 h-6 text-yellow-500" />
        ) : (
          <Shield className="w-6 h-6 text-blue-500" />
        )}
        <h2 className="text-2xl font-bold">
          {currentUser.visibility === 'owner' ? 'Panel de Owner' : 'Panel de Staff'}
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm mb-2">Usuario</label>
          <input
            type="text"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500"
            placeholder="Nombre de usuario"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Acción</label>
          <select
            value={actionType}
            onChange={(e) => setActionType(e.target.value as any)}
            className="w-full px-4 py-2 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500"
          >
            <option value="warn">Warning</option>
            <option value="ban">Ban Temporal</option>
            <option value="delete">Eliminar Cuenta</option>
            {currentUser.visibility === 'owner' && (
              <option value="subscription">Modificar Suscripción</option>
            )}
          </select>
        </div>

        {actionType === 'ban' && (
          <div>
            <label className="block text-sm mb-2">Duración</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500"
            >
              <option value="1h">1 hora</option>
              <option value="12h">12 horas</option>
              <option value="1d">1 día</option>
              <option value="3d">3 días</option>
              <option value="7d">7 días</option>
              <option value="30d">30 días</option>
            </select>
          </div>
        )}

        {actionType === 'subscription' && currentUser.visibility === 'owner' && (
          <div>
            <label className="block text-sm mb-2">Nueva Suscripción</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as Visibility)}
              className="w-full px-4 py-2 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500"
            >
              <option value="free">Free</option>
              <option value="vip">VIP</option>
              <option value="expert">Expert</option>
              <option value="extended">Extended</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm mb-2">Razón</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500"
            rows={3}
            placeholder="Motivo de la acción..."
          />
        </div>

        <button
          onClick={handleAction}
          className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {actionType === 'warn' && <AlertTriangle className="w-5 h-5" />}
          {actionType === 'ban' && <Ban className="w-5 h-5" />}
          {actionType === 'delete' && <Trash2 className="w-5 h-5" />}
          {actionType === 'subscription' && <Crown className="w-5 h-5" />}
          Ejecutar Acción
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;