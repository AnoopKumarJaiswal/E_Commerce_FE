import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const data = useSelector(store => store.user)
  const nav = useNavigate()

  return (
    <div className="min-h-screen w-full bg-slate-50 pt-28 px-4 pb-12 flex justify-center items-start">

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-slide-up">

        {/* Header Banner */}
        <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-16 mb-6">
            <div className="flex items-end gap-6">
              <div className="relative group">
                <img
                  src={data.data.profilePicture}
                  alt="profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg bg-white"
                />
                <div className="absolute bottom-2 right-2 h-5 w-5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="mb-2">
                <h1 className="text-3xl font-bold text-slate-800">
                  {data.data.firstName} {data.data.lastName}
                </h1>
                <p className="text-slate-500 font-medium">@{data.data.userName}</p>
              </div>
            </div>

            <span className="mb-4 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold uppercase tracking-wider border border-indigo-100">
              {data.data.role}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <i className="fa-regular fa-user"></i>
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Full Name</p>
              </div>
              <h2 className="text-xl font-semibold text-slate-800 pl-14">
                {data.data.firstName} {data.data.lastName}
              </h2>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-at"></i>
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Username</p>
              </div>
              <h2 className="text-xl font-semibold text-slate-800 pl-14">
                @{data.data.userName}
              </h2>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-id-badge"></i>
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Role</p>
              </div>
              <h2 className="text-xl font-semibold text-slate-800 pl-14 capitalize">
                {data.data.role}
              </h2>
            </div>


            {data.data.role == "buyer" && (
              <div
                onClick={() => nav("/vieworderhistory")}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 shadow-xl cursor-pointer hover:scale-[1.02] transition-transform group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

                <div className="flex items-center justify-between relative z-10 h-full">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Activity</p>
                    <h2 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      Order History
                    </h2>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-indigo-500 transition-colors">
                    <i className="fa-solid fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform duration-300"></i>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
