import axios from "axios"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AddProduct = () => {
  const {_id} = useSelector(store => store.user.data)

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    desc: "",
    quantity: "",
    image: "",
    category: ""
  })

  const [tempImg, setTempImg] = useState(null)
  const [img, setImg] = useState(null)
  const [showBtn, setShowBtn] = useState(true)
  const inputRef = useRef()


  const nav = useNavigate()

  function handleCange(e) {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (img) {
      setShowBtn(false)
      const temp = URL.createObjectURL(img)
      setTempImg(temp)

      const formData = new FormData()
      formData.append("file", img)
      formData.append("upload_preset", import.meta.env.VITE_PRESET)

      axios
        .post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD}/image/upload`,
          formData
        )
        .then((res) => {
          setProductInfo({ ...productInfo, image: res.data.secure_url })
          setShowBtn(true)
        })
    }
  }, [img])

      


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-6 py-10">
      <div className="w-full max-w-5xl bg-white rounded-2xl border border-gray-200 shadow-lg p-10">

        {/* Header */}
        <div className="mb-10 border-b pb-6">
          <h1 className="text-3xl font-semibold text-gray-900">
            Add Product
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your store inventory
          </p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Product Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              name="name"
              value={productInfo.name}
              onChange={handleCange}
              type="text"
              placeholder="Enter product name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              name="price"
              value={productInfo.price}
              onChange={handleCange}
              type="number"
              placeholder="₹ Price"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              name="quantity"
              value={productInfo.quantity}
              onChange={handleCange}
              type="number"
              placeholder="Available stock"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              name="category"
              value={productInfo.category}
              onChange={handleCange}
              type="text"
              placeholder="electronics / fashion / grocery"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-700">
              Product Image
            </label>

            <div
              onClick={() => inputRef.current.click()}
              className="h-[240px] w-[240px] border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition overflow-hidden"
            >
              {tempImg ? (
                <img src={tempImg} className="h-full w-full object-cover" />
              ) : (
                <div className="text-center text-gray-400 text-sm">
                  <p className="font-medium">Upload Image</p>
                  <p className="text-xs">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              hidden
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Product Description
            </label>
            <textarea
              name="desc"
              value={productInfo.desc}
              onChange={handleCange}
              rows="4"
              placeholder="Write product description..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-12 flex justify-end">
         {showBtn ? <button
            onClick={() => {
              if (
                !productInfo.name ||
                productInfo.name.length < 2 ||
                productInfo.name.length > 80 ||
                !productInfo.price ||
                productInfo.price < 1 ||
                !productInfo.desc ||
                productInfo.desc.length < 10 ||
                productInfo.desc.length > 250 ||
                !productInfo.quantity ||
                productInfo.quantity < 1 ||
                !productInfo.image ||
                !["fashion", "grocery", "electronics"].includes(productInfo.category)
              ) {
                toast.error("Please fill all product details correctly")
                return
              }

              axios
                .post(
                  import.meta.env.VITE_DOMAIN + "/products",
                  productInfo,
                  { withCredentials: true }
                )
                .then(() => {
                  toast.success("Product added successfully")
                  nav("/home")
                })
                .catch((res) =>{
                  console.log(res)
                  toast.error(res.response.data.error)
                })
            }}
            className="lg:col-span-2 w-full py-4 rounded-2xl bg-blue-900 text-white font-semibold text-center"
          >
            Add Product
          </button> : <div className="lg:col-span-2 w-full py-4 rounded-2xl bg-gray-300 text-gray-700 font-semibold text-center">
              Uploading image, please wait...
            </div>}
        </div>

      </div>
    </div>
  )
}

export default AddProduct
