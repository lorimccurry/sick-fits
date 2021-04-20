import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';
// At its simplest, the access control returns a yes or no value depending on the user session

export function isSignedIn({ session }: ListAccessArgs): boolean {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check if someone meets a criteria - yes or no.
// "singular" in nature
export const permissions = {
  ...generatedPermissions,
};

// Rule based function
// Rules can return a boolean or a filter which limits which products they can CRUD
// a collection of permissions
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    // do they have the permission of canManageProducts
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // if not, do they own this item (return a where filter)
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true; // they can read everything
    }

    // they should only see available products based on the status field
    return { status: 'AVAILABLE' };
  },
};
