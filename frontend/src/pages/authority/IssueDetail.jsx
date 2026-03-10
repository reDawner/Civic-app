export default function IssueDetail() {
  const issue = {
    id: "ISS-101",
    category: "Pothole",
    location: "Ward 12, MG Road",
    severity: "High",
    image: "/images/pothole.jpg",
    description: "Large pothole causing traffic disruption.",
    contact: "authority@kerala.gov.in"
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Issue Detail</h2>
      <img src={issue.image} alt={issue.category} className="w-64 h-64 object-cover rounded mb-4" />
      <p><strong>ID:</strong> {issue.id}</p>
      <p><strong>Category:</strong> {issue.category}</p>
      <p><strong>Location:</strong> {issue.location}</p>
      <p><strong>Severity:</strong> {issue.severity}</p>
      <p><strong>Description:</strong> {issue.description}</p>
      <p><strong>Contact:</strong> {issue.contact}</p>

      <div className="mt-4 space-x-2">
        <button className="bg-yellow-500 text-white px-3 py-1 rounded">Mark In Progress</button>
        <button className="bg-green-600 text-white px-3 py-1 rounded">Mark Resolved</button>
        <button className="bg-red-600 text-white px-3 py-1 rounded">Mark Rejected</button>
        <button className="bg-blue-600 text-white px-3 py-1 rounded">Add Remarks</button>
        <button className="bg-indigo-600 text-white px-3 py-1 rounded">Upload Proof</button>
      </div>
    </div>
  );
}