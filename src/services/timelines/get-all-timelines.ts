import { collection, getDocs } from 'firebase/firestore';

// Configs
import { db } from '@/config/firebase';

export const getAllTimelines = async () => {
  try {
    const query = await getDocs(collection(db, 'timelines'));

    const response = query.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return response;
  } catch (error) {
    console.error('Error getting documents: ', error);
    throw error;
  }
};
