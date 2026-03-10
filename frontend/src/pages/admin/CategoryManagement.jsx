export default function CategoryManagement() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Category Management</h2>
      <button className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
      <button className="bg-yellow-500 text-white px-3 py-1 rounded ml-2">Edit</button>
      <button className="bg-red-600 text-white px-3 py-1 rounded ml-2">Remove</button>
      <ul className="mt-4 list-disc pl-6">
        <li>Pothole (PWD)</li>
        <li>Garbage Overflow (Municipality)</li>
        <li>Streetlight Failure (KSEB)</li>
        <li>Drainage Blockage (Kerala Water Authority)</li>
      </ul>
    </div>
  );
}