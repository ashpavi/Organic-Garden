import { useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa";

import { useContactMessages } from "../../hooks/useContactMessages";

const formatDate = (dateValue) => {
    if (!dateValue) return "Just now";

    return dateValue.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
};

export default function AdminMessages() {

    const { messages, loading, error, setRead, deleteMessage } = useContactMessages();
    const [activeTopic, setActiveTopic] = useState("All");

    const topics = useMemo(() => {
        const unique = new Set(messages.map((item) => item.topic).filter(Boolean));
        return ["All", ...Array.from(unique)];
    }, [messages]);

    const filtered = useMemo(() => {
        if (activeTopic === "All") return messages;
        return messages.filter((item) => item.topic === activeTopic);
    }, [messages, activeTopic]);

    const unreadCount = useMemo(
        () => messages.filter((item) => item.status !== "read").length,
        [messages]
    );

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this message?");
        if (!confirmDelete) return;
        await deleteMessage(id);
    };

    return (
        <div className="space-y-6 sm:space-y-8">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">

                <div>
                    <h1 className="text-xl sm:text-3xl font-semibold text-gray-800">
                        Messages
                    </h1>
                    <p className="text-sm text-gray-600">
                        Customer contact submissions
                    </p>
                </div>

                <div className="bg-green-50 border border-green-200 px-4 py-2 rounded-xl text-sm">
                    <span className="font-semibold text-green-900">Unread:</span>{" "}
                    <span className="text-green-600">{unreadCount}</span>
                </div>

            </div>

            {/* FILTER */}
            <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                    <button
                        key={topic}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                            activeTopic === topic
                                ? "bg-green-600 text-white"
                                : "bg-white border text-green-700 hover:bg-green-50"
                        }`}
                        onClick={() => setActiveTopic(topic)}
                    >
                        {topic}
                    </button>
                ))}
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block bg-white border rounded-xl shadow-sm overflow-x-auto">
                <table className="w-full text-left">

                    <thead className="bg-green-50 text-green-800 text-xs uppercase">
                        <tr>
                            <th className="p-4">Sender</th>
                            <th className="p-4">Topic</th>
                            <th className="p-4">Message</th>
                            <th className="p-4">Received</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((item) => (
                            <tr key={item.id} className="border-t">

                                <td className="p-4">
                                    <div className="font-medium">{item.fullName}</div>
                                    <div className="text-sm text-gray-500">{item.email}</div>
                                </td>

                                <td className="p-4">{item.topic}</td>

                                <td className="p-4 text-sm max-w-md">
                                    {item.message}
                                </td>

                                <td className="p-4 text-sm text-gray-500">
                                    {formatDate(item.createdAt)}
                                </td>

                                <td className="p-4">
                                    <span className={`px-3 py-1 text-xs rounded-full ${
                                        item.status === "read"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-600"
                                    }`}>
                                        {item.status === "read" ? "Read" : "New"}
                                    </span>
                                </td>

                                <td className="p-4 space-x-3">

                                    {item.status !== "read" && (
                                        <button
                                            onClick={() => setRead(item.id)}
                                            className="text-green-600 text-sm"
                                        >
                                            Mark
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-500"
                                    >
                                        <FaTrash />
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* ================= MOBILE CARDS ================= */}
            <div className="md:hidden space-y-4">

                {filtered.map((item) => (

                    <div key={item.id} className="bg-white border rounded-xl p-4 shadow-sm space-y-3">

                        {/* NAME */}
                        <div>
                            <p className="font-semibold text-green-900">
                                {item.fullName}
                            </p>
                            <p className="text-xs text-gray-500 break-words">
                                {item.email}
                            </p>
                        </div>

                        {/* TOPIC + STATUS */}
                        <div className="flex justify-between items-center">
                            <span className="text-xs bg-green-50 px-2 py-1 rounded">
                                {item.topic}
                            </span>

                            <span className={`text-xs px-2 py-1 rounded-full ${
                                item.status === "read"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-yellow-100 text-yellow-600"
                            }`}>
                                {item.status === "read" ? "Read" : "New"}
                            </span>
                        </div>

                        {/* MESSAGE */}
                        <p className="text-sm text-gray-700">
                            {item.message}
                        </p>

                        {/* FOOTER */}
                        <div className="flex justify-between items-center border-t pt-2 text-xs">

                            <span className="text-gray-500">
                                {formatDate(item.createdAt)}
                            </span>

                            <div className="flex gap-3">

                                {item.status !== "read" && (
                                    <button
                                        onClick={() => setRead(item.id)}
                                        className="text-green-600 font-medium"
                                    >
                                        Mark
                                    </button>
                                )}

                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-500"
                                >
                                    <FaTrash />
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

                {!loading && filtered.length === 0 && (
                    <p className="text-center text-sm text-gray-500">
                        No messages found.
                    </p>
                )}

            </div>

            {loading && <p className="text-sm text-gray-500">Loading messages...</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}

        </div>
    );
}