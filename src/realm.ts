import Realm from "realm";

export class RealmTester {
    private instanceUrl = "https://my-instance.us1.cloud.realm.io";
    private realmUrl = "https://my-instance.us1.cloud.realm.io/~/foo";
    private username = "";
    private password = "";

    public async run() {
        const credentials = Realm.Sync.Credentials.usernamePassword(this.username, this.password);
        const user = await Realm.Sync.User.login(this.instanceUrl, credentials);
        const config = user.createConfiguration({
            schema: [Person.schema],
            sync: {
                fullSynchronization: true,
                url: this.realmUrl,
            }
        });
        const realm = await Realm.open(config);

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