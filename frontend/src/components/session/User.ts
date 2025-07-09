/**
 * @file User.ts
 * @description Singleton class for managing and accessing user session data throughout the application.
 * Provides methods to set and retrieve user data in a type-safe manner.
 * @author Haziel Magallanes
 * @date May 11, 2025
 */

import type { user as UserType } from "../../types/user";

/**
 * A singleton class for managing user session data.
 *
 * @class
 * @property {UserType | null} user_data - The internal storage for user session data.
 *
 * @method set(user: UserType): void
 *   Sets the user session data.
 * @method get data: Proxy<UserType | null>
 *   Returns a Proxy to access user session data properties directly.
 *
 * @example
 * ```typescript
 * import User from "./User";
 * User.set({ id: 1, name: "Alice", ... });
 * console.log(User.data.name); // "Alice"
 * ```
 * @author Haziel Magallanes
 */
class User {
    private user_data: UserType | null = null;

    /**
     * Sets the user session data.
     * @param {UserType} user - The user data to store.
     */
    set(user: UserType) {
        this.user_data = user;
    }

    /**
     * Returns a Proxy to access user session data properties directly.
     * @returns {Proxy<UserType | null>}
     */
    get data() {
        // If user_data is null, return a Proxy with all properties undefined
        return new Proxy(this.user_data ?? ({} as UserType), {
            get: (target: UserType, prop: string) => target[prop as keyof UserType],
        });
    }
}

export default new User();