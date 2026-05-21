import { addDoc, collection } from 'firebase/firestore';

// Configs
import { db } from '@/config/firebase';

// Models
import { PostTimeline } from '@/models/timelines.model';

export const postTimeline = async (data: PostTimeline) => {
  try {
    await addDoc(collection(db, 'timelines'), {
      ...data,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};
