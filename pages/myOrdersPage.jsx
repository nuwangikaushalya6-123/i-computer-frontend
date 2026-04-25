import axios from "axios";
import { useEffect, useState } from "react";
import LoadingAnimation from "../src/components/loadingAnimation";
import getFormatPrice from "../src/utils/price-format";
import toast from "react-hot-toast";

import CustomerViewOrderInfoModal from "../src/components/customersViewOrderInfoModel";

export default function MyOrdersPage() {

    const [orders, setOrders] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get(
            import.meta.env.VITE_API_URL + "/orders/" + pageSize + "/" + pageNumber,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        ).then((response) => {
            console.log(response.data);
            setOrders(response.data.orders);
            setTotalPages(response.data.totalPages);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        });

    }, [pageNumber, pageSize]);



    return (
        <div className="w-full h-full overflow-y-scroll">

            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 py-5 bg-blue-300 border-b border-blue-600">
                <div>
                    <h2 className="text-lg font-semibold text-blue-600">Orders</h2>
                    <p className="text-sm text-blue-600">
                        Manage your orders at a glance
                    </p>
                </div>
            </div>

            {/* Loading */}
            {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <LoadingAnimation />
                </div>
            ) : (

                <>
                    <div
                        className="rounded-2xl overflow-hidden shadow-xl"
                        style={{
                            background: "rgba(255,255,255,0.85)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(189,232,245,0.6)",
                            boxShadow: "0 20px 60px rgba(28,77,141,0.08), 0 4px 16px rgba(28,77,141,0.06)",
                        }}
                    >
                        {/* Top gradient bar */}
                        <div
                            className="h-1 w-full"
                            style={{ background: "linear-gradient(90deg, #BDE8F5, #4988C4, #1C4D8D)" }}
                        />

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">

                                {/* THEAD */}
                                <thead>
                                    <tr
                                        style={{
                                            background: "rgba(189,232,245,0.2)",
                                            borderBottom: "2px solid rgba(189,232,245,0.8)",
                                        }}
                                    >
                                        <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D]">Order ID</th>
                                        <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D]">Customer</th>
                                        <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D]">Email</th>
                                        <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D]">Date</th>
                                        <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D]">Total</th>
                                        <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D]">Status</th>
                                        <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-[#1C4D8D]">Action</th>
                                    </tr>
                                </thead>

                                {/* TBODY */}
                                <tbody>
                                    {orders.length > 0 ? (
                                        orders.map((order, index) => (
                                            <tr
                                                key={order.orderId}
                                                className="transition-all duration-200 hover:scale-[1.001]"
                                                style={{
                                                    background:
                                                        index % 2 === 0
                                                            ? "rgba(255,255,255,0.9)"
                                                            : "rgba(240,248,253,0.5)",
                                                    borderBottom: "1px solid rgba(189,232,245,0.5)",
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.background = "rgba(189,232,245,0.25)")
                                                }
                                                onMouseLeave={(e) =>
                                                (e.currentTarget.style.background =
                                                    index % 2 === 0
                                                        ? "rgba(255,255,255,0.9)"
                                                        : "rgba(240,248,253,0.5)")
                                                }
                                            >
                                                {/* Order ID */}
                                                <td className="px-4 py-4">
                                                    <span
                                                        className="text-xs font-mono font-semibold px-2 py-1 rounded-lg"
                                                        style={{
                                                            background: "rgba(73,136,196,0.1)",
                                                            color: "#4988C4",
                                                            letterSpacing: "0.05em",
                                                        }}
                                                    >
                                                        {order.orderId}
                                                    </span>
                                                </td>

                                                {/* Customer */}
                                                <td className="px-4 py-4 text-sm font-semibold text-[#1C4D8D]">
                                                    {order.firstName} {order.lastName}
                                                </td>

                                                {/* Email */}
                                                <td className="px-4 py-4 text-sm text-gray-600">
                                                    {order.email}
                                                </td>

                                                {/* Date */}
                                                <td className="px-4 py-4 text-sm text-gray-600">
                                                    {order.date ? new Date(order.date).toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" }) : "N/A"}
                                                </td>

                                                {/* Total */}
                                                <td className="px-4 py-4 text-sm font-bold text-[#1C4D8D]">
                                                    Rs. {getFormatPrice(order.total)}
                                                </td>

                                                {/* Status */}
                                                <td className="px-4 py-4">
                                                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-700">
                                                        Pending
                                                    </span>
                                                </td>
                                             <td className="px-4 py-4">
                                               <CustomerViewOrderInfoModal order={order} />
                                               </td>



                                            </tr>




                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-6 text-gray-400">
                                                No Orders Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="w-full bottom-5 left-0 h-[50px] flex justify-center items-center ">
                                <div className="w-[500px] h-full bg-white shadow-2xl rounded-full flex items-center justify-between px-2">
                                    <button className="bg-blue-300 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
                                        onClick={() => {
                                            if (pageNumber > 1) {
                                                setPageNumber(pageNumber - 1);
                                                setIsLoading(true);
                                            } else {
                                                toast.success("you are on the first page");
                                            }
                                        }}>
                                        Previous
                                    </button>

                                    <span className="text-sm text-blue-900 w-[100px] text-center">
                                        page {pageNumber} of {totalPages}
                                    </span>

                                    <button className="bg-blue-300 w-[100px] text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
                                        onClick={() => {
                                            if (pageNumber < totalPages) {
                                                setPageNumber(pageNumber + 1);
                                                setIsLoading(true);
                                            } else {
                                                toast.success("you are on the last page");
                                            }
                                        }}>
                                        Next
                                    </button>

                                    <select
                                        value={pageSize}
                                        onChange={(e) => {
                                            setPageSize(parseInt(e.target.value));
                                            setIsLoading(true);
                                        }}
                                        className="ml-5 border-blue-100 rounded px-3 py-2 text-sm"
                                    >
                                        <option value={2}>2 per page</option>
                                        <option value={5}>5 per page</option>
                                        <option value={10}>10 per page</option>
                                        <option value={20}>20 per page</option>
                                        <option value={30}>30 per page</option>
                                    </select>

                                </div>

                            </div>
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
                                Showing <span className="font-semibold">{orders.length}</span> orders
                            </p>
                        </div>
                    </div>

                </>
            )}
        </div>
    );
}