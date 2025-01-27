import { getPaginatedUsers } from '@/actions';
import { Title } from '@/components';
import { UsersTable } from './ui';

export default async function UsersPage() {

  const {  users = [] } = await getPaginatedUsers();


  return (
    <>
      <Title title="Usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}