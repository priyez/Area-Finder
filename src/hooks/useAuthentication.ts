import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

const useAuthentication = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false); // Set loading to false once authentication state is checked
      if (user) { // If user is authenticated
        setAuthenticated(true); // Set authenticated state to true
      } else { // If user is not authenticated
        router.push("/login"); // Redirect to login page
      }
    });

    return () => unsubscribe();
  }, [router]);

  return loading || !authenticated; // Return true if still loading or not authenticated yet
};

export default useAuthentication;
