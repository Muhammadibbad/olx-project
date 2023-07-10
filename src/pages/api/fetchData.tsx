import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {db} from "../../firebase/utils"





export default async function handler(req:any, res:any) {
  try {
    const querySnapshot = await getDocs(collection(db, 'AdDetail'));
    const documents = querySnapshot.docs.map((doc) => {
      return {id:doc.id, ...doc.data()}
      
    
    });
    res.status(200).json({ documents });
  } catch (error) {
    console.error('Error fetching documents: ', error);
    res.status(500).json({ error: 'Error fetching documents' });
  }
}