import admin from 'firebase-admin';
import serviceAccount from '../../config/deezertospoti-firebase-adminsdk-9939f-7921a9fdf8.json';
import { checkServiceName } from './validations';

const { FieldValue } = admin.firestore;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/**
 * @param {String} rawServiceName
 */
export const getServiceConfig = async (rawServiceName) => {
  try {
    const serviceName = checkServiceName(rawServiceName);
    const service = await db.collection('stream_services').doc(serviceName).get();

    const gg = service.exists ? service.data() : {};
    console.log('cvv');
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// getServiceConfig('deezer');

/**
 * @param {String} rawServiceName
 * @param {String} uuid
 * @param {Object} data
 */
export const setUserToken = async (rawServiceName, uuid, data) => {
  try {
    const serviceName = checkServiceName(rawServiceName);
    const userRef = db.collection('connections').doc(uuid).collection('services').doc(serviceName);
    const res = await userRef.set(
      {
        ...data,
        timestamp: FieldValue.serverTimestamp()
      },
      { merge: true }
    );
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * @param {String} rawServiceName
 * @param {String} uuid
 */
export const removeUserToken = async (rawServiceName, uuid) => {
  try {
    const serviceName = checkServiceName(rawServiceName);
    const userRef = db.collection('connections').doc(uuid).collection('services').doc(serviceName);
    const res = await userRef.set(
      {
        timestamp: FieldValue.serverTimestamp()
      },
      { merge: false }
    );
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * @param {String} serviceName
 * @param {String} uuid
 */
export const getServiceTokenByUuid = async (serviceName, uuid) => {
  if (!uuid) {
    return {};
  }
  try {
    // const services = await db.collection('connections').listDocuments();
    // const vv = services.find(({ id }) => id === uuid);
    // // const vv = services.data();
    // const bb = await vv.collection('services').listDocuments();
    // const vvv = bb.find(({ id }) => id === serviceName);
    // console.log(services.empty);
    // // services.forEach((doc) => {
    // // });
    // if (!services.exists) {
    //   return {};
    // }
    const res = await db.collection('connections').doc(uuid).collection('services').doc(serviceName).get();
    const gg = res.exists ? res.data() : {};
    return gg;
    console.log(gg);
  } catch (err) {
    console.log(err);
    return null;
  }
};

getServiceTokenByUuid('deezer', 'R6aWwgsoi3npGeq81vw1N');
