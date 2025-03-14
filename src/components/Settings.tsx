import React, { useState } from 'react';
import { X, Database, Shield, AlertTriangle, Ban, Trash2, Crown } from 'lucide-react';
import { User } from '../lib/auth';

interface SettingsProps {
  username: string;
  currentUser: User;
  onClose: () => void;
}

function Settings({ username, currentUser, onClose }: SettingsProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedDatabase, setSelectedDatabase] = useState('Volcano1');

  // Admin Panel States
  const [targetUser, setTargetUser] = useState('');
  const [actionType, setActionType] = useState<'warn' | 'ban' | 'delete' | 'subscription'>('warn');
  const [banDuration, setBanDuration] = useState('3d');
  const [actionReason, setActionReason] = useState('');
  const [newRole, setNewRole] = useState<'free' | 'vip' | 'expert' | 'extended'>('free');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas nuevas no coinciden');
      return;
    }
    alert('Contraseña actualizada correctamente');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleAdminAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUser) {
      alert('Por favor ingresa un usuario');
      return;
    }
    
    const actionMessage = {
      warn: 'Advertencia enviada',
      ban: 'Usuario baneado',
      delete: 'Cuenta eliminada',
      subscription: 'Suscripción modificada'
    }[actionType];

    alert(actionMessage);
    setTargetUser('');
    setActionReason('');
  };

  const isAdminUser = currentUser.subscription_type === 'owner' || currentUser.subscription_type === 'staff';

  return (
    <div className="bg-[rgba(0,0,0,0.4)] backdrop-blur-sm rounded-xl p-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="w-6 h-6 text-red-500" />
          Configuración
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Cambiar Contraseña</h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Contraseña Actual</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Nueva Contraseña</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Confirmar Nueva Contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-2 rounded-lg transition-colors"
            >
              Guardar Cambios
            </button>
          </form>
        </div>

        <div className="space-y-6">
          {isAdminUser && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                Panel de Administración
              </h3>
              <form onSubmit={handleAdminAction} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Usuario</label>
                  <input
                    type="text"
                    value={targetUser}
                    onChange={(e) => setTargetUser(e.target.value)}
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
                    {currentUser.subscription_type === 'owner' && (
                      <option value="subscription">Modificar Suscripción</option>
                    )}
                  </select>
                </div>

                {actionType === 'ban' && (
                  <div>
                    <label className="block text-sm mb-2">Duración</label>
                    <select
                      value={banDuration}
                      onChange={(e) => setBanDuration(e.target.value)}
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

                {actionType === 'subscription' && currentUser.subscription_type === 'owner' && (
                  <div>
                    <label className="block text-sm mb-2">Nueva Suscripción</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as any)}
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
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500"
                    rows={3}
                    placeholder="Motivo de la acción..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {actionType === 'warn' && <AlertTriangle className="w-5 h-5" />}
                  {actionType === 'ban' && <Ban className="w-5 h-5" />}
                  {actionType === 'delete' && <Trash2 className="w-5 h-5" />}
                  {actionType === 'subscription' && <Crown className="w-5 h-5" />}
                  Ejecutar Acción
                </button>
              </form>
            </div>
          )}

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-red-500" />
              Base de Datos
            </h3>
            <select
              value={selectedDatabase}
              onChange={(e) => setSelectedDatabase(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[rgba(0,0,0,0.4)] border border-red-500/30 focus:border-red-500"
            >
              <option value="Volcano1">Volcano1</option>
              <option value="Volcano2">Volcano2</option>
              <option value="Volcano3">Volcano3</option>
              <option value="Volcano4">Volcano4</option>
            </select>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Archivos Bruteforce</h3>
            <div className="p-4 rounded-lg bg-[rgba(0,0,0,0.3)] border border-red-500/30">
              <p className="text-sm text-gray-300 mb-4">
                Con esta opción podrás establecer el archivo para aplicar el ataque de
                fuerza bruta para desencriptar las contraseñas, recuerda que los EXTENDED
                disponen de una mayor cantidad de archivos además de que estos son más
                potentes y efectivos.
              </p>
              <div className="bg-[rgba(0,0,0,0.4)] p-3 rounded-lg text-sm">
                diavlo4.txt (38 millones) [Extended]
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Integración Discord</h3>
            <div className="p-4 rounded-lg bg-[rgba(0,0,0,0.3)] border border-red-500/30">
              <p className="text-sm text-gray-300 mb-4">
                Recibe los roles de tu tarifa de Diavlo en Discord. Recuerda que debes de estar
                en nuestro server de Diavlo y que tendrás que escribir $claim (key)
              </p>
              <button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white py-2 rounded-lg transition-colors">
                Crear key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;