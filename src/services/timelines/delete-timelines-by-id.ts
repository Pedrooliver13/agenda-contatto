import { deleteDoc, doc } from 'firebase/firestore';

// Configs
import { db } from '@/config/firebase';

export const deletePriceById = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'timelines', id));
  } catch {
    throw new Error('Error deleting document');
  }
};
