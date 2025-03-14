import { User, AdminAction, UserRole, StaffLevel } from '../types';

export class AdminActions {
  static blockUser(admin: User, targetUser: User, duration: string): AdminAction {
    if (!this.canPerformAction(admin, 'block')) {
      throw new Error('No tienes permisos para realizar esta acción');
    }

    const action: AdminAction = {
      type: 'block',
      targetUser: targetUser.username,
      performedBy: admin.username,
      timestamp: new Date().toISOString(),
      details: {
        duration
      }
    };

    return action;
  }

  static setStaffLevel(admin: User, targetUser: User, level: StaffLevel): AdminAction {
    if (!this.canPerformAction(admin, 'staff')) {
      throw new Error('No tienes permisos para realizar esta acción');
    }

    const action: AdminAction = {
      type: 'staff',
      targetUser: targetUser.username,
      performedBy: admin.username,
      timestamp: new Date().toISOString(),
      details: {
        staffLevel: level
      }
    };

    return action;
  }

  static modifySubscription(admin: User, targetUser: User, newRole: UserRole, endDate: string): AdminAction {
    if (!this.canPerformAction(admin, 'subscription')) {
      throw new Error('No tienes permisos para realizar esta acción');
    }

    const action: AdminAction = {
      type: 'subscription',
      targetUser: targetUser.username,
      performedBy: admin.username,
      timestamp: new Date().toISOString(),
      details: {
        newRole,
        subscriptionEnd: endDate
      }
    };

    return action;
  }

  static modifyLlamas(admin: User, targetUser: User, amount: number): AdminAction {
    if (!this.canPerformAction(admin, 'llamas')) {
      throw new Error('No tienes permisos para realizar esta acción');
    }

    const action: AdminAction = {
      type: 'llamas',
      targetUser: targetUser.username,
      performedBy: admin.username,
      timestamp: new Date().toISOString(),
      details: {
        llamasAmount: amount
      }
    };

    return action;
  }

  private static canPerformAction(admin: User, actionType: string): boolean {
    if (admin.role === 'owner') return true;
    if (!admin.staffLevel) return false;

    const permissions = {
      block: [1, 2, 3, 4],
      staff: [3, 4],
      subscription: [2, 3, 4],
      llamas: [2, 3, 4],
      delete: [4]
    };

    return permissions[actionType]?.includes(admin.staffLevel) || false;
  }
}