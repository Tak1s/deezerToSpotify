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

    return service.exists ? service.data() : {};
  } catch (err) {
    console.log(err);
    throw err;
  }
};

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
    const res = await db.collection('connections').doc(uuid).collection('services').doc(serviceName).get();
    return res.exists ? res.data() : {};
  } catch (err) {
    console.log(err);
    return null;
  }
};
