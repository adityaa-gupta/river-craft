import { collection, getDocs, getFirestore, query, orderBy, limit, startAfter, where } from "firebase/firestore";
import { app } from "../_lib/firebase";
import { Product } from "../_type/product";

const db = getFirestore(app);

export async function getProductsPaginated(
  category: string = '',
  limitNum: number = 15,
  startAfterDoc: any = null
): Promise<{ products: Product[]; lastDoc: any }> {
  try {
    let q = query(collection(db, "products"), orderBy('createdAt', 'desc'), limit(limitNum));
    
    if (category) {
      q = query(q, where('category', '==', category));
    }
    
    if (startAfterDoc) {
      q = query(q, startAfter(startAfterDoc));
    }
    
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    
    return { products, lastDoc: snapshot.docs[snapshot.docs.length - 1] || null };
  } catch (error) {
    console.error('Error fetching paginated products:', error);
    return { products: [], lastDoc: null };
  }
}