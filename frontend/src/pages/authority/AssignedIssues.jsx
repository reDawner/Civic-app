export default function AssignedIssues() {
  const issues = [
    {
      id: "ISS-101",
      category: "Pothole",
      location: "Ward 12, MG Road",
      severity: "High",
      date: "2026-03-05",
      image: "/images/pothole.jpg",
      description: "Large pothole causing traffic disruption."
    },
    {
      id: "ISS-102",
      category: "Garbage Overflow",
      location: "Ward 8, Market Street",
      severity: "Medium",
      date: "2026-03-06",
      image: "/images/garbage.jpg",
      description: "Overflowing garbage bins attracting stray dogs."
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Assigned Issues</h2>
      <table className="w-full border-collapse border border-slate-300">
        <thead>
          <tr className="bg-slate-100">
            <th className="border p-2">Issue ID</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Severity</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td className="border p-2">{issue.id}</td>
              <td className="border p-2">{issue.category}</td>
              <td className="border p-2">{issue.location}</td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    issue.severity === "High"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {issue.severity}
                </span>
              </td>
              <td className="border p-2">
                <img src={issue.image} alt={issue.category} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="border p-2">{issue.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}