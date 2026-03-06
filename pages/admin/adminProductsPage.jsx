import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import getFormatPrice from "../../src/utils/price-format";
import axios from "axios";
import { CiEdit, CiTrash } from "react-icons/ci";



export default function AdminProductsPage() {


  const [products, setProducts] = useState([]);

  useEffect(() => {
    const Token = localStorage.getItem("token");
    axios.get(import.meta.env.VITE_API_URL + "/products", {
      headers: {
        Authorization: "Bearer " + Token
      }
    }).then((response) => {

      setProducts(response.data);
      console.log(response.data);

    });

  }, []);


  return (
    <div className="w-full h-full overflow-y-scroll ">
      {/*
      {
        products.map(
          (item, index) => {

            return <h1 key={item.productId}>{item.name}</h1>
          }
        )
      }
*/}
      {/* Table Card Wrapper */}
      <div
        className="rounded-2xl overflow-hidden shadow-xl"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(189,232,245,0.6)",
          boxShadow: "0 20px 60px rgba(28,77,141,0.08), 0 4px 16px rgba(28,77,141,0.06)",
        }}
      >
        {/* Top gradient accent bar */}
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(90deg, #BDE8F5, #4988C4, #1C4D8D)" }}
        />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            {/* ── THEAD ── */}
            <thead>
              <tr
                style={{
                  background: "rgba(189,232,245,0.2)",
                  borderBottom: "2px solid rgba(189,232,245,0.8)",
                }}
              >
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D] whitespace-nowrap">productId</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D] whitespace-nowrap">name</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D] whitespace-nowrap">price</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D] whitespace-nowrap">labelledPrice</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D] whitespace-nowrap">category</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D] whitespace-nowrap">images</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D] whitespace-nowrap">isVisible</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D] whitespace-nowrap">brand</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D] whitespace-nowrap">model</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D] whitespace-nowrap">Actions</th>

              </tr>
            </thead>

            {/* ── TBODY ── */}
            <tbody>
              {products.map((item, index) => (
                <tr
                  key={item.productId}
                  className="transition-all duration-200 hover:scale-[1.001]"
                  style={{
                    background: index % 2 === 0
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(240,248,253,0.5)",
                    borderBottom: "1px solid rgba(189,232,245,0.5)",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(189,232,245,0.25)"}
                  onMouseLeave={e => e.currentTarget.style.background = index % 2 === 0 ? "rgba(255,255,255,0.9)" : "rgba(240,248,253,0.5)"}
                >
                  {/* productId */}
                  <td className="px-4 py-4">
                    <span
                      className="text-xs font-mono font-semibold px-2 py-1 rounded-lg"
                      style={{ background: "rgba(73,136,196,0.1)", color: "#4988C4", letterSpacing: "0.05em" }}
                    >
                      {item.productId}
                    </span>
                  </td>

                  {/* name */}
                  <td className="px-4 py-4 text-sm font-semibold text-[#1C4D8D]">
                    {item.name}
                  </td>

                  {/* price */}
                  <td className="px-4 py-4 text-sm font-bold text-[#1C4D8D]">
                    LKR{getFormatPrice(item.price)}
                  </td>

                  {/* labelledPrice */}
                  <td className="px-4 py-4 text-sm text-gray-400 line-through">
                    LKR{getFormatPrice(item.labelledPrice)}
                  </td>

                  {/* category */}
                  <td className="px-4 py-4">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-100 text-blue-700">
                      {item.category || "uncategorized"}
                    </span>
                  </td>

                  {/* images */}
                  <td className="px-4 py-4">
                    <div
                      className="rounded-xl overflow-hidden"
                      style={{
                        width: 52, height: 52,
                        border: "2px solid rgba(189,232,245,0.8)",
                        boxShadow: "0 2px 8px rgba(28,77,141,0.1)",
                      }}
                    >
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  </td>

                  {/* isVisible */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.isVisible ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" : "bg-gray-300"}`} />
                      <span className={`text-xs font-semibold ${item.isVisible ? "text-emerald-600" : "text-gray-400"}`}>
                        {item.isVisible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                  </td>

                  {/* brand */}
                  <td className="px-4 py-4 text-sm font-semibold text-[#1C4D8D]">
                    {item.brand || "N/A"}
                  </td>

                  {/* model */}
                  <td className="px-4 py-4 text-xs font-mono text-gray-400">
                    {item.model || "N/A"}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 text-xs font-semibold  black">
                    <div className="flex justify-center items-center text-2xl gap-2">
                      <Link
                        to="/admin/update-product"
                        state={item}
                        className="hover:text-secondary"
                      >
                        <CiEdit />
                      </Link>

                      <CiTrash
                        className="hover:text-red-600 cursor-pointer"
                        onClick={() => {
                          const token = localStorage.getItem("token");

                          axios
                            .delete(import.meta.env.VITE_API_URL + "/products/" + item.productId, {
                              headers: {
                                Authorization: "Bearer " + token,
                              },
                            })
                            .then(() => {
                              toast.success("Product deleted successfully");
                            })
                            .catch((err) => {
                              toast.error(err?.response?.data?.message || "Failed to delete product");
                            });
                        }}
                      />
                    </div>
                  </td>



                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-3"
          style={{
            borderTop: "1px solid rgba(189,232,245,0.6)",
            background: "rgba(189,232,245,0.1)",
          }}
        >
          <p className="text-xs text-[#4988C4]">
            Showing <span className="font-semibold">{products.length}</span> products
          </p>
        </div>
      </div>
      <Link to="/admin/add-product" className="text-white bg-secondary w-[50px] h-[50px] flex justify-center items-center text-2xl rounded-[20px] hover:rounded-full fixed bottom-12 right-16">


        <FaPlus />
      </Link>
    </div>
  )
}
