import { RealmTester } from "./realm"

class App {
    public static async start() {
        const tester = new RealmTester();
        await tester.run();
    }
}

App.start().catch(e => {
    console.log("Error starting up: " + e);
});