import admin from 'firebase-admin';
import serviceAccount from '../../config/deezertospoti-firebase-adminsdk-9939f-3925e4fff1.json';
import { services } from '../../config/constants';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


export const getServiceConfig = async (callbackAuthName) => {
  const serviceName = services[callbackAuthName] || '';

  if (serviceName) {
    throw new Error('Unknown service');
  }

  try {
    const service = await db.collection('stream_services').doc(serviceName).get();
    return service.data();
  } catch( err ) {
    console.log(err);
    throw err;
  }
};
