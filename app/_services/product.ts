import {
  collection,
  getDocs,
  getFirestore,
  query,
  orderBy,
  limit,
  startAfter,
  where,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { app } from "../_lib/firebase";
import { Product } from "../_type/product";

const db = getFirestore(app);

export async function getProductsPaginated(
  category: string = "",
  limitNum: number = 15,
  startAfterDoc: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{
  products: Product[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> {
  try {
    let q = query(
      collection(db, "products"),
      orderBy("createdAt", "desc"),
      limit(limitNum)
    );

    if (category) {
      q = query(q, where("category", "==", category));
    }

    if (startAfterDoc) {
      q = query(q, startAfter(startAfterDoc));
    }

    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Product)
    );

    return {
      products,
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    };
  } catch (error: unknown) {
    console.error("Error fetching paginated products:", error);
    return { products: [], lastDoc: null };
  }
}

export async function getProductsByPage(
  category: string = "",
  limitNum: number = 12,
  skip: number = 0
): Promise<{
  products: Product[];
  totalCount: number;
}> {
  try {
    // First get total count for pagination
    let countQuery = query(collection(db, "products"));
    if (category) {
      countQuery = query(countQuery, where("category", "==", category));
    }
    const countSnapshot = await getDocs(countQuery);
    const totalCount = countSnapshot.size;

    // Then get paginated results
    let q = query(
      collection(db, "products"),
      orderBy("createdAt", "desc"),
      limit(limitNum)
    );

    if (category) {
      q = query(q, where("category", "==", category));
    }

    // Use skip for pagination - note: Firestore doesn't have a built-in skip
    // This is a simplified approach and not efficient for large collections
    let fetchQuery = q;
    if (skip > 0) {
      const skipSnapshot = await getDocs(
        query(
          collection(db, "products"),
          orderBy("createdAt", "desc"),
          limit(skip)
        )
      );

      const lastVisible = skipSnapshot.docs[skipSnapshot.docs.length - 1];
      if (lastVisible) {
        fetchQuery = query(q, startAfter(lastVisible));
      }
    }

    const snapshot = await getDocs(fetchQuery);
    const products = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Product)
    );

    return {
      products,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    return { products: [], totalCount: 0 };
  }
}
