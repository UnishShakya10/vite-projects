import { Tasks } from "../../components/Tasks";
import Todo from "../../components/Todo";

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-[#f5f5f0] px-5 py-12">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-3xl bg-white p-10 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-600">Admin area</p>
          <h1 className="mt-3 text-4xl font-black text-gray-900">Dashboard</h1>
          <p className="mt-3 text-gray-500">You are signed in with administrator access.</p>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-2xl font-black text-gray-900">Tasks</h2>
            <p className="mt-1 text-sm text-gray-500">Manage your dashboard tasks from one place.</p>
          </div>
          <Tasks />
        </section>


        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-2xl font-black text-gray-900">Tasks</h2>
            <p className="mt-1 text-sm text-gray-500">Manage your dashboard tasks from one place.</p>
          </div>
          <Todo />
        </section>
      </div>
    </main>
  )
}

export default Dashboard