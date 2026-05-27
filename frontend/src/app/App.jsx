// import { CreateUserPage } from "@/features/users";

// export default function App(){
//   return(
//     <div className="min-h  text-center grid grid-cols-1 gab-4 ">
//       <h1 className="text-white  text-4xl font-bold bg-fuchsia-800 p-6">
//         Con Rico programar...
//       </h1>

//       <CreateUserPage />

  
//     </div>
//   );
// }

import { RouterProvider } from "react-router-dom";
import router from "./router";

export default function App(){
  return <RouterProvider router = {router} />;
}