'use client';

import { changeUserRole } from "@/actions";
import type { User } from "@/interfaces";

interface Props {
  users: User[];
}


export const UsersTable = ({ users }: Props) => {
  return (
    <table className="min-w-full rounded overflow-hidden">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            #ID
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Correo electrónico
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Nombre completo
          </th>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Rol
          </th>
        </tr>
      </thead>
      <tbody>

        {
          users?.map(user => (
            <tr key={user.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.email}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <select
                  className="cursor-pointer p-2 w-full rounded-lg"
                  value={user.role}
                  onChange={(e) => changeUserRole( user.id ,e.target.value)}
                >
                  <option value='user'>User</option>
                  <option value='admin'>Admin</option>
                </select>
              </td>
            </tr>
          ))
        }

      </tbody>
    </table>
  )
}
