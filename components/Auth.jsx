import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useState } from "react";

const Auth = () => {

    const [sessionExpired, setSessionExpired] = useState(false);
    const router = useRouter();
    let auth=true;
    
        if (typeof window !== 'undefined') {
        let token = localStorage.getItem('user-token');
        if (token) {

            jwt.verify(token, 'VVhY4YvAPuYenVZQCjCPZfKASJpCyw2f', function (err, decode) {
                if (err) {
                   
                    console.log(err);
                    auth=false;
                  localStorage.clear();
                    setSessionExpired(true);
                     router.push("/login");
                } else {

                     
                }
            });
        }
        else

        {
            auth=false;
            router.push("/login");
        }
    }
    console.log("inside auth");
    
   return {auth,sessionExpired}

}

export default Auth
