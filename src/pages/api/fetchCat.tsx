import { getFirestore, collection, getDocs,getDoc ,doc} from 'firebase/firestore';
import {db} from "../../firebase/utils"
import {query,where} from 'firebase/firestore'




export default async function handler(req:any, res:any) {
    const {  name } = req.query;
  try {
    const collectionRef = collection(db, 'Categories'); // Replace 'your-collection' with the actual collection name
   
    const q = query(collectionRef, where('name', '==', name));
     let fetchSubCat:any=""
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data ={ id: doc.id, ...doc.data() } ;
      
      console.log("makedata",data)
      // Process the data as needed
        fetchSubCat=data
      
    });
        
    res.status(200).json({ fetchSubCat });
  } catch (error) {
    console.error('Error fetching documents: ', error);
    res.status(500).json({ error: 'Error fetching documents' });
  }
}