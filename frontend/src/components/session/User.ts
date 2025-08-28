/**
 * @file User.ts
 * @description Singleton class for managing and accessing user session data throughout the application.
 * Provides methods to set and retrieve user data in a type-safe manner.
 * @author Haziel Magallanes
 * @date May 11, 2025
 */

import type { user } from "../../types/user";


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
    private user_data: user | null = null;

    /**
     * Sets the user session data.
     * @param {user} user - The user data to store.
     */
    set(user: user) {
        this.user_data = user;
    }

    /**
     * Clears the user session data.
     */
    clear() {
        this.user_data = null;
    }
    /**
     * Returns a Proxy to access user session data properties directly.
     * @returns {Proxy<user | null>}
     */
    get data() {
        // If user_data is null, return a Proxy with all properties undefined
        return new Proxy(this.user_data ?? ({} as user), {
            get: (target: user, prop: string) => target[prop as keyof user],
        });
    }
}

export default new User();