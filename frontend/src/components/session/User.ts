/**
 * @file User.ts
 * @description Singleton class for managing and accessing user session data throughout the application.
 * Provides methods to set and retrieve user data in a type-safe manner.
 * @author Haziel Magallanes
 * @date May 11, 2025
 */

/**
 * A singleton class for managing user session data.
 *
 * @class
 * @property {Record<string, unknown>} user_data - The internal storage for user session data.
 *
 * @method set(user: Record<string, unknown>): void
 *   Sets the user session data.
 * @method get data: Proxy<Record<string, unknown>>
 *   Returns a Proxy to access user session data properties directly.
 *
 * @example
 * ```typescript
 * import User from "./User";
 * User.set({ id: 1, name: "Alice" });
 * console.log(User.data.name); // "Alice"
 * ```
 * @author Haziel Magallanes
 */
class User {
    private user_data: Record<string, unknown> = {};

    /**
     * Sets the user session data.
     * @param {Record<string, unknown>} user - The user data to store.
     */
    set(user: Record<string, unknown>) {
        this.user_data = user;
    }

    /**
     * Returns a Proxy to access user session data properties directly.
     * @returns {Proxy<Record<string, unknown>>}
     */
    get data() {
        return new Proxy(this.user_data, {
            get: (target, prop: string) => target[prop],
        });
    }
}

export default new User();