import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, getAuth, User as FirebaseUser } from "firebase/auth";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage"; 
import { auth } from "../../firebase-config";
import { storage } from "../../firebase-config"; 
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { doc, deleteDoc,  onSnapshot, collection, addDoc, updateDoc, getDoc, where, serverTimestamp, query, getDocs } from "firebase/firestore";
import db from "../../firebase-config";
// Import ref




export interface Reviews {
    id: string;
    location: string;
    options: string[];
    rating: number;
    review: string;
}
export interface User {
    email: string | null,
    uid: string | null,
    displayName: string | null
    photoURL: string | null
}

export const successMessage = (message:string) => {
	toast.success(message, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
};
export const errorMessage = (message:string) => {
	toast.error(message, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
	});
};


export const SignUpUser = (email: string, password: string, router: AppRouterInstance) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            successMessage("Registration successful 🎉");
            router.push("/login");
        })
        .catch((error) => {
            console.error(error);
            errorMessage("Incorrect Email/Password ❌");
        });
};

export const LoginUser = (email: string, password: string, router: AppRouterInstance) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            successMessage("Authentication successful 🎉");
            router.push("/review");
        })
        .catch((error) => {
            console.error(error);
            errorMessage("Incorrect Email/Password ❌");
        });
};

export const LogOut = (router: AppRouterInstance) => {
	signOut(auth)
		.then(() => {
			successMessage("Logout successful! 🎉");
			router.push("/");
		})
		.catch((error) => {
			errorMessage("Couldn't sign out ❌");
		});
};


export const updateProfileInfo = async (currentUser: FirebaseUser | null, firstName: string, lastName: string,  photoFile: File | null) => {
    try {
        if (!currentUser) {
            errorMessage("No user is signed in ❌");
            return;
        }

        // Combine first and last name for display name
        const displayName = `${firstName} ${lastName}`;

         // Update user profile with display name and photo URL
         let photoUrl = null;
         if (photoFile) {
             

            const storage = getStorage()
            const storageRef = ref(storage, `profile_photos/${currentUser.uid}/${photoFile.name}`)

            await uploadBytes(storageRef, photoFile)
          
             // Get the download URL
             photoUrl = await getDownloadURL(storageRef);
         }
        // Update user profile with display name and photo URL
        await updateProfile(currentUser, { displayName, photoURL: photoUrl });

        successMessage("Profile updated successfully! 🎉");
    } catch (error) {
        console.error(error);
        errorMessage("Failed to update profile ❌");
    }
};

export const addReviews = async ( 
    location: string,
    options: string[],
    rating: number,
    review: string,
    user: User
    ) => {
	try {
		await addDoc(collection(db, "reviews",), {
			 location, options, rating, review,  user: {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
               
            },
            timestamp: serverTimestamp()
		})
		successMessage(`review added! 🎉`)
	}	
		 catch (err) {
		errorMessage("Error! ❌")
		console.error(err)
	}

}

export const getReviews = async (setReviews: any) => {
	try {
        const sub = onSnapshot(collection(db, "reviews"), doc => {
            const docs: any = []
            doc.forEach((d: any) => {
              docs.unshift( { ...d.data(), id: d.id })
            });
			setReviews(docs)
        }) 
	} catch (err) {
		console.error(err)
		setReviews([])
	}
}


export const getReviewsData = async () => {
    try {
        const reviewsCollection = collection(db, "reviews");
        const querySnapshot = await getDocs(reviewsCollection);
        const reviewsHomeData: any = [];
        querySnapshot.forEach((doc) => {
            const review = {
                id: doc.id,
                ...doc.data()
            };
            reviewsHomeData.push(review);
        });

        return reviewsHomeData;
    } catch (error) {
        console.error("Error getting reviews:", error);
        return []; // Return an empty array in case of error
    }
};




export const deleteReview =  async ( id: string) => {
	try {
		await deleteDoc(doc(db, "reviews", id));
		successMessage(`review deleted 🎉`)
	} catch (err) {
		errorMessage("Encountered an error ❌")
		console.log(err)
	}

}
