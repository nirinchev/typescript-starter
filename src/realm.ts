import Realm from "realm";
import config from "./config.json";

export class RealmTester {
    public async run() {
        const credentials = Realm.Sync.Credentials.usernamePassword(config.username, config.password);
        const user = await Realm.Sync.User.login(config.instanceUrl, credentials);
        const realmConfig = user.createConfiguration({
            schema: [Person.schema],
            sync: {
                fullSynchronization: true,
                url: config.realmUrl,
            }
        });
        const realm = await Realm.open(realmConfig);
        if (realm.syncSession !== null) {
            console.log("Sync session: " + realm.syncSession.downloadAllServerChanges);
            await realm.syncSession.downloadAllServerChanges();
        }
        realm.close();
    }
}

class Person {
    public static schema: Realm.ObjectSchema = {
        name: "Person",
        primaryKey: "id",
        properties: {
            id: "string",
            name: "string",
        }
    };
}