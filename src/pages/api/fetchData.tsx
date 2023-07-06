import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {db} from "../../firebase/utils"



export default async (req:any, res:any) => {
    try {
      // const { collectionName } = req.query;
      // console.log("call",collectionName)
      const collectionRef = collection(db, "Categories");
      const snapshot = await getDocs(collectionRef);
  
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
  
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };