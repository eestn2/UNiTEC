class User {
    private user_data: Record<string, unknown> = {};

    set(user: Record<string, unknown>) {
        this.user_data = user;
    }

    get data() {
        return new Proxy(this.user_data, {
            get: (target, prop: string) => target[prop],
        });
    }
}

export default new User();