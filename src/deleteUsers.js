const admin = require("firebase-admin");
const serviceAccount = require("../fitnation-d749a-firebase-adminsdk-rt006-559de7dc07.json");
const databaseURL = "https://project-name.firebaseio.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
});

const deleteAllUsers = (nextPageToken) => {
  let uids = [];
  admin
    .auth()
    .listUsers(100, nextPageToken)
    .then((listUsersResult) => {
      uids = uids.concat(
        listUsersResult.users.map((userRecord) => userRecord.uid)
      );
      console.log(uids);
      if (listUsersResult.pageToken) {
        deleteAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log("Error listing users:", error);
    })
    .finally(() => {
      admin.auth().deleteUsers(uids);
    });
};

deleteAllUsers();
