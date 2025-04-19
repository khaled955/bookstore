// import { useSelector } from "react-redux"
// import { RootState, userDecodedInfo } from "../../Interfaces/Interfaces"
// import { jwtDecode } from "jwt-decode";
// import { useState } from "react";
// import ChangePassword from "../ChangePassword/ChangePassword";

// export default function Profile() {

// const [showChangePasswordForm , setshowChangePasswordForm] = useState(false)


//   const {token} = useSelector((store:RootState) => store.userReducer)
//   const userDecoded = jwtDecode<userDecodedInfo>(token);

    
// function handleChangeFormHide(){
//   setshowChangePasswordForm(false)
// }




//   return (
//     <div className="px-4">
//       <h2 className="text-gray-700 text-2xl font-bold mb-5">
//       <i className="fa-solid fa-user mr-2"></i>
//         User Information:</h2>
//         <div className="info-box">
//           <h1 className="mb-5"> Email: <span className="text-gray-600">{userDecoded.email}</span></h1>
//           <button onClick={()=>{
//             setshowChangePasswordForm(true)
//           }} className="bg-red-600 text-white font-semibold px-3 py-1 rounded-md cursor-pointer">Change Password</button>
//         </div>

//         {showChangePasswordForm && <ChangePassword handleHideForm={handleChangeFormHide}/>}
//     </div>
//   )
// }




import { useSelector } from "react-redux";
import { RootState, userDecodedInfo } from "../../Interfaces/Interfaces";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import ChangePassword from "../ChangePassword/ChangePassword";

export default function Profile() {
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const { token } = useSelector((store: RootState) => store.userReducer);
  const userDecoded = jwtDecode<userDecodedInfo>(token);

  function handleChangeFormHide() {
    setShowChangePasswordForm(false);
  }

  // Simulated static data for demo purposes
  const staticUserInfo = {
    username: "booklover123",
    joinedDate: "2023-01-15",
    role: "Reader",
  };

  return (
    <section className="px-4 py-6 max-w-3xl mx-auto" aria-label="User profile section">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <i className="fa-solid fa-user text-blue-500"></i> Profile Information
        </h2>
      </header>

      <article className="bg-white shadow-md rounded-lg p-6 space-y-4" role="region" aria-label="User personal details">
        <div>
          <h3 className="text-xl font-semibold text-gray-700">Username:</h3>
          <p className="text-gray-600" aria-label="Username">{staticUserInfo.username}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700">Email:</h3>
          <p className="text-gray-600" aria-label="User email">{userDecoded.email}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700">Joined:</h3>
          <p className="text-gray-600" aria-label="Account creation date">{staticUserInfo.joinedDate}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700">Role:</h3>
          <p className="text-gray-600" aria-label="User role">{staticUserInfo.role}</p>
        </div>

        <div>
          <button
            onClick={() => setShowChangePasswordForm(true)}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
            aria-label="Change password button"
          >
            Change Password
          </button>
        </div>
      </article>

      {showChangePasswordForm && (
        <div role="dialog" aria-modal="true" aria-label="Change Password Form">
          <ChangePassword handleHideForm={handleChangeFormHide} />
        </div>
      )}
    </section>
  );
}
