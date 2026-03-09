import { useState } from "react";
import axios from "axios";

function ReportIssue() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [mapLink, setMapLink] = useState("");
    const [coords, setCoords] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation not supported");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setLocation(`${lat}, ${lng}`);
                setMapLink(`https://www.google.com/maps?q=${lat},${lng}`);
                setCoords({ lat, lng });
            },
            () => alert("Unable to retrieve location")
        );
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("mapLink", mapLink);
        formData.append("image", image);

        try {
            setLoading(true);
            await axios.post("http://localhost:5000/api/issues/report", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "userid": "demoUser"
                },
            });
            alert("Issue reported successfully");
            setTitle("");
            setDescription("");
            setLocation("");
            setMapLink("");
            setCoords(null);
            setImage(null);
            setImagePreview(null);
        } catch (err) {
            console.error(err);
            alert("Failed to submit report");
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 bg-slate-50 hover:bg-white";

    const labelClass =
        "block text-xs font-semibold tracking-widest uppercase text-slate-500 mb-1.5";

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-blue-950 tracking-tight">
                    Report a New Issue
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    Fill in the details below to submit a civic issue in your area.
                </p>
            </div>

            <div className="max-w-2xl">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                    {/* Card header strip */}
                    <div className="bg-blue-700 px-6 py-3 flex items-center gap-2">
                        <span className="text-blue-200 text-xs font-semibold tracking-widest uppercase">
                            New Issue Submission
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">

                        {/* Issue Type */}
                        <div>
                            <label className={labelClass}>Issue Type</label>
                            <select
                                className={inputClass}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            >
                                <option value="">Select issue type</option>
                                <option value="Road Damage">Road Damage</option>
                                <option value="Garbage">Garbage</option>
                                <option value="Water Leak">Water Leak</option>
                                <option value="Streetlight">Streetlight Issue</option>
                                <option value="Drainage">Drainage Problem</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label className={labelClass}>Description</label>
                            <textarea
                                rows="4"
                                className={inputClass}
                                placeholder="Describe the problem in detail..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className={labelClass}>Location</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className={`${inputClass} flex-1`}
                                    placeholder="Enter location or use GPS"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={getLocation}
                                    className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold tracking-widest uppercase rounded-lg transition-colors duration-200 whitespace-nowrap cursor-pointer border-none"
                                >
                                    <span>⌖</span> GPS
                                </button>
                            </div>
                        </div>

                        {/* Map Preview */}
                        {coords && (
                            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                                <div className="px-4 py-2 border-b border-slate-200 flex items-center justify-between">
                                    <span className="text-xs font-semibold tracking-widest uppercase text-slate-500">
                                        Location Preview
                                    </span>
                                    <a
                                        href={mapLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                                    >
                                        Open in Google Maps ↗
                                    </a>
                                </div>
                                <iframe
                                    title="map"
                                    width="100%"
                                    height="220"
                                    src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
                                />
                            </div>
                        )}

                        {/* Upload Image */}
                        <div>
                            <label className={labelClass}>Upload Image</label>
                            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-slate-200 rounded-xl py-6 px-4 cursor-pointer bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group">
                                <span className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                                    📎
                                </span>
                                <span className="text-sm text-slate-500 group-hover:text-blue-600 font-medium transition-colors duration-200">
                                    {image ? image.name : "Click to upload an image"}
                                </span>
                                <span className="text-xs text-slate-400 mt-0.5">
                                    PNG, JPG, WEBP supported
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>

                            {imagePreview && (
                                <div className="mt-3 rounded-xl overflow-hidden border border-slate-200">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full max-h-48 object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-100 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-300 text-white text-sm font-semibold tracking-widest uppercase py-3 rounded-xl transition-colors duration-200 cursor-pointer border-none shadow-sm"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    "Submit Issue"
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReportIssue;