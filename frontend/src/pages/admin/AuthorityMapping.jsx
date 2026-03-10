export default function AuthorityMapping() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Authority Mapping</h2>
      <table className="w-full border-collapse border border-slate-300">
        <thead>
          <tr className="bg-slate-100">
            <th className="border p-2">Category</th>
            <th className="border p-2">Department</th>
            <th className="border p-2">Ward</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Pothole</td>
            <td className="border p-2">PWD</td>
            <td className="border p-2">Ward 12</td>
            <td className="border p-2">pwd@kerala.gov.in</td>
            <td className="border p-2">9876543210</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}