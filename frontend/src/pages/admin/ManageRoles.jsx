export default function ManageRoles() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Roles</h2>
      <p>Admins can assign or revoke roles.</p>
      <button className="bg-green-600 text-white px-3 py-1 rounded">Add Role</button>
      <button className="bg-red-600 text-white px-3 py-1 rounded ml-2">Remove Role</button>
    </div>
  );
}