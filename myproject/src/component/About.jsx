import React from "react";


export default function About() {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto flex flex-col gap-5">
      <h1 className="font-sans text-3xl font-bold ">
        About ME 
      </h1>
      <h2 className="text-xl font-semibold -mb-4">INSTA: Thedsstudent</h2>
      <p className='font-normal -mt-1'>
  Security is a paramount concern in MERN stack authentication. Best practices include implementing measures such as password hashing using bcrypt to securely store user passwords, using HTTPS to encrypt data transmission between the client and server, implementing rate limiting and CAPTCHA to prevent brute force attacks, and validating and sanitizing user input to prevent injection attacks. Additionally, proper session management and token expiration strategies help mitigate the risk of unauthorized access. By adhering to these security practices, developers can build robust and secure authentication systems for MERN stack applications, ensuring the protection of user data and privacy.
  </p>
    </div>
  );
}
