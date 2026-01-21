import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const data = useSelector(store => store.user)
  const nav = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex justify-center items-center px-4">
      
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center gap-6 p-8 border-b border-white/20">
          <img
            src={data.data.profilePicture}
            alt="profile"
            className="w-32 h-32 rounded-full object-cover ring-4 ring-blue-500"
          />

          <div>
            <h1 className="text-3xl font-bold text-white">
              {data.data.firstName} {data.data.lastName}
            </h1>
            <p className="text-blue-400 text-lg">
              @{data.data.userName}
            </p>
            <span className="inline-block mt-2 px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold">
              {data.data.role}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          
          <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition">
            <p className="text-gray-400 text-sm">First Name</p>
            <h2 className="text-xl font-semibold text-white">
              {data.data.firstName}
            </h2>
          </div>

          <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition">
            <p className="text-gray-400 text-sm">Last Name</p>
            <h2 className="text-xl font-semibold text-white">
              {data.data.lastName}
            </h2>
          </div>

          <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition">
            <p className="text-gray-400 text-sm">Username</p>
            <h2 className="text-xl font-semibold text-blue-400">
              @{data.data.userName}
            </h2>
          </div>

          <div className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition">
            <p className="text-gray-400 text-sm">Role</p>
            <h2 className="text-xl font-semibold text-white">
              {data.data.role}
            </h2>
          </div>
          

          {data.data.role == "buyer" && <div 
          onClick={() => (nav("/vieworderhistory"))}
          className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition hover:cursor-pointer">
            
            <p 
            onClick={() =>{
              nav("/vieworderhistory")
            }}
            className="text-green-400 text-2xl">View Order History</p>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Profile
