// "use client";
// import { useForm } from "react-hook-form";
// import { useState, useCallback, useEffect } from "react";
// import { uploadImageToSupabase } from "../_services/upload";
// import { Product } from "../_type/product";
// import { collection, addDoc, getFirestore } from "firebase/firestore";
// import { app } from "../_lib/firebase";
// import { Toaster, toast } from 'sonner';
// import { useRouter } from "next/navigation";

// const db = getFirestore(app);

// type FormValues = {
// 	name: string;
// 	category: string;
// 	price: string;
// 	description: string;
//   imageUrls: string[]
// 	images: FileList;
// };

// export default function ProductUploadPage() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<FormValues>();
//   // Using toast notifications instead of state for messages
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);

//   const router = useRouter()

//   const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     console.log("Files : ",files)
//     if (files) {
//       const urls = Array.from(files).map(file => URL.createObjectURL(file));
//       console.log("URLS : ",urls)
//       setPreviewUrls(prev => {
//         prev.forEach(url => URL.revokeObjectURL(url));
//         return urls;
//       });
//     }
//   }, []);

//   useEffect(()=>{
//     console.log("PREV : URLS : ",previewUrls)
//   },[previewUrls])

// 	const onSubmit = async (data: FormValues) => {
//     console.log(data,"data");
//     const promise = async () => {
//       // Upload images to Supabase
//       const bucket = "products";
//       const imageUrls: string[] = [];
//       console.log("HERE",data);
//       if (data.images && data.images.length >= 0) {
//         console.log("Inside",data.imageUrls,data.imageUrls);
//         for (let i = 0; i < data.images.length; i++) {
//           const file = data.images[i];
//           const path = `${Date.now()}_${file.name}`;
//           const { url, error: uploadError } = await uploadImageToSupabase(file, bucket, path);
//           if (uploadError || !url) {
//             throw uploadError || new Error("Image upload failed");
//           }
//           imageUrls.push(url);
//         }
//       }

//       console.log(imageUrls,"imageUrl");

//       // Save product to Firebase
//       const product: Product = {
//         name: data.name,
//         category: data.category,
//         price: Number(data.price),
//         description: data.description,
//         imageUrls,
//         createdAt: new Date(),
//       };

//       const res = await addDoc(collection(db, "products"), product);
//       return res;
//     };

//     toast.promise(promise(), {
//       loading: 'Uploading product...',
//       success: (data) => {
//         reset();
//         setPreviewUrls([]);
//         setTimeout(() => {
//           router.push('/');
//         }, 1000); // Wait for 1 second to show the success message before redirecting
//         return 'Product uploaded successfully! 🎉';
//       },
//       error: (err) => {
//         return err.message || 'Failed to upload product';
//       },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#f8f9fc] text-black">
//       <Toaster position="top-center" expand={true} richColors />
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="flex flex-col md:flex-row">
//             {/* Left Panel - Image Upload */}
//             <div className="md:w-1/2 bg-[#1a1f36] p-8">
//               <h2 className="text-2xl font-bold text-white mb-6">Product Images</h2>
//               <div className="space-y-4">
//                 <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center">
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     {...register("images", { required: "At least one image is required" })}
//                     onChange={handleImageChange}
//                     className="hidden"
//                     id="image-upload"
//                   />
//                   <label
//                     htmlFor="image-upload"
//                     className="cursor-pointer flex flex-col items-center justify-center"
//                   >
//                     <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                       </svg>
//                     </div>
//                     <span className="text-blue-400 font-medium">Click to upload images</span>
//                     <span className="text-gray-400 text-sm mt-2">PNG, JPG up to 10MB</span>
//                   </label>
//                 </div>
//                 {errors.images && (
//                   <p className="text-red-400 text-sm">{errors.images.message}</p>
//                 )}
//                 {/* Image Preview Grid */}
//                 {previewUrls.length > 0 && (
//                   <div className="grid grid-cols-2 gap-4 mt-6">
//                     {previewUrls.map((url, index) => (
//                       <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-800">
//                         <img
//                           src={url}
//                           alt={`Preview ${index + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Right Panel - Product Details */}
//             <div className="md:w-1/2 p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
//               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
//                   <input
//                     type="text"
//                     {...register("name", { required: "Product name is required" })}
//                     className={`w-full px-4 py-3 rounded-lg border ${
//                       errors.name ? "border-red-500" : "border-gray-300"
//                     } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
//                     placeholder="Enter product name"
//                   />
//                   {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//                   <input
//                     type="text"
//                     {...register("category", { required: "Category is required" })}
//                     className={`w-full px-4 py-3 rounded-lg border ${
//                       errors.category ? "border-red-500" : "border-gray-300"
//                     } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
//                     placeholder="Enter category"
//                   />
//                   {errors.category && <span className="text-red-500 text-xs mt-1">{errors.category.message}</span>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
//                   <div className="relative">
//                     <span className="absolute left-4 top-3 text-gray-500">$</span>
//                     <input
//                       type="number"
//                       step="0.01"
//                       {...register("price", { required: "Price is required" })}
//                       className={`w-full pl-8 pr-4 py-3 rounded-lg border ${
//                         errors.price ? "border-red-500" : "border-gray-300"
//                       } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
//                       placeholder="0.00"
//                     />
//                   </div>
//                   {errors.price && <span className="text-red-500 text-xs mt-1">{errors.price.message}</span>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                   <textarea
//                     {...register("description", { required: "Description is required" })}
//                     className={`w-full px-4 py-3 rounded-lg border ${
//                       errors.description ? "border-red-500" : "border-gray-300"
//                     } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px]`}
//                     placeholder="Enter product description"
//                     rows={4}
//                   />
//                   {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold
//                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
//                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
//                 >
//                   {isSubmitting ? (
//                     <div className="flex items-center justify-center">
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                       Uploading...
//                     </div>
//                   ) : (
//                     "Upload Product"
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Status Messages have been replaced with toast notifications */}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useCallback, useEffect } from "react";
import { uploadImageToSupabase } from "../_services/upload";
import { Product } from "../_type/product";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "../_lib/firebase";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

const db = getFirestore(app);

const categories = [
  { id: "mirror", name: "Mirror" },
  { id: "painting", name: "Painting" },
  { id: "nameplate", name: "Nameplate" },
  { id: "canvas", name: "Canvas" },
];

export default function ProductUploadPage() {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      console.log(
        "Selected files:",
        files ? Array.from(files).map((f) => f.name) : "None"
      ); // Debug
      if (files && files.length > 0) {
        const fileArray = Array.from(files);
        setImages(fileArray);
        const urls = fileArray.map((file) => URL.createObjectURL(file));
        setPreviewUrls((prev) => {
          prev.forEach((url) => URL.revokeObjectURL(url));
          return urls;
        });
      } else {
        setImages([]);
        setPreviewUrls([]);
      }
    },
    []
  );

  useEffect(() => {
    return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [previewUrls]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Product name is required";
    if (!category) newErrors.category = "Category is required";
    if (!price || Number(price) < 0)
      newErrors.price = "Valid price is required";
    if (!description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    console.log("Form data:", {
      name,
      category,
      price,
      description,
      images: images.map((f) => f.name),
    }); // Debug

    const promise = async () => {
      const imageUrls: string[] = [];
      const maxSize = 10 * 1024 * 1024; // 10MB
      const bucket = "products";

      // Upload images if any
      if (images.length > 0) {
        // Validate file size and type
        for (const file of images) {
          if (file.size > maxSize) {
            throw new Error(`Image ${file.name} exceeds 10MB limit`);
          }
          if (!file.type.match(/^image\/(jpeg|png|webp|gif)$/)) {
            throw new Error(
              `Invalid file type for ${file.name}. Supported: JPEG, PNG, WebP, GIF`
            );
          }
        }

        // Upload images concurrently
        const uploadPromises = images.map((file) =>
          uploadImageToSupabase(
            file,
            bucket,
            `products/${name}_${Date.now()}_${file.name}`
          )
        );
        const results = await Promise.all(uploadPromises);
        console.log("Upload results:", results); // Debug

        for (const { url, error } of results) {
          if (error || !url) {
            throw error || new Error(`Failed to upload image`);
          }
          imageUrls.push(url);
        }
      } else {
        console.log("No images selected"); // Debug
      }

      // Save product to Firestore
      const product: Product = {
        name,
        category,
        price: Number(price),
        description,
        imageUrls,
        createdAt: new Date(),
      };
      console.log("Saving product:", product); // Debug

      return await addDoc(collection(db, "products"), product);
    };

    toast.promise(promise(), {
      loading: "Uploading product...",
      success: () => {
        setName("");
        setCategory("");
        setPrice("");
        setDescription("");
        setImages([]);
        setPreviewUrls([]);
        setTimeout(() => router.push("/"), 1000);
        return "Product uploaded successfully! 🎉";
      },
      error: (err) => err.message || "Failed to upload product",
      finally: () => setIsSubmitting(false),
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-black">
      <Toaster position="top-center" expand={true} richColors />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Panel - Image Upload */}
            <div className="md:w-1/2 bg-[#1a1f36] p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Product Images
              </h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <span className="text-blue-400 font-medium">
                      Click to upload images
                    </span>
                    <span className="text-gray-400 text-sm mt-2">
                      PNG, JPG, WebP, GIF up to 10MB
                    </span>
                  </label>
                </div>
                {errors.images && (
                  <p className="text-red-400 text-sm">{errors.images}</p>
                )}
                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {previewUrls.map((url, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden bg-gray-800"
                      >
                        <Image
                          fill
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Product Details */}
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Product Details
              </h2>
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.category}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={`w-full pl-8 pr-4 py-3 rounded-lg border ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.price}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px]`}
                    placeholder="Enter product description"
                    rows={4}
                  />
                  {errors.description && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.description}
                    </span>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Uploading...
                      </div>
                    ) : (
                      "Upload Product"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setName("");
                      setCategory("");
                      setPrice("");
                      setDescription("");
                      setImages([]);
                      setPreviewUrls([]);
                      setErrors({});
                    }}
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-300 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
