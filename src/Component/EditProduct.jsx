import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"

const EditProduct = () => {
  const { id } = useParams()
  const [data, setData] = useState({})
  const [img, setImg] = useState(null)
  const inputRef = useRef()
  const [showBtn, setShowBtn] = useState(true)
  const nav = useNavigate()

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_DOMAIN + `/products/search/${id}`, {
        withCredentials: true
      })
      .then(res => {
        setData(res.data.data)
      })
  }, [id])

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (!img) return
    setShowBtn(false)

    const previewUrl = URL.createObjectURL(img)
    setData(prev => ({ ...prev, image: previewUrl }))

    const uploadImage = async () => {
      try {
        const formData = new FormData()
        formData.append("file", img)
        formData.append("upload_preset", import.meta.env.VITE_PRESET)

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD}/image/upload`,
          formData
        )

        setData(prev => ({
          ...prev,
          image: res.data.secure_url
        }))

        setShowBtn(true)
      } catch (err) {
        toast.error("Cloudinary updation failed")
      }
    }

    uploadImage()
  }, [img])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-10 flex justify-center">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12">

        <div className="mb-10 border-b pb-6">
          <h1 className="text-4xl font-bold text-gray-800">Edit Product</h1>
          <p className="text-gray-500 mt-2">Update your product information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Product Name
              </label>
              <input
                name="name"
                value={data?.name || ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Price (₹)
              </label>
              <input
                name="price"
                type="number"
                value={data?.price || ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Quantity
              </label>
              <input
                name="quantity"
                type="number"
                value={data?.quantity || ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Enter available quantity"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Product Description
              </label>
              <textarea
                name="desc"
                rows="4"
                value={data?.desc || ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Write product details"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={data?.category || ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-5 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="grocery">Grocery</option>
                <option value="fashion">Fashion</option>
              </select>
            </div>

          </div>

          <div className="flex flex-col items-center gap-6">
            <div
              onClick={() => inputRef.current.click()}
              className="w-full h-[320px] rounded-2xl overflow-hidden border-2 border-dashed border-indigo-300 bg-indigo-50 cursor-pointer flex items-center justify-center hover:bg-indigo-100 transition"
            >
              {data?.image ? (
                <img
                  src={data?.image}
                  className="h-full w-full object-cover"
                />
              ) : (
                <p className="text-indigo-400 font-medium">Click to upload image</p>
              )}
            </div>

            <input
              type="file"
              hidden
              ref={inputRef}
              onChange={(e) => setImg(e.target.files[0])}
            />

            <p className="text-sm text-gray-500">Tap the image to change</p>
          </div>

          {showBtn ? (
            <button
              onClick={() => {
                axios
                  .patch(import.meta.env.VITE_DOMAIN + `/products/edit/${id}`, data, {
                    withCredentials: true
                  })
                  .then(() => {
                    toast.success("Product Information Updated")
                    nav("/home")
                  })
                  .catch(() => {
                    toast.error("Not Updated")
                  })
              }}
              className="lg:col-span-2 w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition"
            >
              Update Product
            </button>
          ) : (
            <div className="lg:col-span-2 w-full py-4 rounded-2xl bg-gray-300 text-gray-700 font-semibold text-center">
              Uploading image, please wait...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditProduct
